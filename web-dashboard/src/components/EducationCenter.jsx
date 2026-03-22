import React, { useState } from 'react';
import { Book, Info, ShieldAlert, Zap, Globe, Lock, Code, Database, TrendingDown, EyeOff, Layout } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const pages = [
  {
    id: 'history',
    title: "History and creation",
    icon: <Book size={18} />,
    content: (
      <div>
        <p>The dark web was not designed as an anonymous haven for criminals; it began as a specialized project for secure governmental communication. Its conceptual roots actually trace back to the late 1960s with ARPANET, the US Defense Department's experimental network that eventually became the internet.</p>
        
        <h4>The Dawn of Decentralization (2000)</h4>
        <p>The first true precursor to the modern dark web was **Freenet**, released in 2000 by Ian Clarke. His goal was to create a peer-to-peer network designed strictly to prevent censorship and allow total freedom of speech, effectively introducing the concept of a decentralized, anonymous online space where users could not be tracked by governments.</p>
        
        <h4>The Creation of Tor (2002)</h4>
        <p>The modern architecture of the Dark Web—powered by Tor—was created by computer scientists Paul Syverson, Michael G. Reed, and David Goldschlag at the **United States Naval Research Laboratory (NRL)**. The military needed a highly secure way to conduct intelligence gathering and allow operatives to communicate in hostile territories without their physical locations or IP addresses being exposed. They invented "Onion Routing," which encrypted data in multiple layers.</p>
        <p>In 2002, realizing that a covert network is only truly anonymous if millions of normal civilians use it (so spies can blend into the crowd), the NRL released Tor as open-source software. The Tor Project was subsequently formed as a non-profit, allowing journalists and activists to leverage military-grade encryption.</p>
        
        <h4>The Commercialization of Cybercrime (2011)</h4>
        <p>The dark web fundamentally shifted from a privacy tool to a criminal hub in 2011 with the launch of the **Silk Road**, created by Ross Ulbricht ("Dread Pirate Roberts"). The Silk Road combined the untrackable nature of Tor with the newly invented, decentralized currency of **Bitcoin**. This completely eliminated the need for credit cards, creating the first truly anonymous global black market. Though the Silk Road was shut down by the FBI in 2013, it set the structural blueprint for modern dark web marketplaces and ransomware hubs today.</p>
      </div>
    )
  },
  {
    id: 'pos-neg',
    title: "Pros & Cons",
    icon: <TrendingDown size={18} />,
    content: (
      <div>
        <h4>The Pros: A Lifeline for Free Speech</h4>
        <p>While often demonized, the dark web fundamentally protects the right to universal privacy and free expression. For dissidents, journalists, and citizens living under authoritarian regimes with strict internet censorship (like the Great Firewall of China), the dark web is the only way to communicate safely. It completely bypasses state-sponsored monitoring and ISP tracking.</p>
        <p>Major legitimate organizations utilize it specifically for this reason. The CIA, BBC News, ProPublica, and The New York Times all host official ".onion" websites. Furthermore, the dark web houses systems like **SecureDrop**, an encrypted whistleblower submission system used globally by journalists to receive highly classified documents without ever exposing the source's identity (as seen with Edward Snowden).</p>
        
        <h4>The Cons: Unregulated Criminal Black Markets</h4>
        <p>Unfortunately, mathematically unbreakable anonymity is a double-edged sword. Because it is physically impossible to track who is running a server or buying a product, the dark web has birthed massive, utterly unregulated global crime syndicates that operate with near impunity.</p>
        <p>Without central authorities, law enforcement faces immense jurisdictional hurdles. The network facilitates extreme forms of illicit trafficking, including weapons, narcotics (like the AlphaBay and Silk Road empires), and—most dangerously for the corporate world—**Data & Cyberweapons**.</p>
        <p>The "Cons" hit organizations extremely hard. Highly destructive payloads like "zero-day exploits" (unpatched software vulnerabilities) or complete Ransomware-as-a-Service (RaaS) portals are openly traded. This complete lack of accountability means rookie criminals can purchase military-grade hacking tools for a few dollars in Bitcoin, drastically lowering the barrier to entry for conducting devastating cyberattacks against businesses.</p>
      </div>
    )
  },
  {
    id: 'crimes',
    title: "Crimes",
    icon: <ShieldAlert size={18} />,
    content: (
      <div>
        <p>Cybercrime on the dark web is fundamentally different from traditional hacking. It has evolved from isolated individuals executing rogue scripts into mature, heavily industrialized, billion-dollar corporate cartels. The dark web ecosystem operates exactly like a legal supply chain, but for illicit acts.</p>
        
        <h4>1. Credential Trafficking & Initial Access Brokers (IABs)</h4>
        <p>Threat actors rarely attack companies from scratch. Instead, specialized hackers called **Initial Access Brokers** breach corporate databases, steal lists of employee emails, session tokens, and passwords, and package them into massive "Combo Lists." They sell these on highly restricted `.onion` forums to secondary cartels. These secondary groups then use automated tools to perform **Credential Stuffing**—testing thousands of stolen passwords per second across prominent banks, healthcare platforms, and corporate VPNs until they successfully infiltrate a network.</p>
        
        <h4>2. Malware-as-a-Service (MaaS)</h4>
        <p>Historically, conducting a cyberattack required immense coding capability. Today, expert malware developers simply rent out highly sophisticated viruses (like **Infostealers** or **Remote Access Trojans (RATs)**) on a sleek, monthly subscription basis. The buyer (who requires zero coding skill) simply deploys the malware through phishing emails, while the developer takes a 20% cut of all illicit profits generated by the tool.</p>
        
        <h4>3. Ransomware Extortion Hubs & Double Extortion</h4>
        <p>Ransomware cartels (such as LockBit, ALPHV, and Clop) host dedicated PR sites on the dark web. The modern threat is **Double Extortion**: hackers don't just encrypt a company's files; they quietly exfiltrate all the sensitive data first. If the victim organization refuses to pay the multi-million dollar ransom, the cartel uses these public dark web pages to slowly leak the stolen intellectual property (client records, unreleased source code, internal emails), weaponizing public shaming, brand destruction, and regulatory fines to force payment.</p>
      </div>
    )
  },
  {
    id: 'tor',
    title: "TOR Network",
    icon: <Lock size={18} />,
    content: (
      <div>
        <p>**TOR** stands for **The Onion Router**. It serves as both a specialized forensic browser and a decentralized global network consisting of thousands of volunteered servers (called relays). Its singular design objective is to make internet tracking, traffic analysis, and IP identification strictly mathematically impossible.</p>
        
        <h4>The Mechanics of Onion Routing</h4>
        <p>Imagine placing a physical letter inside three separate locked safes, one inside the other. When you open the Tor browser and request a dark web page, your computer encrypts your data packet in three distinct cryptographic layers (resembling the layers of an onion). Your data is then bounced through three random volunteer computers globally:</p>
        <ul>
            <li><strong>The Guard (Entry) Node:</strong> Removes the first layer of encryption. It knows your real IP address, but because of the remaining encryption layers, it has absolutely no idea what website you are trying to visit.</li>
            <li><strong>The Middle Relay Node:</strong> Removes the second layer. It only knows that data came from the Guard Node and needs to go to the Exit Node. It knows neither who you are nor what your destination is.</li>
            <li><strong>The Exit Node:</strong> Removes the final layer of encryption and delivers the raw data to the destination website. It knows exactly what the data is and where it is going, but has utterly no idea who originally sent it.</li>
        </ul>
        <p>This strict cryptographic shuffling guarantees that no single computer in the chain possesses the complete picture, rendering traditional ISP tracking, corporate firewalls, and government surveillance totally obsolete.</p>
      </div>
    )
  },
  {
    id: 'warnings',
    title: "The Hazards of Access",
    icon: <EyeOff size={18} />,
    content: (
      <div>
        <p>While the dark web is heavily romanticized in media, natively accessing it using standard methodology poses extreme, unacceptable hazards to corporate networks and personal devices.</p>
        
        <h4>1. A Lawless Digital Badland</h4>
        <p>The dark web operates entirely outside the boundaries of consumer internet protection. Standard browsers will not verify SSL certificates, block malicious scripts, or warn you of impending threats here. Visiting a seemingly innocent dark web forum can instantly trigger a "drive-by download", exposing your device to highly destructive **zero-day exploits** the moment Javascript executes.</p>
        
        <h4>2. Active Honeypots & Law Enforcement Traps</h4>
        <p>Because the environment is anonymous, trust is non-existent. Over 30% of illicit dark web marketplaces and forums are actually highly sophisticated **Honeypots**—traps set up by either rival cybercriminal cartels looking to infect visitors with malware, or international law enforcement agencies (like the FBI or Interpol). Authorities frequently execute operations (like *Operation Onymous* or *Operation Cronos*) where they secretly take over a dark web server for months, meticulously tracking and logging the IP addresses of every single visitor before making mass arrests.</p>
        
        <h4>The Proper Defense Model</h4>
        <p>Organizations must absolutely never use native company laptops to "browse" the dark web for threats. The only safe defense relies on autonomous, hardened **Threat Intelligence Platforms** (like this system). These systems utilize isolated proxy nodes (Disposable Docker Containers) to safely scrape data, allowing analysts to monitor if their corporate assets are compromised without ever directly exposing the internal network to dark web hazards.</p>
      </div>
    )
  },
  {
    id: 'webs',
    title: "Difference",
    icon: <Layout size={18} />,
    content: (
      <div>
        <p>To truly grasp cybersecurity, one must understand that the "Internet" is strictly divided into three distinct layers based entirely on searchability and accessibility:</p>
        
        <h4>1. The Surface Web (Approx. 4-5% of the Internet)</h4>
        <p>This is the visible web you interact with daily. It contains anything that a standard web crawler (like Google, Bing, or Yahoo) can index. This includes news sites, public Wikipedia articles, e-commerce storefronts, and public social media profiles. It represents a massive volume of users, but a tiny fraction of total internet data.</p>
        
        <h4>2. The Deep Web (Approx. 90% of the Internet)</h4>
        <p>The Deep Web is completely legal, but entirely hidden from search engines. It consists of pages that require authentications, passwords, or specific database queries to access. If Google cannot index it, it resides here. This includes your online banking portals, secure medical records (HIPAA compliance), private corporate intranets, unlisted YouTube videos, and the backend infrastructure of your Netflix or Gmail accounts. Without the Deep Web, digital privacy would not exist.</p>
        
        <h4>3. The Dark Web (Approx. 5-6% of the Internet)</h4>
        <p>The Dark Web is a subset of the Deep Web that has been intentionally concealed. It requires specialized decryption software, specific configurations, and unique authorized routing protocols (like **Tor** or **I2P**) to access. It utilizes non-standard domains (like `.onion` instead of `.com`) and routes traffic heavily through encrypted nodes to ensure both the host running the website and the visitor browsing it remain completely untraceable.</p>
      </div>
    )
  },
  {
    id: 'recovery',
    title: "Solution",
    icon: <Zap size={18} />,
    content: (
      <div>
        <p>When an organization's internal threat intelligence or endpoint scanner detects a critical dark web compromise (such as a leaked VIP executive credential or a downloaded payload), a strict, immediate **Incident Response Protocol** must actively engage to prevent total collapse:</p>
        
        <ol>
            <li><strong>Immediate Physical & Network Isolation (Containment):</strong> Time is the most critical metric. Do not attempt to "clean" the machine while it is live. Immediately disconnect the affected hardware from all ethernet, VPN, and corporate Wi-Fi architectures. The sole objective is to sever the hacker's lateral movement capabilities to prevent the malware from reaching the central corporate servers.</li>
            <li><strong>Categorical Credential Zeroing (Eradication):</strong> Do not trust the compromised device. From an entirely separate, verified-clean device, force an immediate, global password reset across all core identity access platforms (Active Directory, Azure, AWS, Google Workspace). Most critically, **revoke all active session tokens/cookies**, as modern hackers frequently bypass passwords entirely by stealing live authentication cookies.</li>
            <li><strong>Forensic Imaging & Analysis (Investigation):</strong> Do not simply "turn off" or restart the compromised computer, as doing so will permanently wipe vital forensic artifacts stored in the volatile memory (RAM). Security teams must logically image the RAM and storage drives to perfectly isolate the malware's signature for CISA reporting before wiping the machine back to factory standards.</li>
            <li><strong>Proactive Continuous Hardening (Recovery):</strong> Add the victim's compromised credentials to an autonomous Dark Web Threat scanner. Even if you secured your network today, hackers heavily recycle stolen data. If they attempt to sell the exact same stolen dataset on a Russian forum six months from now, the automated AI system will preemptively alert your security team to the resurgence.</li>
        </ol>
      </div>
    )
  }
];

const EducationCenter = () => {
  const [activeTab, setActiveTab] = useState(pages[0].id);

  return (
    <div className="glass-panel" style={{ marginTop: '20px', minHeight: '600px', display: 'flex', gap: '30px' }}>
      
      {/* Sidebar Navigation */}
      <div style={{ width: '300px', borderRight: '1px solid var(--border-color)', paddingRight: '20px' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '20px' }}>Intelligence Wiki</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {pages.map((page) => (
            <button
              key={page.id}
              onClick={() => setActiveTab(page.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '12px 15px', border: 'none', borderRadius: '6px', cursor: 'pointer',
                textAlign: 'left', fontFamily: 'var(--font-main)', fontSize: '0.9rem',
                backgroundColor: activeTab === page.id ? '#fff1f2' : 'transparent',
                color: activeTab === page.id ? 'var(--accent-red)' : 'var(--text-secondary)',
                fontWeight: activeTab === page.id ? '600' : '400',
                transition: 'all 0.2s'
              }}
            >
              {page.icon} {page.title}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div style={{ flex: 1, padding: '10px' }}>
        <AnimatePresence mode="wait">
          {pages.map((page) => (
            activeTab === page.id && (
              <motion.div
                key={page.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.7' }}
              >
                <h3 style={{ color: 'var(--text-primary)', fontSize: '1.5rem', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                  {page.icon} {page.title}
                </h3>
                {page.content}
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
};

export default EducationCenter;
