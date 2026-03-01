import React, { useState, useEffect, useRef } from 'react';
import styles from './CompanyProfile.module.css';

const images = [
  { 
    id: 1, 
    src: '/Picture/home/CompanyProfile/1.jpeg', 
    alt: 'Image 1',
    title: '公司总部大楼', // 添加标题
    description: '重庆瑞达资产评估房地产土地估价有限公司成立于2003年04月18日，注册地位于重庆市渝中区和平路7号6-19号、6-20号，法定代表人为谢渝。经营范围包括许可项目：司法鉴定服务。（依法须经批准的项目，经相关部门批准后方可开展经营活动，具体经营项目以相关部门批准文件或许可证件为准） 一般项目：资产评估；房地产评估；土地调查评估服务；物业服务评估；矿业权评估服务；矿产资源储量评估服务；社会稳定风险评估；可从事除证券评估业务以外的各类资产评估业务及资产评估咨询业务；房地产估价一级；全国范围内从事土地评估业务；司法鉴定。（以上范围均按资格证核定范围和期限从事经营）。（除依法须经批准的项目外，凭营业执照依法自主开展经营活动）重庆瑞达资产评估房地产土地估价有限公司具有4处分支机构'
  },
  { 
    id: 2, 
    src: '/Picture/home/CompanyProfile/2.jpg', 
    alt: 'Image 2',
     title: '专业团队风采', // 添加标题
    description: '这里是第二张图片的描述文字，可以详细介绍图片内容'
  },
  { 
    id: 3, 
    src: '/Picture/home/CompanyProfile/3.jpg', 
    alt: 'Image 3',
    title: '办公环境展示', // 添加标题
    description: '这里是第三张图片的描述文字，可以详细介绍图片内容'
  },
  { 
    id: 4, 
    src: '/Picture/home/CompanyProfile/4.jpeg', 
    alt: 'Image 4',
    title: '荣誉资质证书', // 添加标题
    description: '这里是第四张图片的描述文字，可以详细介绍图片内容'
  },
];

const CarouselTypeSecond = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  
  // 使用 useRef 存储 timer ID，避免闭包问题和状态更新导致的定时器重置混乱
  const timerRef = useRef(null);

  // 统一的清除定时器方法
  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // 统一的启动定时器方法
  const startAutoPlay = () => {
    clearTimer(); // 先清除旧的，防止多重定时器
    
    // 只有在非悬停状态下才启动
    if (!isHovering) {
      timerRef.current = setInterval(() => {
        // 使用函数式更新确保获取最新状态
        setCurrentIndex(prev => (prev + 1) % images.length);
      }, 8000); // 严格设置为 8000 毫秒 (8秒)
      
      console.log('自动轮播定时器已启动 (8秒间隔)');
    }
  };

  // 手动切换
  const handleSwitch = (index) => {
    setCurrentIndex(index);
    // 索引改变后，useEffect 会检测到并重新启动定时器，这里不需要手动调用 startAutoPlay
  };

  // 上一张
  const prevSlide = () => {
    setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
  };

  // 下一张
  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % images.length);
  };

  // 处理鼠标悬停
  const handleMouseEnter = () => {
    setIsHovering(true);
    clearTimer(); // 悬停时立即停止
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    // 离开时，useEffect 会检测到 isHovering 变化并重新启动
  };

  // 核心逻辑：监听 currentIndex 和 isHovering 的变化
  useEffect(() => {
    // 每当 currentIndex 变化（无论自动还是手动）或 isHovering 变化时，都重置定时器
    startAutoPlay();

    // 清理函数：组件卸载或依赖变化前清除旧定时器
    return () => {
      clearTimer();
    };
  }, [currentIndex, isHovering]); // 关键：将 currentIndex 加入依赖项

  return (
    <div className={styles['carouseltypesecond-box']} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
       
      {/* 轮播图片区域 */}
      <ul className={styles['carouseltypesecond-ul1']}>
        {images.map((img, index) => (
          <li
            key={img.id}
            className={`${styles['carouseltypesecond-slide']} ${
              index === currentIndex ? styles['carouseltypesecond-active'] : 
              index === (currentIndex - 1 + images.length) % images.length ? styles['carouseltypesecond-prev'] : 
              index === (currentIndex + 1) % images.length ? styles['carouseltypesecond-next'] : ''
            }`}
          >
            <img src={img.src} alt={img.alt} className={styles['carouseltypesecond-img']} />
            {/* 图片描述 - 放在图片右边 */}
            {index === currentIndex && (
              <div className={styles['carouseltypesecond-description']}>
                <h3 className={styles['carouseltypesecond-description-title']}>{img.title}</h3>
                <p className={styles['carouseltypesecond-description-text']}>{img.description}</p>
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* 左右按钮 */}
      <div
        className={`${styles['carouseltypesecond-left-button']} ${styles['carouseltypesecond-indexs']}`}
        onClick={prevSlide}
      >
        &lt;
      </div>
      <div
        className={`${styles['carouseltypesecond-right-button']} ${styles['carouseltypesecond-indexs']}`}
        onClick={nextSlide}
      >
        &gt;
      </div>

      {/* 指示器 */}
      <ul className={`${styles['carouseltypesecond-ul2']} ${styles['carouseltypesecond-indexs']}`}>
        {images.map((_, index) => (
          <li
            key={index}
            className={`${styles['carouseltypesecond-indicator']} ${index === currentIndex ? styles['carouseltypesecond-active-indicator'] : ''}`}
            onClick={() => handleSwitch(index)}
          >
            {index + 1}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarouselTypeSecond;