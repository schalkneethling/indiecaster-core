# Media File Requirements

## Overview

IndieCaster requires various media files for your podcast to display correctly and meet podcast platform requirements. This document outlines all media requirements, formats, and best practices.

## Directory Structure

```
public/
├── audio/
│   └── episodes/                 # Episode audio files
│       ├── episode-1.mp3
│       ├── episode-2.mp3
│       └── ...
├── profile-images/               # Host and guest profile photos
│   ├── john-doe.png             # Base image (200x200px)
│   ├── john-doe@2x.webp         # High-res WebP (400x400px)
│   ├── john-doe@2x.avif         # High-res AVIF (400x400px)
│   └── ...
├── episode-artwork/              # Episode-specific artwork
│   ├── episode-1.png
│   ├── episode-1.webp
│   └── ...
├── logo.svg                      # Podcast logo/artwork
├── favicon-16x16.png             # Browser favicon
├── favicon-32x32.png             # Browser favicon
├── apple-touch-icon.png          # iOS home screen icon
└── social-share.png              # Social media share image
```

---

## 1. Podcast Artwork (Logo)

### Purpose
- Main podcast cover art
- Appears in podcast directories (Apple Podcasts, Spotify, etc.)
- Shown in RSS feed
- Used as default when episode artwork isn't specified

### Requirements

**File Location:** `public/logo.svg` or `public/logo.png`

**Format Options:**
- **SVG (Recommended):** Scalable, small file size, sharp at any resolution
- **PNG:** If SVG isn't available, use high-resolution PNG

**Dimensions:**
- **Minimum:** 1400 x 1400 pixels
- **Recommended:** 3000 x 3000 pixels
- **Maximum:** 3000 x 3000 pixels
- **Aspect Ratio:** 1:1 (perfect square)

**Technical Specs:**
- **Color Space:** RGB
- **File Size:** Under 500 KB (strictly enforced by Apple)
- **Resolution:** 72 DPI minimum

**Content Guidelines:**
- Must be clear and legible at small sizes (55x55px)
- Avoid text smaller than 12pt
- No borders or edges touching the artwork boundary
- High contrast for visibility
- Avoid explicit content (follow podcast platform policies)

### Platform-Specific Notes

**Apple Podcasts:**
- 3000x3000px required for best quality
- Will reject artwork with borders/frames
- Must be unique to your podcast

**Spotify:**
- Minimum 640x640px, recommends 3000x3000px
- Square aspect ratio required
- File size under 500KB

### How to Create

**Canva:**
1. Create custom size: 3000x3000px
2. Design your artwork
3. Download as PNG (maximum quality)

**Adobe Photoshop/Illustrator:**
1. Create new document: 3000x3000px, RGB, 72 DPI
2. Design your artwork
3. Export as PNG-24 or SVG

**Free Tools:**
- **Figma:** Free design tool with export options
- **GIMP:** Free alternative to Photoshop
- **Inkscape:** Free vector graphics editor (for SVG)

---

## 2. Episode Artwork

### Purpose
- Unique artwork per episode (optional)
- Overrides podcast artwork for specific episodes
- Useful for featuring guests, topics, or series

### Requirements

**File Location:** `public/episode-artwork/[artwork-filename].png`

**Formats Required:**
- `[filename].png` - Base PNG format
- `[filename].webp` - WebP format (smaller, modern browsers)

**Dimensions:** Same as podcast artwork (3000x3000px recommended)

**Technical Specs:**
- Same as podcast artwork
- Color Space: RGB
- File Size: Under 500 KB per format

### Episode Frontmatter

```yaml
artwork:
  src: "episode-1-artwork.png"
  alt: "Episode 1: Getting Started"
```

**Note:** Specify only the PNG filename; WebP versions are automatically detected.

### When to Use Episode Artwork

✅ **Good Use Cases:**
- Featuring a guest's photo/branding
- Series within your podcast (different visual theme)
- Special episodes (live recordings, bonus content)
- Seasonal variations

❌ **Avoid:**
- Changing artwork every episode (inconsistent branding)
- Episode numbers in artwork (use episodeNumber field instead)
- Text that's hard to read at small sizes

---

## 3. Profile Images (Hosts & Guests)

### Purpose
- Display photos of podcast hosts and guests
- Shown on About page, episode pages, and profiles
- Builds personal connection with audience

### Requirements

**File Location:** `public/profile-images/[name-slug]/`

**Required Formats:** (Three versions for progressive enhancement)
1. `[name-slug].png` - Base image (200x200px)
2. `[name-slug]@2x.webp` - High-res WebP (400x400px)
3. `[name-slug]@2x.avif` - High-res AVIF (400x400px)

**Dimensions:**
- Base: 200 x 200 pixels
- High-res (@2x): 400 x 400 pixels
- Aspect Ratio: 1:1 (square)

**Technical Specs:**
- Color Space: RGB
- File Size: Under 200 KB total for all three formats
- Format: Face-centered, professional appearance

### Creating Profile Images

**Recommended Process:**
1. Start with high-resolution photo (1000x1000px or larger)
2. Crop to square, center face
3. Export in three formats using Sharp, Squoosh, or similar tools

**Using Sharp (Command Line):**
```bash
# Install Sharp
npm install -g sharp-cli

# Convert to all formats
sharp input.jpg -o profile-images/john-doe.png --resize 200 200
sharp input.jpg -o profile-images/john-doe@2x.webp --resize 400 400 --format webp
sharp input.jpg -o profile-images/john-doe@2x.avif --resize 400 400 --format avif
```

**Using Online Tools:**
- **Squoosh:** https://squoosh.app/ (drag & drop, convert formats)
- **CloudConvert:** https://cloudconvert.com/ (batch conversion)

### Profile Image Guidelines

**Content:**
- Professional headshot or casual portrait
- Face clearly visible
- Good lighting
- Neutral or branded background
- Smile and approachable expression

**Technical:**
- Sharp focus (not blurry)
- Proper exposure (not too dark/bright)
- Minimal compression artifacts
- Consistent style across all hosts/guests

---

## 4. Audio Files

### Purpose
- Episode audio content
- Downloaded/streamed by podcast apps
- Core content of your podcast

### Requirements

**File Location:** `public/audio/episodes/[audioFile].mp3`

**Format:** MP3 (MPEG-1 Audio Layer 3)

**Recommended Specs:**
- **Bitrate:** 128-192 kbps (higher for music, lower acceptable for speech)
- **Sample Rate:** 44.1 kHz (CD quality)
- **Channels:** Mono (speech only) or Stereo (music/effects)
- **Variable Bitrate (VBR):** Acceptable, may reduce file size

**File Size Considerations:**
- 128 kbps ≈ 1 MB per minute (60 MB for 60-minute episode)
- 192 kbps ≈ 1.4 MB per minute (84 MB for 60-minute episode)
- Aim for balance between quality and download size

### Episode Frontmatter

```yaml
audioFile: "episode-1-getting-started"
duration: "45:30"
```

**Note:** Omit the `.mp3` extension in frontmatter; it's added automatically.

### Audio Production Guidelines

**Recording Quality:**
- Record in lossless format (WAV, FLAC) initially
- Minimum 44.1 kHz, 16-bit
- Use good microphone (USB condenser recommended)
- Quiet recording environment

**Editing & Processing:**
- Remove long pauses, ums/ahs (optional)
- Normalize audio levels (-16 to -20 LUFS)
- Apply compression to even out volume
- Add intro/outro music (if applicable)
- Export as MP3 with target specs

**Recommended Software:**
- **Audacity** (Free, cross-platform)
- **Adobe Audition** (Professional, paid)
- **GarageBand** (Free, Mac only)
- **Reaper** (Affordable, professional features)

### Audio File Naming

**Good Examples:**
- `getting-started-podcast.mp3`
- `interview-jane-doe.mp3`
- `episode-001-introduction.mp3`

**Bad Examples:**
- `Episode 1.mp3` (spaces, capitals)
- `podcast_final_FINAL_v2.mp3` (not descriptive)
- `audio.mp3` (too generic)

**Best Practices:**
- Use lowercase
- Replace spaces with hyphens
- Descriptive but concise
- Match the `audioFile` field in frontmatter

---

## 5. Favicon & Touch Icons

### Purpose
- Browser tab icon
- Bookmarks
- iOS/Android home screen icon

### Requirements

**Files Needed:**
- `public/favicon-16x16.png` - Small browser icon
- `public/favicon-32x32.png` - Standard browser icon
- `public/apple-touch-icon.png` - iOS home screen (180x180px)

**Dimensions:**
- 16x16px - Small browsers, bookmarks
- 32x32px - Standard browser tabs
- 180x180px - Apple touch icon

**Format:** PNG with transparency (if applicable)

**Design:**
- Simplified version of your logo
- Clear at small sizes
- Solid background recommended (avoid complex gradients)

### Creating Favicons

**From Existing Logo:**
1. Open logo in image editor
2. Simplify design (remove small details)
3. Resize to required dimensions
4. Export as PNG

**Favicon Generators:**
- https://realfavicongenerator.net/ (comprehensive)
- https://favicon.io/ (simple, fast)

---

## 6. Social Media Share Image

### Purpose
- Image shown when podcast website is shared on social media
- Appears in Open Graph (Facebook, LinkedIn) and Twitter Cards

### Requirements

**File Location:** `public/social-share.png`

**Dimensions:**
- **Open Graph:** 1200 x 630 pixels
- **Aspect Ratio:** 1.91:1
- **Twitter:** Same dimensions work for large card

**Technical Specs:**
- Format: PNG or JPG
- File Size: Under 1 MB (under 5 MB maximum)
- Color Space: RGB

**Design Guidelines:**
- Include podcast name/logo
- Brief tagline or description
- Avoid small text (may not be legible in previews)
- Design for center-crop (platforms may crop differently)

---

## 7. Transcripts (Optional)

### Purpose
- Accessibility for hearing-impaired listeners
- SEO benefits (searchable content)
- Reference for listeners

### Requirements

**File Location:** `public/transcripts/[episode-slug].vtt` or `.srt`

**Formats:**
- **VTT (WebVTT):** Web standard, preferred
- **SRT (SubRip):** Alternative, widely supported

**Episode Frontmatter:**
```yaml
hasVttTranscript: true
hasSrtTranscript: true
```

### VTT Format Example

```vtt
WEBVTT

00:00:00.000 --> 00:00:05.000
Welcome to My Podcast. I'm your host, John Doe.

00:00:05.000 --> 00:00:10.000
Today we're talking about getting started with podcasting.
```

### Creating Transcripts

**Manual Transcription:**
- Time-consuming but accurate
- Use tools like oTranscribe (free)

**Automated Services:**
- **Otter.ai** - AI transcription, reasonably accurate
- **Rev.com** - Human transcription, higher cost but perfect accuracy
- **Whisper (OpenAI)** - Free, self-hosted AI transcription

---

## Quick Start Checklist

Before launching your podcast, ensure these files exist:

### Required Files
- [ ] Podcast artwork: `public/logo.svg` or `logo.png` (3000x3000px)
- [ ] At least one episode audio: `public/audio/episodes/[name].mp3`
- [ ] Host profile images: All three formats (.png, @2x.webp, @2x.avif)
- [ ] Favicons: 16x16, 32x32, and apple-touch-icon

### Recommended Files
- [ ] Episode artwork: `public/episode-artwork/[name].png` (if unique per episode)
- [ ] Social share image: `public/social-share.png` (1200x630px)

### Optional Files
- [ ] Guest profile images: All three formats
- [ ] Episode transcripts: `.vtt` or `.srt` files

---

## Media Optimization Tips

### Reduce File Sizes

**Images:**
- Use WebP and AVIF formats (50-80% smaller than PNG/JPG)
- Compress PNG files with TinyPNG or ImageOptim
- Use appropriate dimensions (don't upload 5000px images if only displaying 500px)

**Audio:**
- Use 128 kbps for speech-only podcasts
- Apply audio compression to reduce dynamic range
- Remove silent gaps to reduce duration

### Automate Optimization

IndieCaster includes Sharp for automatic image optimization during build:
- PNG files are compressed
- Multiple formats are generated automatically (when using setup wizard)
- Responsive images served based on device

### CDN Considerations

For large media files, consider using a CDN:
- **Cloudflare** (free tier available)
- **AWS CloudFront**
- **Bunny CDN** (affordable, podcast-specific plans)

**Benefits:**
- Faster global delivery
- Reduced bandwidth costs
- Better reliability

---

## Validation & Testing

### Check Your Media Files

Run the media validation script (Phase 1 deliverable):
```bash
npm run validate-media
```

This will check:
- All required files exist
- Files are not 1-byte placeholders
- Image dimensions meet requirements
- Audio files are accessible
- File sizes are within limits

### Manual Checks

1. **Visual Inspection:**
   - View each image in your site
   - Check images scale properly on mobile
   - Verify artwork appears in RSS feed

2. **Audio Playback:**
   - Test audio plays on multiple devices
   - Check volume levels are consistent
   - Verify no clicking, popping, or distortion

3. **Browser Testing:**
   - Check favicons appear correctly
   - Test social sharing preview (Twitter/Facebook)
   - Verify images load on slow connections

---

## Troubleshooting

### Images Not Appearing

**Symptom:** Broken image icons or alt text only

**Solutions:**
- Check file exists at expected path
- Verify filename matches frontmatter exactly (case-sensitive!)
- Ensure file extensions are lowercase (.png, not .PNG)
- Rebuild site: `npm run build`

### Audio Not Playing

**Symptom:** Player shows but no audio or error

**Solutions:**
- Verify audio file exists and is valid MP3
- Check audioFile field in frontmatter (no .mp3 extension)
- Test audio file plays in media player separately
- Check browser console for errors (might be MIME type issue)

### File Size Too Large

**Symptom:** Slow page loads, rejected by validators

**Solutions:**
- **Images:** Use compression tools (TinyPNG, Squoosh)
- **Audio:** Reduce bitrate or trim silent sections
- **Artwork:** Ensure under 500 KB (Apple requirement)

### AVIF/WebP Not Working

**Symptom:** Modern formats not displaying

**Solutions:**
- Check Sharp is installed: `npm list sharp`
- Verify build process completes without errors
- Fallback PNG should always work
- Browser must support format (check caniuse.com)

---

## Resources & Tools

### Image Tools
- **Canva** - https://canva.com/ (Podcast artwork templates)
- **Squoosh** - https://squoosh.app/ (Image optimization)
- **TinyPNG** - https://tinypng.com/ (Batch compression)
- **Figma** - https://figma.com/ (Professional design, free tier)

### Audio Tools
- **Audacity** - https://www.audacityteam.org/ (Free audio editor)
- **Auphonic** - https://auphonic.com/ (Automatic audio optimization)
- **Levelator** - (Free automatic leveling)
- **Adobe Audition** - https://www.adobe.com/products/audition.html (Professional)

### Validation Tools
- **Cast Feed Validator** - https://castfeedvalidator.com/
- **Podbase** - https://podba.se/validate/
- **W3C Validator** - https://validator.w3.org/

### Learning Resources
- **Apple Podcasts Specifications** - https://podcasters.apple.com/support/823-podcast-requirements
- **Spotify Delivery Specs** - https://podcasters.spotify.com/resources/podcast-rss-specification
- **Buzzsprout Artwork Guide** - https://www.buzzsprout.com/help/16-designing-podcast-artwork

---

## Summary

### Critical Files (Must Have)
1. Podcast artwork (logo) - 3000x3000px
2. Episode audio files - MP3, 128-192 kbps
3. Host profile image - Three formats

### Important Files (Should Have)
1. Episode artwork - If featuring guests/topics
2. Social share image - For better social media presence
3. Proper favicons - Professional appearance

### Optional Files (Nice to Have)
1. Guest profile images - For guest-focused podcasts
2. Episode transcripts - Accessibility and SEO
3. Multiple artwork versions - For different platforms

---

**Last Updated:** Phase 1 - Foundation & Bug Fixes
**Next:** Create media validation script to automate checks
