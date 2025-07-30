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

3. **Customize your configuration**
   - Edit `indiecaster.config.js` with your podcast details
   - Update the domain, podcast name, host name, and other settings

4. **Add your content**
   - Replace episode content in `src/content/episodes/`
   - Add guest profiles in `src/content/guests/`
   - Add your media files to the appropriate folders

5. **Start developing**
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
```

## 📚 Documentation

- [Content Collections Guide](docs/content-collections-user-guide.md)
- [Schema Reference](docs/schemas.md)
- [Implementation Summary](docs/IMPLEMENTATION-SUMMARY.md)

## 🤝 Contributing

This is a starter template. Feel free to customize it for your needs and contribute improvements back to the community.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
