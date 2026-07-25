import { imagePool, getCategoryForArticle } from './image_pool.js';

/**
 * Konuya özel özenle seçilmiş, yüksek çözünürlüklü Unsplash kapak görseli atar.
 * Framer API'sinin %100 kabul ettiği Unsplash CDN bağlantısını kullanır.
 * Saçma ve alakasız stok fotoğrafları (Netflix vb.) tamamen elenmiştir.
 * @param {Object} article - Makale bilgisi
 * @param {number} issueNumber - Sayı numarası (örn: 76)
 * @param {Object} [state] - State verisi
 * @returns {Promise<{ publicUrl: string, category: string, bgUrl: string }>} Seçilen görsel bağlantıları
 */
export async function generateBrandedCover(article, issueNumber, state = {}) {
  const category = getCategoryForArticle(article);
  const pool = imagePool[category] || imagePool['b2b'];
  const usedImages = state.usedImages || [];

  // Kullanılmamış resmi seç
  let bgUrl = pool.find(url => !usedImages.includes(url));
  if (!bgUrl) {
    bgUrl = pool[issueNumber % pool.length];
  }

  console.log(`🎨 Konuya Özel Yüksek Çözünürlüklü Görsel Seçildi (Kategori: "${category}", SIO #${issueNumber}): ${bgUrl}`);

  return { publicUrl: bgUrl, category, bgUrl };
}
