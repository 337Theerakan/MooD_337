import { useState } from 'react';
import './App.css';

// 
// eslint-disable-next-line react/prop-types
function ImageButton({ src, alt, onClick }) {
  const handleClick = () => {
    if (onClick) {
      onClick(src); 
    }
  };

  return (
    <img 
      className="button-image" 
      src={src} 
      alt={alt} 
      onClick={handleClick} 
      onError={(e) => e.target.src = './img/placeholder.jpg'} 
      aria-label={alt}
    />
  );
}

export default function App() {
  const [level, setLevel] = useState(1);
  const [message, setMessage] = useState('');
  const [imageSrc, setImageSrc] = useState('./img/H1.jpg');
  const [showSpecialImage, setShowSpecialImage] = useState(false);
  const maxLevel = 100;

  const getImageAndMessage = (newLevel) => {
    if (newLevel >= maxLevel) {
      return { src: './img/pig.jpg', message: 'หมูเด้งเเบบเด้งจริงๆ' };
    } else if (newLevel >= 50) {
      return { src: './img/H3.jpg', message: 'หมูเด้งระดับกลาง' };
    } else if (newLevel <= 0) {
      return { src: './img/Sad.jpg', message: 'นอนโลงแล้ว' };
    } else {
      return { src: './img/H1.jpg', message: 'หมูยังไม่เด้ง' };
    }
  };

  const handleLevelUp = (src) => {
    let newLevel = level;

    switch (src) {
      case "./img/sumtu.jpg": 
        newLevel = 0; 
        setShowSpecialImage(false);
        break;
      case "./img/tomatoes.jpg": 
        newLevel = Math.min(level + 10, maxLevel);
        break;
      case "./img/pineapple.jpg": 
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
      setImageSrc('./img/sc.jpg');
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
          alt="Main visual" 
          onClick={handleSpecialImageClick} 
        />
      </div>
      <div className="button-container">
        <ImageButton src="./img/gree.jpg" alt="หญ้า" onClick={handleLevelUp} />
        <ImageButton src="./img/tomatoes.jpg" alt="มะเขือเทศ" onClick={handleLevelUp} />
        <ImageButton src="./img/pineapple.jpg" alt="สับปะรด" onClick={handleLevelUp} />
        <ImageButton src="./img/sumtu.jpg" alt="ย้อน" onClick={handleLevelUp} />
      </div>
    </div>
  );
}
//ผมไม่รู้ต้องเเก้ยังไงเเล้วครับ sad ทำได้เเค่นี้ครับใส่รูปที่ img เเล้วรูปไม่เเสดงใน Vercel 