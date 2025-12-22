# Web-Based Setup Wizard

The IndieCaster web-based setup wizard provides a user-friendly, WordPress-like interface for configuring your podcast website without requiring terminal commands.

## Overview

The setup wizard consists of 6 steps that guide you through the complete configuration process:

1. **Welcome** - Prerequisites check and introduction
2. **Podcast Info** - Basic podcast metadata and branding
3. **Host Profile** - Host information and profile picture
4. **Social Media** - Social media links (optional)
5. **First Episode** - Add your first podcast episode (optional)
6. **Deploy** - Deployment options and next steps

## Accessing the Setup Wizard

### During Development

Start your development server:

```bash
npm run dev
```

Then navigate to:

```
http://localhost:4321/setup
```

### After Build

The setup wizard is a development tool and is intended to be used before building your static site. Once you've completed the wizard and built your site, the setup pages will be part of your static site but the API endpoints will not function.

## Step-by-Step Guide

### Step 1: Welcome

The welcome page performs client-side checks to verify your environment is ready:

- Node.js availability
- Write permissions
- Dependencies installation

Once all checks pass, the "Get Started" button becomes active.

### Step 2: Podcast Information

Collects core podcast metadata:

- **Podcast Name** (required): Your podcast's name
- **Elevator Pitch** (required, 160 chars max): Short description
- **Meta Description** (required, 160 chars max): SEO description
- **Domain** (required): Your domain name (without http://)
- **Language** (required): Primary language of your content
- **Primary Brand Color**: Main color for buttons and links
- **Secondary Brand Color**: Accent color for gradients

**What it does:**
- Updates `indiecaster-config.js` with your podcast information
- Stores data in localStorage as backup

### Step 3: Host Profile

Collects host information:

- **Host Name** (required): Your name as podcast host
- **Host Bio** (required): Biography and background
- **Profile Picture** (required): Square image, at least 1400x1400px

**What it does:**
- Creates a markdown file in `src/content/hosts/`
- Optimizes your profile picture into 3 formats:
  - PNG (200x200)
  - WebP @2x (400x400)
  - AVIF @2x (400x400)
- Saves images to `public/images/hosts/`
- Updates `indiecaster-config.js` with host name

### Step 4: Social Media Links

Add links to your social media profiles (all optional):

- Twitter / X
- YouTube
- Instagram
- Facebook
- LinkedIn
- Mastodon
- GitHub
- Personal Website

**What it does:**
- Updates the `socialLinks` section in `indiecaster-config.js`
- You can skip this step entirely and add links later

### Step 5: First Episode (Optional)

Add your first podcast episode:

- **Episode Title**: Clear, descriptive title
- **Episode Description**: Detailed description (supports markdown)
- **Publish Date**: When to publish the episode
- **Duration**: Format MM:SS or HH:MM:SS
- **Season** (optional): Season number
- **Episode Number** (optional): Episode number
- **Audio File** (required if form filled): MP3 format, max 500MB
- **Explicit Content**: Checkbox for explicit content flag

**What it does:**
- Creates a markdown file in `src/content/episodes/`
- Saves audio file to `public/audio/episodes/`
- Generates slug from episode title

**Important:** This step is completely optional. If you don't fill out any fields or upload an audio file, you'll proceed to the next step without creating an episode.

### Step 6: Deploy

The completion page shows:

- Configuration summary of what you've set up
- Next steps for building and deploying your site
- Links to deployment platforms (Netlify, Vercel, GitHub Pages, Cloudflare Pages)
- Links to helpful documentation

## API Endpoints

The wizard uses 4 API endpoints to process form data:

### POST /api/setup/save-config

Saves podcast configuration to `indiecaster-config.js`.

**Request body:**
```json
{
  "podcastName": "My Podcast",
  "elevatorPitch": "A great podcast about...",
  "metaDescription": "Longer description for SEO...",
  "domain": "mypodcast.com",
  "metaLanguage": "en",
  "primaryBrandColor": "#667eea",
  "secondaryBrandColor": "#764ba2"
}
```

### POST /api/setup/create-host

Creates host profile and optimizes profile picture.

**Request body:** `multipart/form-data`
- `hostName`: string
- `hostBio`: string
- `profilePicture`: File

**Creates:**
- `src/content/hosts/{slug}.md`
- `public/images/hosts/{slug}.png`
- `public/images/hosts/{slug}@2x.webp`
- `public/images/hosts/{slug}@2x.avif`

### POST /api/setup/save-social

Saves social media links to `indiecaster-config.js`.

**Request body:**
```json
{
  "twitter": "https://twitter.com/handle",
  "youtube": "https://youtube.com/@channel",
  "instagram": "https://instagram.com/handle"
  // ... other platforms
}
```

### POST /api/setup/create-episode

Creates episode and saves audio file.

**Request body:** `multipart/form-data`
- `title`: string
- `description`: string
- `pubDate`: string (YYYY-MM-DD)
- `duration`: string (MM:SS or HH:MM:SS)
- `season`: number (optional)
- `episode`: number (optional)
- `explicit`: boolean
- `audioFile`: File

**Creates:**
- `src/content/episodes/{slug}.md`
- `public/audio/episodes/{slug}.mp3`

## Testing the Wizard Locally

1. **Start development server:**
   ```bash
   npm run dev
   ```

2. **Navigate to the wizard:**
   ```
   http://localhost:4321/setup
   ```

3. **Complete each step:**
   - Fill out all required fields
   - Upload test images and audio files
   - Verify each step saves correctly

4. **Check created files:**
   ```bash
   # Check config was updated
   cat indiecaster-config.js

   # Check host profile was created
   ls src/content/hosts/
   ls public/images/hosts/

   # Check episode was created (if added)
   ls src/content/episodes/
   ls public/audio/episodes/
   ```

5. **Test the site:**
   ```bash
   # Build the site
   npm run build

   # Preview the built site
   npm run preview
   ```

## Data Storage

The wizard uses two storage methods:

### 1. localStorage (Client-side backup)

Each step saves form data to localStorage as a backup. This allows:
- Returning to previous steps to edit data
- Recovering if the API endpoint fails
- Continuing setup after page refresh

**Keys used:**
- `podcast-info`
- `host-info`
- `social-links`
- `episode-info`

### 2. API Endpoints (Server-side processing)

When forms are submitted, data is sent to API endpoints that:
- Write to configuration files
- Create markdown files
- Process and optimize media files
- Update the project structure

## Important Limitations

### Development vs. Production

**During Development (`npm run dev`):**
- ✅ Wizard is fully functional
- ✅ API endpoints process form data
- ✅ Files are created and updated
- ✅ Real-time feedback and validation

**After Build (`npm run build`):**
- ⚠️ Wizard pages exist but are static HTML
- ❌ API endpoints do not function (no server)
- ❌ Form submissions cannot be processed
- ℹ️ localStorage still works for saving form data

### Recommended Workflow

The wizard is designed to be used **once during initial setup**:

1. Clone or create your IndieCaster project
2. Run `npm install`
3. Run `npm run dev`
4. Complete the setup wizard at `/setup`
5. Build your site with `npm run build`
6. Deploy the static files

After initial setup, you can:
- Edit configuration files directly
- Use the CLI tools (scripts in `/scripts`)
- Create content files manually
- Re-run the wizard in development mode if needed

## Future Improvements

The following enhancements are planned for future versions:

### Build-time Processing Script

Create a Node.js script that can process localStorage data at build time:

```bash
npm run process-setup
```

This would allow users to:
1. Complete the wizard in the browser
2. Run the processing script
3. Build the static site
4. Deploy

### Serverless Functions

Add optional serverless function support for:
- Netlify Functions
- Vercel Functions
- Cloudflare Workers

This would enable the wizard to work after deployment, allowing users to update their configuration through a web interface.

### Configuration Import/Export

Add ability to:
- Export current configuration as JSON
- Import configuration from JSON
- Backup/restore settings

## Troubleshooting

### API Endpoints Not Working

**Problem:** Form submissions fail with network errors

**Solution:**
- Ensure development server is running (`npm run dev`)
- Check browser console for error messages
- Verify API endpoint files exist in `src/pages/api/setup/`
- Check terminal for server errors

### Profile Picture Upload Fails

**Problem:** Image upload shows error or doesn't save

**Solution:**
- Ensure image is JPG or PNG format
- Check image is under 5MB
- Verify Sharp package is installed (`npm list sharp`)
- Check write permissions for `public/images/hosts/` directory

### Audio File Upload Fails

**Problem:** Episode audio upload shows error

**Solution:**
- Ensure audio is MP3 format
- Check file is under 500MB
- Verify write permissions for `public/audio/episodes/` directory
- Check available disk space

### Changes Not Reflected

**Problem:** Configuration changes don't appear in built site

**Solution:**
- Restart development server after wizard completion
- Clear browser cache
- Rebuild the site (`npm run build`)
- Check that config files were actually updated

### localStorage Data Persists

**Problem:** Old data appears when re-running wizard

**Solution:**
```javascript
// Open browser console and run:
localStorage.clear();
```

Then refresh the page to start fresh.

## Files Modified by the Wizard

The wizard modifies and creates the following files:

### Modified Files

- `indiecaster-config.js` - Updated with podcast info, host name, and social links

### Created Files

**Host Profile:**
- `src/content/hosts/{host-slug}.md`
- `public/images/hosts/{host-slug}.png`
- `public/images/hosts/{host-slug}@2x.webp`
- `public/images/hosts/{host-slug}@2x.avif`

**Episode (if added):**
- `src/content/episodes/{episode-slug}.md`
- `public/audio/episodes/{episode-slug}.mp3`

### Directory Structure

After completing the wizard, you should have:

```
indiecaster-core/
├── indiecaster-config.js (updated)
├── public/
│   ├── audio/
│   │   └── episodes/
│   │       └── {episode-slug}.mp3
│   └── images/
│       └── hosts/
│           ├── {host-slug}.png
│           ├── {host-slug}@2x.webp
│           └── {host-slug}@2x.avif
└── src/
    └── content/
        ├── episodes/
        │   └── {episode-slug}.md
        └── hosts/
            └── {host-slug}.md
```

## Related Documentation

- [Getting Started (Fresh Install)](./GETTING-STARTED-FRESH-INSTALL.md)
- [Media Requirements](./MEDIA-REQUIREMENTS.md)
- [RSS Feed Validation](./RSS-FEED-VALIDATION.md)
- [Testing Checklist](./TESTING-CHECKLIST.md)
- [MVP Master Plan](../MVP-MASTER-PLAN.md)

## Support

If you encounter issues with the setup wizard:

1. Check the troubleshooting section above
2. Review the browser console for error messages
3. Check the terminal for server errors
4. Refer to the related documentation
5. Open an issue on GitHub with:
   - Steps to reproduce
   - Error messages
   - Browser and OS information
   - Screenshots if applicable
