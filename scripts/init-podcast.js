#!/usr/bin/env node

/**
 * IndieCaster Podcast Initialization Script
 * 
 * This script helps you set up your podcast website by prompting for basic information
 * and updating the configuration file automatically.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function configurePodcastPlayers(configContent) {
  console.log('\n🎧 Podcast Players Configuration');
  console.log('Available podcast players:');
  
  // Extract podcast players from config content
  const podcastPlayersMatch = configContent.match(/podcastPlayers:\s*\[([\s\S]*?)\],/);
  if (!podcastPlayersMatch) {
    console.log('⚠️  Could not find podcast players configuration');
    return [];
  }
  
  const playersSection = podcastPlayersMatch[1];
  const playerRegex = /\{\s*icon:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*url:\s*"([^"]+)",?\s*\}/g;
  const players = [];
  let match;
  
  while ((match = playerRegex.exec(playersSection)) !== null) {
    players.push({
      icon: match[1],
      name: match[2],
      defaultUrl: match[3]
    });
  }

  const configuredPlayers = [];
  
  for (const player of players) {
    console.log(`\n${player.name} (${player.defaultUrl})`);
    const url = await question(`Enter your ${player.name} URL (or press Enter to skip): `);
    
    if (url.trim()) {
      configuredPlayers.push({
        icon: player.icon,
        name: player.name,
        url: url.trim()
      });
    }
  }
  
  return configuredPlayers;
}

async function configureSocialMedia(configContent) {
  console.log('\n📱 Social Media Configuration');
  console.log('Available social media platforms:');
  
  // Extract social media from config content
  const socialMediaMatch = configContent.match(/socialMedia:\s*\[([\s\S]*?)\],/);
  if (!socialMediaMatch) {
    console.log('⚠️  Could not find social media configuration');
    return [];
  }
  
  const socialMediaSection = socialMediaMatch[1];
  const platformRegex = /\{\s*icon:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*url:\s*"([^"]+)",?\s*\}/g;
  const platforms = [];
  let match;
  
  while ((match = platformRegex.exec(socialMediaSection)) !== null) {
    platforms.push({
      icon: match[1],
      name: match[2],
      defaultUrl: match[3]
    });
  }

  const configuredPlatforms = [];
  
  for (const platform of platforms) {
    console.log(`\n${platform.name} (${platform.defaultUrl})`);
    const url = await question(`Enter your ${platform.name} URL (or press Enter to skip): `);
    
    if (url.trim()) {
      configuredPlatforms.push({
        icon: platform.icon,
        name: platform.name,
        url: url.trim()
      });
    }
  }
  
  return configuredPlatforms;
}

async function renameEpisodeFile(oldSlug, newSlug) {
  const episodesDir = path.join(__dirname, '..', 'src', 'content', 'episodes');
  const oldFile = path.join(episodesDir, `${oldSlug}.md`);
  const newFile = path.join(episodesDir, `${newSlug}.md`);
  
  try {
    if (fs.existsSync(oldFile)) {
      fs.renameSync(oldFile, newFile);
      console.log(`✅ Renamed episode file from ${oldSlug}.md to ${newSlug}.md`);
      return true;
    }
  } catch (error) {
    console.log(`⚠️  Could not rename episode file automatically: ${error.message}`);
    console.log(`   Please manually rename src/content/episodes/${oldSlug}.md to ${newSlug}.md`);
    return false;
  }
}

async function initPodcast() {
  console.log('🎙️  Welcome to IndieCaster Podcast Setup!\n');
  console.log('This script will help you configure your podcast website.\n');

  try {
    // Get basic podcast information
    const podcastName = await question('What is your podcast name? ');
    
    // Get elevator pitch
    console.log('\n📝 Elevator Pitch');
    console.log('Your elevator pitch should be a compelling one-sentence description of your podcast.');
    console.log('This will be used in various places across your website.');
    const elevatorPitch = await question('Enter your elevator pitch: ');
    
    // Get meta description
    console.log('\n🔍 Meta Description');
    console.log('This description appears in search results and social media shares.');
    console.log('Keep it between 150-160 characters for optimal SEO.');
    const metaDescription = await question('Enter your meta description: ');
    
    const hostName = await question('What is your name (host)? ');
    const domain = await question('What is your website domain? (e.g., mypodcast.com): ');
    
    // Get episode information
    const hasFeaturedEpisode = await question('Do you want to configure a featured episode? (y/n): ');
    
    let featuredEpisodeConfig = '';
    let episodeSlug = 'episode-1';
    
    if (hasFeaturedEpisode.toLowerCase() === 'y') {
      const episodeTitle = await question('Featured episode title: ');
      const episodeSummary = await question('Featured episode summary: ');
      const guestName = await question('Featured episode guest name: ');
      const audioFile = await question('Audio file name (without .mp3): ');
      
      // Generate episode slug from title
      episodeSlug = slugify(episodeTitle);
      console.log(`\nGenerated episode slug: ${episodeSlug}`);
      
      featuredEpisodeConfig = `
  // <<-- START :: Featured episode configuration (OPTIONAL)
  // Remove this entire section if you want to use the latest published episode instead
  featuredEpisodeGuestName: "${guestName}",
  featuredEpisodeGuestProfilePicture: "${guestName.toLowerCase().replace(/\s+/g, '-')}",
  featuredEpisodeTitle: "${episodeTitle}",
  featuredEpisodeSummary: "${episodeSummary}",
  featuredEpisodeTrack: "${audioFile}",
  featuredEpisodeURL: "${episodeSlug}",
  // <<-- END :: Featured episode configuration`;
    }

    // Configure podcast players
    const podcastPlayers = await configurePodcastPlayers(configContent);
    
    // Configure social media
    const socialMedia = await configureSocialMedia(configContent);

    // Read the current config file
    const configPath = path.join(__dirname, '..', 'indiecaster.config.js');
    let configContent = fs.readFileSync(configPath, 'utf8');

    // Update the config with user input
    configContent = configContent.replace(
      /domain: "\[YOUR_DOMAIN\]"/,
      `domain: "${domain}"`
    );

    // Update elevator pitch - find the line between the START and END comments
    const elevatorPitchRegex = /elevatorPitch:\s*"[^"]*"/;
    configContent = configContent.replace(
      elevatorPitchRegex,
      `elevatorPitch: "${elevatorPitch}"`
    );

    configContent = configContent.replace(
      /hostName: "Your Name"/,
      `hostName: "${hostName}"`
    );

    configContent = configContent.replace(
      /hostProfilePicture: "your-profile-picture"/,
      `hostProfilePicture: "${hostName.toLowerCase().replace(/\s+/g, '-')}"`
    );

    configContent = configContent.replace(
      /podcastName: "IndieCaster"/,
      `podcastName: "${podcastName}"`
    );

    configContent = configContent.replace(
      /metaDefaultDescription:\s*"[^"]*"/,
      `metaDefaultDescription: "${metaDescription}"`
    );

    // Replace or add featured episode configuration
    const featuredEpisodeRegex = /\/\/ <<-- START :: Featured episode configuration[\s\S]*?\/\/ <<-- END :: Featured episode configuration/;
    if (featuredEpisodeConfig) {
      if (featuredEpisodeRegex.test(configContent)) {
        configContent = configContent.replace(featuredEpisodeRegex, featuredEpisodeConfig);
      } else {
        // Add featured episode config after elevator pitch
        configContent = configContent.replace(
          /\/\/ <<-- END :: Your elevator pitch\n/,
          `// <<-- END :: Your elevator pitch${featuredEpisodeConfig}\n`
        );
      }
    }

    // Replace podcast players array
    const podcastPlayersArray = podcastPlayers.map(player => 
      `    {
      icon: "${player.icon}",
      name: "${player.name}",
      url: "${player.url}",
    }`
    ).join(',\n');
    
    configContent = configContent.replace(
      /podcastPlayers: \[[\s\S]*?\],/,
      `podcastPlayers: [
${podcastPlayersArray}
  ],`
    );

    // Replace social media array
    const socialMediaArray = socialMedia.map(platform => 
      `    {
      icon: "${platform.icon}",
      name: "${platform.name}",
      url: "${platform.url}",
    }`
    ).join(',\n');
    
    configContent = configContent.replace(
      /socialMedia: \[[\s\S]*?\],/,
      `socialMedia: [
${socialMediaArray}
  ],`
    );

    // Write the updated config
    fs.writeFileSync(configPath, configContent);

    // Rename episode file if needed
    if (hasFeaturedEpisode.toLowerCase() === 'y' && episodeSlug !== 'episode-1') {
      await renameEpisodeFile('episode-1', episodeSlug);
    }

    console.log('\n✅ Configuration updated successfully!');
    console.log('\n📝 Next steps:');
    console.log('1. Add your profile image to public/profile-images/');
    console.log('2. Update the episode content in src/content/episodes/');
    console.log('3. Add your audio files to public/audio/episodes/');
    console.log('4. Customize colors and branding in indiecaster.config.js');
    console.log('5. Run "npm run dev" to start developing');
    
    console.log('\n📚 For detailed instructions, see:');
    console.log('- docs/GETTING-STARTED.md');
    console.log('- docs/SETUP-CHECKLIST.md');

  } catch (error) {
    console.error('❌ Error during setup:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

// Run the initialization
initPodcast(); 
