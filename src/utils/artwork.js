/**
 * Artwork utility functions for IndieCaster
 * Handles podcast artwork requirements and fallbacks (platform-agnostic)
 */

/**
 * Get the appropriate artwork for a given context
 * @param {Object} artwork - The artwork object from episode frontmatter
 * @param {string} context - The context where artwork is being used ('show', 'episode', 'hero', 'card')
 * @param {string} format - The desired format ('png', 'webp', 'svg')
 * @returns {Object} - Object with src and alt properties
 */
export function getArtwork(artwork, context = 'episode', format = 'png') {
  if (!artwork) {
    return {
      src: '/episode-artwork/episode-default',
      alt: 'Default episode artwork'
    };
  }

  // Handle podcast-specific artwork
  if (artwork.podcast) {
    const podcastArt = artwork.podcast;
    
    switch (context) {
      case 'show':
        // Use show cover for main show artwork
        if (podcastArt.showCover) {
          return {
            src: `/episode-artwork/${podcastArt.showCover}`,
            alt: artwork.alt || 'Show artwork'
          };
        }
        break;
      
      case 'episode':
        // Use episode-specific artwork
        if (podcastArt.episodeArt) {
          return {
            src: `/episode-artwork/${podcastArt.episodeArt}`,
            alt: artwork.alt || 'Episode artwork'
          };
        }
        break;
      
      case 'hero':
        // Use hero image for wide format
        if (podcastArt.heroImage) {
          return {
            src: `/episode-artwork/${podcastArt.heroImage}`,
            alt: artwork.alt || 'Hero artwork'
          };
        }
        break;
      
      case 'card':
        // Use episode art for cards, fallback to show cover
        if (podcastArt.episodeArt) {
          return {
            src: `/episode-artwork/${podcastArt.episodeArt}`,
            alt: artwork.alt || 'Episode artwork'
          };
        } else if (podcastArt.showCover) {
          return {
            src: `/episode-artwork/${podcastArt.showCover}`,
            alt: artwork.alt || 'Show artwork'
          };
        }
        break;
    }
  }

  // Fallback to legacy artwork structure
  if (artwork.legacy) {
    return {
      src: `/episode-artwork/${artwork.legacy.src}`,
      alt: artwork.legacy.alt || artwork.alt || 'Episode artwork'
    };
  }

  // Final fallback to basic artwork structure
  return {
    src: `/episode-artwork/${artwork.src}`,
    alt: artwork.alt || 'Episode artwork'
  };
}

/**
 * Get artwork with specific format
 * @param {Object} artwork - The artwork object from episode frontmatter
 * @param {string} context - The context where artwork is being used
 * @param {string} format - The desired format ('png', 'webp', 'svg')
 * @returns {Object} - Object with src and alt properties
 */
export function getArtworkWithFormat(artwork, context = 'episode', format = 'png') {
  const baseArtwork = getArtwork(artwork, context);
  
  // Add format extension if not already present
  if (!baseArtwork.src.includes('.')) {
    baseArtwork.src += `.${format}`;
  }
  
  return baseArtwork;
}

/**
 * Validate artwork against podcast platform requirements
 * @param {Object} artwork - The artwork object to validate
 * @returns {Object} - Validation result with errors and warnings
 */
export function validatePodcastArtwork(artwork) {
  const result = {
    isValid: true,
    errors: [],
    warnings: []
  };

  if (!artwork) {
    result.isValid = false;
    result.errors.push('Artwork is required');
    return result;
  }

  // Check for required alt text
  if (!artwork.alt) {
    result.warnings.push('Alt text is recommended for accessibility');
  }

  // Check podcast-specific artwork
  if (artwork.podcast) {
    const podcastArt = artwork.podcast;
    
    // Validate show cover
    if (podcastArt.showCover) {
      // In a real implementation, you might want to check file dimensions
      // For now, we'll just validate that the field exists
    } else {
      result.warnings.push('Show cover artwork is recommended for podcast platforms');
    }

    // Validate episode art
    if (podcastArt.episodeArt) {
      // Episode art is optional but recommended
    } else {
      result.warnings.push('Episode-specific artwork is recommended for better discoverability');
    }
  } else {
    result.warnings.push('Consider adding podcast-specific artwork for better platform compliance');
  }

  return result;
}

/**
 * Get artwork dimensions for different contexts
 * @param {string} context - The context where artwork is being used
 * @returns {Object} - Object with width and height properties
 */
export function getArtworkDimensions(context = 'episode') {
  switch (context) {
    case 'show':
    case 'episode':
      return { width: 3000, height: 3000 };
    case 'hero':
      return { width: 4320, height: 1080 };
    case 'card':
      return { width: 300, height: 200 };
    default:
      return { width: 3000, height: 3000 };
  }
}

/**
 * Get artwork for RSS feed (podcast platforms)
 * @param {Object} artwork - The artwork object from episode frontmatter
 * @returns {Object} - Object with src and alt properties optimized for RSS
 */
export function getRssArtwork(artwork) {
  // For RSS feeds, prefer episode-specific artwork, then show cover
  if (artwork.podcast) {
    if (artwork.podcast.episodeArt) {
      return {
        src: `/episode-artwork/${artwork.podcast.episodeArt}`,
        alt: artwork.alt || 'Episode artwork'
      };
    } else if (artwork.podcast.showCover) {
      return {
        src: `/episode-artwork/${artwork.podcast.showCover}`,
        alt: artwork.alt || 'Show artwork'
      };
    }
  }
  
  // Fallback to basic artwork
  return {
    src: `/episode-artwork/${artwork.src}`,
    alt: artwork.alt || 'Episode artwork'
  };
}

/**
 * Get artwork for homepage display
 * @param {Object} artwork - The artwork object from episode frontmatter
 * @returns {Object} - Object with src and alt properties optimized for homepage
 */
export function getHomepageArtwork(artwork) {
  // For homepage, prefer hero image for wide displays, then episode art
  if (artwork.podcast) {
    if (artwork.podcast.heroImage) {
      return {
        src: `/episode-artwork/${artwork.podcast.heroImage}`,
        alt: artwork.alt || 'Hero artwork'
      };
    } else if (artwork.podcast.episodeArt) {
      return {
        src: `/episode-artwork/${artwork.podcast.episodeArt}`,
        alt: artwork.alt || 'Episode artwork'
      };
    }
  }
  
  // Fallback to basic artwork
  return {
    src: `/episode-artwork/${artwork.src}`,
    alt: artwork.alt || 'Episode artwork'
  };
} 
