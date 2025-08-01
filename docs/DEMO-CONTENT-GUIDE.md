# Demo Content Guide

This guide explains how to use the demo content management script for testing and demonstration purposes.

## Overview

The demo content script allows you to:
- **Seed** your project with demo content from a specified folder
- **Teardown** demo content and restore your original content
- **Test** different content scenarios without affecting your real content

## Quick Start

### 1. Create Demo Content Folder

Create a folder structure that matches your project:

```
demo-content/
├── src/
│   └── content/
│       ├── episodes/
│       │   ├── episode-1.md
│       │   ├── episode-2.md
│       │   └── episode-3.md
│       └── guests/
│           ├── guest-1.md
│           ├── guest-2.md
│           └── guest-3.md
└── public/
    ├── audio/
    │   └── episodes/
    │       ├── episode-1.mp3
    │       ├── episode-2.mp3
    │       └── episode-3.mp3
    ├── profile-images/
    │   ├── guest-1.png
    │   ├── guest-1.webp
    │   ├── guest-2.png
    │   └── guest-2.webp
    └── episode-artwork/
        ├── episode-1.png
        ├── episode-1.webp
        ├── episode-2.png
        └── episode-2.webp
```

### 2. Seed Demo Content

```bash
npm run demo-content seed ./demo-content
```

This will:
- Create a backup of your current content
- Copy demo content to your project
- Replace existing content with demo content

### 3. Test Your Site

```bash
npm run dev
```

Your site will now display the demo content.

### 4. Restore Original Content

```bash
npm run demo-content teardown
```

This will:
- Remove demo content
- Restore your original content from backup
- Clean up backup files

## Demo Content Examples

### Episode Content (`src/content/episodes/episode-1.md`)

```markdown
---
title: "Demo Episode: Getting Started with Podcasting"
description: "This is a demo episode for testing purposes. Learn the basics of podcasting and how to get started."
pubDate: 2024-01-15
duration: "45:30"
audioFile: "episode-1"
artwork:
  src: "episode-1"
  alt: "Demo episode artwork"
guests: ["demo-guest-1"]
tags: ["demo", "podcasting", "getting started"]
youtube: "dQw4w9WgXcQ"
explicit: false
episodeNumber: 1
season: 1
showNotes: "This is a demo episode for testing the podcast website."
---

# Demo Episode: Getting Started with Podcasting

This is a demo episode for testing purposes. It shows how episode content should be structured.

## Key Topics Covered

- **Demo Topic 1**: This is a demo topic for testing
- **Demo Topic 2**: Another demo topic for testing
- **Demo Topic 3**: Yet another demo topic

## Guest: Demo Guest

Demo Guest is a fictional character created for testing purposes.

## Show Notes

This episode demonstrates the proper structure for episode content.

## Resources Mentioned

- [Demo Resource 1](https://example.com)
- [Demo Resource 2](https://example.com)

---

*This is a demo episode for testing purposes.*
```

### Guest Content (`src/content/guests/demo-guest-1.md`)

```markdown
---
name: "Demo Guest"
title: "Demo Guest Title"
bio: "This is a demo guest for testing purposes."
profilePicture: "demo-guest-1"
social:
  twitter: "demoguest"
  linkedin: "https://linkedin.com/in/demoguest"
  github: "demoguest"
  website: "https://demoguest.com"
episodes: ["episode-1"]
---

Demo Guest is a fictional character created for testing purposes.

## About Demo Guest

Demo Guest has been working in the demo industry for demo years, specializing in demo specialization.

## Connect with Demo Guest

- **Twitter**: [@demoguest](https://twitter.com/demoguest)
- **LinkedIn**: [Demo Guest](https://linkedin.com/in/demoguest)
- **GitHub**: [demoguest](https://github.com/demoguest)
- **Website**: [demoguest.com](https://demoguest.com)

## Episodes featuring Demo Guest

- [Episode 1: Demo Episode](/episodes/episode-1/)
```

## Use Cases

### Testing Different Content Scenarios

1. **Multiple Episodes**: Test how your site looks with many episodes
2. **Different Guest Types**: Test various guest profiles and social links
3. **Media Variations**: Test different image formats and audio files
4. **Content Lengths**: Test short vs long episode descriptions

### Demonstration Purposes

1. **Client Presentations**: Show clients how their content will look
2. **Screenshots**: Generate screenshots for marketing materials
3. **Feature Testing**: Test new features with realistic content
4. **Performance Testing**: Test site performance with full content

### Development Workflow

1. **Feature Development**: Use demo content while developing new features
2. **Bug Reproduction**: Reproduce bugs with consistent demo content
3. **Regression Testing**: Ensure changes don't break existing functionality
4. **Content Validation**: Test content validation rules

## Best Practices

### Demo Content Structure

- **Use realistic content**: Make demo content look like real content
- **Include all file types**: Test PNG, WebP, AVIF, and MP3 files
- **Vary content length**: Include short and long descriptions
- **Test edge cases**: Include content with special characters or formatting

### File Organization

- **Consistent naming**: Use consistent naming conventions
- **Multiple formats**: Include multiple image formats for testing
- **Proper metadata**: Ensure all frontmatter is complete
- **Valid content**: Make sure content follows schema requirements

### Backup Management

- **Regular backups**: The script automatically creates backups
- **Version control**: Keep demo content in version control
- **Multiple scenarios**: Create different demo content sets
- **Documentation**: Document what each demo set tests

## Troubleshooting

### Common Issues

**Demo folder not found**
- Check the path is correct
- Ensure the folder exists
- Use absolute paths if needed

**Missing content after seeding**
- Check that demo folder structure matches project structure
- Verify file permissions
- Check console output for errors

**Backup not found during teardown**
- Ensure you ran the seed command first
- Check that `.demo-backup` directory exists
- Verify file permissions

### Getting Help

- Check the script output for detailed error messages
- Verify your demo folder structure matches the project
- Ensure all required files are present
- Test with a simple demo folder first

## Advanced Usage

### Custom Demo Scenarios

Create multiple demo content sets for different testing scenarios:

```bash
# Test with minimal content
npm run demo-content seed ./demo-content-minimal

# Test with full content
npm run demo-content seed ./demo-content-full

# Test with edge cases
npm run demo-content seed ./demo-content-edge-cases
```

### Integration with CI/CD

Use demo content in automated testing:

```bash
# In your CI pipeline
npm run demo-content seed ./test-content
npm run build
npm run demo-content teardown
```

### Script Customization

Modify the script to handle additional content types:

```javascript
// Add custom content directories
const contentDirs = [
  'src/content/episodes',
  'src/content/guests',
  'src/content/custom', // Add your custom content type
  'public/audio/episodes',
  'public/profile-images',
  'public/episode-artwork'
];
```

---

*For more information, see the [Scripts Documentation](../scripts/README.md).* 