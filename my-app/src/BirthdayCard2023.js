import React, { useState } from 'react';
import cover from './image/cover.png';
import card from './image/card.png';
import './BirthdayCard2023.css';

const BirthdayCard2023 = () => {
  const [showInside, setShowInside] = useState(false);
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setTimeout(() => {setShowInside(!showInside)},500);
    setShow(!show)
    playSoundEffect();
  };

  const playSoundEffect = () => {
    const audio = new Audio('/flip.mp3');
    audio.playbackRate = 2;
    audio.play();
  };

  

  return (
    <div className="birthday-card">
      {showInside ? (
        <img
          className="inside-page"
          src={card}
          alt="Inside Page"
          onClick={handleClick}
        />
      ) : (
        <img
          className="cover"
          src={cover}
          alt="Cover"
          onClick={handleClick}
        />
      )}
    </div>
  );
};

export default BirthdayCard2023;