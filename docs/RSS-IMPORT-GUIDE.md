# RSS Import Feature Guide

## Overview

The RSS Import feature allows you to migrate an existing podcast to IndieCaster by automatically parsing and importing episodes from your podcast's RSS feed. This significantly reduces the manual work required when transitioning to IndieCaster.

## Features

- **Automatic Episode Import**: Converts RSS episodes to IndieCaster format
- **External Media Handling**: Hotlinks to original audio and artwork files
- **Draft Mode**: Imports episodes as drafts by default for review
- **Dry Run Support**: Preview import without creating files
- **Duplicate Prevention**: Skips episodes that already exist
- **Post-Import Host Setup**: Guides you through interactive host configuration

## Usage

### Basic Import

```bash
npm run import-rss "https://your-podcast-feed.com/rss.xml"
```

### Options

```bash
# Preview import without creating files
npm run import-rss "https://your-podcast-feed.com/rss.xml" -- --dry-run

# Show detailed output during import
npm run import-rss "https://your-podcast-feed.com/rss.xml" -- --verbose

# Import episodes as published (default: draft)
npm run import-rss "https://your-podcast-feed.com/rss.xml" -- --published

# Combine options
npm run import-rss "https://your-podcast-feed.com/rss.xml" -- --dry-run --verbose
```

## Data Mapping

### RSS Feed → IndieCaster Schema

| RSS Field | IndieCaster Field | Notes |
|-----------|------------------|--------|
| `<title>` | `title` | Episode title |
| `<description>` / `<content>` | `description` + `showNotes` | Episode description and show notes |
| `<pubDate>` | `pubDate` | Publication date |
| `<itunes:duration>` | `duration` | Episode duration in MM:SS format |
| `<enclosure url>` | `audioFile` | Audio file URL (hotlinked) |
| `<itunes:image>` | `artwork.src` | Episode artwork URL (hotlinked) |
| `<itunes:author>` | Not used | Host setup is done separately |
| `<itunes:episode>` | `episodeNumber` | Episode number |
| `<itunes:season>` | `season` | Season number |
| `<itunes:explicit>` | `explicit` | Explicit content flag |

### Host Configuration

After import, episodes reference "main-host" by default. Use the interactive host setup to configure:
- Primary host information (name, bio, profile picture)
- Optional co-host
- Social media links and contact information
- Automatic episode updates with new host references

## Generated Files

### Episode Files

**Location**: `src/content/episodes/`
**Format**: `episode-title.md`
**Status**: Draft by default

Example episode structure:
```yaml
---
title: "Episode Title"
description: "Episode description..."
pubDate: 2024-01-15
duration: "45:30"
audioFile: "https://external-host.com/episode.mp3"
artwork:
  src: "episode-title-artwork"
  alt: "Episode artwork for Episode Title"
showNotes: "Episode description and notes..."
draft: true
hosts: ["host-name"]
episodeNumber: 1
season: 1
---
```

### Host Files

**Location**: `src/content/hosts/`
**Format**: `host-name.md`

Example host structure:
```yaml
---
name: "Host Name"
bio: "Podcast host imported from RSS feed. Please update this bio with more details."
profilePicture: "host-name-profile"
socialLinks: {}
website: ""
company: ""
title: ""
episodes: []
isMainHost: false
---
```

## Post-Import Workflow

After importing your RSS feed, follow this workflow to complete your migration:

### Step 1: Configure Hosts

```bash
npm run setup-hosts
```

This interactive script will:
- Guide you through setting up your primary host
- Optionally configure a co-host
- Validate all required and optional information
- Update all episodes to reference the new hosts

### Step 2: Review Episodes

- Navigate to `src/content/episodes/`
- Review each imported episode file
- Update descriptions and show notes as needed
- Set `draft: false` on episodes ready to publish

### Step 3: Handle Media Files

**Audio Files:**
- Currently hotlinked to original sources
- Consider uploading to `public/audio/episodes/` for reliability
- Update `audioFile` field to local filename (without extension)

**Artwork:**
- Add episode artwork to `public/episode-artwork/`
- Use filename matching the `artwork.src` field
- Recommended formats: PNG, WebP
- Recommended size: 3000x3000px for podcast platforms

### Step 4: Test Your Import

```bash
npm run dev
```

Visit your local site to review imported episodes and ensure everything looks correct.

## Troubleshooting

### Common Issues

**"Status code 404" Error**
- Verify the RSS feed URL is correct and accessible
- Check if the feed is publicly available (not behind authentication)

**"Cannot convert object to primitive value" Error**
- This usually indicates an issue with RSS feed structure
- Try using the `--verbose` flag for more details
- Some complex RSS feeds may need manual adjustment

**Episodes Not Showing**
- Check that episodes aren't marked as `draft: true`
- Verify episode files follow IndieCaster naming conventions
- Ensure required fields are present in frontmatter

**Missing Artwork/Audio**
- External files are hotlinked initially
- Add local copies to appropriate directories
- Update file references in episode frontmatter

### RSS Feed Requirements

Your RSS feed should be:
- Valid XML format
- Publicly accessible (no authentication required)
- Follow standard podcast RSS specifications
- Include iTunes tags for best results

### Supported RSS Feed Types

- Standard RSS 2.0 feeds
- Podcast-specific RSS feeds with iTunes tags
- Feeds from popular hosting platforms:
  - Anchor
  - Libsyn
  - Buzzsprout
  - Transistor
  - Spotify for Podcasters
  - Apple Podcasts Connect

## Advanced Usage

### Importing Specific Episodes

The importer processes all episodes in the feed. To import only specific episodes:

1. Use `--dry-run` to preview the import
2. Manually delete unwanted episode files after import
3. Or edit your RSS feed to include only desired episodes

### Custom Host Mapping

If host detection doesn't work correctly:

1. Import with default settings
2. Manually edit host references in episode files
3. Create/update host files in `src/content/hosts/`

### Large Feeds

For podcasts with many episodes:

1. Use `--dry-run` first to estimate import size
2. Consider importing in batches by editing the RSS feed
3. Monitor disk space for media files if downloading locally

## FAQ

**Q: Will this overwrite my existing episodes?**
A: No, the importer skips episodes that already exist based on filename.

**Q: Can I re-run the import safely?**
A: Yes, the importer only creates new files and skips existing ones.

**Q: What happens to episode artwork?**
A: Artwork URLs are preserved as hotlinks. You should download and add local copies for reliability.

**Q: How are episode numbers handled?**
A: The importer preserves iTunes episode numbers when available, otherwise episodes are processed in feed order.

**Q: Can I import from private feeds?**
A: Currently, only publicly accessible feeds are supported. For private feeds, make them temporarily public or download and import locally.

## Support

If you encounter issues with RSS import:

1. Try the import with `--dry-run --verbose` for detailed output
2. Check that your RSS feed is valid using online RSS validators
3. Ensure your feed follows standard podcast RSS specifications
4. Review this documentation for common solutions

For additional help, please refer to the main IndieCaster documentation or open an issue in the project repository.
