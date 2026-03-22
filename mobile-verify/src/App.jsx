import React, { useState } from 'react';
import { ShieldCheck, Link, Upload, AlertCircle, CheckCircle, ShieldAlert, Image as ImageIcon, FileText } from 'lucide-react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = '/api';

function App() {
  const [urlInput, setUrlInput] = useState('');
  const [fileInput, setFileInput] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState('URL'); // 'URL' or 'FILE'

  const handleScan = async () => {
    if (!urlInput && !fileInput) return;
    
    setIsScanning(true);
    setResult(null);

    // Simulate network delay for mobile realism
    setTimeout(async () => {
        try {
            const res = await axios.post(`${API_URL}/verify`, {
                url: activeTab === 'URL' ? urlInput : null,
                fileName: activeTab === 'FILE' ? fileInput : null
            });
            setResult(res.data);
        } catch (error) {
            console.error(error);
            setResult({ risk: 'WARNING', message: 'Unable to reach verification server.' });
        } finally {
            setIsScanning(false);
        }
    }, 1500);
  };

  const renderIcon = () => {
      if (!result) return null;
      switch(result.risk) {
          case 'SAFE': return <CheckCircle size={48} style={{ margin: '0 auto 10px' }} />;
          case 'WARNING': return <AlertCircle size={48} style={{ margin: '0 auto 10px' }} />;
          default: return <ShieldAlert size={48} style={{ margin: '0 auto 10px' }} />;
      }
  };

  return (
    <div className="mobile-container">
      <header className="header">
        <h1><ShieldCheck size={24} color="#3b82f6" /> SecureVerify</h1>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '5px' }}>Endpoint Threat Scanner</p>
      </header>

      <main className="content">
        
        {/* Tab Selection */}
        <div style={{ display: 'flex', background: '#e2e8f0', borderRadius: '8px', padding: '4px' }}>
            <button 
                onClick={() => { setActiveTab('URL'); setResult(null); }}
                style={{ flex: 1, padding: '10px', border: 'none', borderRadius: '6px', background: activeTab === 'URL' ? '#fff' : 'transparent', fontWeight: activeTab === 'URL' ? 600 : 400, cursor: 'pointer', boxShadow: activeTab === 'URL' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none' }}>
                Scan Link
            </button>
            <button 
                onClick={() => { setActiveTab('FILE'); setResult(null); }}
                style={{ flex: 1, padding: '10px', border: 'none', borderRadius: '6px', background: activeTab === 'FILE' ? '#fff' : 'transparent', fontWeight: activeTab === 'FILE' ? 600 : 400, cursor: 'pointer', boxShadow: activeTab === 'FILE' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none' }}>
                Scan File
            </button>
        </div>

        <motion.div key={activeTab} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="card">
            {activeTab === 'URL' ? (
                <>
                    <h2><Link size={18} /> Suspicious Link</h2>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '15px' }}>Paste an SMS link or email URL to verify against the Dark Web database.</p>
                    <input 
                        type="url" 
                        className="input-field" 
                        placeholder="https://..." 
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                    />
                </>
            ) : (
                <>
                    <h2><Upload size={18} /> Upload File Attachment</h2>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '15px' }}>Select an APK, PDF, or Photo to scan for embedded malware scripts.</p>
                    
                    {/* Simulated file upload for prototype */}
                    <input 
                        type="text" 
                        className="input-field" 
                        placeholder="Filename (e.g. invoice.pdf)" 
                        value={fileInput}
                        onChange={(e) => setFileInput(e.target.value)}
                    />
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                        <button className="btn-outline" onClick={() => setFileInput('photo_77.jpg')}><ImageIcon size={16}/> Photo</button>
                        <button className="btn-outline" onClick={() => setFileInput('urgent_document.pdf')}><FileText size={16}/> Doc</button>
                    </div>
                </>
            )}

            <button 
                className="btn btn-primary" 
                onClick={handleScan}
                disabled={isScanning || (activeTab === 'URL' ? !urlInput : !fileInput)}
            >
                {isScanning ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                        <ShieldAlert size={18} />
                    </motion.div>
                ) : (
                    <>Run AI Verification</>
                )}
            </button>
        </motion.div>

        <AnimatePresence>
            {result && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className={`result-box result-${result.risk}`}>
                    {renderIcon()}
                    <h3 style={{ marginBottom: '10px' }}>{result.risk}</h3>
                    <p style={{ fontSize: '0.9rem', lineHeight: '1.4' }}>{result.message}</p>
                </motion.div>
            )}
        </AnimatePresence>

      </main>
    </div>
  );
}

export default App;
