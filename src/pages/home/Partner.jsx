import React from 'react';
import styles from './Partner.module.css';

const CarouselTypeNinth = () => {
  const firstRowItems = [
    {
      title: '无形资产评估',
      image: '/Picture/home/Dynamic/1.jpg'
    },
    {
      title: '司法鉴定评估',
      image: '/Picture/home/Dynamic/2.jpg'
    }
  ];

  const mainItem = {
    title: '合作伙伴',
    subtitle: '服务领域'
  };

  const secondRowItems = [
    {
      title: '企业价值评估',
      image: '/Picture/home/Dynamic/3.jpg'
    },
    {
      title: '单项资产评估',
      image: '/Picture/home/Dynamic/4.jpg'
    },
    {
      title: '房地产估价',
      image: '/Picture/home/Dynamic/5.jpg'
    },
    {
      title: '土地估价',
      image: '/Picture/home/Dynamic/6.jpg'
    }
  ];

  return (
    <div className={styles['carouseltypeninth-container']}>
      {/* First Row - Two Hexagons + Text Content */}
      <div className={styles['carouseltypeninth-first-row']}>
        <div className={styles['carouseltypeninth-first-row-images']}>
          {firstRowItems.map((item, index) => (
            <div key={index} className={styles['carouseltypeninth-first-row-hexagon-item']}>
              <div 
                className={styles['carouseltypeninth-first-row-hexagon']} 
                style={{ backgroundImage: `url(${item.image})` }}
              >
                <div className={styles['carouseltypeninth-first-row-hexagon-text']}>{item.title}</div>
              </div>
            </div>
          ))}
        </div>
        
        <div className={styles['carouseltypeninth-text-content']}>
          <h2 className={styles['carouseltypeninth-main-title']}>{mainItem.title}</h2>
          <p className={styles['carouseltypeninth-main-subtitle']}>{mainItem.subtitle}</p>
          <button className={styles['carouseltypeninth-more-btn']}>查看更多 &gt;</button>
        </div>
      </div>

      {/* Second Row - Four Hexagon Items */}
      <div className={styles['carouseltypeninth-second-row']}>
        {secondRowItems.map((item, index) => (
          <div key={index} className={styles['carouseltypeninth-second-row-item']}>
            <div 
              className={styles['carouseltypeninth-second-row-hexagon']} 
              style={{ backgroundImage: `url(${item.image})` }}
            >
              <div className={styles['carouseltypeninth-second-row-hexagon-text']}>{item.title}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarouselTypeNinth;