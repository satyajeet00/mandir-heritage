// Fails (exit 1) while any placeholder/dummy content is still in the site.
// Usage: npm run check:launch   (run before every production deploy)
import { readFileSync } from "node:fs";

const raw = readFileSync("src/data/mandirContent.json", "utf8");
const markers = [
  [/dummy/i, "dummy bank/UPI value"],
  [/000000000000|\+910000000000|\+91 00000 00000/, "placeholder account/phone number"],
  [/example\.org/i, "placeholder email"],
  [/sample info|नमुना/, "sample visit/PTR text"],
  [/\bXX\b/, "XX placeholder (distance etc.)"],
  [/"detailsVerified":\s*false/, "donation panel still marked unverified"],
];

const problems = markers.filter(([re]) => re.test(raw)).map(([, why]) => `content: ${why}`);
if (!process.env.NEXT_PUBLIC_SITE_URL) problems.push("env: NEXT_PUBLIC_SITE_URL is not set");

if (problems.length) {
  console.error("Not ready to launch:\n - " + problems.join("\n - "));
  process.exit(1);
}
console.log("Launch check passed.");
