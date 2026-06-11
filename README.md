# Smartkid SEO & GEO Ajanı Kullanım Kılavuzu 🚀

Bu proje, **smartkid.agency** sitenizin blog bölümünü arama motorlarında ve yapay zeka arama asistanlarında (Perplexity, Gemini Search vb.) üst sıralara taşımak için geliştirilmiş akıllı bir içerik ajanıdır. 

Kodlama bilmenize gerek yoktur. Aşağıdaki adımları takip ederek kurulumu yapabilir ve sistemi çalıştırabilirsiniz.

---

## 🛠️ Adım 1: Kurulum ve Hazırlık

Sisteminizin çalışması için bilgisayarınızda **Node.js** kurulu olmalıdır. Eğer kurulu değilse [nodejs.org](https://nodejs.org) adresinden indirip kurabilirsiniz.

Projeyi indirdikten sonra terminalde bu klasörün içine girip şu komutu yazarak gerekli eklentileri yükleyin:
```bash
npm install
```

---

## 🔑 Adım 2: API Anahtarlarını Tanımlama

Klasörün içerisindeki `.env` dosyasını bir metin editörü (veya VS Code) ile açın ve aşağıdaki alanları doldurun:

1. **GEMINI_API_KEY:** [Google AI Studio](https://aistudio.google.com/) adresine Google hesabınızla giriş yapıp ücretsiz bir API anahtarı üretin ve buraya yapıştırın.
2. **FRAMER_API_KEY:** Framer sitenize gidin, sol üstten **Site Settings** (Site Ayarları) -> **API Keys** kısmına girin. Yeni bir Server API Key oluşturup kopyalayın ve buraya yapıştırın.
3. **FRAMER_PROJECT_URL:** Framer'da projenizi düzenlerken tarayıcınızın adres çubuğundaki linki kopyalayıp buraya yapıştırın (Örn: `https://framer.com/projects/smartkid-agency...`).
4. **FRAMER_COLLECTION_ID:** Framer CMS panelinizde yazıların yükleneceği koleksiyonun (örn: Blog) ayarlarına girerek **Collection ID** değerini kopyalayıp yapıştırın.

---

## 🚀 Adım 3: Sistemi Çalıştırma

### A. Simülasyon (Deneme) Modu (API Anahtarlarını girmeden önce test etmek için):
Eğer API anahtarlarını henüz almadıysanız, sistemin nasıl çalıştığını görmek için yerel deneme modunu başlatabilirsiniz. Bu modda yapay zeka çalışmış gibi taklit edilir ve üretilen makale klasörde `.md` (Markdown) uzantılı bir dosya olarak bilgisayarınıza kaydedilir:
```bash
npm run test-local
```

### B. Gerçek Çalıştırma (Canlıya Gönderme):
API anahtarlarını `.env` dosyasına girdikten sonra ajanı tamamen canlı modda çalıştırabilirsiniz. Ajan konuyu araştıracak, yazacak ve doğrudan Framer sitenize yükleyip yayınlayacaktır:
```bash
npm start
```

---

## 🕰️ Adım 4: Her Gün Otomatik Çalıştırma (GitHub Actions ile Ücretsiz Bulut Kurulumu)

Bu sistemin kendi kendine her gün sabah 09:00'da çalışmasını istiyorsanız, kodu **GitHub** üzerine yükleyip ücretsiz **GitHub Actions** özelliğini kullanabilirsiniz.

### GitHub Kurulum Adımları:
1. GitHub'da gizli (Private) bir depo (repository) oluşturun ve bu klasördeki dosyaları yükleyin (`node_modules` ve `.env` dosyalarını yüklemeyin!).
2. GitHub deponuzun ayarlarına gidin: **Settings -> Secrets and Variables -> Actions**.
3. **New repository secret** butonuna tıklayarak aşağıdaki değişkenleri tek tek ekleyin:
   * `GEMINI_API_KEY` (Gemini anahtarınız)
   * `FRAMER_API_KEY` (Framer anahtarınız)
   * `FRAMER_PROJECT_URL` (Framer proje linkiniz)
   * `FRAMER_COLLECTION_ID` (Koleksiyon ID'si)

4. Projenizin içine `.github/workflows/daily-post.yml` adında bir klasör ve dosya yapısı oluşturup içine şu kodları yapıştırın:

```yaml
name: Daily SEO Article Publisher

on:
  schedule:
    # Her gün Türkiye saati ile sabah 09:00'da tetiklenir (UTC 06:00)
    - cron: '0 6 * * *'
  workflow_dispatch: # İstediğinizde manuel tetikleyebilmeniz için

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - name: Kodu Çek
        uses: actions/checkout@v4

      - name: Node.js Kur
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Bağımlılıkları Yükle
        run: npm ci

      - name: Ajanı Çalıştır
        env:
          GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
          FRAMER_API_KEY: ${{ secrets.FRAMER_API_KEY }}
          FRAMER_PROJECT_URL: ${{ secrets.FRAMER_PROJECT_URL }}
          FRAMER_COLLECTION_ID: ${{ secrets.FRAMER_COLLECTION_ID }}
        run: npm start
```

Artık sisteminiz hiçbir sunucu ücreti ödemeden, her gün tamamen otomatik bir şekilde sitenize içerik yüklemeye başlayacaktır!

---

## ✍️ Konu Listesini Düzenleme

Ajanın yazacağı konuları değiştirmek veya yeni konular eklemek için **`config.js`** dosyasını açıp en alttaki `topics` listesine dilediğiniz gibi yeni başlıklar ve odak kelimeler ekleyebilirsiniz. Ajan her gün bu listeden bir konuyu seçip yazacaktır.
