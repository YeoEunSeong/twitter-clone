import React, { useState } from "react";

const Home = (props) => {
  const [tweet, setTweet] = useState("");
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setTweet(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(tweet);
  };
  return (
    <>
      <h1> Home</h1>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          maxLength={120}
          placeholder="What's on your mind?"
        />
        <button>submit</button>
      </form>
    </>
  );
};

export default Home;
