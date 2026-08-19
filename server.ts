import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini Client
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!geminiClient) {
    geminiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  }
  return geminiClient;
}

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// AI Shopping Assistant API
app.post('/api/ai/chat', async (req, res) => {
  try {
    const { message, history = [], userContext = {}, catalogSummary = [] } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Valid message prompt is required.' });
    }

    const ai = getGeminiClient();

    const systemPrompt = `You are Aura AI — the intelligent, personal Pakistani shopping concierge for AuraPK (Pakistan's premier luxury e-commerce destination).

Brand & Cultural Context:
- AuraPK delivers nationwide across Pakistan (Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Peshawar, Multan, Quetta, Sialkot, etc.) via TCS Express, Leopards, and Call Courier.
- Supported payment methods: Cash on Delivery (COD), 1LINK Direct Bank Transfer (Raast / IBAN), JazzCash, and Easypaisa.
- Active welcome coupon: "WELCOMEPK" (gives 15% discount on all orders).
- Standard delivery timeline: 24-48 hours in major cities; 2-4 business days nationwide. Free shipping on orders over ₨ 2,999.
- Currency: Pakistani Rupees (₨ / PKR). Always format prices in PKR (e.g., ₨ 4,999).
- Tone: Extremely polite, knowledgeable, helpful, warm, and professional with authentic Pakistani hospitality ("Assalam-o-Alaikum", "JazakAllah", "Khushamdeed").

User Context:
${userContext.city ? `- Customer City: ${userContext.city}` : ''}
${userContext.userName ? `- Customer Name: ${userContext.userName}` : ''}
${userContext.cartCount ? `- Items in Cart: ${userContext.cartCount}` : ''}

Available Popular Catalog Items in Store:
${Array.isArray(catalogSummary) && catalogSummary.length > 0
  ? catalogSummary.map((item: any) => `- [${item.id}] "${item.title}" (${item.category}): ₨ ${item.price} (Original: ₨ ${item.originalPrice || item.price}) - ${item.shortDescription || item.brand}`).join('\n')
  : '- Luxury Embroidered Festive Lawn Suit (₨ 6,499)\n- Pure Cambodian Dehn Al Oud Attar 12ml (₨ 4,299)\n- Handcrafted Royal Peshawari Chappal (₨ 4,799)\n- AuraPulse ANC Wireless Earbuds (₨ 4,999)\n- Egyptian Cotton Shalwar Kameez (₨ 4,899)\n- Smart Islamic Azan Watch (₨ 6,999)'}

Your role:
1. Help users discover products matching their budget, occasion (Eid, weddings, everyday office wear, tech gifts, casual), or city climate.
2. Provide styling advice, fabric care (Lawn, Raw Silk, Cotton), fragrance layering (Oud, Amber, Taif Rose), and tech specs.
3. Guide customers on order placement, COD payment verification, bank transfers, tracking via TCS, or coupon application.
4. Keep answers concise, visually formatted with bullet points, and highlight product names with their exact prices in PKR.`;

    if (ai) {
      // Build conversation contents
      const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

      // Add conversation history if provided
      if (Array.isArray(history) && history.length > 0) {
        for (const turn of history.slice(-6)) {
          if (turn.role === 'user' || turn.role === 'model') {
            contents.push({
              role: turn.role,
              parts: [{ text: String(turn.content || turn.text) }]
            });
          }
        }
      }

      // Add current message
      contents.push({
        role: 'user',
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7
        }
      });

      const responseText = response.text || 'Assalam-o-Alaikum! How can I assist you with your AuraPK shopping today?';

      return res.json({
        reply: responseText,
        source: 'gemini-3.7-flash'
      });
    }

    // Fallback response engine if no Gemini API Key is configured
    const lower = message.toLowerCase();
    let fallbackReply = `Assalam-o-Alaikum! Welcome to AuraPK. I am your AI Shopping Assistant. 

Here are top recommendations tailored for you:
• **Festive Lawn Pret 2026**: Premium 3-piece embroidered unstitched & pret collection (from ₨ 5,499)
• **Pure Cambodian Dehn Al Oud**: 24-hour longevity non-alcoholic attar in collector wooden box (₨ 4,299)
• **AuraPulse ANC Wireless Earbuds**: 45dB noise cancellation with TCS Fast Dispatch (₨ 4,999)

💡 **Shopping Tip**: Use coupon code **WELCOMEPK** at checkout for an instant 15% discount! We offer nationwide Cash on Delivery and Direct Bank Transfer.`;

    if (lower.includes('delivery') || lower.includes('shipping') || lower.includes('tcs') || lower.includes('city') || lower.includes('karachi') || lower.includes('lahore') || lower.includes('islamabad')) {
      fallbackReply = `📦 **AuraPK Nationwide Delivery Information**:
• **Major Cities** (Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad): Fast doorstep delivery within 24 to 48 hours via TCS Express & Leopards.
• **All Other Cities & Tehsils**: 2 to 4 business days.
• **Free Shipping**: Available on all orders over **₨ 2,999**.
• **Payment**: Cash on Delivery (COD) or Instant Bank Transfer / JazzCash / Easypaisa.`;
    } else if (lower.includes('coupon') || lower.includes('discount') || lower.includes('code') || lower.includes('sale')) {
      fallbackReply = `🎉 **Active AuraPK Discount Coupons**:
• **WELCOMEPK**: Enjoy **15% OFF** on your order.
• **AZADIPK**: Special flat **₨ 500 OFF** on orders above ₨ 3,500.
• **FREESHIP**: 100% Free TCS Shipping across Pakistan.

You can enter and apply these directly in your Cart Drawer or Checkout modal!`;
    } else if (lower.includes('bank') || lower.includes('payment') || lower.includes('jazzcash') || lower.includes('easypaisa') || lower.includes('cod')) {
      fallbackReply = `💳 **Payment Methods at AuraPK**:
1. **Cash on Delivery (COD)**: Pay cash to the courier rider at your doorstep.
2. **Direct Bank Transfer (1LINK / Raast / IBAN)**: Transfer directly to Meezan Bank or HBL and upload screenshot proof for instant order approval.
3. **JazzCash & Easypaisa**: Fast mobile wallet payments with zero surcharge.`;
    } else if (lower.includes('fragrance') || lower.includes('oud') || lower.includes('attar') || lower.includes('perfume')) {
      fallbackReply = `✨ **Royal Fragrances & Oud Collection**:
• **Royal Cambodian Dehn Al Oud (12ml)**: ₨ 4,299 (Pure aged agarwood, 24-hr projection)
• **Taif Rose & Amber Attar (10ml)**: ₨ 3,499 (Fresh floral oriental notes)
• **Aura Black Edition Extrait de Parfum (100ml)**: ₨ 6,999 (Smoky leather, bergamot & vanilla)

All fragrances are 100% alcohol-free and bottled in velvet keepsake packaging.`;
    }

    return res.json({
      reply: fallbackReply,
      source: 'aurapk-assistant'
    });
  } catch (error: any) {
    console.error('Error handling AI chat request:', error);
    return res.status(500).json({
      error: 'Failed to process AI chat request',
      message: error?.message || 'Internal server error'
    });
  }
});

async function startServer() {
  // Vite middleware in development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AuraPK Fullstack Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
