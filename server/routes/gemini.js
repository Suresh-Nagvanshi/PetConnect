// server/routes/gemini.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs'); // Node.js built-in file system module
const { GoogleGenAI } = require('@google/genai');

// --- 1. SETUP: Initialize Gemini and Multer ---

// Initialize the Gemini client. It automatically uses the GEMINI_API_KEY from process.env
const ai = new GoogleGenAI({}); 
const model = "gemini-2.5-flash"; // Excellent for multimodal tasks

// Setup Multer for file uploads
// We use memoryStorage so the file is stored in memory (buffer) instead of saved to disk.
const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 } // Optional: Limit file size to 5MB
});


// --- 2. HELPER FUNCTION: Convert Buffer to Generative Part ---

// Converts a local file buffer (from Multer) into a GenerativePart object.
function fileToGenerativePart(buffer, mimeType) {
    return {
        inlineData: {
            data: buffer.toString("base64"),
            mimeType,
        },
    };
}

// --- 3. ROUTE: POST /api/gemini/diagnose ---

// Use the 'upload.single()' middleware to handle a single file upload
// The field name 'petImage' MUST match the field name used in the React client's FormData.
router.post('/diagnose', upload.single('petImage'), async (req, res) => {
    
    // Check if both text prompt and image were received
    if (!req.body.prompt || !req.file) {
        return res.status(400).json({ 
            error: "Missing required fields: please provide both a text prompt and an image." 
        });
    }

    try {
        const { prompt } = req.body;
        const imageFile = req.file;

        // 1. Convert the image buffer to a GenerativePart
        const imagePart = fileToGenerativePart(
            imageFile.buffer,
            imageFile.mimetype 
        );
        
        // 2. Define the System Instruction for better context control
        const systemInstruction = `You are a specialized Veterinary AI Assistant. Analyze the provided image and the user's symptom description. Your response must be in Markdown format, highly empathetic, and include three distinct sections: 
1. **Initial Assessment**: Summarize the potential issue based on the evidence.
2. **Immediate Action**: Provide 2-3 specific, safe steps the pet owner should take right now (e.g., clean the area, monitor behavior, isolate the pet).
3. **Veterinary Guidance**: Strongly advise the user that you are not a replacement for a vet and state the conditions under which they should seek professional medical attention immediately.`;

        // 3. Assemble the contents array (Image Part, Text Part)
        const contents = [
            { role: "user", parts: [imagePart, { text: prompt }] }
        ];

        // 4. Call the Gemini API
        const result = await ai.models.generateContent({
            model: model,
            contents: contents,
            config: {
                systemInstruction: systemInstruction,
                // temperature: 0.2, // Use a low temperature for factual, reliable advice
            }
        });

        // 5. Extract and send the response text
        const diagnosisText = result.text.trim();

        res.json({ 
            diagnosis: diagnosisText 
        });

    } catch (error) {
        console.error("Gemini API Error:", error.message);
        // Send a generic error message back to the client
        res.status(500).json({ 
            error: "An error occurred while connecting to the AI service. Please check your API key and server logs." 
        });
    }
});

module.exports = router;