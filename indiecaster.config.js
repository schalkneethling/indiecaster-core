export const indieCasterConfig = {
  // Brand Colors - Customize these to match your podcast's branding
  colorPrimaryColor: "#1c1c44",      // Main brand color
  colorPrimaryColorDark: "#090913",   // Dark variant for backgrounds
  colorPrimaryColorLight: "#f6f6ff",  // Light variant for text on dark backgrounds
  colorSecondaryColor: "#dab97e",     // Accent color
  colorSecondaryColorDark: "#38290d", // Dark accent variant
  colorSecondaryColorLight: "#fff1d7", // Light accent variant
  
  // Site Configuration
  domain: "[YOUR_DOMAIN]", // Your website domain (e.g., "mypodcast.com")
  // <<-- START :: Your elevator pitch
  elevatorPitch:
    "The IndieCaster Podcast - A show about independent podcasting, content creation, and building your audience from the ground up.",
  // <<-- END :: Your elevator pitch
  // <<-- START :: Featured episode configuration (OPTIONAL)
  // Remove this entire section if you want to use the latest published episode instead
  featuredEpisodeGuestName: "Jane Springfield",
  featuredEpisodeGuestProfilePicture: "jane-springfield",
  featuredEpisodeTitle:
    "Getting Started with Your First Podcast",
  featuredEpisodeSummary:
    "In this episode, we discuss the essential steps to launch your first podcast, from choosing your topic and format to recording your first episode and publishing it to the world.",
  featuredEpisodeTrack: "getting-started-podcast",
  featuredEpisodeURL: "episode-1",
  // <<-- END :: Featured episode configuration
  // Header Configuration
  headerBackgroundColor: "#1c1c44", // Header background color
  headerForegroundColor: "#fff",    // Header text color
  
  // Host Information
  hostName: "Your Name",                    // Your name as the podcast host
  hostProfilePicture: "your-profile-picture", // Your profile image filename (without extension)
  
  // Logo Configuration
  logo: "logo.svg",        // Your logo filename
  logoHeight: "275",       // Logo height in pixels
  logoWidth: "500",        // Logo width in pixels
  mainNavigation: [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Episodes",
      url: "/episodes",
    },
    {
      name: "About",
      url: "/about",
    },
    {
      name: "Contact",
      url: "/contact",
    },
  ],
  metaDefaultDescription:
    "A complete website kit for Indie Podcasters. Easily self-host and manage your very own podcast website.",
  metaLanguage: "en",
  metaLocale: "en_US",
  podcastName: "IndieCaster",
  podcastPlayers: [
    {
      icon: "default-amazon",
      name: "Amazon Music",
      url: "https://music.amazon.com/podcasts/",
    },
    {
      icon: "default-apple",
      name: "Apple Podcasts",
      url: "https://podcasts.apple.com/us/podcast/",
    },
    {
      icon: "default-overcast",
      name: "Overcast",
      url: "https://overcast.fm/",
    },
    {
      icon: "default-spotify",
      name: "Spotify",
      url: "https://open.spotify.com/show/",
    },
    {
      icon: "default-youtube",
      name: "YouTube",
      url: "https://www.youtube.com/",
    },
    {
      icon: "default-rss",
      name: "RSS",
      url: "https://feeds.buzzsprout.com/",
    },
  ],
  socialMedia: [
    {
      icon: "default-discord",
      name: "Discord",
      url: "https://www.discord.com/",
    },
    {
      icon: "default-facebook",
      name: "Facebook",
      url: "https://www.facebook.com/",
    },
    {
      icon: "default-github",
      name: "GitHub",
      url: "https://github.com/",
    },
    {
      icon: "default-instagram",
      name: "Instagram",
      url: "https://www.instagram.com/",
    },
    {
      icon: "default-linkedin",
      name: "LinkedIn",
      url: "https://www.linkedin.com/",
    },
    {
      icon: "default-mastodon",
      name: "Mastodon",
      url: "https://www.hacyderm.com/",
    },
    {
      icon: "default-slack",
      name: "Slack",
      url: "https://www.slack.com/",
    },
    {
      icon: "default-x",
          name: "Social Media",
    url: "https://social.example.com/",
    },
  ],
};
