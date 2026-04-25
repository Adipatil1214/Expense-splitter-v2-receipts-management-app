export const parseReceipt = (text, lines) => {

  // 🧾 -------- VENDOR --------

  let vendor = "Unknown";

  if (lines && lines.length > 0) {
    // ✅ use structured OCR if available
    const sorted = [...lines].sort((a, b) => a.bbox.y0 - b.bbox.y0);

    const vendorLine = sorted.find(line => {
      const t = line.text.trim().toLowerCase();

      return (
        t.length > 3 &&
        !t.includes("receipt") &&
        !t.includes("item") &&
        !t.includes("rate") &&
        !t.includes("quantity") &&
        !t.includes("subtotal") &&
        !t.includes("total")
      );
    });

    vendor = vendorLine?.text || "Unknown";

  } else {
    // 🔥 FALLBACK → simple text logic
    const textLines = text
      .split("\n")
      .map(l => l.trim())
      .filter(l => l.length > 3);

    vendor = textLines[0] || "Unknown";
  }


  // 💰 -------- AMOUNT --------
  const totalMatch = text.match(/total[^0-9]*([\d]+\.\d{2})/i);

  const amount = totalMatch
    ? parseFloat(totalMatch[1])
    : 0;


  // 📅 -------- DATE --------
  const dateMatch = text.match(/\d{2}\/\d{2}\/\d{4}/);

  const date = dateMatch
    ? new Date(dateMatch[0])
    : new Date();


  return {
    vendor,
    amount,
    date
  };
};