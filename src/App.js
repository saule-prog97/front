import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [projName, setProjName] = useState("");
  const [text, setText] = useState("");
  const [money, setMoney] = useState("");

  const sendData = async () => {
    const requestBody = {
      nameProject: projName,
      textAboutProject: text,
      collectMoney: +money
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/add-project",
        requestBody
      );
      const data = response.data;
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const getDataProj = async () => {
    try {
      const data = await axios.get("http://localhost:4000/projects");
      console.log(data.data);
    } catch {}
  };

  useEffect(() => {
    getDataProj();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    sendData();

    console.log("Отправленные данные: ", { projName, text, money });
  };
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="projName">name proj:</label>
          <input
            type="text"
            id="projName"
            value={projName}
            onChange={(e) => setProjName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="text">text:</label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="money">money</label>
          <input
            type="number"
            id="money"
            value={money}
            onChange={(e) => setMoney(e.target.value)}
          />
        </div>
        <button type="submit">send</button>
      </form>
    </div>
  );
}

export default App;
