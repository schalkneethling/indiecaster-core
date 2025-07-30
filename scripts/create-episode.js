#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get episode title from command line arguments
const episodeTitle = process.argv[2];

if (!episodeTitle) {
  console.error('❌ Error: Please provide an episode title');
  console.log('Usage: npm run create-episode "Your Episode Title"');
  process.exit(1);
}

// Convert title to kebab-case for filename
function toKebabCase(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
}

const slug = toKebabCase(episodeTitle);
const filename = `${slug}.md`;
const filepath = path.join('src', 'content', 'episodes', filename);

// Check if file already exists
if (fs.existsSync(filepath)) {
  console.error(`❌ Error: Episode file already exists: ${filename}`);
  process.exit(1);
}

// Get current date for pubDate
const today = new Date().toISOString().split('T')[0];

// Create the episode content
const episodeContent = `---
title: "${episodeTitle}"
description: "A compelling description of your episode that will appear in search results and podcast platforms."
pubDate: ${today}
duration: "00:00"
audioFile: "${slug}"
artwork:
  src: "${slug}"
  alt: "Episode artwork for ${episodeTitle}"
showNotes: "Brief summary of what this episode covers and key takeaways for listeners."
draft: true
---

# ${episodeTitle}

Brief introduction to the episode...

## Key Topics Covered

- Topic 1
- Topic 2
- Topic 3

## Guest Information

Information about your guest(s)...

## Show Notes

Detailed show notes with timestamps and resources...

### Timestamps

- 00:00 - Introduction
- 05:30 - Main discussion begins
- 25:15 - Q&A section
- 40:00 - Conclusion

### Resources Mentioned

- [Resource Name](https://example.com)
- [Another Resource](https://example.com)

## Connect with Guest

- Social Media: [@username](https://social.example.com/username)
- Website: [website.com](https://website.com)
- LinkedIn: [Guest Name](https://linkedin.com/in/username)

---

## 📚 Content Creation Guide

For detailed information about creating episodes, see the [Content Collections User Guide](../../docs/content-collections-user-guide.md).

### Quick Reference:
- **Required Fields**: title, description, pubDate, duration, audioFile, artwork, showNotes
- **Optional Fields**: guests, tags, youtube, explicit, episodeNumber, season, hasVttTranscript, hasSrtTranscript
- **Draft Episodes**: Set \`draft: true\` to prevent publishing
- **File Naming**: Use kebab-case (e.g., "my-episode-title.md")
- **Audio Files**: Place in \`public/audio/episodes/\` with matching filename
- **Artwork**: Place in \`public/episode-artwork/\` with matching filename

*This episode was created using the episode generator script.*
`;

// Write the file
try {
  fs.writeFileSync(filepath, episodeContent);
  console.log(`✅ Created episode file: ${filename}`);
  console.log(`📁 Location: ${filepath}`);
  console.log(`🔧 Status: Draft (set draft: false to publish)`);
  console.log(`📝 Next steps:`);
  console.log(`   1. Edit the frontmatter with your episode details`);
  console.log(`   2. Add your episode content below the frontmatter`);
  console.log(`   3. Add audio file to public/audio/episodes/${slug}.mp3`);
  console.log(`   4. Add artwork to public/episode-artwork/${slug}.png`);
  console.log(`   5. Set draft: false when ready to publish`);
  console.log(`   6. Run 'npm run dev' to preview your episode`);
} catch (error) {
  console.error('❌ Error creating episode file:', error.message);
  process.exit(1);
} 
