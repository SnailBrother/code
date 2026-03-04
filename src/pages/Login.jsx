// src/pages/Login.jsx
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userInputCode, setUserInputCode] = useState('');
  const [captchaCode, setCaptchaCode] = useState('');
  const [captchaError, setCaptchaError] = useState(false);
  
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  const logoImg = '/RuidaLogo.jpg';
  const companyName = '重庆瑞达评估';
  const backgroundImg = '/Picture/home/CompanyProfile/Purpose.jpg';

  // 生成随机验证码
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 4; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    setCaptchaCode(code);
    drawCaptcha(code);
  };

  // 绘制验证码
  const drawCaptcha = (code) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    
    // 清空画布
    ctx.clearRect(0, 0, w, h);
    
    // 背景色 - 浅灰色
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, w, h);
    
    // 绘制干扰线
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 1;
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * w, Math.random() * h);
      ctx.lineTo(Math.random() * w, Math.random() * h);
      ctx.stroke();
    }
    
    // 绘制干扰点
    ctx.fillStyle = '#999';
    for (let i = 0; i < 30; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * w, Math.random() * h, Math.random() * 3, 0, 2 * Math.PI);
      ctx.fill();
    }
    
    // 绘制验证码文字
    const charWidth = w / code.length;
    for (let i = 0; i < code.length; i++) {
      ctx.fillStyle = `rgb(${Math.random() * 100}, ${Math.random() * 100}, ${Math.random() * 100})`;
      const fontSize = 28 + Math.random() * 6;
      ctx.font = `bold ${fontSize}px 'Arial', sans-serif`;
      const angle = (Math.random() - 0.5) * 0.3;
      
      ctx.save();
      const x = charWidth * i + charWidth * 0.3 + Math.random() * 8;
      const y = h * 0.7 + Math.random() * 8;
      
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.fillText(code[i], 0, 0);
      ctx.restore();
    }
  };

  // 刷新验证码
  const refreshCaptcha = () => {
    generateCaptcha();
    setUserInputCode('');
    setCaptchaError(false);
  };

  // 初始化验证码
  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const CORRECT_USERNAME = 'cqrdpg';
    const CORRECT_PASSWORD = 'passwordcqrdpg';
    
    // 验证验证码
    if (userInputCode.toUpperCase() !== captchaCode) {
      setCaptchaError(true);
      refreshCaptcha();
      alert('验证码错误');
      return;
    }
    
    // 验证账号密码
    if (username === CORRECT_USERNAME && password === CORRECT_PASSWORD) {
      onLogin(true);
      navigate('/admin');
    } else {
      alert('请输入正确的账号和密码');
    }
  };

  return (
    <div 
      className={styles.body} 
      style={{ 
        backgroundImage: `url(${backgroundImg})`
      }}
    >
      <div className={styles.overlay}></div>
      <div className={styles.loginBox}>
        <div className={styles.header}>
          <img src={logoImg} alt="公司Logo" className={styles.logo} />
          <h1 className={styles.companyName}>{companyName}</h1>
        </div>
        <h2 className={styles.prompt}>请登录</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.userBox}>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>用户名</label>
          </div>
          <div className={styles.userBox}>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>密码</label>
          </div>
          
          {/* 验证码区域 */}
          <div className={styles.captchaBox}>
            <canvas
              ref={canvasRef}
              width="150"
              height="50"
              className={styles.captchaCanvas}
            ></canvas>
            <button 
              type="button" 
              className={styles.refreshBtn}
              onClick={refreshCaptcha}
            >
              ↻ 刷新
            </button>
          </div>
          
          <div className={styles.userBox}>
            <input
              type="text"
              required
              value={userInputCode}
              onChange={(e) => {
                setUserInputCode(e.target.value);
                setCaptchaError(false);
              }}
              className={captchaError ? styles.errorInput : ''}
              placeholder="请输入验证码"
              maxLength="4"
            />
          </div>
          
          <button type="submit" className={styles.submitButton}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            登 录
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;