import Tesseract from "tesseract.js";
import sharp from "sharp";
import fs from "fs";

export const extractText = async (imagePath) => {
  const processedPath = imagePath + "_processed.png";

  // 🧠 preprocessing
  await sharp(imagePath)
    .grayscale()
    .normalize()
    .toFile(processedPath);

  const result = await Tesseract.recognize(processedPath, "eng");

  // cleanup
  fs.unlinkSync(processedPath);

  return {
    text: result.data.text,
    lines: result.data.lines
  };
};