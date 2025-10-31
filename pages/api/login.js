import { serialize } from 'cookie';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { password } = req.body;
    if (password === process.env.OWNER_PASSWORD) {
      res.setHeader('Set-Cookie', serialize('session', 'active', { path: '/', httpOnly: true, maxAge: 3600 }));
      return res.status(200).json({ success: true });
    }
    return res.status(401).json({ error: 'Unauthorized' });
  } else if (req.method === 'GET') {
    const cookie = req.headers.cookie || '';
    if (cookie.includes('session=active')) return res.status(200).end();
    return res.status(401).end();
  }
}