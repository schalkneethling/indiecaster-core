# IndieCaster Starter Template

A clean, customizable starter template for creating your own podcast website using IndieCaster and Astro.

## 🚀 Quick Start

1. **Clone this repository**
   ```bash
   git clone <your-repo-url>
   cd mhit-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Initialize your podcast** (Choose one)
   
   **Option A: Start fresh**
   ```bash
   npm run init-podcast
   ```
   This interactive script will help you configure your podcast settings.
   
   **Option B: Import from existing RSS feed**
   ```bash
   npm run import-rss "https://your-podcast-feed.com/rss.xml"
   ```
   This will automatically import your existing episodes and create host profiles.

4. **Or manually customize your configuration**
   - Edit `indiecaster.config.js` with your podcast details
   - Update the domain, podcast name, host name, and other settings

5. **Add your content**
   - Replace episode content in `src/content/episodes/`
   - Add guest profiles in `src/content/guests/`
   - Add your media files to the appropriate folders

6. **Start developing**
   ```bash
   npm run dev
   ```

## 📁 What You Need to Customize

### Configuration (`indiecaster.config.js`)
- `domain` - Your website domain
- `elevatorPitch` - Your podcast name and description
- `hostName` - Your name as the host
- `hostProfilePicture` - Your profile image filename
- `featuredEpisode*` - Optional featured episode configuration

### Content Files
- **Episodes**: Edit files in `src/content/episodes/`
- **Guests**: Edit files in `src/content/guests/`
- **Media**: Add your audio files and images to `public/` folders

### Media Folders
- `public/audio/episodes/` - Add your episode audio files
- `public/profile-images/` - Add host and guest profile images
- `public/episode-artwork/` - Add episode artwork images

## 🎯 Key Features

- **Content Collections**: Type-safe content management for episodes and guests
- **Responsive Design**: Works on all devices
- **SEO Optimized**: Built-in SEO features and structured data
- **RSS Feed**: Automatic RSS feed generation
- **Customizable**: Easy to customize colors, branding, and layout
- **Draft Support**: Draft episodes for content workflow

## 📝 Content Structure

### Episodes
Each episode is a markdown file with frontmatter:
```yaml
---
title: "Getting Started with Your First Podcast"
description: "In this episode, we discuss the essential steps to launch your first podcast..."
pubDate: 2024-01-15
duration: "45:30"
audioFile: "getting-started-podcast"
guests: ["jane-springfield"]
tags: ["podcasting", "getting started", "content creation"]
---
```

### Guests
Guest profiles with social links:
```yaml
---
name: "Jane Springfield"
title: "Podcast Consultant & Producer"
bio: "Jane Springfield is a podcast consultant and producer..."
profilePicture: "jane-springfield"
social:
  twitter: "janespringfield"
  linkedin: "https://linkedin.com/in/janespringfield"
---
```

## 🛠️ Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Seed demo content for testing
npm run demo-content seed ./demo-content

# Remove demo content and restore original
npm run demo-content teardown
```

## 📂 RSS Import Feature

IndieCaster includes a powerful RSS import feature to migrate existing podcasts:

```bash
# Import from existing RSS feed
npm run import-rss "https://your-podcast-feed.com/rss.xml"

# Preview import without creating files
npm run import-rss "https://your-podcast-feed.com/rss.xml" -- --dry-run

# Show detailed output
npm run import-rss "https://your-podcast-feed.com/rss.xml" -- --verbose
```

The importer automatically:
- Creates episode files from RSS entries
- Generates host profiles from RSS metadata
- Hotlinks to external audio and artwork files
- Imports episodes as drafts for review

See the [RSS Import Guide](docs/RSS-IMPORT-GUIDE.md) for complete details.

## 📚 Documentation

- [Getting Started Guide](docs/GETTING-STARTED.md) - Complete setup instructions
- [RSS Import Guide](docs/RSS-IMPORT-GUIDE.md) - Migrate existing podcasts
- [Setup Checklist](docs/SETUP-CHECKLIST.md) - Step-by-step checklist
- [Demo Content Guide](docs/DEMO-CONTENT-GUIDE.md) - Testing and demonstration content
- [Content Collections Guide](docs/content-collections-user-guide.md)
- [Schema Reference](docs/schemas.md)
- [Implementation Summary](docs/IMPLEMENTATION-SUMMARY.md)

## 🤝 Contributing

This is a starter template. Feel free to customize it for your needs and contribute improvements back to the community.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
