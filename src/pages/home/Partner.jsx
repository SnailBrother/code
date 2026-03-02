import React, { useState } from 'react';
import styles from './Partner.module.css';

const CarouselTypeFifth = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const items = [
    {
      title: '银行',
      subtitle: '抵押',
      description: '合作银行',
      images: [
        { src: `/Picture/home/Partner/1.png`, desc: '陈宝宝下车在和妈妈打电话' },
        { src: `http://121.4.22.55:80/backend/images/OurHomePage/CarouselTypeFifth/2.jpg`, desc: '陈宝宝刚出洞口' }
      ],
      bgColor: '#4a6fa5'
    },
    {
      title: '法院',
      subtitle: '司法',
      description: '那年我们一起去滑雪',
      images: [
        { src: `http://121.4.22.55:80/backend/images/OurHomePage/CarouselTypeFifth/3.jpg`, desc: '羞涩的陈宝宝' },
        { src: `http://121.4.22.55:80/backend/images/OurHomePage/CarouselTypeFifth/4.jpg`, desc: '可爱的陈宝宝' }
      ],
      bgColor: '#c45c4a'
    },
    {
      title: '国资委',
      subtitle: '法定',
      description: '那年我们一起去爬山',
      images: [
        { src: `http://121.4.22.55:80/backend/images/OurHomePage/CarouselTypeFifth/5.jpg`, desc: '好大的瀑布' },
        { src: `http://121.4.22.55:80/backend/images/OurHomePage/CarouselTypeFifth/6.jpg`, desc: '陈宝宝被冷风吹' }
      ],
      bgColor: '#5a8f69'
    }
  ];

  const toggleItem = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className={styles['carouseltypefifth-container']}>

      <div className={styles['carouseltypefifth-header-titcontainer']}>
        <div className={styles['carouseltypefifth-title-container']}>
          <div className={styles['carouseltypefifth-title-bg']}></div>
          <h2 className={styles['carouseltypefifth-title']}>
            <span className={styles['carouseltypefifth-title-text']}>合作伙伴</span>
            <span className={styles['carouseltypefifth-title-stroke']}>合作伙伴</span>
          </h2>
          <div className={styles['carouseltypefifth-decoration']}>
            <div className={styles['carouseltypefifth-decoration-path']}></div>
            <div className={styles['carouseltypefifth-decoration-icon']}>✈</div>
          </div>
        </div>
      </div>


      <div className={styles['carouseltypefifth-accordion']}>
        {items.map((item, index) => (
          <div
            key={index}
            className={`${styles['carouseltypefifth-item']} ${index === activeIndex ? styles['active'] : ''}`}
            onClick={() => toggleItem(index)}
            style={{ backgroundColor: item.bgColor }}
          >
            <div className={styles['carouseltypefifth-header']}>
              <div className={styles['carouseltypefifth-title-wrapper']}>
                {item.title.split('').map((char, i) => (
                  <span key={i} className={styles['carouseltypefifth-char']}>{char}</span>
                ))}
                <p className={styles['carouseltypefifth-subtitle']}>{item.subtitle}</p>
              </div>
            </div>

            <div className={styles['carouseltypefifth-content']}>
              <div className={styles['carouseltypefifth-description']}>
                {item.description}
              </div>
              <div className={styles['carouseltypefifth-images']}>
                {item.images.map((image, imgIndex) => (
                  <div key={imgIndex} className={styles['carouseltypefifth-image-container']}>
                    <img
                      src={image.src}
                      alt={image.desc}
                      className={styles['carouseltypefifth-image']}
                    />
                    <p className={styles['carouseltypefifth-image-desc']}>{image.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarouselTypeFifth;