# Podcast Artwork Integration Guide

This guide explains how podcast artwork requirements are integrated into IndieCaster's codebase and how to use the new artwork system effectively. The system follows industry standards that work across all major podcast platforms.

## Overview

IndieCaster includes comprehensive support for podcast artwork requirements through:

1. **Enhanced Content Schema**: Updated episode schema to support podcast-specific artwork
2. **Artwork Utility Functions**: JavaScript utilities for handling different artwork contexts
3. **Component Updates**: Updated components to use the new artwork system
4. **Backward Compatibility**: Maintains support for existing artwork structure
5. **RSS Feed Integration**: Proper artwork handling for podcast distribution
6. **Website Optimization**: Context-aware artwork selection for different display contexts

## Architecture

### Content Schema Updates

The episode content schema has been enhanced to support podcast artwork requirements:

```typescript
artwork: z.object({
  src: z.string(),                    // Legacy support
  alt: z.string(),                    // Accessibility
  podcast: z.object({                 // Podcast-specific artwork
    showCover: z.string().optional(), // 3000x3000px for podcast platforms
    episodeArt: z.string().optional(), // 3000x3000px for individual episodes
    heroImage: z.string().optional(), // 4320x1080px for wide format displays
  }).optional(),
  legacy: z.object({                  // Legacy support
    src: z.string(),
    alt: z.string()
  }).optional()
})
```

### Artwork Utility Functions

Located in `src/utils/artwork.js`, these functions handle artwork selection and validation:

#### `getArtwork(artwork, context, format)`
Selects appropriate artwork based on context and format requirements.

**Parameters:**
- `artwork`: Artwork object from episode frontmatter
- `context`: Usage context ('show', 'episode', 'hero', 'card')
- `format`: Image format ('png', 'webp', 'svg')

**Returns:** Object with `src` and `alt` properties

#### `getArtworkWithFormat(artwork, context, format)`
Similar to `getArtwork` but ensures proper file extension.

#### `validatePodcastArtwork(artwork)`
Validates artwork against podcast platform requirements.

#### `getArtworkDimensions(context)`
Returns recommended dimensions for different contexts.

#### `getRssArtwork(artwork)`
Gets artwork optimized for RSS feed distribution.

#### `getHomepageArtwork(artwork)`
Gets artwork optimized for homepage display.

## Component Integration

### CardEpisode Component

**File**: `src/components/CardEpisode.astro`

**Changes:**
- Uses `getArtworkWithFormat()` for optimal artwork selection
- Supports WebP format for better performance
- Includes lazy loading for better performance

**Usage:**
```astro
---
import { getArtworkWithFormat } from "../utils/artwork.js";

const cardArtwork = getArtworkWithFormat(artwork, 'card', 'webp');
---

<img src={cardArtwork.src} alt={cardArtwork.alt} loading="lazy" />
```

### DefaultHeroPlayer Component

**File**: `src/components/DefaultHeroPlayer.astro`

**Changes:**
- Uses `getArtworkWithFormat()` for hero context
- Supports hero images for wide format displays
- Falls back to episode art or show cover

**Usage:**
```astro
---
import { getArtworkWithFormat } from "../utils/artwork.js";

const heroArtwork = getArtworkWithFormat(episode.artwork, 'hero', 'webp');
const backgroundImg = `url(${heroArtwork.src})`;
---
```

### EpisodeLayout Component

**File**: `src/layouts/EpisodeLayout.astro`

**Changes:**
- Passes complete artwork object to child components
- Enables context-aware artwork selection

## File Organization

### Recommended File Structure

```
public/
├── episode-artwork/
│   ├── show-cover.png              # Main show cover (3000x3000)
│   ├── episode-1-show-cover.png    # Episode 1 show cover (3000x3000)
│   ├── episode-1-episode-art.png   # Episode 1 artwork (3000x3000)
│   ├── episode-1-hero-image.png    # Episode 1 hero (4320x1080)
│   ├── episode-1.webp              # Episode 1 web format
│   ├── episode-1.png               # Episode 1 fallback
│   └── episode-default.webp        # Default artwork
```

### Naming Conventions

- **Show Cover**: `{episode-slug}-show-cover.png`
- **Episode Art**: `{episode-slug}-episode-art.png`
- **Hero Image**: `{episode-slug}-hero-image.png`
- **Web Format**: `{episode-slug}.webp`
- **Fallback**: `{episode-slug}.png`

## Usage Examples

### Basic Episode with Podcast Artwork

```yaml
---
title: "Your Episode Title"
description: "Episode description"
pubDate: 2024-01-15
duration: "45:30"
audioFile: "episode-1"
artwork:
  src: "episode-1"
  alt: "Episode artwork showing tech discussion"
  podcast:
    showCover: "episode-1-show-cover"
    episodeArt: "episode-1-episode-art"
    heroImage: "episode-1-hero-image"
---
```

### Legacy Episode (Backward Compatible)

```yaml
---
title: "Your Episode Title"
description: "Episode description"
pubDate: 2024-01-15
duration: "45:30"
audioFile: "episode-1"
artwork:
  src: "episode-1"
  alt: "Episode artwork showing tech discussion"
---
```

### Episode with Only Show Cover

```yaml
---
title: "Your Episode Title"
description: "Episode description"
pubDate: 2024-01-15
duration: "45:30"
audioFile: "episode-1"
artwork:
  src: "episode-1"
  alt: "Episode artwork showing tech discussion"
  podcast:
    showCover: "episode-1-show-cover"
---
```

## Context-Aware Artwork Selection

The artwork system automatically selects the most appropriate artwork based on context:

### Show Context
- **Primary**: `podcast.showCover`
- **Fallback**: `artwork.src`
- **Use Case**: Main show branding, podcast platform submission

### Episode Context
- **Primary**: `podcast.episodeArt`
- **Fallback**: `podcast.showCover`
- **Use Case**: Individual episode pages, episode-specific branding

### Hero Context
- **Primary**: `podcast.heroImage`
- **Fallback**: `podcast.episodeArt`
- **Use Case**: Wide format displays, hero sections, homepage banners

### Card Context
- **Primary**: `podcast.episodeArt`
- **Fallback**: `podcast.showCover`
- **Use Case**: Episode cards, listings, thumbnails

### RSS Context
- **Primary**: `podcast.episodeArt`
- **Fallback**: `podcast.showCover`
- **Use Case**: Podcast RSS feeds, platform distribution

## RSS Feed Integration

### Artwork in RSS Feeds

Podcast artwork is automatically included in RSS feeds for distribution to platforms:

```xml
<item>
  <title>Episode Title</title>
  <description>Episode description</description>
  <enclosure url="audio-file.mp3" type="audio/mpeg" length="12345678"/>
  <itunes:image href="https://yoursite.com/episode-artwork/episode-1-episode-art.png"/>
  <itunes:duration>45:30</itunes:duration>
</item>
```

### RSS Artwork Selection

The `getRssArtwork()` function automatically selects the best artwork for RSS feeds:

```javascript
import { getRssArtwork } from '../utils/artwork.js';

const rssArtwork = getRssArtwork(episode.artwork);
// Returns episode-specific artwork or show cover fallback
```

## Website Integration

### Homepage Usage

The `getHomepageArtwork()` function optimizes artwork for homepage display:

```javascript
import { getHomepageArtwork } from '../utils/artwork.js';

const homepageArtwork = getHomepageArtwork(episode.artwork);
// Returns hero image for wide displays or episode art fallback
```

### Episode Pages

Episode pages use context-aware artwork selection:

- **Hero Sections**: Use hero images for wide format displays
- **Episode Art**: Display episode-specific artwork prominently
- **Show Cover**: Use as fallback or secondary artwork

### Performance Optimization

- **WebP Format**: Primary format for web display (better compression)
- **Lazy Loading**: Implemented in card components
- **Responsive Images**: Automatic format selection based on browser support

## Validation and Quality Assurance

### Automatic Validation

The system includes validation functions to ensure artwork meets requirements:

```javascript
import { validatePodcastArtwork } from '../utils/artwork.js';

const validation = validatePodcastArtwork(artwork);
if (!validation.isValid) {
  console.error('Artwork validation errors:', validation.errors);
}
if (validation.warnings.length > 0) {
  console.warn('Artwork warnings:', validation.warnings);
}
```

### Quality Checklist

Before publishing episodes, ensure:

- [ ] **Podcast Artwork**: 3000x3000px PNG/JPEG files under 500KB
- [ ] **Hero Images**: 4320x1080px PNG/JPEG files under 500KB
- [ ] **Web Formats**: WebP and PNG fallbacks for web performance
- [ ] **Alt Text**: Descriptive alt text for accessibility
- [ ] **File Organization**: Proper naming and directory structure

## Migration Guide

### From Legacy Artwork

If you have existing episodes with the old artwork structure:

1. **No Immediate Changes Required**: Legacy artwork continues to work
2. **Gradual Migration**: Update episodes one by one to include podcast artwork
3. **File Preparation**: Create podcast platform compliant artwork files
4. **Schema Update**: Add `podcast` section to episode frontmatter

### Example Migration

**Before:**
```yaml
artwork:
  src: "episode-1"
  alt: "Episode artwork"
```

**After:**
```yaml
artwork:
  src: "episode-1"
  alt: "Episode artwork"
  podcast:
    showCover: "episode-1-show-cover"
    episodeArt: "episode-1-episode-art"
    heroImage: "episode-1-hero-image"
```

## Performance Considerations

### Image Optimization

- **WebP Format**: Primary format for web performance
- **Lazy Loading**: Implemented in card components
- **Responsive Images**: Automatic format selection based on browser support
- **File Size**: Podcast platform requirements ensure reasonable file sizes

### Caching Strategy

- **Static Assets**: Artwork files are served as static assets
- **CDN Ready**: File structure supports CDN deployment
- **Cache Headers**: Configure appropriate cache headers for artwork files

## Platform Compatibility

### Industry Standards

The artwork system follows industry standards that work across platforms:

- **Apple Podcasts**: Full compatibility with all artwork types
- **Spotify**: Supports episode artwork and show covers
- **Google Podcasts**: Uses RSS feed artwork
- **Other Platforms**: Most platforms accept standard podcast artwork

### RSS Feed Standards

Artwork is properly formatted for RSS feeds:

- **iTunes Tags**: `<itunes:image>` for episode artwork
- **Standard Format**: PNG/JPEG, 3000x3000px
- **URL Format**: Full URLs to artwork files

## Troubleshooting

### Common Issues

1. **Artwork Not Loading**
   - Check file paths and naming conventions
   - Verify files exist in `public/episode-artwork/`
   - Ensure proper file extensions

2. **Validation Errors**
   - Run validation functions to identify issues
   - Check podcast platform requirements
   - Verify file dimensions and formats

3. **Performance Issues**
   - Use WebP format for web display
   - Implement lazy loading
   - Optimize image file sizes

### Debug Tools

```javascript
// Debug artwork selection
import { getArtwork, validatePodcastArtwork } from '../utils/artwork.js';

console.log('Selected artwork:', getArtwork(artwork, 'episode', 'webp'));
console.log('Validation:', validatePodcastArtwork(artwork));
```

## Resources

### Documentation
- [Podcast Artwork Guide](./PODCAST-ARTWORK-GUIDE.md) - Complete artwork specifications
- [Content Collections User Guide](./content-collections-user-guide.md) - How to add episodes and artwork
- [Media Files Guide](./MEDIA-FILES-GUIDE.md) - Media file requirements and setup

### External Resources
- [Apple Podcasts Artwork Guide](https://podcasters.apple.com/artwork-guide) - Industry standard specifications
- [Apple Podcasts Connect](https://podcasters.apple.com/) - Upload artwork here
- [Spotify for Podcasters](https://podcasters.spotify.com/) - Spotify guidelines

---

**Need help?** Start with the [Podcast Artwork Guide](./PODCAST-ARTWORK-GUIDE.md) for artwork specifications, or check the [Content Collections User Guide](./content-collections-user-guide.md) for adding episodes. 
