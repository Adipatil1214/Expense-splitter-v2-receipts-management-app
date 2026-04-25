import { useEffect, useState } from "react";
import API from "../services/api";

function Expenses() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await API.get("/expenses");
      setData(res.data);
    };
    fetch();
  }, []);

 return (
  <div style={{ color: "#213547" }}>
    <h2>My Expenses</h2>

    {data.map(e => (
      <div
        key={e._id}
        style={{
          border: "1px solid #ccc",
          margin: "10px",
          padding: "10px",
          background: "#fff",
          color: "#213547"
        }}
      >
        <p><b>{e.vendor}</b></p>
        <p>₹ {e.amount}</p>
        <p>Status: {e.status}</p>
      </div>
    ))}
  </div>
);
}

export default Expenses;