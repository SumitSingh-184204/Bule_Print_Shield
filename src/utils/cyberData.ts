/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, AnalysisResult, Threat, SecurityLayer, ComplianceItem, ArchitectureNode, ArchitectureLink, VulnerabilityPrediction, DevSecOpsGuideline } from '../types';

export const INDUSTRIES = [
  'Banking',
  'Healthcare',
  'Education ERP',
  'E-commerce',
  'SaaS',
  'Government',
  'IoT',
  'Cloud Application'
] as const;

export const TECH_STACKS = [
  'React',
  'Node.js',
  'Express',
  'Python (FastAPI)',
  'PostgreSQL',
  'MongoDB',
  'Redis',
  'AWS Services',
  'Google Cloud',
  'Microsoft Azure',
  'Docker',
  'Kubernetes',
  'Firebase',
  'Android (Kotlin)',
  'iOS (Swift)',
  'Nginx',
  'GraphQL',
  'Apache Kafka'
];

export const AUTH_TYPES = [
  'MFA',
  'OAuth2',
  'JWT',
  'RBAC',
  'SAML',
  'Passwordless',
  'BasicAuth'
];

export const DATA_SENSITIVITIES = [
  'Public',
  'Internal/PII',
  'Restricted/Financial',
  'Critical Health Data',
  'State Secrets'
];

export const DEPLOYMENT_MODELS = [
  'Cloud Public',
  'Cloud Private',
  'Hybrid',
  'On-Premise',
  'Edge/IoT'
];

export const APIS_LIST = [
  'Stripe (Payments)',
  'SendGrid (Email)',
  'Twilio (SMS/MFA)',
  'Google Maps (Location)',
  'Firebase Auth',
  'Auth0',
  'Third-Party Banking APIs',
  'Internal Microservices'
];

export const USER_ROLES = [
  'Admin',
  'Regular User',
  'Guest',
  'Auditor',
  'System Operative',
  'Doctor/Medical',
  'Patient',
  'Student',
  'Teacher/Registrar',
  'Financial Officer'
];

export const SCALE_OPTIONS = [
  '<1k Users (Startup)',
  '1k-10k Users (Growth)',
  '10k-100k Users (Mid-market)',
  '1M+ Enterprise (Global Scale)'
];

// Helper to generate a fully dynamic, custom compliance list based on industry
export function getComplianceFrameworks(industry: string): { name: string; fullName: string; items: { control: string; description: string }[] }[] {
  const common = [
    { control: 'IAM-1', description: 'Enforce strong passphrase restrictions and mandatory multi-factor authentication (MFA) for administrative tools.' },
    { control: 'ENC-2', description: 'Ensure TLS 1.3 is configured for all data-in-transit, disabling legacy TLS versions (1.0/1.1).' }
  ];

  switch (industry) {
    case 'Banking':
      return [
        {
          name: 'PCI-DSS v4.0',
          fullName: 'Payment Card Industry Data Security Standard',
          items: [
            { control: 'PCI-3.2', description: 'Protect stored cardholder data with robust AES-256 transparent database encryption.' },
            { control: 'PCI-6.4', description: 'Deploy active Web Application Firewalls (WAF) to inspect all public traffic for application layer exploits.' },
            { control: 'PCI-8.3', description: 'Secure administrative access to the Cardholder Data Environment (CDE) using multi-factor credentials.' },
            { control: 'PCI-11.3', description: 'Perform quarterly external network vulnerability scans and annual certified penetration testing.' }
          ]
        },
        {
          name: 'ISO 27001',
          fullName: 'Information Security Management System',
          items: [
            { control: 'ISO-A.8', description: 'Keep a comprehensive inventory of assets and document systematic data handling instructions.' },
            { control: 'ISO-A.12', description: 'Establish automated logging procedures across critical network nodes and analyze using central SIEM systems.' }
          ]
        }
      ];

    case 'Healthcare':
      return [
        {
          name: 'HIPAA Security Rule',
          fullName: 'Health Insurance Portability and Accountability Act',
          items: [
            { control: 'HIPAA-164.308', description: 'Implement access logs to monitor administrative activities, user accesses, and modifications to patient records (ePHI).' },
            { control: 'HIPAA-164.312', description: 'Apply rigorous end-to-end data encryption for patient files, both during network transit and local database rest.' },
            { control: 'HIPAA-BAA', description: 'Establish formally executed Business Associate Agreements (BAAs) with all cloud hosting providers.' },
            { control: 'HIPAA-Audit', description: 'Retain detailed audit trails for electronic health record (EHR) modifications for at least 6 years.' }
          ]
        },
        {
          name: 'GDPR Article 32',
          fullName: 'General Data Protection Regulation (EU)',
          items: [
            { control: 'GDPR-Consent', description: 'Structure clear programmatic user consent forms for processing and storing personal health profiles.' },
            { control: 'GDPR-Delete', description: 'Provide self-service buttons for users to trigger complete removal of their personal history (Right to be Forgotten).' }
          ]
        }
      ];

    case 'Education ERP':
      return [
        {
          name: 'FERPA',
          fullName: 'Family Educational Rights and Privacy Act',
          items: [
            { control: 'FER_Access', description: 'Restrict access to student academic grades and enrollment directories strictly to authenticated registrars and students.' },
            { control: 'FER_Consent', description: 'Prevent third-party release of non-directory educational files without prior formal visual parent/student consent.' },
            { control: 'FER_Audit', description: 'Log all academic grade adjustment events, noting the supervisor identity and timestamp.' }
          ]
        },
        {
          name: 'GDPR',
          fullName: 'General Data Protection Regulation',
          items: [
            { control: 'GDPR-PII', description: 'Ensure student contact directories and emails are encrypted using localized system seeds.' }
          ]
        }
      ];

    case 'E-commerce':
      return [
        {
          name: 'PCI-DSS v4.0',
          fullName: 'Payment Card Industry Data Security Standard',
          items: [
            { control: 'PCI-6.4', description: 'Configure active Web Application Firewalls (WAF) to guard checkouts.' },
            { control: 'PCI-3.1', description: 'Do not retain CVV security codes anywhere within local log files, databases, or memory caches.' }
          ]
        },
        {
          name: 'GDPR',
          fullName: 'General Data Protection Regulation (EU)',
          items: [
            { control: 'GDPR-Cookie', description: 'Provide granular cookie preferences to disable commercial tracker actions prior to checkout.' },
            { control: 'GDPR-Breach', description: 'Configure automated notification alerts to contact control authorities within 72 hours of a detected database breach.' }
          ]
        }
      ];

    case 'Government':
      return [
        {
          name: 'NIST SP 800-53',
          fullName: 'NIST Security and Privacy Controls for Federal Systems',
          items: [
            { control: 'NIST-AC-2', description: 'Instate automated account management scripts to terminate credentials after 30 days of standard inactivity.' },
            { control: 'NIST-IA-2', description: 'Require CAC or hardware tokens (FIPS 140-2 validated) for all administrative server access levels.' },
            { control: 'NIST-SC-7', description: 'Deploy highly structured boundary protection, segregating military, operational, and citizen directories.' }
          ]
        }
      ];

    default:
      return [
        {
          name: 'ISO / IEC 27001:2022',
          fullName: 'International Standard for Information Security',
          items: [
            { control: 'ISO-A.5', description: 'Establish documented corporate policies and guidelines governing distributed operations.' },
            { control: 'ISO-A.10', description: 'Use robust cryptography (AES-256 / SHA-256) to protect corporate operational logs.' },
            { control: 'ISO-A.14', description: 'Deploy secure software lifecycle controls (SAST/DAST) across all delivery workflows.' }
          ]
        },
        {
          name: 'NIST Cybersecurity Framework',
          fullName: 'NIST CSF v2.0 Blueprint',
          items: [
            { control: 'NIST-ID.AM', description: 'Identify and catalog all active cloud servers, microservices, and databases systematically.' },
            { control: 'NIST-PR.DS', description: 'Protect critical configurations, storing master database secrets only in secure hardware vaults.' }
          ]
        }
      ];
  }
}

// Highly customized core simulator that outputs highly relevant results deterministically
// strictly reflecting user inputs when Gemini fails or is offline
export function generateMockAnalysis(project: Partial<Project>): AnalysisResult {
  const name = project.name || 'Project-X Architecture';
  const industry = project.industry || 'Cloud Application';
  const techStack = project.techStack || ['React', 'Node.js', 'PostgreSQL'];
  const authType = project.authType || 'JWT';
  const dataSensitivity = project.dataSensitivity || 'Internal/PII';
  const deploymentModel = project.deploymentModel || 'Cloud Public';
  const apisUsed = project.apisUsed || [];
  const userRoles = project.userRoles || ['Admin', 'Regular User'];
  const scale = project.scale || '<1k Users';

  // State mapping
  const riskWeights = {
    auth: { 'BasicAuth': 25, 'JWT': 15, 'OAuth2': 10, 'SAML': 8, 'RBAC': 6, 'MFA': 2, 'Passwordless': 3 },
    sensitivity: { 'Public': 5, 'Internal/PII': 15, 'Restricted/Financial': 30, 'Critical Health Data': 35, 'State Secrets': 45 },
    deployment: { 'Cloud Public': 20, 'Cloud Private': 10, 'Hybrid': 15, 'On-Premise': 12, 'Edge/IoT': 25 },
    scale: { '<1k Users (Startup)': 5, '1k-10k Users (Growth)': 10, '10k-100k Users (Mid-market)': 18, '1M+ Enterprise (Global Scale)': 25 }
  };

  const scoreAuth = riskWeights.auth[authType as keyof typeof riskWeights.auth] || 10;
  const scoreSens = riskWeights.sensitivity[dataSensitivity as keyof typeof riskWeights.sensitivity] || 15;
  const scoreDep = riskWeights.deployment[deploymentModel as keyof typeof riskWeights.deployment] || 15;
  const scoreScale = riskWeights.scale[scale as keyof typeof riskWeights.scale] || 10;

  let baseRisk = Math.min(95, scoreAuth + scoreSens + scoreDep + scoreScale + 12);
  if (techStack.includes('Android (Kotlin)') || techStack.includes('iOS (Swift)')) baseRisk += 5;
  if (apisUsed.length > 3) baseRisk += 8;

  // Build security layers
  const securityLayers: SecurityLayer[] = [
    { id: 'lay-waf', name: 'Web Application Firewall (WAF)', type: 'WAF', enabled: false, description: 'Inspects and blocks HTTP layer attacks like SQL injection and cross-site scripting.' },
    { id: 'lay-fw', name: 'Network Firewall', type: 'Firewall', enabled: false, description: 'Protects the cloud ingress boundaries by closing unused SSH/database ports.' },
    { id: 'lay-iam', name: 'Identity & Access Manager (IAM)', type: 'IAM', enabled: authType !== 'BasicAuth', description: 'Controls user permissions using Role-Based Access Controls (RBAC) and strict validation.' },
    { id: 'lay-siem', name: 'SIEM Threat Logging', type: 'SIEM', enabled: false, description: 'Aggregates audit events from all sources to detect brute-forcing or lateral access anomalies.' },
    { id: 'lay-enc', name: 'AES-256 DB Encryption', type: 'DatabaseEncryption', enabled: dataSensitivity === 'State Secrets' || dataSensitivity === 'Critical Health Data', description: 'Encrypts structured state directories, rendering logs useless to intruders.' },
    { id: 'lay-gw', name: 'Secure API Gateway', type: 'APIGateway', enabled: apisUsed.length > 0, description: 'Enforces rate limits and visual token validations for internal and external consumers.' },
    { id: 'lay-seg', name: 'Network Segmentation', type: 'NetworkSegmentation', enabled: false, description: 'Isolates critical production databases from internal office networks and user interfaces.' },
    { id: 'lay-zt', name: 'Zero Trust Authorization', type: 'ZeroTrust', enabled: false, description: 'Requires continuous cryptographic authentication for all server-to-server operations.' }
  ];

  // Specific threats matched precisely to user's selections
  const threats: Threat[] = [];

  if (industry === 'Banking' || dataSensitivity === 'Restricted/Financial' || techStack.includes('PostgreSQL') || techStack.includes('MongoDB')) {
    threats.push({
      id: 'thr-sqli',
      name: 'SQL/NoSQL Code Injection EXPLOIT',
      category: 'SQL Injection',
      description: 'Attackers inject crafted database characters into inputs to bypass tables and drain private ledger statements.',
      likelihood: techStack.includes('PostgreSQL') ? 'High' : 'Medium',
      impact: 'High',
      severityScore: 8.8,
      mitigation: 'Enforce sanitized parametrized queries and deploy a cloud-based Web Application Firewall (WAF).',
      status: 'Unmitigated',
      mitigationLayerId: 'lay-waf'
    });
  }

  threats.push({
    id: 'thr-ddos',
    name: 'Distributed Denial of Service (DDoS) Volumetric Outage',
    category: 'DDoS',
    description: 'A botnet sends concurrent junk connection states, saturating servers and denying access to system architects.',
    likelihood: scale.includes('1M+') ? 'High' : 'Medium',
    impact: 'High',
    severityScore: 7.5,
    mitigation: 'Deploy rate-limiting policies at the API Gateway and cloud network firewalls.',
    status: 'Unmitigated',
    mitigationLayerId: 'lay-fw'
  });

  if (authType === 'BasicAuth' || authType === 'JWT') {
    threats.push({
      id: 'thr-brute',
      name: 'Automated Account Hijacking & Token Replay',
      category: 'Insider Attack',
      description: 'Attackers script brute-force credential stuffing under unmonitored ports to compromise regular user and supervisor panels.',
      likelihood: 'High',
      impact: 'High',
      severityScore: 8.2,
      mitigation: 'Migrate to hardware token MFA, implement account lockouts and monitor audits using automated SIEM tools.',
      status: 'Unmitigated',
      mitigationLayerId: 'lay-siem'
    });
  }

  if (apisUsed.length > 0) {
    threats.push({
      id: 'thr-api',
      name: 'Broken Session & API Object Manipulation',
      category: 'API Abuse',
      description: 'An attacker manipulates routing parameters to query client database instances that they are not authorized to inspect.',
      likelihood: 'Medium',
      impact: 'High',
      severityScore: 7.8,
      mitigation: 'Introduce strict access token validation inside a structured Secure API Gateway layer.',
      status: 'Unmitigated',
      mitigationLayerId: 'lay-gw'
    });
  }

  if (techStack.includes('React') || techStack.includes('Node.js')) {
    threats.push({
      id: 'thr-xss',
      name: 'Reflected Cross-Site Scripting (XSS)',
      category: 'XSS',
      description: 'Intruders inject executable client scripts into search filters, stealing system login tokens from other users.',
      likelihood: 'High',
      impact: 'Medium',
      severityScore: 6.1,
      mitigation: 'Implement a strict Content Security Policy (CSP) and active edge checking (Web Application Firewall).',
      status: 'Unmitigated',
      mitigationLayerId: 'lay-waf'
    });
  }

  if (deploymentModel === 'Edge/IoT' || legacyIncludes(techStack, 'IoT')) {
    threats.push({
      id: 'thr-mitm',
      name: 'Unencrypted Airway Man-In-The-Middle (MITM)',
      category: 'MITM',
      description: 'Intermediary router ports capture unencrypted firmware metrics or operational alerts sent by edge elements.',
      likelihood: 'High',
      impact: 'High',
      severityScore: 8.5,
      mitigation: 'Enforce mutual TLS 1.3 endpoints combined with strict Network Segmentation controls.',
      status: 'Unmitigated',
      mitigationLayerId: 'lay-seg'
    });
  }

  if (dataSensitivity === 'Critical Health Data' || dataSensitivity === 'State Secrets') {
    threats.push({
      id: 'thr-ransom',
      name: 'Ransomware Hostage Encryption payload',
      category: 'Ransomware',
      description: 'Intruders target remote folders, encrypting critical operational maps and requesting crypto payments.',
      likelihood: 'Medium',
      impact: 'High',
      severityScore: 9.3,
      mitigation: 'Enforce database files encryption (AES-256 DB Encryption) and zero trust isolation barriers.',
      status: 'Unmitigated',
      mitigationLayerId: 'lay-enc'
    });
  }

  // Default always present
  if (threats.length < 3) {
    threats.push({
      id: 'thr-csrf',
      name: 'Cross-Site Request Forgery (CSRF)',
      category: 'CSRF',
      description: 'Malicious scripts trigger authenticated requests on behalf of an active administrator.',
      likelihood: 'Medium',
      impact: 'Medium',
      severityScore: 5.4,
      mitigation: 'Embed anti-CSRF double-submit cookies at the Secure API Gateway.',
      status: 'Unmitigated',
      mitigationLayerId: 'lay-gw'
    });
  }

  // Build compliance checklist
  const complianceItems: ComplianceItem[] = [];
  const frameworks = getComplianceFrameworks(industry);
  frameworks.forEach(f => {
    f.items.forEach((item, index) => {
      complianceItems.push({
        id: `com-${f.name.replace(/[^a-zA-Z0-9]/g, '')}-${index}`,
        framework: f.name,
        control: item.control,
        description: item.description,
        checked: false
      });
    });
  });

  // Calculate dynamic Nodes & Links for physical visualization
  const nodes: ArchitectureNode[] = [
    { id: 'node-user', label: `Users (${userRoles.join(', ')})`, type: 'user', status: 'normal' },
    { id: 'node-internet', label: 'Public Internet Traffic', type: 'internet', status: 'normal' },
    { id: 'node-waf', label: 'Edge Web App Firewall', type: 'waf', status: 'normal' },
    { id: 'node-gateway', label: 'Secure API Gateway', type: 'apigateway', status: 'normal' },
    { id: 'node-fw', label: 'Network Firewall Boundary', type: 'firewall', status: 'normal' },
    { id: 'node-server', label: `${techStack.filter(s => s.toLowerCase().includes('node') || s.toLowerCase().includes('python') || s.toLowerCase().includes('express') || s.toLowerCase().includes('firebase'))[0] || 'App Server'} Running Instance`, type: 'server', status: 'normal' },
    { id: 'node-db', label: `${techStack.filter(s => s.toLowerCase().includes('postgre') || s.toLowerCase().includes('mongo') || s.toLowerCase().includes('redis'))[0] || 'Structured DB'} Store`, type: 'database', status: 'normal' },
    { id: 'node-siem', label: 'Central SIEM Auditor Dashboard', type: 'siem', status: 'normal' }
  ];

  if (apisUsed.length > 0) {
    nodes.push({ id: 'node-thirdparty', label: `APIs (${apisUsed.map(a => a.split(' ')[0]).join(', ')})`, type: 'thirdparty', status: 'normal' });
  }

  // Construct flow path connections
  const links: ArchitectureLink[] = [
    { source: 'node-user', target: 'node-internet', label: 'Sends HTTP Requests' },
    { source: 'node-internet', target: 'node-waf', label: 'Filters Traffic' },
    { source: 'node-waf', target: 'node-gateway', label: 'Validates Routes' },
    { source: 'node-gateway', target: 'node-fw', label: 'Ingress Port Control' },
    { source: 'node-fw', target: 'node-server', label: 'Forwards Clean Traffic' },
    { source: 'node-server', target: 'node-db', label: 'Queries Records', active: true }
  ];

  if (apisUsed.length > 0) {
    links.push({ source: 'node-server', target: 'node-thirdparty', label: 'Integrates Services' });
  }

  // Connect active logs to central SIEM
  links.push({ source: 'node-server', target: 'node-siem', label: 'Streams Audits' });
  links.push({ source: 'node-db', target: 'node-siem', label: 'Logs Security Events' });

  // Generate automated vulnerability predictions
  const vulnerabilities: VulnerabilityPrediction[] = [
    {
      cveId: 'CVE-2026-64019',
      title: 'Missing Boundary Access Token Validation',
      description: `Potential unauthorized routing via manipulated endpoint inputs. High correlation to custom API scopes deployed on ${deploymentModel}.`,
      probability: baseRisk > 60 ? 74 : 42,
      affectedComponent: 'Secure API Gateway / App Server',
      remediation: 'Utilize cryptographically signed JWT strings. Enforce CORS restrictions on external server domains.'
    },
    {
      cveId: 'CVE-2026-11822',
      title: 'Legacy Cryptographic Verification Fallback',
      description: `Default libraries configured on the system lack strong salting seeds, making password hash maps easier to invert.`,
      probability: authType === 'BasicAuth' ? 88 : 31,
      affectedComponent: 'Identity & Access Manager (IAM)',
      remediation: 'Force system migrations to bcrypt or Argon2. Periodically rotate encryption keys stored in key vaults.'
    }
  ];

  // System maturity levels
  let maturityScore = 40;
  if (authType === 'MFA') maturityScore += 15;
  if (dataSensitivity === 'Public') maturityScore += 10;
  if (apisUsed.includes('Auth0') || apisUsed.includes('Firebase Auth')) maturityScore += 15;

  let maturityLevel: 'Initial' | 'Repeatable' | 'Defined' | 'Managed' | 'Optimizing' = 'Repeatable';
  if (maturityScore < 30) maturityLevel = 'Initial';
  else if (maturityScore < 55) maturityLevel = 'Repeatable';
  else if (maturityScore < 75) maturityLevel = 'Defined';
  else if (maturityScore < 90) maturityLevel = 'Managed';
  else maturityLevel = 'Optimizing';

  // DevSecOps pipeline controls mapped to choices
  const devSecOps: DevSecOpsGuideline[] = [
    { phase: 'Code', tool: 'SonarQube / Husky', practice: 'Automated Pre-Commit Linters', details: 'Block local commits containing plaintext variables, tokens, or credential files.' },
    { phase: 'Build', tool: 'Snyk / OWASP Dependency Check', practice: 'Software Composition Analysis (SCA)', details: 'Verify NPM and framework dependencies, alerting if any packages have known high vulnerability scores.' },
    { phase: 'Test', tool: 'OWASP ZAP / Burp Suite', practice: 'Dynamic Application Security Testing (DAST)', details: 'Launch automated runtime web audits in the sandbox staging environments prior to production release.' },
    { phase: 'Release', tool: 'Trivy / Docker Scan', practice: 'Container Image Security Scan', details: 'Identify vulnerabilities in deep underlying operating system binaries inside the deployed Docker wrappers.' },
    { phase: 'Monitor', tool: 'Prometheus / Datadog', practice: 'Real-time Ingress Threat Detection', details: 'Configure visual threshold alerts that flag anomalous spikes in 401 Unauthorized request responses.' }
  ];

  // Executive summary based on inputs
  const executiveSummary = `This review provides systemic recommendations for ${name}, configured for the ${industry} domain. Operating with ${dataSensitivity} requirements on a fallback network, the architecture carries an calculated base system security gap. Integrating ${authType} validation helps authenticate actors, but additional visual micro-segmentation, active WAF filters, and rigid DevSecOps pipeline gatekeeping are highly recommended before promoting files to production containers.`;

  return {
    riskScore: baseRisk,
    threats,
    securityLayers,
    complianceItems,
    nodes,
    links,
    vulnerabilities,
    devSecOps,
    maturityLevel,
    maturityScore,
    executiveSummary
  };
}

function legacyIncludes(arr: string[], val: string): boolean {
  return arr.some(item => item.toLowerCase().includes(val.toLowerCase()));
}
