import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import styles from './MessageManagement.module.css';
import axios from 'axios';

const SOCKET_URL = 'http://121.4.22.55:5203';

const MessageManagement = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState('connecting');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // 1. 创建 Socket 连接
    const newSocket = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    });
    
    setSocket(newSocket);

    // 2. 初始加载数据
    const fetchInitialData = async () => {
      try {
        const res = await axios.get(`${SOCKET_URL}/api/CodeDatabase/getMessages`);
        if (res.data.success) {
          setMessages(res.data.data);
        }
      } catch (err) {
        console.error("初始数据加载失败", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();

    // 3. Socket 事件监听
    newSocket.on('connect', () => {
      setConnectionStatus('connected');
      console.log('✅ Socket 连接成功, ID:', newSocket.id);
    });

    newSocket.on('disconnect', (reason) => {
      setConnectionStatus('disconnected');
      console.log('❌ Socket 断开连接, 原因:', reason);
    });

    newSocket.on('connect_error', (error) => {
      console.error('Socket 连接错误:', error);
      setConnectionStatus('error');
    });

    // ✅ 监听新消息到达 - 关键部分
    newSocket.on('new_message_received', (newMessage) => {
      console.log('📨 收到新消息:', newMessage);
      
      setMessages(prev => {
        // 避免重复添加
        if (prev.some(msg => msg.id === newMessage.id)) {
          console.log('消息已存在，不重复添加');
          return prev;
        }
        console.log('添加新消息到列表');
        return [newMessage, ...prev];
      });

      // 浏览器通知
      if (Notification.permission === "granted") {
        new Notification("新留言通知", { 
          body: `来自 ${newMessage.requestername} 的新消息` 
        });
      }
    });

    newSocket.on('message_updated', (updatedData) => {
      console.log('消息状态更新:', updatedData);
      setMessages(prev => prev.map(msg => 
        msg.id === updatedData.id ? { ...msg, ...updatedData } : msg
      ));
    });

    // 清理
    return () => {
      console.log('清理 Socket 连接');
      newSocket.off('connect');
      newSocket.off('disconnect');
      newSocket.off('connect_error');
      newSocket.off('new_message_received');
      newSocket.off('message_updated');
      newSocket.disconnect();
    };
  }, []); // 空依赖数组，只在组件挂载时执行一次

  // 其余代码保持不变...
  const handleMarkAsRead = async (id) => {
    try {
      await axios.put(`${SOCKET_URL}/api/CodeDatabase/markAsRead/${id}`);
      // 乐观更新
      setMessages(prev => prev.map(msg => 
        msg.id === id ? { ...msg, isread: 1, responded: new Date().toISOString() } : msg
      ));
    } catch (err) {
      alert('标记失败');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString('zh-CN');
  };

  // 渲染部分保持不变...
  return (
    <div className={styles.managementContainer}>
      <header className={styles.header}>
        <h2>留言:</h2>
        <div className={styles.statusBadge}>
          连接状态: 
          <span className={`${styles.dot} ${connectionStatus === 'connected' ? styles.online : styles.offline}`}></span>
          {connectionStatus === 'connected' ? '实时在线' : '连接中...'}
        </div>
      </header>

      {isLoading ? (
        <div className={styles.loading}>加载中...</div>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.messageTable}>
            <thead>
              <tr>
                <th>ID</th>
                <th>提交时间</th>
                <th>姓名</th>
                <th>联系方式</th>
                <th>问题描述</th>
                <th>状态</th>
                <th>回复时间</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {messages.length === 0 ? (
                <tr><td colSpan="8" className={styles.emptyRow}>暂无留言</td></tr>
              ) : (
                messages.map((msg) => (
                  <tr key={msg.id} className={msg.isread ? styles.readRow : styles.unreadRow}>
                    <td>{msg.id}</td>
                    <td>{formatDate(msg.submitted)}</td>
                    <td>{msg.requestername}</td>
                    <td>{msg.contact || '-'}</td>
                    <td className={styles.descCell}>{msg.description}</td>
                    <td>
                      <span className={msg.isread ? styles.badgeRead : styles.badgeUnread}>
                        {msg.isread ? '已读' : '未读'}
                      </span>
                    </td>
                    <td>{formatDate(msg.responded)}</td>
                    <td>
                      {!msg.isread && (
                        <button 
                          className={styles.markBtn}
                          onClick={() => handleMarkAsRead(msg.id)}
                        >
                          标记已读
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MessageManagement;