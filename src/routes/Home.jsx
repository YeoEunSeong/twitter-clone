import React, { useEffect, useState } from "react";
import Tweet from "components/Tweet";
import { addTweet, dbService } from "fbase";
import { collection, onSnapshot } from "firebase/firestore";

const Home = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);

  const getTweet = async () => {
    onSnapshot(collection(dbService, "tweets"), (snapshot) => {
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
    addTweet(tweet, userObj.uid);
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
          <Tweet
            key={tweet.id}
            tweetObj={tweet}
            isOwner={userObj.uid === tweet.creatorId}
          />
        ))}
      </ul>
    </>
  );
};

export default Home;
