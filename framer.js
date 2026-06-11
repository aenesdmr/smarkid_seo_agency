import { connect } from 'framer-api';
import fs from 'fs';
import path from 'path';

/**
 * Makaleyi Framer CMS'e yükleyen veya simüle modda yerel dosyaya yazan fonksiyon
 * @param {Object} article - Ajan tarafından yazılan makale objesi
 * @returns {Promise<boolean>} İşlem başarısı
 */
export async function publishToFramer(article) {
  const apiKey = process.env.FRAMER_API_KEY;
  const projectUrl = process.env.FRAMER_PROJECT_URL;
  const collectionId = process.env.FRAMER_COLLECTION_ID;

  const isMock = !apiKey || apiKey === 'YOUR_FRAMER_API_KEY' || apiKey.startsWith('your_') || !projectUrl;

  if (isMock) {
    console.log('\n======================================================');
    console.log('⚠️  Framer API Anahtarı veya Proje URL\'si yapılandırılmadı.');
    console.log('📝 Makale bilgisayarınıza yerel bir dosya olarak kaydediliyor...');
    console.log('======================================================\n');

    try {
      const fileName = `${article.slug || 'draft-article'}.md`;
      const filePath = path.join(process.cwd(), fileName);
      
      const fileContent = `---
title: "${article.title}"
metaDescription: "${article.metaDescription}"
coverImagePrompt: "${article.coverImagePrompt}"
date: "${new Date().toLocaleDateString('tr-TR')}"
---

${article.content}
`;
      
      fs.writeFileSync(filePath, fileContent, 'utf8');
      console.log(`✅ Makale başarıyla yerel olarak kaydedildi!`);
      console.log(`📂 Dosya konumu: ${filePath}`);
      console.log(`💡 API anahtarlarınızı yerleştirdikten sonra bu yazı otomatik olarak Framer'a yüklenecektir.`);
      return true;
    } catch (err) {
      console.error('❌ Yerel dosya yazılırken bir hata oluştu:', err);
      return false;
    }
  }

  console.log(`\n🔗 Framer Projesine bağlanılıyor: ${projectUrl}...`);
  let framerInstance = null;

  try {
    // Framer Server API'ye bağlan
    framerInstance = await connect(projectUrl, apiKey);
    console.log('⚡ Bağlantı kuruldu. CMS koleksiyonları sorgulanıyor...');

    // Koleksiyonları al
    const collections = await framerInstance.getCollections();
    const targetCollection = collections.find(c => c.id === collectionId || c.name.toLowerCase() === collectionId.toLowerCase());

    if (!targetCollection) {
      console.error(`❌ Hata: '${collectionId}' isimli veya ID'li CMS koleksiyonu sitenizde bulunamadı.`);
      console.log('Mevcut Koleksiyonlar:');
      collections.forEach(c => console.log(`- Adı: "${c.name}", ID: "${c.id}"`));
      return false;
    }

    console.log(`🎯 Hedef Koleksiyon Bulundu: "${targetCollection.name}"`);

    // Koleksiyondaki alanları (fields) analiz edip akıllı eşleştirme yapalım
    const fields = await targetCollection.getFields();
    console.log('📊 Sitedeki CMS Alanları inceleniyor:');
    for (const field of fields) {
      console.log(`- Alan Adı: "${field.name}" | ID: "${field.id}" | Tip: "${field.type}"`);
    }
    console.log('📊 CMS Alanları eşleştiriliyor...');

    const fieldData = {};
    
    // Framer alan isimlerine göre akıllı eşleştirme (Başlık, İçerik, Meta vb.)
    for (const field of fields) {
      const fieldName = field.name.toLowerCase();
      const fieldType = field.type;
      
      let mappedValue = null;
      let hasMapping = false;
      
      if (fieldName === 'title' || fieldName === 'başlık' || fieldName === 'baslik' || fieldType === 'title') {
        mappedValue = article.title;
        hasMapping = true;
      } else if (fieldName === 'content' || fieldName === 'içerik' || fieldName === 'icerik' || fieldName === 'body' || fieldName === 'gövde') {
        mappedValue = article.content;
        hasMapping = true;
      } else if (fieldName === 'meta description' || fieldName === 'meta açıklaması' || fieldName === 'meta aciklamasi' || fieldName === 'summary' || fieldName === 'özet' || fieldName === 'short description' || fieldName === 'kısa açıklama') {
        mappedValue = article.metaDescription;
        hasMapping = true;
      } else if (fieldName === 'date' || fieldName === 'tarih') {
        mappedValue = new Date().toISOString();
        hasMapping = true;
      } else if (fieldName === 'featured' || fieldName === 'öne çıkanlar' || fieldName === 'one cikanlar') {
        mappedValue = true; // varsayılan olarak öne çıkar
        hasMapping = true;
      } else if (fieldName === 'catergory' || fieldName === 'category') {
        const enumCases = field.cases || [];
        const blogCase = enumCases.find(c => c.name.toLowerCase() === 'blog');
        if (blogCase) {
          fieldData[field.id] = { type: 'enum', value: blogCase.id };
          console.log(`🎯 Kategori "blog" olarak eşleştirildi (Case ID: ${blogCase.id})`);
        } else {
          console.log(`⚠️  Kategori "blog" seçeneği bulunamadı. Mevcut seçenekler:`, enumCases.map(c => c.name));
        }
      }

      if (hasMapping) {
        if (fieldType === 'string') {
          fieldData[field.id] = { type: 'string', value: String(mappedValue) };
        } else if (fieldType === 'formattedText') {
          fieldData[field.id] = { type: 'formattedText', value: String(mappedValue), contentType: 'markdown' };
        } else if (fieldType === 'date') {
          fieldData[field.id] = { type: 'date', value: new Date(mappedValue).toISOString() };
        } else if (fieldType === 'boolean') {
          fieldData[field.id] = { type: 'boolean', value: Boolean(mappedValue) };
        } else if (fieldType === 'number') {
          fieldData[field.id] = { type: 'number', value: Number(mappedValue) };
        } else if (fieldType === 'image') {
          fieldData[field.id] = { type: 'image', value: null };
        }
      }
    }

    console.log('📤 Makale verisi Framer CMS\'e ekleniyor...');
    await targetCollection.addItems([
      {
        slug: article.slug,
        fieldData: fieldData
      }
    ]);

    console.log('🚀 Sitede yapılan değişiklikler yayınlanıyor (Publishing)...');
    // Framer projesini yayına al
    await framerInstance.publish();

    console.log('🎉 Başarılı! Makaleniz smartkid.agency sitenizde canlıya alındı!');
    return true;
  } catch (error) {
    console.error('❌ Framer CMS yayını sırasında hata oluştu:', error);
    return false;
  } finally {
    if (framerInstance) {
      try {
        await framerInstance.disconnect();
        console.log('🔌 Framer bağlantısı güvenli bir şekilde kapatıldı.');
      } catch (err) {
        // Disconnect hatasını yoksayabiliriz
      }
    }
  }
}
