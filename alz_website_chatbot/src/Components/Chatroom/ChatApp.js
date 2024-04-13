import React, { useState, useRef, useEffect } from 'react';
import './ChatApp.css'; // Import your CSS file for styling
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useSpeechSynthesis } from 'react-speech-kit';

const ChatBubble = ({ text, isUser, gifLink }) => (
  <div className={`chat-bubble ${isUser ? 'user' : 'bot'}`}>
    {gifLink === "" ?
      <h3>{text}</h3> : <img className="gif" src={gifLink} alt="gif" />}
  </div>
);

const ChatContainer = ({ chatHistory }) => {
  const chatEndRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom when chat history updates
    chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  return (
    <div className="chat-container">
      {chatHistory.map((message, index) => (
        <div key={index} className={`message ${message.isUser ? 'user-message' : 'ai-message'}`}>
          {message.isLoading ? (
            <ChatBubble text={""} isUser={message.isUser} gifLink={"https://media.tenor.com/NqKNFHSmbssAAAAi/discord-loading-dots-discord-loading.gif"} />
          ) : (
            <ChatBubble text={message.text} isUser={message.isUser} gifLink={""} />
          )}
        </div>
      ))}
      <div ref={chatEndRef} />
    </div>
  );
};

const ChatApp = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const { speak, voices } = useSpeechSynthesis();

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    setInputValue(transcript);
  }, [transcript]);

  const handleUserMessage = async (userText) => {
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { text: userText, isUser: true }
    ]);

    try {
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { isLoading: true, isUser: false }
      ]);

      // Check if the user's input contains the trigger phrase
      if (userText.toLowerCase().includes("what's the date and time")) {
        // Fetch current date and time
        const currentDate = new Date();
        const currentDayOfMonth = currentDate.getDate();
        const currentMonth = currentDate.getMonth() + 1; // Months are zero-based
        const currentYear = currentDate.getFullYear();
        const currentHours = currentDate.getHours();
        const currentMinutes = currentDate.getMinutes();

        // Format the date and time
        const dateTimeString = `Today's date and time is ${currentDayOfMonth}-${currentMonth}-${currentYear} ${currentHours}:${currentMinutes}`;

        // Update the chat history with the current date and time
        setChatHistory((prevHistory) => [
          ...prevHistory,
          { text: dateTimeString, isUser: false },
        ]);
      } else {
        // User's input does not contain the trigger phrase, send the input to the backend for processing
        const response = await fetch('http://localhost:3002/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ input: userText })
        });

        const data = await response.json();
        const aiResponse = data.aiResponse;

        resetTranscript();
        setChatHistory((prevHistory) => [
          ...prevHistory.slice(0, -1), // Remove the loading animation
          { text: aiResponse, isUser: false },
        ]);

        // Perform text-to-speech synthesis for the AI response
        speak({ text: aiResponse, voice: voices[2] });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const startSpeech = () => {
    SpeechRecognition.startListening();
    setInputValue(transcript);
  };

  const sendSOSMessage = async () => {
    const accountSid = 'accsid';
    const authToken = 'token';
    const phoneNumber = 'number';
    const message = 'SOS! Help needed! My live loation is "LOCATION"';

    try {
      const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(`${accountSid}:${authToken}`)
        },
        body: new URLSearchParams({
          To: phoneNumber,
          From: 'number', // Replace with your Twilio phone number
          Body: message
        })
      });

      if (response.ok) {
        alert('SOS message sent successfully!');
      } else {
        alert('Failed to send SOS message. Please try again later.');
      }
    } catch (error) {
      console.error('Error sending SOS message:', error);
      alert('Failed to send SOS message. Please try again later.');
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className="chat-app">
      <div className='cont'>
        <ChatContainer chatHistory={chatHistory} />
        <div className='inp-button'>
          <label className="custom-field">
            <input
              type="text"
              placeholder="&nbsp;"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleUserMessage(e.target.value);
                  setInputValue("");
                }
              }} />
            <span className="placeholder">Enter Prompt</span>
          </label>

          {inputValue ? (
            <button
              className="send-button"
              onClick={() => {
                handleUserMessage(inputValue);
                setInputValue('');
              }}
            >
              Send
            </button>
          ) : (
            <div className="container2">
              <div href="#" className="button active pushed mic2" onClick={startSpeech} id="pushed">
                <img className='mic' src='mic2.png' alt="mic" />
              </div>
            </div>
          )}

          {/* SOS button */}
          <button id="sosButton" onClick={sendSOSMessage}>SOS</button>
        </div>
      </div>
      <p>Microphone: {browserSupportsSpeechRecognition ? (listening ? 'on' : 'off') : 'not available'}</p>
    </div>
  );
};

export default ChatApp;
