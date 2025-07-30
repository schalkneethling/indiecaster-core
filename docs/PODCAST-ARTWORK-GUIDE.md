# Podcast Artwork Guide

This guide provides comprehensive specifications and best practices for creating artwork that meets industry standards for podcast platforms. While Apple Podcasts is the most popular platform and their guidelines are widely adopted, these specifications work across all major podcast platforms.

## Quick Reference

### Required Artwork
- **Show Cover**: 3000x3000px, PNG/JPEG, under 500KB
- **Channel Icon**: 3000x3000px, PNG/JPEG, under 500KB (multi-show channels)
- **Channel Logo**: 3000x3000px, PNG/JPEG, under 500KB (multi-show channels)
- **Subscription Promotion**: 3000x3000px, PNG/JPEG, under 500KB (premium content)
- **Subscription Icon**: 3000x3000px, PNG/JPEG, under 500KB (premium content)

### Optional Artwork
- **Episode Art**: 3000x3000px, PNG/JPEG, under 500KB
- **Chapter Art**: 3000x3000px, PNG/JPEG, under 500KB
- **Hero Image**: 4320x1080px, PNG/JPEG, under 500KB
- **Full Page Show Art**: 3000x3000px, PNG/JPEG, under 500KB

## Detailed Specifications

### Show Cover (Required)
**Your podcast's primary visual identity**

| Specification | Requirement |
|---------------|-------------|
| **Format** | PNG or JPEG |
| **Dimensions** | 3000x3000 pixels (square) |
| **Minimum Size** | 1400x1400 pixels |
| **Color Space** | RGB |
| **File Size** | Under 500KB |
| **Background** | Solid (no transparency) |

**Content Requirements:**
- Must include show title
- Should reflect your topic and tone
- Avoid small text that becomes unreadable at small sizes
- No explicit content or offensive imagery

### Episode Art (Optional)
**Individual episode artwork for enhanced discoverability**

| Specification | Requirement |
|---------------|-------------|
| **Format** | PNG or JPEG |
| **Dimensions** | 3000x3000 pixels (square) |
| **Minimum Size** | 1400x1400 pixels |
| **Color Space** | RGB |
| **File Size** | Under 500KB |
| **Background** | Solid (no transparency) |

**Content Guidelines:**
- Highlights changing content, themes, and guests
- Can be episode-specific or follow a template
- Should maintain visual consistency with show branding
- Consider guest photos or episode-specific imagery

### Hero Image (Optional)
**Wide-format art for featured displays and homepage**

| Specification | Requirement |
|---------------|-------------|
| **Format** | PNG or JPEG |
| **Dimensions** | 4320x1080 pixels (4:1 aspect ratio) |
| **Minimum Size** | 2160x540 pixels |
| **Color Space** | RGB |
| **File Size** | Under 500KB |
| **Background** | Solid (no transparency) |

**Usage:**
- Used for featured displays on podcast platforms
- Perfect for homepage hero sections
- Should work well in horizontal layout
- Can be a wide-format version of your Show Cover

## Design Best Practices

### Visual Hierarchy
1. **Primary Element**: Show title should be the most prominent
2. **Secondary Elements**: Supporting graphics or imagery
3. **Tertiary Elements**: Additional details or branding

### Typography Guidelines
- **Font Size**: Ensure text is readable at small sizes (test at 1400x1400px)
- **Font Weight**: Use bold fonts for better visibility
- **Contrast**: High contrast between text and background
- **Spacing**: Adequate padding around text elements
- **Font Choice**: Use clear, readable fonts (avoid decorative fonts)

### Color Considerations
- **Brand Consistency**: Use your established brand colors
- **Accessibility**: Ensure sufficient color contrast (WCAG AA standards)
- **Platform Display**: Consider how colors appear on different devices
- **Dark Mode**: Test how artwork looks in dark mode
- **Color Psychology**: Choose colors that reflect your podcast's tone

### Content Guidelines

#### ✅ Do Include
- Show title prominently displayed
- Visual elements that reflect your content
- Professional, high-quality imagery
- Brand-consistent design elements
- Clear, readable typography

#### ❌ Don't Include
- Explicit or offensive content
- Promotional text ("New", "Exclusive", "Limited Time")
- Platform logos (Apple, Spotify, etc.)
- Episode numbers or dates
- Watermarks or overlays
- Transparent backgrounds
- Borders or frames
- Small text that becomes unreadable

### Technical Requirements
- **No Transparency**: Use solid backgrounds, not transparent PNGs
- **No Borders**: Don't add borders or frames
- **No Watermarks**: Avoid watermarks or overlays
- **High Quality**: Use high-resolution source images
- **Proper Compression**: Optimize file size without quality loss
- **RGB Color Space**: Ensure images are in RGB, not CMYK

## File Organization for IndieCaster

Organize your artwork files following this structure:

```
public/
├── episode-artwork/           # Episode-specific artwork
│   ├── show-cover.png        # Main show cover (3000x3000)
│   ├── episode-1-show-cover.png    # Episode 1 show cover (3000x3000)
│   ├── episode-1-episode-art.png   # Episode 1 artwork (3000x3000)
│   ├── episode-1-hero-image.png # Episode 1 hero (4320x1080)
│   ├── episode-1.webp              # Episode 1 web format
│   ├── episode-1.png               # Episode 1 fallback
│   └── episode-default.webp        # Default artwork
├── channel-artwork/          # For multi-show channels
│   ├── channel-icon.png      # Channel icon (3000x3000)
│   ├── channel-logo.png      # Channel logo (3000x3000)
│   └── channel-hero.png      # Channel hero (4320x1080)
└── subscription-artwork/     # For premium content
    ├── subscription-promo.png # Subscription promotion (3000x3000)
    └── subscription-icon.png  # Subscription icon (3000x3000)
```

### Naming Conventions

- **Show Cover**: `{episode-slug}-show-cover.png`
- **Episode Art**: `{episode-slug}-episode-art.png`
- **Hero Image**: `{episode-slug}-hero-image.png`
- **Web Format**: `{episode-slug}.webp`
- **Fallback**: `{episode-slug}.png`

## Quality Assurance Checklist

Before uploading artwork to podcast platforms:

### Technical Requirements
- [ ] **Dimensions**: Exactly 3000x3000 pixels (or 4320x1080 for hero images)
- [ ] **Format**: PNG or JPEG (no transparency)
- [ ] **File Size**: Under 500KB
- [ ] **Color Space**: RGB
- [ ] **Background**: Solid color (no transparency)

### Content Requirements
- [ ] **Show Title**: Clearly visible and readable
- [ ] **Readability**: Text is clear at small sizes (test at 1400x1400px)
- [ ] **Branding**: Consistent with your show's visual identity
- [ ] **Content**: No explicit, promotional, or inappropriate content
- [ ] **Quality**: High-resolution, professional appearance

### Design Quality
- [ ] **Visual Hierarchy**: Show title is the most prominent element
- [ ] **Typography**: Clear, readable fonts with good contrast
- [ ] **Colors**: Brand-consistent and accessible
- [ ] **Composition**: Well-balanced and visually appealing
- [ ] **Professional**: Looks polished and professional

## Platform-Specific Considerations

### Apple Podcasts
- Follows the most comprehensive guidelines
- Requires 3000x3000px artwork
- Supports episode-specific artwork
- Uses showcase hero for featured displays

### Spotify
- Accepts 3000x3000px artwork
- Supports episode artwork
- Uses similar guidelines to Apple Podcasts

### Google Podcasts
- Accepts standard podcast artwork
- Uses RSS feed artwork
- Supports episode-specific artwork

### Other Platforms
- Most platforms accept 3000x3000px artwork
- Follow industry standards
- Support episode-specific artwork

## RSS Feed Integration

### Artwork in RSS Feeds
Podcast artwork is included in RSS feeds for distribution to platforms:

```xml
<item>
  <title>Episode Title</title>
  <description>Episode description</description>
  <enclosure url="audio-file.mp3" type="audio/mpeg" length="12345678"/>
  <itunes:image href="https://yoursite.com/episode-artwork/episode-1-episode-art.png"/>
  <itunes:duration>45:30</itunes:duration>
</item>
```

### Artwork Selection for RSS
- **Episode Art**: Use episode-specific artwork when available
- **Show Cover**: Fallback to show cover for consistency
- **Format**: PNG or JPEG, 3000x3000px
- **URL**: Full URL to artwork file

## Website Integration

### Homepage Usage
- **Hero Images**: Use wide-format hero images for homepage banners
- **Episode Cards**: Use episode art or show cover for episode cards
- **Responsive Design**: Ensure artwork looks good on all devices

### Episode Pages
- **Episode Art**: Display episode-specific artwork prominently
- **Show Cover**: Use as fallback or secondary artwork
- **Hero Sections**: Use hero images for wide displays

### Performance Optimization
- **WebP Format**: Use for web display (better compression)
- **Lazy Loading**: Implement for better performance
- **Responsive Images**: Serve appropriate sizes for different devices

## Tools and Resources

### Design Tools
- **Adobe Photoshop**: Professional image editing
- **Canva**: User-friendly design tool with templates
- **Figma**: Collaborative design platform
- **GIMP**: Free alternative to Photoshop
- **Affinity Designer**: Professional design software

### Image Optimization
- **TinyPNG**: Compress images without quality loss
- **Squoosh**: Google's image optimization tool
- **ImageOptim**: Mac app for image optimization
- **Online Image Resizer**: Quick resizing tools

### Templates and Inspiration
- [Apple Podcasts Template Library](https://podcasters.apple.com/) - Official templates (industry standard)
- [Canva Podcast Templates](https://www.canva.com/) - Free podcast artwork templates
- [Figma Community](https://www.figma.com/community) - Design templates and resources

## Common Mistakes to Avoid

### Technical Mistakes
1. **Wrong Dimensions**: Using non-square images for required artwork
2. **Large File Sizes**: Exceeding 500KB limit
3. **Transparent Backgrounds**: Using PNG with transparency
4. **Low Resolution**: Using images smaller than 1400x1400px
5. **Wrong Color Space**: Using CMYK instead of RGB

### Design Mistakes
1. **Small Text**: Text that becomes unreadable at small sizes
2. **Poor Contrast**: Insufficient contrast between text and background
3. **Cluttered Design**: Too many elements competing for attention
4. **Inconsistent Branding**: Artwork doesn't match your brand identity
5. **Unprofessional Appearance**: Low-quality or amateur-looking design

### Content Mistakes
1. **Promotional Text**: Including "New", "Exclusive", or similar labels
2. **Platform Logos**: Including Apple, Spotify, or other platform logos
3. **Episode Numbers**: Including episode numbers in artwork
4. **Dates**: Including publication dates
5. **Inappropriate Content**: Offensive or explicit imagery

## Testing Your Artwork

### Size Testing
1. **Small Size Test**: View your artwork at 1400x1400px to ensure readability
2. **Thumbnail Test**: View at 300x300px to see how it appears in search results
3. **Mobile Test**: View on mobile devices to check mobile appearance

### Platform Testing
1. **Apple Podcasts**: Upload to Apple Podcasts Connect for testing
2. **Spotify**: Check how it appears on Spotify
3. **Other Platforms**: Test on other podcast platforms you use

### Accessibility Testing
1. **Color Contrast**: Use tools to check color contrast ratios
2. **Screen Reader**: Test with screen readers if including text
3. **Color Blindness**: Consider how colors appear to color-blind users

## Resources

### Official Documentation
- [Apple Podcasts Artwork Guide](https://podcasters.apple.com/artwork-guide) - Industry standard specifications
- [Apple Podcasts Connect](https://podcasters.apple.com/) - Upload artwork here
- [Spotify for Podcasters](https://podcasters.spotify.com/) - Spotify guidelines

### Related Documentation
- [IndieCaster Media Files Guide](../MEDIA-FILES-GUIDE.md) - Complete media file specifications
- [Content Collections User Guide](./content-collections-user-guide.md) - How to add episodes and artwork
- [Content Collections Implementation Guide](./content-collections-implementation.md) - Technical implementation details

---

**Need help?** Start with the [Content Collections User Guide](./content-collections-user-guide.md) for adding episodes and artwork, or check the [Media Files Guide](../MEDIA-FILES-GUIDE.md) for complete media specifications. 
