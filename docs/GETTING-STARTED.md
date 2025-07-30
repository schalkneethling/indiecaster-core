# Getting Started with IndieCaster

This guide will walk you through setting up your podcast website using the IndieCaster starter template.

## 🚀 Quick Setup

### 1. Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd mhit-web

# Install dependencies
npm install
```

### 2. Configure Your Podcast

Edit `indiecaster.config.js` with your podcast details:

```javascript
export const indieCasterConfig = {
  // Update these essential settings
  domain: "mypodcast.com", // Your actual domain
  elevatorPitch: "My Awesome Podcast - A show about [your topic]",
  hostName: "Your Real Name",
  hostProfilePicture: "your-actual-profile-picture",
  
  // Optional: Configure a featured episode
  featuredEpisodeTitle: "Your Episode Title",
  featuredEpisodeSummary: "Your episode description...",
  // ... other settings
};
```

### 3. Add Your Content

#### Episodes
Replace the sample episode in `src/content/episodes/episode-1.md` with your own:

```markdown
---
title: "Your Episode Title"
description: "Your episode description"
pubDate: 2024-01-15
duration: "45:30"
audioFile: "your-audio-file-name"
guests: ["guest-slug"]
tags: ["tag1", "tag2"]
---
```

#### Guests
Replace the sample guest in `src/content/guests/jane-springfield.md` with your own:

```markdown
---
name: "Guest Name"
title: "Guest Title"
bio: "Guest biography..."
profilePicture: "guest-profile-picture"
social:
  twitter: "twitterhandle"
  linkedin: "https://linkedin.com/in/username"
---
```

### 4. Add Your Media Files

#### Audio Files
- Place your episode audio files in `public/audio/episodes/`
- Use descriptive filenames (e.g., `getting-started-podcast.mp3`)

#### Profile Images
- Add host and guest profile images to `public/profile-images/`
- Include multiple formats: `.png`, `.webp`, `.avif`
- Recommended size: 400x400px

#### Episode Artwork
- Add episode artwork to `public/episode-artwork/`
- Include multiple formats for optimal performance

### 5. Start Developing

```bash
# Start development server
npm run dev

# Build for production
npm run build
```

## 📁 File Structure Overview

```
mhit-web/
├── indiecaster.config.js     # Main configuration
├── src/
│   ├── content/
│   │   ├── episodes/         # Your episode markdown files
│   │   └── guests/           # Your guest profiles
│   └── components/           # Reusable UI components
├── public/
│   ├── audio/episodes/       # Episode audio files
│   ├── profile-images/       # Host and guest photos
│   └── episode-artwork/      # Episode artwork
└── docs/                     # Documentation
```

## 🎨 Customization Guide

### Branding
- **Colors**: Update color values in `indiecaster.config.js`
- **Logo**: Replace `public/logo.svg` with your logo
- **Typography**: Modify `src/styles/` for custom fonts

### Layout
- **Navigation**: Edit `mainNavigation` in config
- **Pages**: Modify `src/pages/` for custom pages
- **Components**: Customize `src/components/` for unique features

### Content
- **Episodes**: Add new episodes in `src/content/episodes/`
- **Guests**: Add guest profiles in `src/content/guests/`
- **SEO**: Update meta tags and structured data

## 🔧 Advanced Configuration

### RSS Feed
The RSS feed is automatically generated at `/rss.xml`. Customize the feed settings in `src/pages/rss.xml.js`.

### SEO Optimization
- Update OpenGraph tags in `src/components/OpenGraph.astro`
- Modify structured data in `src/components/StructuredData.astro`
- Configure sitemap in `astro.config.mjs`

### Social Media
- Update social media links in the footer
- Configure platform-specific meta tags
- Add social sharing buttons

## 📝 Content Workflow

### Creating New Episodes
1. Create a new markdown file in `src/content/episodes/`
2. Add frontmatter with episode metadata
3. Write your episode content in markdown
4. Add audio file to `public/audio/episodes/`
5. Add artwork to `public/episode-artwork/`

### Adding Guests
1. Create a new markdown file in `src/content/guests/`
2. Add guest profile information
3. Add profile images to `public/profile-images/`
4. Reference the guest in episode files

### Draft Episodes
Set `draft: true` in episode frontmatter to create draft episodes that won't appear on the public site.

## 🚀 Deployment

### Static Hosting
Build your site and deploy to any static hosting service:

```bash
npm run build
```

The built site will be in the `dist/` directory.

### Recommended Platforms
- **Netlify**: Connect your Git repository for automatic deployments
- **Vercel**: Deploy with zero configuration
- **GitHub Pages**: Free hosting for public repositories
- **AWS S3**: Scalable static hosting

## 🆘 Troubleshooting

### Common Issues

**Build Errors**
- Check that all referenced guests exist in the guests collection
- Ensure audio file paths are correct
- Verify image file paths and formats

**Missing Images**
- Check that image files exist in the correct directories
- Ensure image filenames match the frontmatter
- Verify image formats are supported

**RSS Feed Issues**
- Check that episode dates are in the correct format
- Ensure episodes have required metadata
- Verify domain configuration

### Getting Help
- Check the [Schema Reference](schemas.md) for field requirements
- Review the [Implementation Summary](IMPLEMENTATION-SUMMARY.md) for technical details
- Open an issue on the repository for bugs or feature requests

## 📚 Next Steps

1. **Customize your branding** and colors
2. **Add your first real episode** and guest
3. **Set up your domain** and hosting
4. **Configure analytics** and tracking
5. **Promote your podcast** and build your audience

Happy podcasting! 🎙️ 