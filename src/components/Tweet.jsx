import React, { useState } from "react";
import { deleteTweet, updateTweet } from "fbase";

const Tweet = ({ tweetObj, isOwner }) => {
  const [edtting, setEditting] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.tweet);

  const onDeleteClick = (e) => {
    deleteTweet(tweetObj.id);
  };

  const toggleEditting = () => {
    setEditting((editting) => !editting);
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
            <button>cancle</button>
          </form>
        </>
      ) : (
        <>
          <h4>{tweetObj.tweet}</h4>
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
