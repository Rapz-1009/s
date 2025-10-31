import { serialize } from 'cookie';

export default function handler(req, res) {
  res.setHeader('Set-Cookie', serialize('session', '', { path: '/', httpOnly: true, maxAge: 0 }));
  res.status(200).json({ success: true });
}