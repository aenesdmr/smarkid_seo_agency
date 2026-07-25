import { imagePool, getCategoryForArticle } from './image_pool.js';

/**
 * Konuya özel özenle seçilmiş, yüksek çözünürlüklü Unsplash kapak görseli atar.
 * Saçma ve alakasız stok fotoğrafları engeller.
 * @param {Object} article - Makale bilgisi
 * @param {number} issueNumber - Sayı numarası (örn: 75)
 * @param {Object} [state] - State verisi (kullanılan görselleri takip için)
 * @returns {Promise<{ publicUrl: string, category: string }>} Seçilen görsel ve kategorisi
 */
export async function generateBrandedCover(article, issueNumber, state = {}) {
  const category = getCategoryForArticle(article);
  const pool = imagePool[category] || imagePool['b2b'];
  const usedImages = state.usedImages || [];

  // Kullanılmamış resim seç, hepsi kullanıldıysa havuzdan sırayla seç
  let bgUrl = pool.find(url => !usedImages.includes(url));
  if (!bgUrl) {
    bgUrl = pool[issueNumber % pool.length];
  }

  console.log(`🎨 Konuya Özel Görsel Seçildi (Kategori: "${category}", SIO #${issueNumber}): ${bgUrl}`);

  return { publicUrl: bgUrl, category, bgUrl };
}
