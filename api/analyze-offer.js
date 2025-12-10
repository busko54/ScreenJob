// SALARY DATA FUNCTIONS
const occupationMap = {
  // TECH & ENGINEERING - Software
  'software|developer|programmer|coder|software engineer': 'OES151131',
  'frontend|react|vue|angular|web developer': 'OES151131',
  'backend|api|server|nodejs|python developer': 'OES151131',
  'fullstack|full stack': 'OES151131',
  'mobile|ios|android|flutter|react native': 'OES151131',
  'game developer|unity|unreal': 'OES151131',
  'embedded|firmware|embedded systems': 'OES172199',
  'c\\+\\+|c#|java developer': 'OES151131',
  
  // TECH & ENGINEERING - Data & AI
  'data scientist|data science': 'OES151132',
  'data engineer|etl': 'OES151132',
  'machine learning|ml engineer|ai': 'OES151132',
  'analytics|analyst|business analyst': 'OES151111',
  'bi|business intelligence': 'OES151132',
  'data analyst': 'OES151111',
  'research scientist|ml research': 'OES151132',
  
  // TECH & ENGINEERING - Infrastructure
  'devops|devops engineer': 'OES151131',
  'cloud engineer|aws|azure|gcp': 'OES151131',
  'infrastructure|infra engineer': 'OES151131',
  'site reliability|sre': 'OES151131',
  'platform engineer': 'OES151131',
  'database|dba|sql': 'OES151131',
  'systems engineer|system admin': 'OES151141',
  
  // TECH & ENGINEERING - Security
  'security|infosec|cybersecurity|security engineer': 'OES151141',
  'soc|security operations|security analyst': 'OES151141',
  'incident response|incident handler': 'OES151141',
  'penetration tester|pentester|ethical hacker': 'OES151141',
  'threat analyst|threat intelligence': 'OES151141',
  'security architect|security lead': 'OES151141',
  'application security|appsec': 'OES151141',
  'network security': 'OES151141',
  
  // TECH & ENGINEERING - QA & Testing
  'qa|quality assurance|qc': 'OES151151',
  'test engineer|automation engineer': 'OES151151',
  'quality engineer|qa engineer': 'OES151151',
  'performance testing|load testing': 'OES151151',
  
  // TECH & ENGINEERING - Product & Design
  'product manager|pm|product lead': 'OES113021',
  'product owner': 'OES113021',
  'technical product manager|tpm': 'OES113021',
  'designer|ui designer|ux designer': 'OES151191',
  'graphic designer|visual designer': 'OES151191',
  'design system|design lead': 'OES151191',
  'product designer': 'OES151191',
  'ux researcher|user research': 'OES151191',
  
  // TECH & ENGINEERING - Architecture & Leadership
  'architect|technical architect|solutions architect': 'OES172199',
  'engineering manager|tech lead': 'OES113051',
  'vp engineering|head of engineering': 'OES111011',
  'cto|chief technology officer': 'OES111011',
  
  // TECH & ENGINEERING - Other
  'technical writer|documentation': 'OES131011',
  'developer advocate|developer relations': 'OES113031',
  'solutions engineer|solution architect': 'OES172199',
  'systems analyst|computer analyst': 'OES151141',
  
  // MANAGEMENT & EXECUTIVE
  'manager|director|head of': 'OES113051',
  'senior manager|senior director': 'OES113051',
  'vp|vice president|president': 'OES111011',
  'executive|ceo|cfo|coo|cto': 'OES111011',
  'c-level|c suite': 'OES111011',
  'general manager|gm': 'OES113051',
  'operations manager|ops manager': 'OES113021',
  'program manager': 'OES113031',
  'project manager|pm': 'OES113031',
  'scrum master|agile coach': 'OES113031',
  
  // SALES & BUSINESS DEVELOPMENT
  'sales|account executive|sales rep|ae': 'OES411011',
  'business development|bd': 'OES411011',
  'account manager|account executive': 'OES411011',
  'inside sales|sales development rep|sdr': 'OES411011',
  'enterprise sales': 'OES411011',
  'sales engineer': 'OES411011',
  'customer acquisition': 'OES411011',
  'partnership manager|business partner': 'OES411011',
  
  // MARKETING & COMMUNICATIONS
  'marketing|marketing manager': 'OES113031',
  'growth|growth manager|growth hacker': 'OES113031',
  'digital marketing|content marketing': 'OES113031',
  'brand manager|brand marketing': 'OES113031',
  'product marketing|demand generation': 'OES113031',
  'marketing specialist': 'OES113031',
  'seo|sem|ppc': 'OES113031',
  'social media manager|community manager': 'OES113031',
  'public relations|pr|communications': 'OES271012',
  'copywriter|technical writer': 'OES131011',
  'creative director': 'OES131191',
  
  // FINANCE & ACCOUNTING
  'accountant|accounting': 'OES132011',
  'cpa|certified public accountant': 'OES132011',
  'financial analyst|finance analyst': 'OES131080',
  'accounts payable|accounts receivable': 'OES432011',
  'controller|financial controller': 'OES111011',
  'treasurer|tax manager': 'OES132011',
  'auditor|internal audit': 'OES131080',
  'fx analyst|financial reporting': 'OES131080',
  'investment analyst': 'OES131151',
  
  // HR & RECRUITING
  'human resources|hr': 'OES113061',
  'recruiter|recruiting': 'OES113061',
  'talent acquisition|talent recruit': 'OES113061',
  'talent manager|talent development': 'OES113061',
  'people manager|people operations': 'OES113061',
  'hr manager|human resources manager': 'OES113061',
  'compensation|benefits': 'OES113061',
  'employee relations': 'OES113061',
  
  // CUSTOMER SUCCESS & SUPPORT
  'customer success|cs': 'OES435122',
  'customer support|support specialist': 'OES435122',
  'customer service|csr|customer care': 'OES435122',
  'technical support|support engineer': 'OES151151',
  'account specialist': 'OES435122',
  'support manager': 'OES113051',
  'customer experience|cx': 'OES113031',
  'onboarding specialist': 'OES435122',
  
  // HEALTHCARE
  'nurse|rn|lpn|registered nurse': 'OES291061',
  'nurse practitioner|np|pa': 'OES291071',
  'doctor|physician|md|dds': 'OES291071',
  'surgeon|surgical': 'OES291071',
  'dentist': 'OES291021',
  'therapist|physical therapy|pt': 'OES291031',
  'occupational therapy|ot': 'OES291031',
  'speech pathologist|speech therapy': 'OES291031',
  'mental health|counselor|psychologist': 'OES191031',
  'healthcare administrator|hospital administrator': 'OES111011',
  'pharmacist': 'OES291023',
  'pharmacy technician': 'OES292052',
  'medical assistant': 'OES319091',
  'clinical coordinator': 'OES435031',
  'lab technician|medical technologist': 'OES291011',
  'radiology technician|xray': 'OES291052',
  'ultrasound technician': 'OES291052',
  'emt|paramedic': 'OES291031',
  
  // EDUCATION
  'teacher|instructor|educator|professor': 'OES252021',
  'university professor|faculty': 'OES251021',
  'high school teacher|middle school': 'OES252021',
  'elementary teacher': 'OES252021',
  'special education|special ed': 'OES252021',
  'school administrator|principal|headmaster': 'OES111011',
  'curriculum specialist': 'OES252021',
  'instructional designer|learning designer': 'OES131151',
  'academic coordinator': 'OES435031',
  
  // LEGAL
  'lawyer|attorney|counsel': 'OES231011',
  'paralegal|legal assistant': 'OES435033',
  'legal counsel': 'OES231011',
  'in-house counsel': 'OES231011',
  'contract attorney': 'OES231011',
  'legal manager': 'OES231011',
  'compliance officer|compliance manager': 'OES113031',
  'regulatory affairs': 'OES113031',
  
  // CONSULTING
  'consultant|strategy consultant': 'OES131151',
  'management consultant': 'OES131151',
  'strategy|strategic planning': 'OES131151',
  'management consulting': 'OES131151',
  
  // OPERATIONS & LOGISTICS
  'operations|operations specialist': 'OES113021',
  'supply chain|logistics': 'OES131151',
  'procurement|sourcing': 'OES131151',
  'warehouse|inventory management': 'OES537062',
  'production manager|manufacturing': 'OES113051',
  'quality manager|quality assurance': 'OES113051',
  
  // RESEARCH & SCIENCE
  'research scientist|researcher': 'OES191021',
  'lab technician|laboratory technician': 'OES291011',
  'scientist|chemist|physicist': 'OES191021',
  'research engineer': 'OES172199',
  
  // REAL ESTATE & PROPERTY
  'real estate agent|realtor': 'OES419023',
  'property manager': 'OES113071',
  'leasing agent': 'OES419023',
  
  // FINANCE & BANKING
  'banker|bank teller': 'OES432011',
  'loan officer|mortgage specialist': 'OES131031',
  'investment banker': 'OES131151',
  'financial advisor|wealth management': 'OES131051',
  'trader|stock trader': 'OES131031',
  
  // HOSPITALITY & FOOD SERVICE
  'chef|cook|kitchen': 'OES352011',
  'restaurant manager|food service manager': 'OES113051',
  'hotel manager|hospitality manager': 'OES113051',
  'bartender|waiter|server': 'OES311011',
  'event manager|event coordinator': 'OES131151',
  'concierge': 'OES435032',
  
  // TRANSPORTATION & LOGISTICS
  'driver|truck driver': 'OES537023',
  'pilot|airline pilot': 'OES532011',
  'dispatcher': 'OES435031',
  
  // CONSTRUCTION & TRADES
  'electrician': 'OES472111',
  'plumber': 'OES472151',
  'hvac technician': 'OES473051',
  'carpenter|construction': 'OES472051',
  'contractor|general contractor': 'OES110101',
  
  // MANUFACTURING & PRODUCTION
  'machinist|machine operator': 'OES512092',
  'assembly line|production worker': 'OES512091',
  'maintenance technician|maintenance engineer': 'OES491011',
  
  // ADMINISTRATIVE & OFFICE
  'administrative|admin assistant|office manager': 'OES435031',
  'executive assistant|ea': 'OES435031',
  'data entry|data specialist': 'OES435031',
  'receptionist': 'OES435031',
  'secretary': 'OES435031',
  
  // GOVERNMENT & PUBLIC SERVICE
  'government|civil service': 'OES131151',
  'policy analyst|policy': 'OES131151',
  'social worker': 'OES211091',
  'public health': 'OES191091',
  
  // NONPROFIT & COMMUNITY
  'nonprofit|ngo': 'OES131151',
  'grant writer|fundraiser': 'OES131151',
  'program manager|program coordinator': 'OES131151',
  
  // GENERAL FALLBACK
  'coordinator|specialist|associate': 'OES131151',
};

async function fetchBLSSalaryData(jobTitle) {
  try {
    const jobLower = jobTitle.toLowerCase();
    let occupationCode = 'OES000000'; // Default fallback

    // Find matching occupation code using keyword matching
    for (const [keywords, code] of Object.entries(occupationMap)) {
      const keywordList = keywords.split('|');
      if (keywordList.some(k => jobLower.includes(k.trim()))) {
        occupationCode = code;
        break;
      }
    }

    const response = await fetch('https://api.bls.gov/publicAPI/v2/timeseries/data/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        seriesid: [occupationCode],
        startyear: 2023,
        endyear: 2024
      })
    });

    if (!response.ok) throw new Error('BLS API error');
    
    const data = await response.json();

    if (data.Results && data.Results.series && data.Results.series[0] && data.Results.series[0].data && data.Results.series[0].data.length > 0) {
      const salaryStr = data.Results.series[0].data[0].value;
      const salary = parseInt(salaryStr);

      return {
        median: salary,
        low: Math.round(salary * 0.8),
        high: Math.round(salary * 1.2),
        source: 'BLS (Bureau of Labor Statistics)'
      };
    }
  } catch (error) {
    console.log('BLS API failed, using fallback:', error);
  }
  return null;
}

function getSalaryData(jobTitle) {
  fetchBLSSalaryData(jobTitle).then(data => {
    if (data) {
      global.lastBLSData = data;
    }
  });

  const ranges = {
    'engineer': { low: 90000, high: 250000, median: 160000, source: 'estimate' },
    'manager': { low: 110000, high: 280000, median: 180000, source: 'estimate' },
    'designer': { low: 80000, high: 180000, median: 130000, source: 'estimate' },
    'product': { low: 100000, high: 250000, median: 170000, source: 'estimate' },
    'developer': { low: 85000, high: 220000, median: 150000, source: 'estimate' },
    'analyst': { low: 70000, high: 180000, median: 120000, source: 'estimate' },
    'architect': { low: 120000, high: 300000, median: 200000, source: 'estimate' },
    'nurse': { low: 60000, high: 120000, median: 85000, source: 'estimate' },
    'default': { low: 60000, high: 180000, median: 110000, source: 'estimate' }
  };

  const key = Object.keys(ranges).find(k => jobTitle.toLowerCase().includes(k)) || 'default';
  return ranges[key];
}

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

CRITICAL - QUALIFICATION CHECK FIRST:
Before analyzing the offer, check if the candidate meets job requirements:
1. Flag HARD REQUIREMENTS missing (clearances, licenses, degrees required)
2. Flag if underqualified on years of experience (>30% gap = major red flag)
3. Flag if missing critical certifications listed as required
4. If missing 2+ hard requirements: Recommend PASS or CONDITIONAL, NOT TAKE
5. Add qualification concerns to "weaknesses" section

STRENGTHS SECTION RULE - IMPORTANT:
- If candidate is QUALIFIED (meets 80%+ of requirements): List job offer strengths (salary competitiveness, benefits, growth potential, work-life balance improvements)
- If candidate is UNQUALIFIED (missing 2+ hard requirements): List ONLY job offer benefits like "Excellent salary: $X/year (Yth percentile)", "Good work-life balance: X hrs/week", "Strong benefits package (health, dental, 401k, housing)"
- NEVER list candidate background strengths (certs, experience, GPA) in the strengths section if they are unqualified for the role
- Always be specific with numbers and percentages

RECOMMENDATION RULES:
- TAKE (8-10/10): Meets 80%+ of requirements + aligns with priorities + good salary + minimal downsides
- NEGOTIATE (5-7/10): Meets requirements BUT missing benefits/terms OR minor qualification gaps that can be overlooked
- CONDITIONAL (4-7/10): Missing hard requirements BUT company offers sponsorship/training to get them
- PASS (0-4/10): Missing critical requirements with no sponsorship OR too many fundamental misalignments

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
  "recommendation": "TAKE|PASS|NEGOTIATE|CONDITIONAL",
  "score": 0-10,
  "confidence": 0-100,
  "scoringBreakdown": {
    "salary": "explanation with percentage change and market position",
    "workLife": "explanation of hours and balance impact",
    "growth": "explanation of learning/career progression opportunity",
    "stability": "explanation based on company stage",
    "remote": "explanation of work setup vs preference",
    "brand": "explanation of company prestige impact",
    "qualifications": "analysis of whether candidate meets job requirements"
  },
  "strengths": ["If qualified: job benefits/opportunity strengths. If unqualified: ONLY list offer benefits with numbers like salary percentile, hours, benefits package"],
  "weaknesses": ["List ALL qualification gaps, missing hard requirements, and career misalignments. Be specific about what's missing."],
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
    
    // Get salary data
    const salaryData = getSalaryData(job.jobTitle);
    
    return res.status(200).json({ ...analysis, salaryData });
  } catch (error) {
    console.error('Analysis error:', error);
    return res.status(500).json({ error: 'Failed to analyze offer', details: error.message });
  }
}
