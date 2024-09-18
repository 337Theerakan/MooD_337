import { useState } from 'react';
import './App.css';

function ImageButton({ src, alt, onClick }) {
  return (
    <img 
      className="button-image" 
      src={src} 
      alt={alt} 
      onClick={() => onClick(src)} 
    />
  );
}

export default function App() {
  const [level, setLevel] = useState(1);
  const [message, setMessage] = useState('');
  const [imageSrc, setImageSrc] = useState('/img/H1.jpg');
  const [showSpecialImage, setShowSpecialImage] = useState(false);
  const maxLevel = 100;

  const getImageAndMessage = (newLevel) => {
    if (newLevel >= maxLevel) {
      return { src: '/img/pig.jpg', message: 'หมูเด้งเเบบเด้งจริงๆ' };
    } else if (newLevel >= 50) {
      return { src: '/img/H3.jpg', message: 'หมูเด้งระดับกลาง' };
    } else if (newLevel <= 0) {
      return { src: '/img/dead.jpg', message: 'นอนโลงแล้ว' };
    } else {
      return { src: '/img/H1.jpg', message: 'หมูยังไม่เด้ง' };
    }
  };

  const handleLevelUp = (src) => {
    let newLevel = level;

    switch (src) {
      case "/img/time.jpg": 
        newLevel = 0; 
        setShowSpecialImage(false);
        break;
      case "/img/tomatoes.jpg": 
        newLevel = Math.min(level + 10, maxLevel);
        break;
      case "/img/pineapple.jpg": 
        newLevel = Math.min(level + 20, maxLevel);
        break;
      default:
        newLevel = Math.min(level + 1, maxLevel);
        break;
    }

    const { src: newImageSrc, message: newMessage } = getImageAndMessage(newLevel);

    setLevel(newLevel);
    setImageSrc(newImageSrc);
    setMessage(newMessage);

    if (newMessage === 'หมูเด้งเเบบเด้งจริงๆ') {
      setShowSpecialImage(true);
    }
  };

  const handleSpecialImageClick = () => {
    if (showSpecialImage) {
      setImageSrc('/img/sc.jpg');
      setMessage('สวัสดีครับโผมม "หมูเด้งหมดแล้วนะคับโผมมมม" '); 
      setShowSpecialImage(false); 
    }
  };

  return (
    <div id="root">
      <h2>ระดับ: {level}</h2>
      <p>{message}</p>
      <div className="image-wrapper">
        <img 
          className="main-image" 
          style={{ '--level': level }} 
          src={imageSrc} 
          alt=" " 
          onClick={handleSpecialImageClick} 
        />
      </div>
      <div className="button-container">
        <ImageButton src="/img/gree.jpg" alt="หญ้า" onClick={handleLevelUp} />
        <ImageButton src="/img/tomatoes.jpg" alt="มะเขือเทศ" onClick={handleLevelUp} />
        <ImageButton src="/img/pineapple.jpg" alt="สับปะรด" onClick={handleLevelUp} />
        <ImageButton src="/img/time.jpg" alt="ย้อน" onClick={handleLevelUp} />
      </div>
    </div>
  );
}
