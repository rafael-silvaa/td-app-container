import { useState, useEffect } from 'react'

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState([]);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/items`)
      .then((res) => {
        if (!res.ok) throw new Error('API error');
        return res.json();
      })
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>TD Items</h1>
      {items.length === 0 ? (
        <p>No items found in database.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <strong>{item.name}</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
