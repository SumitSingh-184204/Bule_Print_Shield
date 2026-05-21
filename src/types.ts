/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SecurityLayer {
  id: string;
  name: string;
  type: 'WAF' | 'Firewall' | 'IAM' | 'SIEM' | 'DatabaseEncryption' | 'APIGateway' | 'NetworkSegmentation' | 'ZeroTrust';
  enabled: boolean;
  description: string;
}

export interface Threat {
  id: string;
  name: string;
  category: string; // e.g., "SQL Injection", "XSS", "DDoS", "MITM", "Ransomware", "API Abuse", "Insider Attack"
  description: string;
  likelihood: 'Low' | 'Medium' | 'High';
  impact: 'Low' | 'Medium' | 'High';
  severityScore: number; // CVSS scale 1-10
  mitigation: string;
  status: 'Unmitigated' | 'Mitigated';
  mitigationLayerId: string; // references SecurityLayer.id
}

export interface ComplianceItem {
  id: string;
  control: string;
  description: string;
  checked: boolean;
  framework: string; // e.g., "PCI-DSS", "HIPAA", "FERPA", "GDPR", "ISO 27001", "NIST CSF"
}

export interface ComplianceStandard {
  name: string; // PCI-DSS, HIPAA, etc.
  fullName: string;
  description: string;
  checklist: ComplianceItem[];
}

export interface ArchitectureNode {
  id: string;
  label: string;
  type: 'user' | 'internet' | 'waf' | 'apigateway' | 'firewall' | 'server' | 'database' | 'thirdparty' | 'cloud' | 'siem';
  status: 'secure' | 'exploited' | 'blocked' | 'normal';
  x?: number;
  y?: number;
}

export interface ArchitectureLink {
  source: string;
  target: string;
  label?: string;
  active?: boolean;
  status?: 'normal' | 'exploit' | 'block';
}

export interface VulnerabilityPrediction {
  cveId: string;
  title: string;
  description: string;
  probability: number; // 0-100
  affectedComponent: string;
  remediation: string;
}

export interface DevSecOpsGuideline {
  phase: 'Code' | 'Build' | 'Test' | 'Release' | 'Monitor';
  tool: string;
  practice: string;
  details: string;
}

export interface AnalysisResult {
  riskScore: number; // 0-100 risk score
  threats: Threat[];
  securityLayers: SecurityLayer[];
  complianceItems: ComplianceItem[];
  nodes: ArchitectureNode[];
  links: ArchitectureLink[];
  vulnerabilities: VulnerabilityPrediction[];
  devSecOps: DevSecOpsGuideline[];
  maturityLevel: 'Initial' | 'Repeatable' | 'Defined' | 'Managed' | 'Optimizing';
  maturityScore: number; // 0-100
  executiveSummary: string;
}

export interface Project {
  id: string;
  name: string;
  industry: 'Banking' | 'Healthcare' | 'Education ERP' | 'E-commerce' | 'SaaS' | 'Government' | 'IoT' | 'Cloud Application';
  techStack: string[];
  authType: 'MFA' | 'OAuth2' | 'JWT' | 'RBAC' | 'SAML' | 'Passwordless' | 'BasicAuth';
  dataSensitivity: 'Public' | 'Internal/PII' | 'Restricted/Financial' | 'Critical Health Data' | 'State Secrets';
  deploymentModel: 'Cloud Public' | 'Cloud Private' | 'Hybrid' | 'On-Premise' | 'Edge/IoT';
  apisUsed: string[];
  userRoles: string[];
  scale: string;
  createdAt: string;
  analysis?: AnalysisResult;
  feedbackScore?: number; // 1-5 feedback
  feedbackNotes?: string;
}

export interface SimulationLog {
  timestamp: string;
  type: 'exploit' | 'impact' | 'block' | 'detection' | 'mitigation';
  message: string;
  sourceNode?: string;
  targetNode?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}
