const apiKey = "AQ.Ab8RN6L8m3aATIlUWtUZaCMpBy4z7Hpsup4LgUJ6KJNYTe6aBg";

async function main() {
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    console.log("Status:", res.status);
    const json = await res.json();
    console.log("Response:", JSON.stringify(json, null, 2));
  } catch (err) {
    console.error("Error:", err);
  }
}

main();
