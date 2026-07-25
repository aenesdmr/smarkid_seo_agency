import nodemailer from 'nodemailer';

/**
 * Aksaklık durumlarında kullanıcıya (demir@smartkid.agency) son derece açıklayıcı Türkçe bilgi maili gönderir.
 * @param {Object} opts
 * @param {string} opts.subject - E-posta konu başlığı
 * @param {string} [opts.articleTitle] - İlgili makale başlığı
 * @param {string} opts.cause - Hatanın/Aksaklığın nedeni
 * @param {string} opts.solution - Kullanıcının yapması gereken eylem
 * @param {string} [opts.details] - Teknik log detayı
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
