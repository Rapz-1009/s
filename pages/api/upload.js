import { Octokit } from '@octokit/rest';
import crypto from 'crypto';

export default async function handler(req, res) {
  const cookie = req.headers.cookie || '';
  if (!cookie.includes('session=active')) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const { number } = req.body;
    if (!number) return res.status(400).json({ error: 'Nomor tidak boleh kosong!' });

    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    const owner = process.env.GITHUB_USER;
    const repo = process.env.GITHUB_REPO;
    const path = 'data.json';

    // ambil data lama
    const { data } = await octokit.repos.getContent({ owner, repo, path });
    const content = Buffer.from(data.content, 'base64').toString();
    const json = JSON.parse(content);

    if (!json.includes(number)) json.push(number);

    const newContent = Buffer.from(JSON.stringify(json, null, 2)).toString('base64');
    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message: `add ${number}`,
      content: newContent,
      sha: data.sha
    });

    // generate token unik (1x pakai)
    const token = crypto.randomBytes(10).toString('hex');
    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Gagal upload ke GitHub!' });
  }
}