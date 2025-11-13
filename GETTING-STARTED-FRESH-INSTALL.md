# Getting Started: Fresh IndieCaster Installation

## Overview

This guide walks you through setting up a brand new podcast website using IndieCaster, starting from cloning the repository to having a fully functional, production-ready podcast site.

**Time Required:** 30-45 minutes (first time)
**Technical Level:** Beginner-friendly
**Prerequisites:** Node.js 18+ installed

---

## Step 1: Clone the Repository

### Option A: For Your Own Podcast (Recommended)

Clone and create your own repository:

```bash
# Clone the IndieCaster repository
git clone https://github.com/schalkneethling/indiecaster-core.git my-podcast-name

# Navigate into the directory
cd my-podcast-name

# Remove the original git remote
git remote remove origin

# Initialize as your own repository
git remote add origin https://github.com/YOUR-USERNAME/my-podcast-name.git

# Create your first commit
git add .
git commit -m "Initial commit: IndieCaster setup"
git push -u origin main
```

### Option B: For Testing/Contributing

Clone for testing or contributing back to IndieCaster:

```bash
# Clone the repository
git clone https://github.com/schalkneethling/indiecaster-core.git

# Navigate into the directory
cd indiecaster-core
```

---

## Step 2: Install Dependencies

Install all required npm packages:

```bash
npm install
```

**Expected Output:**
```
added 250 packages in 15s
```

**Verify Installation:**
```bash
npm list sharp astro
```

You should see:
- sharp@0.34.3
- astro@5.13.3

---

## Step 3: Configure Your Podcast

IndieCaster provides an interactive setup wizard to configure your podcast details.

### Run the Setup Wizard

```bash
npm run init-podcast
```

### You'll Be Asked For:

1. **Podcast Name**
   - Example: "Tech Talk Podcast"
   - This appears everywhere on your site

2. **Elevator Pitch**
   - Example: "Weekly conversations about technology, startups, and innovation"
   - Keep it under 160 characters
   - Used in social sharing and RSS feed

3. **Meta Description**
   - Example: "Join us every week as we explore the latest in tech..."
   - 150-160 characters optimal for SEO
   - Appears in search results

4. **Your Name** (Host)
   - Example: "Jane Smith"
   - Your name as the podcast host

5. **Website Domain**
   - Example: "techtalkpodcast.com"
   - Don't include "https://" - just the domain
   - Can update later if you don't have one yet

6. **Featured Episode** (Optional)
   - Say 'y' if you want to feature a specific episode on homepage
   - Say 'n' to auto-show the latest episode (recommended for now)

7. **Podcast Players** (Optional)
   - Links to Apple Podcasts, Spotify, etc.
   - You can skip these for now and add them later
   - Press Enter to skip each platform

8. **Social Media** (Optional)
   - Links to your social media profiles
   - Press Enter to skip and add later

**After Completion:**
- Your `indiecaster.config.js` will be updated
- All placeholders replaced with your information
- You're ready to add content!

---

## Step 4: Set Up Host Profile

Create your host profile with photo and bio:

```bash
npm run setup-hosts
```

### You'll Be Asked For:

1. **Full Name**
   - Your name as podcast host

2. **Brief Bio**
   - 2-3 sentences about yourself
   - What makes you qualified/interesting as a host

3. **Profile Picture Filename**
   - Press Enter to accept the default (your name in kebab-case)
   - Example: "jane-smith-profile"

4. **Optional Information**
   - Company, job title, website
   - Social media links
   - Type 'y' to add these, 'n' to skip

5. **Co-Host** (Optional)
   - If you have a co-host, say 'y'
   - Repeat the process for co-host

**Result:**
- Host markdown file created in `src/content/hosts/`
- Episode files updated to reference your host
- Configuration updated

---

## Step 5: Add Your Media Files

IndieCaster needs various media files for a professional appearance.

### Required Files

#### 1. Podcast Artwork (Logo)
**Location:** `public/logo.svg` or `public/logo.png`

**Requirements:**
- Size: 3000 x 3000 pixels (minimum 1400x1400)
- Format: SVG (preferred) or PNG
- File Size: Under 500 KB
- Content: Your podcast branding/logo

**Tools to Create:**
- Canva: https://canva.com/ (free podcast artwork templates)
- Figma: https://figma.com/ (professional design tool)
- Adobe Express: https://www.adobe.com/express/create/podcast-cover

**Quick Start:**
If you don't have artwork yet, you can:
1. Use a temporary placeholder
2. Generate AI artwork (Midjourney, DALL-E)
3. Hire a designer on Fiverr ($20-50)

#### 2. Host Profile Pictures
**Location:** `public/profile-images/`

**Required Formats (3 versions):**
```
public/profile-images/
├── your-name.png           (200x200px)
├── your-name@2x.webp       (400x400px)
└── your-name@2x.avif       (400x400px)
```

**How to Create:**

**Option A: Using IndieCaster Script (Recommended)**

Use the built-in optimizer that automatically generates all three required formats:

```bash
# Syntax: npm run optimize-profile <path-to-photo> <output-filename>
npm run optimize-profile ~/Downloads/headshot.jpg john-doe
```

This creates:
- `public/profile-images/john-doe.png` (200x200px)
- `public/profile-images/john-doe@2x.webp` (400x400px)
- `public/profile-images/john-doe@2x.avif` (400x400px)

**Tips:**
- Source image should be at least 400x400px (larger is better)
- Use the same filename you specified in `setup-hosts`
- The script automatically crops to square and optimizes file sizes

**Option B: Using Online Tools**

If you prefer a visual tool:
1. Upload your photo to Squoosh: https://squoosh.app/
2. Resize to 400x400 pixels
3. Export as PNG (200x200), WebP (400x400), and AVIF (400x400)
4. Manually save to `public/profile-images/` with correct naming

#### 3. Episode Audio Files
**Location:** `public/audio/episodes/`

**Format:** MP3
**Recommended Specs:**
- Bitrate: 128-192 kbps
- Sample Rate: 44.1 kHz
- Mono (speech) or Stereo (music)

**Naming:** Use descriptive, lowercase, hyphenated names
- ✅ Good: `episode-1-getting-started.mp3`
- ❌ Bad: `Episode 1.mp3`

#### 4. Favicons (Browser Icons)
**Location:** `public/`

**Required Files:**
```
public/
├── favicon-16x16.png
├── favicon-32x32.png
└── apple-touch-icon.png (180x180px)
```

**Generate Favicons:**
- RealFaviconGenerator: https://realfavicongenerator.net/
- Favicon.io: https://favicon.io/

Simply upload your logo and download all sizes.

### Validate Your Media Files

Run the validation script to check everything is correct:

```bash
npm run validate-media
```

This will check:
- ✅ All required files exist
- ✅ Files are not placeholders
- ✅ File sizes are appropriate
- ✅ All formats present

**Fix any errors before proceeding.**

---

## Step 6: Create Your First Episode

### Option A: Use the Episode Generator (Recommended)

```bash
npm run create-episode "Welcome to My Podcast"
```

This creates a markdown file with frontmatter template at:
`src/content/episodes/welcome-to-my-podcast.md`

### Option B: Manual Creation

Create a new file: `src/content/episodes/episode-1.md`

```markdown
---
title: "Welcome to My Podcast"
description: "In this inaugural episode, we introduce the podcast, discuss what's to come, and share our vision."
pubDate: 2025-11-12
duration: "25:30"
audioFile: "episode-1-welcome"
artwork:
  src: "episode-1-artwork.png"
  alt: "Episode 1: Welcome"
showNotes: "Join us as we kick off this exciting new podcast journey!"
hosts: ["your-name-slug"]
tags: ["introduction", "welcome"]
draft: false
episodeNumber: 1
season: 1
explicit: false
---

# Episode 1: Welcome to My Podcast

## Show Notes

In this first episode, we:
- Introduce ourselves and the podcast
- Explain what listeners can expect
- Share our goals for the show

## Timestamps

- 0:00 - Introduction
- 2:30 - What is this podcast about?
- 10:00 - Who are we?
- 18:00 - What's coming up
- 24:00 - How to subscribe and follow

## Links & Resources

- [Our Website](https://yourwebsite.com)
- [Follow on Twitter](https://twitter.com/yourpodcast)
- [Join Our Discord](https://discord.gg/yourserver)

## Contact

Questions or feedback? Email us at: hello@yourpodcast.com
```

### Edit the Episode

Update these fields in the frontmatter:
- `audioFile`: Name of your MP3 file (without .mp3 extension)
- `hosts`: Your host slug from the setup-hosts script
- `pubDate`: Publication date (YYYY-MM-DD format)
- `duration`: Episode length (MM:SS format)
- `draft`: Set to `true` to hide from listings

### Add Your Audio File

Place your episode audio at:
```
public/audio/episodes/episode-1-welcome.mp3
```

The filename must match the `audioFile` field in frontmatter (without .mp3).

---

## Step 7: Test Locally

Start the development server to preview your site:

```bash
npm run dev
```

**Your site will be available at:** http://localhost:4321/

### What to Check:

1. **Homepage** (http://localhost:4321/)
   - [ ] Your podcast name appears
   - [ ] Featured/latest episode displays
   - [ ] Hero section looks good
   - [ ] Subscribe section has correct links

2. **Episodes Page** (http://localhost:4321/episodes/)
   - [ ] Episode card displays correctly
   - [ ] Episode artwork shows
   - [ ] Duration displays
   - [ ] Click-through works

3. **Individual Episode** (http://localhost:4321/episodes/episode-1/)
   - [ ] Title and description display
   - [ ] Audio player loads
   - [ ] Play button works
   - [ ] Show notes render correctly
   - [ ] Host information appears

4. **About Page** (http://localhost:4321/about/)
   - [ ] Your bio and mission statement
   - [ ] Host information
   - [ ] Profile pictures display

5. **RSS Feed** (http://localhost:4321/rss.xml)
   - [ ] XML loads without errors
   - [ ] Podcast information correct
   - [ ] Episode appears in feed
   - [ ] Audio enclosure present

### Browser Console

Open browser DevTools (F12) and check Console tab:
- ✅ No errors (red messages)
- ✅ No 404s for missing files
- ✅ Images load correctly

---

## Step 8: Validate Your Setup

### A. Validate RSS Feed

1. **Build Your Site:**
   ```bash
   npm run build
   ```

2. **Preview Production Build:**
   ```bash
   npm run preview
   ```

3. **Test Your Feed:**
   - Visit http://localhost:4321/rss.xml
   - Copy the XML content
   - Go to https://castfeedvalidator.com/
   - Paste your RSS XML or use a tunnel (ngrok) for live URL
   - Fix any errors shown

### B. Run Media Validation

```bash
npm run validate-media
```

Expected output:
```
✅ All media files validated successfully!
Your podcast is ready for deployment.
```

If you see errors or warnings, fix them before deploying.

### C. Check Testing Checklist

Review `docs/TESTING-CHECKLIST.md` and complete:
- [ ] All required files present
- [ ] Configuration has no placeholders
- [ ] RSS feed validates
- [ ] All pages load correctly
- [ ] Audio plays correctly

---

## Step 9: Build for Production

When you're ready to deploy:

```bash
npm run build
```

**Expected Output:**
```
building client (vite)
✓ built in 16ms

generating static routes
✓ Completed in 190ms.

[build] 5 page(s) built in 2.33s
[build] Complete!
```

**Result:** Your site is built in the `dist/` directory, ready to deploy!

---

## Step 10: Deploy Your Site

### Option A: Netlify (Easiest - Recommended)

1. **Create Netlify Account:**
   - Go to https://netlify.com/
   - Sign up with GitHub

2. **Connect Repository:**
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub and authorize
   - Select your podcast repository

3. **Configure Build:**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Click "Deploy"

4. **Your Site is Live!**
   - Netlify gives you a URL: `your-podcast.netlify.app`
   - Configure custom domain in settings (optional)

### Option B: Vercel

1. **Create Vercel Account:**
   - Go to https://vercel.com/
   - Sign up with GitHub

2. **Import Project:**
   - Click "Add New" → "Project"
   - Select your repository
   - Framework: Astro (auto-detected)
   - Click "Deploy"

3. **Your Site is Live!**
   - Vercel URL: `your-podcast.vercel.app`

### Option C: GitHub Pages

1. **Create GitHub Actions Workflow:**
   - File already included: `.github/workflows/deploy.yml` (if exists)
   - Or follow guide in `docs/DEPLOYMENT-GUIDE.md`

2. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Source: GitHub Actions
   - Save

3. **Push to Main:**
   - Your site deploys automatically on push
   - URL: `your-username.github.io/repository-name`

### Configure Custom Domain (Optional)

**After deployment:**
1. Buy a domain (Namecheap, Google Domains, etc.)
2. In your deployment platform (Netlify/Vercel), add custom domain
3. Update DNS records as instructed
4. Update `indiecaster.config.js` with new domain
5. Rebuild and redeploy

---

## Step 11: Submit to Podcast Directories

Once your site is live with a public RSS feed URL:

### Apple Podcasts

1. Go to https://podcastsconnect.apple.com/
2. Sign in with Apple ID
3. Click "+" to add a show
4. Enter your RSS feed URL: `https://yourdomain.com/rss.xml`
5. Apple validates your feed (1-5 business days)
6. Once approved, your podcast is live!

### Spotify

1. Go to https://podcasters.spotify.com/
2. Sign in with Spotify
3. Click "Get Started"
4. Enter RSS feed URL
5. Verify ownership (via email)
6. Podcast usually live within 24 hours

### Google Podcasts

1. Go to https://podcastsmanager.google.com/
2. Sign in with Google
3. Add your RSS feed URL
4. Verify ownership
5. Podcast appears in Google Podcasts

### Others (Optional)

- Amazon Music/Audible
- iHeartRadio
- TuneIn
- Stitcher
- Podcast Addict
- Many others!

**Note:** Most directories pull from Apple Podcasts, so start there.

---

## Step 12: Ongoing Maintenance

### Adding New Episodes

1. **Create Episode File:**
   ```bash
   npm run create-episode "Episode 2: Topic Here"
   ```

2. **Edit Episode:**
   - Update frontmatter (date, duration, audio file, etc.)
   - Write show notes

3. **Add Audio:**
   - Place MP3 in `public/audio/episodes/`

4. **Test Locally:**
   ```bash
   npm run dev
   ```

5. **Deploy:**
   ```bash
   npm run build
   git add .
   git commit -m "Add Episode 2"
   git push
   ```

Your hosting platform (Netlify/Vercel) automatically rebuilds and deploys!

### Podcast directories update automatically

Once your RSS feed is submitted to directories, they check it regularly (every 1-24 hours) and automatically add new episodes. No need to resubmit!

---

## Troubleshooting

### Build Fails

**Error:** `npm run build` shows errors

**Solutions:**
- Check for typos in markdown frontmatter
- Ensure all referenced files exist
- Run `npm install` again
- Check console for specific error messages

### Images Not Showing

**Error:** Broken image icons

**Solutions:**
- Verify file exists at correct path
- Check filename matches frontmatter exactly (case-sensitive!)
- Rebuild: `npm run build`
- Clear browser cache: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)

### Audio Won't Play

**Error:** Audio player silent or shows error

**Solutions:**
- Verify MP3 file exists in `public/audio/episodes/`
- Check `audioFile` field matches filename (without .mp3)
- Test MP3 file in media player separately
- Check file isn't corrupted

### RSS Feed Errors

**Error:** Cast Feed Validator shows errors

**Solutions:**
- Run `npm run init-podcast` to fix config placeholders
- Verify domain in `indiecaster.config.js` is correct
- Check all audio files are publicly accessible
- See `docs/RSS-FEED-VALIDATION.md` for detailed help

### Configuration Placeholders

**Error:** Still seeing `[YOUR_NAME]` or `[YOUR_DOMAIN]`

**Solution:**
- Run `npm run init-podcast` again
- Or manually edit `indiecaster.config.js`
- Replace all bracketed placeholders with real values

---

## Next Steps

### Immediate Actions

- [ ] Customize colors in `indiecaster.config.js`
- [ ] Add more episodes
- [ ] Customize About page content
- [ ] Set up analytics (Google Analytics, Plausible, etc.)
- [ ] Create social media accounts
- [ ] Promote your first episode!

### Future Enhancements

- [ ] Add episode transcripts (VTT/SRT files)
- [ ] Create episode-specific artwork
- [ ] Add guest profiles
- [ ] Set up email newsletter
- [ ] Enable comments or discussions
- [ ] Add analytics tracking

---

## Resources

### Documentation
- [Complete Testing Checklist](docs/TESTING-CHECKLIST.md)
- [RSS Feed Validation Guide](docs/RSS-FEED-VALIDATION.md)
- [Media Requirements](docs/MEDIA-REQUIREMENTS.md)
- [MVP Master Plan](MVP-MASTER-PLAN.md)

### Tools
- Podcast Artwork: https://canva.com/
- Image Optimization: https://squoosh.app/
- RSS Validation: https://castfeedvalidator.com/
- Favicon Generator: https://favicon.io/

### Platform Resources
- Apple Podcasts: https://podcasters.apple.com/
- Spotify for Podcasters: https://podcasters.spotify.com/
- Google Podcasts Manager: https://podcastsmanager.google.com/

### Audio Editing
- Audacity (Free): https://www.audacityteam.org/
- GarageBand (Mac, Free): Built-in
- Adobe Audition (Professional): https://www.adobe.com/products/audition.html

---

## Getting Help

### Issues or Questions?

1. **Check Documentation:**
   - See `docs/` folder for comprehensive guides
   - Search existing GitHub issues

2. **Report Bugs:**
   - Open issue at: https://github.com/schalkneethling/indiecaster-core/issues
   - Include error messages, screenshots, and steps to reproduce

3. **Community:**
   - Discussions: https://github.com/schalkneethling/indiecaster-core/discussions
   - Ask questions and share your podcast!

---

## Success Checklist

Before considering your setup complete:

- [ ] All configuration placeholders replaced
- [ ] Media files added and validated
- [ ] At least one episode published
- [ ] Site builds without errors
- [ ] RSS feed validates successfully
- [ ] Deployed to public URL
- [ ] RSS feed submitted to Apple Podcasts
- [ ] RSS feed submitted to Spotify
- [ ] Social media links updated
- [ ] First episode promoted!

---

## Congratulations! 🎉

You now have a fully functional, self-hosted podcast website!

**What You've Built:**
- ✅ Professional podcast website
- ✅ RSS feed compatible with all major platforms
- ✅ SEO-optimized pages
- ✅ Fast, performant static site
- ✅ Full control over your content and branding

**Keep Creating!** 🎙️

Share your podcast with us:
- Tag @indiecaster on Twitter
- Add to IndieCaster showcase: https://github.com/schalkneethling/indiecaster-core/discussions

---

**Document Version:** 1.0
**Last Updated:** 2025-11-12
**For IndieCaster Version:** Post-Phase 1

Happy Podcasting! 🚀
