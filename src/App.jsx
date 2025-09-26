import { useEffect, useState } from "react";
import Timeline from "./Timeline";

function App() {
  const [data, setData] = useState(null);

  const fetchData = () => {
    fetch(`${import.meta.env.BASE_URL}data/data.json`)
      .then((res) => res.json())
      .then((json) => setData(json));
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!data) return <div className="p-8">טוען...</div>;

  return (
    <div className="p-8" dir="rtl">
      <h1 className="text-3xl font-bold mb-8">🕰️ ציר הזמן של הסוגיות</h1>
      <button
        onClick={fetchData}
        className="px-3 py-1 mb-4 bg-gray-200 rounded hover:bg-gray-300"
      >
        🔄 רענן נתונים
      </button>
      <Timeline data={data} />
    </div>
  );
}

export default App;

