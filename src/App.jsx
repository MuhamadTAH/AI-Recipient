import { useState } from 'react'
import './App.css'

function App() {
  return (
    <div className="App">
      <div className="container">
        <h1>AI Receipt App</h1>
        <div className="bottom-nav">
          <div className="nav-item active">
            Cook
          </div>
        </div>
        <div className="chat-container">
          <div className="chat-messages">
            <div className="message bot-message">
              Hello! I'm Claude, your AI cooking assistant. How can I help you today?
            </div>
          </div>
          <div className="chat-input-container">
            <input
              type="text"
              placeholder="Type your message..."
              className="chat-input"
            />
            <button className="send-button">Send</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App