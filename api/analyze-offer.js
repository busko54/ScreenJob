// /api/analyze-offer.js
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
  const { profile, job } = req.body;
  if (!profile || !job) {
    return res.status(400).json({ error: 'Missing profile or job data' });
  }
  try {
    const prompt = `You are an expert career coach and negotiation strategist. Analyze this job offer comprehensively and provide a logically consistent recommendation.
RECOMMENDATION RULES:
- TAKE (8-10/10): Aligns with priorities, good salary, minimal downsides. Accept as-is.
- NEGOTIATE (5-7/10): Has potential BUT missing key things (lower salary, worse hours, etc). Worth negotiating ON SPECIFIC ITEMS.
- PASS (0-4/10): Too many fundamental misalignments. Even if you negotiate, likely won't fix core issues.
USER PROFILE:
- Current: ${profile.currentJobTitle}, ${profile.currentSalary}/year, ${profile.currentHours}h/week
- Experience: ${profile.yearsExp} years
- Company size: ${profile.currentCompanySize}
- Priorities (1-5): Salary=${profile.priority_salary}, Balance=${profile.priority_balance}, Growth=${profile.priority_growth}, Stability=${profile.priority_stability}, Remote=${profile.priority_remote}, Brand=${profile.priority_brand}
${profile.resumeData ? `- Background: ${profile.resumeData}` : ''}
${profile.achievements ? `- Professional Achievements: ${profile.achievements}` : ''}
JOB REQUIREMENTS & QUALIFICATIONS:
${job.requirements ? `Required/Preferred: ${job.requirements}` : 'No requirements listed'}
Your Background: ${profile.yearsExp} years experience | Certifications: ${profile.extractedData?.certifications?.slice(0, 3).join(', ') || 'None listed'} | Key Skills: ${profile.extractedData?.skills?.slice(0, 5).join(', ') || 'None listed'}

JOB OFFER:
- Title: ${job.jobTitle} @ ${job.company}
- Salary: ${job.baseSalary}/year (vs current ${profile.currentSalary})
- Equity: ${job.equity || 'None mentioned'}
- Bonus: ${job.bonus || 'None mentioned'}
- Hours: ${job.hoursPerWeek}h/week (vs current ${profile.currentHours})
- Setup: ${job.workEnv}
- Stage: ${job.fundingStage}
- Team: ${job.teamSize} people
- Industry: ${job.industry}
- Concerns: ${job.concerns || 'None'}
IMPORTANT: Match recommendation to score. Only use NEGOTIATE if 5-7/10. If score is 3/10, must be PASS. If 8+, must be TAKE.
Provide ONLY valid JSON (no markdown, no extra text):
{
  "recommendation": "TAKE|PASS|NEGOTIATE",
  "score": 0-10,
  "confidence": 0-100,
  "scoringBreakdown": {
    "salary": "explanation with percentage change and market position",
    "workLife": "explanation of hours and balance impact",
    "growth": "explanation of learning/career progression opportunity",
    "stability": "explanation based on company stage",
    "remote": "explanation of work setup vs preference",
    "brand": "explanation of company prestige impact"
  },
  "strengths": ["strength1", "strength2", "strength3"],
  "weaknesses": ["weakness1", "weakness2", "weakness3"],
  "negotiableItems": ["item1 - specific thing to push for", "item2"],
  "careerImpact": "2-3 sentences on career trajectory impact",
  "reasoning": "2-3 sentences - WHY this recommendation at this score",
  "riskFactors": "key risks if you take this",
  "questions": ["question1 to ask?", "question2 to ask?"]
}`;
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
    const analysis = JSON.parse(cleanJson);
    return res.status(200).json(analysis);
  } catch (error) {
    console.error('Analysis error:', error);
    return res.status(500).json({ error: 'Failed to analyze offer', details: error.message });
  }
}
