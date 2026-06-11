import { GoogleGenAI } from '@google/genai';
import { config } from './config.js';

// Gemini API istemcisini başlat
function getAIClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY' || apiKey.startsWith('your_')) {
    return null;
  }
  return new GoogleGenAI({ apiKey });
}

/**
 * Belirlenen konuda SEO ve GEO uyumlu makale üreten ana fonksiyon
 * @param {Object} topic - config.js dosyasından seçilen konu objesi
 * @returns {Promise<Object>} Makale detaylarını içeren obje
 */
export async function writeArticle(topic) {
  const ai = getAIClient();

  // API Anahtarı yoksa simüle et (Mock Modu)
  if (!ai) {
    console.log('\n======================================================');
    console.log('⚠️  BİLGİLENDİRME: Gemini API Anahtarı bulunamadı.');
    console.log('👉  Sistemi görmeniz için Yerel Simülasyon (Mock) Modu başlatıldı.');
    console.log('======================================================\n');
    return getMockArticle(topic);
  }

  console.log(`\n🤖 Yapay Zeka Ajanı çalışıyor...`);
  console.log(`📝 Konu araştırılıyor ve yazılıyor: "${topic.title}"`);
  console.log(`🌐 Google Search entegrasyonu ile en güncel bilgiler taranıyor...\n`);

  const prompt = `
Sen ${config.brandVoice.agencyName} Dijital Pazarlama Ajansı için çalışan uzman bir SEO ve GEO (Generative Engine Optimization) yazarı yapay zeka ajansın.
Şu konu hakkında mükemmel, akıcı ve tamamen Türkçe bir blog yazısı yazmanı istiyorum:
Konu: ${topic.title}
Odak Anahtar Kelimeler: ${topic.keywords.join(", ")}
Detay: ${topic.focus}

Yazıyı yazarken aşağıdaki kurallara kesinlikle uymalısın:

MARKA SES TONU:
- Ajans ismi: ${config.brandVoice.agencyName}
- Ses Tonu: ${config.brandVoice.tone}
- Stil: ${config.brandVoice.style}
- Hedef Kitle: ${config.brandVoice.targetAudience}

SEO KURALLARI:
- ${config.optimizationRules.seo.headingHierarchy}
- ${config.optimizationRules.seo.metaDescriptionLength}
- ${config.optimizationRules.seo.keywordDensity}

GEO (Generative Engine Optimization) KURALLARI (Yapay Zeka Arama Motorları İçin):
- Direct Answers: ${config.optimizationRules.geo.directAnswers}
- Structured Data: ${config.optimizationRules.geo.structuredData}
- Bullet Points: ${config.optimizationRules.geo.bulletPoints}
- Statistics: ${config.optimizationRules.geo.statistics}

KAPANIŞ VE İNSAN DOKUNUŞU (CTA):
- ${config.finalWordRule}

Lütfen en güncel sektörel trendleri ve verileri internette aratarak (Google Search aracını kullanarak) yazına yansıt. Yazının başlığı ve gövdesi tamamen özgün, ilgi çekici ve profesyonel olmalıdır.

`;

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // Modelleri sırayla deneme yardımcı fonksiyonu
  async function generateWithFallback(configOptions) {
    // Ücretli hesaba geçildiği için öncelikli olarak en kaliteli metinleri yazan Pro modelleri, ardından Flash modellerini deniyoruz
    const models = ['gemini-2.5-pro', 'gemini-pro-latest', 'gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-2.0-flash-lite', 'gemini-flash-latest'];
    let lastError = null;

    for (const model of models) {
      try {
        const response = await ai.models.generateContent({
          model: model,
          contents: configOptions.contents,
          config: configOptions.config
        });
        return response;
      } catch (err) {
        // Eğer 429 (Kota/Hız Sınırı) hatası ise 10 saniye bekle ve tekrar dene
        if (err.status === 429 || err.message?.includes('429') || err.message?.includes('quota') || err.message?.includes('Quota') || err.message?.includes('limit')) {
          console.log(`⚠️  ${model} modelinde kota/hız limitine takılındı. 10 saniye bekleniyor ve tekrar deneniyor...`);
          await sleep(10000);
          try {
            const response = await ai.models.generateContent({
              model: model,
              contents: configOptions.contents,
              config: configOptions.config
            });
            return response;
          } catch (retryErr) {
            console.log(`⚠️  Yeniden deneme başarısız. Bir sonraki modele geçiliyor...`);
            lastError = retryErr;
            await sleep(2000); // Diğer modele geçmeden önce API'yi dinlendir
            continue;
          }
        }
        // Eğer 503 (yoğunluk/kapasite) hatası ise 2 saniye bekle ve diğer modeli dene
        if (err.status === 503 || err.message?.includes('503') || err.message?.includes('demand')) {
          console.log(`⚠️  ${model} yoğunlukta. 2 saniye beklenip bir sonraki modele geçiliyor...`);
          await sleep(2000);
          lastError = err;
          continue;
        }
        throw err; // Diğer kritik hataları doğrudan fırlat
      }
    }
    throw lastError;
  }

  try {
    console.log(`🤖 1. Aşama: Makale yazılıyor...`);
    let writeResponse;
    const useSearch = process.env.USE_GOOGLE_SEARCH === 'true';

    if (useSearch) {
      console.log(`🌐 Google Search entegrasyonu aktif, arama yapılıyor...`);
      try {
        writeResponse = await generateWithFallback({
          contents: prompt,
          config: {
            // Yapay zeka arama grounding'ini etkinleştir (Up-to-date veri için)
            tools: [{ googleSearch: {} }]
          }
        });
      } catch (err) {
        console.log('\n⚠️  Google Search araması sırasında hata oluştu veya kota yetersiz.');
        console.log('💡 Google Search özelliği devre dışı bırakılarak makale yazımına devam ediliyor...\n');
        writeResponse = await generateWithFallback({
          contents: prompt,
          config: {} // normal üretim
        });
      }
    } else {
      console.log(`💡 Google Search özelliği devre dışı (Ücretsiz API key dostu mod).`);
      writeResponse = await generateWithFallback({
        contents: prompt,
        config: {} // normal üretim
      });
    }

    const rawMarkdown = writeResponse.text;
    
    // API hız limitine takılmamak için iki aşama arasına kısa bir bekleme ekleyelim
    console.log(`⏳ Hız limiti koruması için 3 saniye bekleniyor...`);
    await sleep(3000);
    
    console.log(`🤖 2. Aşama: Yazılan makale SEO & GEO kurallarına göre yapılandırılıyor...`);

    const formatPrompt = `
Aşağıda verilen blog yazısını analiz et ve belirtilen JSON şemasına uygun olarak yapılandır.

Makale İçeriği:
${rawMarkdown}

Lütfen içeriği tam olarak koru. Markdown formatındaki makale gövdesini "content" alanına yerleştir.
ÖNEMLİ:
- "content" alanı içinde kesinlikle H1 ('#') başlık kullanma.
- Makalenin başlığını gövdenin en üstüne '# Başlık' şeklinde ekleme. Doğrudan giriş metniyle başla.
- Gövde içindeki tüm ana başlıklar H2 ('##'), alt başlıklar H3 ('###') olmalıdır.
- Makale için uygun bir başlık, URL slug'ı, meta açıklaması ve kapak görseli promptu oluştur.
`;

    const formatResponse = await generateWithFallback({
      contents: formatPrompt,
      config: {
        // JSON formatında çıktı vermesini zorunlu kıl
        responseMimeType: 'application/json',
        responseSchema: {
          type: 'object',
          properties: {
            title: { type: 'string', description: 'Makalenin SEO uyumlu ana başlığı' },
            slug: { type: 'string', description: 'URL için SEO uyumlu slug (Örn: roas-artirma-yontemleri)' },
            metaDescription: { type: 'string', description: 'Arama motorları için 160 karakteri geçmeyen özet açıklama' },
            coverImagePrompt: { type: 'string', description: 'Bu makale için kapak resmi oluşturabilecek detaylı İngilizce görsel üretme promptu' },
            content: { type: 'string', description: 'Markdown formatında makale gövdesi. Kesinlikle H1 (#) başlığı içermemeli, ana başlıklar H2 (##), alt başlıklar H3 (###) olmalıdır. Makalenin ana başlığı en üstte bulunmamalıdır.' }
          },
          required: ['title', 'slug', 'metaDescription', 'coverImagePrompt', 'content']
        }
      }
    });

    const articleData = JSON.parse(formatResponse.text);

    // Programatik olarak H1 (#) başlıkları temizleme/dönüştürme garantisi
    if (articleData.content) {
      let content = articleData.content.trim();
      // 1. Eğer en üstte bir H1 başlık varsa temizle (çünkü Framer bunu zaten başlık olarak ekliyor)
      content = content.replace(/^#\s+.+$/m, '');
      // 2. Kalan H1 başlıkları H2'ye dönüştür
      content = content.replace(/^#\s+(.+)$/gm, '## $1');
      articleData.content = content.trim();
    }

    return articleData;
  } catch (error) {
    console.error('❌ Yapay Zeka Ajanı makale yazarken bir hata ile karşılaştı:', error);
    throw error;
  }
}

/**
 * API anahtarı olmadan yerel test için simüle edilmiş makale döndürür.
 */
function getMockArticle(topic) {
  // Basit bir slug jeneratörü
  const slugify = (text) => text.toString().toLowerCase().trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');

  return {
    title: topic.title,
    slug: slugify(topic.title.replace('ğ','g').replace('ü','u').replace('ş','s').replace('ı','i').replace('ö','o').replace('ç','c')),
    metaDescription: `${topic.title} konusunu ele aldığımız bu rehberde, dijital büyümenizi katlayacak en güncel stratejileri ve SEO/GEO taktiklerini bulabilirsiniz.`,
    coverImagePrompt: `A premium, ultra-modern 3D render showing digital marketing success, growth charts, neon lighting, clean tech aesthetics, representing ${topic.title}`,
    content: `# ${topic.title}

Günümüz dijital pazarlama ekosisteminde, geleneksel SEO stratejileri yerini yavaş yavaş yapay zeka arama motorlarının tarama dinamiklerine göre şekillenen yeni nesil optimizasyon yöntemlerine bırakıyor. Bu yazımızda, **Smartkid** olarak reklam maliyetlerinizi düşürürken organik görünürlüğünüzü artıracak kritik yöntemleri ele alıyoruz.

## GEO ve Yeni Nesil Dijital Pazarlama Nedir?
GEO (Generative Engine Optimization), yapay zeka tabanlı arama asistanlarının (Perplexity, Gemini Search, ChatGPT Search vb.) sorulara yanıt verirken sizin web sitenizi kaynak göstermesini sağlama sanatıdır. Geleneksel SEO arama sonuç listelerini hedeflerken, GEO doğrudan yapay zekanın yanıt cümlelerinde referans olmayı hedefler.

### Neden Önemlidir?
* **Otorite Artışı:** Yapay zeka asistanları tarafından referans gösterilen markalar, kullanıcı gözünde %70 daha güvenilir kabul edilir.
* **Yüksek Dönüşüm Oranı:** Bu asistanları kullanan kitleler genellikle satın alma kararını vermiş, araştırmacı ve nitelikli kitlelerdir.
* **Maliyet Tasarrufu:** Reklamlara (CPC) para harcamadan yüksek dönüşümlü trafik çekmenizi sağlar.

## Başarıyı Getiren Strateji Karşılaştırması

Aşağıdaki tabloda, geleneksel yaklaşımlarla Smartkid'in veri odaklı yaklaşımlarının performans farklarını görebilirsiniz:

| Kriter / Strateji | Geleneksel Yaklaşım | Smartkid GEO ve Performans Stratejisi |
| :--- | :--- | :--- |
| **Odak Noktası** | Yalnızca anahtar kelime doldurma | Kullanıcı niyetini anlama ve doğrudan cevap sunma |
| **İçerik Yapısı** | Uzun ve dolambaçlı metinler | Yapılandırılmış tablolar, listeler ve net veriler |
| **Sonuç (ROAS)** | Ortalama 2.0 - 3.0 ROAS | 8.0 ROAS ve üzeri ölçeklenebilir büyüme |
| **Referans Kaynağı**| Sadece Google SERP | Yapay zeka asistanlarında kaynak gösterilme |

## Performansı Artırmak İçin 4 Kritik Adım

Yapay zeka motorlarının ve Google'ın sitenizi üst sıralara taşıması için şu adımları izlemelisiniz:

1. **Doğrudan Yanıtlar Sunun:** Metinlerinizde mutlaka "... Nedir?" ve "... Nasıl Yapılır?" başlıkları açıp altındaki ilk paragrafta 2-3 cümlelik net tanımlar yapın.
2. **Kullanıcı Deneyimini (UX) Güçlendirin:** Hızlı yüklenen, mobil uyumlu ve sade tasarıma sahip altyapılar (ikas veya Shopify gibi) arama botları tarafından ödüllendirilir.
3. **Sosyal Kanıt ve UGC Kullanın:** Kullanıcıların ürettiği içerikler (User Generated Content) sitenizin taranma sıklığını ve güvenilirlik skorunu artırır.
4. **Veri ve İstatistik Paylaşın:** Yapay zeka sayısal verileri çok sever. İddialarınızı her zaman verilerle destekleyin (Örn: 'Müşteri adayı maliyetini %50 düşürmek için...').

## Sonuç
Organik büyüme ve performans pazarlaması bir bütünün iki yarısıdır. Sitenizin otoritesini artırmak ve yapay zeka çağında öne geçmek istiyorsanız, dijital varlıklarınızı bu kurallara göre optimize etmelisiniz. Smartkid olarak, markanızın dijital dünyada bir simgeye dönüşmesi için yanınızdayız.
`
  };
}
