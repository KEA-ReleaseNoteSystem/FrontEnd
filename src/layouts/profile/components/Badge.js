import React from 'react';
import badge1 from 'assets/images/badge/뱃지1.png';
import badge2 from 'assets/images/badge/뱃지2.png';
import badge3 from 'assets/images/badge/뱃지3.png';
import badge4 from 'assets/images/badge/뱃지4.png';

const Badge = ({ level }) => {
  const badgeImages = {
    'Level 1': badge1,
    'Level 2': badge2,
    'Level 3': badge3,
    'Level 4': badge4,
  };

  const badgeStyle = {
    width: '55px',
    height: '55px',
    borderRadius: '50%',
    margin: '5px',
    overflow: 'hidden',
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  const currentLevel = parseInt(level.split(" ")[1], 10); // "Level 4" -> 4

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {Object.keys(badgeImages).map((badgeLevel, index) => (
        index < currentLevel && (
          <div key={badgeLevel} style={badgeStyle}>
            <img src={badgeImages[badgeLevel]} alt={`Badge ${badgeLevel}`} style={imageStyle} />
          </div>
        )
      ))}
    </div>
  );
};

export default Badge;
