/**
 * Smartkid SEO & GEO Ajanı - Konfigürasyon Dosyası
 * 
 * Bu dosya ajanın hangi konuları yazacağını, hangi SEO/GEO kurallarına
 * uyacağını ve marka ses tonunu nasıl belirleyeceğini kontrol eder.
 */

export const config = {
  // Ajanın yazı yazarken kullanacağı marka kimliği ve dil rehberi
  brandVoice: {
    agencyName: "Smartkid",
    tone: "Profesyonel, veri odaklı, modern, sonuç odaklı ve vizyoner.",
    style: "Akıcı, jargonlardan uzak ama teknik doğruluğa sahip, vaka analizleri (case studies) ile desteklenen, okuyucuya doğrudan değer katan bir dil.",
    language: "Türkçe",
    targetAudience: "E-ticaret sahipleri, CMO'lar, B2B şirket yöneticileri, girişimciler ve dijital pazarlama profesyonelleri."
  },

  // GEO (Üretken Arama Motoru Optimizasyonu) ve SEO kuralları
  optimizationRules: {
    seo: {
      headingHierarchy: "Makale gövdesi (content) içinde kesinlikle H1 (#) başlığı kullanma. Makale başlığı zaten sayfa şablonunda otomatik oluştuğu için, içerik doğrudan H2 (##) başlıklar ile başlamalıdır. Konular H2 (##) ve H3 (###) olarak hiyerarşik bölünmelidir.",
      metaDescriptionLength: "En fazla 160 karakterlik dikkat çekici bir meta açıklama üretilmeli.",
      keywordDensity: "Hedef kelimeler başlıkta, ilk paragrafta ve içeriğin geneline doğal bir şekilde dağıtılmalı (%1-2 oranında)."
    },
    geo: {
      directAnswers: "Makalenin başında veya ilgili alt başlıklarda '... Nedir?', '... Nasıl Yapılır?' gibi yapay zeka arama asistanlarının doğrudan alıntılayabileceği net tanımlar bulunmalı.",
      structuredData: "Yazı içerisinde karşılaştırmaları, verileri veya önemli kriterleri sunarken mutlaka şık markdown tabloları (| sütun |) kullan. Framer zengin metin düzenleyicisi markdown tablolarını destekler ve bunlar okuyucuya harika bir görsel hiyerarşi sunar.",
      bulletPoints: "Okunabilirliği ve yapay zeka tarafından taranabilirliği artırmak için bolca madde işareti (bullet points) kullanılmalı.",
      statistics: "Veri odaklılığı vurgulamak için sektörel istatistikler ve yüzdeler içermeli (Örn: 'ROAS değerini %80 artırmak için...')."
    }
  },

  // Her makalenin sonuna eklenecek insan dokunuşu / CTA bölümü
  finalWordRule: "Her makalenin sonuna mutlaka '## Smartkid\'in Son Sözü' başlığı eklenmelidir. Bu bölüm, jenerik AI dili yerine tamamen samimi, uzman, bir reklam ajansı danışmanının sesinden (doğal insan tonunda) yazılmalı ve e-ticaret/reklam yöneticilerine pratik, uygulanabilir bir stratejik tavsiye vermelidir. Bölümün sonu, okuyucuyu smartkid.agency/services sayfasına gitmeye veya bizimle iletişime geçmeye davet eden doğal bir Call-To-Action (CTA) ile bitmelidir.",

  // Ajanın döngüsel olarak veya rastgele seçip yazacağı konu başlıkları ve odak kelimeleri (60 Günlük Havuz)
  topics: [
    // --- Meta Ads & E-Commerce Scaling ---
    {
      title: "Meta Reklamlarında CBO ve ABO Seçimi: Hangisi Ne Zaman Kullanılmalı?",
      keywords: ["Meta Ads CBO ABO", "kampanya bütçe optimizasyonu", "reklam seti bütçesi", "Meta reklam bütçesi"],
      focus: "CBO (Campaign Budget Optimization) ve ABO (Ad Set Budget Optimization) bütçe modellerinin karşılaştırılması, bütçe ölçekleme aşamasında hangi modelin neye göre seçileceği."
    },
    {
      title: "Meta Pixel ve Conversions API Entegrasyonu Neden Kritik? iOS Sonrası Dönüşüm Takibi",
      keywords: ["Conversions API nedir", "Meta Pixel kurulumu", "iOS reklam takibi", "reklam dönüşüm takibi"],
      focus: "Conversions API (CAPI) entegrasyonunun reklam verilerinin doğruluğu ve piksel optimizasyonu üzerindeki kritik etkisi."
    },
    {
      title: "Meta Reklamlarında Lookalike (Benzer) Hedef Kitle Nasıl Oluşturulur ve Ölçeklenir?",
      keywords: ["lookalike kitle", "benzer hedef kitle", "Meta kitle segmentasyonu", "reklam hedefleme"],
      focus: "Müşteri listeleri, site trafiği ve Instagram etkileşimleri üzerinden yüksek dönüşüm getiren lookalike kitleler oluşturma stratejisi."
    },
    {
      title: "Reklam Kreatiflerinde 3 Saniyelik Kanca (Hook) Kuralı: İzlenme Sürelerini Katlama Yolları",
      keywords: ["video kanca kuralı", "kreatif optimizasyonu", "Meta video reklamları", "UGC video reklam"],
      focus: "Sosyal medyada kullanıcıların dikkatini ilk 3 saniyede çekerek reklam tıklama oranlarını (CTR) artıracak görsel ve metinsel kanca stratejileri."
    },
    {
      title: "Meta Reklamlarında Kreatif Yorgunluğu (Ad Fatigue) Nasıl Önlenir?",
      keywords: ["kreatif yorgunluğu", "ad fatigue", "Meta kreatif testi", "reklam sıklığı"],
      focus: "Frekans değerini kontrol altında tutarak reklam kreatiflerinin yorulmasını önleme ve dinamik kreatif testleri yapma taktikleri."
    },
    {
      title: "Meta Reklamlarında Advantage+ Alışveriş Kampanyaları (ASC) Ne Kadar Etkili?",
      keywords: ["Advantage+ alışveriş", "ASC kampanyaları", "Meta yapay zeka reklam", "e-ticaret kampanya kurulumu"],
      focus: "Meta'nın yapay zeka tabanlı Advantage+ alışveriş kampanyalarının kurulumu, avantajları ve geleneksel kampanyalarla karşılaştırması."
    },
    {
      title: "Meta Reklamlarında Özel Hedef Kitle (Custom Audiences) ile Yeniden Hedefleme (Retargeting) Funnel'ı",
      keywords: ["yeniden hedefleme", "custom audiences", "reklam hunisi", "retargeting stratejileri"],
      focus: "Sepete ekleyip satın almayanlar, video izleyenler ve site ziyaretçileri için 3 aşamalı sıcak kitle funnel tasarımı."
    },
    {
      title: "E-Ticarette ROAS Artırmanın Yolu: A/B Kreatif Testleri Nasıl Kurgulanmalı?",
      keywords: ["A/B testi", "kreatif testi", "ROAS artırma", "reklam optimizasyonu"],
      focus: "Metin, görsel, kanca ve CTA düğmelerini test ederek en iyi dönüşüm getiren kreatif kombinasyonlarını bulma metodolojisi."
    },
    {
      title: "Meta Reklamlarında İlgi Alanı Hedeflemesi mi yoksa Geniş (Broad) Hedefleme mi?",
      keywords: ["broad hedefleme", "ilgi alanı hedefleme", "Meta reklam kitle", "geniş hedefleme"],
      focus: "Meta algoritmasının gelişmesiyle birlikte geniş (broad) hedeflemenin ilgi alanlarına göre ne zaman daha başarılı sonuçlar verdiği."
    },
    {
      title: "Instagram Story ve Reels Reklamları İçin Dönüşüm Odaklı Tasarım Rehberi",
      keywords: ["Reels reklam tasarımı", "Instagram reklam optimizasyonu", "mobil dikey kreatifler", "Instagram Reels Ads"],
      focus: "Mobil kullanıcıların tıklama alışkanlıklarına uygun, dikey formatta yüksek dönüşüm sağlayan Story ve Reels reklam kreatiflerinin tasarımı."
    },

    // --- Google Ads & PMax ---
    {
      title: "Google Performance Max (PMax) Kampanyalarında Başarıyı Getiren Yapılandırma Kuralları",
      keywords: ["Performance Max", "PMax optimizasyonu", "Google Ads alışveriş", "akıllı alışveriş"],
      focus: "PMax kampanyalarında sinyal kitleleri, negatif anahtar kelimeler ve asset gruplarının doğru yapılandırılması ile reklam verimliliğini artırma."
    },
    {
      title: "Google Arama Ağı Reklamlarında Kalite Puanı (Quality Score) Nasıl Yükseltilir?",
      keywords: ["kalite puanı artırma", "Google Ads kalite puanı", "tıklama başı maliyet", "reklam alaka düzeyi"],
      focus: "Tıklama başı maliyetleri (CPC) düşürmek için reklam alaka düzeyi, beklenen tıklama oranı ve açılış sayfası deneyimi optimizasyonu."
    },
    {
      title: "Google Ads Negatif Anahtar Kelime Listeleriyle Boşa Harcanan Bütçeyi Sıfırlama",
      keywords: ["negatif anahtar kelime", "Google Ads bütçe optimizasyonu", "arama terimleri raporu", "reklam bütçesi"],
      focus: "Arama terimleri raporunu analiz ederek dönüşüm getirmeyen kelimeleri ayıklama ve negatif anahtar kelime listeleri oluşturma rehberi."
    },
    {
      title: "Google Ads Akıllı Teklif (Smart Bidding) Stratejileri: Hedef ROAS ve Hedef EBM Seçimi",
      keywords: ["akıllı teklif stratejileri", "hedef ROAS", "hedef EBM", "Google Ads teklif yönetimi"],
      focus: "Yapay zeka tabanlı akıllı teklif modellerinin ne zaman ve hangi kampanya bütçelerinde devreye alınması gerektiği."
    },
    {
      title: "B2B Markaları İçin Google Ads Arama Ağı Reklamlarında Lead Kalitesini Artırma",
      keywords: ["B2B Google Ads", "nitelikli lead edinme", "müşteri adayı kalitesi", "form dönüşüm oranı"],
      focus: "Bireysel tüketiciler yerine şirket karar alıcılarını hedefleyen kelime seçimi ve form filtreleme teknikleri."
    },
    {
      title: "Google Yerel Arama Ağı Reklamları ile Haritalar Üzerinden Fiziksel Mağazaya Müşteri Çekme",
      keywords: ["yerel arama ağı", "Google harita reklamları", "mağaza trafiği", "lokal pazarlama"],
      focus: "Fiziksel şubeleri olan markalar için Google Haritalar ve yerel arama reklamları ile mağaza trafiğini artırma yolları."
    },
    {
      title: "Google Görüntülü Reklam Ağı (GDN) ile Marka Bilinirliğini ve Yeniden Hedeflemeyi Güçlendirme",
      keywords: ["Google görüntülü reklam", "GDN banner", "görüntülü reklam ağı", "banner optimizasyonu"],
      focus: "Düşük maliyetlerle büyük kitlelere ulaşma ve sitenizi ziyaret eden kullanıcıları banner reklamları ile takip etme stratejileri."
    },
    {
      title: "YouTube Video Reklamları (TrueView) ile E-Ticaret Satışlarını Tetikleme",
      keywords: ["YouTube reklamları", "TrueView for Action", "video reklam dönüşüm", "YouTube e-ticaret"],
      focus: "Dönüşüm odaklı YouTube video kampanyaları kurgulama, bütçe yönetimi ve kreatif kanca stratejileri."
    },
    {
      title: "Google Ads Yeniden Pazarlama (Remarketing) Etiketi ve Dinamik Remarketing Kurulumu",
      keywords: ["dinamik remarketing", "Google Ads remarketing", "dinamik yeniden pazarlama", "Google etiketi"],
      focus: "Ziyaretçilere sitede inceledikleri spesifik ürünleri Google görüntülü ağında tekrar göstererek satışa dönüştürme."
    },
    {
      title: "Google Alışveriş Reklamlarında (Google Shopping) Merchant Center Feed Optimizasyonu",
      keywords: ["Merchant Center feed", "alışveriş reklamları optimizasyonu", "ürün başlığı seo", "ürün feedi"],
      focus: "Ürün başlıkları, açıklamaları ve kategorilerini optimize ederek Google Alışveriş sonuçlarında daha fazla görünürlük elde etme."
    },

    // --- E-Commerce Conversion Rate Optimization (CRO) & Platforms ---
    {
      title: "E-Ticarette Sepet Terk Etme Oranlarını (Cart Abandonment) Düşürmenin 5 Yolu",
      keywords: ["sepet terk etme", "cart abandonment", "ödeme sayfası optimizasyonu", "dönüşüm oranı artırma"],
      focus: "Kullanıcıların ödeme adımında sepeti bırakma nedenleri (gizli kargo ücreti, zorunlu üyelik vb.) ve bunlara yönelik pratik çözümler."
    },
    {
      title: "ikas ve Shopify Altyapılarında Hız Optimizasyonu ve Core Web Vitals Skoru",
      keywords: ["Shopify hız artırma", "ikas site hızı", "Core Web Vitals", "sayfa yüklenme süresi"],
      focus: "LCP, FID ve CLS değerlerini iyileştirerek e-ticaret dönüşüm oranlarını ve Google sıralamalarını yukarı taşıma."
    },
    {
      title: "ikas E-Ticaret Altyapısının SEO ve Hız Avantajları: Neden Tercih Edilmeli?",
      keywords: ["ikas e-ticaret", "ikas SEO", "ikas altyapısı", "yerli e-ticaret altyapısı"],
      focus: "ikas altyapısının yerleşik hız optimizasyonları ve SEO dostu yapısıyla reklam maliyetlerini düşürme potansiyeli."
    },
    {
      title: "Shopify Uygulama Çöplüğünden Kurtulun: Siteyi Yavaşlatmadan Dönüşüm Artırma",
      keywords: ["Shopify uygulamaları", "site hızı optimizasyonu", "Shopify SEO", "dönüşüm oranı"],
      focus: "Gereksiz eklentilerin temizlenmesi ve dönüşüm oranını artıran özellikleri kodla veya hafif eklentilerle çözme."
    },
    {
      title: "Lüks ve Premium Markaların E-Ticaret Sitelerinde Mobil UX ve Tasarım Standartları",
      keywords: ["mobil UX", "lüks marka e-ticaret", "premium tasarım", "kullanıcı deneyimi"],
      focus: "Premium hissi veren minimalist mobil tasarımlar, büyük görseller ve akıcı bir satın alma deneyimi tasarımı."
    },
    {
      title: "E-Ticarette Ürün Detay Sayfası (PDP) Optimizasyonu ile Satışları Artırma",
      keywords: ["ürün sayfası tasarımı", "PDP optimizasyonu", "sosyal kanıt", "dönüşüm odaklı tasarım"],
      focus: "Yüksek kaliteli ürün fotoğrafları, ikna edici açıklamalar, kullanıcı yorumları ve sepet butonu yerleşiminin optimizasyonu."
    },
    {
      title: "E-Ticarette Çapraz Satış (Cross-Sell) ve Yukarı Satış (Up-Sell) ile Ortalama Sepet Tutarını (AOV) Yükseltme",
      keywords: ["çapraz satış", "yukarı satış", "AOV artırma", "ortalama sepet tutarı"],
      focus: "Ödeme adımında veya ürün sayfasında sepet tutarını artıracak mantıklı ürün öneri mekanizmaları kurgulamak."
    },
    {
      title: "Tek Sayfada Ödeme (One-Page Checkout) Neden Dönüşüm Oranlarını Uçurur?",
      keywords: ["One-Page Checkout", "tek sayfada ödeme", "ödeme adımları optimizasyonu", "Shopify checkout"],
      focus: "Kullanıcıyı yormayan, adımları azaltılmış tek sayfalık ödeme formlarının dönüşüm oranları üzerindeki etkisi."
    },
    {
      title: "E-Ticarette Güven Unsurları (Trust Badges) ve SSL Sertifikalarının Dönüşüme Etkisi",
      keywords: ["güven rozetleri", "trust badges", "ödeme güvenliği", "e-ticaret güven artırma"],
      focus: "Kullanıcıların kredi kartı bilgilerini girerken aradığı güvenlik sertifikaları, iade garantileri ve müşteri destek rozetlerinin yerleşimi."
    },
    {
      title: "Kozmetik ve Güzellik E-Ticaret Sitelerinde Dönüşüm Oranını Uçuran UX Taktikleri",
      keywords: ["kozmetik e-ticaret", "güzellik sitesi UX", "dönüşüm oranı", "kullanıcı yorumları"],
      focus: "Renk kartelaları, cilt tipi filtreleri ve müşteri inceleme fotoğraflarının e-ticaret dönüşümüne etkisi."
    },

    // --- GEO & AI Search (Generative Engine Optimization) ---
    {
      title: "Perplexity AI ve ChatGPT Search Motorlarında Kaynak Gösterilme Taktikleri",
      keywords: ["perplexity seo", "chatgpt search seo", "yapay zeka kaynak gösterme", "generative engine optimization"],
      focus: "Yapay zeka arama motorlarının web sitelerinden alıntı yapma kriterleri ve bu motorlara uygun içerik biçimlendirme."
    },
    {
      title: "Google SGE (Search Generative Experience) Nedir? Arama Dünyasının Yeni Dönemi",
      keywords: ["Google SGE nedir", "Search Generative Experience", "Google yapay zeka arama", "SGE seo"],
      focus: "Google'ın yapay zeka destekli arama sonuçlarının sitelerin organik trafiğine etkisi ve buna karşı alınacak önlemler."
    },
    {
      title: "Yapay Zeka Aramaları İçin Şema İşaretlemesi (Schema Markup) ve Yapılandırılmış Veri Rehberi",
      keywords: ["şema işaretlemesi", "schema markup", "yapılandırılmış veri", "rich snippets"],
      focus: "FAQ, Article, Product ve LocalBusiness şemalarının yapay zeka botları tarafından taranma ve anlaşılma sürecini kolaylaştırması."
    },
    {
      title: "GEO (Generative Engine Optimization) Kuralları: Yapay Zekaya Doğrudan Yanıt (Direct Answer) Verme",
      keywords: ["GEO kuralları", "doğrudan yanıt", "direct answer", "yapay zeka optimizasyonu"],
      focus: "İçeriklerde net tanımlar, soru-cevap blokları ve hap bilgilerin yer almasının yapay zeka botları tarafından alıntılanma oranına etkisi."
    },
    {
      title: "Yapay Zeka Arama Motorları Neden Sayısal Verileri ve İstatistikleri Sever? GEO ve Veri Odaklılık",
      keywords: ["veri odaklı içerik", "GEO istatistik", "yapay zeka taranma", "referans gösterme"],
      focus: "Yapay zeka modellerinin sayısal verileri ve güvenilir kaynakları referans gösterme eğilimini lehimize kullanma yöntemleri."
    },
    {
      title: "GEO Döneminde Anahtar Kelime Yoğunluğu Yerine Semantik (Anlamsal) Arama Optimizasyonu",
      keywords: ["semantik arama", "LSI anahtar kelimeler", "GEO içerik", "anlamsal seo"],
      focus: "Anahtar kelimeleri tekrar etmek yerine, konuyu tüm alt başlıkları ve ilişkili kavramları (LSI) ile derinlemesine ele alma stratejisi."
    },
    {
      title: "Yapay Zeka Arama Motorlarında Marka Otoritesi (Brand Authority) Nasıl İnşa Edilir?",
      keywords: ["marka otoritesi", "AI marka görünürlüğü", "yapay zeka seo", "marka bilinirliği"],
      focus: "Yapay zekanın sitenizi güvenilir bir marka olarak tanıması için PR çalışmaları, harici linklemeler ve tutarlı içerik üretimi."
    },
    {
      title: "Google Arama Motorunun AI Özetleri (AI Overviews) İçin İçerik Optimize Etme",
      keywords: ["AI Overviews seo", "Google AI özetleri", "Google yapay zeka kutusu", "SGE optimizasyonu"],
      focus: "Google arama sonuçlarının en üstündeki yapay zeka özet kutularına (AI Overviews) girmek için içerik yapılandırma taktikleri."
    },
    {
      title: "Sesli Arama (Voice Search) ve Yapay Zeka Asistanları (Siri, Alexa, Google) İçin SEO",
      keywords: ["sesli arama seo", "voice search", "doğal dil işleme", "uzun kuyruklu aramalar"],
      focus: "Kullanıcıların sesli arama yaparken kullandığı doğal konuşma diline uygun soru bazlı içerikler üretme."
    },
    {
      title: "GEO İçin Karşılaştırma Tabloları ve Markdown Formatının Önemi",
      keywords: ["karşılaştırma tabloları", "markdown tablo", "GEO yapılandırılmış veri", "yapay zeka tablo tarama"],
      focus: "Yapay zeka motorlarının karmaşık konuları özetlerken markdown formatındaki tabloları doğrudan çekme eğilimi."
    },

    // --- UGC & Social Advertising (Meta, TikTok) ---
    {
      title: "UGC (User Generated Content) Nedir? Reklam Dönüşümlerini Neden 2 Katına Çıkarır?",
      keywords: ["UGC reklam nedir", "kullanıcı içerikli reklam", "sosyal kanıt", "UGC video"],
      focus: "Tüketicilerin gerçek insan deneyimlerine duyduğu güvenin reklam tıklama ve satın alma kararlarına etkisi."
    },
    {
      title: "Meta Reklamlarında Mikro Influencer İş Birlikleri ile Düşük Maliyetli Müşteri Edinimi",
      keywords: ["mikro influencer reklam", "influencer pazarlaması", "Meta reklam ortaklığı", "iş birliği reklamları"],
      focus: "Büyük bütçeli ünlüler yerine, niş kitlelere sahip mikro influencer'ların kreatifleri ile Meta reklamlarında yüksek ROAS yakalama."
    },
    {
      title: "TikTok Ads vs Meta Ads: Hangi Sektör Hangi Platformda Reklam Vermeli?",
      keywords: ["TikTok Ads Meta Ads", "TikTok reklamları", "Meta reklamları karşılaştırma", "sosyal medya bütçesi"],
      focus: "Hedef kitle demografisi, bütçe verimliliği ve kreatif formatlar açısından TikTok ve Meta reklam platformlarının karşılaştırılması."
    },
    {
      title: "Kullanıcı Yorumlarını ve Müşteri Başarı Hikayelerini Reklam Kreatifine Dönüştürme Formülü",
      keywords: ["müşteri yorumu reklam", "sosyal kanıt kreatif", "UGC görsel", "dönüşüm artırma"],
      focus: "Sitenizdeki olumlu müşteri yorumlarını ve yıldızlı değerlendirmeleri Meta ve Instagram reklam tasarımlarında kullanma taktikleri."
    },
    {
      title: "Video Reklamlarında İlk 3 Saniyede Kullanıcıyı Yakalayacak Görsel ve Sözel Hook (Kanca) Örnekleri",
      keywords: ["reklam kanca örnekleri", "video hook", "TikTok kanca", "Meta video kreatif"],
      focus: "E-ticaret ve hizmet markaları için test edilmiş, kaydırmayı durduran (scroll-stopping) kanca kalıpları."
    },
    {
      title: "UGC Reklamlarında Doğallık vs Stüdyo Kalitesi: Hangisi Daha Çok Satıyor?",
      keywords: ["doğal UGC reklam", "stüdyo çekimi reklam", "reklam kreatif testi", "otantik içerik"],
      focus: "Amatör cep telefonu kamerasıyla çekilmiş otantik videoların, profesyonel stüdyo çekimlerine göre neden daha yüksek dönüşüm getirdiği."
    },
    {
      title: "Dönüşüm Oranı Optimizasyonunda (CRO) Sosyal Kanıtın (Social Proof) Psikolojik Gücü",
      keywords: ["sosyal kanıt psikolojisi", "social proof", "ikna taktikleri", "e-ticaret güven"],
      focus: "İnsanların başkalarının kararlarını taklit etme eğilimi (FOMO, kullanıcı sayıları, uzman görüşleri) üzerinden CRO çalışmaları."
    },
    {
      title: "TikTok Spark Ads Nedir? Organik Videoları Reklama Dönüştürme Rehberi",
      keywords: ["TikTok Spark Ads", "Spark Ads kurulumu", "organik video reklamı", "TikTok reklam modelleri"],
      focus: "Profilinizdeki veya influencer profillerindeki organik Reels/TikTok videolarını Spark Ads ile öne çıkararak etkileşimi katlama."
    },
    {
      title: "Meta Reklamlarında Whitelisting (Influencer Hesabından Reklam Çıkma) Nasıl Yapılır?",
      keywords: ["Meta whitelisting", "influencer reklam hesabı", "ortak reklam yayını", "whitelisting nedir"],
      focus: "Reklamları kendi marka hesabınız yerine influencer'ın kendi profilinden yayınlayarak güven ve dönüşüm artırma."
    },
    {
      title: "Kreatif Üretiminde Yapay Zeka Araçları: Midjourney ve Canva ile Reklam Tasarımı",
      keywords: ["yapay zeka görsel tasarım", "Midjourney reklam görseli", "Canva kreatif", "AI tasarım araçları"],
      focus: "Tasarım maliyetlerini düşürürken dikkat çekici, yüksek kaliteli reklam görsellerini AI araçlarıyla hızlıca üretme."
    },

    // --- B2B Lead Generation & Growth ---
    {
      title: "B2B Markaları İçin LinkedIn Ads ile Nitelikli C-Level Karar Alıcılara Ulaşma",
      keywords: ["B2B LinkedIn Ads", "C-level hedefleme", "LinkedIn reklam stratejileri", "nitelikli lead"],
      focus: "Unvan, şirket büyüklüğü ve sektör kırılımları kullanarak LinkedIn üzerinde nokta atışı B2B kampanyaları kurgulamak."
    },
    {
      title: "B2B Web Sitelerinde Form Dönüşüm Oranlarını Artırmak İçin 5 Altın Kural",
      keywords: ["B2B form optimizasyonu", "lead form tasarımı", "site içi form dönüşümü", "nitelikli müşteri adayı"],
      focus: "Gereksiz form alanlarını azaltma, aşamalı formlar (multi-step) ve akıllı doğrulama sistemleri ile lead hacmini artırma."
    },
    {
      title: "Lead Scoring (Müşteri Adayı Skorlama) Nedir? Satış Ekibinin Vaktini Doğru Yönetme",
      keywords: ["lead scoring", "müşteri adayı skorlama", "B2B satış hunisi", "nitelikli lead tanımlama"],
      focus: "Gelen müşteri adaylarının sitedeki davranışlarına ve şirket bilgilerine göre puanlanması ve en değerli lead'lere öncelik verilmesi."
    },
    {
      title: "LinkedIn Lead Gen Forms (Form Reklamları) Kurulumu ve CR Optimizasyonu",
      keywords: ["LinkedIn Lead Gen Forms", "LinkedIn form reklamı", "LinkedIn dönüşüm oranı", "B2B lead generation"],
      focus: "Kullanıcıların LinkedIn dışına çıkmadan, profillerindeki bilgilerle otomatik doldurulan formlar üzerinden hızlı müşteri toplama."
    },
    {
      title: "B2B'de Soğuk E-Posta (Cold Email) Kampanyalarında Yanıt Oranlarını Artırma Yolları",
      keywords: ["cold email taktikleri", "soğuk e-posta outbound", "B2B e-posta pazarlaması", "e-posta açılma oranı"],
      focus: "Spam filtrelerine takılmadan kişiselleştirilmiş, doğrudan iş birliği odaklı ve yüksek yanıt oranlı cold email yazım kuralları."
    },
    {
      title: "Müşteri Edinme Maliyeti (CAC) ve Ömür Boyu Değer (LTV) Dengesi: Sürdürülebilir Büyüme",
      keywords: ["CAC LTV oranı", "müşteri edinme maliyeti", "ömür boyu değer", "B2B büyüme metrikleri"],
      focus: "Büyüme bütçelerini yönetirken CAC'ı düşürme ve mevcut müşterilerin değerini (LTV) artırma arasındaki finansal denge."
    },
    {
      title: "B2B Sektöründe Account-Based Marketing (ABM) Nedir? Hedef Şirket Odaklı Büyüme",
      keywords: ["Account-Based Marketing", "ABM stratejisi", "hedef şirket pazarlaması", "B2B ABM"],
      focus: "Genel reklamlar yerine, sadece çalışmak istediğiniz 50-100 spesifik şirkete ve oradaki yöneticilere özel pazarlama kurguları yapma."
    },
    {
      title: "B2B Pazarlamasında Ücretsiz 'Lead Magnet' (E-Kitap, Şablon, Excel Hesaplayıcı) Gücü",
      keywords: ["lead magnet nedir", "ücretsiz şablon lead", "müşteri adayı mıknatısı", "içerik pazarlaması"],
      focus: "Ziyaretçilerden e-posta ve telefon bilgisi almak için onlara anında değer sunan ücretsiz araç ve doküman tasarlama."
    },
    {
      title: "B2B Satış Süreçlerinde Hubspot ve Salesforce CRM Entegrasyonunun Pazarlamaya Faydaları",
      keywords: ["B2B CRM entegrasyonu", "Hubspot pazarlama", "Salesforce lead takibi", "pazarlama otomasyonu"],
      focus: "Reklamdan gelen lead'in satış kapama aşamasına kadar olan tüm yolculuğunu takip ederek en çok kazandıran reklam kanallarını tespit etme."
    },
    {
      title: "SaaS (Yazılım) Girişimleri İçin Büyüme (Growth Hacking) ve Ürün Odaklı Büyüme (PLG) Metodolojisi",
      keywords: ["PLG nedir", "ürün odaklı büyüme", "SaaS growth hacking", "kullanıcı edinme"],
      focus: "SaaS modellerinde kullanıcıların ürünü ücretsiz deneyerek (freemium/free trial) satın alma kararı vermelerini sağlayan onboarding optimizasyonları."
    }
  ]
};
