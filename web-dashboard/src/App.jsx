import React, { useState } from 'react';
import { Shield, Search, Activity, Cpu, Bell, AlertTriangle, Play, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import EducationCenter from './components/EducationCenter';

const API_URL = '/api';

function App() {
  const [targetUrl, setTargetUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [showWiki, setShowWiki] = useState(false);
  const [customApi, setCustomApi] = useState(API_URL);

  const handleScan = async (e) => {
    e.preventDefault();
    if (!targetUrl) return;
    
    setIsScanning(true);
    setScanResult(null);

    try {
        const response = await axios.post(`${customApi}/scan`, { targetUrl });
        setScanResult(response.data);
    } catch (error) {
        console.error(error);
        alert(`Failed to connect to Local AI Engine at ${customApi}`);
    } finally {
        setIsScanning(false);
    }
  };

  return (
    <div className="dashboard-container">
      <nav className="nav-bar">
        <div className="logo">
          <Shield size={28} /> <span>ShadowIntel</span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {/* API Endpoint Config for Remote Access */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f1f5f9', padding: '5px 12px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
             <Activity size={14} color="#047857" />
             <input 
                type="text" 
                value={customApi} 
                onChange={(e) => setCustomApi(e.target.value)}
                style={{ background: 'none', border: 'none', fontSize: '0.75rem', color: 'var(--text-secondary)', width: '150px', outline: 'none', fontFamily: 'var(--font-mono)' }}
                placeholder="AI Engine URL..."
             />
          </div>

          <div style={{ display: 'flex', gap: '20px', fontWeight: 500 }}>
            <button 
                onClick={() => setShowWiki(!showWiki)}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}
            >
                <BookOpen size={18} /> {showWiki ? 'Close Wiki' : 'Wiki'}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {showWiki ? (
          <motion.div key="wiki" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
             <EducationCenter />
          </motion.div>
        ) : (
          <motion.div key="dash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
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
                         <p>Tor SOCKS5 Crawler Active... Injecting into NLP Pipeline...</p>
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

              {/* Threat Feed (Static) */}
              <div className="glass-panel" style={{ height: 'fit-content' }}>
                <h2 style={{ fontSize: '1.1rem', marginBottom: '20px' }}><Bell size={20} /> Live Threat Feed</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <motion.div whileHover={{ x: 5 }} className="threat-alert">
                       <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                         <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Corporate Exploit</span>
                         <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>2m ago</span>
                       </div>
                       <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Detected LockBit discussion mentioning infrastructure vulnerabilities.</p>
                    </motion.div>
                    <motion.div whileHover={{ x: 5 }} className="threat-alert" style={{ borderLeftColor: '#f59e0b', background: '#fffbeb' }}>
                       <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                         <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Phishing Kit</span>
                         <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>1hr ago</span>
                       </div>
                       <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>New Office365 credential harvester template sold on forum.</p>
                    </motion.div>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
