import { useState, useEffect } from 'react'
import "./App.css"

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState([]);
  const [error, setError] = useState(null);
  const [apiStatus, setApiStatus] = useState(null)

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      // status
      const statusRes = await fetch(`${API_URL}/status`);
      if (!statusRes.ok) throw new Error("Status endpoint error");
      const statusData = await statusRes.json();
      setApiStatus(statusData);

      // items
      const itemsRes = await fetch(`${API_URL}/items`);
      if (!itemsRes.ok) throw new Error("Items endpoint error");
      const itemsData = await itemsRes.json();
      setItems(itemsData);
    } catch (err) {
      console.error(err);
      setError(err.message);
      setApiStatus({ status: "ERROR", message: "API unreachable" });
      setItems([]);
    } finally {
      setLoading(false);
    }
  }
  
  useEffect(() => {
    fetchData();
    // // fetch api status
    // fetch(`${API_URL}/status`)
    //   .then(res => {
    //     if (!res.ok) throw new Error('API error')
    //     return res.json()
    //   })
    //   .then(data => setApiStatus(data))
    //   .catch(err => console.error('Status fetch error:', err))

    // // fetch items from db
    // fetch(`${API_URL}/items`)
    //   .then((res) => {
    //     if (!res.ok) throw new Error('API error');
    //     return res.json();
    //   })
    //   .then((data) => {
    //     setItems(data);
    //     setLoading(false);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //     setError(err.message);
    //     setLoading(false);
    //   });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='container'>
      <header className='header'>  
        <h1>TD</h1>
        <button className='refresh-btn' onClick={fetchData} disabled={loading}>
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </header>

      {apiStatus && (
        <div className={`status ${apiStatus?.status === "OK" ? "ok" : "error"}`}>
          <span className='dot' />
          <strong>{apiStatus?.status}</strong>
          <span>{apiStatus?.message}</span>
        </div>
      )}
      
      <div className='card'>
        <h2>Items in database</h2>

        {items.length === 0 ? (
          <p>No items found in database.</p>
        ) : (
          <ul className='items'>
            {items.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
