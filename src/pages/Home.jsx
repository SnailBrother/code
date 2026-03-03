// src/pages/Home.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import Dynamic from './home/Dynamic';
import Partner from './home/Partner';
import Service from './home/Service';
import ContactUs from './home/ContactUs';
import CompanyProfile from './home/CompanyProfile';
import Recruitment from './home/Examples';
import NewsUpdates from './home/NewsUpdates';
import Footer from './home/Footer';

const HomeOptions = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 添加移动端菜单状态
  const containerRef = useRef(null);
  const touchStartY = useRef(0);
  const menuRef = useRef(null); // 添加菜单引用，用于点击外部关闭

  // 导航项 - 对应每个页面
  const navItems = ['关于我们', '服务领域', '合作伙伴', '企业案例', '企业团队', '新闻动态', '联系我们'];
  const totalPages = 8; // 总共7个页面，有一个页脚

  // logo图片路径
  const logoImg = '/RuidaLogo.jpg';

  // 翻页到指定页面
  const goToPage = useCallback((pageIndex) => {
    if (isAnimating || pageIndex === currentPage) return;

    setIsAnimating(true);
    setCurrentPage(pageIndex);
    setIsMenuOpen(false); // 切换页面时关闭移动菜单

    // 平滑滚动效果
    if (containerRef.current) {
      containerRef.current.style.transform = `translateY(-${pageIndex * 100}vh)`;
    }

    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  }, [currentPage, isAnimating]);

  // 切换移动菜单
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // 点击外部关闭菜单
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
    const handleWheel = (e) => {
      if (isAnimating) return;

      // 检测用户是否正在尝试缩放
      if (e.ctrlKey || e.metaKey) {
        return;
      }

      const container = containerRef.current;
      if (!container || !container.children[currentPage]) return;

      const currentPageElement = container.children[currentPage].querySelector(`.${styles.pageContent}`) || container.children[currentPage];

      if (!currentPageElement) return;

      const { scrollTop, scrollHeight, clientHeight } = currentPageElement;
      const isAtTop = scrollTop === 0;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

      if (e.deltaY > 0) {
        if (!isAtBottom) {
          return;
        }
        e.preventDefault();
        nextPage();
      } else if (e.deltaY < 0) {
        if (!isAtTop) {
          return;
        }
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

            {/* 中间：导航菜单 - 桌面端显示 */}
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

              {/* 移动端菜单按钮 - 三条横线，垂直居中 */}
              <button
                className={styles.menuToggle}
                onClick={toggleMenu}
                aria-label="菜单"
              >
                <span className={styles.menuIcon}></span>
                <span className={styles.menuIcon}></span>
                <span className={styles.menuIcon}></span>
              </button>
            </div>

            {/* 移动端下拉菜单 */}
            {isMenuOpen && (
              <div className={styles.mobileMenu} ref={menuRef}>
                <div className={styles.mobileMenuHeader}>
                  
                  <span className={styles.mobileCompanyName}>重庆瑞达资产评估</span>
                  <button className={styles.mobileCloseBtn} onClick={toggleMenu}>×</button>
                </div>

                  <div className={styles.mobileSearchBox}>
                    <input
                      type="text"
                      placeholder="搜索..."
                      className={styles.mobileSearchInput}
                    />
                    <button className={styles.mobileSearchButton}>🔍</button>
                  </div>
                  
                <div className={styles.mobileNavItems}>
                  {navItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => goToPage(index)}
                      className={`${styles.mobileNavButton} ${currentPage === index ? styles.mobileNavActive : ''}`}
                    >
                      {item}
                    </button>
                  ))}
                  <div className={styles.mobileDivider}></div>
                
                  {/* 修改这里：让登录按钮样式和导航按钮一致 */}
                  <Link to="/login" className={styles.mobileNavButton} onClick={toggleMenu}>
                    登录
                  </Link>
                </div>
              </div>
            )}

           
          </nav>
          {/* 第1页 -关于我们 */}
          <div className={`${styles.pageContent} ${styles.page1}`}>
            <CompanyProfile />
          </div>
        </div>

        {/* 第2页 -服务领域 */}
        <div className={styles.page}>
          <div className={`${styles.pageContent} ${styles.page2}`}>
            <Service />
          </div>
        </div>

        {/* 第3页 -合作伙伴 */}
        <div className={styles.page}>
          <div className={`${styles.pageContent} ${styles.page2}`}>
            <Partner />
          </div>
        </div>

        {/* 第4页 - 企业案例 */}
        <div className={styles.page}>
          <div className={`${styles.pageContent} ${styles.page3}`}>
            <Recruitment />
          </div>
        </div>

        {/* 第5页 - 企业团队 */}
        <div className={styles.page}>
          <div className={`${styles.pageContent} ${styles.page4}`}>
            <Dynamic />
          </div>
        </div>

        {/* 第6页 -  新闻动态*/}
        <div className={styles.page}>
          <div className={`${styles.pageContent} ${styles.page5}`}>
            <NewsUpdates />
          </div>
        </div>

        {/* 第7页 -  联系我们*/}
        <div className={styles.page}>
          <div className={`${styles.pageContent} ${styles.page5}`}>
            <ContactUs />
          </div>
        </div>

        {/* 第8页 -  页脚*/}
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