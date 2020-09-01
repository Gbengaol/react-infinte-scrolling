import React from "react";
import truncateText from "./truncateText";

const Card = ({ book: { title, publish_date, publisher }, reference }) => {
  return (
    <div className="card-item" ref={reference}>
      <h3>Title: {truncateText(title, 100)}</h3>
      <h4>Published by: {truncateText(publisher, 100)}</h4>
      <h5>Published On: {publish_date}</h5>
    </div>
  );
};

export default Card;
