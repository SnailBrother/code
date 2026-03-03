// src/pages/Home.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom'; // 添加这行导入Link
import styles from './Home.module.css';
import Dynamic from './home/Dynamic';
import Partner from './home/Partner';
import ContactUs from './home/ContactUs';
import CompanyProfile from './home/CompanyProfile';
import Recruitment from './home/Examples';
import NewsUpdates from './home/NewsUpdates';
import Footer from './home/Footer';

const HomeOptions = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef(null);
  const touchStartY = useRef(0);

  // 导航项 - 对应每个页面
  const navItems = ['关于我们', '服务领域', '企业案例', '企业团队', '新闻动态', '联系我们'];
  const totalPages = 7; // 总共7个页面，有一个页脚

  // logo图片路径
  const logoImg = '/RuidaLogo.jpg';

  // 翻页到指定页面
  const goToPage = useCallback((pageIndex) => {
    if (isAnimating || pageIndex === currentPage) return;

    setIsAnimating(true);
    setCurrentPage(pageIndex);

    // 平滑滚动效果
    if (containerRef.current) {
      containerRef.current.style.transform = `translateY(-${pageIndex * 100}vh)`;
    }

    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  }, [currentPage, isAnimating]);

  // 下一页
  const nextPage = useCallback(() => {
    if (currentPage < totalPages - 1) {
      goToPage(currentPage + 1);
    }
  }, [currentPage, totalPages, goToPage]);

  // 上一页
  const prevPage = useCallback(() => {
    if (currentPage > 0) {
      goToPage(currentPage - 1);
    }
  }, [currentPage, goToPage]);

  // 鼠标滚轮事件
  useEffect(() => {
// 在 Home.jsx 的 handleWheel 中修改
// 在 Home.jsx 的 handleWheel 中修改

const handleWheel = (e) => {
  if (isAnimating) return;

  // 【关键修改 1】检测用户是否正在尝试缩放 (按住 Ctrl/Cmd/Meta 键)
  if (e.ctrlKey || e.metaKey) {
    // 如果是缩放手势，直接返回，不要阻止默认行为，交给浏览器处理
    return; 
  }

  const container = containerRef.current;
  // 获取当前激活的页面对象
  // 注意：确保 children[currentPage] 存在
  if (!container || !container.children[currentPage]) return;
  
  const currentPageElement = container.children[currentPage].querySelector(`.${styles.pageContent}`) || container.children[currentPage]; 
  
  if (!currentPageElement) return;

  const { scrollTop, scrollHeight, clientHeight } = currentPageElement;
  const isAtTop = scrollTop === 0;
  const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1; // -1 兼容不同浏览器的精度误差

  // 【关键修改 2】只有当内容确实无法再滚动时，才阻止默认行为并翻页
  if (e.deltaY > 0) {
    // 向下滚
    if (!isAtBottom) {
      // 还没到底，让浏览器自己滚动内部内容 (不要 preventDefault)
      return; 
    }
    // 到底了，才阻止默认行为并翻页
    e.preventDefault(); 
    nextPage();
  } else if (e.deltaY < 0) {
    // 向上滚
    if (!isAtTop) {
      // 还没到顶，让浏览器自己滚动
      return;
    }
    // 到顶了，才阻止默认行为并翻页
    e.preventDefault();
    prevPage();
  }
};

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, [nextPage, prevPage, isAnimating]);

  // 触摸事件
  useEffect(() => {
    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (isAnimating) return;

      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY.current - touchEndY;

      if (deltaY > 50) {
        nextPage();
      } else if (deltaY < -50) {
        prevPage();
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('touchstart', handleTouchStart, { passive: true });
      container.addEventListener('touchend', handleTouchEnd, { passive: true });
    }

    return () => {
      if (container) {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [nextPage, prevPage, isAnimating]);

  // 键盘事件
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isAnimating) return;

      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
          e.preventDefault();
          nextPage();
          break;
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          prevPage();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [nextPage, prevPage, isAnimating]);

  return (
    <div className={styles.container}>
      {/* 页面容器 */}
      <div
        ref={containerRef}
        className={styles.pageContainer}
        style={{ transform: `translateY(-${currentPage * 100}vh)` }}
      >
        {/* 第1页 - 主页（包含导航栏） */}
        <div className={styles.page}>
          {/* 只在第一页显示的导航栏 */}
          <nav className={styles.navBar}>
            {/* 左侧：Logo和公司名称 */}
            <div className={styles.navLeft}>
              <img src={logoImg} alt="公司Logo" className={styles.navLogo} />
              <span className={styles.companyName}>重庆瑞达资产评估房地产土地估价有限公司</span>
            </div>

            {/* 中间：导航菜单 */}
            <div className={styles.navCenter}>
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => goToPage(index)}
                  className={`${styles.navButton} ${currentPage === index ? styles.navActive : ''}`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* 右侧：搜索框和登录按钮 */}
            <div className={styles.navRight}>
              <div className={styles.searchBox}>
                <input
                  type="text"
                  placeholder="搜索..."
                  className={styles.searchInput}
                />
                <button className={styles.searchButton}>🔍</button>
              </div>
              <Link to="/login" className={styles.loginButton}>
                登录
              </Link>
            </div>
          </nav>
          {/* 第1页 -关于我们 */}
          <div className={`${styles.pageContent} ${styles.page1}`}>
            <CompanyProfile />
          </div>
        </div>

        {/* 第2页 -服务领域 */}
        <div className={styles.page}>
          <div className={`${styles.pageContent} ${styles.page2}`}>
            <Partner />
          </div>
        </div>

        {/* 第3页 - 企业案例 */}
        <div className={styles.page}>
          <div className={`${styles.pageContent} ${styles.page3}`}>
            <Recruitment />
          </div>
        </div>

        {/* 第4页 - 企业团队 */}
        <div className={styles.page}>
          <div className={`${styles.pageContent} ${styles.page4}`}>

            <Dynamic />

          </div>
        </div>

        {/* 第5页 -  新闻动态*/}
        <div className={styles.page}>
          <div className={`${styles.pageContent} ${styles.page5}`}>

            <NewsUpdates />
          </div>
        </div>

        {/* 第6页 -  联系我们*/}
        <div className={styles.page}>
          <div className={`${styles.pageContent} ${styles.page5}`}>
            {/* <h2>联系我们</h2> */}
            <ContactUs />
          </div>
        </div>



        {/* 第7页 -  页脚*/}
        <div className={styles.page}>
          <div className={`${styles.pageContent} ${styles.page7}`}>
            <Footer />
          </div>
        </div>
      </div>

      {/* 页面指示器 */}
      <div className={styles.indicators}>
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            className={`${styles.indicator} ${currentPage === index ? styles.active : ''}`}
            onClick={() => goToPage(index)}
          />
        ))}
      </div>

      {/* 翻页箭头 */}
      {currentPage > 0 && (
        <button
          className={styles.prevButton}
          onClick={prevPage}
        >
          ↑
        </button>
      )}
      {currentPage < totalPages - 1 && (
        <button
          className={styles.nextButton}
          onClick={nextPage}
        >
          ↓
        </button>
      )}
    </div>
  );
};

export default HomeOptions;