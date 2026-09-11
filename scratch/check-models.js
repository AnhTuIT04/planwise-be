const apiKey = "AQ.Ab8RN6L8m3aATIlUWtUZaCMpBy4z7Hpsup4LgUJ6KJNYTe6aBg";

async function main() {
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const json = await res.json();
    const names = json.models.map(m => m.name);
    console.log("Gemini models count:", names.length);
    console.log("Includes gemini-1.5-flash:", names.includes("models/gemini-1.5-flash"));
    console.log("Includes gemini-2.5-flash:", names.includes("models/gemini-2.5-flash"));
    console.log("Includes gemini-2.0-flash:", names.includes("models/gemini-2.0-flash"));
    console.log("Includes gemini-1.5-pro:", names.includes("models/gemini-1.5-pro"));
    console.log("Includes gemini-2.5-pro:", names.includes("models/gemini-2.5-pro"));
    console.log("Matching gemini-1.5-flash:", names.filter(n => n.includes("gemini-1.5-flash")));
    console.log("Matching gemini-2.5-flash:", names.filter(n => n.includes("gemini-2.5-flash")));
    console.log("Matching gemini-2.0-flash:", names.filter(n => n.includes("gemini-2.0-flash")));
  } catch (err) {
    console.error("Error:", err);
  }
}

main();
