import React, { useState } from "react";
import "../styles/Chatbot.css";
// IMPORTANTE: Asegúrate de que el archivo respuestas.js exista en esta ruta
import { baseDeDatos } from "../data/respuestas"; 

function Chatbot() {
  // Estado para almacenar el historial de la conversación 
  const [messages, setMessages] = useState([
    { text: "¡Hola! Soy el asistente virtual de la UDB. ¿En qué puedo ayudarte?", sender: "bot" }
  ]);

  // Estado para controlar lo que el usuario escribe en el cuadro de texto 
  const [inputValue, setInputValue] = useState("");

  // Función principal para generar respuestas automáticas 
  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    // 1. Guardar el mensaje del usuario en el chat
    const userMessage = { text: inputValue, sender: "user" };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);

    // 2. Lógica de detección de palabras clave (NLP Básico) 
    const cleanInput = inputValue.toLowerCase();
    let botResponse = "Lo siento, no entiendo tu pregunta. Prueba consultando sobre 'horarios', 'estrés' o 'pasantías'.";

    // Buscar en la base de datos si alguna palabra clave coincide 
    const match = baseDeDatos.find(item => 
      item.keywords.some(key => cleanInput.includes(key))
    );

    if (match) {
      botResponse = match.respuesta;
    }

    // 3. Simular un pequeño retraso para que parezca natural y agregar respuesta del bot 
    setTimeout(() => {
      setMessages([...newMessages, { text: botResponse, sender: "bot" }]);
    }, 600);

    setInputValue(""); // Limpiar el campo de texto
  };

  // Función para enviar con la tecla Enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSendMessage();
  };

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

      {/* Control de entrada para que el usuario escriba */}
      <div className="input-area">
        <input
          type="text"
          placeholder="Escribe tu consulta aquí..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSendMessage}>Enviar</button>
      </div>
    </div>
  );
}

export default Chatbot;