#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get guest name from command line arguments
const guestName = process.argv[2];

if (!guestName) {
  console.error('❌ Error: Please provide a guest name');
  console.log('Usage: npm run create-guest "Guest Full Name"');
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

const slug = toKebabCase(guestName);
const filename = `${slug}.md`;
const filepath = path.join('src', 'content', 'guests', filename);

// Check if file already exists
if (fs.existsSync(filepath)) {
  console.error(`❌ Error: Guest file already exists: ${filename}`);
  process.exit(1);
}

// Create the guest content
const guestContent = `---
name: "${guestName}"
bio: "Brief bio for previews and SEO - write a compelling 1-2 sentence description."
profilePicture: "${slug}"
---

# ${guestName}

## Background

Professional background and experience...

## Current Work

What they're currently working on...

## Notable Achievements

Key accomplishments and contributions...

## Speaking and Writing

Public speaking, writing, and thought leadership...

## Connect

How to get in touch and follow their work...

---

## 📚 Content Creation Guide

For detailed information about creating guest profiles, see the [Content Collections User Guide](../../docs/content-collections-user-guide.md).

### Quick Reference:
- **Required Fields**: name, bio, profilePicture
- **Optional Fields**: socialLinks, website, company, title, episodes
- **Profile Pictures**: Place in \`public/profile-images/\` with matching filename
- **File Naming**: Use kebab-case (e.g., "guest-name.md")
- **Social Links**: Add relevant social media profiles
- **Episode References**: Add episode slugs to the episodes array

*This guest profile was created using the guest generator script.*
`;

// Write the file
try {
  fs.writeFileSync(filepath, guestContent);
  console.log(`✅ Created guest file: ${filename}`);
  console.log(`📁 Location: ${filepath}`);
  console.log(`📝 Next steps:`);
  console.log(`   1. Edit the frontmatter with guest details`);
  console.log(`   2. Add comprehensive guest bio below the frontmatter`);
  console.log(`   3. Add profile picture to public/profile-images/${slug}.png`);
  console.log(`   4. Update social links and professional information`);
  console.log(`   5. Add episode references when guest appears in episodes`);
  console.log(`   6. Run 'npm run dev' to preview the guest profile`);
} catch (error) {
  console.error('❌ Error creating guest file:', error.message);
  process.exit(1);
} 
