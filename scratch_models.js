import { GoogleGenAI } from '@google/genai';
import 'dotenv/config';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function main() {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: 'Merhaba, bana çok kısa bir test mesajı yazar mısın?'
    });
    console.log("Başarılı! Çıktı:", response.text);
  } catch (err) {
    console.error("Hata:", err);
  }
}

main();



