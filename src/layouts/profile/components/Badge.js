import React from 'react';
import badge1 from 'assets/images/badge/뱃지1.png';
import badge2 from 'assets/images/badge/뱃지2.png';
import badge3 from 'assets/images/badge/뱃지3.png';
import badge4 from 'assets/images/badge/뱃지4.png';

const Badge = ({ badgeCount, level }) => {
  // Create an array of badge images based on the level
  const badgeImages = {
    'Level 1': badge1,
    'Level 2': badge2,
    'Level 3': badge3,
    'Level 4': badge4,
  };

  const badges = Array.from({ length: badgeCount }, (_, index) => index); // 뱃지 개수에 따라 배열 생성

  const badgeStyle = {
    width: '55px',
    height: '55px',
    borderRadius: '50%',
    margin: '5px',
    overflow: 'hidden', // 이미지가 원 안에 들어가도록 overflow를 hidden으로 설정
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover', // 이미지가 원 안에 꽉 차도록 설정
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {badges.map((badgeIndex) => (
        <div key={badgeIndex} style={badgeStyle}>
          {badgeIndex < badgeCount && level === `Level ${badgeIndex + 1}` ? (
            <img src={badgeImages[`Level ${badgeIndex + 1}`]} alt={`Badge ${badgeIndex + 1}`} style={imageStyle} />
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default Badge;
