#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get host name from command line arguments
const hostName = process.argv[2];

if (!hostName) {
  console.error('❌ Error: Please provide a host name');
  console.log('Usage: npm run create-host "Host Full Name"');
  process.exit(1);
}

// Convert name to kebab-case for filename
function toKebabCase(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
}

const slug = toKebabCase(hostName);
const filename = `${slug}.md`;
const filepath = path.join('src', 'content', 'hosts', filename);

// Check if file already exists
if (fs.existsSync(filepath)) {
  console.error(`❌ Error: Host file already exists: ${filename}`);
  process.exit(1);
}

// Create the host content
const hostContent = `---
name: "${hostName}"
bio: "Brief bio for previews and SEO - write a compelling 1-2 sentence description."
profilePicture: "${slug}"
socialLinks:
  twitter: "https://twitter.com/yourusername"
  linkedin: "https://linkedin.com/in/yourusername"
  instagram: "https://instagram.com/yourusername"
website: "https://yourwebsite.com"
company: "Your Company"
title: "Your Title"
episodes: []
isMainHost: false
---

# ${hostName}

## About Me

Professional background and experience...

## Current Work

What you're currently working on...

## Podcast Hosting

Your role as a podcast host and what you bring to the show...

## Notable Achievements

Key accomplishments and contributions...

## Speaking and Writing

Public speaking, writing, and thought leadership...

## Connect

How listeners can get in touch and follow your work...

---

## 📚 Content Creation Guide

For detailed information about creating host profiles, see the [Content Collections User Guide](../../docs/content-collections-user-guide.md).

### Quick Reference:
- **Required Fields**: name, bio, profilePicture
- **Optional Fields**: socialLinks, website, company, title, episodes, isMainHost
- **Profile Pictures**: Place in \`public/profile-images/\` with matching filename
- **File Naming**: Use kebab-case (e.g., "host-name.md")
- **Social Links**: Add relevant social media profiles
- **Episode References**: Add episode slugs to the episodes array
- **Main Host Flag**: Set isMainHost to true for the primary host

*This host profile was created using the host generator script.*
`;

// Write the file
try {
  fs.writeFileSync(filepath, hostContent);
  console.log(`✅ Created host file: ${filename}`);
  console.log(`📁 Location: ${filepath}`);
  console.log(`📝 Next steps:`);
  console.log(`   1. Edit the frontmatter with host details`);
  console.log(`   2. Add comprehensive host bio below the frontmatter`);
  console.log(`   3. Add profile picture to public/profile-images/${slug}.png`);
  console.log(`   4. Update social links and professional information`);
  console.log(`   5. Set isMainHost to true if this is the primary host`);
  console.log(`   6. Add episode references when host appears in episodes`);
  console.log(`   7. Update episode frontmatter to include this host in the hosts array`);
  console.log(`   8. Run 'npm run dev' to preview the host profile`);
} catch (error) {
  console.error('❌ Error creating host file:', error.message);
  process.exit(1);
} 
