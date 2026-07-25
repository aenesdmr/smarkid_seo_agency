import 'dotenv/config';
import { GoogleGenAI } from '@google/genai';
import { sendWeeklyAuditEmail } from './emailer.js';
import fs from 'fs';
import path from 'path';

async function runWeeklyAudit() {
  console.log('🌟 ==================================================');
  console.log('📊 Smartkid.agency Haftalık Otonom Feedback Toplantısı');
  console.log('================================================== 🌟\n');

  const backupDir = path.join(process.cwd(), 'published_articles');
  const files = fs.readdirSync(backupDir).filter(f => f.endsWith('.md'));

  const articles = [];

  for (const file of files) {
    const content = fs.readFileSync(path.join(backupDir, file), 'utf8');
    const titleMatch = content.match(/^title:\s*"(.*?)"/m) || content.match(/^#\s+(.*)/m);
    const issueMatch = content.match(/^issueNumber:\s*(\d+)/m);
    const dateMatch = content.match(/^date:\s*"(.*?)"/m);

    if (titleMatch && titleMatch[1]) {
      articles.push({
        title: titleMatch[1].trim(),
        issueNumber: issueMatch ? parseInt(issueMatch[1], 10) : null,
        date: dateMatch ? dateMatch[1] : 'Bilinmiyor',
        snippet: content.substring(0, 400)
      });
    }
  }

  console.log(`📑 Toplam ${articles.length} adet yayınlanmış makale inceleniyor...`);

  // Son 7 makaleyi haftalık rapora al
  const recentArticles = articles.slice(-7);

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('❌ GEMINI_API_KEY bulunamadı.');
    return;
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
Sen Smartkid.agency için çalışan Kıdemli İçerik ve Dijital Pazarlama Stratejistisin.
Son 1 hafta boyunca sitede ve LinkedIn'de yayınlanan makaleleri inceleyip kendi kendine **Haftalık Strateji ve Kalite Değerlendirmesi** yapıyorsun.

YAYINLANAN SON MAKALELER:
${JSON.stringify(recentArticles, null, 2)}

GÖREVİN:
1. Son yayınlanan içeriklerin konu dengesini (B2B, SaaS, Meta Ads, GEO, SEO, E-Ticaret) ve ajans otoritesine katkısını özetle.
2. Gelecek hafta içeriğimizi ve dönüşümlerimizi daha da mükemmelleştirmek için ajans sahibine (Demir Bey'e) sunulacak **3 ila 4 adet somut, eyleme dönüştürülebilir öneri** oluştur.

ÇIKTI FORMATI (Yalnızca geçerli JSON döndür, açıklama yazma):
{
  "summary": "Son 1 haftadaki yayınlarımızın içerik kalitesi ve konu dengesi hakkında genel stratejik değerlendirme paragrafı.",
  "recommendations": [
    {
      "title": "Öneri Başlığı",
      "reason": "Bu önerinin neden gerekli olduğu, hangi eksiği kapattığı.",
      "action": "Koda veya ajanın çalışma kurallarına eklenmesi önerilen somut adım."
    }
  ]
}
`;

  const models = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-2.5-pro', 'gemini-pro-latest', 'gemini-2.0-flash-lite'];

  for (const model of models) {
    try {
      console.log(`🤖 Yapay zeka (${model}) haftalık içerik analizi ve önerileri oluşturuyor...`);
      const response = await ai.models.generateContent({
        model: model,
        contents: prompt,
        config: {
          responseMimeType: 'application/json'
        }
      });

      const auditResult = JSON.parse(response.text.trim());

      console.log('\n📊 HAFTALIK FEEDBACK RAPORU HAZIRLANDI:');
      console.log('--------------------------------------------------');
      console.log('📝 Özet:', auditResult.summary);
      console.log('💡 Öneri Sayısı:', auditResult.recommendations.length);

      // E-posta gönder
      await sendWeeklyAuditEmail({
        summary: auditResult.summary,
        recommendations: auditResult.recommendations,
        recentArticles: recentArticles
      });

      console.log('\n✨ Haftalık otonom feedback toplantısı başarıyla tamamlandı!');
      break;
    } catch (error) {
      if (error.status === 429 || error.message?.includes('quota') || error.message?.includes('429')) {
        console.log(`⚠️ ${model} hız limitinde. 10 saniye bekleniyor...`);
        await new Promise(r => setTimeout(r, 10000));
        continue;
      }
      console.error('❌ Hata oluştu:', error.message);
      break;
    }
  }
}

runWeeklyAudit().catch(console.error);
