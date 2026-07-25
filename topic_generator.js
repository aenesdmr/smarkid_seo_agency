import { GoogleGenAI } from '@google/genai';

/**
 * Daha önce işlenmiş konuları inceleyerek tamamen YENİ ve TEKRARSIZ bir blog konusu üretir.
 * @param {string[]} usedTopics - Daha önce yazılmış konu başlıkları
 * @returns {Promise<{ title: string, keywords: string[] }>} Yepyeni konu başlığı ve anahtar kelimeler
 */
export async function generateFreshTopic(usedTopics = []) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY bulunamadı.');
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
Sen Smartkid.agency (B2B dijital pazarlama, SEO, GEO, Meta Ads ve SaaS büyüme ajansı) için baş içerik stratejistisin.

Aşağıda ajans sitemizde DAHA ÖNCE YAYINLANMIŞ konu başlıklarının listesi yer almaktadır:
${JSON.stringify(usedTopics, null, 2)}

GÖREVİN:
Yukarıdaki listede yer alan konuları veya birebir benzerlerini ASLA TEKRAR ETMEYECEK, dijital pazarlama, GEO (Generative Engine Optimization), Google Ads, SaaS B2B outbound, e-ticaret dönüşüm optimizasyonu veya içerik pazarlaması alanında **yepyeni, taze ve yüksek ilgi uyandıracak 1 adet orijinal blog konusu ve odak kelimeleri** üret.

ÇIKTI FORMATI (Yalnızca geçerli JSON döndür, başka hiçbir açıklama yazma):
{
  "title": "Üretilen Yepyeni Özgün Başlık",
  "keywords": ["anahtar1", "anahtar2", "anahtar3", "anahtar4"]
}
`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      responseMimeType: 'application/json'
    }
  });

  const rawText = response.text.trim();
  const data = JSON.parse(rawText);
  console.log(`💡 Yapay Zeka Tarafından Yepyeni Taze Konu Üretildi: "${data.title}"`);
  return data;
}
