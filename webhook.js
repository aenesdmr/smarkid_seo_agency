/**
 * Yeni makale detaylarını no-code otomasyon (Make.com) webhook'una gönderir.
 * @param {Object} article - Makale objesi
 * @returns {Promise<boolean>} İşlem başarısı
 */
export async function sendToWebhook(article, totalItems) {
  const webhookUrl = process.env.MAKE_WEBHOOK_URL;

  if (!webhookUrl || webhookUrl === 'your_make_webhook_url_here' || webhookUrl.startsWith('your_')) {
    console.log('⚠️ MAKE_WEBHOOK_URL yapılandırılmamış veya varsayılan değerde. Webhook paylaşımı atlanıyor.');
    return false;
  }

  // Eğer veritabanında (CMS'te) 35 post varsa (yeni eklenen dahil), bunu 71. sayı yapmak için +36 ekliyoruz.
  const issueNumber = (totalItems || 35) + 36;
  const linkedinText = `SIO #${issueNumber} yayında! Ekibimiz sizin için yazdı:\n\n"${article.title}"\n\n📌 ${article.metaDescription}\n\nOkumak için: https://www.smartkid.agency/blog/${article.slug}`;

  const payload = {
    title: article.title,
    slug: article.slug,
    metaDescription: article.metaDescription,
    url: `https://www.smartkid.agency/blog/${article.slug}`,
    issueNumber: issueNumber,
    linkedinText: linkedinText,
    publishedAt: new Date().toISOString()
  };

  console.log(`\n📤 Make.com Webhook tetikleniyor: ${webhookUrl}...`);

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
