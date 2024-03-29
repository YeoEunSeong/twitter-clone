import React, { useState } from "react";
import { deleteTweet, deleteImage, updateTweet } from "fbase";

const Tweet = ({ tweetObj, isOwner }) => {
  const [edtting, setEditting] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.tweet);

  const onDeleteClick = (e) => {
    const ok = window.confirm("Are you sure you delete this tweet?");
    if (ok) {
      deleteTweet(tweetObj.id);
      deleteImage(tweetObj.url);
    }
  };

  const toggleEditting = () => {
    setEditting((editting) => !editting);
  };

  const onCancleClick = () => {
    setNewTweet(tweetObj.tweet);
    setEditting(false);
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewTweet(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    updateTweet(tweetObj.id, newTweet);
    setEditting(false);
  };

  return (
    <li>
      {edtting ? (
        <>
          <form onSubmit={onSubmit}>
            <input onChange={onChange} value={newTweet} type="text" />
            <button type="button" onClick={onCancleClick}>
              cancle
            </button>
          </form>
        </>
      ) : (
        <>
          <h4>{tweetObj.tweet}</h4>
          {tweetObj.url && <img src={tweetObj.url} alt="tweet" />}
          {isOwner && (
            <>
              <button onClick={toggleEditting}>edit</button>
              <button onClick={onDeleteClick}>delete</button>
            </>
          )}
        </>
      )}
    </li>
  );
};

export default Tweet;
