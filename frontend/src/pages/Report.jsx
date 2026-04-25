import { useState } from "react";
import API from "../services/api";

function Report() {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    await API.post("/issues", { subject, description });

    alert("Issue submitted");
    setSubject("");
    setDescription("");
  };

  return (
    <div>
      <h2>Report Issue</h2>

      <input
        placeholder="Subject"
        value={subject}
        onChange={e => setSubject(e.target.value)}
      />

      <br />

      <textarea
        placeholder="Describe your issue"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      <br />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Report;