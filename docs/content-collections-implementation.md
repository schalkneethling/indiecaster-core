# Content Collections Implementation Guide

## Overview

This document outlines the implementation of Astro Content Collections in the IndieCaster project, providing a structured approach to managing podcast episodes and guest information.

## Architecture

### File Structure

```
src/
├── content/
│   ├── episodes/
│   │   ├── episode-1.md
│   │   ├── episode-1/
│   │   │   ├── transcript.vtt (optional)
│   │   │   └── transcript.srt (optional)
│   │   ├── episode-2.md
│   │   └── episode-2/
│   │       ├── transcript.vtt (optional)
│   │       └── transcript.srt (optional)
│   └── guests/
│       ├── jane-springfield.md
│       └── sarah-judge.md
├── pages/
│   ├── about.astro
│   ├── contact.astro
│   ├── episodes.astro (episodes listing)
│   ├── episodes/
│   │   └── [slug].astro (individual episode pages)
│   └── index.astro (homepage with featured episode)
└── components/
    ├── CardEpisode.astro
    ├── EpisodeProfiles.astro
    ├── EpisodeProfilesFeatured.astro
    └── EpisodeSummary.astro
```

## Content Collections Configuration

### Schema Definition (`src/content.config.ts`)

The content collections are configured with Zod schemas for type safety and validation. The schema includes comprehensive support for Apple Podcasts artwork requirements. For complete schema definitions, see the [Schema Reference](./schemas.md).

```typescript
import { defineCollection, z } from 'astro:content';

// Define the episodes collection schema
const episodes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    duration: z.string(),
    audioFile: z.string(),
    artwork: z.object({
      src: z.string(),
      alt: z.string(),
      // Apple Podcasts artwork specifications
      applePodcasts: z.object({
        showCover: z.string().optional(), // 3000x3000px for Apple Podcasts
        episodeArt: z.string().optional(), // 3000x3000px for individual episodes
        showcaseHero: z.string().optional(), // 4320x1080px for featuring
      }).optional(),
      // Legacy support - will be used if applePodcasts not specified
      legacy: z.object({
        src: z.string(),
        alt: z.string()
      }).optional()
    }),
    draft: z.boolean().default(false),
    guests: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    youtube: z.string().optional(),
    explicit: z.boolean().default(false),
    episodeNumber: z.number().optional(),
    season: z.number().optional(),
    showNotes: z.string(),
    hasVttTranscript: z.boolean().default(false),
    hasSrtTranscript: z.boolean().default(false)
  })
});

// Define the guests collection schema
const guests = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    bio: z.string(),
    profilePicture: z.string(),
    socialLinks: z.record(z.string()).optional(),
    website: z.string().url().optional(),
    company: z.string().optional(),
    title: z.string().optional(),
    episodes: z.array(z.string()).optional() // References to episode slugs
  })
});

// Export the collections
export const collections = { episodes, guests };
```

## Episode Content Structure

### Frontmatter Schema

Each episode file (`src/content/episodes/*.md`) must follow the schema defined in the [Schema Reference](./schemas.md). Here's a basic example:

```yaml
---
title: "Episode Title"
description: "Episode description for SEO and previews"
pubDate: 2024-01-15
duration: "45:30"
audioFile: "episode-audio-filename"
artwork:
  src: "artwork-filename"
  alt: "Artwork alt text for accessibility"
guests: ["guest-slug"]
tags: ["tag1", "tag2", "tag3"]
youtube: "youtube-video-id"
explicit: false
episodeNumber: 1
season: 1
showNotes: "Brief show notes summary"
hasVttTranscript: true
hasSrtTranscript: true
---
```

### Content Body

The episode content body supports full Markdown with the following structure:

```markdown
# Episode Title

Introduction paragraph...

## Key Topics Covered

- Topic 1
- Topic 2
- Topic 3

## Guest Information

Guest bio and background...

## Show Notes

Detailed show notes with timestamps, resources, and links...

## Resources Mentioned

- [Resource 1](https://example.com)
- [Resource 2](https://example.com)

## Connect with Guest

- Social Media: [@username](https://social.example.com/username)
- Website: [website.com](https://website.com)
```

## Transcript Files

### File Organization

Transcript files are stored in episode-specific directories alongside the episode markdown file:

```
src/content/episodes/
├── episode-1.md
├── episode-1/
│   ├── transcript.vtt (WebVTT format for audio players)
│   └── transcript.srt (SubRip format for display)
├── episode-2.md
└── episode-2/
    ├── transcript.vtt
    └── transcript.srt
```

### Transcript Formats

#### VTT (WebVTT) Format
- Used with HTML5 `<audio>` elements for captions
- Provides timestamped captions for accessibility
- Automatically loaded when `hasVttTranscript: true`

#### SRT (SubRip) Format  
- Used for display in expandable sections
- Loaded at build time and injected into components
- Preserves formatting when wrapped in `<pre>` tags
- Automatically loaded when `hasSrtTranscript: true`

### Loading Transcripts in Components

```astro
---
// In episode page component
const { episode } = Astro.props;
let srtTranscript = null;

if (episode.data.hasSrtTranscript) {
  const transcriptPath = `src/content/episodes/${episode.slug}/transcript.srt`;
  srtTranscript = await Astro.readFile(transcriptPath);
}
---

<!-- VTT for audio player -->
<audio controls>
  <source src={episode.data.audioFile} type="audio/mpeg">
  {episode.data.hasVttTranscript && (
    <track 
      kind="captions" 
      src={`/episodes/${episode.slug}/transcript.vtt`} 
      srclang="en" 
      label="English"
    />
  )}
</audio>

<!-- SRT for display -->
{episode.data.hasSrtTranscript && srtTranscript && (
  <details>
    <summary>Episode Transcript</summary>
    <pre>{srtTranscript}</pre>
  </details>
)}
```

### Benefits of This Approach

1. **Performance**: Transcripts are loaded only when needed, not during frontmatter parsing
2. **Flexibility**: Different formats serve different purposes (VTT for players, SRT for display)
3. **Accessibility**: VTT files provide proper captions for audio players
4. **Maintainability**: Transcripts are separate files that can be easily edited
5. **Build Safety**: Missing transcript files won't cause build failures
6. **Formatting**: SRT content preserves formatting when displayed in `<pre>` tags

## Guest Content Structure

### Frontmatter Schema

Each guest file (`src/content/guests/*.md`) must include:

```yaml
---
name: "Guest Name"
bio: "Brief bio for previews and SEO"
profilePicture: "profile-picture-filename"
socialLinks:
  social: "https://social.example.com/username"
  linkedin: "https://linkedin.com/in/username"
  github: "https://github.com/username"
website: "https://guest-website.com"
company: "Company Name"
title: "Job Title"
episodes: ["episode-slug-1", "episode-slug-2"]
---
```

## Dynamic Route Generation

### Episode Pages (`src/pages/episodes/[slug].astro`)

Individual episode pages are generated using `getStaticPaths()`:

```astro
---
import { getCollection, render } from 'astro:content';

export async function getStaticPaths() {
  const episodes = await getCollection('episodes');
  
  return episodes.map((episode) => ({
    params: { slug: episode.slug },
    props: { episode }
  }));
}

const { episode } = Astro.props;
const { Content } = await render(episode);
---

<EpisodeLayout frontmatter={episode.data}>
  <article class="episode-content">
    <!-- Episode content -->
    <Content />
  </article>
</EpisodeLayout>
```

### Episodes Listing (`src/pages/episodes.astro`)

The episodes listing page queries all episodes and sorts them by date:

```astro
---
import { getCollection } from 'astro:content';

const allEpisodes = await getCollection('episodes');
const sortedEpisodes = allEpisodes.sort((a, b) => 
  new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime()
);
---

<ul class="episodes-list">
  {sortedEpisodes.map((episode) => (
    <li>
      <CardEpisode
        episodeUrl={`/episodes/${episode.slug}`}
        frontMatter={episode.data}
      />
    </li>
  ))}
</ul>
```

## Component Integration

### EpisodeSummary Component

The EpisodeSummary component accepts an episode prop and displays episode information:

```astro
---
interface Props {
  episode?: CollectionEntry<'episodes'>;
  showCta?: boolean;
}

const { episode, showCta = true } = Astro.props;

// Use episode data directly (featured episode is handled at page level)
const episodeTitle = episode?.data.title || "No episode available";
const episodeSummary = episode?.data.description || "No episode description available";
const episodeURL = episode?.slug || "#";
---
```

### Homepage Integration

The homepage displays either the featured episode (if configured) or the latest published episode:

```astro
---
// Destructure with default values to handle missing config properties
const {
  featuredEpisodeURL = "",
  featuredEpisodeTitle = "",
  featuredEpisodeSummary = "",
  featuredEpisodeGuestName = "",
  featuredEpisodeGuestProfilePicture = "",
  featuredEpisodeTrack = "",
} = indieCasterConfig;

// Check if featured episode is configured (defensive check for missing properties)
const hasFeaturedEpisode = 
  featuredEpisodeURL && 
  featuredEpisodeTitle && 
  featuredEpisodeURL.trim() !== "" && 
  featuredEpisodeTitle.trim() !== "";

let featuredEpisode = null;

if (hasFeaturedEpisode) {
  // Validate that the configured featured episode actually exists
  const configuredEpisode = publishedEpisodes.find(
    (episode) => episode.slug === featuredEpisodeURL
  );

  if (configuredEpisode) {
    // Use the actual episode from content collections (ensures all data is correct)
    featuredEpisode = {
      ...configuredEpisode,
      // Override with featured episode configuration for display
      data: {
        ...configuredEpisode.data,
        title: featuredEpisodeTitle,
        description: featuredEpisodeSummary,
        guests: [featuredEpisodeGuestName],
        audioFile: featuredEpisodeTrack,
      },
      // Add custom property for featured episode profile picture
      featuredGuestProfilePicture: featuredEpisodeGuestProfilePicture,
    };
  } else {
    // Featured episode doesn't exist - log warning and fallback to latest
    console.warn(
      `⚠️ Featured episode "${featuredEpisodeURL}" not found in content collections. Falling back to latest published episode.`
    );
    console.warn(
      `Available episodes: ${publishedEpisodes.map((e) => e.slug).join(", ")}`
    );
    
    // Fallback to latest published episode
    featuredEpisode = publishedEpisodes.sort(
      (a, b) =>
        new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime(),
    )[0];
  }
} else {
  // Fallback to latest published episode if no featured episode is configured
  featuredEpisode = publishedEpisodes.sort(
    (a, b) =>
      new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime(),
  )[0];
}
---

<EpisodeSummary episode={featuredEpisode} />
```

**Note**: The featured episode configuration takes precedence over the latest published episode when configured. The code is defensive and handles cases where the featured episode section is completely missing from the config file.

### Guest Handling

The system supports various guest configurations:

- **Solo Episodes**: `guests: []` - Only host is displayed
- **Single Guest**: `guests: ["guest-name"]` - Host and one guest
- **Multiple Guests**: `guests: ["guest-1", "guest-2"]` - Host and multiple guests

**Example**:
```yaml
# Solo episode (omit guests field entirely)
# guests: []  # Don't include this line

# Single guest episode  
guests: ["jane-springfield"]

# Multiple guests episode
guests: ["sarah-judge", "james-chen"]
```

**Note**: For solo episodes, omit the `guests` field entirely rather than setting it to an empty array.

## Type Safety

### TypeScript Integration

The implementation leverages TypeScript for type safety:

```typescript
import type { CollectionEntry } from 'astro:content';

interface Props {
  episode?: CollectionEntry<'episodes'>;
  guest?: CollectionEntry<'guests'>;
}
```

### Zod Validation

All content is validated against the defined schemas at build time, ensuring:

- Required fields are present
- Data types are correct
- Optional fields are properly handled
- Invalid content is caught early

## Benefits of This Implementation

### 1. **Type Safety**
- Full TypeScript support with autocomplete
- Compile-time validation of content structure
- IntelliSense in editors

### 2. **Performance**
- Static generation of all episode pages
- Optimized content loading
- Efficient querying and sorting

### 3. **Maintainability**
- Centralized content management
- Consistent content structure
- Easy to extend and modify

### 4. **SEO Optimization**
- Structured data for episodes
- Proper meta tags and descriptions
- Clean URLs with slugs

### 5. **Developer Experience**
- Clear content organization
- Validation at build time
- Easy content authoring workflow

## Migration from Previous System

### Before (File-based Routing)
- Episodes stored in `src/pages/episodes/`
- Manual frontmatter management
- No type safety
- Limited validation

### After (Content Collections)
- Episodes stored in `src/content/episodes/`
- Schema-validated frontmatter
- Full type safety
- Automatic validation

## Artwork System Integration

### Podcast Artwork Support

IndieCaster includes comprehensive support for podcast artwork requirements through utility functions and component updates.

#### Artwork Utility Functions (`src/utils/artwork.js`)

The artwork system provides context-aware artwork selection and validation:

```javascript
import { getArtwork, validateApplePodcastsArtwork } from '../utils/artwork.js';

// Get artwork for specific context
const artwork = getArtwork(episode.artwork, 'episode', 'webp');

// Validate artwork against podcast platform requirements
const validation = validatePodcastArtwork(episode.artwork);
```

#### Component Updates

Components have been updated to use the new artwork system:

- **CardEpisode**: Uses `getArtworkWithFormat()` for optimal card display
- **DefaultHeroPlayer**: Supports showcase hero artwork for wide formats
- **EpisodeLayout**: Passes complete artwork objects to child components

For complete implementation details, see the [Podcast Artwork Integration Guide](./PODCAST-ARTWORK-INTEGRATION.md).

## Future Enhancements

### 1. **Guest Integration**
- Link guests to episodes automatically
- Guest profile pages
- Guest search and filtering

### 2. **Advanced Queries**
- Filter episodes by tags
- Search functionality
- Related episodes

### 3. **Content Relationships**
- Episode-to-guest references
- Related content suggestions
- Cross-referencing system

### 4. **RSS Integration**
- Generate podcast RSS feeds
- Include episode metadata
- Support for podcast platforms

### 5. **Enhanced Artwork System**
- Automatic artwork optimization
- Multiple format generation
- CDN integration support

## Troubleshooting

### Common Issues

1. **Schema Validation Errors**
   - Check that all required fields are present
   - Verify data types match schema
   - Ensure optional fields are properly formatted

2. **Build Errors**
   - Verify content file structure
   - Check for invalid frontmatter
   - Ensure all imports are correct

3. **Type Errors**
   - Update TypeScript configuration if needed
   - Check component prop types
   - Verify collection references

### Debugging Tips

1. **Content Validation**
   ```bash
   npm run build
   ```
   This will show any schema validation errors.

2. **Type Checking**
   ```bash
   npx tsc --noEmit
   ```
   This will check for TypeScript errors.

3. **Development Server**
   ```bash
   npm run dev
   ```
   The dev server will show real-time validation errors.

## Related Resources

- [Podcast Artwork Integration Guide](./PODCAST-ARTWORK-INTEGRATION.md) - Technical implementation of artwork system
- [Podcast Artwork Guide](./PODCAST-ARTWORK-GUIDE.md) - Complete artwork specifications
- [Content Collections User Guide](./content-collections-user-guide.md) - How to create and manage content
- [Schema Reference](./schemas.md) - Complete schema definitions
- [Media Files Guide](./MEDIA-FILES-GUIDE.md) - Media file requirements and setup

## Conclusion

This content collections implementation provides a robust, type-safe, and maintainable solution for managing podcast content in IndieCaster. It follows Astro best practices and provides a solid foundation for future enhancements, including comprehensive podcast artwork support that works across all major platforms. 
