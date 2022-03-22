import React from "react";

const Tweet = ({ tweetObj, isOwner }) => {
  return (
    <li>
      <h4>{tweetObj.tweet}</h4>
      {isOwner && (
        <>
          <button>delete</button>
          <button>edit</button>
        </>
      )}
    </li>
  );
};

export default Tweet;
