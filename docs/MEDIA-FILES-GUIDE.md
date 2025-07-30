# Media Files Guide

## Overview

This guide helps you set up all the media files needed for your IndieCaster podcast website. We've designed this to be as simple as possible - you can start with just the essentials and add more artwork as your podcast grows.

## Quick Start (Minimal Setup)

### Essential Files You Need Right Now

1. **One Show Cover Image** (3000x3000px PNG/JPEG)
2. **Episode Audio Files** (MP3 format)
3. **Host Profile Picture** (400x400px)
4. **Basic Profile Pictures** (400x400px for guests)

That's it! IndieCaster will handle the rest automatically.

## Podcast Artwork Made Simple

### The One Image You Need: Show Cover

**File**: `public/episode-artwork/show-cover.png`
**Size**: 3000x3000 pixels (square)
**Format**: PNG or JPEG
**File Size**: Under 500KB

This is your podcast's main visual identity. It appears:
- On your website homepage
- In episode cards
- On podcast platforms (Apple Podcasts, Spotify, etc.)
- In RSS feeds

**Pro Tip**: Create this once and you're set for your entire podcast!

### Optional: Episode-Specific Artwork

Want to make each episode more visually distinct? Add episode-specific artwork:

**File**: `public/episode-artwork/{episode-slug}-episode-art.png`
**Size**: 3000x3000 pixels (square)
**Format**: PNG or JPEG
**File Size**: Under 500KB

**When to use this**:
- You have a guest with a recognizable face
- The episode covers a specific topic that deserves its own visual
- You want to make episodes more discoverable on platforms

**When to skip this**:
- You're just starting out
- You want to keep things simple
- Your show cover works well for all episodes

### Optional: Hero Image for Homepage

Want a wide banner on your homepage? Add a hero image:

**File**: `public/episode-artwork/hero-image.png`
**Size**: 4320x1080 pixels (wide rectangle)
**Format**: PNG or JPEG
**File Size**: Under 500KB

**When to use this**:
- You want a dramatic homepage banner
- Your show cover doesn't work well in wide format
- You want to highlight featured episodes

## Audio Files

### Episode Audio
**Location**: `public/audio/episodes/`
**Format**: MP3
**Quality**: 128kbps minimum, 320kbps preferred
**Naming**: Use descriptive filenames (e.g., `episode-1-guest-interview.mp3`)

### Promo Audio (Optional)
**Location**: `public/audio/episodes/promo.mp3`
**Duration**: 30-60 seconds
**Content**: Brief introduction to your podcast

**Featured Episode Audio**: If you configure a featured episode in `indiecaster.config.js`, this audio file will be used on the homepage instead of the latest published episode.

## Featured Episode Configuration (Optional)

### Purpose
The featured episode configuration allows you to **override** the latest published episode on your homepage. This is useful for:
- Highlighting a specific episode you want to promote
- Showcasing your best or most representative episode
- Ensuring new visitors see your preferred episode first

### Configuration
Add this section to your `indiecaster.config.js`:

```javascript
// <<-- START :: Featured episode configuration (OPTIONAL)
// Remove this entire section if you want to use the latest published episode instead
featuredEpisodeGuestName: "Guest Name",
featuredEpisodeGuestProfilePicture: "guest-filename",
featuredEpisodeTitle: "Your Featured Episode Title",
featuredEpisodeSummary: "Episode description...",
featuredEpisodeTrack: "audio-filename", // without .mp3 extension
featuredEpisodeURL: "episode-slug",
// <<-- END :: Featured episode configuration
```

### Behavior
- **When configured**: Homepage displays the featured episode (overrides latest episode)
- **When not configured**: Homepage displays the latest published episode
- **Defensive**: Code handles missing configuration gracefully

### Required Files
When using a featured episode, ensure these files exist:
- **Audio**: `public/audio/episodes/{featuredEpisodeTrack}.mp3`
- **Guest Photo**: `public/profile-images/{featuredEpisodeGuestProfilePicture}.webp`
- **Episode**: Must exist in `src/content/episodes/{featuredEpisodeURL}.md`

### Validation
The system automatically validates that:
- The configured episode URL corresponds to a real episode in content collections
- The episode is published (not a draft)
- All required media files exist

If validation fails, the system will:
- Log a warning with available episode slugs
- Fallback to the latest published episode
- Continue to function normally

## Profile Pictures

### Host Profile Picture (Required)
**Location**: `public/profile-images/`
**Size**: 400x400 pixels (square)
**Format**: WebP (preferred) or PNG
**Naming**: Use the filename specified in your config (e.g., `schalk-neethling.webp`)

**Configuration**: The host profile image filename is set in `indiecaster.config.js`:
```javascript
hostName: "Your Name",
hostProfilePicture: "your-filename", // without extension
```

**Where it appears**:
- About page (host information section)
- Episode profile cards
- Featured episode sections
- Throughout your podcast website

**Pro Tip**: Use a professional headshot that represents your podcast's tone and style!

### Guest Profile Pictures
**Location**: `public/profile-images/`
**Size**: 400x400 pixels (square)
**Format**: WebP (preferred) or PNG
**Naming**: Use guest names (e.g., `jane-springfield.webp`)

**Pro Tip**: Ask guests to send you a high-quality headshot. Most people have one!

## Logo and Branding

### Logo Files
**Location**: `public/`
**Files Needed**:
- `logo.svg` (primary - scales perfectly)
- `logo.png` (fallback - 200x60px)

**Pro Tip**: If you don't have a logo yet, use a simple text-based design. You can always update it later!

## Favicon and Icons

### Essential Favicon
**Location**: `public/`
**File**: `favicon.svg` (scales to all sizes automatically)

**Pro Tip**: Use a simple version of your logo or podcast initials.

## File Organization

### Simple Structure
```
public/
├── episode-artwork/
│   ├── show-cover.png              # Your main podcast artwork
│   ├── episode-1-episode-art.png   # Optional episode-specific art
│   └── hero-image.png              # Optional homepage banner
├── audio/
│   └── episodes/
│       ├── episode-1.mp3
│       └── episode-2.mp3
├── profile-images/
│   ├── guest-1.webp
│   └── guest-2.webp
├── logo.svg
└── favicon.svg
```

## Quick Setup Commands

### 1. Create Directories
```bash
mkdir -p public/episode-artwork
mkdir -p public/audio/episodes
mkdir -p public/profile-images
```

### 2. Add Your Show Cover
```bash
# Copy your show cover image to:
cp your-show-cover.png public/episode-artwork/show-cover.png
```

### 3. Add Episode Audio
```bash
# Copy your episode audio files to:
cp episode-1.mp3 public/audio/episodes/
cp episode-2.mp3 public/audio/episodes/
```

### 4. Add Host Profile Picture
```bash
# Copy your host profile picture to:
cp your-host-photo.webp public/profile-images/schalk-neethling.webp
cp your-host-photo.png public/profile-images/schalk-neethling.png
```

### 5. Add Guest Photos
```bash
# Copy guest profile pictures to:
cp guest-photo.webp public/profile-images/guest-name.webp
```

## Artwork Best Practices

### Design Tips
- **Keep it simple**: Your show cover should work at small sizes
- **Use readable fonts**: Test at 300x300px to ensure text is clear
- **High contrast**: Works better on different backgrounds
- **No platform logos**: Don't include Apple, Spotify, etc.
- **No episode numbers**: Keep it timeless

### Technical Requirements
- **No transparency**: Use solid backgrounds
- **RGB color space**: Not CMYK
- **Under 500KB**: For fast loading
- **Square format**: 3000x3000px for show covers

### Content Guidelines
- **Include your show title**: Make it prominent
- **Reflect your topic**: Give listeners a sense of what you discuss
- **Professional quality**: Avoid blurry or low-resolution images
- **No explicit content**: Keep it family-friendly

## Testing Your Setup

### 1. Start Your Site
```bash
npm run dev
```

### 2. Check These Pages
- **Homepage**: Shows your show cover and latest episodes
- **About page**: Displays your host profile picture and information
- **Episodes page**: Displays episode cards with artwork
- **Individual episode pages**: Shows episode-specific artwork if available
- **Guest profiles**: Displays guest photos

### 3. Common Issues
- **404 errors**: Check file paths and naming
- **Images not loading**: Verify file formats and permissions
- **Audio not playing**: Check file format (should be MP3)

## Growing Your Artwork

### Phase 1: Essentials (Start Here)
- Show cover image
- Episode audio files
- Host profile picture
- Basic guest photos

### Phase 2: Enhanced (When You're Ready)
- Episode-specific artwork for special episodes
- Hero image for homepage
- Promo audio clip

### Phase 3: Professional (Optional)
- Channel artwork (if you have multiple shows)
- Subscription artwork (if you have premium content)
- Multiple artwork formats for different contexts

## Pro Tips for Indie Podcasters

### Start Simple
Don't overthink your artwork when you're starting out. A clean, simple show cover is better than a complex design that takes forever to create.

### Batch Your Work
Create episode artwork in batches rather than one at a time. This saves time and ensures consistency.

### Use Templates
Create a basic template for episode artwork that you can quickly customize for each episode.

### Ask for Help
If you're not a designer, consider:
- Using Canva templates
- Hiring a designer for your show cover
- Asking a design-savvy friend for help

### Plan for Growth
Start with the essentials, but design your show cover to work well as your podcast grows.

## Troubleshooting

### Images Not Loading
1. Check file paths match your episode frontmatter
2. Verify files are in the correct directories
3. Ensure file extensions are correct

### Audio Not Playing
1. Verify files are MP3 format
2. Check file permissions
3. Ensure filenames match episode frontmatter

### Artwork Not Displaying Correctly
1. Check artwork naming conventions
2. Verify file dimensions (3000x3000px for show covers)
3. Ensure files are under 500KB

## Resources

### Design Tools
- **Canva**: Free templates and easy design tools
- **Figma**: Professional design platform (free tier available)
- **GIMP**: Free alternative to Photoshop

### Image Optimization
- **TinyPNG**: Compress images without quality loss
- **Squoosh**: Google's image optimization tool

### Templates and Inspiration
- [Apple Podcasts Template Library](https://podcasters.apple.com/) - Industry standard templates
- [Canva Podcast Templates](https://www.canva.com/) - Free podcast artwork templates

## Need More Help?

- **Artwork Specifications**: See [Podcast Artwork Guide](./PODCAST-ARTWORK-GUIDE.md)
- **Technical Details**: See [Podcast Artwork Integration Guide](./PODCAST-ARTWORK-INTEGRATION.md)
- **Adding Episodes**: See [Content Collections User Guide](./content-collections-user-guide.md)

---

**Remember**: The goal is to make podcasting easier, not harder. Start with the essentials and add more artwork as your podcast grows. Your content is what matters most! 
