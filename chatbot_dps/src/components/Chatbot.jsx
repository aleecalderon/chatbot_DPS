import React, { useState } from "react";
import "../styles/Chatbot.css";

function Chatbot() {
  const [messages, setMessages] = useState([
    { text: "¡Hola! Soy el asistente virtual. ¿En qué puedo ayudarte?", sender: "bot" }
  ]);

  return (
    <div className="chat-container">
      <h2>Chatbot Soporte Estudiantil</h2>

      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === "bot" ? "bot-message" : "user-message"}>
            {msg.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Chatbot;
