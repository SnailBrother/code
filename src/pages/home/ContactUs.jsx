// ContactUs.jsx
import React from 'react';
import styles from './ContactUs.module.css';

const ContactUs = () => {
  return (
    <section className={styles.contactSection}>
      <div className={styles.container}>
        {/* 左侧图片区域 */}
        <div className={styles.leftCol}>
          <img
            src='/Picture/home/ContactUs/1.jpg'
            alt="联系我们"
            className={styles.contactImage}
          />
        </div>

        {/* 右侧联系信息 */}
        <div className={styles.rightCol}>
          

          <ul className={styles.infoList}>
            <li className={styles.infoItem}>
              <span className={styles.label}>联系人：</span>
              <span className={styles.value}>李先生</span>
            </li>
            <li className={styles.infoItem}>
              <span className={styles.label}>公司电话：</span>
              <span className={styles.value}>023-45245245615</span>
            </li>
            <li className={styles.infoItem}>
              <span className={styles.label}>公司地址：</span>
              <span className={styles.value}>重庆市渝中区和平路7号6-19号、6-20号</span>
            </li>
            <li className={styles.infoItem}>
              <span className={styles.label}>公司邮箱：</span>
              <span className={styles.value}>fdgdfghq@126.com</span>
            </li>
            <li className={styles.infoItem}>
              <span className={styles.label}>公司邮编：</span>
              <span className={styles.value}>40000fgd0</span>
            </li>
            <li className={styles.infoItem}>
              <span className={styles.label}>客服QQ：</span>
              <span className={styles.value}>gfdgfdfdhfd5</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;