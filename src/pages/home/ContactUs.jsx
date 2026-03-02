import React from 'react';
import styles from './ContactUs.module.css';

const ContactUs = () => {
  return (
    <section className={styles.contactSection}>
      <div className={styles.container}>
        {/* 左侧区域 - 图片和联系方式 */}
        <div className={styles.leftCol}>
          {/* 第一行：图片 */}
          <div className={styles.imageWrapper}>
            <img
              src='/Picture/home/ContactUs/1.jpg'
              alt="联系我们"
              className={styles.contactImage}
            />
          </div>
          
          {/* 第二行：联系方式 */}
          <div className={styles.contactInfo}>
            <h3 className={styles.infoTitle}>联系方式</h3>
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

        {/* 右侧区域 - 联系表单 */}
        <div className={styles.rightCol}>
          <h3 className={styles.formTitle}>请留下您的联系方式：</h3>
          
          <form className={styles.contactForm}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>电话：</label>
              <input 
                type="tel" 
                className={styles.formInput} 
                placeholder="请输入您的电话"
              />
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>姓名：</label>
              <input 
                type="text" 
                className={styles.formInput} 
                placeholder="请输入您的姓名"
              />
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>描述：</label>
              <textarea 
                className={styles.formTextarea} 
                placeholder="请输入您的需求描述"
                rows="4"
              />
            </div>
            
            <button type="submit" className={styles.submitBtn}>提交</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;