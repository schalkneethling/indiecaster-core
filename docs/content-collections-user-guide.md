# Content Collections User Guide

## Introduction

This guide helps content creators and podcast managers understand how to add, edit, and manage episodes and guest information using IndieCaster's content collections system.

## Quick Start

### Adding a New Episode

**Option 1: Using the Generator Script (Recommended)**
```bash
npm run create-episode "Your Episode Title"
```

This will automatically:
- Create a properly formatted episode file
- Generate the correct filename (kebab-case)
- Set up all required and optional fields
- Include helpful content templates
- Add references to this user guide

**Option 2: Manual Creation**
1. Create a new Markdown file in `src/content/episodes/`
2. Use the filename format: `episode-title.md` (this becomes the URL slug)
3. Add the required frontmatter at the top of the file
4. Write your episode content below the frontmatter
5. Save the file and commit to your repository - the episode will be deployed and appear on your website

**Note**: For episodes that aren't ready to go live, you can set `draft: true` in the frontmatter to prevent them from being published.

**Test Example**: See `src/content/episodes/draft-episode-example.md` for a working example of a draft episode.

### Adding a New Guest

**Option 1: Using the Generator Script (Recommended)**
```bash
npm run create-guest "Guest Full Name"
```

This will automatically:
- Create a properly formatted guest file
- Generate the correct filename (kebab-case)
- Set up all required and optional fields
- Include helpful content templates
- Add references to this user guide

**Option 2: Manual Creation**
1. Create a new Markdown file in `src/content/guests/`
2. Use the filename format: `guest-name.md` (this becomes the guest ID)
3. Add the required frontmatter information
4. Write the guest's detailed bio below the frontmatter
5. Save the file - the guest profile will be available for episode references

### Adding a New Host

**Option 1: Using the Generator Script (Recommended)**
```bash
npm run create-host "Host Full Name"
```

This will automatically:
- Create a properly formatted host file
- Generate the correct filename (kebab-case)
- Set up all required and optional fields
- Include helpful content templates
- Add references to this user guide

**Option 2: Manual Creation**
1. Create a new Markdown file in `src/content/hosts/`
2. Use the filename format: `host-name.md` (this becomes the host ID)
3. Add the required frontmatter information
4. Write the host's detailed bio below the frontmatter
5. Save the file - the host profile will be available for episode references

## Episode Management

### Episode File Structure

Each episode file should follow the schema defined in the [Schema Reference](./schemas.md). Here's a basic example:

```markdown
---
title: "Your Episode Title"
description: "A compelling description of your episode"
pubDate: 2024-01-15
duration: "45:30"
audioFile: "your-audio-filename"
artwork:
  src: "artwork-filename"
  alt: "Description of the artwork for accessibility"
showNotes: "Brief show notes summary"
draft: false
guests: ["guest-slug"]
tags: ["tag1", "tag2", "tag3"]
youtube: "youtube-video-id"
explicit: false
episodeNumber: 1
season: 1
hasVttTranscript: false
hasSrtTranscript: false
---

# Episode Content

Your episode content goes here...
```

For complete field definitions and requirements, see the [Schema Reference](./schemas.md).

### Draft Episodes

You can create episodes that aren't ready to be published by setting `draft: true` in the frontmatter:

```markdown
---
title: "Your Episode Title"
description: "A compelling description of your episode"
pubDate: 2024-01-15
duration: "45:30"
audioFile: "your-audio-filename"
artwork:
  src: "artwork-filename"
  alt: "Description of the artwork for accessibility"
draft: true  # This prevents the episode from being published
---
```

**Draft episodes will:**
- Not appear on the public website
- Not be included in RSS feeds
- Not be accessible via direct URL (returns 404)
- Be automatically published when `draft` is set to `false` or removed

### Episode Content Guidelines

#### Recommended Structure

```markdown
# Episode Title

Brief introduction to the episode...

## Key Topics Covered

- Topic 1
- Topic 2
- Topic 3

## Guest Information

Information about your guest(s)...

## Show Notes

Detailed show notes with timestamps and resources...

### Timestamps

- 00:00 - Introduction
- 05:30 - Main discussion begins
- 25:15 - Q&A section
- 40:00 - Conclusion

### Resources Mentioned

- [Resource Name](https://example.com)
- [Another Resource](https://example.com)

## Connect with Guest

- Social Media: [@username](https://social.example.com/username)
- Website: [website.com](https://website.com)
- LinkedIn: [Guest Name](https://linkedin.com/in/username)
```

#### Content Best Practices

1. **Use Clear Headings**: Structure your content with H1, H2, and H3 headings
2. **Include Timestamps**: Help listeners navigate to specific sections
3. **Link Resources**: Provide direct links to mentioned resources
4. **Guest Information**: Include comprehensive guest bios and contact information
5. **SEO Optimization**: Use descriptive titles and meta descriptions

### Episode Naming Conventions

#### File Names
- Use kebab-case: `episode-title.md`
- Keep names descriptive but concise
- Avoid special characters except hyphens
- Examples:
  - `building-open-source-communities.md`
  - `tech-hiring-best-practices.md`
  - `ai-in-software-development.md`

#### Audio Files
- Match the `audioFile` field in frontmatter
- Store in `public/audio/episodes/`
- Use consistent naming: `episode-slug.mp3`
- Examples:
  - `building-open-source-communities.mp3`
  - `tech-hiring-best-practices.mp3`

#### Artwork Files
- Match the `artwork.src` field in frontmatter
- Store in `public/episode-artwork/`
- Use consistent naming: `episode-slug.png` or `episode-slug.webp`
- Examples:
  - `building-open-source-communities.png`
  - `tech-hiring-best-practices.webp`

## Guest Management

### Guest File Structure

```markdown
---
name: "Guest Full Name"
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

# Guest Full Name

Detailed guest bio and background information...
```

For complete guest field definitions and requirements, see the [Schema Reference](./schemas.md).

## Host Management

### Host File Structure

```markdown
---
name: "Host Full Name"
bio: "Brief bio for previews and SEO"
profilePicture: "profile-picture-filename"
socialLinks:
  twitter: "https://twitter.com/username"
  linkedin: "https://linkedin.com/in/username"
  instagram: "https://instagram.com/username"
website: "https://host-website.com"
company: "Company Name"
title: "Job Title"
episodes: ["episode-slug-1", "episode-slug-2"]
isMainHost: false
---

# Host Full Name

Detailed host bio and background information...
```

For complete host field definitions and requirements, see the [Schema Reference](./schemas.md).

### Host Content Guidelines

#### Profile Information
- **Name**: Use full name as it should appear publicly
- **Bio**: Write a compelling 1-2 sentence bio
- **Profile Picture**: Use high-quality, professional headshots
- **Social Links**: Include all relevant social media profiles
- **Website**: Link to personal website or portfolio
- **Company/Title**: Current professional information
- **isMainHost**: Set to `true` for the primary host (used for backward compatibility)

#### Detailed Bio Content
```markdown
# Host Name

## About Me

Professional background and experience...

## Current Work

What you're currently working on...

## Podcast Hosting

Your role as a podcast host and what you bring to the show...

## Notable Achievements

Key accomplishments and contributions...

## Speaking and Writing

Public speaking, writing, and thought leadership...

## Connect

How listeners can get in touch and follow your work...
```

### Host Naming Conventions

#### File Names
- Use kebab-case: `host-name.md`
- Use the host's name as the slug
- Examples:
  - `john-smith.md`
  - `sarah-jones.md`
  - `mike-wilson.md`

#### Profile Pictures
- Match the `profilePicture` field in frontmatter
- Store in `public/profile-images/`
- Use consistent naming: `host-name.png` or `host-name.webp`
- Examples:
  - `john-smith.png`
  - `sarah-jones.webp`

### Guest Content Guidelines

#### Profile Information
- **Name**: Use full name as it should appear publicly
- **Bio**: Write a compelling 1-2 sentence bio
- **Profile Picture**: Use high-quality, professional headshots
- **Social Links**: Include all relevant social media profiles
- **Website**: Link to personal website or portfolio
- **Company/Title**: Current professional information

#### Detailed Bio Content
```markdown
# Guest Name

## Background

Professional background and experience...

## Current Work

What they're currently working on...

## Notable Achievements

Key accomplishments and contributions...

## Speaking and Writing

Public speaking, writing, and thought leadership...

## Connect

How to get in touch and follow their work...
```

### Guest Naming Conventions

#### File Names
- Use kebab-case: `guest-name.md`
- Use the guest's name as the slug
- Examples:
  - `jane-springfield.md`
  - `sarah-judge.md`
  - `john-doe.md`

#### Profile Pictures
- Match the `profilePicture` field in frontmatter
- Store in `public/profile-images/`
- Use consistent naming: `guest-name.png` or `guest-name.webp`
- Examples:
  - `jane-springfield.png`
  - `sarah-judge.webp`

## Content Workflow

### Content Creation Tools

The project includes npm scripts to help you create properly formatted content files:

#### Episode Generator
```bash
npm run create-episode "Your Episode Title"
```

**Features:**
- Automatically generates kebab-case filenames
- Creates all required and optional frontmatter fields
- Sets `draft: true` by default for safety
- Includes content templates and structure
- Adds helpful references to this user guide
- Provides clear next steps after creation

#### Guest Generator
```bash
npm run create-guest "Guest Full Name"
```

**Features:**
- Automatically generates kebab-case filenames
- Creates all required and optional frontmatter fields
- Includes comprehensive bio template
- Adds helpful references to this user guide
- Provides clear next steps after creation

#### Host Generator
```bash
npm run create-host "Host Full Name"
```

**Features:**
- Automatically generates kebab-case filenames
- Creates all required and optional frontmatter fields
- Includes comprehensive bio template
- Adds helpful references to this user guide
- Provides clear next steps after creation

### Complete Episode Creation Process

1. **Prepare Content**
   - Write episode content and show notes
   - Gather resources and links
   - Prepare episode artwork (follow [podcast platform guidelines](../MEDIA-FILES-GUIDE.md#podcast-artwork-guidelines))
   - Record and process audio file

2. **Create Episode File**
   ```bash
   # Create new episode file
   touch src/content/episodes/your-episode-title.md
   ```

3. **Add Frontmatter**
   - Copy the frontmatter template
   - Fill in all required fields
   - Add optional fields as needed

4. **Write Content**
   - Add episode content below frontmatter
   - Include show notes, timestamps, and resources
   - Link to guest profiles if applicable

5. **Add Media Files**
   - Upload audio file to `public/audio/episodes/`
   - Upload artwork to `public/episode-artwork/` (3000x3000px PNG/JPEG, under 500KB)
   - Ensure filenames match frontmatter

6. **Test and Publish**
   - Run `npm run dev` to preview
   - Check for validation errors
   - Verify episode appears correctly
   - Commit and push to repository for deployment

### Complete Guest Creation Process

1. **Gather Information**
   - Full name and bio
   - Professional information
   - Social media profiles
   - Profile picture
   - Website and contact information

2. **Create Guest File**
   ```bash
   # Create new guest file
   touch src/content/guests/guest-name.md
   ```

3. **Add Frontmatter**
   - Fill in required fields
   - Add social links and professional info
   - Link to episodes they appear in

4. **Write Detailed Bio**
   - Comprehensive background information
   - Professional achievements
   - Speaking and writing experience

5. **Add Profile Picture**
   - Upload to `public/profile-images/`
   - Ensure filename matches frontmatter

6. **Link to Episodes**
   - Update episode files to reference the guest
   - Add guest to episode `guests` array

### Deployment Process

After creating or updating episode content:

1. **Local Testing**: Use `npm run dev` to preview changes locally
2. **Commit Changes**: Add and commit your files to git
3. **Push to Repository**: Push changes to trigger deployment
4. **Deployment**: Your hosting platform will automatically build and deploy the updated site
5. **Live**: Episodes will appear on your website once deployment completes

**Note**: The exact deployment process depends on your hosting platform (Netlify, Vercel, etc.). Check your platform's documentation for specific deployment details.

## Content Validation

### Automatic Validation

The system automatically validates your content:

- **Required Fields**: All required fields must be present
- **Data Types**: Fields must match expected data types
- **URL Validation**: Website URLs must be valid
- **Date Format**: Publication dates must be valid dates

### Common Validation Errors

1. **Missing Required Fields**
   ```
   Error: Missing required field 'title' in episode file
   ```
   Solution: Add the missing field to your frontmatter

2. **Invalid Date Format**
   ```
   Error: Invalid date format in pubDate field
   ```
   Solution: Use YYYY-MM-DD format (e.g., `2024-01-15`)

3. **Invalid URL**
   ```
   Error: Invalid URL format in website field
   ```
   Solution: Ensure URLs include protocol (e.g., `https://example.com`)

4. **Missing Guest Reference**
   ```
   Error: Guest 'unknown-guest' not found in guests collection
   ```
   Solution: Create the guest file or correct the guest slug

### Validation Commands

```bash
# Check for validation errors
npm run build

# Type checking
npx tsc --noEmit

# Development server (shows real-time errors)
npm run dev
```

## Best Practices

### Content Organization

1. **Consistent Naming**: Use consistent naming conventions for files and media
2. **Descriptive Titles**: Write clear, descriptive episode titles
3. **Rich Descriptions**: Include detailed episode descriptions for SEO
4. **Proper Tagging**: Use relevant tags for categorization
5. **Complete Information**: Fill in all available fields for better SEO

### SEO Optimization

1. **Descriptive Titles**: Include keywords in episode titles
2. **Rich Descriptions**: Write compelling episode descriptions
3. **Proper Tagging**: Use relevant tags for discoverability
4. **Guest Information**: Include comprehensive guest bios
5. **Resource Links**: Link to mentioned resources and tools

### Accessibility

1. **Alt Text**: Always include alt text for images
2. **Descriptive Links**: Use descriptive link text
3. **Transcripts**: Provide full episode transcripts
4. **Clear Structure**: Use proper heading hierarchy
5. **Readable Content**: Write clear, readable content

### Performance

1. **Optimized Images**: Use compressed image formats (WebP, PNG)
2. **Efficient Audio**: Use compressed audio formats (MP3)
3. **Consistent Sizing**: Use consistent image dimensions
4. **File Naming**: Use descriptive but concise filenames
5. **Metadata**: Include proper metadata for all media files

## Troubleshooting

### Common Issues

1. **Episode Not Appearing**
   - Check for validation errors
   - Verify file is in correct directory
   - Ensure frontmatter is properly formatted
   - Check if `draft: true` is set in frontmatter (draft episodes won't appear publicly)

2. **Guest Not Linking**
   - Verify guest file exists
   - Check guest slug spelling
   - Ensure guest is in episode's `guests` array

3. **Media Not Loading**
   - Check file paths match frontmatter
   - Verify files are in correct directories
   - Ensure file extensions are correct
   - For artwork issues, check [podcast platform guidelines](../MEDIA-FILES-GUIDE.md#podcast-artwork-guidelines)

4. **Build Errors**
   - Run `npm run build` to see specific errors
   - Check for missing required fields
   - Verify data types match schema

### Getting Help

1. **Check Documentation**: Review this guide and implementation docs
2. **Validation Errors**: Run build commands to see specific errors
3. **Development Server**: Use `npm run dev` for real-time feedback
4. **Type Checking**: Use `npx tsc --noEmit` for TypeScript errors

## Conclusion

This content collections system provides a powerful, user-friendly way to manage podcast content. By following these guidelines, you can create rich, well-structured content that enhances your podcast's discoverability and user experience.

For technical implementation details, see the [Content Collections Implementation Guide](./content-collections-implementation.md). 
