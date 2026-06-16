/**
 * Smartkid SEO Agent - Abstract 3D Render Image Finder
 * Curated from premium Unsplash abstract design pools.
 */

// Hand-picked high-quality, professional abstract 3D render IDs
// to prevent any AI anomalies and guarantee brand consistency.
const IMAGE_POOL = {
  blue: [
    'photo-1618005182384-a83a8bd57fbe', // Blue/purple glass wave
    'photo-1634017839464-5c339ebe3cb4', // 3D geometric shapes
    'photo-1620641788421-7a1c342ea42e', // Holographic iridescent waves
  ],
  purple: [
    'photo-1635070041078-e363dbe005cb', // 3D glass rendering
    'photo-1617791160536-598cf32026fb', // Lavender abstract 3D
    'photo-1607604276583-eef5d076aa5f', // Purple neon geometry
    'photo-1620641788421-7a1c342ea42e', // Holographic iridescent waves
    'photo-1618005182384-a83a8bd57fbe', // Blue/purple glass wave
  ],
  indigo: [
    'photo-1618005182384-a83a8bd57fbe', // Blue/purple glass wave
    'photo-1620641788421-7a1c342ea42e', // Holographic wave
    'photo-1634017839464-5c339ebe3cb4', // Geometric shapes
  ],
  cyan: [
    'photo-1633167606207-d840b5070fc2', // Abstract 3D pastel shapes
    'photo-1620641788421-7a1c342ea42e', // Holographic wave
  ],
  green: [
    'photo-1633167606207-d840b5070fc2', // Abstract shapes (green/cyan parts)
    'photo-1620641788421-7a1c342ea42e', // Holographic wave (green highlights)
  ],
  black: [
    'photo-1550684848-fac1c5b4e853', // Minimalist black/dark wave
    'photo-1600585154340-be6161a56a0c', // Dark modern architecture
  ]
};

/**
 * Searches Unsplash for a premium abstract 3D render image matching a specific color
 * @param {string} color - Brand color name (blue, purple, indigo, cyan, black, green)
 * @returns {Promise<string>} High-resolution optimized image URL
 */
export async function getAbstractImage(color = 'blue') {
  const normalizedColor = String(color).toLowerCase().trim();
  const pool = IMAGE_POOL[normalizedColor] || IMAGE_POOL.blue;
  
  // Select a random image ID from the color-specific pool as the baseline fallback
  const fallbackId = pool[Math.floor(Math.random() * pool.length)];
  const fallbackUrl = `https://images.unsplash.com/${fallbackId}?q=80&w=1200&auto=format&fit=crop`;

  try {
    const searchUrl = `https://unsplash.com/s/photos/abstract-3d-render-${encodeURIComponent(normalizedColor)}`;
    console.log(`🔍 Unsplash search query: abstract 3d render ${normalizedColor}`);
    
    const response = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const html = await response.text();
    
    // Find all matches for Unsplash photo source URLs
    const matches = html.match(/images\.unsplash\.com\/photo-[-a-zA-Z0-9?=_&;]+/g) || [];
    
    if (matches.length > 0) {
      // Deduplicate matching URLs
      const uniqueUrls = [...new Set(matches)];
      console.log(`✨ Found ${uniqueUrls.length} unique images on Unsplash.`);
      
      // Select one from the top 10 results (to ensure relevance and variety)
      const maxResults = Math.min(uniqueUrls.length, 10);
      const selected = uniqueUrls[Math.floor(Math.random() * maxResults)];
      
      // Clean query parameters and optimize resolution to 1200px width
      const basePhotoUrl = selected.split('?')[0];
      const optimizedUrl = `${basePhotoUrl}?q=80&w=1200&auto=format&fit=crop`;
      
      return optimizedUrl;
    } else {
      console.log('⚠️ No images found matching the query on Unsplash HTML page.');
    }
  } catch (error) {
    console.warn('⚠️ Unsplash scraper blocked or failed (HTTP 401/403). Using hand-picked premium image fallback.');
  }
  
  console.log(`💡 Selected hand-picked premium abstract 3D image URL: ${fallbackUrl}`);
  return fallbackUrl;
}
