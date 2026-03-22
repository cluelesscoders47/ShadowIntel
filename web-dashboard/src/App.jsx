import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Shield, Search, Cpu, Bell, AlertTriangle, Play, BookOpen, ArrowLeft, ExternalLink, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import EducationCenter from './components/EducationCenter';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function Scanner() {
  const [targetUrl, setTargetUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [news, setNews] = useState([]);
  const [activeReport, setActiveReport] = useState(null);
  const [isFetchingReport, setIsFetchingReport] = useState(false);

  useEffect(() => {
    const loadNews = async () => {
        try {
            const response = await axios.get(`${API_URL}/threat-news`);
            setNews(response.data);
        } catch (e) {
            console.error("News Load Failed");
        }
    };
    loadNews();
  }, []);

  const handleScan = async (e) => {
    e.preventDefault();
    if (!targetUrl) return;
    
    setIsScanning(true);
    setScanResult(null);

    try {
        const response = await axios.post(`${API_URL}/scan`, { targetUrl });
        setScanResult(response.data);
    } catch (error) {
        console.error(error);
        alert("Failed to connect to Local AI Engine.");
    } finally {
        setIsScanning(false);
    }
  };

  const openReport = async (item) => {
    setIsFetchingReport(true);
    setActiveReport({ ...item, content: "Securing connection... decrypting intelligence node... Please wait." });
    try {
        const response = await axios.post(`${API_URL}/proxy-report`, { url: item.link });
        setActiveReport({ ...item, content: response.data.content });
    } catch (e) {
        setActiveReport({ ...item, content: "Access Denied. Node offline or unreachable." });
    } finally {
        setIsFetchingReport(false);
    }
  };

  return (
    <motion.div key="dash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      
      {/* Search Bar Overlay - Report Viewer Modal */}
      <AnimatePresence>
          {activeReport && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
              >
                  <motion.div 
                    initial={{ scale: 0.9, y: 20 }} 
                    animate={{ scale: 1, y: 0 }} 
                    className="glass-panel" 
                    style={{ maxWidth: '800px', width: '100%', maxHeight: '90vh', overflowY: 'auto', position: 'relative', boxShadow: '0 0 50px rgba(220, 38, 38, 0.2)' }}
                  >
                      <button 
                        onClick={() => setActiveReport(null)}
                        style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer' }}
                      >
                        <XCircle size={24} color="var(--accent-red)" />
                      </button>
                      
                      <div style={{ paddingBottom: '20px', borderBottom: '1px solid var(--border-color)', marginBottom: '20px' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent-red)', letterSpacing: '2px' }}>LIVE INTELLIGENCE REPORT</span>
                          <h2 style={{ marginTop: '5px' }}>{activeReport.title}</h2>
                          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Source: {new URL(activeReport.link).hostname}</p>
                      </div>

                      <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
                          {activeReport.content}
                      </div>
                      
                      {isFetchingReport && (
                          <div style={{ textAlign: 'center', marginTop: '30px' }}>
                              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} style={{ display: 'inline-block' }}>
                                  <Cpu size={30} color="var(--accent-red)" />
                              </motion.div>
                          </div>
                      )}
                  </motion.div>
              </motion.div>
          )}
      </AnimatePresence>

      {/* Top Analysis Bar */}
      <div className="glass-panel" style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '10px' }}><Search size={20} /> Deep Web Target Scanner</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>Enter an .onion URL or Pastebin link to initiate a local AI threat analysis.</p>
        
        <form onSubmit={handleScan} className="input-bar">
          <input 
            type="text" 
            className="input-field" 
            placeholder="e.g. jx2bqxxxxx.onion/dump..." 
            value={targetUrl}
            onChange={(e) => setTargetUrl(e.target.value)}
            disabled={isScanning}
          />
          <motion.button 
            whileHover={{ scale: 1.02 }} 
            whileTap={{ scale: 0.98 }}
            className="btn-primary" 
            type="submit"
            disabled={isScanning}
          >
            {isScanning ? 'ANALYZING...' : 'INITIATE SCAN'}
          </motion.button>
        </form>
      </div>

      {/* Results Grid */}
      <div className="main-grid">
        
        {/* Scan Results Panel */}
        <div className="glass-panel">
            <h2 style={{ fontSize: '1.1rem', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Cpu size={20} /> AI Target Analysis</div>
              {scanResult && <span className={`status-badge status-${scanResult.threatLevel}`}>{scanResult.threatLevel} RISK</span>}
            </h2>

            {isScanning ? (
                <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} style={{ display: 'inline-block', marginBottom: '20px' }}>
                        <AlertTriangle size={40} color="var(--accent-red)" />
                    </motion.div>
                    <p>Tor crawler active... Injecting raw data into NLP Pipeline...</p>
                </div>
            ) : scanResult ? (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="stats-grid">
                        <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '8px' }}>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '5px' }}>DETECTED INTENT</p>
                            <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>{scanResult.aiAnalysis.category}</p>
                        </div>
                        <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '8px' }}>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '5px' }}>AI CONFIDENCE</p>
                            <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>{scanResult.aiAnalysis.confidence}</p>
                        </div>
                    </div>

                    <h3 style={{ fontSize: '0.9rem', marginBottom: '10px', marginTop: '30px', color: 'var(--text-secondary)' }}>DEEP ENDPOINT TELEMETRY</h3>
                    <div className="telemetry-grid">
                        <div style={{ padding: '15px', background: '#f1f5f9', borderRadius: '6px' }}>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '4px' }}>Resolved IP Location</p>
                            <p style={{ fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{scanResult.telemetry.resolvedIp}</p>
                        </div>
                        <div style={{ padding: '15px', background: '#f1f5f9', borderRadius: '6px' }}>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '4px' }}>Network Routing</p>
                            <p style={{ fontWeight: 600, color: scanResult.telemetry.anonymized ? '#b91c1c' : '#15803d' }}>
                              {scanResult.telemetry.routing}
                            </p>
                        </div>
                        <div className="full-span" style={{ padding: '15px', background: '#f1f5f9', borderRadius: '6px' }}>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '4px' }}>Interface Identity</p>
                            <p style={{ fontWeight: 600 }}>Host: {scanResult.telemetry.hostname} ({scanResult.telemetry.interfaceRisk})</p>
                        </div>
                    </div>

                    <h3 style={{ fontSize: '0.9rem', marginBottom: '10px', color: 'var(--text-secondary)' }}>EXTRACTED COMPROMISED ENTITIES</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '30px' }}>
                        {scanResult.extractedData.credentials.map((cred, i) => (
                            <div key={i} style={{ padding: '10px 15px', background: '#fee2e2', color: '#991b1b', borderRadius: '6px', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                                🔑 {cred}
                            </div>
                        ))}
                        {scanResult.extractedData.ips.map((ip, i) => (
                            <div key={i} style={{ padding: '10px 15px', background: '#fef3c7', color: '#92400e', borderRadius: '6px', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                                🌐 {ip}
                            </div>
                        ))}
                        {scanResult.extractedData.credentials.length === 0 && scanResult.extractedData.ips.length === 0 && (
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>No explicit credentials or IPs detected in this snippet.</p>
                        )}
                    </div>

                    <h3 style={{ fontSize: '0.9rem', marginBottom: '10px', color: 'var(--text-secondary)' }}>RAW SOURCE SNIPPET</h3>
                    <div className="terminal-text">
                        {scanResult.rawSnippet}
                    </div>
                </motion.div>
            ) : (
                <div style={{ padding: '60px 20px', textAlign: 'center', color: '#94a3b8' }}>
                    <Play size={48} color="#cbd5e1" style={{ marginBottom: '15px' }} />
                    <p>Waiting for target URL...</p>
                </div>
            )}
        </div>

        {/* Live Intelligence Feed (Real-Time Scraping) */}
        <div className="glass-panel" style={{ height: 'fit-content' }}>
          <h2 style={{ fontSize: '1.1rem', marginBottom: '20px' }}>
            <Bell size={20} /> Live Intelligence Feed
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {news.length > 0 ? news.map((item) => (
                  <motion.div 
                    key={item.id} 
                    whileHover={{ x: 5 }} 
                    className="threat-alert" 
                    onClick={() => openReport(item)}
                    style={{ cursor: 'pointer' }}
                  >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                        <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>External Report</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{item.time}</span>
                      </div>
                      <p style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '5px' }}>{item.title}</p>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{item.snippet}</p>
                      <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.75rem', color: 'var(--accent-red)', fontWeight: 600 }}>
                          <ExternalLink size={12} /> READ INTELLIGENCE REPORT
                      </div>
                  </motion.div>
              )) : (
                  <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-secondary)' }}>
                      Connecting to intelligence nodes...
                  </div>
              )}
          </div>
        </div>

      </div>
    </motion.div>
  );
}

function MainLayout() {
  const location = useLocation();
  const isWiki = location.pathname === '/wiki';

  return (
    <div className="dashboard-container">
      <nav className="nav-bar">
        <div className="logo">
          <Shield size={28} /> <span>ShadowIntel</span>
        </div>
        <div style={{ display: 'flex', gap: '30px', fontWeight: 500 }}>
          {isWiki ? (
            <Link 
              to="/" 
              style={{ textDecoration: 'none', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem' }}
            >
              <ArrowLeft size={18} /> Back to Scanner
            </Link>
          ) : (
            <Link 
              to="/wiki" 
              style={{ textDecoration: 'none', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem' }}
            >
              <BookOpen size={18} /> Open Intelligence Wiki
            </Link>
          )}
        </div>
      </nav>

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Scanner />} />
          <Route path="/wiki" element={
            <motion.div key="wiki" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <EducationCenter />
            </motion.div>
          } />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
}

export default App;
