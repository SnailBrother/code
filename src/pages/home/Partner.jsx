import React from 'react';
import styles from './Partner.module.css';

const CarouselTypeNinth = () => {
  const firstRowItems = [
    {
      title: '无形资产评估',
      image: '/Picture/home/Dynamic/1.jpg',
      description: [
        '● 作价入股、资产转让、使用许可、特许经营等目的而涉及的专利技术(动植物)品种权,专有技术',
        '● 商标专用权'
      ]
    },
    {
      title: '司法鉴定评估',
      image: '/Picture/home/Dynamic/2.jpg',
      description: [
        '● 重庆市各级人民法院指定的诉讼司法鉴定评估机构',
        '● 可提供房地产、土地使用权、机器设备、机动车等各项资产的鉴定评估'
      ]
    }
  ];

  const mainItem = {
    title: '服务领域',
    subtitle: '核心服务'
  };

  const secondRowItems = [
    {
      title: '企业价值评估',
      image: '/Picture/home/Dynamic/3.jpg',
      description: [
        '● 设立公司、组建集团、中外合资、合作涉及的评估',
        '● 企业资产重组、股份制改造涉及的评估',
        '● 企业股份转让所涉及的相关评估',
        '● 企业兼并收购、合并、分立、租赁承包、破产清算涉及的评估',
        '● 企业投融资涉及的评估',
        '● 收购及处置债权的评估',
        '● 法律诉讼涉及的评估'
      ]
    },
    {
      title: '单项资产评估',
      image: '/Picture/home/Dynamic/4.jpg',
      description: [
        '● 资产转让、资产抵押、资产拍卖、资产租赁',
        '● 诉讼清偿等目的的机器设备、建筑物、债权、股份等单项资产的价值评估'
      ]
    },
    {
      title: '房地产估价',
      image: '/Picture/home/Dynamic/5.jpg',
      description: [
        '● 房地产抵押价值评估',
        '● 房地产转让价格评估(包括买卖、赠与等)',
        '● 房地产租赁价格评估',
        '● 房地产课税价格评估',
        '● 房地产分割、合并价格评估',
        '● 典当、拍卖价格评估',
        '● 城市房屋征收价格评估',
        '● 房地产可行性研究及分析',
        '● 其他房地产相关价格评估及咨询'
      ]
    },
    {
      title: '土地估价',
      image: '/Picture/home/Dynamic/6.jpg',
      description: [
        '● 重庆市各国土房屋相关部门委估土地的收储，收购，出让底价以及成本价格的评估',
        '● 土地的使用权出让、转让、出租、抵押、作价入股以及国家收回土地等的宗地价格评估',
        '● 各公司涉及的土地价格评估',
        '● 企业兼并、破产、清产核算涉及的土地价格评估',
        '● 征收土地税费涉及的土地价格评估',
        '● 城市房屋征收涉及的土地评估',
        '● 其他土地评估'
      ]
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
                style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${item.image})` }}
              >
                <div className={styles['carouseltypeninth-first-row-content']}>
                  <h3 className={styles['carouseltypeninth-hexagon-title']}>{item.title}</h3>
                  <div className={styles['carouseltypeninth-hexagon-description']}>
                    {item.description.map((desc, idx) => (
                      <p key={idx} className={styles['carouseltypeninth-description-item']}>{desc}</p>
                    ))}
                  </div>
                </div>
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
              style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${item.image})` }}
            >
              <div className={styles['carouseltypeninth-second-row-content']}>
                <h3 className={styles['carouseltypeninth-hexagon-title']}>{item.title}</h3>
                <div className={styles['carouseltypeninth-hexagon-description']}>
                  {item.description.map((desc, idx) => (
                    <p key={idx} className={styles['carouseltypeninth-description-item']}>{desc}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarouselTypeNinth;