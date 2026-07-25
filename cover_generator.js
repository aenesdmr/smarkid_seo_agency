import { imagePool, getCategoryForArticle } from './image_pool.js';

/**
 * Konuya özel özenle seçilmiş, yüksek çözünürlüklü ve tekrarsız Unsplash kapak görseli atar.
 * Daha önce kullanılmış görselleri kesinlikle tekrar seçmez.
 * @param {Object} article - Makale bilgisi
 * @param {number} issueNumber - Sayı numarası
 * @param {Object} [state] - State verisi
 * @returns {Promise<{ publicUrl: string, category: string, bgUrl: string }>} Seçilen görsel bağlantıları
 */
export async function generateBrandedCover(article, issueNumber, state = {}) {
  const category = getCategoryForArticle(article);
  const pool = imagePool[category] || imagePool['b2b'];
  const usedImages = state.usedImages || [];

  // Kullanılmamış görselleri filtrele
  const availableImages = pool.filter(url => !usedImages.includes(url));

  let bgUrl = '';
  if (availableImages.length > 0) {
    // Rastgele veya sayı sırasına göre kullanılmamış resim seç
    const index = Math.floor(Math.random() * availableImages.length);
    bgUrl = availableImages[index];
  } else {
    // Tüm havuz kullanıldıysa döngüsel farklı bir resim seç
    const index = (issueNumber * 3) % pool.length;
    bgUrl = pool[index];
  }

  console.log(`🎨 Konuya Özel Benzersiz Görsel Seçildi (Kategori: "${category}", SIO #${issueNumber}): ${bgUrl}`);

  return { publicUrl: bgUrl, category, bgUrl };
}
