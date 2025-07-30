# IndieCaster

A modern podcast website built with Astro, featuring content collections for easy episode and guest management.

## 🚀 Quick Start

### Adding a New Episode

**Option 1: Using the Generator Script (Recommended)**
```bash
npm run create-episode "Your Episode Title"
```

**Option 2: Manual Creation**
1. Create a new Markdown file in `src/content/episodes/`
2. Use the filename format: `episode-title.md` (this becomes the URL slug)
3. Add the required frontmatter (see [Schema Reference](./schemas.md))
4. Write your episode content below the frontmatter

### Adding a New Guest

**Option 1: Using the Generator Script (Recommended)**
```bash
npm run create-guest "Guest Full Name"
```

**Option 2: Manual Creation**
1. Create a new Markdown file in `src/content/guests/`
2. Use the filename format: `guest-name.md` (this becomes the guest ID)
3. Add the required frontmatter (see [Schema Reference](./schemas.md))
4. Write the guest's detailed bio below the frontmatter

## 📚 Documentation

- **[Schema Reference](./schemas.md)** - Complete schema definitions for episodes and guests
- **[Content Collections User Guide](./content-collections-user-guide.md)** - Detailed guide for content management
- **[Media Files Guide](./MEDIA-FILES-GUIDE.md)** - Media file requirements and setup
- **[Content Collections Implementation](./content-collections-implementation.md)** - Technical implementation details
- **[Current Status](./CURRENT-STATUS.md)** - Project status and known issues
- **[Implementation Summary](./IMPLEMENTATION-SUMMARY.md)** - Overview of implemented features

## 🏗️ Project Structure

```text
/
├── public/
│   ├── audio/episodes/          # Episode audio files
│   ├── episode-artwork/         # Episode artwork images
│   ├── profile-images/          # Guest profile pictures
│   └── favicon.ico
├── src/
│   ├── content/
│   │   ├── episodes/            # Episode markdown files
│   │   └── guests/              # Guest markdown files
│   ├── pages/
│   │   ├── episodes/
│   │   │   └── [slug].astro     # Individual episode pages
│   │   ├── episodes.astro       # Episodes listing
│   │   └── index.astro          # Homepage
│   └── components/              # Reusable components
└── package.json
```

## 🎯 Key Features

- **Content Collections**: Type-safe episode and guest management
- **Automatic Routing**: Episode pages generated from markdown files
- **Media Optimization**: Multiple image formats for performance
- **SEO Optimized**: Meta tags, structured data, and sitemaps
- **Responsive Design**: Works on all devices
- **Accessibility**: WCAG compliant components

## 🔧 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📝 Content Management

For detailed information about creating and managing content, see the [Content Collections User Guide](./content-collections-user-guide.md).

For complete schema definitions and field requirements, see the [Schema Reference](./schemas.md).
