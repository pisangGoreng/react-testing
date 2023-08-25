import { useState, useEffect } from "react";
import axios from "axios";

const Form = ({ initialNumber }) => {
  const [count, setCount] = useState(initialNumber);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((response) => {
      setData(response.data);
    });
  }, []);

  return (
    <>
      <form
        style={{
          padding: 20,
          marginTop: 20,
          display: "flex",
          flexDirection: "column",
        }}
        onSubmit={(event) => {
          event.preventDefault();
          console.log("submit clicked");
        }}
      >
        <label>
          nama label
          <input type="text" />
        </label>
        <button style={{ marginTop: 20 }} role="button">
          kucing
        </button>
        <p>submitted</p>

        <p data-testid="count-value">{count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>

        <div>
          {data.map((user) => (
            <div key={user.id}>
              <p>{user.name}</p>
              <p>{user.email}</p>
            </div>
          ))}
        </div>
      </form>
    </>
  );
};

export default Form;
