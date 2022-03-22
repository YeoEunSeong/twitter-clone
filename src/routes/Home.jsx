import React, { useEffect, useState } from "react";
import { addTweet, dbService } from "fbase";
import { collection, getDocs, onSnapshot } from "firebase/firestore";

const Home = (props) => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);

  const getTweet = async () => {
    const unsub = onSnapshot(collection(dbService, "tweets"), (snapshot) => {
      const _tweets = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTweets(_tweets);
    });
  };

  useEffect(() => {
    getTweet();
  }, []);

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setTweet(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addTweet(tweet);
    setTweet("");
  };

  return (
    <>
      <h1> Home</h1>
      <form onSubmit={onSubmit}>
        <input
          value={tweet}
          onChange={onChange}
          type="text"
          maxLength={120}
          placeholder="What's on your mind?"
        />
        <button>submit</button>
      </form>
      <ul>
        {tweets.map((tweet) => (
          <li key={tweet.id}>{tweet.tweet}</li>
        ))}
      </ul>
    </>
  );
};

export default Home;
