# IndieCaster Project Goals & MVP Implementation Plan

## Project Overview

IndieCaster is a complete website toolkit for indie podcasters, built with Astro. It provides a customizable, self-hosted podcast website solution that allows podcasters to easily manage and showcase their content without relying on third-party platforms.

## Current Project Goals

### ✅ **What's Already Implemented**

1. **Core Infrastructure**
   - Astro-based static site generator
   - Custom IndieCaster integration for configuration management
   - Responsive design system with CSS custom properties
   - Component-based architecture

2. **Essential Components**
   - Header with navigation
   - Footer with social media links
   - Podcast player (custom and hero variants)
   - Episode cards and summaries
   - Subscribe section with platform links
   - About/elevator pitch section

3. **Configuration System**
   - Comprehensive config file (`indiecaster.config.js`)
   - Virtual imports for configuration data
   - Customizable branding (colors, logos, typography)
   - Podcast metadata management
   - Social media and platform integration

4. **Content Management System** ✅ **NEW**
   - Content collections for episodes and guests (`src/content.config.ts`)
   - Zod schemas for episode and guest data validation
   - Sample episode content in markdown format
   - Dynamic episode pages with `[slug].astro` routing
   - Episode detail pages with audio player integration

5. **Basic Pages**
   - Homepage with featured episode
   - Episodes listing page
   - About page with host information and mission
   - Contact page with form and social media links
   - Base layout system

## 🚧 **What's Missing for MVP**

### 1. **Content Management System** ✅ **COMPLETED**
- ~~**Content Collections**: No content collections for episodes, guests, or other content~~
- ~~**Episode Pages**: No dynamic episode detail pages~~
- ~~**Content Schema**: No validation for episode metadata~~
- ~~**Markdown/MDX Support**: No content authoring workflow~~

### 2. **RSS Feed Generation**
- **Podcast RSS Feed**: Missing RSS feed for podcast platforms
- **Feed Validation**: No RSS validation or optimization
- **Episode Enclosures**: No audio file integration in RSS

### 3. **SEO & Metadata**
- **Sitemap Generation**: No XML sitemap
- **Open Graph**: Basic implementation needs enhancement
- **Structured Data**: No JSON-LD for podcast schema
- **Meta Tags**: Limited meta tag management

### 4. **Audio Management**
- **Audio File Handling**: Placeholder files created, needs actual audio files
- **Audio Player Enhancement**: Basic player needs features like speed control, volume
- **Audio Analytics**: No tracking or analytics

### 5. **Missing Pages & Features** ✅ **PARTIALLY COMPLETED**
- ~~**About Page**: No dedicated about page~~
- ~~**Contact Page**: No contact form or information~~
- **Episode Search**: No search functionality
- **Categories/Tags**: No episode categorization
- **Guest Profiles**: No guest management system

### 6. **Performance & Optimization**
- **Image Optimization**: No automatic image optimization
- **Audio Optimization**: No audio compression/optimization
- **Caching**: No caching strategy
- **CDN Integration**: No CDN setup

### 7. **Bug Fixes & Issues** ⚠️ **IDENTIFIED**
- **Slug Bug**: Documented routing issues with episode slugs (see `docs/SLUG-BUG-DOCUMENTATION.md`)
- **404 Errors**: Resolved with placeholder files, needs actual media files

## 📋 **MVP Implementation Plan**

### Phase 1: Content Foundation ✅ **COMPLETED**

#### 1.1 Content Collections Setup
```bash
# Create content structure
src/content/
├── episodes/
│   ├── episode-1.md
│   └── episode-2.md
├── guests/
│   ├── guest-1.md
│   └── guest-2.md
└── config.ts
```

**Tasks:**
- [x] Create `src/content.config.ts` with episode and guest collections
- [x] Define Zod schemas for episode and guest data
- [x] Migrate sample episode data to content collections
- [x] Update episode listing to use `getCollection()`

#### 1.2 Dynamic Episode Pages
```bash
src/pages/episodes/[slug].astro
```

**Tasks:**
- [x] Create dynamic route for individual episodes
- [x] Implement `getStaticPaths()` for episode generation
- [x] Create episode detail page layout
- [x] Add audio player integration
- [x] Include episode metadata and show notes

### Phase 2: RSS & Podcast Standards (Week 2-3)

#### 2.1 RSS Feed Implementation
```bash
src/pages/rss.xml.js
```

**Tasks:**
- [ ] Install `@astrojs/rss` package
- [ ] Create RSS feed endpoint
- [ ] Configure podcast-specific RSS fields
- [ ] Add audio enclosures to RSS items
- [ ] Validate RSS feed with podcast platforms

#### 2.2 SEO Enhancement
```bash
src/pages/sitemap.xml.js
```

**Tasks:**
- [ ] Generate XML sitemap
- [ ] Add JSON-LD structured data for podcasts
- [ ] Enhance Open Graph tags
- [ ] Implement meta tag management system

### Phase 3: Missing Pages & Features ✅ **PARTIALLY COMPLETED**

#### 3.1 Essential Pages
```bash
src/pages/
├── about.astro
├── contact.astro
└── 404.astro
```

**Tasks:**
- [x] Create about page with podcast information
- [x] Add contact page with form or contact details
- [ ] Implement 404 error page
- [ ] Add breadcrumb navigation

#### 3.2 Guest Management
```bash
src/pages/guests/[slug].astro
```

**Tasks:**
- [ ] Create guest profile pages
- [ ] Add guest listing page
- [ ] Link guests to episodes
- [ ] Add guest search functionality

### Phase 4: Audio & Player Enhancement (Week 4-5)

#### 4.1 Audio Player Features
**Tasks:**
- [ ] Add playback speed controls
- [ ] Implement volume control
- [ ] Add progress bar with time display
- [ ] Include skip forward/backward buttons
- [ ] Add keyboard shortcuts

#### 4.2 Audio File Management
**Tasks:**
- [ ] Set up audio file organization structure
- [ ] Implement audio file validation
- [ ] Add audio file metadata extraction
- [ ] Create audio file upload workflow

### Phase 5: Performance & Polish (Week 5-6)

#### 5.1 Performance Optimization
**Tasks:**
- [ ] Implement image optimization with `@astrojs/image`
- [ ] Add audio file compression
- [ ] Set up caching headers
- [ ] Optimize bundle size
- [ ] Add loading states

#### 5.2 User Experience
**Tasks:**
- [ ] Add search functionality
- [ ] Implement episode categories/tags
- [ ] Add episode recommendations
- [ ] Create mobile-optimized player
- [ ] Add accessibility improvements

## 🛠 **Technical Implementation Details**

### Content Collections Schema
```typescript
// src/content.config.ts
import { defineCollection, z } from 'astro:content';

const episodes = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    duration: z.string(),
    audioFile: z.string(),
    artwork: z.object({
      src: z.string(),
      alt: z.string()
    }),
    guests: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    youtube: z.string().optional()
  })
});

const guests = defineCollection({
  schema: z.object({
    name: z.string(),
    bio: z.string(),
    profilePicture: z.string(),
    socialLinks: z.record(z.string()).optional()
  })
});
```

### RSS Feed Configuration
```javascript
// src/pages/rss.xml.js
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const episodes = await getCollection('episodes');
  
  return rss({
    title: 'Podcast Name',
    description: 'Podcast description',
    site: context.site,
    items: episodes.map((episode) => ({
      title: episode.data.title,
      description: episode.data.description,
      pubDate: episode.data.pubDate,
      link: `/episodes/${episode.slug}/`,
      enclosure: {
        url: `/audio/${episode.data.audioFile}.mp3`,
        type: 'audio/mpeg'
      }
    })),
    customData: `
      <language>en-us</language>
      <itunes:category text="Technology"/>
      <itunes:explicit>false</itunes:explicit>
    `
  });
}
```

### Dynamic Episode Routes
```astro
---
// src/pages/episodes/[slug].astro
export async function getStaticPaths() {
  const episodes = await getCollection('episodes');
  
  return episodes.map((episode) => ({
    params: { slug: episode.slug },
    props: { episode }
  }));
}

const { episode } = Astro.props;
const { Content } = await episode.render();
---

<EpisodeLayout frontmatter={episode.data}>
  <Content />
</EpisodeLayout>
```

## 🎯 **Success Metrics**

### MVP Completion Criteria
- [x] All episodes accessible via dynamic routes
- [ ] Valid RSS feed accepted by major podcast platforms
- [ ] SEO-optimized with proper meta tags and structured data
- [x] Responsive design working on all devices
- [x] Audio player functional with basic controls
- [x] About and contact pages implemented
- [ ] Performance scores >90 on Lighthouse

### Future Enhancements (Post-MVP)

#### Content Management & User Experience
- [ ] **Content Creation Tools**
  - NPM script to generate skeleton episode files
  - NPM script to generate skeleton guest files
  - Template files with user guide references
  - Automated file naming and directory creation
- [ ] **Guest Integration**
  - Link guests to episodes automatically
  - Guest profile pages (`src/pages/guests/[slug].astro`)
  - Guest search and filtering
  - Guest listing page
- [ ] **Advanced Queries**
  - Filter episodes by tags
  - Search functionality across episodes and guests
  - Related episodes suggestions
  - Episode categories and series
- [ ] **Content Relationships**
  - Episode-to-guest references
  - Related content suggestions
  - Cross-referencing system
  - Guest episode history

#### Technical Features
- [ ] **RSS Integration**
  - Generate podcast RSS feeds
  - Include episode metadata
  - Support for podcast platforms (Apple, Spotify, etc.)
  - RSS feed validation
- [ ] **Analytics Integration**
  - Episode download tracking
  - User engagement metrics
  - Platform-specific analytics
- [ ] **Email Newsletter Signup**
  - Newsletter subscription system
  - Episode notifications
  - Guest announcements

#### Advanced Features
- [ ] **Episode Transcripts**
  - VTT files for audio players
  - SRT files for display
  - Searchable transcript content
  - Transcript timestamps
- [ ] **Multi-language Support**
  - Internationalization (i18n)
  - Translated episode content
  - Multi-language RSS feeds
- [ ] **Admin Dashboard**
  - Content management interface
  - Episode publishing workflow
  - Guest management system
  - Analytics dashboard

#### Monetization & Social
- [ ] **Social Media Integration**
  - Automated social media posting
  - Social media analytics
  - Cross-platform sharing
- [ ] **Monetization Features**
  - Sponsorship integration
  - Ad insertion capabilities
  - Premium content gating
  - Donation/support system

## 📚 **Resources & Dependencies**

### Required Packages
```json
{
  "@astrojs/rss": "^4.0.0",
  "@astrojs/image": "^0.18.0",
  "zod": "^3.22.0"
}
```

### Documentation References
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Astro RSS Integration](https://docs.astro.build/en/recipes/rss/)
- [Podcast RSS Specification](https://help.apple.com/itc/podcasts_connect/#/itcbaf351599)
- [JSON-LD Schema for Podcasts](https://schema.org/PodcastEpisode)

## 📊 **Current Progress Summary**

### ✅ **Recently Completed (Latest Session)**
- **Content Collections**: Fully implemented with Zod schemas and sample content
- **Dynamic Episode Pages**: Working `[slug].astro` routes with episode detail pages
- **About & Contact Pages**: Complete pages with responsive design and forms
- **404 Error Resolution**: Created placeholder files for all missing media assets
- **Bug Documentation**: Documented slug routing issues for future investigation

### 🎯 **Immediate Next Priorities**
1. **RSS Feed Implementation** (Phase 2.1)
   - Install `@astrojs/rss` package
   - Create podcast-compliant RSS feed
   - Add audio enclosures and iTunes tags

2. **SEO Enhancement** (Phase 2.2)
   - Generate XML sitemap
   - Add JSON-LD structured data
   - Enhance Open Graph tags

3. **Bug Investigation**
   - Investigate and resolve slug routing issues
   - Replace placeholder files with actual media

### 📈 **Progress Metrics**
- **MVP Completion**: 4/7 criteria met (57%)
- **Phase 1**: 100% complete ✅
- **Phase 2**: 0% complete (next priority)
- **Phase 3**: 50% complete (about/contact pages done)

This implementation plan will transform IndieCaster from a basic template into a fully functional podcast website platform that meets industry standards and provides a professional experience for both podcasters and listeners. 
