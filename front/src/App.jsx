import { useState, useEffect } from 'react'

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState([]);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/items`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('API error');
        }
        return res.json();
      })
      .then((data) => {
        setItems(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <h1>TD</h1>
      <div style={{ padding: '2rem' }}>
        <h1>Items</h1>
        <ul>
          {items.map((item) => {
            <li key={item.id}>{item.name}</li>
          })}
        </ul>
      </div>
    </>
  );
}

export default App;
