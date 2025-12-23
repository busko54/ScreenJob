// /api/extract-job.js
// Rate limiting - max 10 requests per minute per IP
const rateLimit = {};
export default async function handler(req, res) {
  // RATE LIMITING CHECK
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const now = Date.now();
  
  if (!rateLimit[ip]) {
    rateLimit[ip] = [];
  }
  
  rateLimit[ip] = rateLimit[ip].filter(time => now - time < 60000);
  
  if (rateLimit[ip].length >= 10) {
    return res.status(429).json({ 
      error: 'Too many requests. Please wait a minute before trying again.' 
    });
  }
  
  rateLimit[ip].push(now);
  // END RATE LIMITING
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { jobPosting } = req.body;
  if (!jobPosting) {
    return res.status(400).json({ error: 'No job posting provided' });
  }
  try {
   const prompt = `Extract all job details from this posting. Return ONLY valid JSON (no markdown):
{
  "jobTitle": "string",
  "company": "string",
  "baseSalary": number or null,
  "hourlyRate": number or null,
  "equity": "string or null",
  "bonus": "string or null",
  "hoursPerWeek": number or null,
  "workEnv": "full-remote|hybrid|onsite",
  "fundingStage": "seed|series-a|series-b|growth|public",
  "teamSize": number or null,
  "industry": "string",
  "requirements": "string - List ALL requirements, qualifications, and must-haves from the posting. Include: years of experience, certifications, clearances, degrees, technical skills, soft skills, etc."
}

SALARY EXTRACTION RULES:
- If you see a RANGE like "$15.49-18.63/hr": extract the MIDPOINT as hourlyRate (e.g., $17.06), then multiply by 2080 to get baseSalary
- If you see "$X/hour" or "$X/hr" (single number): multiply by 2080 to get annual baseSalary, also return hourlyRate
- If you see "$X/week" → multiply by 52 to get baseSalary
- If you see "$X/month" → multiply by 12 to get baseSalary
- If you see "$X/year" or just "$X" → use as-is for baseSalary
- If salary is "competitive" or not listed → return null for baseSalary
- ALWAYS return both hourlyRate (if it exists) AND annual baseSalary (if calculable)
- NEVER return 0. Either return the actual number or null.

HOURS EXTRACTION:
- If you see "Full-time" → hoursPerWeek: 40
- If you see "Part-time" → hoursPerWeek: 20
- If you see specific hours (e.g., "25 hours/week") → use that number
- If not mentioned → return null

Job posting:
${jobPosting}`;
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": process.env.GEMINI_API_KEY
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });
    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }
    const data = await response.json();
    const textContent = data.candidates[0].content.parts[0].text;
    const cleanJson = textContent.replace(/```json\n?|\n?```/g, '').trim();
    const extracted = JSON.parse(cleanJson);
    
    // FORCE salary calculation if hourly rate exists but baseSalary is missing
    if ((!extracted.baseSalary || extracted.baseSalary === 0) && extracted.hourlyRate) {
      extracted.baseSalary = Math.round(extracted.hourlyRate * 2080);
    }
    
    // Convert 0 to null for salary
    if (extracted.baseSalary === 0) {
      extracted.baseSalary = null;
    }
    
    return res.status(200).json(extracted);
  } catch (error) {
    console.error('Job extraction error:', error);
    return res.status(500).json({ error: 'Failed to extract job data', details: error.message });
  }
}
