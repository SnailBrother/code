// src/pages/CodeCheck.jsx
import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import QRCode from 'qrcode';
import styles from './CodeCheck.module.css';

function CodeCheck() {
  const { code } = useParams();
  // 不再直接引用 canvas，改为存储生成的图片 URL
  const [qrImageSrc, setQrImageSrc] = useState('');
  
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [qrUrl, setQrUrl] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!code) {
        setError('缺少校验码参数');
        setLoading(false);
        return;
      }

      try {
        // 1. 获取数据
        const response = await fetch(`/api/CodeDatabase/VerifyAndFetch?code=${encodeURIComponent(code)}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
          setData(result.data);

          // 2. 构造完整 URL
          const currentOrigin = window.location.origin;
          // 安全检查：确保协议存在
          const fullUrl = `${currentOrigin}/codecheck/${encodeURIComponent(code)}`;
          setQrUrl(fullUrl);

          console.log('正在生成二维码，目标 URL:', fullUrl);

          // 3. 生成二维码图片 (使用 toDataURL 替代 toCanvas 以提高兼容性)
          try {
            const dataUrl = await QRCode.toDataURL(fullUrl, {
              width: 180,
              margin: 1,
              color: {
                dark: '#000000',
                light: '#ffffff'
              },
              errorCorrectionLevel: 'M' // 中等容错率
            });
            
            if (dataUrl) {
              setQrImageSrc(dataUrl);
              console.log('二维码生成成功');
            } else {
              throw new Error('生成的二维码数据为空');
            }
          } catch (qrErr) {
            console.error('❌ 二维码生成库报错:', qrErr);
            setError('二维码生成失败，请尝试刷新页面');
          }

        } else {
          setError(result.error || '无效的二维码或数据不存在');
        }
      } catch (err) {
        console.error('❌ 数据获取失败:', err);
        setError('网络请求失败，请检查服务器连接或防火墙设置');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [code]);

  if (loading) {
    return (
      <div className={styles.fullPageBg}>
        <div className={styles.loadingBox}>
          <div className={styles.spinner}></div>
          <p>正在核验防伪信息...</p>
        </div>
      </div>
    );
  }

  if (error && !data) {
    // 如果是致命错误且没有数据，显示错误页
    return (
      <div className={styles.fullPageBg}>
        <div className={`${styles.paper} ${styles.errorPaper}`}>
          <div className={styles.errorIcon}>⚠️</div>
          <h2 className={styles.errorTitle}>验证失败</h2>
          <p className={styles.errorMsg}>{error}</p>
          <p className={styles.errorHint}>该防伪码可能已被篡改、过期或输入错误。</p>
          <Link to="/" className={styles.homeBtn}>返回首页</Link>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const formatAmount = (amount) => {
    const num = parseFloat(amount);
    if (isNaN(num)) return '0.00';
    return num.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return '-';
    return date.toLocaleDateString('zh-CN');
  };

  return (
    <div className={styles.fullPageBg}>
      <div className={styles.paperContainer}>
        <div className={styles.paper}>

          {/* 公章 */}
          <div className={styles.stamp}>
            <img
              src="/OfficialSeal.png"
              alt="官方公章"
              className={styles.stampImage}
              onError={(e) => {
                e.target.style.display = 'none';
                console.warn('公章图片加载失败');
              }}
            />
          </div>

          <div className={styles.paperHeader}>
            <h1 className={styles.reportTitle}>重庆瑞达资产评估房地产土地估价有限公司</h1>
            
          </div>

          {/* 二维码区域 - 改用 img 标签显示 */}
          <div className={styles.qrSection}>
            {qrImageSrc ? (
              <img src={qrImageSrc} alt="查验二维码" className={styles.qrImage} />
              
            ) : (
              <div className={styles.qrError}>
                <p>⚠️ 二维码生成中或失败</p>
                <small>请检查浏览器控制台日志</small>
              </div>
            )}
            <div className={styles.verifiedBadge}>
              <span className={styles.checkIcon}></span>校验码:{code}
            </div>
          </div>

          <div className={styles.infoGrid}>
            <div className={styles.infoRow}>
              <span className={styles.label}>报告编号：</span>
              <span className={styles.value}>{data.ReportNumber || '-'}</span>
            </div>

            <div className={styles.infoRow}>
              <span className={styles.label}>项目名称：</span>
              <span className={styles.value}>{data.ProjectName || '-'}</span>
            </div>

            <div className={styles.infoRow}>
              <span className={styles.label}>评估金额：</span>
              <span className={styles.value}>¥ {formatAmount(data.EvaluationAmount)}元</span>
            </div>

            <div className={styles.infoRow}>
              <span className={styles.label}>报告时间：</span>
              <span className={styles.value}>{formatDate(data.ReportTime)}</span>
            </div>

            <div className={styles.infoRow}>
              <span className={styles.label}>评估机构名称：</span>
              <span className={styles.value}>重庆瑞达资产评估房地产土地估价有限公司</span>
            </div>
          </div>

          <div className={styles.signSection}>
            <div className={styles.signRow}>
              <span className={styles.label}>签字人员：</span>
              <span className={styles.value}>
                {data.SignerA_Name || '未签字'}（编号：{data.SignerA_Number || '-'}）
              </span>
            </div>

            <div className={styles.signRow}>
              <span className={styles.label}></span>
              <span className={styles.value}>
                {data.SignerB_Name || '未签字'}（编号：{data.SignerB_Number || '-'}）
              </span>
            </div>
          </div>

          <div className={styles.footer}>
            <p>本查验仅供核实报告真伪使用，谨防假冒网站。</p>
            <p style={{ wordBreak: 'break-all', fontSize: '10px', color: '#999' }}>
              {qrUrl}
            </p>
            <p>查验时间：{new Date().toLocaleString('zh-CN')}</p>
          </div>

        </div>

        <div className={styles.actionBar}>
          <button onClick={() => window.print()} className={styles.printBtn}>🖨️ 打印</button>
          <Link to="/" className={styles.backBtn}>🏠 首页</Link>
        </div>
      </div>
    </div>
  );
}

export default CodeCheck;