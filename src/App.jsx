import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const initials = (name) =>
    name.split(' ').map(word => word[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className="page">
      <header className="topbar">
        <div className="brand">Meridian&nbsp;Partners</div>
        <nav className="nav">Team Directory</nav>
      </header>

      <section className="hero">
        <h1>Our Team</h1>
        <p>Meet the people behind Meridian Partners — search the directory below.</p>
        <input
          type="text"
          className="search"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>

      <main className="grid">
        {filteredUsers.map(user => (
          <div className="card" key={user.id}>
            <div className="avatar">{initials(user.name)}</div>
            <h2>{user.name}</h2>
            <p className="role">{user.company.catchPhrase}</p>
            <div className="meta">
              <span>{user.email}</span>
              <span>{user.company.name}</span>
            </div>
          </div>
        ))}
        {filteredUsers.length === 0 && (
          <p className="empty">No team members match "{search}".</p>
        )}
      </main>

      <footer className="footer">
        © 2026 Keegan Sanger — Built with React
      </footer>
    </div>
  );
}

export default App;