/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Shield, Fingerprint, Cpu, Lock, Terminal } from 'lucide-react';

interface BiometricAuthProps {
  onLogin: (username: string) => void;
}

export default function BiometricAuth({ onLogin }: BiometricAuthProps) {
  const [username, setUsername] = useState('architect_alpha');
  const [pin, setPin] = useState('••••');
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([
    'SYS: SECURE SHELL INITIALIZED',
    'SYS: BOUND TO GATEWAY INGRESS PORT 3000',
    'SYS: WAITING FOR OPERATIVE AUTHENTICATION'
  ]);

  const handleStartScan = () => {
    setIsAuthorizing(true);
    setLogs(prev => [...prev, 'CRITICAL: READING BIOMETRIC SIGNATURE...']);
    
    const interval = setInterval(() => {
      setScanProgress(curr => {
        if (curr >= 100) {
          clearInterval(interval);
          setLogs(prev => [
            ...prev,
            'CRITICAL: SIGNATURE AUTHENTICATED SUCCESSFULLY',
            'SYS: ACCESS GRANTED / LOADING COGNITIVE SECURITY ENGINE'
          ]);
          setTimeout(() => {
            onLogin(username);
          }, 800);
          return 100;
        }
        const next = curr + 10;
        if (next === 40) {
          setLogs(prev => [...prev, 'SYS: SEED VERIFICATION COMPLETE']);
        }
        if (next === 80) {
          setLogs(prev => [...prev, 'SYS: EXECUTING DOUBLE CRYPTOGRAPHIC HASH']);
        }
        return next;
      });
    }, 150);
  };

  return (
    <div id="auth-portal" className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 selection:bg-cyan-500/30">
      {/* Background Neon Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />
      
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-lg p-6 shadow-[0_0_50px_-12px_rgba(34,197,94,0.15)] overflow-hidden">
        {/* Top Header Grid Accent */}
        <div className="absolute top-0 inset-x-0 h-1 bg-[linear-gradient(90deg,#0ea5e9,#10b981,#0ea5e9)]" />

        <div className="flex flex-col items-center mb-6 text-center">
          <div className="h-14 w-14 rounded-full bg-slate-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <Shield className="h-7 w-7" />
          </div>
          <h2 className="text-xl font-mono tracking-wider font-semibold text-slate-100">AI CYBER DEFENSE PORTAL</h2>
          <p className="text-xs text-slate-500 font-mono mt-1">OPERATIVE CLEARANCE LEVEL III</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase mb-1">Operative Identity</label>
            <div className="relative">
              <Cpu className="absolute left-3 top-2.5 h-4 w-4 text-cyan-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isAuthorizing}
                placeholder="identity_code"
                className="w-full px-10 py-2 bg-slate-950 text-slate-100 font-mono text-sm rounded border border-slate-800 focus:border-cyan-500 focus:outline-none transition-colors"
                id="username-input"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase mb-1">Authorization PIN</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-cyan-400" />
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                disabled={isAuthorizing}
                placeholder="••••"
                className="w-full px-10 py-2 bg-slate-950 text-slate-100 font-mono text-sm rounded border border-slate-800 focus:border-cyan-500 focus:outline-none transition-colors animate-pulse"
                id="pin-input"
              />
            </div>
          </div>

          {/* Fingerprint Touch Panel */}
          <div className="border border-slate-800 bg-slate-950 rounded p-4 flex flex-col items-center justify-center my-6 relative">
            {isAuthorizing ? (
              <div className="w-full space-y-3">
                <div className="flex justify-between items-center text-xs font-mono text-emerald-400">
                  <span>ANALYZING HASH...</span>
                  <span>{scanProgress}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-900 rounded overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 transition-all duration-150 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                    style={{ width: `${scanProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleStartScan}
                className="group flex flex-col items-center justify-center space-y-2 p-3 text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
                id="start-biometric-button"
              >
                <div className="relative p-4 rounded-full border border-emerald-500/20 group-hover:border-emerald-500/40 bg-slate-900/50 group-hover:bg-emerald-500/5 transition-all shadow-[0_0_15px_rgba(16,185,129,0.02)]">
                  <Fingerprint className="h-10 w-10 animate-pulse" />
                </div>
                <span className="text-xs font-mono tracking-wider">TAP TO SCAN BIOMETRICS</span>
              </button>
            )}
          </div>

          {/* Terminal Logs Footer */}
          <div className="bg-slate-950 border border-slate-800 rounded p-3 font-mono text-[10px] text-cyan-500 space-y-1 select-none">
            <div className="flex items-center gap-1 border-b border-slate-900 pb-1 mb-1 text-slate-500">
              <Terminal className="h-3 w-3" />
              <span>TERMINAL SECURITY LOGS</span>
            </div>
            {logs.slice(-3).map((l, i) => (
              <div key={i} className="truncate">
                &gt; {l}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
