import express from "express";
import { generateDocument } from "../services/openaiService.js";
import { saveDocument } from "../services/storageService.js";

const router = express.Router();

router.post("/generate", async (req, res) => {
  try {
    const { template, context } = req.body;
    const draft = await generateDocument(template, context);
    const url = await saveDocument(template, draft);

    res.json({
      success: true,
      draft,
      url,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
