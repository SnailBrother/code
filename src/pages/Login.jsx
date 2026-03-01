// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // 定义正确的账号和密码
    const CORRECT_USERNAME = 'cqrdpg';
    const CORRECT_PASSWORD = 'passwordcqrdpg';

    // 验证账号和密码是否匹配
    if (username === CORRECT_USERNAME && password === CORRECT_PASSWORD) {
      // 登录成功
      onLogin(true); // 通知父组件登录成功
      navigate('/admin'); // 跳转到操作管理页
    } else {
      // 登录失败
      alert('请输入正确的账号和密码');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>用户登录</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="username">用户名:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
            placeholder="请输入用户名"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">密码:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            placeholder="请输入密码"
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          登录
        </button>
      </form>
    </div>
  );
}

export default Login;