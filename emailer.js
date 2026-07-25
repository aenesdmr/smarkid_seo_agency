import nodemailer from 'nodemailer';

/**
 * Aksaklık durumlarında kullanıcıya (demir@smartkid.agency) son derece açıklayıcı Türkçe bilgi maili gönderir.
 */
export async function sendDetailedErrorEmail({ subject, articleTitle, cause, solution, details }) {
  const mailUsername = process.env.MAIL_USERNAME;
  const mailPassword = process.env.MAIL_PASSWORD;
  const recipient = 'demir@smartkid.agency';

  if (!mailUsername || !mailPassword) {
    console.log('⚠️ MAIL_USERNAME veya MAIL_PASSWORD tanımlanmamış. Bilgilendirme maili atlandı.');
    return false;
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: mailUsername,
      pass: mailPassword,
    },
  });

  const emailBody = `
Merhaba Demir,

Smartkid SEO & GEO Otomatik Blog Ajanı çalışırken dikkat edilmesi gereken bir durum tespit edildi.

${articleTitle ? `📌 **İlgili Makale:** "${articleTitle}"\n` : ''}
----------------------------------------------------------------------
❓ **NEDEN OLDU / SORUN NE?**
${cause}

----------------------------------------------------------------------
👉 **SENİN NE YAPMAN LAZIM? (ÇÖZÜM)**
${solution}

----------------------------------------------------------------------
${details ? `🛠️ **Teknik Detaylar:**\n${details}\n` : ''}

Saygılarımızla,
Smartkid SEO Agent Bildirim Sistemi
  `.trim();

  try {
    console.log(`\n📧 Açıklayıcı Türkçe bilgilendirme e-postası gönderiliyor: ${recipient}...`);
    await transporter.sendMail({
      from: `"Smartkid SEO Agent" <${mailUsername}>`,
      to: recipient,
      subject: `⚠️ Smartkid SEO Ajanı: ${subject}`,
      text: emailBody,
    });
    console.log('✅ Bilgilendirme e-postası başarıyla gönderildi!');
    return true;
  } catch (error) {
    console.error('❌ E-posta gönderilirken hata oluştu:', error.message);
    return false;
  }
}

/**
 * Haftalık Öz-Değerlendirme ve Strateji Öneri Raporunu E-Posta ile Gönderir.
 * @param {Object} opts
 * @param {string} opts.summary - Hafta özeti
 * @param {Array} opts.recommendations - Öneriler dizisi
 * @param {Array} opts.recentArticles - Bu hafta yayınlanan makaleler
 */
export async function sendWeeklyAuditEmail({ summary, recommendations, recentArticles }) {
  const mailUsername = process.env.MAIL_USERNAME;
  const mailPassword = process.env.MAIL_PASSWORD;
  const recipient = 'demir@smartkid.agency';

  if (!mailUsername || !mailPassword) {
    console.log('⚠️ MAIL_USERNAME veya MAIL_PASSWORD tanımlanmamış. Haftalık rapor maili atlandı.');
    return false;
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: mailUsername,
      pass: mailPassword,
    },
  });

  const recsFormatted = recommendations.map((rec, index) => `
📌 **Öneri #${index + 1}: ${rec.title}**
• **Gerekçe:** ${rec.reason}
• **Önerilen Eylem:** ${rec.action}
`).join('\n');

  const articlesFormatted = recentArticles.map(a => `• "${a.title}" (SIO #${a.issueNumber || '?'})`).join('\n');

  const emailBody = `
Merhaba Demir,

Ben Smartkid SEO & GEO Yapay Zeka Ajanınız. Geçtiğimiz hafta sitemizde ve LinkedIn'de yayınlanan tüm blog içeriklerini analiz ederek kendi kendime bir **Haftalık Değerlendirme & Feedback Toplantısı** gerçekleştirdim.

📊 **BU HAFTA YAYINLANAN İÇERİKLER (${recentArticles.length} Adet):**
${articlesFormatted}

----------------------------------------------------------------------
📝 **HAFTALIK PERFORMANS VE İÇERİK DEĞERLENDİRMESİ:**
${summary}

----------------------------------------------------------------------
💡 **GÖZDEN GEÇİRİLMESİ VE DEĞİŞTİRİLMESİ ÖNERİLEN STRATEJİLER:**
${recsFormatted}

----------------------------------------------------------------------
👉 **SENİN NE YAPMAN LAZIM?**
Bu önerileri inceleyip sohbet alanına gelerek *"Öneri #1 ve #3'ü onaylıyorum"* veya *"Tümünü onaylıyorum"* demeniz yeterlidir. Onay verdiğiniz öneriler anında ajanın çalışma kurallarına işlenecektir.

Saygılarımızla,
Smartkid SEO & GEO Ajanı - Haftalık Strateji Raporu
  `.trim();

  try {
    console.log(`\n📧 Haftalık Strateji ve Feedback Raporu gönderiliyor: ${recipient}...`);
    await transporter.sendMail({
      from: `"Smartkid SEO Agent" <${mailUsername}>`,
      to: recipient,
      subject: `📊 Smartkid Ajanı: Haftalık İçerik Feedback & Öneri Raporu`,
      text: emailBody,
    });
    console.log('✅ Haftalık rapor e-postası başarıyla gönderildi!');
    return true;
  } catch (error) {
    console.error('❌ Haftalık rapor e-postası gönderilirken hata oluştu:', error.message);
    return false;
  }
}
