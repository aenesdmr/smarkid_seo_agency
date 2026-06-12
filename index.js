import 'dotenv/config';
import { config } from './config.js';
import { writeArticle } from './agent.js';
import { publishToFramer } from './framer.js';
import fs from 'fs';
import path from 'path';

async function main() {
  console.log('🌟 ==================================================');
  console.log('🚀 Smartkid.agency SEO & GEO Günlük Blog Ajanı');
  console.log('================================================== 🌟');

  // Tarih ve saate dayalı (stateless) sıralı konu seçimi
  // Parametre olarak belirli bir index verilirse onu kullan (Örn: node index.js --topic 5)
  let topicIndex;
  const topicArgIndex = process.argv.indexOf('--topic');
  if (topicArgIndex !== -1 && process.argv[topicArgIndex + 1]) {
    topicIndex = parseInt(process.argv[topicArgIndex + 1], 10) % config.topics.length;
  } else {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    
    // Saat 12:00'den önce ise Sabah (0), sonra ise Akşam (1) yayını
    const isEvening = now.getHours() >= 12;
    topicIndex = (dayOfYear * 2 + (isEvening ? 1 : 0)) % config.topics.length;
  }

  const selectedTopic = config.topics[topicIndex];

  console.log(`\n📅 Bugünün Seçilen Konusu:`);
  console.log(`👉 Başlık: "${selectedTopic.title}"`);
  console.log(`🔑 Odak Kelimeler: [${selectedTopic.keywords.join(', ')}]`);

  try {
    // 1. Ajanı çalıştırıp makaleyi yazdır
    const article = await writeArticle(selectedTopic);

    console.log('\n📄 YAZILAN MAKALEDEN KESİT (İlk 200 karakter):');
    console.log('--------------------------------------------------');
    console.log(article.content.substring(0, 300) + '...\n');
    console.log('--------------------------------------------------');
    console.log(`ℹ️  Meta Açıklama: "${article.metaDescription}"`);
    console.log(`ℹ️  Görsel Promptu: "${article.coverImagePrompt}"`);

    // 2. Yerel bir yedek kopyası kaydet (İnceleme kolaylığı için)
    const backupDir = path.join(process.cwd(), 'published_articles');
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    const backupPath = path.join(backupDir, `${article.slug}.md`);
    const backupContent = `---
title: "${article.title}"
metaDescription: "${article.metaDescription}"
coverImagePrompt: "${article.coverImagePrompt}"
date: "${new Date().toLocaleDateString('tr-TR')}"
---

${article.content}
`;
    fs.writeFileSync(backupPath, backupContent, 'utf8');
    console.log(`💾 Makalenin yerel yedeği kaydedildi: published_articles/${article.slug}.md`);

    // 3. Framer'da yayınla
    console.log(`\n📤 Framer CMS yayınlama süreci başlatılıyor...`);
    const success = await publishToFramer(article);

    if (success) {
      console.log('\n✨ İşlem başarıyla tamamlandı!');
    } else {
      console.log('\n⚠️  İşlem tamamlandı fakat bazı uyarılara veya hatalara rastlandı.');
    }
  } catch (error) {
    console.error('\n❌ Süreç sırasında kritik bir hata oluştu:', error);
    process.exit(1);
  }
}

main();
