import fs from 'fs';
import path from 'path';

/**
 * Yeni makale detaylarını no-code otomasyon (Make.com) webhook'una gönderir.
 * @param {Object} article - Makale objesi
 * @param {string} imageUrl - Kapak görseli URL'si
 * @returns {Promise<boolean>} İşlem başarısı
 */
export async function sendToWebhook(article, imageUrl) {
  const webhookUrl = process.env.MAKE_WEBHOOK_URL;

  if (!webhookUrl || webhookUrl === 'your_make_webhook_url_here' || webhookUrl.startsWith('your_')) {
    console.log('⚠️ MAKE_WEBHOOK_URL yapılandırılmamış veya varsayılan değerde. Webhook paylaşımı atlanıyor.');
    return false;
  }

  // State dosyasından sıradaki kesin sayı numarasını al ve güncelle
  const statePath = path.join(process.cwd(), 'state.json');
  let currentNumber = 71;

  try {
    if (fs.existsSync(statePath)) {
      const stateData = JSON.parse(fs.readFileSync(statePath, 'utf8'));
      currentNumber = (stateData.lastIssueNumber || 71) + 1;
    } else {
      currentNumber = 72;
    }
  } catch (e) {
    currentNumber = 72;
  }

  // Yeni sayıyı kaydet
  try {
    fs.writeFileSync(statePath, JSON.stringify({ lastIssueNumber: currentNumber }, null, 2), 'utf8');
    console.log(`🔢 SIO Sayı Numarası Güncellendi: SIO #${currentNumber}`);
  } catch (err) {
    console.error('⚠️ state.json kaydedilemedi:', err);
  }

  const issueNumber = currentNumber;
  const linkedinText = `SIO #${issueNumber} yayında! Ekibimiz sizin için yazdı:\n\n"${article.title}"\n\n📌 ${article.metaDescription}\n\nOkumak için: https://www.smartkid.agency/blog/${article.slug}`;

  const defaultImage = "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=1200&auto=format&fit=crop&q=80";

  const payload = {
    title: article.title,
    slug: article.slug,
    metaDescription: article.metaDescription,
    url: `https://www.smartkid.agency/blog/${article.slug}`,
    imageUrl: imageUrl || defaultImage,
    issueNumber: issueNumber,
    linkedinText: linkedinText,
    publishedAt: new Date().toISOString()
  };

  console.log(`\n📤 Make.com Webhook tetikleniyor (SIO #${issueNumber}): ${webhookUrl}...`);

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      console.log('✅ Webhook başarıyla tetiklendi!');
      return true;
    } else {
      console.error(`❌ Webhook Hatası (HTTP ${response.status})`);
      return false;
    }
  } catch (error) {
    console.error('❌ Webhook\'a veri gönderilirken hata oluştu:', error);
    return false;
  }
}
