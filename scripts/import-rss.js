#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Parser from 'rss-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const parser = new Parser({
  customFields: {
    feed: ['itunes:author', 'itunes:subtitle', 'itunes:summary', 'itunes:owner', 'itunes:category'],
    item: ['itunes:duration', 'itunes:episode', 'itunes:season', 'itunes:episodeType', 'itunes:explicit', 'itunes:author', 'itunes:image']
  }
});

// Get RSS feed URL from command line arguments
// Handle both direct node execution and npm script execution
const args = process.argv.slice(2);
const rssUrl = args.find(arg => !arg.startsWith('--'));
const options = {
  dryRun: args.includes('--dry-run'),
  verbose: args.includes('--verbose'),
  draft: !args.includes('--published')
};

if (!rssUrl) {
  console.error('❌ Error: Please provide an RSS feed URL');
  console.log('Usage: npm run import-rss "https://podcast.example.com/feed.xml" [options]');
  console.log('Options:');
  console.log('  --dry-run     Preview import without creating files');
  console.log('  --verbose     Show detailed output');
  console.log('  --published   Import episodes as published (default: draft)');
  process.exit(1);
}

// Utility functions
function toKebabCase(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function sanitizeDescription(description) {
  if (!description) return '';
  
  // Ensure it's a string
  const desc = typeof description === 'string' ? description : String(description);
  
  // Remove HTML tags and decode entities
  return desc
    .replace(/<[^>]*>/g, '')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/"/g, '\\"') // Escape quotes for YAML
    .trim();
}

function extractDuration(duration) {
  if (!duration) return '00:00';
  
  // Handle different duration formats
  if (duration.includes(':')) {
    // Already in MM:SS or HH:MM:SS format
    const parts = duration.split(':');
    if (parts.length === 2) {
      return duration; // MM:SS
    } else if (parts.length === 3) {
      // HH:MM:SS - convert to MM:SS if less than an hour, keep if over
      const hours = parseInt(parts[0]);
      const minutes = parseInt(parts[1]);
      const seconds = parts[2];
      if (hours === 0) {
        return `${minutes}:${seconds}`;
      }
      return `${hours * 60 + minutes}:${seconds}`;
    }
  } else {
    // Assume seconds, convert to MM:SS
    const totalSeconds = parseInt(duration);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
  
  return '00:00';
}



function generateArtworkFilename(title, episodeNumber) {
  const slug = toKebabCase(title);
  return episodeNumber ? `episode-${episodeNumber}-${slug}` : slug;
}



function createEpisodeFile(episode, episodeIndex, totalEpisodes) {
  const {
    title,
    description,
    pubDate,
    duration,
    audioUrl,
    artworkUrl,
    episodeNumber,
    season,
    explicit,
    hosts,
    slug
  } = episode;

  const artworkFilename = generateArtworkFilename(title, episodeNumber);
  
  // Safely handle string values for YAML
  const safeTitle = String(title).replace(/"/g, '\\"');
  const safeDescription = sanitizeDescription(description);
  const shortDescription = safeDescription.substring(0, 160);
  const briefShowNotes = safeDescription.length > 250 
    ? safeDescription.substring(0, 250).trim() + '...'
    : safeDescription;
  
  const episodeContent = `---
title: "${safeTitle}"
description: "${shortDescription}"
pubDate: ${pubDate.toISOString().split('T')[0]}
duration: "${duration}"
audioFile: "${audioUrl}"
artwork:
  src: "${artworkUrl || artworkFilename}"
  alt: "Episode artwork for ${safeTitle}"
showNotes: "${briefShowNotes}"
draft: ${options.draft}
hosts: [${hosts.map(h => `"${h}"`).join(', ')}]
${episodeNumber ? `episodeNumber: ${episodeNumber}` : ''}
${season ? `season: ${season}` : ''}
${explicit ? 'explicit: true' : ''}
---

# ${safeTitle}

*This episode was imported from an RSS feed. Please review and update the content below.*

## Episode Description

${safeDescription}

## Show Notes

*Please add detailed show notes, timestamps, and resources mentioned in this episode.*

### Key Topics Covered

- [Add main topics covered in this episode]

### Resources Mentioned

- [Add links to resources mentioned in the episode]

## About This Episode

*This episode was automatically imported on ${new Date().toLocaleDateString()}. The audio file is currently hotlinked to the original source. Consider uploading a local copy to improve reliability.*

${audioUrl ? `**Original Audio URL**: ${audioUrl}` : ''}
${artworkUrl ? `**Original Artwork URL**: ${artworkUrl}` : ''}

---

## 📝 Import Notes

- **Audio**: Currently hotlinked to external source
- **Artwork**: ${artworkUrl ? 'Currently hotlinked to external source' : `Please add episode artwork to \`public/episode-artwork/${artworkFilename}.png\``}
- **Content**: Review and enhance the episode description and show notes
- **Draft Status**: Set to ${options.draft ? 'draft' : 'published'} - change \`draft: false\` to publish
`;

  const filepath = path.join('src', 'content', 'episodes', `${slug}.md`);
  
  // Check if episode already exists
  if (fs.existsSync(filepath)) {
    console.log(`   ⚠️  Episode already exists: ${slug} - skipping`);
    return false;
  }
  
  if (!options.dryRun) {
    fs.writeFileSync(filepath, episodeContent);
    console.log(`   ✅ Created episode: ${slug} (${episodeIndex + 1}/${totalEpisodes})`);
  } else {
    console.log(`   🔍 Would create episode: ${slug} (${episodeIndex + 1}/${totalEpisodes})`);
  }
  
  return true;
}

async function importRssFeed(url) {
  try {
    console.log(`🔍 Fetching RSS feed from: ${url}`);
    
    let feed;
    if (url.startsWith('file://')) {
      // Handle local files for testing
      const filePath = url.replace('file://', '');
      const content = fs.readFileSync(filePath, 'utf8');
      feed = await parser.parseString(content);
    } else {
      feed = await parser.parseURL(url);
    }
    
    console.log(`\n📻 Podcast: ${feed.title}`);
    console.log(`📝 Description: ${feed.description}`);
    console.log(`📅 Episodes found: ${feed.items.length}`);
    
    if (options.verbose) {
      console.log(`🔗 Feed URL: ${feed.feedUrl || url}`);
      console.log(`🌐 Website: ${feed.link}`);
      console.log(`🎨 Artwork: ${feed.image?.url || 'Not specified'}`);
    }
    

    
    console.log(`\n📁 Starting episode import${options.dryRun ? ' (DRY RUN)' : ''}:`);
    
    let createdCount = 0;
    let skippedCount = 0;
    
    // Process episodes in reverse order (oldest first) to maintain episode numbering
    const episodes = feed.items.reverse();
    
    for (let i = 0; i < episodes.length; i++) {
      const item = episodes[i];
      
      try {
        if (options.verbose) {
          console.log(`\n   🔍 Processing episode ${i + 1}: ${item.title}`);
        }
        
        // Extract episode data
        const title = String(item.title || `Episode ${i + 1}`);
        const description = String(item.description || item.content || item.contentSnippet || '');
        const pubDate = new Date(item.pubDate || Date.now());
        const duration = extractDuration(item['itunes:duration']);
        
        // Extract media URLs
        const audioUrl = item.enclosure?.url || '';
        const artworkUrl = item['itunes:image']?.$?.href || item['itunes:image']?.href || item['itunes:image'] || feed.image?.url || '';
        
        // Extract episode metadata
        const episodeNumber = item['itunes:episode'] ? parseInt(item['itunes:episode']) : null;
        const season = item['itunes:season'] ? parseInt(item['itunes:season']) : null;
        const explicit = item['itunes:explicit'] === 'true' || item['itunes:explicit'] === 'yes';
        
        // Set default host - user will configure hosts separately
        const episodeHostSlugs = ['main-host'];
        
        // Generate episode slug
        const slug = toKebabCase(title);
        
        const episode = {
          title,
          description,
          pubDate,
          duration,
          audioUrl,
          artworkUrl,
          episodeNumber,
          season,
          explicit,
          hosts: episodeHostSlugs,
          slug
        };
        
        if (options.verbose) {
          console.log(`\n   📻 Episode: ${title}`);
          console.log(`   📅 Date: ${pubDate.toLocaleDateString()}`);
          console.log(`   ⏱️  Duration: ${duration}`);
          console.log(`   🎵 Audio: ${audioUrl || 'Not specified'}`);
          console.log(`   🎨 Artwork: ${artworkUrl || 'Not specified'}`);
          console.log(`   👥 Hosts: ${episodeHostSlugs.join(', ')}`);
        }
        
        const created = createEpisodeFile(episode, i, episodes.length);
        if (created) {
          createdCount++;
        } else {
          skippedCount++;
        }
      } catch (episodeError) {
        console.log(`   ⚠️  Error processing episode ${i + 1}: ${episodeError.message}`);
        skippedCount++;
        if (options.verbose) {
          console.error('Episode error details:', episodeError);
          console.error('Episode item:', JSON.stringify(item, null, 2));
        }
      }
    }
    
    // Summary
    console.log(`\n✅ Import completed!`);
    console.log(`📊 Summary:`);
    console.log(`   - Episodes created: ${createdCount}`);
    console.log(`   - Episodes skipped: ${skippedCount}`);
    console.log(`   - Total episodes: ${episodes.length}`);
    
    if (options.dryRun) {
      console.log(`\n🔍 This was a dry run. No files were created.`);
      console.log(`💡 Run without --dry-run to actually import the episodes.`);
    } else {
      console.log(`\n📝 Next steps:`);
      console.log(`   1. 🎯 Run 'npm run setup-hosts' to configure your podcast hosts`);
      console.log(`   2. Review and edit the imported episodes in src/content/episodes/`);
      console.log(`   3. Add local artwork files to public/episode-artwork/`);
      console.log(`   4. Set draft: false on episodes when ready to publish`);
      console.log(`   5. Run 'npm run dev' to preview your imported podcast`);
    }
    
  } catch (error) {
    console.error('❌ Error importing RSS feed:', error.message);
    
    if (options.verbose) {
      console.error('Full error:', error);
    }
    
    console.log('\n💡 Troubleshooting tips:');
    console.log('   - Verify the RSS feed URL is correct and accessible');
    console.log('   - Check if the feed contains valid XML');
    console.log('   - Try using --verbose for more detailed error information');
    console.log('   - Ensure you have write permissions to the content directories');
    
    process.exit(1);
  }
}

// Run the import
importRssFeed(rssUrl);
