// Regenerates public/images/upi-qr.svg from dengi.qrCode in mandirContent.json.
// Usage: node scripts/make-qr.mjs
import { readFileSync, writeFileSync } from "node:fs";
import QRCode from "qrcode";

const { dengi } = JSON.parse(readFileSync("src/data/mandirContent.json", "utf8"));
const { upiId, qrPayeeName: payeeName } = dengi.qrCode; // short ASCII name keeps the QR sparse and scannable
const uri = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&cu=INR`;

// Level H keeps the QR scannable under the ॐ badge overlaid on its centre.
const svg = await QRCode.toString(uri, {
  type: "svg",
  errorCorrectionLevel: "H",
  margin: 2,
  color: { dark: "#4A0E17", light: "#FFFFFF" },
});
writeFileSync("public/images/upi-qr.svg", svg);
console.log("Wrote public/images/upi-qr.svg for", upiId);
