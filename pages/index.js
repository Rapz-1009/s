import { useState } from 'react';

export default function Login() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });
    if (res.ok) {
      window.location.href = '/dashboard';
    } else {
      setError('❌ Password salah!');
    }
  };

  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'100vh',background:'#0d1117',color:'#fff'}}>
      <h2>🔒 Login Owner</h2>
      <form onSubmit={handleLogin} style={{display:'flex',flexDirection:'column',gap:'10px',width:'250px'}}>
        <input type="password" placeholder="Password owner" value={password} onChange={(e)=>setPassword(e.target.value)} style={{padding:'8px',borderRadius:'6px'}}/>
        <button type="submit" style={{padding:'8px',borderRadius:'6px',background:'#238636',color:'#fff',border:'none'}}>Masuk</button>
      </form>
      {error && <p style={{color:'red'}}>{error}</p>}
    </div>
  );
}