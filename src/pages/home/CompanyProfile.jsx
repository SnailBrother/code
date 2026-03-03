import React, { useState, useEffect, useRef } from 'react';
import styles from './CompanyProfile.module.css';

const images = [
  {
    id: 1,
    src: '/Picture/home/CompanyProfile/Service.jpg',
    alt: 'Image 1',
    title: '经营范围', // 添加标题
    description: '司法鉴定服务。\n' +
      '（依法须经批准的项目，经相关部门批准后方可开展经营活动，具体经营项目以相关部门批准文件或许可证件为准）\n' +
      '一般项目：资产评估；房地产评估；土地调查评估服务；物业服务评估；矿业权评估服务；矿产资源储量评估服务；\n' +
      '社会稳定风险评估；可从事除证券评估业务以外的各类资产评估业务及资产评估咨询业务；\n' +
      '房地产估价一级；全国范围内从事土地评估业务；\n' +
      '司法鉴定。（以上范围均按资格证核定范围和期限从事经营）。\n' +
      '（除依法须经批准的项目外，凭营业执照依法自主开展经营活动）'
  },
  {
    id: 2,
    src: '/Picture/home/CompanyProfile/Qualification.jpg',
    alt: 'Image 2',
    title: '资质',
    description: '土地估价A级资格\n' +
      '房地产估价一级资格\n' +
      '资产评估综合B级资格\n' +
      '司法鉴定资格'
  },
  {
    id: 3,
    src: '/Picture/home/CompanyProfile/Honor.jpg',
    alt: 'Image 3',
    title: '企业荣誉', // 添加标题
    description: '重庆工商大学管理学院实习实践基地奖\n' +
      '重庆工商大学管理学院校企合作突出贡献单位\n' +
      '重庆市国土资源房屋评估和经纪协会四届理事会理事单位\n' +
      '重庆市司法鉴定行业年度诚信执业会员单位'
  },
  {
    id: 4,
    src: '/Picture/home/CompanyProfile/Purpose.jpg',
    alt: 'Image 4',
    title: '理念与宗旨', // 添加标题

    description: '服务理念：坚持“以人为本、质量求生存、信誉求发展、效率求效益”的服务理念。\n' +
      '评估宗旨：公平、公正、独立、客观、维护当事人的合法权益'
  },
  {
    id: 5,
    src: '/Picture/home/CompanyProfile/Team.jpg',
    alt: 'Image 5',
    title: '专业团队', // 添加标题
    description: '公司现有从业人员50余人，其中硕士研究生3人，高级职称8人，中级职称15人。\n' +
      '注册资产评估师8人，注册土地估价师8人、注册房地产估价师15人，注册造价工程师13人，\n' +
      '注册咨询师2人、注册建造师、注册监理工程师各2人。'
  }
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
            className={`${styles['carouseltypesecond-slide']} ${index === currentIndex ? styles['carouseltypesecond-active'] :
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