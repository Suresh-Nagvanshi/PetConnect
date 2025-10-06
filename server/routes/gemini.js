// server/routes/gemini.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { GoogleGenAI } = require('@google/genai');

// Initialize Gemini
const ai = new GoogleGenAI({});
const model = 'gemini-2.5-flash';

// Multer setup (memory)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }
});

// Helper: buffer -> GenerativePart
function fileToGenerativePart(buffer, mimeType) {
  return {
    inlineData: {
      data: buffer.toString('base64'),
      mimeType
    }
  };
}

// POST /api/gemini/diagnose
router.post('/diagnose', upload.single('petImage'), async (req, res) => {
  try {
    const prompt = typeof req.body.prompt === 'string' ? req.body.prompt.trim() : '';
    const hasText = !!prompt;
    const hasImage = !!req.file;

    // If neither provided, validate
    if (!hasText && !hasImage) {
      return res.status(400).json({
        error: 'Please provide a description or upload an image.'
      });
    }

    const parts = [];

    // Add image if present
    if (hasImage) {
      const imagePart = fileToGenerativePart(req.file.buffer, req.file.mimetype);
      parts.push(imagePart);
    }

    // Add text if present
    if (hasText) {
      parts.push({ text: prompt });
    }

    const systemInstruction = `You are a specialized Veterinary AI Assistant. Analyze the provided input (image and/or symptoms). Your response must be in Markdown format, highly empathetic, and include three distinct sections:
1. **Initial Assessment**: Summarize the potential issue based on the available evidence.
2. **Immediate Action**: Provide 2-3 specific, safe steps the pet owner should take right now (e.g., clean the area, monitor behavior, isolate the pet).
3. **Veterinary Guidance**: Clarify you are not a replacement for a vet and list conditions that require immediate professional attention.`;

    const contents = [{ role: 'user', parts }];

    const result = await ai.models.generateContent({
      model,
      contents,
      config: {
        systemInstruction
        // temperature: 0.2
      }
    });

    // Defensive extraction
    let diagnosisText = '';
    if (result && typeof result.text === 'function') {
      diagnosisText = (result.text() || '').trim();
    } else if (result && typeof result.text === 'string') {
      diagnosisText = result.text.trim();
    }

    if (!diagnosisText) {
      diagnosisText =
        'Sorry, the analysis could not produce a readable summary. Please try again with a clearer image or more detail.';
    }

    return res.json({ diagnosis: diagnosisText });
  } catch (error) {
    console.error('Gemini API Error:', error?.message || error);
    return res.status(500).json({
      error:
        'An error occurred while connecting to the AI service. Please check the API key and server logs.'
    });
  }
});

module.exports = router;
