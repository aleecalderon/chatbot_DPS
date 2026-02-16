import React from "react";

function Message({ text, sender }) {
  return (
    <div className={sender === "bot" ? "bot-message" : "user-message"}>
      {text}
    </div>
  );
}

export default Message;
