import React, { useEffect, useState } from "react";
import Tweet from "components/Tweet";
import { addTweet, dbService, uploadImage, getUrl } from "fbase";
import { collection, onSnapshot } from "firebase/firestore";

const Home = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  const [attatchment, setAttachment] = useState("");

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

  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;

    const filereader = new FileReader();

    filereader.onloadend = ({ target: { result } }) => {
      setAttachment(result);
    };
    filereader.readAsDataURL(files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let url = "";

    if (attatchment !== "") {
      const {
        metadata: { fullPath },
      } = await uploadImage(userObj.uid, attatchment);
      url = await getUrl(fullPath);
    }

    addTweet(tweet, url, userObj.uid);
    setTweet("");
    setAttachment("");
  };

  const onClearAttachment = (e) => {
    setAttachment(null);
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
        <input onChange={onFileChange} type="file" accept="image/*" />
        <button>submit</button>
      </form>
      {attatchment && (
        <>
          <img src={attatchment} alt="imgae preview" />
          <button onClick={onClearAttachment} type="button">
            clear
          </button>
        </>
      )}
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
