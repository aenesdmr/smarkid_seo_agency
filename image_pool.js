/**
 * Smartkid Blog Kategoriye Özel Soyut 3D Render & Kurumsal Arka Plan Havuzu
 * YENİLENMİŞ & TEKRARSIZ GÖRSEL LİSTESİ
 */

export const imagePool = {
  meta_ads: [
    'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&auto=format&fit=crop&q=80',
  ],
  ai_geo: [
    'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80',
  ],
  b2b: [
    'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1542744801-43245f175232?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&auto=format&fit=crop&q=80',
  ],
  seo_analytics: [
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&auto=format&fit=crop&q=80',
  ],
  saas_growth: [
    'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1200&auto=format&fit=crop&q=80',
  ]
};

/**
 * Makale konusuna en uygun soyut görsel kategorisini belirler.
 */
export function getCategoryForArticle(article) {
  const text = `${article.title} ${article.keywords ? article.keywords.join(' ') : ''}`.toLowerCase();
  
  if (text.includes('meta') || text.includes('facebook') || text.includes('instagram') || text.includes('reklam') || text.includes('cbo') || text.includes('lookalike')) {
    return 'meta_ads';
  }
  if (text.includes('b2b') || text.includes('email') || text.includes('soğuk') || text.includes('cold') || text.includes('outbound')) {
    return 'b2b';
  }
  if (text.includes('seo') || text.includes('geo') || text.includes('yapay zeka') || text.includes('ai') || text.includes('arama')) {
    return 'ai_geo';
  }
  if (text.includes('analitik') || text.includes('dönüşüm') || text.includes('pixel') || text.includes('takip')) {
    return 'seo_analytics';
  }
  return 'saas_growth';
}
