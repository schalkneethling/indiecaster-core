# Content Collection Schemas

This document serves as the single source of truth for all content collection schemas used in IndieCaster.

## Episodes Collection Schema

**File**: `src/content/episodes/*.md`

### Required Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `title` | String | Episode title | `"Building Sustainable Open Source Communities"` |
| `description` | String | SEO-friendly description (max 160 characters) | `"In this episode, we explore..."` |
| `pubDate` | Date | Publication date | `2024-01-15` |
| `duration` | String | Episode length in MM:SS format | `"45:30"` |
| `audioFile` | String | Audio file name (without extension) | `"episode-1-audio"` |
| `artwork.src` | String | Artwork image filename (without extension) | `"episode-1-artwork"` |
| `artwork.alt` | String | Alt text for accessibility | `"Episode artwork showing..."` |
| `artwork.podcast.showCover` | String | Podcast show cover (3000x3000px) | `"show-cover"` |
| `artwork.podcast.episodeArt` | String | Podcast episode art (3000x3000px) | `"episode-1-art"` |
| `artwork.podcast.heroImage` | String | Podcast hero image (4320x1080px) | `"hero-image"` |
| `showNotes` | String | Brief show notes summary | `"This episode covers..."` |

### Optional Fields

| Field | Type | Default | Description | Example |
|-------|------|---------|-------------|---------|
| `draft` | Boolean | `false` | Whether episode is in draft mode | `true` |
| `guests` | Array[String] | `[]` | Array of guest slugs | `["jane-springfield"]` |
| `tags` | Array[String] | `[]` | Array of tags for filtering | `["tech", "open-source"]` |
| `youtube` | String | - | YouTube video ID | `"dQw4w9WgXcQ"` |
| `explicit` | Boolean | `false` | Whether episode contains explicit content | `false` |
| `episodeNumber` | Number | - | Episode number in series | `1` |
| `season` | Number | - | Season number | `1` |
| `hosts` | Array[String] | `["main-host"]` | References to host slugs | `["main-host", "co-host"]` |
| `hasVttTranscript` | Boolean | `false` | Whether VTT transcript exists | `true` |
| `hasSrtTranscript` | Boolean | `false` | Whether SRT transcript exists | `true` |

### Example Frontmatter

```yaml
---
title: "Getting Started with Your First Podcast"
description: "In this episode, we discuss the essential steps to launch your first podcast, from choosing your topic and format to recording your first episode and publishing it to the world."
pubDate: 2024-01-15
duration: "45:30"
audioFile: "getting-started-podcast"
artwork:
  src: "episode-1-artwork"
  alt: "Getting Started with Your First Podcast artwork"
  podcast:
    showCover: "show-cover" # 3000x3000px for podcast platforms
    episodeArt: "episode-1-art" # 3000x3000px for individual episodes
    heroImage: "hero-image" # 4320x1080px for wide format displays
showNotes: "Learn the fundamentals of starting your own podcast from planning to publishing."
hosts: ["main-host"]
guests: ["jane-springfield"]
tags: ["podcasting", "getting started", "content creation", "audio production"]
youtube: "dQw4w9WgXcQ"
explicit: false
episodeNumber: 1
season: 1
draft: false
hasVttTranscript: false
hasSrtTranscript: false
---
```

## Guests Collection Schema

**File**: `src/content/guests/*.md`

### Required Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `name` | String | Guest's full name | `"Jane Springfield"` |
| `bio` | String | Guest's biography | `"Jane is a software engineer with over 10 years..."` |
| `profilePicture` | String | Profile image filename (without extension) | `"jane-springfield"` |

### Optional Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `socialLinks` | Object | Social media links | `{"twitter": "https://twitter.com/jane", "linkedin": "https://linkedin.com/in/jane"}` |
| `website` | String | Personal website URL | `"https://janespringfield.com"` |
| `company` | String | Company name | `"TechCorp"` |
| `title` | String | Job title | `"Senior Software Engineer"` |
| `episodes` | Array[String] | References to episode slugs | `["episode-1", "episode-3"]` |

### Example Frontmatter

```yaml
---
name: "Jane Springfield"
bio: "Jane Springfield is a podcast consultant and producer with over 5 years of experience helping creators launch successful shows. She specializes in helping new podcasters find their voice and build their audience."
profilePicture: "jane-springfield"
social:
  twitter: "janespringfield"
  linkedin: "https://linkedin.com/in/janespringfield"
  github: "janespringfield"
  website: "https://janespringfield.com"
episodes: ["episode-1"]
---
```

## Hosts Collection Schema

**File**: `src/content/hosts/*.md`

### Required Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `name` | String | Host's full name | `"John Smith"` |
| `bio` | String | Host's biography | `"John is a podcast host with over 5 years..."` |
| `profilePicture` | String | Profile image filename (without extension) | `"john-smith"` |

### Optional Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `socialLinks` | Object | Social media links | `{"twitter": "https://twitter.com/john", "linkedin": "https://linkedin.com/in/john"}` |
| `website` | String | Personal website URL | `"https://johnsmith.com"` |
| `company` | String | Company name | `"TechCorp"` |
| `title` | String | Job title | `"Podcast Host"` |
| `episodes` | Array[String] | References to episode slugs | `["episode-1", "episode-3"]` |
| `isMainHost` | Boolean | `false` | Whether this is the main host | `true` |

### Example Frontmatter

```yaml
---
name: "John Smith"
bio: "John Smith is a podcast host and creator passionate about sharing knowledge and connecting with listeners. He has been hosting podcasts for over 5 years and loves interviewing interesting guests."
profilePicture: "john-smith"
socialLinks:
  twitter: "https://twitter.com/johnsmith"
  linkedin: "https://linkedin.com/in/johnsmith"
  instagram: "https://instagram.com/johnsmith"
website: "https://johnsmith.com"
company: "Independent Creator"
title: "Podcast Host"
episodes: ["episode-1", "episode-2"]
isMainHost: true
---
```

## Media File Requirements

### Profile Images

**Location**: `public/profile-images/`

Each guest requires three image formats for optimal performance:

1. **AVIF format**: `{filename}@2x.avif` (400x400px)
2. **WebP format**: `{filename}@2x.webp` (400x400px) 
3. **PNG format**: `{filename}.png` (200x200px)

**Example**: For guest `jane-springfield`, you need:
- `jane-springfield@2x.avif`
- `jane-springfield@2x.webp`
- `jane-springfield.png`

### Episode Artwork

**Location**: `public/episode-artwork/`

Each episode requires artwork in multiple formats for optimal performance and Apple Podcasts compliance:

#### Podcast Platform Requirements (Recommended)
1. **Show Cover**: `{filename}-show-cover.png` (3000x3000px, under 500KB)
2. **Episode Art**: `{filename}-episode-art.png` (3000x3000px, under 500KB)
3. **Hero Image**: `{filename}-hero-image.png` (4320x1080px, under 500KB)

#### Web Performance Formats
1. **WebP format**: `{filename}.webp` (optimized for web)
2. **PNG format**: `{filename}.png` (fallback format)

**Example**: For episode artwork `episode-1`, you need:
- `episode-1-show-cover.png` (podcast platform show cover)
- `episode-1-episode-art.png` (podcast platform episode art)
- `episode-1-hero-image.png` (podcast platform hero image)
- `episode-1.webp` (web performance)
- `episode-1.png` (fallback)

**Note**: See [Podcast Artwork Guide](./PODCAST-ARTWORK-GUIDE.md) for complete specifications and best practices.

### Audio Files

**Location**: `public/audio/episodes/`

Audio files should be in MP3 format with descriptive filenames.

**Example**: `getting-started-podcast.mp3`

## Related Documentation

- [Content Collections User Guide](./content-collections-user-guide.md) - How to create and manage content
- [Media Files Guide](./MEDIA-FILES-GUIDE.md) - Complete media file requirements and setup
- [Content Collections Implementation](./content-collections-implementation.md) - Technical implementation details 
