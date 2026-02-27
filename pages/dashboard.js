import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [number, setNumber] = useState('');
  const [token, setToken] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    fetch('/api/login').then(res => {
      if (res.ok) setLoggedIn(true);
      else window.location.href = '/';
    });
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ number })
    });
    const data = await res.json();
    if (res.ok) setToken(data.token);
    else alert(data.error || 'Gagal upload!');
  };

  const handleLogout = async () => {
    await fetch('/api/logout');
    window.location.href = '/';
  };

  if (!loggedIn) return <p style={{color:'#fff',textAlign:'center',marginTop:'40vh'}}>Loading...</p>;

  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'100vh',background:'#0d1117',color:'#fff'}}>
      <h2>📱 Masukan Nomor Bot</h2>
      <form onSubmit={handleUpload} style={{display:'flex',flexDirection:'column',gap:'10px',width:'250px'}}>
        <input type="text" placeholder="+628xxx..." value={number} onChange={(e)=>setNumber(e.target.value)} style={{padding:'8px',borderRadius:'6px'}}/>
        <button type="submit" style={{padding:'8px',borderRadius:'6px',background:'#1f6feb',color:'#fff',border:'none'}}>Upload</button>
      </form>

      {token && (
        <div style={{marginTop:'20px',background:'#161b22',padding:'10px',borderRadius:'8px'}}>
          <p>✅ Token unik kamu:</p>
          <code>{token}</code>
        </div>
      )}

      <button onClick={handleLogout} style={{marginTop:'20px',background:'#da3633',color:'#fff',padding:'6px 12px',borderRadius:'6px',border:'none'}}>
        Keluar
      </button>
    </div>
  );
}