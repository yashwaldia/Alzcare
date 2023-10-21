import React,{useState} from 'react';
import ChatApp from './Components/Chatroom/ChatApp';
import Navbar from './Components/Navbar/Navbar';
import App2 from './Components/App2';
import Micbtn from './Components/MicBtn/Micbtn';
import Home from './Components/Home/Home';
import RegistrationForm from './Components/RegistrationForm/RegistrationForm';
const App = () => {
  return (
    <div>
      <Navbar />
      <Home />
      <RegistrationForm />
      <ChatApp />
    </div>
  );
};

export default App;