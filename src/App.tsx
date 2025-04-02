import { useEffect, useState } from "react";
import client from "./socket-client";
import "./App.css";
// import useGetMessage from "./socket-client/use-get-message";
import LoginForm from "./forms/login";
import API from "./api-client";
import { GET } from "./api-client/helpers";

function App() {
  const [value, setValue] = useState<string | undefined>(undefined);
  // const { data: scores } = useGetMessage<{ result: number[] }>("/u1");

  useEffect(() => {
    API.get(GET("/auth/me"))
      .then(() => {})
      .catch(() => {});
  }, []);

  return (
    <div>
      <label>Score</label>
      <input
        value={value}
        onChange={(event) => setValue(event?.target.value)}
      />
      <button
        onClick={() => {
          if (value) {
            client.send("/", parseFloat(value));
          }
        }}
      >
        Submit Score
      </button>
      <div className="flex gap-4 justify-center items-center container">
        {/* {scores &&
          scores.result.map((score, index) => <span key={index}>{score}</span>)} */}
      </div>
      <LoginForm />
    </div>
  );
}

export default App;
