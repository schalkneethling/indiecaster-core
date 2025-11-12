# RSS Feed Validation Guide

## Overview

Your IndieCaster RSS feed has been enhanced with full iTunes podcast tags and audio enclosures for compatibility with all major podcast platforms including Apple Podcasts, Spotify, Google Podcasts, and more.

## What's Included in Your Feed

### Podcast-Level Metadata
- ✅ iTunes author, subtitle, and summary
- ✅ iTunes owner information (name and email)
- ✅ iTunes podcast artwork
- ✅ iTunes category
- ✅ iTunes explicit content flag
- ✅ iTunes show type (episodic/serial)
- ✅ Atom self-link for feed discovery
- ✅ Copyright information
- ✅ Language specification

### Episode-Level Metadata
- ✅ Episode title, description, and link
- ✅ Publication date
- ✅ Audio enclosure (MP3 file URL)
- ✅ iTunes duration
- ✅ iTunes episode type (full, trailer, bonus)
- ✅ iTunes explicit flag per episode
- ✅ Episode and season numbers
- ✅ Episode-specific artwork
- ✅ Full show notes content
- ✅ Episode author

## How to Validate Your RSS Feed

### Step 1: Build Your Site

```bash
npm run build
```

Your RSS feed will be generated at `dist/rss.xml`.

### Step 2: Preview Your Site

```bash
npm run preview
```

Your RSS feed will be available at `http://localhost:4321/rss.xml`.

### Step 3: Use Online Validators

#### **Cast Feed Validator** (Recommended)
🔗 https://castfeedvalidator.com/

- Most comprehensive podcast RSS validator
- Checks Apple Podcasts, Spotify, and Google requirements
- Provides detailed error messages and recommendations
- Free to use

**How to use:**
1. Deploy your site to a public URL (or use a tunnel like ngrok for testing)
2. Visit https://castfeedvalidator.com/
3. Enter your RSS feed URL: `https://yourdomain.com/rss.xml`
4. Click "Validate"
5. Review any errors or warnings

#### **Podbase Podcast Validator**
🔗 https://podba.se/validate/

- Validates against Apple Podcasts specifications
- Checks feed structure and required tags
- Free to use

**How to use:**
1. Enter your RSS feed URL
2. Click "Validate Feed"
3. Address any errors shown

#### **W3C Feed Validation Service**
🔗 https://validator.w3.org/feed/

- Validates RSS/Atom feed syntax
- Checks XML structure
- Free to use

**How to use:**
1. Enter your RSS feed URL
2. Click "Check"
3. Fix any XML errors

### Step 4: Test in Podcast Apps

#### **Apple Podcasts Connect**
🔗 https://podcastsconnect.apple.com/

1. Create an Apple Podcasts Connect account
2. Click "+" to add a new show
3. Enter your RSS feed URL
4. Apple will validate your feed and show any errors
5. You can preview how your podcast appears before submitting

#### **Spotify for Podcasters**
🔗 https://podcasters.spotify.com/

1. Log in with your Spotify account
2. Click "Get Started" and "Add your podcast"
3. Enter your RSS feed URL
4. Spotify will validate and import your episodes
5. You can preview before publishing

#### **Google Podcasts Manager**
🔗 https://podcastsmanager.google.com/

1. Sign in with your Google account
2. Add your podcast by RSS feed URL
3. Google will validate and verify ownership
4. Review your podcast appearance

## Common Issues and Solutions

### Issue 1: Missing Audio Files

**Error:** "Enclosure URL returns 404"

**Solution:**
- Ensure your audio files exist in `public/audio/episodes/`
- Check that the `audioFile` field in your episode frontmatter matches the actual filename
- Deploy your site so audio files are publicly accessible

### Issue 2: Invalid Image URLs

**Error:** "iTunes image URL returns 404"

**Solution:**
- Verify your logo exists at `public/logo.svg`
- Check episode artwork files exist in `public/episode-artwork/`
- Ensure artwork meets size requirements (minimum 1400x1400px, recommended 3000x3000px)

### Issue 3: Configuration Placeholders

**Error:** "Invalid email format" or "Invalid domain"

**Solution:**
- Run `npm run init-podcast` to configure your podcast details
- Manually edit `indiecaster.config.js` to replace `[YOUR_NAME]`, `[YOUR_DOMAIN]`, etc.
- Rebuild your site after configuration changes

### Issue 4: Enclosure Length is Zero

**Warning:** "Enclosure length is 0"

**Why:** The RSS spec requires the file size in bytes, but calculating this requires file system access during build.

**Solutions:**
1. **For Testing:** Validators will usually accept `length="0"` but may show a warning
2. **For Production:** Consider creating a build script that calculates actual file sizes
3. **Future Enhancement:** Phase 3 of the MVP plan includes automatic file size calculation

### Issue 5: Duration Format

**Error:** "Invalid duration format"

**Solution:**
- Duration should be in format `MM:SS` (e.g., "45:30")
- For episodes over an hour: `HHH:MM` (e.g., "90:45" for 1 hour 30 minutes)
- Update the `duration` field in your episode frontmatter

## RSS Feed Best Practices

### Podcast Artwork
- **Size:** 3000x3000 pixels (required by Apple)
- **Format:** PNG or JPG
- **Aspect Ratio:** 1:1 (square)
- **Color Space:** RGB
- **File Size:** Under 500 KB

### Episode Artwork (Optional)
- Same requirements as podcast artwork
- Can be unique per episode
- Falls back to podcast artwork if not specified

### Audio Files
- **Format:** MP3 is most compatible
- **Bitrate:** 128 kbps minimum, 192 kbps recommended
- **Sample Rate:** 44.1 kHz
- **Mono/Stereo:** Stereo recommended for music, mono acceptable for speech

### Episode Titles
- Keep under 255 characters
- Avoid special characters that might break XML
- Don't include episode numbers in the title if you're using the `episodeNumber` field

### Descriptions
- **Episode Description:** 150-300 characters for best display
- **Show Notes:** Can be longer, supports basic HTML in `<content:encoded>`
- Avoid promotional language in descriptions (Apple Podcasts requirement)

### Update Frequency
- Publish consistently (weekly, biweekly, monthly)
- Don't remove old episodes from the feed
- Keep at least the latest 50-100 episodes in the feed

## Required Configuration

Before submitting your podcast to directories, ensure these config values are set in `indiecaster.config.js`:

```javascript
{
  podcastName: "Your Podcast Name",        // Not "[YOUR_PODCAST_NAME]"
  hostName: "Your Name",                   // Not "[YOUR_NAME]"
  domain: "yourdomain.com",                // Not "[YOUR_DOMAIN]"
  elevatorPitch: "Your actual pitch",      // Not placeholder text
  metaDefaultDescription: "Your description", // Not placeholder text
  logo: "logo.svg"                         // Must exist in public/
}
```

## Submitting to Podcast Directories

### Checklist Before Submission

- [ ] RSS feed validates without errors
- [ ] At least 1-3 episodes published
- [ ] Podcast artwork meets requirements (3000x3000px)
- [ ] Audio files are publicly accessible
- [ ] Episode durations are accurate
- [ ] All configuration placeholders replaced
- [ ] Copyright and contact information accurate
- [ ] Feed is hosted at a permanent URL

### Submission Process

1. **Apple Podcasts** (Required - largest directory)
   - Validates feed most strictly
   - Review process takes 1-5 business days
   - Once approved, auto-syncs from your RSS feed

2. **Spotify** (Required - second largest)
   - Usually instant approval
   - Manual review for content policy
   - Auto-syncs after approval

3. **Google Podcasts** (Recommended)
   - Requires ownership verification
   - Usually appears within 24 hours
   - Auto-syncs

4. **Other Directories** (Optional)
   - Amazon Music/Audible
   - iHeartRadio
   - TuneIn
   - Stitcher
   - Podcast Addict
   - Most pull from Apple Podcasts directory

## Monitoring Your Feed

### Things to Check Regularly

- **Feed Accessibility:** Ensure your RSS feed URL always returns 200 OK
- **Audio Files:** Verify all episode audio files are accessible
- **Artwork:** Check podcast and episode artwork loads correctly
- **New Episodes:** Test that new episodes appear in podcast apps within 24 hours
- **Feed Changes:** Major changes (like URL) require resubmission to directories

### Tools for Monitoring

- **Podcast Analytics:** Spotify, Apple, and Google provide download stats
- **Uptime Monitoring:** Use services like UptimeRobot to monitor feed availability
- **RSS Feed Readers:** Test your feed in apps like Feedly or NewsBlur

## Troubleshooting

If your podcast isn't appearing in directories:

1. **Wait:** Initial approval can take 24-48 hours (Apple: 1-5 business days)
2. **Check Email:** Directories send rejection notices to the email in your RSS feed
3. **Validate Again:** Run your feed through validators to catch new issues
4. **Review Content:** Ensure your podcast complies with platform policies
5. **Check URL:** Make sure your RSS feed URL is permanent and publicly accessible

## Need Help?

- 📚 [Apple Podcasts RSS Specification](https://podcasters.apple.com/support/823-podcast-requirements)
- 📚 [Spotify Podcast Delivery Specification](https://podcasters.spotify.com/resources/podcast-rss-specification)
- 📚 [RSS 2.0 Specification](https://cyber.harvard.edu/rss/rss.html)
- 📚 [Podcast Namespace Initiative](https://github.com/Podcastindex-org/podcast-namespace)

## File Checklist

Before running validation, ensure these files exist:

```bash
# Required Files
public/logo.svg                                    # Podcast artwork
public/audio/episodes/[audioFile].mp3             # Episode audio files

# Recommended Files (per episode)
public/episode-artwork/[artwork-src].png          # Episode artwork
public/episode-artwork/[artwork-src].webp         # Optimized artwork
```

## Validation Workflow

```bash
# 1. Build your site
npm run build

# 2. Preview locally
npm run preview
# Visit http://localhost:4321/rss.xml

# 3. Deploy to staging/production
# (Your deployment method)

# 4. Validate online
# Use Cast Feed Validator with your public RSS URL

# 5. Test in podcast apps
# Submit to Apple Podcasts Connect for validation

# 6. Monitor after submission
# Check directory listings appear correctly
```

## Advanced: Custom Categories

If you want to change the podcast category from "Technology", edit `src/pages/rss.xml.js`:

```javascript
<itunes:category text="Technology" />
```

Available categories include:
- Arts
- Business
- Comedy
- Education
- Fiction
- Health & Fitness
- History
- Kids & Family
- Leisure
- Music
- News
- Religion & Spirituality
- Science
- Society & Culture
- Sports
- Technology
- True Crime
- TV & Film

You can also specify subcategories:
```xml
<itunes:category text="Technology">
  <itunes:category text="Tech News" />
</itunes:category>
```

---

**Last Updated:** Phase 1 - Foundation & Bug Fixes
**Next Steps:** Complete Phase 1 by creating media requirements and testing checklist
