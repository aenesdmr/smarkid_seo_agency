import { createCanvas, loadImage } from '@napi-rs/canvas';
import fs from 'fs';
import path from 'path';
import { imagePool, getCategoryForArticle } from './image_pool.js';

/**
 * Dinamik olarak numaralı & markalı (#SIO XX) özel kapak görseli üretir ve anında CDN'e yükler.
 * @param {Object} article - Makale bilgisi
 * @param {number} issueNumber - Sayı numarası (örn: 76)
 * @param {Object} [state] - State verisi
 * @returns {Promise<{ publicUrl: string, localPath: string }>} Üretilen görsel bağlantıları
 */
export async function generateBrandedCover(article, issueNumber, state = {}) {
  const width = 1200;
  const height = 630;

  const category = getCategoryForArticle(article);
  const pool = imagePool[category] || imagePool['b2b'];
  const usedImages = state.usedImages || [];

  // Kullanılmamış resmi seç
  let bgUrl = pool.find(url => !usedImages.includes(url));
  if (!bgUrl) {
    bgUrl = pool[issueNumber % pool.length];
  }

  console.log(`🎨 Dinamik Markalı Kapak Görseli Çiziliyor (Kategori: "${category}", SIO #${issueNumber})...`);

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  try {
    const bgImage = await loadImage(bgUrl);
    ctx.drawImage(bgImage, 0, 0, width, height);
  } catch (err) {
    console.warn('⚠️ Arka plan resmi indirilemedi, lüks gradyan çiziliyor:', err.message);
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, '#0F172A');
    bgGrad.addColorStop(1, '#1E293B');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);
  }

  // 1. Sol Üst Gölgeleme (Okunabilirlik Garantisi)
  const overlayGrad = ctx.createLinearGradient(0, 0, width, 0);
  overlayGrad.addColorStop(0, 'rgba(15, 23, 42, 0.85)');
  overlayGrad.addColorStop(0.5, 'rgba(15, 23, 42, 0.4)');
  overlayGrad.addColorStop(1, 'rgba(15, 23, 42, 0.15)');
  ctx.fillStyle = overlayGrad;
  ctx.fillRect(0, 0, width, height);

  // 2. Cam Efektli (Glassmorphic) Şık Rozet Kutusu
  const boxX = 64;
  const boxY = 64;
  const boxWidth = 280;
  const boxHeight = 98;
  const borderRadius = 18;

  ctx.save();
  ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.lineWidth = 1.5;

  ctx.beginPath();
  if (typeof ctx.roundRect === 'function') {
    ctx.roundRect(boxX, boxY, boxWidth, boxHeight, borderRadius);
  } else {
    ctx.rect(boxX, boxY, boxWidth, boxHeight);
  }
  ctx.fill();
  ctx.stroke();
  ctx.restore();

  // 3. Tipografi: SIO #76 ve SMARTKID INFO BANK
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 36px sans-serif';
  ctx.fillText(`SIO #${issueNumber}`, boxX + 24, boxY + 46);

  ctx.fillStyle = '#94A3B8';
  ctx.font = 'bold 13px sans-serif';
  ctx.fillText('SMARTKID INFO BANK', boxX + 24, boxY + 74);

  // 4. Yerel Dosyaya Kaydet
  const coversDir = path.join(process.cwd(), 'published_articles', 'covers');
  if (!fs.existsSync(coversDir)) {
    fs.mkdirSync(coversDir, { recursive: true });
  }

  const fileName = `sio_${issueNumber}.jpg`;
  const localPath = path.join(coversDir, fileName);
  const buffer = canvas.toBuffer('image/jpeg');
  fs.writeFileSync(localPath, buffer);

  // 5. Anında HTTPS CDN Yüklemesi (Catbox CDN)
  let publicUrl = '';
  try {
    const formData = new FormData();
    formData.append('reqtype', 'fileupload');
    formData.append('fileToUpload', new Blob([buffer], { type: 'image/jpeg' }), fileName);

    const res = await fetch('https://catbox.moe/user/api.php', {
      method: 'POST',
      body: formData
    });

    const cdnUrl = (await res.text()).trim();
    if (cdnUrl.startsWith('http')) {
      publicUrl = cdnUrl;
      console.log(`✨ Numaralı Marka Kapak Görseli CDN'e Yüklendi: ${publicUrl}`);
    } else {
      publicUrl = bgUrl;
    }
  } catch (uploadErr) {
    console.warn('⚠️ CDN yüklemesi başarısız oldu, doğrudan resim URL kullanılıyor:', uploadErr.message);
    publicUrl = bgUrl;
  }

  return { publicUrl, localPath, bgUrl };
}
