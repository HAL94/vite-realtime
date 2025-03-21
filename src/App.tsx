import { useEffect, useState } from "react";
import client from "./socket-client";
import './App.css';


client.onMessage<{ result: number[] }>("/ws/u1", (data) => {
  console.log("got stat", data);
});

function App() {  
  const [value, setValue] = useState<string | undefined>(undefined)

  useEffect(() => {
    client.onMessage("/ws", (data) => {
      console.log("got message", data);
    });
  }, []);

  return <div>
    <label>Score</label>
    <input value={value} onChange={(event) => setValue(event?.target.value)}/>
    <button onClick={() => {
      if (value) {
        client.send('/ws', parseFloat(value))
      }
    }}>Submit Score</button>
  </div>;
}

export default App;
