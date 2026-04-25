import Tesseract from "tesseract.js";
import sharp from "sharp";
import fs from "fs";
import https from "https";
import path from "path";
import os from "os";

// download image from Cloudinary URL to a temp file
const downloadImage = (url) => {
  return new Promise((resolve, reject) => {
    const tempPath = path.join(os.tmpdir(), `receipt_${Date.now()}.jpg`);
    const file = fs.createWriteStream(tempPath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on("finish", () => {
        file.close();
        resolve(tempPath);
      });
    }).on("error", reject);
  });
};

export const extractText = async (imagePath) => {
  // if Cloudinary URL, download first. if local path, use directly
  const isUrl = imagePath.startsWith("http");
  const localPath = isUrl ? await downloadImage(imagePath) : imagePath;

  const processedPath = path.join(os.tmpdir(), `processed_${Date.now()}.png`);

  // 🧠 preprocessing
  await sharp(localPath)
    .grayscale()
    .normalize()
    .toFile(processedPath);

  const result = await Tesseract.recognize(processedPath, "eng");

  // cleanup temp files
  if (isUrl) fs.unlinkSync(localPath);
  fs.unlinkSync(processedPath);

  return {
    text: result.data.text,
    lines: result.data.lines
  };
};