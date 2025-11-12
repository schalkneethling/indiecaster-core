# IndieCaster Testing Checklist

## Overview

This comprehensive testing checklist ensures your IndieCaster podcast website is production-ready. Complete all sections before deploying to production or merging to main.

**Testing Phases:**
1. Development Environment Setup
2. Build Process
3. Content & Media
4. RSS Feed
5. SEO & Metadata
6. Performance
7. Accessibility
8. Cross-Browser & Device Testing
9. Deployment
10. Post-Launch

---

## Phase 1: Development Environment Setup

### Prerequisites
- [ ] Node.js installed (v18 or higher)
- [ ] npm or yarn installed
- [ ] Git repository initialized
- [ ] Dependencies installed (`npm install` runs without errors)

### Development Server
- [ ] `npm run dev` starts without errors
- [ ] Server runs on http://localhost:4321/
- [ ] Hot module reloading works (changes reflect immediately)
- [ ] No console errors in browser developer tools
- [ ] Content collections sync correctly

### Configuration
- [ ] `indiecaster.config.js` exists and is valid JavaScript
- [ ] No placeholder values remain (`[YOUR_NAME]`, `[YOUR_DOMAIN]`, etc.)
- [ ] All configuration fields are properly quoted strings
- [ ] Colors are valid hex codes
- [ ] Navigation links are correct

---

## Phase 2: Build Process

### Build Command
- [ ] `npm run build` completes successfully
- [ ] No errors during build
- [ ] Build completes in reasonable time (< 5 seconds for small sites)
- [ ] `dist/` directory is created
- [ ] All pages generated in `dist/`

### Build Output
- [ ] Static HTML files generated for all pages
- [ ] CSS files are minified and optimized
- [ ] JavaScript files are bundled correctly
- [ ] Images are optimized (if using Sharp)
- [ ] RSS feed generated at `dist/rss.xml`
- [ ] Sitemap generated at `dist/sitemap-index.xml`
- [ ] robots.txt generated at `dist/robots.txt`

### Preview
- [ ] `npm run preview` starts without errors
- [ ] Site loads correctly on http://localhost:4321/
- [ ] All pages accessible
- [ ] All assets load (images, audio, CSS, JS)
- [ ] No 404 errors in network tab

---

## Phase 3: Content & Media

### Episodes
- [ ] At least one published episode exists
- [ ] Episode pages load correctly (`/episodes/[slug]/`)
- [ ] Episode metadata displays correctly:
  - [ ] Title
  - [ ] Description
  - [ ] Publication date
  - [ ] Duration
  - [ ] Host(s)
  - [ ] Guests (if applicable)
  - [ ] Tags (if applicable)
- [ ] Episode show notes render correctly (markdown to HTML)
- [ ] Draft episodes are hidden from listings and RSS feed
- [ ] Episode artwork displays (or falls back to podcast artwork)
- [ ] Audio player loads and is functional

### Audio Player
- [ ] Audio file loads without errors
- [ ] Play button works
- [ ] Pause button works
- [ ] Progress bar displays correctly
- [ ] Time display shows current position and duration
- [ ] Seeking/scrubbing works
- [ ] Volume control works (if implemented)
- [ ] Audio plays on mobile devices

### Hosts & Guests
- [ ] Host profile page exists (if implemented)
- [ ] Host information displays correctly on About page
- [ ] Host profile images load in all required formats:
  - [ ] PNG (200x200)
  - [ ] WebP @2x (400x400)
  - [ ] AVIF @2x (400x400)
- [ ] Guest information displays on episode pages
- [ ] Guest profile images load correctly

### Images
- [ ] Podcast artwork (logo) displays correctly
- [ ] Episode artwork displays correctly (or falls back to logo)
- [ ] Profile images display correctly
- [ ] Images are sharp/clear at all sizes
- [ ] Images use progressive enhancement (AVIF → WebP → PNG)
- [ ] No broken image icons anywhere
- [ ] All images have proper alt text

### Media Validation
- [ ] Run `npm run validate-media` without errors
- [ ] No 1-byte placeholder files remain
- [ ] All referenced media files exist
- [ ] File sizes are within recommended limits:
  - [ ] Podcast artwork < 500 KB
  - [ ] Episode artwork < 500 KB
  - [ ] Profile images < 200 KB total
  - [ ] Audio files reasonable size (< 100 MB per hour)

---

## Phase 4: RSS Feed

### RSS Feed Generation
- [ ] RSS feed exists at `/rss.xml`
- [ ] RSS feed is valid XML (no parse errors)
- [ ] RSS feed contains expected episodes
- [ ] Draft episodes are excluded
- [ ] Episodes sorted by date (newest first)

### RSS Feed Metadata
- [ ] Podcast title is correct
- [ ] Podcast description is correct
- [ ] Language is set correctly
- [ ] Copyright information is correct
- [ ] Owner name and email are correct
- [ ] Podcast artwork URL is absolute and accessible

### iTunes Tags
- [ ] `<itunes:author>` present and correct
- [ ] `<itunes:subtitle>` present (under 255 characters)
- [ ] `<itunes:summary>` present and descriptive
- [ ] `<itunes:owner>` with name and email
- [ ] `<itunes:image>` with valid artwork URL
- [ ] `<itunes:category>` specified
- [ ] `<itunes:explicit>` flag set correctly
- [ ] `<itunes:type>` set to "episodic" or "serial"

### Episode Tags
- [ ] Each episode has:
  - [ ] `<title>`
  - [ ] `<description>`
  - [ ] `<pubDate>` in RFC 2822 format
  - [ ] `<link>` to episode page (absolute URL)
  - [ ] `<guid>` (unique identifier)
  - [ ] `<enclosure>` with audio URL, type, and length
  - [ ] `<itunes:duration>` in correct format
  - [ ] `<itunes:episodeType>` (full, trailer, or bonus)
  - [ ] `<itunes:episode>` number (if applicable)
  - [ ] `<itunes:season>` number (if applicable)
  - [ ] `<itunes:explicit>` flag
  - [ ] `<itunes:image>` (if episode has custom artwork)

### RSS Feed Validation
- [ ] Validates at https://castfeedvalidator.com/ with no errors
- [ ] Validates at https://podba.se/validate/ with no errors
- [ ] Validates at https://validator.w3.org/feed/ with no errors
- [ ] Test in Apple Podcasts Connect (validation passes)
- [ ] Test in Spotify for Podcasters (feed accepted)

### Audio Enclosures
- [ ] Audio URLs are absolute (not relative)
- [ ] Audio URLs are publicly accessible (return 200 OK)
- [ ] Audio files are valid MP3 format
- [ ] MIME type is "audio/mpeg"
- [ ] Enclosure length field populated (even if approximate)

---

## Phase 5: SEO & Metadata

### Meta Tags (All Pages)
- [ ] `<title>` tag present and descriptive
- [ ] `<meta name="description">` present (150-160 chars)
- [ ] `<meta charset="utf-8">`
- [ ] `<meta name="viewport">` for responsive design
- [ ] Canonical URL specified
- [ ] Language specified in `<html lang="en">`

### Open Graph Tags
- [ ] `og:title` present and correct
- [ ] `og:description` present and correct
- [ ] `og:image` present with absolute URL
- [ ] `og:url` present with absolute URL
- [ ] `og:type` set appropriately
- [ ] `og:site_name` specified
- [ ] Image dimensions specified (og:image:width, og:image:height)

### Twitter Card Tags
- [ ] `twitter:card` set to "summary_large_image"
- [ ] `twitter:title` present
- [ ] `twitter:description` present
- [ ] `twitter:image` present with absolute URL
- [ ] `twitter:site` (if Twitter handle available)

### Structured Data (JSON-LD)
- [ ] Podcast schema present on homepage
- [ ] Episode schema present on episode pages
- [ ] Schema includes all required fields
- [ ] Schema validates at https://validator.schema.org/
- [ ] Schema validates in Google Rich Results Test

### Sitemap
- [ ] Sitemap exists at `/sitemap-index.xml`
- [ ] Sitemap lists all public pages
- [ ] Episode pages included in sitemap
- [ ] Sitemap validates at https://www.xml-sitemaps.com/validate-xml-sitemap.html
- [ ] Sitemap referenced in robots.txt

### robots.txt
- [ ] robots.txt exists at `/robots.txt`
- [ ] Allows all crawlers (`User-agent: *`, `Allow: /`)
- [ ] References sitemap URL
- [ ] No syntax errors

### Favicons
- [ ] Favicon appears in browser tab
- [ ] 16x16 favicon loads correctly
- [ ] 32x32 favicon loads correctly
- [ ] Apple touch icon (180x180) loads correctly
- [ ] Favicons are actual images (not placeholders)

---

## Phase 6: Performance

### Lighthouse Audit
Run Lighthouse audit (Chrome DevTools) on all major pages:

**Homepage:**
- [ ] Performance score ≥ 90
- [ ] Accessibility score ≥ 95
- [ ] Best Practices score ≥ 90
- [ ] SEO score ≥ 95

**Episodes List Page:**
- [ ] Performance score ≥ 90
- [ ] Accessibility score ≥ 95
- [ ] Best Practices score ≥ 90
- [ ] SEO score ≥ 95

**Individual Episode Page:**
- [ ] Performance score ≥ 90
- [ ] Accessibility score ≥ 95
- [ ] Best Practices score ≥ 90
- [ ] SEO score ≥ 95

**About Page:**
- [ ] Performance score ≥ 90
- [ ] Accessibility score ≥ 95
- [ ] Best Practices score ≥ 90
- [ ] SEO score ≥ 95

### Core Web Vitals
- [ ] Largest Contentful Paint (LCP) < 2.5s
- [ ] First Input Delay (FID) < 100ms
- [ ] Cumulative Layout Shift (CLS) < 0.1

### Loading Performance
- [ ] Time to First Byte (TTFB) < 600ms
- [ ] First Contentful Paint (FCP) < 1.8s
- [ ] Time to Interactive (TTI) < 3.8s
- [ ] Page load time < 3s on 3G connection

### Asset Optimization
- [ ] Images are optimized (WebP/AVIF formats used)
- [ ] Images have appropriate dimensions (not oversized)
- [ ] CSS is minified
- [ ] JavaScript is minified (if applicable)
- [ ] No unused CSS/JavaScript
- [ ] Fonts are optimized (if custom fonts used)
- [ ] Service worker caching works (if implemented)

### Network Performance
- [ ] No render-blocking resources
- [ ] Critical CSS inlined or preloaded
- [ ] DNS prefetch for external domains
- [ ] Preconnect for critical external resources
- [ ] Resources served over HTTP/2 or HTTP/3
- [ ] Gzip or Brotli compression enabled

---

## Phase 7: Accessibility

### Screen Reader Testing
- [ ] Test with VoiceOver (Mac) or NVDA (Windows)
- [ ] All content is announced correctly
- [ ] Skip to main content link works
- [ ] Navigation is logical and sequential
- [ ] Form labels are properly associated
- [ ] Images have descriptive alt text
- [ ] Audio player controls are accessible

### Keyboard Navigation
- [ ] All interactive elements accessible via Tab key
- [ ] Focus indicators visible on all elements
- [ ] Modal dialogs trap focus correctly
- [ ] Skip links work correctly
- [ ] No keyboard traps

### Color & Contrast
- [ ] Text contrast ratio ≥ 4.5:1 (normal text)
- [ ] Text contrast ratio ≥ 3:1 (large text, 18pt+)
- [ ] Color is not the only means of conveying information
- [ ] Links are distinguishable from regular text

### ARIA Attributes
- [ ] Semantic HTML used where possible
- [ ] ARIA labels present where needed
- [ ] ARIA roles correct (nav, main, complementary, etc.)
- [ ] ARIA live regions used appropriately
- [ ] ARIA expanded/collapsed states correct

### Forms & Inputs (if applicable)
- [ ] All form inputs have labels
- [ ] Required fields marked
- [ ] Error messages are descriptive
- [ ] Form validation is accessible
- [ ] Success messages announced

---

## Phase 8: Cross-Browser & Device Testing

### Desktop Browsers
Test on latest versions of:
- [ ] **Chrome** - All features work, layout correct
- [ ] **Firefox** - All features work, layout correct
- [ ] **Safari** - All features work, layout correct
- [ ] **Edge** - All features work, layout correct

### Mobile Browsers
Test on:
- [ ] **iOS Safari** - iPhone (all features work)
- [ ] **Android Chrome** - Android device (all features work)
- [ ] **Samsung Internet** - If available (all features work)

### Responsive Design
Test at various viewport widths:
- [ ] **Mobile** (320px - 480px) - Layout adapts correctly
- [ ] **Tablet** (481px - 768px) - Layout adapts correctly
- [ ] **Desktop** (769px+) - Layout displays correctly
- [ ] **Large Desktop** (1920px+) - No layout breaking

### Mobile-Specific
- [ ] Touch targets ≥ 44x44px
- [ ] No horizontal scrolling on small screens
- [ ] Font sizes readable on mobile (≥ 16px)
- [ ] Audio player works on mobile devices
- [ ] Navigation menu works on mobile
- [ ] Images load appropriately sized on mobile

---

## Phase 9: Deployment

### Pre-Deployment
- [ ] All tests above passed
- [ ] No placeholder content remains
- [ ] Configuration values finalized
- [ ] Media files uploaded and accessible
- [ ] Git repository clean (no uncommitted changes)
- [ ] CHANGELOG updated (if applicable)

### Deployment Process
- [ ] Choose deployment platform:
  - [ ] Netlify
  - [ ] Vercel
  - [ ] GitHub Pages
  - [ ] Other: _______________
- [ ] Build command configured correctly (`npm run build`)
- [ ] Publish directory set to `dist/`
- [ ] Environment variables set (if any)
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate enabled (HTTPS)

### Post-Deployment Verification
- [ ] Site loads on production URL
- [ ] All pages accessible
- [ ] All media files load correctly
- [ ] RSS feed accessible at production URL
- [ ] No mixed content warnings (HTTP/HTTPS)
- [ ] Security headers present (check https://securityheaders.com/)
- [ ] Custom domain resolves correctly (if applicable)

### DNS & Domain
- [ ] A record or CNAME configured correctly
- [ ] WWW and non-WWW both work (or redirect appropriately)
- [ ] DNS propagation complete (check https://dnschecker.org/)
- [ ] SSL certificate valid (check https://www.ssllabs.com/ssltest/)

---

## Phase 10: Post-Launch

### RSS Feed Submission
- [ ] **Apple Podcasts Connect**
  - [ ] Feed submitted
  - [ ] Validation passed
  - [ ] Podcast approved and live
  - [ ] Podcast analytics enabled
- [ ] **Spotify for Podcasters**
  - [ ] Feed submitted
  - [ ] Verification complete
  - [ ] Podcast live on Spotify
- [ ] **Google Podcasts Manager**
  - [ ] Feed submitted
  - [ ] Ownership verified
  - [ ] Podcast indexed
- [ ] **Other Directories** (optional):
  - [ ] Amazon Music / Audible
  - [ ] iHeartRadio
  - [ ] TuneIn
  - [ ] Stitcher
  - [ ] Podcast Index

### Monitoring Setup
- [ ] Google Analytics installed (if desired)
- [ ] Google Search Console verified
- [ ] Uptime monitoring enabled (e.g., UptimeRobot)
- [ ] RSS feed monitoring (check accessibility daily)
- [ ] Error tracking enabled (e.g., Sentry)

### Analytics Verification
- [ ] Page views tracked correctly
- [ ] Episode downloads tracked
- [ ] User behavior flows make sense
- [ ] No bot traffic skewing data

### Final Quality Checks
- [ ] Test RSS feed in podcast app (Apple Podcasts, Spotify, etc.)
- [ ] Verify new episodes appear within 24 hours of publishing
- [ ] Check social sharing works on multiple platforms
- [ ] Test contact form (if implemented)
- [ ] Review all content for typos/errors

### Documentation
- [ ] README updated with production URL
- [ ] Deployment instructions documented
- [ ] Content workflow documented
- [ ] Maintenance procedures documented

---

## Troubleshooting Common Issues

### Build Failures
**Symptom:** `npm run build` fails

**Check:**
- [ ] All dependencies installed (`npm install`)
- [ ] No syntax errors in configuration files
- [ ] All referenced media files exist
- [ ] Content collections valid (no frontmatter errors)

### Images Not Loading
**Symptom:** Broken image icons

**Check:**
- [ ] File paths are correct (case-sensitive)
- [ ] Files exist in `public/` directory
- [ ] File extensions lowercase (.png, not .PNG)
- [ ] No spaces in filenames
- [ ] Rebuild after adding new files

### RSS Feed Errors
**Symptom:** Validators show errors

**Check:**
- [ ] All URLs are absolute (not relative)
- [ ] Domain configured correctly in config
- [ ] Audio files publicly accessible
- [ ] No special characters breaking XML
- [ ] iTunes tags properly formatted

### Audio Not Playing
**Symptom:** Audio player silent or errors

**Check:**
- [ ] Audio file is valid MP3
- [ ] audioFile field in frontmatter correct
- [ ] File exists at expected path
- [ ] File size reasonable (not corrupted)
- [ ] Server serves correct MIME type (audio/mpeg)

### Slow Performance
**Symptom:** Low Lighthouse scores

**Check:**
- [ ] Images optimized (use WebP/AVIF)
- [ ] No oversized images
- [ ] Service worker enabled
- [ ] CDN configured (if applicable)
- [ ] Fonts optimized or using system fonts

---

## Automated Testing Scripts

### Run All Checks
Create a script to run multiple checks:

```bash
#!/bin/bash
echo "Running IndieCaster Test Suite..."

echo "\n1. Installing dependencies..."
npm install

echo "\n2. Running media validation..."
npm run validate-media

echo "\n3. Building site..."
npm run build

echo "\n4. Starting preview..."
npm run preview &
PREVIEW_PID=$!

sleep 5

echo "\n5. Testing RSS feed..."
curl -f http://localhost:4321/rss.xml > /dev/null
if [ $? -eq 0 ]; then
    echo "✓ RSS feed accessible"
else
    echo "✗ RSS feed NOT accessible"
fi

echo "\n6. Testing sitemap..."
curl -f http://localhost:4321/sitemap-index.xml > /dev/null
if [ $? -eq 0 ]; then
    echo "✓ Sitemap accessible"
else
    echo "✗ Sitemap NOT accessible"
fi

echo "\n7. Stopping preview..."
kill $PREVIEW_PID

echo "\nTest suite complete!"
```

---

## Sign-Off Checklist

Before marking Phase 1 as complete:

- [ ] All bug fixes implemented and tested
- [ ] RSS feed enhanced and validated
- [ ] Media requirements documented
- [ ] Media validation script working
- [ ] Testing checklist complete
- [ ] Documentation updated
- [ ] Code reviewed
- [ ] Git branch merged to main
- [ ] Git tag created for release

**Tested by:** _______________
**Date:** _______________
**Phase 1 Status:** [ ] PASS / [ ] FAIL

**Notes:**
____________________________________________________________
____________________________________________________________
____________________________________________________________

---

**Last Updated:** Phase 1 - Foundation & Bug Fixes
**Next Phase:** Phase 2 - Web-Based Setup Wizard
