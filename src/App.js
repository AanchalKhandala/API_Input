import React, { useState } from "react";
import axios from "axios";


const App = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [filter, setFilter] = useState([]);

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      const response = await axios.post("https://bajaj-backend-7dnc.onrender.com/bfhl", parsedInput);
      setResponseData(response.data);
    } catch (err) {
      console.error("Error in API call:", err);
      alert("Invalid JSON input or error in API call");
    }
  };

  const renderFilteredData = () => {
    if (!responseData) return null;

    const filtered = {};
    if (filter.includes("Alphabets")) filtered.alphabets = responseData.alphabets;
    if (filter.includes("Numbers")) filtered.numbers = responseData.numbers;
    if (filter.includes("Highest lowercase alphabet"))
      filtered.highest_lowercase_alphabet =
        responseData.highest_lowercase_alphabet;

    return JSON.stringify(filtered, null, 2);
  };

  return (
    <div style={{ padding: "20px" }} >
      <h1>{responseData?.roll_number }</h1>
      <h2>API Input </h2>
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder='Enter JSON input'
        rows={5}
        cols={50}
      />
      <br />
      <button onClick={handleSubmit} style={{backgroundColor:"blue", border:"none", padding:"10px 30px", color:"white", borderRadius:"5px"}}>Submit</button>

      {responseData && (
       <>
       <h3>Filter</h3>
       <select
         value={filter}
         onChange={(e) => setFilter([e.target.value])} // Ensure filter is set as an array
       >
         <option value="">Select a filter</option> {/* Default placeholder */}
         <option value="Alphabets">Alphabets</option>
         <option value="Numbers">Numbers</option>
         <option value="Highest lowercase alphabet">
           Highest lowercase alphabet
         </option>
       </select>
       <pre>{renderFilteredData()}</pre>
     </>
     
      )}
    </div>
  );
};

export default App;
