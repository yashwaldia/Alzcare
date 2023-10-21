import React,{useState, useEffect} from 'react'
import "./Home.css";
function Home() {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };
  const scrollFunction = () => {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', scrollFunction);
    return () => {
      window.removeEventListener('scroll', scrollFunction);
    };
  }, []);

  return (
    <div className='dabba'>
      <div className='dabba2'>
        <img src='Comp 1.gif'/>
        </div>
        <h4>
        "Empathy in Every Interaction"
        </h4>
      </div>
  )
}

export default Home;
