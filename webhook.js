import fs from 'fs';
import path from 'path';
import { sendDetailedErrorEmail } from './emailer.js';

/**
 * Yeni makale detaylarını no-code otomasyon (Make.com) webhook'una gönderir.
 * @param {Object} article - Makale objesi
 * @param {number} issueNumber - Kesin SIO Sayı Numarası
 * @param {string} imageUrl - Kapak görseli URL'si
 * @returns {Promise<boolean>} İşlem başarısı
 */
export async function sendToWebhook(article, issueNumber, imageUrl) {
  const webhookUrl = process.env.MAKE_WEBHOOK_URL;

  if (!webhookUrl || webhookUrl === 'your_make_webhook_url_here' || webhookUrl.startsWith('your_')) {
    console.log('⚠️ MAKE_WEBHOOK_URL yapılandırılmamış veya varsayılan değerde. Webhook paylaşımı atlanıyor.');
    return false;
  }

  // State dosyasını güncelle
  const statePath = path.join(process.cwd(), 'state.json');
  try {
    let stateData = { lastIssueNumber: issueNumber, usedTopics: [], usedImages: [] };
    if (fs.existsSync(statePath)) {
      stateData = JSON.parse(fs.readFileSync(statePath, 'utf8'));
    }
    stateData.lastIssueNumber = issueNumber;
    if (article.title && !stateData.usedTopics.includes(article.title)) {
      stateData.usedTopics.push(article.title);
    }
    if (imageUrl && !stateData.usedImages.includes(imageUrl)) {
      stateData.usedImages.push(imageUrl);
    }

    fs.writeFileSync(statePath, JSON.stringify(stateData, null, 2), 'utf8');
    console.log(`🔢 SIO Sayı Numarası Güncellendi: SIO #${issueNumber}`);
  } catch (err) {
    console.error('⚠️ state.json kaydedilemedi:', err);
  }

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
      await sendDetailedErrorEmail({
        subject: 'LinkedIn Otomatik Paylaşımı Aksadı',
        articleTitle: article.title,
        cause: `Blog yazınız sitemizde canlıya alındı fakat Make.com Webhook'u HTTP ${response.status} hatası döndürdü.`,
        solution: '1. Make.com hesabınıza girin ve senaryonuzun "ON" (Açık) konumda olduğunu doğrulayın.\n2. Webhook modülünüzün aktifliğini kontrol edin.'
      });
      return false;
    }
  } catch (error) {
    console.error('❌ Webhook\'a veri gönderilirken hata oluştu:', error);
    await sendDetailedErrorEmail({
      subject: 'LinkedIn Otomatik Paylaşımı Aksadı',
      articleTitle: article.title,
      cause: `Make.com Webhook sunucusuna bağlanırken ağ hatası oluştu: ${error.message}`,
      solution: 'Make.com servis durumunu ve webhook URL adresinizi kontrol edin.'
    });
    return false;
  }
}
