// /api/extract-from-url.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'No URL provided' });
  }

  try {
    // Validate URL
    new URL(url);

    // Fetch the webpage
const response = await fetch(url, {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
  }
});    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);


    const html = await response.text();

    // Extract main content (remove scripts, styles, etc)
    const cleanContent = html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .substring(0, 4000); // Limit to 4000 chars

    return res.status(200).json({ content: cleanContent });
  } catch (error) {
    console.error('URL fetch error:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch URL',
      details: error.message 
    });
  }
}
