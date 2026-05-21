/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, 
  Terminal, 
  Cpu, 
  Settings, 
  Layers, 
  Compass, 
  Zap, 
  CheckSquare, 
  FileText, 
  MessageSquare, 
  History, 
  AlertTriangle, 
  Database, 
  Network, 
  Lock, 
  HelpCircle, 
  CheckCircle, 
  XCircle, 
  Star, 
  Send,
  Download,
  Play,
  RotateCcw,
  Cloud,
  FileCode,
  Sliders,
  LogOut,
  User,
  Heart,
  Globe,
  Loader,
  BookOpen
} from 'lucide-react';
import { Project, Threat, SecurityLayer, ComplianceItem, AnalysisResult, SimulationLog } from './types';
import { INDUSTRIES, TECH_STACKS, AUTH_TYPES, DATA_SENSITIVITIES, DEPLOYMENT_MODELS, APIS_LIST, USER_ROLES, SCALE_OPTIONS, generateMockAnalysis } from './utils/cyberData';

export default function App() {
  // Page routing
  const [activeTab, setActiveTab] = useState<'landing' | 'new-project' | 'dashboard' | 'visualizer' | 'simulator' | 'compliance' | 'devsecops' | 'ai-chat' | 'history'>('landing');
  
  // User Authentication simulation state
  const [userProfile, setUserProfile] = useState<{ email: string; role: string; token: string } | null>({
    email: 'sumitjorhain20102004@gmail.com',
    role: 'Cyber Architect (DevOps)',
    token: 'SEC-JWT-823901'
  });
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authEmail, setAuthEmail] = useState('');
  const [authRole, setAuthRole] = useState('Cyber Architect');

  // New project build states
  const [projectName, setProjectName] = useState('Global Retail Bank Core');
  const [projectIndustry, setProjectIndustry] = useState<typeof INDUSTRIES[number]>('Banking');
  const [selectedTechStack, setSelectedTechStack] = useState<string[]>(['React', 'Node.js', 'PostgreSQL', 'Docker', 'Nginx']);
  const [projectAuthType, setProjectAuthType] = useState<string>('JWT');
  const [projectSensitivity, setProjectSensitivity] = useState<string>('Restricted/Financial');
  const [projectDeployment, setProjectDeployment] = useState<string>('Cloud Public');
  const [selectedAPIs, setSelectedAPIs] = useState<string[]>(['Stripe (Payments)', 'Third-Party Banking APIs']);
  const [selectedUserRoles, setSelectedUserRoles] = useState<string[]>(['Admin', 'Regular User', 'Financial Officer']);
  const [projectScale, setProjectScale] = useState<string>('10k-100k Users (Mid-market)');

  // Active loaded project logic
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysesHistory, setAnalysesHistory] = useState<Project[]>([]);

  // Simulation controls
  const [selectedExploit, setSelectedExploit] = useState<'sqli' | 'ddos' | 'mitm' | 'api' | 'ransomware'>('sqli');
  const [simulationLogs, setSimulationLogs] = useState<SimulationLog[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState(0);
  const [simulationStatus, setSimulationStatus] = useState<'idle' | 'running' | 'blocked' | 'breached'>('idle');

  // AI Chat controls
  const [chatMessages, setChatMessages] = useState<{ id: string; sender: 'user' | 'assistant'; text: string; timestamp: string }[]>([
    { id: '1', sender: 'assistant', text: 'Greeting Operator. I am the **Neo-Shield AI Security Assistant**. Load a project or ask any security question — I can evaluate architectural flaws, suggest compliance mitigations, and draft custom script defenses.', timestamp: new Date().toLocaleTimeString() }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatSending, setIsChatSending] = useState(false);

  // Administrative calibration
  const [feedbackRating, setFeedbackRating] = useState<number>(5);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [currentCveFilter, setCurrentCveFilter] = useState('');

  // Active compliant framework selection
  const [selectedFramework, setSelectedFramework] = useState<string>('PCI-DSS v4.0');

  // DevSecOps secure code examples selection
  const [selectedLang, setSelectedLang] = useState<'nodejs' | 'python' | 'go' | 'spring'>('nodejs');

  // Threat Intelligence states
  const [threatIntelData, setThreatIntelData] = useState<{
    cves: any[];
    otxPulses: any[];
    vtStatus: string;
    vtDetections: number;
    iocs: any[];
    usingRealEndpoints: boolean;
  } | null>(null);
  const [isFetchingIntel, setIsFetchingIntel] = useState(false);
  const [intelError, setIntelError] = useState<string | null>(null);
  const [hasInjectedLiveThreats, setHasInjectedLiveThreats] = useState(false);

  // What-If Scenario Sandbox Modeler states
  const [isWhatIfMode, setIsWhatIfMode] = useState(false);
  const [whatIfProject, setWhatIfProject] = useState<Project | null>(null);

  // Initialize a baseline analysis on startup
  useEffect(() => {
    const baselineProject: Project = {
      id: 'proj-baseline',
      name: 'Global Retail Bank Core',
      industry: 'Banking',
      techStack: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'Nginx'],
      authType: 'JWT',
      dataSensitivity: 'Restricted/Financial',
      deploymentModel: 'Cloud Public',
      apisUsed: ['Stripe (Payments)', 'Third-Party Banking APIs'],
      userRoles: ['Admin', 'Regular User', 'Financial Officer'],
      scale: '10k-100k Users (Mid-market)',
      createdAt: new Date().toLocaleDateString(),
    };
    const baselineAnalysis = generateMockAnalysis(baselineProject);
    baselineProject.analysis = baselineAnalysis;
    
    // Set baseline state
    setActiveProject(baselineProject);
    setAnalysesHistory([baselineProject]);
  }, []);

  // Set system framework tabs depending on project industry
  useEffect(() => {
    if (activeProject) {
      if (activeProject.industry === 'Banking') {
        setSelectedFramework('PCI-DSS v4.0');
      } else if (activeProject.industry === 'Healthcare') {
        setSelectedFramework('HIPAA Security Rule');
      } else if (activeProject.industry === 'Education ERP') {
        setSelectedFramework('FERPA');
      } else if (activeProject.industry === 'Government') {
        setSelectedFramework('NIST SP 800-53');
      } else {
        setSelectedFramework('ISO / IEC 27001:2022');
      }
    }
  }, [activeProject]);

  // Load preset projects quickly
  const loadQuickPreset = (presetType: 'banking' | 'healthcare' | 'govt' | 'ecommerce') => {
    if (presetType === 'banking') {
      setProjectName('Hansa Secure Fintech');
      setProjectIndustry('Banking');
      setSelectedTechStack(['React', 'Node.js', 'PostgreSQL', 'Redis', 'Kubernetes']);
      setProjectAuthType('MFA');
      setProjectSensitivity('Restricted/Financial');
      setProjectDeployment('Cloud Private');
      setSelectedAPIs(['Stripe (Payments)', 'Third-Party Banking APIs']);
      setSelectedUserRoles(['Admin', 'Regular User', 'Financial Officer', 'Auditor']);
      setProjectScale('1M+ Enterprise (Global Scale)');
    } else if (presetType === 'healthcare') {
      setProjectName('CarePulse Telehealth Portal');
      setProjectIndustry('Healthcare');
      setSelectedTechStack(['React', 'Python (FastAPI)', 'PostgreSQL', 'AWS Services', 'Docker']);
      setProjectAuthType('SAML');
      setProjectSensitivity('Critical Health Data');
      setProjectDeployment('Hybrid');
      setSelectedAPIs(['SendGrid (Email)', 'Twilio (SMS/MFA)']);
      setSelectedUserRoles(['Doctor/Medical', 'Patient', 'Admin']);
      setProjectScale('10k-100k Users (Mid-market)');
    } else if (presetType === 'govt') {
      setProjectName('National Citizen Registry');
      setProjectIndustry('Government');
      setSelectedTechStack(['Node.js', 'PostgreSQL', 'Nginx', 'Docker']);
      setProjectAuthType('RBAC');
      setProjectSensitivity('State Secrets');
      setProjectDeployment('On-Premise');
      setSelectedAPIs(['Twilio (SMS/MFA)']);
      setSelectedUserRoles(['Admin', 'Auditor', 'System Operative']);
      setProjectScale('1M+ Enterprise (Global Scale)');
    } else {
      setProjectName('NovaCart Retail Channel');
      setProjectIndustry('E-commerce');
      setSelectedTechStack(['React', 'Express', 'MongoDB', 'Redis', 'Firebase']);
      setProjectAuthType('JWT');
      setProjectSensitivity('Internal/PII');
      setProjectDeployment('Cloud Public');
      setSelectedAPIs(['Stripe (Payments)', 'SendGrid (Email)']);
      setSelectedUserRoles(['Admin', 'Regular User', 'Guest']);
      setProjectScale('10k-100k Users (Mid-market)');
    }
    setActiveTab('new-project');
  };

  // Submit diagnostic assessment (Server + Local fallbacks)
  const handleRunSecurityAnalysis = async () => {
    setIsAnalyzing(true);
    const newProject: Project = {
      id: 'proj-' + Date.now(),
      name: projectName || 'Untitled Crypt-App',
      industry: projectIndustry,
      techStack: selectedTechStack,
      authType: projectAuthType as any,
      dataSensitivity: projectSensitivity as any,
      deploymentModel: projectDeployment as any,
      apisUsed: selectedAPIs,
      userRoles: selectedUserRoles,
      scale: projectScale,
      createdAt: new Date().toLocaleString(),
    };

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ project: newProject }),
      });
      const data = await response.json();
      if (data.result) {
        newProject.analysis = data.result;
      } else {
        newProject.analysis = generateMockAnalysis(newProject);
      }
    } catch (err) {
      console.warn('Analysis communication error, implementing clean dynamic simulator diagnostics.');
      newProject.analysis = generateMockAnalysis(newProject);
    }

    setActiveProject(newProject);
    setAnalysesHistory((prev) => [newProject, ...prev]);
    setIsAnalyzing(false);
    setActiveTab('dashboard');
  };

  // Toggle active security guards from visualizer to adapt risk scores dynamically
  const toggleSecurityLayer = (layerId: string) => {
    const isWhatIf = isWhatIfMode;
    const targetProject = isWhatIf ? whatIfProject : activeProject;
    if (!targetProject || !targetProject.analysis) return;
    
    const oldAnalysis = targetProject.analysis;
    const updatedLayers = oldAnalysis.securityLayers.map(l => 
      l.id === layerId ? { ...l, enabled: !l.enabled } : l
    );

    // Calculate updated mitigations dynamic count
    const numEnabled = updatedLayers.filter(l => l.enabled).length;
    const maxLayers = updatedLayers.length;
    // Reduce risk based on active layers
    const riskFactor = 1 - (numEnabled / maxLayers) * 0.6; 
    const baseMock = generateMockAnalysis(targetProject);
    const updatedRisk = Math.max(12, Math.round(baseMock.riskScore * riskFactor));
    const updatedMaturityScore = Math.min(100, Math.round(baseMock.maturityScore + (numEnabled * 6)));

    // Re-verify threat mitigation state reflecting changes
    const updatedThreats = oldAnalysis.threats.map(t => {
      const layer = updatedLayers.find(l => l.id === t.mitigationLayerId);
      return {
        ...t,
        status: (layer && layer.enabled) ? 'Mitigated' as const : 'Unmitigated' as const
      };
    });

    const refreshedAnalysis: AnalysisResult = {
      ...oldAnalysis,
      riskScore: updatedRisk,
      maturityScore: updatedMaturityScore,
      securityLayers: updatedLayers,
      threats: updatedThreats
    };

    const updatedProject = {
      ...targetProject,
      analysis: refreshedAnalysis
    };

    if (isWhatIf) {
      setWhatIfProject(updatedProject);
    } else {
      setActiveProject(updatedProject);
    }
  };

  // Fetch and correlate threat intelligence feeds from sources like CISA, AlienVault OTX & VirusTotal
  const fetchThreatIntelligence = async () => {
    const targetProj = isWhatIfMode ? whatIfProject : activeProject;
    if (!targetProj) return;
    
    setIsFetchingIntel(true);
    setIntelError(null);
    try {
      const response = await fetch('/api/threat-intel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          techStack: targetProj.techStack,
          industry: targetProj.industry
        })
      });
      if (response.ok) {
        const data = await response.json();
        setThreatIntelData(data);
      } else {
        setIntelError('Threat Intel API endpoints reported unexpected diagnostic status.');
      }
    } catch (err: any) {
      console.error('Failed to communicate with Threat Intel gateway:', err);
      setIntelError('Unable to connect to Threat Intel feed provider. System offline.');
    } finally {
      setIsFetchingIntel(false);
    }
  };

  // Inject correlated threat items into the active architecture assessment
  const injectLiveThreatsToModel = () => {
    const targetProj = isWhatIfMode ? whatIfProject : activeProject;
    if (!targetProj || !targetProj.analysis || !threatIntelData) return;

    const currentAnalysis = targetProj.analysis;
    const newThreats = [...currentAnalysis.threats];
    const newVulns = [...currentAnalysis.vulnerabilities];

    threatIntelData.cves.forEach((cve: any) => {
      const threatId = `thr-live-${cve.cveID.toLowerCase()}`;
      if (!newThreats.some(t => t.id === threatId)) {
        newThreats.push({
          id: threatId,
          name: `LIVE INGRESS: ${cve.vulnerabilityName} (${cve.cveID})`,
          category: cve.product.toLowerCase().includes('database') || cve.product.toLowerCase().includes('postgres') || cve.product.toLowerCase().includes('mongo') ? 'SQL Injection' : cve.product.toLowerCase().includes('auth') || cve.product.toLowerCase().includes('keycloak') ? 'Insider Attack' : 'API Abuse',
          description: `Vulnerability identified in vendor products actively exploited in the wild. Details: ${cve.shortDescription}`,
          likelihood: 'High',
          impact: cve.knownRansomwareCampaignUse === 'Known' ? 'High' : 'Medium',
          severityScore: cve.knownRansomwareCampaignUse === 'Known' ? 9.6 : 7.8,
          mitigation: cve.requiredAction,
          status: 'Unmitigated',
          mitigationLayerId: cve.product.toLowerCase().includes('postgres') || cve.product.toLowerCase().includes('mongo') ? 'lay-enc' : cve.product.toLowerCase().includes('express') ? 'lay-gw' : 'lay-waf'
        });
      }

      if (!newVulns.some(v => v.cveId === cve.cveID)) {
        newVulns.push({
          cveId: cve.cveID,
          title: cve.vulnerabilityName,
          description: cve.shortDescription,
          probability: cve.knownRansomwareCampaignUse === 'Known' ? 95 : 72,
          affectedComponent: cve.product,
          remediation: cve.requiredAction
        });
      }
    });

    // Escalate general risk metrics to reflect live cyber-adversary threat campaigns active
    const extraRisk = threatIntelData.cves.some(c => c.knownRansomwareCampaignUse === 'Known') ? 12 : 6;
    const updatedRisk = Math.min(99, currentAnalysis.riskScore + extraRisk);

    const updatedAnalysis = {
      ...currentAnalysis,
      riskScore: updatedRisk,
      threats: newThreats,
      vulnerabilities: newVulns
    };

    const updatedProj = {
      ...targetProj,
      analysis: updatedAnalysis
    };

    if (isWhatIfMode) {
      setWhatIfProject(updatedProj);
    } else {
      setActiveProject(updatedProj);
    }

    setHasInjectedLiveThreats(true);
  };

  // Triggered when any parameter is changed in the What-If sandbox modeler
  const handleWhatIfParamChange = (field: keyof Project, value: any) => {
    if (!whatIfProject) return;
    
    // Construct the updated project variables
    const updatedProj: Project = {
      ...whatIfProject,
      [field]: value
    };

    // Calculate baseline mock analysis for the new settings
    const baseMock = generateMockAnalysis(updatedProj);

    // Sync security layers from existing sandbox to preserve active switches
    if (whatIfProject.analysis) {
      const existingLayers = whatIfProject.analysis.securityLayers;
      const mergedLayers = baseMock.securityLayers.map(bl => {
        const matchingEl = existingLayers.find(el => el.id === bl.id);
        return matchingEl ? { ...bl, enabled: matchingEl.enabled } : bl;
      });

      const numEnabled = mergedLayers.filter(l => l.enabled).length;
      const maxLayers = mergedLayers.length;
      const riskFactor = 1 - (numEnabled / maxLayers) * 0.6;
      const updatedRisk = Math.max(12, Math.round(baseMock.riskScore * riskFactor));
      const updatedMaturityScore = Math.min(100, Math.round(baseMock.maturityScore + (numEnabled * 6)));

      const updatedThreats = baseMock.threats.map(t => {
        const layer = mergedLayers.find(l => l.id === t.mitigationLayerId);
        return {
          ...t,
          status: (layer && layer.enabled) ? 'Mitigated' as const : 'Unmitigated' as const
        };
      });

      baseMock.securityLayers = mergedLayers;
      baseMock.riskScore = updatedRisk;
      baseMock.maturityScore = updatedMaturityScore;
      baseMock.threats = updatedThreats;
    }

    // Process live CISA feeds in What-if mode if a feed was actively loaded
    if (threatIntelData && threatIntelData.cves && threatIntelData.cves.length > 0) {
      // Re-apply live CVEs dynamically to sandbox
      const newThreats = [...baseMock.threats];
      const newVulns = [...baseMock.vulnerabilities];

      threatIntelData.cves.forEach((cve: any) => {
        const threatId = `thr-live-${cve.cveID.toLowerCase()}`;
        if (!newThreats.some(t => t.id === threatId)) {
          newThreats.push({
            id: threatId,
            name: `LIVE INGRESS: ${cve.vulnerabilityName} (${cve.cveID})`,
            category: cve.product.toLowerCase().includes('database') || cve.product.toLowerCase().includes('postgres') || cve.product.toLowerCase().includes('mongo') ? 'SQL Injection' : cve.product.toLowerCase().includes('auth') || cve.product.toLowerCase().includes('keycloak') ? 'Insider Attack' : 'API Abuse',
            description: `Vulnerability identified in vendor products actively exploited in the wild. Details: ${cve.shortDescription}`,
            likelihood: 'High',
            impact: cve.knownRansomwareCampaignUse === 'Known' ? 'High' : 'Medium',
            severityScore: cve.knownRansomwareCampaignUse === 'Known' ? 9.6 : 7.8,
            mitigation: cve.requiredAction,
            status: 'Unmitigated',
            mitigationLayerId: cve.product.toLowerCase().includes('postgres') || cve.product.toLowerCase().includes('mongo') ? 'lay-enc' : cve.product.toLowerCase().includes('express') ? 'lay-gw' : 'lay-waf'
          });
        }
        if (!newVulns.some(v => v.cveId === cve.cveID)) {
          newVulns.push({
            cveId: cve.cveID,
            title: cve.vulnerabilityName,
            description: cve.shortDescription,
            probability: cve.knownRansomwareCampaignUse === 'Known' ? 95 : 72,
            affectedComponent: cve.product,
            remediation: cve.requiredAction
          });
        }
      });

      const extraRisk = threatIntelData.cves.some(c => c.knownRansomwareCampaignUse === 'Known') ? 12 : 6;
      baseMock.riskScore = Math.min(99, baseMock.riskScore + extraRisk);
      baseMock.threats = newThreats;
      baseMock.vulnerabilities = newVulns;
    }

    updatedProj.analysis = baseMock;
    setWhatIfProject(updatedProj);
  };

  // Direct Live Threat path simulator execution
  const runLiveThreatSimulation = () => {
    if (!activeProject || !activeProject.analysis) return;
    setIsSimulating(true);
    setSimulationProgress(0);
    setSimulationStatus('running');

    // Gather info for threat mapping
    const currentExploit = selectedExploit;
    let targetLayerName = '';
    let targetLayerCode = '';
    
    if (currentExploit === 'sqli') {
      targetLayerName = 'Web Application Firewall (WAF)';
      targetLayerCode = 'lay-waf';
    } else if (currentExploit === 'ddos') {
      targetLayerName = 'Network Firewall';
      targetLayerCode = 'lay-fw';
    } else if (currentExploit === 'mitm') {
      targetLayerName = 'Network Segmentation / TLS Encryption';
      targetLayerCode = 'lay-seg';
    } else if (currentExploit === 'api') {
      targetLayerName = 'Secure API Gateway';
      targetLayerCode = 'lay-gw';
    } else {
      targetLayerName = 'AES-256 DB Encryption';
      targetLayerCode = 'lay-enc';
    }

    const guardLayer = activeProject.analysis.securityLayers.find(l => l.id === targetLayerCode);
    const isGuardEnabled = guardLayer ? guardLayer.enabled : false;

    setSimulationLogs([
      { timestamp: new Date().toLocaleTimeString(), type: 'exploit', message: `🚀 Initiated ${currentExploit.toUpperCase()} attack flow simulation from hostile IP boundary.` },
      { timestamp: new Date().toLocaleTimeString(), type: 'exploit', message: `📡 Mapping target vectors... targeting API node: http://0.0.0.0:3000/api/v1` }
    ]);

    let currentTick = 0;
    const interval = setInterval(() => {
      currentTick += 10;
      setSimulationProgress(currentTick);

      if (currentTick === 40) {
        setSimulationLogs(prev => [
          ...prev,
          { timestamp: new Date().toLocaleTimeString(), type: 'detection', message: `🔍 Traffic hitting ingress boundary. Checking status of ${targetLayerName}...` }
        ]);
      }

      if (currentTick === 70) {
        if (isGuardEnabled) {
          setSimulationLogs(prev => [
            ...prev,
            { timestamp: new Date().toLocaleTimeString(), type: 'block', message: `🛡️ SUCCESS! ${targetLayerName} intercepted hostile payload.` },
            { timestamp: new Date().toLocaleTimeString(), type: 'mitigation', message: `🔒 Attack blocked. Hostile IP banned. Systems reporting standard nominal stats.` }
          ]);
          setSimulationStatus('blocked');
          clearInterval(interval);
          setIsSimulating(false);
        } else {
          setSimulationLogs(prev => [
            ...prev,
            { timestamp: new Date().toLocaleTimeString(), type: 'impact', message: `⚠️ WARNING: ${targetLayerName} is BYPASSED/OFFLINE!` },
            { timestamp: new Date().toLocaleTimeString(), type: 'impact', message: `🔥 INTRUSION TRIGGERED: Exploit executed on application container. DB compromised.` }
          ]);
        }
      }

      if (currentTick >= 100) {
        clearInterval(interval);
        setIsSimulating(false);
        if (!isGuardEnabled) {
          setSimulationStatus('breached');
        }
      }

    }, 300);
  };

  // AI Chat helper to dispatch queries
  const handleSendChatMessage = async (presetText?: string) => {
    const textToSend = presetText || chatInput;
    if (!textToSend.trim()) return;

    const userMsg = {
      id: String(Date.now()),
      sender: 'user' as const,
      text: textToSend,
      timestamp: new Date().toLocaleTimeString()
    };

    setChatMessages((prev) => [...prev, userMsg]);
    if (!presetText) setChatInput('');
    setIsChatSending(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...chatMessages, userMsg],
          projectContext: activeProject
        })
      });
      const data = await response.json();
      
      setChatMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          sender: 'assistant',
          text: data.text || 'Assistant processing error. Standard diagnostic logs are online.',
          timestamp: new Date().toLocaleTimeString()
        }
      ]);
    } catch (err) {
      setChatMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          sender: 'assistant',
          text: `### Dynamic Advisor Response\n\nYour query regarding *${textToSend}* was generated successfully. Standard defensive measures recommend establishing sanitization wrappers across backend ports, enforcing high entropy bcrypt hashes for credentials, and integrating active edge firewalls.`,
          timestamp: new Date().toLocaleTimeString()
        }
      ]);
    } finally {
      setIsChatSending(false);
    }
  };

  // Submit model feedback or scoring
  const handleSubmitFeedback = () => {
    if (activeProject) {
      const updatedHistory = analysesHistory.map(p => 
        p.id === activeProject.id 
          ? { ...p, feedbackScore: feedbackRating, feedbackNotes: feedbackText } 
          : p
      );
      setAnalysesHistory(updatedHistory);
      setActiveProject({
        ...activeProject,
        feedbackScore: feedbackRating,
        feedbackNotes: feedbackText
      });
    }
    setFeedbackSubmitted(true);
    setTimeout(() => {
      setFeedbackSubmitted(false);
      setFeedbackText('');
    }, 2500);
  };

  // Print compliance checklist generator action (standard browser print mapping)
  const triggerPrintReview = () => {
    window.print();
  };

  // Quick helper to resolve threat category color markers
  const severityBadge = (score: number) => {
    if (score >= 8.0) return <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-red-950/80 text-red-400 border border-red-800">CRITICAL ({score})</span>;
    if (score >= 6.0) return <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-amber-950/80 text-amber-400 border border-amber-800">HIGH ({score})</span>;
    return <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-blue-950/80 text-blue-400 border border-blue-800">MEDIUM ({score})</span>;
  };

  // Tech stack config toggles
  const handleToggleTech = (tech: string) => {
    if (selectedTechStack.includes(tech)) {
      setSelectedTechStack(selectedTechStack.filter(t => t !== tech));
    } else {
      setSelectedTechStack([...selectedTechStack, tech]);
    }
  };

  // Role selections helper
  const handleToggleRole = (role: string) => {
    if (selectedUserRoles.includes(role)) {
      setSelectedUserRoles(selectedUserRoles.filter(r => r !== role));
    } else {
      setSelectedUserRoles([...selectedUserRoles, role]);
    }
  };

  // Mock secure coding snippets
  const getSecureCodeSnippet = (lang: string) => {
    switch (lang) {
      case 'nodejs':
        return `// Enforce Parameterized SQL Queries & JWT Verification with NodeExpress
import express from 'express';
import jwt from 'jsonwebtoken';
import { Pool } from 'pg';

const app = express();
const pool = new Pool();

// JWT authorization check middleware
const verifyCredentialToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Auth credentials missing' });

  jwt.verify(token, process.env.JWT_STRONG_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token signatures do not match' });
    req.user = user;
    next();
  });
};

// SAFE parametrized SQL database execution
app.post('/api/ledger/transfer', verifyCredentialToken, async (req, res) => {
  const { recipient, amount } = req.body;
  
  const query = 'UPDATE balances SET funds = funds - $1 WHERE account_holder = $2';
  try {
    await pool.query(query, [amount, req.user.accountId]);
    res.json({ message: "Transferred successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal transactional error" });
  }
});`;
      case 'python':
        return `# Safe API validation with FastAPI & SQL Alchemy Binding
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from pydantic import BaseModel, constr

app = FastAPI()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

class TransactionSchema(BaseModel):
    recipient_urn: constr(strip_whitespace=True, max_length=120)
    micro_pennies: int

@app.post("/ledger/transaction")
def process_secure_ledger(data: TransactionSchema, token: str = Depends(oauth2_scheme)):
    # Validate client token authenticity
    if not verify_opaque_token(token):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
        
    # Standard security queries utilize SQLAlchemy parameters automatically preventing injecting
    db.query(Ledger).filter(Ledger.owner == token.user_id).update({"cash_reserve": Ledger.cash_reserve - data.micro_pennies})
    db.commit()
    return {"status": "Transaction committed securely"}`;
      case 'go':
        return `package main

import (
    "database/sql"
    "github.com/golang-jwt/jwt/v5"
    "net/http"
)

// Safe SQL implementation in Go using prepared statement placeholders
func ProcessSecureQuery(db *sql.DB, userRequest string, accountOwnerID int) ([]Record, error) {
    // DO NOT concatenate queries strings!
    statement := "SELECT id, ledger_assets, created_at FROM client_vault WHERE key_id = ? AND owner_id = ?"
    
    rows, err := db.Query(statement, userRequest, accountOwnerID)
    if err != nil {
        return nil, err
    }
    defer rows.Close()
    
    // Process rows securely...
    return records, nil
}`;
      default:
        return `// Spring Security 6 - Strong Security Filter Configuration for CSRF & CORS
@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())) // Shield CSRF
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .authorizeHttpRequests(authorize -> authorize
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .requestMatchers("/api/public/**").permitAll()
                .anyRequest().authenticated()
            )
            .oauth2ResourceServer(oauth2 -> oauth2.jwt(Customizer.withDefaults()));
        return http.build();
    }
}`;
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#e0e0e0] font-sans flex flex-col antialiased selection:bg-[#00f3ff] selection:text-[#050505]">
      
      {/* Top Navigation Bar */}
      <header className="h-14 border-b border-[#333] bg-[#0a0a0a] flex items-center justify-between px-4 sm:px-6 shrink-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#00f3ff] rounded flex items-center justify-center text-[#050505] font-bold text-lg font-mono shadow-[0_0_12px_rgba(0,243,255,0.4)]">Σ</div>
          <div>
            <h1 className="text-sm sm:text-base font-mono tracking-widest text-[#00f3ff] flex items-center gap-2">
              NEO-SHIELD AI 
              <span className="text-[#666] hidden sm:inline">| v3.5.0</span>
            </h1>
            <p className="text-[9px] text-[#666] uppercase tracking-wider hidden sm:block">SaaS Intelligence & Threat Modeling Core</p>
          </div>
        </div>

        {/* Live system monitoring stats */}
        <div className="flex items-center gap-4 text-[10px] sm:text-[11px] font-mono">
          <div className="flex items-center gap-1.5 bg-[#00f3ff]/5 border border-[#00f3ff]/20 px-2 py-0.5 rounded text-[#00f3ff] hidden md:flex">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            ACTIVE CONTEXT ENGINE
          </div>

          {activeProject && (
            <div className="hidden lg:flex items-center gap-3 border-l border-[#222] pl-3">
              <span className="text-[#666]">ANALYZING:</span> 
              <span className="text-white max-w-[150px] truncate">{activeProject.name}</span>
              <span className="px-1.5 py-0.5 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 rounded text-[9px]">
                RISK: {activeProject.analysis?.riskScore}%
              </span>
            </div>
          )}

          {/* User Profile display */}
          {userProfile ? (
            <div className="flex items-center gap-2 bg-[#161616] px-2.5 py-1 border border-[#2c2c2c] rounded">
              <User className="w-3.5 h-3.5 text-[#00f3ff]" />
              <span className="hidden sm:inline max-w-[120px] truncate">{userProfile.email}</span>
              <button 
                onClick={() => setUserProfile(null)}
                title="Disconnect user session"
                className="hover:text-red-400 text-[#666] cursor-pointer ml-1.5"
              >
                <LogOut className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setShowAuthModal(true)}
              className="bg-[#00f3ff] text-[#050505] text-[10px] font-bold uppercase py-1 px-3.5 rounded hover:bg-[#00d0e6] transition-all cursor-pointer"
            >
              Connect Profile
            </button>
          )}
        </div>
      </header>

      {/* Main Framework Area */}
      <div className="flex-1 flex overflow-hidden min-h-0 relative">
        
        {/* Left Side Navigation Panel */}
        <aside className="w-64 border-r border-[#333] bg-[#080808] flex flex-col shrink-0 hidden md:flex">
          {/* Active app specs brief */}
          <div className="p-4 border-b border-[#222] bg-[#0c0c0c]">
            <span className="text-[9px] text-[#555] uppercase tracking-wider block mb-1.5">Selected Core Workloads</span>
            {activeProject ? (
              <div className="space-y-1">
                <div className="text-xs font-bold text-white truncate">{activeProject.name}</div>
                <div className="text-[10px] text-[#999] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  {activeProject.industry} Domain
                </div>
                <div className="text-[10px] text-[#666] font-mono">{activeProject.scale}</div>
              </div>
            ) : (
              <p className="text-[11px] text-[#555] italic">No custom security architecture specified.</p>
            )}
          </div>

          {/* Sidebar Navigation Options */}
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            <button 
              onClick={() => setActiveTab('landing')}
              className={`w-full flex items-center justify-between text-left px-3 py-2 text-xs font-mono rounded tracking-wide transition-all cursor-pointer ${
                activeTab === 'landing' 
                  ? 'bg-[#00f3ff]/10 text-[#00f3ff] border border-[#00f3ff]/30 shadow-[inset_0_0_6px_rgba(0,243,255,0.1)]' 
                  : 'text-[#999] hover:text-white hover:bg-[#111] border border-transparent'
              }`}
            >
              <span className="flex items-center gap-2">
                <Compass className="w-4 h-4" />
                EXPLORE ARCHITECT
              </span>
              <span className="text-[10px] text-[#444]">INIT</span>
            </button>

            <button 
              onClick={() => setActiveTab('new-project')}
              className={`w-full flex items-center justify-between text-left px-3 py-2 text-xs font-mono rounded tracking-wide transition-all cursor-pointer ${
                activeTab === 'new-project' 
                  ? 'bg-[#00f3ff]/10 text-[#00f3ff] border border-[#00f3ff]/30' 
                  : 'text-[#999] hover:text-white hover:bg-[#111] border border-transparent'
              }`}
            >
              <span className="flex items-center gap-2">
                <Sliders className="w-4 h-4 animate-pulse text-[#00f3ff]" />
                NEW ARCHITECTURE
              </span>
              <span className="text-[9px] bg-red-950 text-red-400 px-1 border border-red-900 rounded">SCAN</span>
            </button>

            <div className="py-2 px-3 text-[10px] font-bold text-[#555] uppercase tracking-wider">Cyber Audits</div>

            <button 
              onClick={() => setActiveTab('dashboard')}
              disabled={!activeProject}
              className={`w-full flex items-center justify-between text-left px-3 py-2 text-xs font-mono rounded tracking-wide transition-all ${
                !activeProject ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
              } ${
                activeTab === 'dashboard' 
                  ? 'bg-[#00f3ff]/10 text-[#00f3ff] border border-[#00f3ff]/30' 
                  : 'text-[#999] hover:text-white hover:bg-[#111] border border-transparent'
              }`}
            >
              <span className="flex items-center gap-2">
                <Cpu className="w-4 h-4" />
                DIAGNOSTICS HUB
              </span>
              {activeProject?.analysis && (
                <span className="text-[10px] font-bold text-red-400">{activeProject.analysis.riskScore}%</span>
              )}
            </button>

            <button 
              onClick={() => setActiveTab('visualizer')}
              disabled={!activeProject}
              className={`w-full flex items-center justify-between text-left px-3 py-2 text-xs font-mono rounded tracking-wide transition-all ${
                !activeProject ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
              } ${
                activeTab === 'visualizer' 
                  ? 'bg-[#00f3ff]/10 text-[#00f3ff] border border-[#00f3ff]/30' 
                  : 'text-[#999] hover:text-white hover:bg-[#111] border border-transparent'
              }`}
            >
              <span className="flex items-center gap-2">
                <Network className="w-4 h-4" />
                DOCK VISUALIZER
              </span>
              <span className="text-[10px] text-[#444]">MAP</span>
            </button>

            <button 
              onClick={() => setActiveTab('simulator')}
              disabled={!activeProject}
              className={`w-full flex items-center justify-between text-left px-3 py-2 text-xs font-mono rounded tracking-wide transition-all ${
                !activeProject ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
              } ${
                activeTab === 'simulator' 
                  ? 'bg-[#00f3ff]/10 text-[#00f3ff] border border-[#00f3ff]/30' 
                  : 'text-[#999] hover:text-white hover:bg-[#111] border border-transparent'
              }`}
            >
              <span className="flex items-center gap-2">
                <Play className="w-4 h-4 text-purple-400" />
                LIVE SIMULATION
              </span>
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
            </button>

            <button 
              onClick={() => setActiveTab('compliance')}
              disabled={!activeProject}
              className={`w-full flex items-center justify-between text-left px-3 py-2 text-xs font-mono rounded tracking-wide transition-all ${
                !activeProject ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
              } ${
                activeTab === 'compliance' 
                  ? 'bg-[#00f3ff]/10 text-[#00f3ff] border border-[#00f3ff]/30' 
                  : 'text-[#999] hover:text-white hover:bg-[#111] border border-transparent'
              }`}
            >
              <span className="flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-green-400" />
                COMPLIANCE MATRIX
              </span>
              <span className="text-[10px] text-green-400">ISO</span>
            </button>

            <button 
              onClick={() => setActiveTab('devsecops')}
              className={`w-full flex items-center justify-between text-left px-3 py-2 text-xs font-mono rounded tracking-wide transition-all cursor-pointer ${
                activeTab === 'devsecops' 
                  ? 'bg-[#00f3ff]/10 text-[#00f3ff] border border-[#00f3ff]/30' 
                  : 'text-[#999] hover:text-white hover:bg-[#111] border border-transparent'
              }`}
            >
              <span className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-yellow-400" />
                DEVSECOPS PIPELINE
              </span>
              <span className="text-[9px] bg-yellow-500/10 text-yellow-400 px-1 border border-yellow-500/20 rounded">CODE</span>
            </button>

            <button 
              onClick={() => setActiveTab('ai-chat')}
              className={`w-full flex items-center justify-between text-left px-3 py-2 text-xs font-mono rounded tracking-wide transition-all cursor-pointer ${
                activeTab === 'ai-chat' 
                  ? 'bg-[#00f3ff]/10 text-[#00f3ff] border border-[#00f3ff]/30' 
                  : 'text-[#999] hover:text-white hover:bg-[#111] border border-transparent'
              }`}
            >
              <span className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                AI CONSULTANT
              </span>
              <span className="text-[9px] bg-cyan-950 text-cyan-400 px-1 border border-cyan-900 rounded">LIVE</span>
            </button>

            <button 
              onClick={() => setActiveTab('history')}
              className={`w-full flex items-center justify-between text-left px-3 py-2 text-xs font-mono rounded tracking-wide transition-all cursor-pointer ${
                activeTab === 'history' 
                  ? 'bg-[#00f3ff]/10 text-[#00f3ff] border border-[#00f3ff]/30' 
                  : 'text-[#999] hover:text-white hover:bg-[#111] border border-transparent'
              }`}
            >
              <span className="flex items-center gap-2">
                <History className="w-4 h-4" />
                AUDIT HISTORY ({analysesHistory.length})
              </span>
              <span className="text-[10px] text-[#444]">LOG</span>
            </button>
          </nav>

          {/* Model controls indicator */}
          <div className="p-4 border-t border-[#222] bg-[#0c0c0c] space-y-2 mt-auto">
            <div className="text-[9px] text-[#666] font-mono flex items-center gap-1.5 uppercase">
              <Cpu className="w-3.5 h-3.5 text-[#00f3ff]" />
              Model Configuration
            </div>
            <div className="bg-[#111] border border-[#222] p-2 rounded text-[10px] font-mono text-[#999] space-y-1">
              <div className="flex justify-between">
                <span>Model:</span>
                <span className="text-white">gemini-3.5-flash</span>
              </div>
              <div className="flex justify-between">
                <span>Temp Weight:</span>
                <span className="text-[#00f3ff]">0.25 (Diag)</span>
              </div>
              <div className="flex justify-between">
                <span>Fallback Mode:</span>
                <span className="text-yellow-400">Smart Simulator</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile quick-action tabs at top */}
        <div className="md:hidden absolute top-0 left-0 right-0 h-10 bg-[#0f0f0f] border-b border-[#333] z-10 flex overflow-x-auto gap-2 p-1 text-[10px] font-mono no-scrollbar whitespace-nowrap">
          <button onClick={() => setActiveTab('landing')} className={`px-2 py-1 rounded ${activeTab === 'landing' ? 'bg-[#00f3ff] text-black' : 'text-[#888]'}`}>Explore</button>
          <button onClick={() => setActiveTab('new-project')} className={`px-2 py-1 rounded ${activeTab === 'new-project' ? 'bg-[#00f3ff] text-black' : 'text-[#888]'}`}>New Plan</button>
          {activeProject && (
            <>
              <button onClick={() => setActiveTab('dashboard')} className={`px-2 py-1 rounded ${activeTab === 'dashboard' ? 'bg-[#00f3ff] text-black' : 'text-[#888]'}`}>Dashboard</button>
              <button onClick={() => setActiveTab('visualizer')} className={`px-2 py-1 rounded ${activeTab === 'visualizer' ? 'bg-[#00f3ff] text-black' : 'text-[#888]'}`}>Visualizer</button>
              <button onClick={() => setActiveTab('simulator')} className={`px-2 py-1 rounded ${activeTab === 'simulator' ? 'bg-[#00f3ff] text-black' : 'text-[#888]'}`}>Simulator</button>
              <button onClick={() => setActiveTab('compliance')} className={`px-2 py-1 rounded ${activeTab === 'compliance' ? 'bg-[#00f3ff] text-black' : 'text-[#888]'}`}>Compliance</button>
            </>
          )}
          <button onClick={() => setActiveTab('devsecops')} className={`px-2 py-1 rounded ${activeTab === 'devsecops' ? 'bg-[#00f3ff] text-black' : 'text-[#888]'}`}>DevSecOps</button>
          <button onClick={() => setActiveTab('ai-chat')} className={`px-2 py-1 rounded ${activeTab === 'ai-chat' ? 'bg-[#00f3ff] text-black' : 'text-[#888]'}`}>AI Consultation</button>
          <button onClick={() => setActiveTab('history')} className={`px-2 py-1 rounded ${activeTab === 'history' ? 'bg-[#00f3ff] text-black' : 'text-[#888]'}`}>History</button>
        </div>

        {/* Core Main Active Panel Container */}
        <main className="flex-1 overflow-y-auto bg-[#050505] p-4 sm:p-6 pb-20 md:pb-6 pt-14 md:pt-6 relative">
          
          {/* Web grid-system blueprint background effect */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#00f3ff 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>

          {/* PAGE 1: Cyber Explorer Splash / Landing Page */}
          {activeTab === 'landing' && (
            <div className="max-w-4xl mx-auto space-y-8 py-4 relative z-10">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-950/40 border border-cyan-800 text-[#00f3ff] font-mono text-[10px] tracking-widest uppercase rounded">
                  <Terminal className="w-3.5 h-3.5" /> SECURE SOFTWARE ARCHITECT ENGINE
                </div>
                <h2 className="text-3xl sm:text-5xl font-mono tracking-tight font-extrabold text-white leading-tight">
                  Design Secure Architectures, <br />
                  <span className="text-[#00f3ff] inline-block mt-2 font-mono relative">
                    Model Threats, & Audit Controls
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#00f3ff] animate-pulse"></span>
                  </span>
                </h2>
                <p className="text-[#999] text-sm sm:text-base max-w-2xl leading-relaxed">
                  Avoid catastrophic security oversights. Provide details of your industrial microservice architecture, API interfaces, and technology layers to instantly map threats, predict vulnerabilities, build visual defense grids, and generate multi-framework compliance blueprints.
                </p>
              </div>

              {/* Quick Preset Selector Buttons (Zero friction trial) */}
              <div className="bg-[#0b0b0b] border border-[#222] p-5 rounded-md space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-[#00f3ff]" />
                      Instantly Load Domain Blueprints
                    </h3>
                    <p className="text-[11px] text-[#666]">Select any prefilled enterprise sandbox scenario below to begin visual threat analysis.</p>
                  </div>
                  <div className="text-[10px] font-mono text-cyan-400 bg-cyan-900/10 border border-cyan-800 px-2 py-0.5 rounded">
                    HOT CONFIGURATIONS
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  <button 
                    onClick={() => loadQuickPreset('banking')}
                    className="p-3 text-left border border-[#333] hover:border-[#00f3ff] bg-[#111]/60 hover:bg-black rounded transition-all cursor-pointer group"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-bold py-0.5 px-1.5 bg-red-950 rounded text-red-400">FINTECH</span>
                      <Shield className="w-4 h-4 text-[#666] group-hover:text-[#00f3ff] transition-all" />
                    </div>
                    <div className="text-xs font-bold text-white mb-1 font-mono">Hansa Retail Banking</div>
                    <div className="text-[10px] text-[#666] line-clamp-2">PostgreSQL, OAuth2, payment API scopes, cloud-isolated CDE databases.</div>
                  </button>

                  <button 
                    onClick={() => loadQuickPreset('healthcare')}
                    className="p-3 text-left border border-[#333] hover:border-[#00f3ff] bg-[#111]/60 hover:bg-black rounded transition-all cursor-pointer group"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-bold py-0.5 px-1.5 bg-green-950 rounded text-green-400">HEALTH</span>
                      <Heart className="w-4 h-4 text-[#666] group-hover:text-green-400 transition-all" />
                    </div>
                    <div className="text-xs font-bold text-white mb-1 font-mono">CarePulse Telehealth</div>
                    <div className="text-[10px] text-[#666] line-clamp-2">FastAPI Python backend, restricted PHI profiles, SAML authentication.</div>
                  </button>

                  <button 
                    onClick={() => loadQuickPreset('govt')}
                    className="p-3 text-left border border-[#333] hover:border-[#00f3ff] bg-[#111]/60 hover:bg-black rounded transition-all cursor-pointer group"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-bold py-0.5 px-1.5 bg-blue-950 rounded text-blue-400">NIST SP</span>
                      <Network className="w-4 h-4 text-[#666] group-hover:text-blue-400 transition-all" />
                    </div>
                    <div className="text-xs font-bold text-white mb-1 font-mono">National Identity Vault</div>
                    <div className="text-[10px] text-[#666] line-clamp-2">On-premise nodes, state secret sensitivity, hardware token gates.</div>
                  </button>

                  <button 
                    onClick={() => loadQuickPreset('ecommerce')}
                    className="p-3 text-left border border-[#333] hover:border-[#00f3ff] bg-[#111]/60 hover:bg-black rounded transition-all cursor-pointer group"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-bold py-0.5 px-1.5 bg-purple-950 rounded text-purple-400">E-COMMERCE</span>
                      <Sliders className="w-4 h-4 text-[#666] group-hover:text-purple-400 transition-all" />
                    </div>
                    <div className="text-xs font-bold text-white mb-1 font-mono">NovaCart Platform</div>
                    <div className="text-[10px] text-[#666] line-clamp-2">React, Express microservices, card payment API pipelines, JWT access token structures.</div>
                  </button>
                </div>
              </div>

              {/* Explaining system safeguards benefits */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border border-[#222] bg-[#0c0c0c] rounded">
                  <div className="w-8 h-8 rounded bg-[#111] border border-[#333] flex items-center justify-center text-[#00f3ff] mb-3">
                    <Shield className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-mono font-bold text-white mb-1">Interactive Threat Modeling</h4>
                  <p className="text-[11px] text-[#888] leading-relaxed">Assemble security layers in our architectural visualizer and evaluate the risk scoring outcome in real time as defense layers are configured.</p>
                </div>

                <div className="p-4 border border-[#222] bg-[#0c0c0c] rounded">
                  <div className="w-8 h-8 rounded bg-[#111] border border-[#333] flex items-center justify-center text-purple-400 mb-3 block">
                    <Play className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-mono font-bold text-white mb-1">Live Attack Simulation</h4>
                  <p className="text-[11px] text-[#888] leading-relaxed">Emulate SQL Injection payloads or botnet DDoS rushes. Watch visual animations showing how malicious queries traverse routing elements if safeguards are bypassed.</p>
                </div>

                <div className="p-4 border border-[#222] bg-[#0c0c0c] rounded">
                  <div className="w-8 h-8 rounded bg-[#111] border border-[#333] flex items-center justify-center text-green-400 mb-3">
                    <CheckSquare className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-mono font-bold text-white mb-1">Compliance Mapping Engine</h4>
                  <p className="text-[11px] text-[#888] leading-relaxed">Ensure automated compliance alignments representing PCI-DSS, HIPAA, FERPA, GDPR, or NIST-SP guidelines depending on selected business sectors.</p>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex pt-3 justify-center sm:justify-start">
                <button 
                  onClick={() => {
                    setProjectName('My custom service infrastructure');
                    setActiveTab('new-project');
                  }}
                  className="bg-[#00f3ff] text-black font-mono font-bold py-2.5 px-6 rounded hover:bg-[#00d0e6] shadow-[0_0_15px_rgba(0,243,255,0.3)] transition-all cursor-pointer text-xs uppercase"
                >
                  Create Custom Security Assessment Setup &rarr;
                </button>
              </div>
            </div>
          )}

          {/* PAGE 2: Project Workload Profile Builder (Form Selector) */}
          {activeTab === 'new-project' && (
            <div className="max-w-4xl mx-auto py-2 space-y-6">
              
              <div className="border-b border-[#222] pb-4">
                <h2 className="text-xl sm:text-2xl font-mono font-bold text-[#00f3ff] uppercase tracking-wider flex items-center gap-2">
                  <Sliders className="w-5 h-5" /> Initialize Security Scopes & Diagnostics Setup
                </h2>
                <p className="text-xs text-[#888] mt-1">Specify technology stacks, roles, data boundaries, and network deployments to dynamically evaluate threats.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#0a0a0a] border border-[#222] p-5 sm:p-6 rounded-md">
                
                {/* Left side inputs */}
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] text-[#666] uppercase tracking-wider block mb-1.5 font-mono italic">01. Application Stack Name</label>
                    <input 
                      type="text" 
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      className="w-full bg-[#111] border border-[#333] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00f3ff] font-mono"
                      placeholder="e.g. CarePulse Health Portal"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-[#666] uppercase tracking-wider block mb-1.5 font-mono italic">02. Industrial Domain & Regulatory Framework</label>
                    <select 
                      value={projectIndustry}
                      onChange={(e) => setProjectIndustry(e.target.value as any)}
                      className="w-full bg-[#111] border border-[#333] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00f3ff] font-mono cursor-pointer"
                    >
                      {INDUSTRIES.map((ind) => (
                        <option key={ind} value={ind}>{ind}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-[#666] uppercase tracking-wider block mb-1.5 font-mono italic">03. Target User Base Scale</label>
                    <div className="grid grid-cols-2 gap-2">
                      {SCALE_OPTIONS.map((opt) => (
                        <button 
                          key={opt}
                          type="button"
                          onClick={() => setProjectScale(opt)}
                          className={`p-2 rounded text-[10px] font-mono border text-left transition-all ${
                            projectScale === opt 
                              ? 'bg-[#00f3ff]/10 text-[#00f3ff] border-[#00f3ff]' 
                              : 'bg-[#111] border-[#222] text-[#888] hover:border-[#444]'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-[#666] uppercase tracking-wider block mb-1.5 font-mono italic">04. Primary Authentication Model</label>
                    <div className="grid grid-cols-3 gap-2">
                      {AUTH_TYPES.map((authType) => (
                        <button
                          key={authType}
                          type="button"
                          onClick={() => setProjectAuthType(authType)}
                          className={`p-1.5 rounded text-[10px] font-mono border transition-all ${
                            projectAuthType === authType 
                              ? 'bg-[#00f3ff]/10 text-[#00f3ff] border-[#00f3ff]' 
                              : 'bg-[#111] border-[#222] text-[#888] hover:border-[#444]'
                          }`}
                        >
                          {authType}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-[#666] uppercase tracking-wider block mb-1.5 font-mono italic">05. Managed Data Sensitivity Classification</label>
                    <select 
                      value={projectSensitivity}
                      onChange={(e) => setProjectSensitivity(e.target.value)}
                      className="w-full bg-[#111] border border-[#333] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00f3ff] font-mono cursor-pointer"
                    >
                      {DATA_SENSITIVITIES.map((ds) => (
                        <option key={ds} value={ds}>{ds}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Right side inputs */}
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] text-[#666] uppercase tracking-wider block mb-1.5 font-mono italic font-bold">06. Select Tech Stack Ecosystem (Snyk Scanned)</label>
                    <div className="grid grid-cols-2 gap-2 max-h-[160px] overflow-y-auto bg-[#111] p-3 border border-[#222] rounded">
                      {TECH_STACKS.map((tech) => (
                        <label key={tech} className="flex items-center gap-2 text-[11px] font-mono cursor-pointer text-[#bbb] hover:text-white">
                          <input 
                            type="checkbox" 
                            checked={selectedTechStack.includes(tech)}
                            onChange={() => handleToggleTech(tech)}
                            className="accent-cyan-400"
                          />
                          {tech}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-[#666] uppercase tracking-wider block mb-1.5 font-mono italic leading-5">07. Infrastructure Deployment Model</label>
                    <select 
                      value={projectDeployment}
                      onChange={(e) => setProjectDeployment(e.target.value)}
                      className="w-full bg-[#111] border border-[#333] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00f3ff] font-mono cursor-pointer"
                    >
                      {DEPLOYMENT_MODELS.map((dm) => (
                        <option key={dm} value={dm}>{dm}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-[#666] uppercase tracking-wider block mb-1.5 font-mono italic">08. API & Third Party Endpoint Integrations</label>
                    <div className="bg-[#111] p-3 border border-[#222] rounded space-y-1.5">
                      {APIS_LIST.map((api) => {
                        const isIncluded = selectedAPIs.includes(api);
                        return (
                          <label key={api} className="flex items-center gap-2 text-[11px] font-mono cursor-pointer text-[#bbb] hover:text-white">
                            <input 
                              type="checkbox" 
                              checked={isIncluded}
                              onChange={() => {
                                if (isIncluded) {
                                  setSelectedAPIs(selectedAPIs.filter(a => a !== api));
                                } else {
                                  setSelectedAPIs([...selectedAPIs, api]);
                                }
                              }}
                              className="accent-cyan-400"
                            />
                            {api}
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-[#666] uppercase tracking-wider block mb-1.5 font-mono italic">09. Active Access User Roles</label>
                    <div className="grid grid-cols-2 gap-1 bg-[#111] p-3 border border-[#222] rounded max-h-[110px] overflow-y-auto">
                      {USER_ROLES.map((role) => (
                        <label key={role} className="flex items-center gap-1.5 text-[10px] font-mono text-[#aaa]">
                          <input 
                            type="checkbox"
                            checked={selectedUserRoles.includes(role)}
                            onChange={() => handleToggleRole(role)}
                            className="accent-cyan-400"
                          />
                          {role}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* Action Button */}
              <div className="flex justify-end pt-2">
                <button 
                  onClick={handleRunSecurityAnalysis}
                  disabled={isAnalyzing}
                  className="bg-[#00f3ff] text-black font-mono font-bold py-3 px-8 rounded hover:bg-[#00d0e6] transition-all flex items-center gap-2 cursor-pointer text-xs uppercase"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      COMPILING OWASP MODEL ANALYSIS...
                    </>
                  ) : (
                    <>
                      <Shield className="w-4 h-4" />
                      GENERATE ATTACK SURFACES & SCHEMATICS &rarr;
                    </>
                  )}
                </button>
              </div>

            </div>
          )}

          {/* PAGE 3: Interactive Diagnostics Dashboard */}
          {activeTab === 'dashboard' && activeProject && activeProject.analysis && (() => {
            const p = isWhatIfMode && whatIfProject ? whatIfProject : activeProject;
            if (!p || !p.analysis) return null;

            return (
              <div className="max-w-5xl mx-auto space-y-6">
                
                {/* Architecture Summary banner */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222] pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#00f3ff] tracking-wider uppercase bg-[#00f3ff]/10 border border-[#00f3ff]/20 px-2 py-0.5 rounded">
                        {p.industry} Sector
                      </span>
                      <span className="text-xs font-mono text-[#666]">
                        Compiled: {p.createdAt}
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-mono font-bold text-white mt-1 uppercase truncate">{p.name} Architecture Report</h2>
                  </div>
                  
                  {/* PDF generation / Export trigger */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button 
                      onClick={triggerPrintReview}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-[#111] hover:bg-[#1c1c1c] border border-[#333] rounded text-xs font-mono text-white transition-all cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-[#00f3ff]" />
                      PRINT SEC_AUDIT REPORT
                    </button>
                    <button 
                      onClick={() => {
                        // Dump json schema parameters
                        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(p, null, 2));
                        const downloadAnchor = document.createElement('a');
                        downloadAnchor.setAttribute("href", dataStr);
                        downloadAnchor.setAttribute("download", `neo-shield-audit-${p.id}.json`);
                        document.body.appendChild(downloadAnchor);
                        downloadAnchor.click();
                        downloadAnchor.remove();
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-[#111] hover:bg-[#1c1c1c] border border-[#333] rounded text-xs font-mono text-white transition-all cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5 text-yellow-400" />
                      EXPORT JSON SPECS
                    </button>
                  </div>
                </div>

                {/* WHAT-IF SCENARIO MODELER & LIVE THREAT INTELLIGENCE PORTAL */}
                <div className="border border-cyan-800/40 bg-[#070e14]/90 rounded p-5 relative overflow-hidden shadow-[0_0_20px_rgba(0,243,255,0.05)]">
                  {/* Visual grid gridlines for decorative technical appeal */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:24px_24px] opacity-15 pointer-events-none"></div>
                  
                  <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyan-950 pb-4 mb-4">
                    <div>
                      <h3 className="text-sm font-mono font-bold text-[#00f3ff] uppercase tracking-wider flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
                        ⚡ WHAT-IF SECURITY SANDBOX MODELER & THREAT INTEL PORTAL
                      </h3>
                      <p className="text-[11px] text-[#888] mt-1 font-mono">
                        Simulate architectural pivots, test countermeasure readiness, and correlate active CISA / AlienVault threat vectors.
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-3">
                      {/* Sandbox Toggle */}
                      <button
                        onClick={() => {
                          if (!isWhatIfMode) {
                            setWhatIfProject(JSON.parse(JSON.stringify(activeProject)));
                            setIsWhatIfMode(true);
                          } else {
                            setIsWhatIfMode(false);
                          }
                        }}
                        className={`font-mono text-[10.5px] font-bold px-4 py-2 border rounded-sm transition-all flex items-center gap-2 cursor-pointer ${
                          isWhatIfMode
                            ? 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/25 shadow-[0_0_10px_rgba(234,179,8,0.15)]'
                            : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 hover:bg-cyan-300/20'
                        }`}
                      >
                        {isWhatIfMode ? '🔒 EXIT SIMULATOR SANDBOX (REVERT)' : '🔓 ACTIVATE WHAT-IF SANDBOX'}
                      </button>
                      
                      {isWhatIfMode && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              if (whatIfProject) {
                                setActiveProject(JSON.parse(JSON.stringify(whatIfProject)));
                                setIsWhatIfMode(false);
                              }
                            }}
                            className="bg-green-500 text-black font-mono font-bold text-[10.5px] px-3.5 py-2 hover:bg-green-400 rounded-sm transition-all cursor-pointer"
                          >
                            📥 RE-COMMIT SANDBOX PLAN
                          </button>
                          <button
                            onClick={() => {
                              setWhatIfProject(JSON.parse(JSON.stringify(activeProject)));
                            }}
                            className="bg-transparent text-gray-400 border border-gray-700 font-mono text-[10.5px] px-3.5 py-2 hover:bg-gray-850 rounded-sm transition-all cursor-pointer"
                          >
                            RESET
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 relative z-10">
                    {/* Left Column: Direct Variables Controls */}
                    <div className="md:col-span-7 bg-[#0b1218] border border-cyan-950 p-4 rounded-sm space-y-4">
                      <div className="flex justify-between items-center border-b border-[#222]/80 pb-1.5">
                        <span className="text-[11px] font-mono font-bold text-gray-400 uppercase tracking-widest block">🕹️ Sandbox Variable Adjustment</span>
                        <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${isWhatIfMode ? 'bg-yellow-950/60 text-yellow-500 border border-yellow-800' : 'bg-gray-950 text-gray-600 border border-gray-800'}`}>
                          {isWhatIfMode ? 'SANDBOX EDITABLE' : 'READ ONLY (UNLOCK SCENARIO)'}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[9px] font-mono text-gray-550 uppercase block mb-1">Infrastructure Deployment</label>
                          <select
                            disabled={!isWhatIfMode}
                            value={p.deploymentModel}
                            onChange={(e) => handleWhatIfParamChange('deploymentModel', e.target.value)}
                            className="w-full bg-[#05090d] border border-cyan-950 text-[#ccc] rounded px-2.5 py-1.5 text-xs font-mono focus:outline-none focus:border-[#00f3ff]"
                          >
                            {DEPLOYMENT_MODELS.map((dm) => (
                              <option key={dm} value={dm}>{dm}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="text-[9px] font-mono text-gray-550 uppercase block mb-1">Access Authentication Model</label>
                          <select
                            disabled={!isWhatIfMode}
                            value={p.authType}
                            onChange={(e) => handleWhatIfParamChange('authType', e.target.value)}
                            className="w-full bg-[#05090d] border border-cyan-950 text-[#ccc] rounded px-2.5 py-1.5 text-xs font-mono focus:outline-none focus:border-[#00f3ff]"
                          >
                            {AUTH_TYPES.map((authType) => (
                              <option key={authType} value={authType}>{authType}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="text-[9px] font-mono text-gray-550 uppercase block mb-1">Data Sensitivity Classification</label>
                          <select
                            disabled={!isWhatIfMode}
                            value={p.dataSensitivity}
                            onChange={(e) => handleWhatIfParamChange('dataSensitivity', e.target.value)}
                            className="w-full bg-[#05090d] border border-cyan-950 text-[#ccc] rounded px-2.5 py-1.5 text-xs font-mono focus:outline-none focus:border-[#00f3ff]"
                          >
                            {DATA_SENSITIVITIES.map((ds) => (
                              <option key={ds} value={ds}>{ds}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="text-[9px] font-mono text-gray-550 uppercase block mb-1">Active Industry Sector</label>
                          <select
                            disabled={!isWhatIfMode}
                            value={p.industry}
                            onChange={(e) => handleWhatIfParamChange('industry', e.target.value)}
                            className="w-full bg-[#05090d] border border-cyan-950 text-[#ccc] rounded px-2.5 py-1.5 text-xs font-mono focus:outline-none focus:border-[#00f3ff]"
                          >
                            {INDUSTRIES.map((ind) => (
                              <option key={ind} value={ind}>{ind}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1 pt-1">
                        <label className="text-[9.5px] font-mono text-gray-500 uppercase block">Security Defense Controls Armor status (8 Layers)</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-1">
                          {p.analysis.securityLayers.map((layer) => (
                            <button
                              key={layer.id}
                              disabled={!isWhatIfMode}
                              onClick={() => toggleSecurityLayer(layer.id)}
                              className={`p-1.5 border rounded-sm font-mono text-[9px] text-center transition-all cursor-pointer ${
                                layer.enabled
                                  ? 'bg-cyan-950/70 border-cyan-500 text-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.15)]'
                                  : 'bg-[#05090d] border-[#222] text-[#555] hover:border-gray-800'
                              }`}
                            >
                              {layer.name.split(' (')[0].replace('Web Application Firewall', 'WAF').replace('Network ', '')}
                              <span className="block text-[8px] opacity-75 mt-0.5">{layer.enabled ? '● ARMED' : '○ BYPASSED'}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Live Threat Intel correlate and Real-Time RSS elements */}
                    <div className="md:col-span-5 bg-[#0b1218] border border-cyan-950 p-4 rounded-sm flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-center border-b border-[#222]/80 pb-1.5">
                          <span className="text-[11px] font-mono font-bold text-gray-400 uppercase tracking-widest block">📡 RSS Live Threat Intelligence Feed</span>
                          <span className="text-[8px] font-mono bg-cyan-950 text-cyan-400 border border-cyan-900 px-1.5 py-0.5 rounded tracking-wide">FEED STREAM: ACTIVE</span>
                        </div>
                        
                        <div className="space-y-3 mt-3">
                          {!threatIntelData ? (
                            <div className="space-y-2 py-2 pr-1">
                              <p className="text-[11px] text-gray-400 font-mono leading-relaxed">
                                Connect real-time telemetry markers and Exploits feeds (parsing CISA KEV Exploited vulnerabilities database and LevelBlue threats feeds).
                              </p>
                              <button
                                onClick={fetchThreatIntelligence}
                                disabled={isFetchingIntel}
                                className="w-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 py-2 rounded font-mono text-[10.5px] hover:bg-cyan-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
                              >
                                {isFetchingIntel ? (
                                  <>
                                    <span className="w-3 h-3 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></span>
                                    CONTACTING GLOBAL FEEDS GATEWAY...
                                  </>
                                ) : (
                                  <>
                                    <span>🌐 SYNC LIVE ADVERSARY CAMPAIGNS & CVES</span>
                                  </>
                                )}
                              </button>
                              {intelError && (
                                <p className="text-[9px] text-red-400 font-mono bg-red-950/40 p-1.5 rounded border border-red-900/40">{intelError}</p>
                              )}
                            </div>
                          ) : (
                            <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
                              <div className="flex items-center justify-between text-[10px] bg-[#05090d] p-1.5 border border-[#1b252f] rounded font-mono">
                                <span className="text-[#888]">CISA CVEs: <strong className="text-red-400">{threatIntelData.cves.length}</strong></span>
                                <span className="text-[#888]">Pulses: <strong className="text-yellow-400">{threatIntelData.otxPulses.length}</strong></span>
                                <span className="text-[#888]">VT Rep: <strong className="text-green-400">CLEAN</strong></span>
                              </div>
                              
                              <div className="space-y-1.5">
                                {threatIntelData.cves.slice(0, 3).map((cve: any) => (
                                  <div key={cve.cveID} className="text-[10px] bg-[#050a0e] p-2 border border-[#111] rounded font-mono">
                                    <div className="flex justify-between text-[9px] border-b border-[#222]/40 pb-0.5">
                                      <span className="text-red-400 font-bold">{cve.cveID}</span>
                                      <span className="text-gray-500">Industry exploited: {cve.knownRansomwareCampaignUse || 'Active'}</span>
                                    </div>
                                    <p className="text-[#eee] font-bold text-[10px] mt-0.5 leading-tight">{cve.vulnerabilityName}</p>
                                    <p className="text-gray-400 text-[9px] leading-relaxed mt-1 line-clamp-2">{cve.shortDescription}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {threatIntelData && (
                        <div className="mt-3 space-y-2">
                          <button
                            onClick={injectLiveThreatsToModel}
                            disabled={hasInjectedLiveThreats}
                            className={`w-full font-mono text-[10px] py-1.5 px-3 rounded border transition-all text-center flex items-center justify-center gap-2 ${
                              hasInjectedLiveThreats
                                ? 'bg-[#121c16] text-[#00ff66] border-[#00ff66]/20'
                                : 'bg-red-500/10 text-red-450 border-red-500/20 hover:bg-red-500/20 cursor-pointer animate-pulse'
                            }`}
                          >
                            {hasInjectedLiveThreats ? (
                              <span>✓ SYSTEM CORE RE-SCANNED WITH LIVE CVE VECTOR INJECTS</span>
                            ) : (
                              <span>📥 OVERLAY MODEL WITH LIVE ACTIVE INTEL CVES</span>
                            )}
                          </button>
                          <button
                            onClick={() => {
                              setThreatIntelData(null);
                              setHasInjectedLiveThreats(false);
                            }}
                            className="w-full bg-[#05090d] hover:bg-gray-950 text-gray-500 border border-cyan-950 font-mono text-[9px] py-1 text-center transition-all cursor-pointer rounded"
                          >
                            RESET LIVE THREAT FEEDS
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Sandbox Comparison Metrics Overlay */}
                  {isWhatIfMode && whatIfProject && (
                    <div className="mt-4 bg-[#1a0e05]/30 border border-yellow-500/20 p-3.5 rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 bg-yellow-500 h-full"></div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[9.5px] font-mono bg-yellow-500 text-black px-1.5 py-0.5 rounded font-extrabold uppercase">SANDBOX HUD CONTRAST ACTIVE</span>
                          <span className="text-xs text-yellow-400 font-mono font-bold">A/B Strategy Evaluation Grid</span>
                        </div>
                        <p className="text-[11px] leading-relaxed text-gray-300 font-mono pr-2">
                          Alter parameters to evaluate Risk & Compliance deltas immediately before applying security policy configuration overrides.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 bg-black/60 border border-cyan-950 p-2.5 rounded divide-x divide-cyan-951 font-mono min-w-[240px]">
                        <div className="text-center pl-2">
                          <div className="text-[8.5px] text-gray-500 uppercase">System Risk Score</div>
                          <div className="flex items-center justify-center gap-1.5 mt-1">
                            <span className="text-xs text-gray-400 line-through">{activeProject.analysis.riskScore}%</span>
                            <span className="text-sm font-bold text-[#00f3ff]">&rarr; {p.analysis.riskScore}%</span>
                          </div>
                          <span className={`text-[8.5px] font-bold ${p.analysis.riskScore < activeProject.analysis.riskScore ? 'text-green-400' : p.analysis.riskScore > activeProject.analysis.riskScore ? 'text-red-400' : 'text-gray-500'}`}>
                            {p.analysis.riskScore < activeProject.analysis.riskScore ? `-${activeProject.analysis.riskScore - p.analysis.riskScore}% Risk Drops` : p.analysis.riskScore > activeProject.analysis.riskScore ? `+${p.analysis.riskScore - activeProject.analysis.riskScore}% Risk Rises` : 'Stable Risk'}
                          </span>
                        </div>

                        <div className="text-center pl-4">
                          <div className="text-[8.5px] text-gray-500 uppercase">Perimeter Strength</div>
                          <div className="flex items-center justify-center gap-1.5 mt-1">
                            <span className="text-xs text-gray-400 line-through">{activeProject.analysis.maturityScore}%</span>
                            <span className="text-sm font-bold text-[#00f3ff]">&rarr; {p.analysis.maturityScore}%</span>
                          </div>
                          <span className="text-[8.5px] text-blue-400 font-bold">
                            {p.analysis.securityLayers.filter(l => l.enabled).length} / {p.analysis.securityLayers.length} Enabled
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Core metrics visual grid (Dials and metrics overview) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  
                  {/* 1. Threat Risk score dial */}
                  <div className="p-4 border border-[#222] bg-[#0c0c0c] rounded flex flex-col justify-between hover:border-[#333] transition-colors relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-[#ff003c]/5 rounded-bl-full pointer-events-none"></div>
                    <div>
                      <span className="text-[9px] text-[#666] uppercase tracking-wider block font-mono">System Threat Gap</span>
                      <div className="text-3xl font-mono text-red-500 font-extrabold mt-1">{p.analysis.riskScore}%</div>
                    </div>
                    <div className="mt-4">
                      <div className="h-1.5 bg-[#222] rounded-full overflow-hidden">
                        <div className="h-full bg-red-500 rounded-full transition-all" style={{ width: `${p.analysis.riskScore}%` }}></div>
                      </div>
                      <p className="text-[9.5px] text-[#777] mt-1.5 font-mono italic">
                        {p.analysis.riskScore > 65 ? 'Critical vulnerability footprint' : p.analysis.riskScore > 40 ? 'Moderate exposure level' : 'Safe perimeter established'}
                      </p>
                    </div>
                  </div>

                  {/* 2. Security maturity level */}
                  <div className="p-4 border border-[#222] bg-[#0c0c0c] rounded flex flex-col justify-between hover:border-[#333] transition-colors relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-500/5 rounded-bl-full pointer-events-none"></div>
                    <div>
                      <span className="text-[9px] text-[#666] uppercase tracking-wider block font-mono">Maturity Classification</span>
                      <div className="text-xl font-mono text-yellow-500 font-extrabold mt-1">{p.analysis.maturityLevel}</div>
                    </div>
                    <div className="mt-4 space-y-1">
                      <div className="flex justify-between text-[10px] font-mono text-[#888]">
                        <span>Maturity score:</span>
                        <span className="text-yellow-500 font-bold">{p.analysis.maturityScore}%</span>
                      </div>
                      <div className="h-1.5 bg-[#222] rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-500 rounded-full transition-all" style={{ width: `${p.analysis.maturityScore}%` }}></div>
                      </div>
                    </div>
                  </div>

                  {/* 3. Threat count */}
                  <div className="p-4 border border-[#222] bg-[#0c0c0c] rounded flex flex-col justify-between hover:border-[#333] transition-colors">
                    <div>
                      <span className="text-[9px] text-[#666] uppercase tracking-wider block font-mono">Identified Vectors</span>
                      <div className="text-3xl font-mono text-white font-extrabold mt-1">{p.analysis.threats.length} Active</div>
                    </div>
                    <div className="mt-4 flex gap-1 text-[10px] font-mono">
                      <span className="bg-red-950 text-red-400 px-1.5 py-0.5 border border-red-900 rounded">
                        {p.analysis.threats.filter(t => t.severityScore >= 7.5).length} Critical
                      </span>
                      <span className="bg-gray-900 text-gray-400 px-1.5 py-0.5 border border-gray-800 rounded">
                        {p.analysis.threats.filter(t => t.status === 'Mitigated').length} Mitigated
                      </span>
                    </div>
                  </div>

                  {/* 4. Active protection level */}
                  <div className="p-4 border border-[#222] bg-[#0c0c0c] rounded flex flex-col justify-between hover:border-[#333] transition-colors">
                    <div>
                      <span className="text-[9px] text-[#666] uppercase tracking-wider block font-mono">Shield Integrity</span>
                      <div className="text-3xl font-mono text-[#00f3ff] font-extrabold mt-1">
                        {p.analysis.securityLayers.filter(l => l.enabled).length} / {p.analysis.securityLayers.length}
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-[10px] font-mono text-[#bbb] mb-1">Interactive layers enabled</p>
                      <button 
                        onClick={() => setActiveTab('visualizer')} 
                        className="text-[10px] font-mono text-[#00f3ff] hover:underline cursor-pointer flex items-center gap-1"
                      >
                        Tweak Protection Matrix &rarr;
                      </button>
                    </div>
                  </div>

                </div>

                {/* Executive Summary Card overview */}
                <div className="p-5 border border-[#222] bg-[#090909] rounded-md space-y-2">
                  <span className="text-[10px] text-[#666] uppercase tracking-wider block font-mono italic">AI Executive System Safety Assessment Summary</span>
                  <p className="text-xs leading-relaxed text-[#ccc] font-mono">
                    {p.analysis.executiveSummary}
                  </p>
                  <div className="pt-2 flex flex-wrap gap-2 text-[10px] font-mono">
                    <span className="text-[#666]">TECH IDENTIFIERS:</span>
                    {p.techStack.map(t => (
                      <span key={t} className="px-1.5 py-0.5 bg-[#161616] border border-[#222] text-[#bbb] rounded">{t}</span>
                    ))}
                  </div>
                </div>

                {/* Dynamic threat modeling intelligence and Mitigation checklists */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* Left side: Threat modeling list with CVSS tags */}
                  <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between border-b border-[#222] pb-2">
                      <h3 className="text-xs font-mono font-bold uppercase text-[#00f3ff] tracking-widest flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-[#ff0055]" />
                        Model Threat Matrix (MITRE/OWASP aligned)
                      </h3>
                      <span className="text-[10px] font-mono text-[#666]">{p.analysis.threats.length} threats evaluated</span>
                    </div>

                    <div className="space-y-3">
                      {p.analysis.threats.map((threat) => (
                        <div 
                          key={threat.id} 
                          className={`p-4 border rounded-sm transition-all bg-[#0a0a0a] ${
                            threat.status === 'Mitigated' 
                              ? 'border-green-950/40 opacity-80 hover:opacity-100' 
                              : 'border-red-950/30'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <div>
                              <h4 className="text-xs font-mono font-bold text-white flex items-center gap-2">
                                {threat.status === 'Mitigated' ? (
                                  <CheckCircle className="w-3.5 h-3.5 text-green-400 shrink-0" />
                                ) : (
                                  <XCircle className="w-3.5 h-3.5 text-red-500 shrink-0" />
                                )}
                                {threat.name}
                              </h4>
                              <span className="text-[10px] font-mono text-[#666] uppercase tracking-wide block mt-0.5">Category: {threat.category}</span>
                            </div>
                            <div className="shrink-0 flex items-center gap-1.5">
                              {severityBadge(threat.severityScore)}
                              <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono ${
                                threat.status === 'Mitigated' 
                                  ? 'bg-green-950 text-green-400 border border-green-900' 
                                  : 'bg-red-950/40 text-red-400 border border-red-900/60'
                              }`}>
                                {threat.status}
                              </span>
                            </div>
                          </div>

                          <p className="text-[11px] text-[#888] font-mono leading-relaxed mb-3">{threat.description}</p>
                          
                          <div className="p-2.5 bg-[#050505] border border-[#222] rounded-sm text-[10.5px] text-[#bcb] font-mono flex items-start gap-2">
                            <span className="text-[#00f3ff] font-bold">MITIGATION PATHWAY:</span>
                            <span className="leading-snug">{threat.mitigation}</span>
                          </div>

                          {/* Mitigation quick enablement control link */}
                          <div className="mt-2.5 flex justify-between items-center text-[10px] font-mono text-[#555]">
                            <span>Controlled by layer component: <strong className="text-white">{threat.mitigationLayerId.toUpperCase()}</strong></span>
                            <button 
                              onClick={() => toggleSecurityLayer(threat.mitigationLayerId)}
                              className="bg-transparent hover:bg-[#111] hover:text-[#00f3ff] px-2 py-0.5 border border-[#333] hover:border-[#00f3ff] rounded font-semibold text-[9.5px] cursor-pointer transition-colors"
                            >
                              Toggle protection layer
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right side: AI CVE Vulnerability Predictor and feedback rating center */}
                  <div className="space-y-6">
                    
                    {/* Vulnerability prediction */}
                    <div className="space-y-3 bg-[#0a0a0a] border border-[#222] p-4 rounded text-xs">
                      <h3 className="text-xs font-mono font-bold uppercase text-[#00f3ff] tracking-wider mb-2 flex items-center gap-1.5">
                        <Cpu className="w-4 h-4 text-purple-400" />
                        CVE Vulnerability Predictor
                      </h3>
                      <p className="text-[11px] text-[#666] font-mono leading-snug">Predicted zero-day exposure profiles based on NLP dependency scanning vectors:</p>
                      
                      <div className="space-y-3 pt-2">
                        {p.analysis.vulnerabilities.map((vul) => (
                          <div key={vul.cveId} className="p-3 bg-[#111]/80 border border-[#222] rounded space-y-1">
                            <div className="flex justify-between items-center font-mono">
                              <span className="text-[#00f3ff] font-bold text-[10.5px]">{vul.cveId}</span>
                              <span className="font-bold text-red-400 text-[10px]">{vul.probability}% Match Risk</span>
                            </div>
                            <div className="text-[11px] font-bold text-white mt-1">{vul.title}</div>
                            <p className="text-[10px] text-[#999] leading-snug">{vul.description}</p>
                            <div className="pt-1.5 text-[9.5px] text-green-400 border-t border-[#1c1c1c] font-mono leading-tight">
                              REMEDIATION: {vul.remediation}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Operational Risk Matrix Graph Simulation (CVSS heatmap visual grid representation) */}
                    <div className="p-4 bg-[#0a0a0a] border border-[#222] rounded space-y-3">
                      <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                        <Network className="w-4 h-4 text-yellow-500" />
                        Risk Matrix Matrix heatmap
                      </h4>
                      
                      <div className="grid grid-cols-3 gap-2 text-[9px] font-mono text-center">
                        <div className="p-2 bg-red-950/70 border border-red-500 text-red-200">
                          <span className="block font-bold">HIGH</span>
                          Impact / Prob
                        </div>
                        <div className="p-2 bg-amber-950/50 border border-amber-500 text-amber-200">
                          <span className="block font-bold">MEDIUM</span>
                          Risk Matrix
                        </div>
                        <div className="p-2 bg-blue-950/40 border border-blue-500 text-blue-200">
                          <span className="block font-bold">LOW</span>
                          Guaranteed Safe
                        </div>
                      </div>
                      
                      <p className="text-[10px] text-[#666] leading-snug font-mono italic">Continuous AI scanning rates are mapped to CVSS benchmarks.</p>
                    </div>

                    {/* Feedback learning system loop */}
                    <div className="p-4 bg-[#0a0a0a] border border-dashed border-[#333] rounded space-y-3">
                      <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                        <Settings className="w-4 h-4 text-cyan-400" />
                        AI Training Feedback Loop
                      </h3>
                      <p className="text-[10px] text-[#888] leading-snug font-mono">Calibrate AI security diagnostics. Your scoring directly affects fine-tuning weights for similar tech stacks.</p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-mono text-[#999]">Rate Diagnostic Fidelity:</span>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                onClick={() => setFeedbackRating(star)}
                                disabled={feedbackSubmitted}
                                className="text-yellow-500 hover:scale-110 transition-transform cursor-pointer"
                              >
                                <Star className={`w-4 h-4 ${feedbackRating >= star ? 'fill-yellow-500' : 'text-gray-600'}`} />
                              </button>
                            ))}
                          </div>
                        </div>

                        <textarea
                          value={feedbackText}
                          onChange={(e) => setFeedbackText(e.target.value)}
                          placeholder="Add engineering notes, incorrect risk assumptions, or custom mitigation guidelines..."
                          disabled={feedbackSubmitted}
                          className="w-full bg-[#111] border border-[#222] text-[11px] p-2 rounded focus:outline-none focus:border-[#00f3ff] text-white font-mono h-16 resize-none"
                        />

                        <button
                          onClick={handleSubmitFeedback}
                          disabled={feedbackSubmitted}
                          className="w-full bg-[#00f3ff] text-black text-[10px] font-mono font-bold py-1.5 rounded hover:bg-[#00d0e6] transition-all cursor-pointer uppercase"
                        >
                          {feedbackSubmitted ? '✅ SCORING COMMITTED' : 'SUBMIT RE-TRAINING SCORES'}
                        </button>
                      </div>
                    </div>

                  </div>

                </div>

              </div>
            );
          })()}

          {/* PAGE 4: Node-based Architecture Visualizer & Builder */}
          {activeTab === 'visualizer' && activeProject && activeProject.analysis && (
            <div className="max-w-5xl mx-auto space-y-6">
              
              <div className="border-b border-[#222] pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Network className="w-5 h-5 text-[#00f3ff]" /> System Topology Visualizer & Node Builder
                  </h2>
                  <p className="text-xs text-[#888] mt-1">
                    Click custom target shield components in the logical flow below to toggle secure mitigation gates. See threat outcomes instantly.
                  </p>
                </div>
                
                {/* Visualizer help tooltip trigger */}
                <span className="text-[10px] font-mono px-2 py-1 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 rounded">
                  CLICK SHIELDS TO ARM SYSTEMS
                </span>
              </div>

              {/* Security Controls settings layout panels */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                
                {/* Left control panel list */}
                <div className="lg:col-span-1 space-y-3">
                  <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider border-b border-[#222] pb-1">
                    Security Mitigation Layers
                  </h3>
                  
                  <div className="space-y-2">
                    {activeProject.analysis.securityLayers.map((layer) => (
                      <button 
                        key={layer.id}
                        onClick={() => toggleSecurityLayer(layer.id)}
                        className={`w-full p-2.5 text-left border rounded transition-all cursor-pointer ${
                          layer.enabled 
                            ? 'bg-cyan-950/20 border-[#00f3ff] text-white shadow-[0_0_8px_rgba(0,243,255,0.1)]' 
                            : 'bg-[#0e0e0e] border-[#222] text-[#888] hover:border-[#444]'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[11px] font-bold font-mono truncate">{layer.name}</span>
                          <span className={`w-2 h-2 rounded-full ${layer.enabled ? 'bg-[#00f3ff] shadow-[0_0_6px_#00f3ff]' : 'bg-red-500'}`}></span>
                        </div>
                        <p className="text-[9.5px] leading-relaxed text-[#777] font-mono select-none line-clamp-2">
                          {layer.description}
                        </p>
                        <div className="mt-1.5 flex justify-between items-center text-[9px] font-mono">
                          <span className={layer.enabled ? 'text-[#00f3ff]' : 'text-red-400'}>
                            {layer.enabled ? 'SHIELD ONLINE' : 'BYPASSED'}
                          </span>
                          <span className="text-[#555]">{layer.type}</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Fast Action */}
                  <div className="pt-2">
                    <button 
                      onClick={() => {
                        if (!activeProject || !activeProject.analysis) return;
                        const layers = activeProject.analysis.securityLayers.map(l => ({ ...l, enabled: true }));
                        const updatedAnalysis = { ...activeProject.analysis, securityLayers: layers, riskScore: 12, maturityScore: 95 };
                        setActiveProject({ ...activeProject, analysis: updatedAnalysis });
                      }}
                      className="w-full bg-[#111] hover:bg-[#1a1a1a] border border-[#333] hover:border-[#00f3ff] text-white text-[10px] font-mono py-1.5 rounded cursor-pointer transition-colors"
                    >
                      ARM ALL SHIELD MODULES
                    </button>
                  </div>
                </div>

                {/* Right side: Active interactive network node topologies rendered inside scalable SVG */}
                <div className="lg:col-span-3 bg-[#0a0a0a] border border-[#222] rounded-md p-4 relative flex flex-col justify-between min-h-[400px]">
                  
                  {/* Status metrics inside map */}
                  <div className="flex justify-between items-center text-[10px] font-mono text-cyan-400 tracking-wider">
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                      INTERACTIVE SECURITY TOPOLOGY
                    </span>
                    <span>ACTIVE DIRECTORIES SCANNING: ON</span>
                  </div>

                  {/* SVG Nodes Representation */}
                  <div className="flex-1 flex items-center justify-center py-4">
                    <svg className="w-full h-full max-h-[380px] min-h-[300px]" viewBox="0 0 820 360">
                      
                      {/* Connection Wirelines */}
                      {/* Users => Internet => WAF => API Gateway => FW => Server => DB */}
                      <path d="M 60 180 L 170 180" stroke="#222" strokeWidth="2" strokeDasharray="3,3" />
                      <path d="M 170 180 L 280 100" stroke="#333" strokeWidth="2" />
                      <path d="M 170 180 L 280 260" stroke="#333" strokeWidth="2" />
                      
                      <path d="M 280 100 L 420 180" stroke="#333" strokeWidth="2" />
                      <path d="M 280 260 L 420 180" stroke="#333" strokeWidth="2" />

                      <path d="M 420 180 L 560 180" stroke="#333" strokeWidth="2" />
                      <path d="M 560 180 L 720 180" stroke="#333" strokeWidth="2" />

                      {/* Connection to SIEM */}
                      <path d="M 560 180 L 420 310" stroke="#222" strokeWidth="1" strokeDasharray="2,2" />
                      <path d="M 720 180 L 420 310" stroke="#222" strokeWidth="1" strokeDasharray="2,2" />

                      {/* 1. Users Node */}
                      <g transform="translate(60, 180)" className="cursor-pointer select-none">
                        <circle r="32" fill="#0c0c0c" stroke="#333" strokeWidth="2" />
                        <User className="w-5 h-5 text-[#888]" x="-10" y="-14" />
                        <text y="22" textAnchor="middle" fill="#aaa" fontSize="9" fontFamily="monospace">User Ingress</text>
                        <circle r="6" cx="24" cy="-24" fill="#00f3ff" />
                      </g>

                      {/* 2. Public Internet Portal */}
                      <g transform="translate(170, 180)">
                        <circle r="26" fill="#0c0c0c" stroke="#555" strokeWidth="1" />
                        <Globe className="w-4 h-4 text-[#888]" x="-8" y="-10" />
                        <text y="20" textAnchor="middle" fill="#666" fontSize="9" fontFamily="monospace">WAN Gateway</text>
                      </g>

                      {/* 3. WAF Shield Switch Node */}
                      {(() => {
                        const isWaf = activeProject.analysis.securityLayers.find(l => l.id === 'lay-waf')?.enabled;
                        return (
                          <g 
                            transform="translate(280, 100)" 
                            onClick={() => toggleSecurityLayer('lay-waf')} 
                            className="cursor-pointer group"
                          >
                            <rect x="-35" y="-20" width="70" height="40" rx="3" fill="#0c0c0c" stroke={isWaf ? '#00f3ff' : '#444'} strokeWidth={isWaf ? 2 : 1} className="transition-all hover:stroke-[#00f3ff]" />
                            <text y="4" textAnchor="middle" fill={isWaf ? '#00f3ff' : '#666'} fontSize="9" fontFamily="monospace" fontWeight="bold">WAF EDGE</text>
                            <text y="14" textAnchor="middle" fill={isWaf ? '#00f3ff' : '#555'} fontSize="7" fontFamily="monospace">{isWaf ? 'ARMED' : 'BYPASSED'}</text>
                            
                            {/* Visual glowing status indicators */}
                            <circle r="3" cx="30" cy="-15" fill={isWaf ? '#00f3ff' : '#ef4444'} />
                          </g>
                        );
                      })()}

                      {/* 4. Secure API Gateway Switch Node */}
                      {(() => {
                        const isGw = activeProject.analysis.securityLayers.find(l => l.id === 'lay-gw')?.enabled;
                        return (
                          <g 
                            transform="translate(280, 260)" 
                            onClick={() => toggleSecurityLayer('lay-gw')} 
                            className="cursor-pointer group"
                          >
                            <rect x="-35" y="-20" width="70" height="40" rx="3" fill="#0c0c0c" stroke={isGw ? '#00f3ff' : '#444'} strokeWidth={isGw ? 2 : 1} />
                            <text y="2" textAnchor="middle" fill={isGw ? '#00f3ff' : '#666'} fontSize="9" fontFamily="monospace" fontWeight="bold">API_GW</text>
                            <text y="12" textAnchor="middle" fill={isGw ? '#00f3ff' : '#555'} fontSize="7" fontFamily="monospace">{isGw ? 'PROTECT' : 'BYPASS'}</text>
                            <circle r="3" cx="30" cy="-15" fill={isGw ? '#00f3ff' : '#ef4444'} />
                          </g>
                        );
                      })()}

                      {/* 5. Ingress Network Firewall boundary */}
                      {(() => {
                        const isFw = activeProject.analysis.securityLayers.find(l => l.id === 'lay-fw')?.enabled;
                        return (
                          <g 
                            transform="translate(420, 180)" 
                            onClick={() => toggleSecurityLayer('lay-fw')} 
                            className="cursor-pointer group"
                          >
                            <rect x="-42" y="-20" width="84" height="40" rx="2" fill="#0c0c0c" stroke={isFw ? '#00f3ff' : '#444'} strokeWidth={isFw ? 2 : 1} />
                            <text y="2" textAnchor="middle" fill={isFw ? '#00f3ff' : '#666'} fontSize="9" fontFamily="monospace" fontWeight="bold">NET_FIREWALL</text>
                            <text y="12" textAnchor="middle" fill={isFw ? '#00f3ff' : '#555'} fontSize="7" fontFamily="monospace">{isFw ? 'BLOCKING_ON' : 'CLOSED'}</text>
                            <circle r="3" cx="37" cy="-15" fill={isFw ? '#00f3ff' : '#ef4444'} />
                          </g>
                        );
                      })()}

                      {/* 6. Application Server Node */}
                      <g transform="translate(560, 180)">
                        <circle r="32" fill="#0c0c0c" stroke="#333" strokeWidth="2" />
                        <Cpu className="w-5 h-5 text-white" x="-10" y="-12" />
                        <text y="24" textAnchor="middle" fill="#fff" fontSize="9" fontFamily="monospace">Core Workload</text>
                      </g>

                      {/* 7. PostgreSQL Database with Encrypted status tag */}
                      {(() => {
                        const isEncrypted = activeProject.analysis.securityLayers.find(l => l.id === 'lay-enc')?.enabled;
                        return (
                          <g 
                            transform="translate(720, 180)" 
                            onClick={() => toggleSecurityLayer('lay-enc')} 
                            className="cursor-pointer group"
                          >
                            <polygon points="0,-32 30,0 0,32 -30,0" fill="#0c0c0c" stroke={isEncrypted ? '#00f3ff' : '#444'} strokeWidth={isEncrypted ? 2 : 1} />
                            <Database className="w-4 h-4 text-[#888] group-hover:text-[#00f3ff]" x="-8" y="-10" />
                            <text y="24" textAnchor="middle" fill={isEncrypted ? '#00f3ff' : '#888'} fontSize="8" fontFamily="monospace" fontWeight="bold">DATALAKE</text>
                            <circle r="3" cx="18" cy="-18" fill={isEncrypted ? '#00f3ff' : '#ef4444'} />
                          </g>
                        );
                      })()}

                      {/* 8. Threat Logging (SIEM Integration) */}
                      {(() => {
                        const isSiem = activeProject.analysis.securityLayers.find(l => l.id === 'lay-siem')?.enabled;
                        return (
                          <g 
                            transform="translate(420, 310)" 
                            onClick={() => toggleSecurityLayer('lay-siem')} 
                            className="cursor-pointer"
                          >
                            <circle r="24" fill="#070707" stroke={isSiem ? '#00f3ff' : '#333'} strokeWidth={1} />
                            <Terminal className="w-4 h-4 text-purple-400" x="-8" y="-8" />
                            <text y="30" textAnchor="middle" fill="#666" fontSize="8" fontFamily="monospace">SIEM Monitor Audit</text>
                          </g>
                        );
                      })()}

                    </svg>
                  </div>

                  {/* Topology bottom advice logs */}
                  <div className="bg-[#111] p-3 border border-[#222] rounded flex items-center justify-between text-[11px] font-mono">
                    <span className="text-[#888]">
                      CURRENT ACTIVE THREAT LEVEL SCORES: 
                      <strong className={activeProject.analysis.riskScore > 60 ? 'text-red-400 ml-1.5' : 'text-green-400 ml-1.5'}>
                        {activeProject.analysis.riskScore > 60 ? 'EXPOSED DANGER' : 'SECURE CONFIG'}
                      </strong>
                    </span>
                    <button 
                      onClick={() => setActiveTab('simulator')}
                      className="text-[#00f3ff] hover:underline cursor-pointer font-bold flex items-center gap-1"
                    >
                      ENGAGE THREAT VECTORS SIMULATOR &rarr;
                    </button>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* PAGE 5: Live Threat Simulation Map */}
          {activeTab === 'simulator' && activeProject && activeProject.analysis && (
            <div className="max-w-4xl mx-auto space-y-6">
              
              <div className="border-b border-[#222] pb-4 flex justify-between items-center">
                <div>
                  <h2 className="text-xl sm:text-2xl font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Zap className="w-5 h-5 text-purple-400" /> Interactive Threat Simulator Sandbox
                  </h2>
                  <p className="text-xs text-[#888] mt-1">
                    Select an external exploit packet vector. Simulate the transmission, routing checkpoints, and evaluate defensive shield effectiveness.
                  </p>
                </div>
              </div>

              {/* Simulation controls grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* 1. Select attack criteria */}
                <div className="bg-[#0a0a0a] border border-[#222] p-5 rounded-md space-y-4">
                  <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                    Configure Exploit Packet
                  </h3>

                  <div className="space-y-2">
                    <button 
                      onClick={() => setSelectedExploit('sqli')}
                      className={`w-full p-2.5 text-left border rounded text-xs font-mono flex items-center justify-between transition-all cursor-pointer ${
                        selectedExploit === 'sqli' ? 'bg-red-950/20 border-red-500 text-white' : 'bg-[#111] border-[#222] text-[#888] hover:border-[#333]'
                      }`}
                    >
                      <span>1. Web SQL Injection Payload</span>
                      <span className="text-[10px] bg-red-900/30 text-red-400 px-1.5 border border-red-850 rounded">Database Extrusion</span>
                    </button>

                    <button 
                      onClick={() => setSelectedExploit('ddos')}
                      className={`w-full p-2.5 text-left border rounded text-xs font-mono flex items-center justify-between transition-all cursor-pointer ${
                        selectedExploit === 'ddos' ? 'bg-red-950/20 border-red-500 text-white' : 'bg-[#111] border-[#222] text-[#888] hover:border-[#333]'
                      }`}
                    >
                      <span>2. DDoS Traffic Surge</span>
                      <span className="text-[10px] bg-amber-900/30 text-amber-500 px-1.5 border border-amber-850 rounded">Infrastr. Exhaustion</span>
                    </button>

                    <button 
                      onClick={() => setSelectedExploit('mitm')}
                      className={`w-full p-2.5 text-left border rounded text-xs font-mono flex items-center justify-between transition-all cursor-pointer ${
                        selectedExploit === 'mitm' ? 'bg-red-950/20 border-red-500 text-white' : 'bg-[#111] border-[#222] text-[#888] hover:border-[#333]'
                      }`}
                    >
                      <span>3. Man-In-The-Middle router hijack</span>
                      <span className="text-[10px] bg-[#00f3ff]/10 text-[#00f3ff] px-1.5 border border-cyan-900 rounded">TLS/Air Packet Sniffing</span>
                    </button>

                    <button 
                      onClick={() => setSelectedExploit('api')}
                      className={`w-full p-2.5 text-left border rounded text-xs font-mono flex items-center justify-between transition-all cursor-pointer ${
                        selectedExploit === 'api' ? 'bg-red-950/20 border-red-500 text-white' : 'bg-[#111] border-[#222] text-[#888] hover:border-[#333]'
                      }`}
                    >
                      <span>4. Broken Object Auth API abuse</span>
                      <span className="text-[10px] bg-yellow-950 text-yellow-500 px-1.5 border border-yellow-900/60 rounded">Privilege Bypass</span>
                    </button>

                    <button 
                      onClick={() => setSelectedExploit('ransomware')}
                      className={`w-full p-2.5 text-left border rounded text-xs font-mono flex items-center justify-between transition-all cursor-pointer ${
                        selectedExploit === 'ransomware' ? 'bg-red-950/20 border-red-500 text-white' : 'bg-[#111] border-[#222] text-[#888] hover:border-[#333]'
                      }`}
                    >
                      <span>5. Ransomware Hostage Script</span>
                      <span className="text-[10px] bg-purple-950 text-purple-400 px-1.5 border border-purple-900 rounded">Encryp lock payloads</span>
                    </button>
                  </div>

                  <div className="pt-2 border-t border-[#1a1a1a]">
                    <button 
                      onClick={runLiveThreatSimulation}
                      disabled={isSimulating}
                      className="w-full bg-[#00f3ff] text-black font-mono font-bold py-2.5 rounded hover:bg-[#00d0e6] transition-all flex items-center justify-center gap-2 cursor-pointer text-xs uppercase"
                    >
                      {isSimulating ? (
                        <>
                          <Loader className="w-4 h-4 animate-spin text-black" />
                          TRANSMITTING ATTACK INJECTORS ({simulationProgress}%)
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 fill-black" />
                          LAUNCH SIMULATED EXPLOIT ATTACK
                        </>
                      )}
                    </button>                    
                  </div>

                </div>

                {/* 2. Simulation visualization feedback */}
                <div className="bg-black border border-[#222] p-5 rounded-md flex flex-col justify-between font-mono h-[340px]">
                  
                  {/* Terminal Header */}
                  <div className="flex justify-between items-center text-[10px] text-[#444] border-b border-[#222] pb-2 uppercase select-none">
                    <span>Shell Console Term logs</span>
                    <span>Shield: Nominal</span>
                  </div>

                  {/* Active graphical simulation stage */}
                  <div className="flex-1 overflow-y-auto py-3 space-y-2 text-[11px] font-mono leading-relaxed">
                    {simulationLogs.length === 0 ? (
                      <div className="h-full flex items-center justify-center text-center p-3 text-[#555] italic">
                        [Console Idle] Select exploit above and click Launch to trigger live packet animations.
                      </div>
                    ) : (
                      simulationLogs.map((log, index) => (
                        <div key={index} className="space-y-0.5">
                          <span className="text-[#666] mr-2">[{log.timestamp}]</span>
                          <span className={
                            log.type === 'exploit' ? 'text-red-400' :
                            log.type === 'detection' ? 'text-yellow-500' :
                            log.type === 'block' ? 'text-green-400 font-bold' :
                            log.type === 'mitigation' ? 'text-cyan-400' : 'text-fuchsia-400'
                          }>
                            {log.message}
                          </span>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Interactive status alarm lights */}
                  <div className="border-t border-[#222] pt-3 flex justify-between items-center">
                    <span className="text-[10px] text-[#777]">OUTCOME FRAME:</span>
                    <div>
                      {simulationStatus === 'running' && (
                        <span className="text-yellow-500 font-bold animate-pulse text-[11px]">⚔️ RUNNING EXPLOIT PAYLOADS</span>
                      )}
                      {simulationStatus === 'blocked' && (
                        <span className="text-green-400 font-bold text-[11px] bg-green-950/80 px-2 py-0.5 border border-green-800 rounded">🛡️ THREAT SAFELY INTERCEPTED</span>
                      )}
                      {simulationStatus === 'breached' && (
                        <span className="text-red-500 font-bold text-[11px] bg-red-950 px-2 py-0.5 border border-red-800 rounded animate-bounce">🚨 SYSTEM EXPLOITED</span>
                      )}
                      {simulationStatus === 'idle' && (
                        <span className="text-[#444] text-[11px]">STANDBY</span>
                      )}
                    </div>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* PAGE 6: Compliance Center Tracker */}
          {activeTab === 'compliance' && activeProject && activeProject.analysis && (
            <div className="max-w-4xl mx-auto space-y-6">
              
              <div className="border-b border-[#222] pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <CheckSquare className="w-5 h-5 text-green-400" /> Compliance Mapping Center
                  </h2>
                  <p className="text-xs text-[#888] mt-1">
                    Align your parameters to industry standards. Fill core parameters to satisfy regulatory audits.
                  </p>
                </div>
                
                {/* Print button */}
                <button 
                  onClick={triggerPrintReview}
                  className="bg-[#111] hover:bg-[#1a1a1a] border border-[#333] px-3.5 py-1.5 rounded text-xs font-semibold text-[#00f3ff] font-mono cursor-pointer transition-colors"
                >
                  PRINT COMPLIANCE CERTIFICATE
                </button>
              </div>

              {/* Sub tabs matching active rules scopes */}
              <div className="flex gap-2 border-b border-[#222] pb-2 overflow-x-auto text-xs font-mono">
                {['PCI-DSS v4.0', 'HIPAA Security Rule', 'FERPA', 'NIST SP 800-53', 'ISO / IEC 27001:2022', 'GDPR Article 32'].map((fw) => (
                  <button 
                    key={fw} 
                    onClick={() => setSelectedFramework(fw)}
                    className={`px-3 py-1.5 rounded transition-all whitespace-nowrap cursor-pointer ${
                      selectedFramework === fw 
                        ? 'bg-green-950 text-green-400 border border-green-900 font-bold' 
                        : 'text-[#666] hover:text-[#999]'
                    }`}
                  >
                    {fw}
                  </button>
                ))}
              </div>

              {/* Dynamic compliant layout checklists */}
              <div className="bg-[#0a0a0a] border border-[#222] p-5 rounded-md space-y-4">
                
                <div className="space-y-1">
                  <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                    {selectedFramework} Guideline Directives
                  </h3>
                  <p className="text-xs text-[#666]">Mandated control points evaluated against your setup configuration:</p>
                </div>

                <div className="space-y-3 pt-2">
                  {activeProject.analysis.complianceItems
                    .filter(item => item.framework.toLowerCase().includes(selectedFramework.split(' ')[0].toLowerCase()))
                    .map((item) => {
                      // Determine if item recommendation holds a matching active defensive layer in current project configuration
                      const isEnforced = activeProject.analysis?.securityLayers.some(l => l.enabled && l.name.toLowerCase().includes(item.control.toLowerCase()));
                      return (
                        <div key={item.id} className="p-3 border border-[#222] bg-[#111]/45 rounded flex items-start gap-4">
                          <div className="mt-0.5">
                            <input 
                              type="checkbox" 
                              checked={isEnforced || item.checked}
                              onChange={() => {
                                if (!activeProject || !activeProject.analysis) return;
                                const items = activeProject.analysis.complianceItems.map(cit => 
                                  cit.id === item.id ? { ...cit, checked: !cit.checked } : cit
                                );
                                setActiveProject({
                                  ...activeProject,
                                  analysis: { ...activeProject.analysis, complianceItems: items }
                                });
                              }}
                              className="accent-green-500 w-4 h-4 cursor-pointer"
                            />
                          </div>

                          <div className="space-y-1 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-[10.5px] font-mono font-bold text-green-400 bg-green-950/80 px-1.5 border border-green-900 rounded select-none">
                                {item.control}
                              </span>
                              <span className="text-[11px] text-[#999] font-mono">Mandatory Audit Constraint</span>
                            </div>
                            <p className="text-xs leading-relaxed text-[#eee] font-mono">{item.description}</p>
                          </div>

                          <div>
                            <span className={`text-[10.5px] font-mono px-2 py-0.5 rounded select-none ${
                              (isEnforced || item.checked) 
                                ? 'bg-green-950 text-green-400 border border-green-900' 
                                : 'bg-red-950/40 text-red-400 border border-red-900/60'
                            }`}>
                              {(isEnforced || item.checked) ? 'COMPLIANT' : 'GAP DEFICIENCY'}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </div>

                {/* Footnote advice and audit summaries */}
                <div className="p-3 bg-green-950/10 border border-green-950/20 text-green-400 text-[11px] font-mono rounded">
                  💡 <strong>Continuous Auditor Advice:</strong> Enable all security architecture components like WAFs, and databases encryption triggers to fulfill multi-framework legal audits automatically.
                </div>

              </div>

            </div>
          )}

          {/* PAGE 7: DevSecOps secure code guidelines and pipeline recommendations */}
          {activeTab === 'devsecops' && (
            <div className="max-w-4xl mx-auto space-y-6">
              
              <div className="border-b border-[#222] pb-4">
                <h2 className="text-xl sm:text-2xl font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <FileCode className="w-5 h-5 text-yellow-400" /> Secure DevOps Pipeline & Coding Guides
                </h2>
                <p className="text-xs text-[#888] mt-1">
                  Automate vulnerability scanners inside your code workflows and review direct parameterized implementations.
                </p>
              </div>

              {/* DevSecOps automated pipeline check gates */}
              <div className="space-y-3 bg-[#0a0a0a] border border-[#222] p-5 rounded-md">
                <span className="text-[10px] text-[#555] uppercase tracking-wider font-mono">Snyk/Husky CI_CD Actions Pipeline integration Guidelines</span>
                
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
                  {[
                    { phase: 'Code Scan', desc: 'Secure secrets with pre-commit git Hooks', tool: 'Snyk / SonarQube' },
                    { phase: 'Build Verification', desc: 'Software Composition imports scanning', tool: 'Trivy / OWASP SCA' },
                    { phase: 'QA Dynamic Test', desc: 'Active sandbox vulnerability triggers', tool: 'OWASP ZAP / DAST' },
                    { phase: 'Release Checks', desc: 'Check underlying container os profiles', tool: 'Docker Scan / Snyk' },
                    { phase: 'Continuos Sentry', desc: 'Realtime unauthorized traffic analytics', tool: 'Prometheus / Central SIEM' }
                  ].map((pipe, i) => (
                    <div key={i} className="p-3 bg-[#111] border border-[#222] rounded flex flex-col justify-between font-mono">
                      <div>
                        <div className="text-[#00f3ff] text-[10px] font-bold uppercase">{pipe.phase}</div>
                        <p className="text-[9.5px] text-[#777] leading-snug mt-1">{pipe.desc}</p>
                      </div>
                      <div className="mt-3 text-[10px] bg-cyan-950 text-cyan-400 px-1 border border-cyan-900 rounded-sm text-center">
                        {pipe.tool}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Secure Code Snippets playground */}
              <div className="bg-[#0a0a0a] border border-[#222] p-5 sm:p-6 rounded-md space-y-4">
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div>
                    <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                      Developer Secure Implementation Templates
                    </h3>
                    <p className="text-xs text-[#666]">Copy sanitized code snippets avoiding common injection strings:</p>
                  </div>

                  <div className="flex gap-1 border border-[#222] p-1 bg-[#111] rounded text-[10px] font-mono">
                    <button onClick={() => setSelectedLang('nodejs')} className={`px-2 py-1 rounded cursor-pointer ${selectedLang === 'nodejs' ? 'bg-[#00f3ff] text-black font-semibold' : 'text-[#888]'}`}>Node.js</button>
                    <button onClick={() => setSelectedLang('python')} className={`px-2 py-1 rounded cursor-pointer ${selectedLang === 'python' ? 'bg-[#00f3ff] text-black font-semibold' : 'text-[#888]'}`}>Python</button>
                    <button onClick={() => setSelectedLang('go')} className={`px-2 py-1 rounded cursor-pointer ${selectedLang === 'go' ? 'bg-[#00f3ff] text-black font-semibold' : 'text-[#888]'}`}>Go Spec</button>
                    <button onClick={() => setSelectedLang('spring')} className={`px-2 py-1 rounded cursor-pointer ${selectedLang === 'spring' ? 'bg-[#00f3ff] text-black font-semibold' : 'text-[#888]'}`}>Spring Java</button>
                  </div>
                </div>

                <div className="relative">
                  <pre className="bg-black border border-[#222] rounded p-4 text-xs font-mono text-[#aaa] overflow-x-auto leading-relaxed max-h-[290px] whitespace-pre select-all">
                    {getSecureCodeSnippet(selectedLang)}
                  </pre>
                  
                  {/* Copy status marker overlay */}
                  <span className="absolute top-2 right-2 text-[9.5px] bg-[#161616] border border-[#2c2c2c] text-[#999] px-2 py-0.5 rounded cursor-pointer select-none hover:text-[#00f3ff]">
                    COPY PATTERN
                  </span>
                </div>

              </div>

            </div>
          )}

          {/* PAGE 8: AI Chat Security Assistant Consultation Console */}
          {activeTab === 'ai-chat' && (
            <div className="max-w-4xl mx-auto space-y-4 flex flex-col h-[520px]">
              
              <div className="border-b border-[#222] pb-3 shrink-0">
                <h2 className="text-xl sm:text-2xl font-mono font-bold text-[#00f3ff] uppercase tracking-wider flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#00f3ff]" /> AI Security Consultant Chat Shell
                </h2>
                <p className="text-xs text-[#888] mt-1">
                  Query the virtual architect directly. Test cryptographic validation structures, API CORS concerns, or mitigation checklists.
                </p>
              </div>

              {/* Console window history layout */}
              <div className="flex-1 bg-black border border-[#222] p-4 rounded-md overflow-y-auto space-y-4 font-mono text-xs">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`p-3 max-w-[85%] rounded-md border ${
                      msg.sender === 'user' 
                        ? 'bg-[#161616] border-[#333] text-white rounded-tr-none' 
                        : 'bg-[#0e0e0e] border-[#222] text-[#ccc] rounded-tl-none whitespace-pre-wrap'
                    }`}>
                      <div className="flex justify-between items-center text-[10px] text-[#555] mb-1.5 uppercase select-none">
                        <span>{msg.sender === 'user' ? 'Operator' : 'Neo-Shield Architect'}</span>
                        <span>{msg.timestamp}</span>
                      </div>
                      {/* Simple custom regex format rendering for clean readability */}
                      <p className="leading-relaxed leading-5">
                        {msg.text}
                      </p>
                    </div>
                  </div>
                ))}
                
                {isChatSending && (
                  <div className="flex justify-start">
                    <div className="p-3 bg-[#0e0e0e]/50 border border-dashed border-[#333] rounded-md text-[#555] flex items-center gap-2">
                      <Loader className="w-3.5 h-3.5 animate-spin text-[#00f3ff]" />
                      <span>Security model analysis in progress. Formulating recommendations...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat action macros / guidelines shortcuts */}
              <div className="flex gap-2 pb-1 overflow-x-auto text-[10px] font-mono shrink-0 select-none">
                <button 
                  onClick={() => handleSendChatMessage('Draft a secure Kubernetes ingress network policy')}
                  className="bg-[#111] hover:bg-[#1f1f1f] border border-[#222] text-[#888] hover:text-white px-2.5 py-1 rounded cursor-pointer text-left whitespace-nowrap"
                >
                  "Secure Kubernetes Ingress Policy"
                </button>
                <button 
                  onClick={() => handleSendChatMessage('How do I safely implement JWT session rotating tokens?')}
                  className="bg-[#111] hover:bg-[#1f1f1f] border border-[#222] text-[#888] hover:text-white px-2.5 py-1 rounded cursor-pointer text-left whitespace-nowrap"
                >
                  "JWT Session Token Rotation"
                </button>
                <button 
                  onClick={() => handleSendChatMessage('What are best precautions protecting SQLite databases from file access?')}
                  className="bg-[#111] hover:bg-[#1f1f1f] border border-[#222] text-[#888] hover:text-white px-2.5 py-1 rounded cursor-pointer text-left whitespace-nowrap"
                >
                  "SQLite file protections"
                </button>
              </div>

              {/* Chat input textbox dispatch system */}
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendChatMessage();
                }}
                className="flex gap-2 shrink-0"
              >
                <input 
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="e.g., Draft safe CORS parameter requirements or explain CVE-2026-64019 mitigation..."
                  className="flex-1 bg-[#111] border border-[#333] rounded px-3 py-2 text-xs focus:outline-none focus:border-[#00f3ff] text-white font-mono"
                />
                <button 
                  type="submit"
                  disabled={isChatSending}
                  className="bg-[#00f3ff] text-black font-semibold px-4 rounded hover:bg-[#00d0e6] transition-all flex items-center gap-1.5 cursor-pointer text-xs uppercase"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>DISPATCH</span>
                </button>
              </form>

            </div>
          )}

          {/* PAGE 9: Project Audit History Log Admin Shell */}
          {activeTab === 'history' && (
            <div className="max-w-4xl mx-auto space-y-6">
              
              <div className="border-b border-[#222] pb-4">
                <h2 className="text-xl sm:text-2xl font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <History className="w-5 h-5" /> Threat Audit Log History Vault
                </h2>
                <p className="text-xs text-[#888] mt-1">
                  Browse previous architectures evaluated during this session and review learning feedback calibration.
                </p>
              </div>

              {analysesHistory.length === 0 ? (
                <div className="text-center p-8 bg-[#0a0a0a] border border-dashed border-[#222] rounded-md text-xs font-mono text-[#555]">
                  No compiled security frameworks evaluated during this active session.
                </div>
              ) : (
                <div className="space-y-4">
                  {analysesHistory.map((item, index) => (
                    <div key={item.id} className="p-5 border border-[#222] bg-[#0c0c0c] rounded-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-[#333]">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-xs font-mono">
                          <span className="font-bold text-[#00f3ff] bg-[#00f3ff]/5 border border-[#00f3ff]/20 px-2 py-0.5 rounded">
                            {item.industry}
                          </span>
                          <span className="text-[#6c6c6c]">Index ID: {item.id}</span>
                        </div>
                        
                        <div className="text-sm font-bold text-white font-mono">{item.name}</div>
                        
                        <div className="text-[11px] text-[#888] leading-relaxed">
                          Includes: <strong className="text-white">{item.techStack.join(', ')}</strong> | scale: {item.scale}
                        </div>

                        {item.feedbackScore && (
                          <div className="flex items-center gap-2 text-[10.5px] font-mono text-yellow-500 bg-yellow-950/20 px-2 py-0.5 border border-yellow-900/50 rounded inline-block w-fit">
                            <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500 inline mr-1" />
                            Model rated: {item.feedbackScore} stars | Notes: "{item.feedbackNotes}"
                          </div>
                        )}
                      </div>

                      <div className="flex sm:flex-col items-start sm:items-end gap-2 text-xs font-mono shrink-0">
                        <span className="text-red-400 font-bold">Threat gap score: {item.analysis?.riskScore}%</span>
                        <span className="text-[#555]">{item.createdAt}</span>
                        
                        <button 
                          onClick={() => {
                            setActiveProject(item);
                            setActiveTab('dashboard');
                          }}
                          className="px-2.5 py-1 bg-[#111] border border-[#2c2c2c] hover:border-[#00f3ff] text-white rounded font-bold cursor-pointer hover:bg-black transition-colors"
                        >
                          LOAD STRATEGY
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}

        </main>
      </div>

      {/* FOOTER: System stats docking row */}
      <footer className="h-10 border-t border-[#333] bg-[#00f3ff] text-black text-[11px] font-bold font-mono px-4 sm:px-6 flex items-center justify-between shrink-0 select-none z-10">
        <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar">
          <button 
            onClick={() => {
              if (activeProject) {
                setActiveTab('dashboard');
                triggerPrintReview();
              } else {
                alert('Specify scope profiles to trigger printed audits.');
              }
            }}
            className="flex items-center gap-1 hover:opacity-80 transition-opacity cursor-pointer font-bold shrink-0"
          >
            <FileText className="w-3.5 h-3.5" />
            GENERATE AUDIT REPORT
          </button>

          <button 
            onClick={() => {
              setActiveTab('simulator');
              runLiveThreatSimulation();
            }}
            className="flex items-center gap-1 hover:opacity-80 transition-opacity cursor-pointer font-bold shrink-0"
          >
            <Play className="w-3.5 h-3.5 fill-black" />
            SIMULATE EXPLOITS
          </button>

          <button 
            onClick={() => setActiveTab('devsecops')}
            className="flex items-center gap-1 hover:opacity-80 transition-opacity cursor-pointer font-bold shrink-0"
          >
            <FileCode className="w-3.5 h-3.5" />
            IAC EXPORT MODES
          </button>
        </div>

        <div className="text-[10px] hidden md:block text-slate-900">
          HOST RUNTIME INTERFACE: Cloud Run Container | UTC: {new Date().toISOString().substring(11, 19)}
        </div>
      </footer>

      {/* Simulated User Login & Profile Modaler */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-sm bg-[#080808] border-2 border-[#1a1a1a] rounded-sm p-6 text-xs font-mono space-y-4">
            
            <div className="flex justify-between items-center border-b border-[#222] pb-2 text-[#00f3ff] uppercase">
              <span className="font-bold flex items-center gap-1"><Lock className="w-3.5 h-3.5" /> Connect Developer Profile</span>
              <button onClick={() => setShowAuthModal(false)} className="text-[#666] hover:text-white cursor-pointer">&times;</button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[10px] text-[#666] uppercase block mb-1">Corporate Email Address</label>
                <input 
                  type="email" 
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  placeholder="name@enterprise.corp"
                  className="w-full bg-[#111] border border-[#222] rounded px-3 py-1.5 focus:outline-none focus:border-[#00f3ff] text-white"
                />
              </div>

              <div>
                <label className="text-[10px] text-[#666] uppercase block mb-1">Access Role Context</label>
                <select 
                  value={authRole}
                  onChange={(e) => setAuthRole(e.target.value)}
                  className="w-full bg-[#111] border border-[#222] rounded px-3 py-1.5 focus:outline-none focus:border-[#00f3ff] text-white cursor-pointer"
                >
                  <option value="Cyber Architect">Cyber Architect</option>
                  <option value="DevOps Lead">DevOps Lead</option>
                  <option value="Principal Auditor">Principal Security Auditor</option>
                  <option value="Security Officer (CISO)">Security Officer (CISO)</option>
                </select>
              </div>
            </div>

            <button 
              onClick={() => {
                setUserProfile({
                  email: authEmail || 'developer@workspace.local',
                  role: authRole,
                  token: 'SEC-JWT-SIM-' + Math.floor(Math.random() * 1000000)
                });
                setShowAuthModal(false);
              }}
              className="w-full bg-[#00f3ff] text-black font-bold py-2 rounded text-center cursor-pointer hover:bg-[#00d0e6] transition-all uppercase"
            >
              Sign Cryptographic Credentials
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
