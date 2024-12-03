import React, { useContext } from "react";
import { GlobalContext } from "../../context/index.jsx";

const Home = () => {
  const { state } = useContext(GlobalContext); // Access context

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
};

export default Home;
