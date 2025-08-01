# IndieCaster Setup Checklist

Use this checklist to ensure you've completed all necessary steps to set up your podcast website.

## ✅ Initial Setup

- [ ] Clone the repository
- [ ] Install dependencies (`npm install`)
- [ ] Start development server (`npm run dev`) to verify everything works

## ✅ Configuration

### Essential Settings (`indiecaster.config.js`)
- [ ] Update `domain` with your actual domain
- [ ] Set `elevatorPitch` with your podcast name and description
- [ ] Change `hostName` to your real name
- [ ] Update `hostProfilePicture` with your profile image filename
- [ ] Replace `logo.svg` with your actual logo file

### Optional Featured Episode
- [ ] Configure `featuredEpisodeTitle` and `featuredEpisodeSummary`
- [ ] Set `featuredEpisodeGuestName` and `featuredEpisodeGuestProfilePicture`
- [ ] Update `featuredEpisodeTrack` with your audio filename
- [ ] Set `featuredEpisodeURL` to your episode slug

### Branding
- [ ] Customize brand colors (`colorPrimaryColor`, `colorSecondaryColor`, etc.)
- [ ] Update header colors (`headerBackgroundColor`, `headerForegroundColor`)
- [ ] Adjust logo dimensions (`logoHeight`, `logoWidth`)

## ✅ Content Creation

### Episodes
- [ ] Replace sample episode content in `src/content/episodes/episode-1.md`
- [ ] Add your episode audio file to `public/audio/episodes/`
- [ ] Add episode artwork to `public/episode-artwork/`
- [ ] Create additional episodes as needed

### Guests
- [ ] Replace sample guest in `src/content/guests/jane-springfield.md`
- [ ] Add guest profile images to `public/profile-images/`
- [ ] Create additional guest profiles as needed

### Media Files
- [ ] Add your profile image to `public/profile-images/`
- [ ] Ensure all images are in multiple formats (PNG, WebP, AVIF)
- [ ] Verify audio files are in MP3 format
- [ ] Check that all image filenames match frontmatter references

## ✅ SEO & Metadata

### OpenGraph & Social Media
- [ ] Update OpenGraph tags in `src/components/OpenGraph.astro`
- [ ] Configure social media meta tags
- [ ] Test social media previews

### Structured Data
- [ ] Verify structured data in `src/components/StructuredData.astro`
- [ ] Test with Google's Rich Results Test

### RSS Feed
- [ ] Verify RSS feed at `/rss.xml`
- [ ] Test feed with podcast platforms
- [ ] Submit feed to podcast directories

## ✅ Navigation & Pages

### Main Navigation
- [ ] Update `mainNavigation` in config with your pages
- [ ] Verify all navigation links work correctly
- [ ] Test mobile navigation

### Custom Pages
- [ ] Update About page content (`src/pages/about.astro`)
- [ ] Update Contact page content (`src/pages/contact.astro`)
- [ ] Add any custom pages you need

## ✅ Testing & Quality Assurance

### Functionality Testing
- [ ] Test episode pages load correctly
- [ ] Verify audio players work
- [ ] Check guest profile pages
- [ ] Test RSS feed generation
- [ ] Verify draft episodes don't appear publicly

### Performance Testing
- [ ] Run `npm run build` successfully
- [ ] Check build output in `dist/` directory
- [ ] Test site performance with Lighthouse
- [ ] Verify images are optimized

### Cross-Browser Testing
- [ ] Test on Chrome, Firefox, Safari, Edge
- [ ] Verify mobile responsiveness
- [ ] Check accessibility features

## ✅ Deployment

### Pre-Deployment
- [ ] Update domain in all configuration files
- [ ] Set up custom domain (if applicable)
- [ ] Configure SSL certificate
- [ ] Set up analytics tracking

### Platform-Specific Setup
- [ ] **Netlify**: Connect repository, configure build settings
- [ ] **Vercel**: Deploy with zero config
- [ ] **GitHub Pages**: Enable Pages in repository settings
- [ ] **AWS S3**: Configure bucket and CloudFront

### Post-Deployment
- [ ] Test live site functionality
- [ ] Verify all links work correctly
- [ ] Check RSS feed on live site
- [ ] Submit sitemap to search engines
- [ ] Test podcast platforms with your RSS feed

## ✅ Promotion & Launch

### Podcast Directories
- [ ] Submit to Apple Podcasts
- [ ] Submit to Spotify
- [ ] Submit to Google Podcasts
- [ ] Submit to other platforms (Stitcher, Overcast, etc.)

### Social Media
- [ ] Create social media accounts for your podcast
- [ ] Update social media links in footer
- [ ] Create launch announcement posts
- [ ] Set up social media scheduling

### Analytics & Tracking
- [ ] Set up Google Analytics
- [ ] Configure podcast analytics (if applicable)
- [ ] Set up email list signup (if desired)
- [ ] Configure conversion tracking

## ✅ Maintenance

### Regular Tasks
- [ ] Schedule regular content updates
- [ ] Monitor analytics and performance
- [ ] Update dependencies periodically
- [ ] Backup your content regularly

### Content Calendar
- [ ] Plan episode release schedule
- [ ] Create content calendar
- [ ] Set up guest booking process
- [ ] Plan promotional activities

## 🎉 Launch Checklist

Before going live, ensure you have:

- [ ] All content is final and proofread
- [ ] All media files are optimized
- [ ] All links are working
- [ ] RSS feed is valid
- [ ] Social media accounts are ready
- [ ] Analytics are configured
- [ ] Backup strategy is in place

**Congratulations! Your podcast website is ready to launch! 🎙️**

---

*Need help with any of these steps? Check the [Getting Started Guide](GETTING-STARTED.md) for detailed instructions.* 