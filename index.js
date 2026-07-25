import 'dotenv/config';
import { config } from './config.js';
import { writeArticle } from './agent.js';
import { publishToFramer } from './framer.js';
import { sendToWebhook } from './webhook.js';
import { sendDetailedErrorEmail } from './emailer.js';
import { generateBrandedCover } from './cover_generator.js';
import { generateFreshTopic } from './topic_generator.js';
import fs from 'fs';
import path from 'path';

async function main() {
  console.log('🌟 ==================================================');
  console.log('🚀 Smartkid.agency SEO & GEO Günlük Blog Ajanı');
  console.log('================================================== 🌟\n');

  // Komut satırı argümanlarını kontrol et (--topic 2 gibi)
  const args = process.argv.slice(2);
  let topicIndex = -1;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--topic' && args[i + 1]) {
      topicIndex = parseInt(args[i + 1], 10);
      break;
    }
  }

  // State dosyasından kullanılan konuları ve sayı numarasını al
  const statePath = path.join(process.cwd(), 'state.json');
  let stateData = { lastIssueNumber: 77, usedTopics: [], usedImages: [] };
  if (fs.existsSync(statePath)) {
    try {
      stateData = JSON.parse(fs.readFileSync(statePath, 'utf8'));
    } catch (e) {}
  }

  const nextIssueNumber = (stateData.lastIssueNumber || 77) + 1;
  let selectedTopic = null;

  // Konu seçimi: Eğer elle verildiyse onu kullan, verilmediyse taze konu bul
  if (topicIndex >= 0 && topicIndex < config.topics.length) {
    selectedTopic = config.topics[topicIndex];
  } else {
    const unusedTopics = config.topics.filter(t => !stateData.usedTopics.includes(t.title));
    if (unusedTopics.length > 0) {
      selectedTopic = unusedTopics[0];
    } else {
      console.log('🔄 Statik konu listesindeki tüm konular daha önce işlendi. Yapay zeka ile yepyeni taze bir konu üretiliyor...');
      selectedTopic = await generateFreshTopic(stateData.usedTopics);
    }
  }

  console.log(`📅 Bugünün Seçilen Konusu (SIO #${nextIssueNumber}):`);
  console.log(`👉 Başlık: "${selectedTopic.title}"`);
  console.log(`🔑 Odak Kelimeler: [${selectedTopic.keywords.join(', ')}]`);

  try {
    // 1. Ajanı çalıştırıp makaleyi yazdır
    const article = await writeArticle(selectedTopic);

    // 2. Numaralı & Markalı Kapak Görselini Üret (#SIO XX)
    const coverResult = await generateBrandedCover(selectedTopic, nextIssueNumber, stateData);
    article.coverImageUrl = coverResult.publicUrl;
    article.issueNumber = nextIssueNumber;

    console.log('\n📄 YAZILAN MAKALEDEN KESİT (İlk 200 karakter):');
    console.log('--------------------------------------------------');
    console.log(article.content.substring(0, 300) + '...\n');
    console.log('--------------------------------------------------');
    console.log(`ℹ️  Meta Açıklama: "${article.metaDescription}"`);
    console.log(`🖼️  Üretilen Kapak URL: "${article.coverImageUrl}"`);

    // 3. Yerel bir yedek kopyası kaydet (İnceleme kolaylığı için)
    const backupDir = path.join(process.cwd(), 'published_articles');
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    const backupPath = path.join(backupDir, `${article.slug}.md`);
    const backupContent = `---
title: "${article.title}"
metaDescription: "${article.metaDescription}"
issueNumber: ${nextIssueNumber}
coverImageUrl: "${article.coverImageUrl}"
date: "${new Date().toLocaleDateString('tr-TR')}"
---

${article.content}
`;
    fs.writeFileSync(backupPath, backupContent, 'utf8');
    console.log(`💾 Makalenin yerel yedeği kaydedildi: published_articles/${article.slug}.md`);

    // 4. Framer'da yayınla
    console.log(`\n📤 Framer CMS yayınlama süreci başlatılıyor...`);
    const result = await publishToFramer(article);

    if (result.success && result.published) {
      console.log('\n✨ Makale CMS\'e eklendi ve Framer sitesi başarıyla canlıya alındı!');
      // LinkedIn otomatik paylaşımı için Make.com Webhook'unu tetikle
      await sendToWebhook(article, nextIssueNumber, result.imageUrl || article.coverImageUrl);
    } else if (result.success && !result.published) {
      console.log('\n⚠️ Makale Framer CMS\'e yüklendi fakat Framer API yayınlama uyarısı verdi.');
      console.log('🛑 404 kırık link paylaşımını önlemek için LinkedIn Webhook paylaşımı ertelendi.');

      await sendDetailedErrorEmail({
        subject: 'Framer Canlıya Alma Beklemede',
        articleTitle: article.title,
        cause: 'Makaleniz Framer CMS koleksiyonunuza eklendi ancak Framer canlı yayın servisi anlık olarak yanıt vermedi (veya Framer editörünüz bilgisayarınızda açık olduğu için canlı oturum kilidi oluştu).',
        solution: '1. Framer paneline girin (https://framer.com/projects/SmartKid--mjmtIYQ4xATe4SDQurEm-cjSD8)\n2. Sağ üstteki mavi "Publish" butonuna basarak makaleyi canlıya alın.'
      });
    } else {
      console.log('\n⚠️ İşlem tamamlandı fakat bazı uyarılara veya hatalara rastlandı.');
    }
  } catch (error) {
    console.error('\n❌ Süreç sırasında kritik bir hata oluştu:', error);

    await sendDetailedErrorEmail({
      subject: 'Kritik İçerik Üretim Aksaklığı',
      cause: `Yapay zeka veya sistem çalıştırma sırasında bir hata oluştu: ${error.message}`,
      solution: 'GitHub Actions çalıştırma loglarını kontrol edebilirsiniz: https://github.com/aenesdmr/smarkid_seo_agency/actions',
      details: error.stack
    });

    process.exit(1);
  }
}

main().catch(console.error);
