import { Question } from "../types.js";

export const securityAndComplianceQuestions: Question[] = [
  {
    id: "sec1",
    domain: "security-and-compliance",
    text: "Under the AWS Shared Responsibility Model, which of the following is AWS responsible for?",
    options: [
      { id: "a", text: "Configuring security groups" },
      { id: "b", text: "Security 'of' the cloud, including the physical infrastructure and host infrastructure" },
      { id: "c", text: "Guest operating system patching" },
      { id: "d", text: "Customer data encryption choices" },
    ],
    correctOptionIds: ["b"],
    explanation: "AWS secures the underlying infrastructure ('security of the cloud'); the customer secures what they put in it ('security in the cloud').",
    optionRationale: {
      a: "Configuring security groups is the customer's job — it's part of security 'in' the cloud, not AWS's responsibility.",
      b: "Correct — AWS secures the physical facilities, hardware, and host infrastructure underneath every service.",
      c: "Patching the guest OS on EC2 instances is the customer's responsibility, not AWS's.",
      d: "How customer data is encrypted is a configuration choice made by the customer, not AWS.",
    },
    referenceUrl: "https://aws.amazon.com/compliance/shared-responsibility-model/",
    referenceLabel: "AWS Shared Responsibility Model",
    diagram: `flowchart TD
  A[Shared Responsibility Model] --> B[AWS: Security OF the Cloud]
  A --> C[Customer: Security IN the Cloud]
  B --> B1[Physical facilities]
  B --> B2[Hardware and host infrastructure]
  B --> B3[Managed service internals]
  C --> C1[Data encryption choices]
  C --> C2[IAM configuration]
  C --> C3[Security group and network rules]`,
  },
  {
    id: "sec2",
    domain: "security-and-compliance",
    text: "Under the AWS Shared Responsibility Model, which of the following is the customer responsible for?",
    options: [
      { id: "a", text: "Physical security of AWS data centers" },
      { id: "b", text: "Maintaining the underlying hardware" },
      { id: "c", text: "Configuring security groups and managing IAM permissions" },
      { id: "d", text: "Decommissioning storage devices" },
    ],
    correctOptionIds: ["c"],
    explanation: "Customers are responsible for their own configuration choices, such as security groups, IAM, and data protection.",
    optionRationale: {
      a: "Physical security of data centers is AWS's job, not the customer's.",
      b: "AWS maintains the underlying hardware as part of security 'of' the cloud.",
      c: "Correct — configuring security groups and IAM permissions is squarely the customer's responsibility.",
      d: "AWS handles decommissioning of the physical storage media it owns.",
    },
    referenceUrl: "https://aws.amazon.com/compliance/shared-responsibility-model/",
    referenceLabel: "AWS Shared Responsibility Model",
    diagram: `flowchart TD
  A[Customer Responsibility: Security IN the Cloud] --> B[Security Group Rules]
  A --> C[IAM User and Permission Configuration]
  A --> D[Data Encryption Choices]`,
    cliExample: {
      description: "List customer-managed IAM policies in the account",
      command: "aws iam list-policies --scope Local",
    },
  },
  {
    id: "sec3",
    domain: "security-and-compliance",
    text: "What is the best practice regarding the AWS account root user?",
    options: [
      { id: "a", text: "Use it for daily administrative tasks" },
      { id: "b", text: "Share its credentials with the whole team" },
      { id: "c", text: "Enable multi-factor authentication (MFA) and avoid using it for everyday tasks" },
      { id: "d", text: "Disable it entirely, since it cannot be secured" },
    ],
    correctOptionIds: ["c"],
    explanation: "AWS recommends locking down the root user with MFA and using IAM identities for day-to-day work.",
    optionRationale: {
      a: "Using the root user daily increases risk — AWS recommends reserving it for account-level tasks only.",
      b: "Sharing root credentials violates least privilege and removes any accountability for actions taken.",
      c: "Correct — enabling MFA and limiting root user use to rare account-management tasks is the recommended practice.",
      d: "The root user can't be disabled, but it can and should be secured with MFA and limited use.",
    },
    referenceUrl: "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html",
    referenceLabel: "AWS account root user best practices",
    diagram: `flowchart TD
  A[AWS Root User] --> B[Enable MFA]
  A --> C[Avoid daily administrative use]
  B --> D[Reserved for rare account-level tasks]
  C --> D`,
    cliExample: {
      description: "Check whether MFA is enabled on the account (root user)",
      command: "aws iam get-account-summary",
    },
  },
  {
    id: "sec4",
    domain: "security-and-compliance",
    text: "Which AWS Identity and Access Management (IAM) feature allows you to grant temporary permissions to an AWS service or federated user without sharing long-term credentials?",
    options: [
      { id: "a", text: "IAM group" },
      { id: "b", text: "IAM role" },
      { id: "c", text: "IAM policy" },
      { id: "d", text: "IAM user" },
    ],
    correctOptionIds: ["b"],
    explanation: "IAM roles provide temporary credentials that can be assumed by trusted services, applications, or federated users.",
    optionRationale: {
      a: "An IAM group only organizes users for shared permissions; it can't be 'assumed' for temporary access.",
      b: "Correct — IAM roles are assumed to receive short-lived credentials, avoiding long-term secrets.",
      c: "An IAM policy defines permissions but doesn't itself grant a way to assume temporary access.",
      d: "An IAM user has long-term credentials, the opposite of what's being described here.",
    },
    referenceUrl: "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html",
    referenceLabel: "IAM roles",
    diagram: `flowchart TD
  A[Trusted Service or Federated User] --> B[Assumes IAM Role]
  B --> C[Temporary Credentials Issued]
  C --> D[Access Granted, No Long-term Keys]`,
    cliExample: {
      description: "List IAM roles available to assume in the account",
      command: "aws iam list-roles",
    },
  },
  {
    id: "sec5",
    domain: "security-and-compliance",
    text: "What is the recommended way to grant permissions to multiple IAM users who perform the same job function?",
    options: [
      { id: "a", text: "Assign policies to each user individually" },
      { id: "b", text: "Create an IAM group, attach a policy to the group, and add users to the group" },
      { id: "c", text: "Share one IAM user's credentials among the team" },
      { id: "d", text: "Grant root access to each user" },
    ],
    correctOptionIds: ["b"],
    explanation: "IAM groups let you manage permissions for many users at once instead of repeating policy assignments per user.",
    optionRationale: {
      a: "Assigning policies one-by-one to each user doesn't scale and is harder to maintain.",
      b: "Correct — an IAM group lets you attach one policy and add every user who needs those permissions.",
      c: "Sharing one IAM user's credentials removes individual accountability and is against best practice.",
      d: "Granting root access to every user is a major security risk, not a scalable permission strategy.",
    },
    referenceUrl: "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_groups.html",
    referenceLabel: "IAM user groups",
    diagram: `flowchart TD
  A[IAM Group] --> B[Policy Attached Once]
  A --> C[User 1]
  A --> D[User 2]
  A --> E[User 3]`,
    cliExample: {
      description: "List IAM groups in the account",
      command: "aws iam list-groups",
    },
  },
  {
    id: "sec6",
    domain: "security-and-compliance",
    text: "Which AWS service provides a centralized view of security alerts and compliance status across multiple AWS accounts?",
    options: [
      { id: "a", text: "AWS Security Hub" },
      { id: "b", text: "AWS Config" },
      { id: "c", text: "AWS CloudTrail" },
      { id: "d", text: "Amazon Inspector" },
    ],
    correctOptionIds: ["a"],
    explanation: "AWS Security Hub aggregates and prioritizes security findings from multiple AWS services and accounts in one place.",
    optionRationale: {
      a: "Correct — Security Hub aggregates findings from GuardDuty, Inspector, Macie, and more into a single dashboard.",
      b: "AWS Config tracks resource configuration compliance, but it doesn't aggregate security findings from other services.",
      c: "CloudTrail logs API activity; it doesn't provide a consolidated security findings dashboard.",
      d: "Amazon Inspector scans for vulnerabilities but is only one of the sources Security Hub aggregates, not the aggregator itself.",
    },
    referenceUrl: "https://docs.aws.amazon.com/securityhub/latest/userguide/what-is-securityhub.html",
    referenceLabel: "What is AWS Security Hub",
    diagram: `flowchart TD
  A[Amazon GuardDuty] --> D[AWS Security Hub]
  B[Amazon Inspector] --> D
  C[Amazon Macie] --> D
  E[AWS Config] --> D
  D --> F[Consolidated findings dashboard]`,
    cliExample: {
      description: "Retrieve current Security Hub findings",
      command: "aws securityhub get-findings --max-results 10",
    },
  },
  {
    id: "sec7",
    domain: "security-and-compliance",
    text: "Which AWS service uses machine learning to continuously monitor for malicious or unauthorized behavior, such as unusual API calls, within your AWS accounts?",
    options: [
      { id: "a", text: "Amazon Macie" },
      { id: "b", text: "Amazon GuardDuty" },
      { id: "c", text: "AWS Config" },
      { id: "d", text: "AWS Trusted Advisor" },
    ],
    correctOptionIds: ["b"],
    explanation: "Amazon GuardDuty is a threat detection service that continuously monitors for malicious activity and anomalous behavior.",
    optionRationale: {
      a: "Macie focuses on discovering sensitive data in S3, not detecting anomalous account behavior.",
      b: "Correct — GuardDuty uses machine learning to continuously analyze logs for threats like unusual API activity.",
      c: "AWS Config evaluates resource configuration compliance, not behavioral threat detection.",
      d: "Trusted Advisor gives best-practice checks, not continuous ML-based threat monitoring.",
    },
    referenceUrl: "https://docs.aws.amazon.com/guardduty/latest/ug/what-is-guardduty.html",
    referenceLabel: "What is Amazon GuardDuty",
    diagram: `flowchart TD
  A[VPC Flow Logs] --> D[Amazon GuardDuty]
  B[CloudTrail Logs] --> D
  C[DNS Logs] --> D
  D --> E[Machine Learning Threat Findings]`,
    cliExample: {
      description: "List GuardDuty detectors in the account",
      command: "aws guardduty list-detectors",
    },
  },
  {
    id: "sec8",
    domain: "security-and-compliance",
    text: "Which AWS service is designed specifically to discover and protect sensitive data, such as personally identifiable information (PII), stored in Amazon S3?",
    options: [
      { id: "a", text: "Amazon GuardDuty" },
      { id: "b", text: "Amazon Macie" },
      { id: "c", text: "AWS Shield" },
      { id: "d", text: "Amazon Inspector" },
    ],
    correctOptionIds: ["b"],
    explanation: "Amazon Macie uses machine learning to discover, classify, and help protect sensitive data stored in Amazon S3.",
    optionRationale: {
      a: "GuardDuty monitors for threats and anomalous behavior, not sensitive-data discovery.",
      b: "Correct — Macie uses machine learning to find and classify sensitive data such as PII in S3.",
      c: "AWS Shield protects against DDoS attacks, unrelated to data classification.",
      d: "Amazon Inspector scans for vulnerabilities in workloads, not sensitive data in S3.",
    },
    referenceUrl: "https://docs.aws.amazon.com/macie/latest/user/what-is-macie.html",
    referenceLabel: "What is Amazon Macie",
    diagram: `flowchart TD
  A[Amazon S3 Buckets] --> B[Amazon Macie]
  B --> C[Machine Learning Data Discovery]
  C --> D[PII Classification Findings]`,
    cliExample: {
      description: "List Amazon Macie sensitive data discovery jobs",
      command: "aws macie2 list-classification-jobs",
    },
  },
  {
    id: "sec9",
    domain: "security-and-compliance",
    text: "Which service automatically assesses applications for vulnerabilities and deviations from best practices on EC2 instances and container images?",
    options: [
      { id: "a", text: "Amazon Inspector" },
      { id: "b", text: "AWS Config" },
      { id: "c", text: "AWS Artifact" },
      { id: "d", text: "AWS Trusted Advisor" },
    ],
    correctOptionIds: ["a"],
    explanation: "Amazon Inspector automatically scans workloads for software vulnerabilities and unintended network exposure.",
    optionRationale: {
      a: "Correct — Amazon Inspector automatically scans EC2 instances and container images for vulnerabilities and exposure.",
      b: "AWS Config assesses configuration compliance, not software vulnerabilities.",
      c: "AWS Artifact provides compliance documents; it doesn't scan workloads.",
      d: "Trusted Advisor gives general best-practice checks, not deep vulnerability scanning.",
    },
    referenceUrl: "https://docs.aws.amazon.com/inspector/v2/userguide/what-is-inspector.html",
    referenceLabel: "What is Amazon Inspector",
    diagram: `flowchart TD
  A[EC2 Instances] --> C[Amazon Inspector]
  B[Container Images] --> C
  C --> D[Vulnerability and Exposure Findings]`,
    cliExample: {
      description: "List vulnerability findings from Amazon Inspector",
      command: "aws inspector2 list-findings --max-results 10",
    },
  },
  {
    id: "sec10",
    domain: "security-and-compliance",
    text: "Where can a customer download AWS compliance reports and agreements, such as SOC reports and PCI DSS attestations?",
    options: [
      { id: "a", text: "AWS Trusted Advisor" },
      { id: "b", text: "AWS Artifact" },
      { id: "c", text: "AWS Config" },
      { id: "d", text: "AWS CloudTrail" },
    ],
    correctOptionIds: ["b"],
    explanation: "AWS Artifact is the self-service portal for on-demand access to AWS compliance reports and agreements.",
    optionRationale: {
      a: "Trusted Advisor gives account optimization checks, not compliance documents.",
      b: "Correct — AWS Artifact is the self-service portal for downloading compliance reports and agreements.",
      c: "AWS Config tracks configuration state, not compliance reports.",
      d: "CloudTrail logs API activity; it doesn't host compliance documentation.",
    },
    referenceUrl: "https://aws.amazon.com/artifact/",
    referenceLabel: "AWS Artifact",
    diagram: `flowchart TD
  A[AWS Artifact] --> B[SOC Reports]
  A --> C[PCI DSS Attestations]
  A --> D[ISO Certifications and Agreements]`,
  },
  {
    id: "sec11",
    domain: "security-and-compliance",
    text: "Which AWS service provides managed Distributed Denial of Service (DDoS) protection?",
    options: [
      { id: "a", text: "AWS WAF" },
      { id: "b", text: "AWS Shield" },
      { id: "c", text: "AWS Firewall Manager" },
      { id: "d", text: "Amazon GuardDuty" },
    ],
    correctOptionIds: ["b"],
    explanation: "AWS Shield protects applications running on AWS against Distributed Denial of Service (DDoS) attacks.",
    optionRationale: {
      a: "AWS WAF filters malicious web requests; it doesn't itself provide DDoS protection.",
      b: "Correct — AWS Shield is AWS's managed DDoS protection service.",
      c: "Firewall Manager centrally manages firewall rules across accounts; it isn't a DDoS protection service itself.",
      d: "GuardDuty detects threats via log analysis, not managed DDoS mitigation.",
    },
    referenceUrl: "https://aws.amazon.com/shield/",
    referenceLabel: "AWS Shield",
    diagram: `flowchart TD
  A[Incoming Traffic] --> B[AWS Shield]
  B --> C[DDoS Attack Mitigated]
  B --> D[Application Stays Available]`,
    cliExample: {
      description: "Check AWS Shield Advanced subscription status",
      command: "aws shield describe-subscription",
    },
  },
  {
    id: "sec12",
    domain: "security-and-compliance",
    text: "Which service allows you to create rules that filter malicious web traffic, such as SQL injection or cross-site scripting attempts, to your web applications?",
    options: [
      { id: "a", text: "AWS Shield" },
      { id: "b", text: "AWS WAF (Web Application Firewall)" },
      { id: "c", text: "Amazon Inspector" },
      { id: "d", text: "AWS Config" },
    ],
    correctOptionIds: ["b"],
    explanation: "AWS WAF lets you define rules that filter and monitor HTTP/HTTPS requests forwarded to protected web applications.",
    optionRationale: {
      a: "AWS Shield defends against DDoS attacks, not web application-layer filtering like SQL injection.",
      b: "Correct — AWS WAF lets you write rules to block common web exploits such as SQL injection and XSS.",
      c: "Amazon Inspector scans for vulnerabilities; it doesn't filter live web traffic.",
      d: "AWS Config tracks configuration compliance, not web traffic filtering.",
    },
    referenceUrl: "https://docs.aws.amazon.com/waf/latest/developerguide/what-is-aws-waf.html",
    referenceLabel: "What is AWS WAF",
    diagram: `flowchart TD
  A[Web Request] --> B[AWS WAF Rules]
  B -->|Matches SQLi or XSS pattern| C[Request Blocked]
  B -->|No match| D[Request Forwarded to App]`,
    cliExample: {
      description: "List AWS WAF web ACLs protecting regional resources",
      command: "aws wafv2 list-web-acls --scope REGIONAL",
    },
  },
  {
    id: "sec13",
    domain: "security-and-compliance",
    text: "What is the purpose of AWS Key Management Service (KMS)?",
    options: [
      { id: "a", text: "To create and manage cryptographic keys used to encrypt data" },
      { id: "b", text: "To monitor network traffic for threats" },
      { id: "c", text: "To manage IAM user passwords" },
      { id: "d", text: "To store compliance documentation" },
    ],
    correctOptionIds: ["a"],
    explanation: "AWS KMS lets you create, manage, and control the cryptographic keys used to encrypt your data.",
    optionRationale: {
      a: "Correct — AWS KMS creates and manages the cryptographic keys used to encrypt your data.",
      b: "Monitoring network traffic for threats is the job of services like GuardDuty, not KMS.",
      c: "IAM, not KMS, manages user passwords and credentials.",
      d: "AWS Artifact stores compliance documentation, not encryption keys.",
    },
    referenceUrl: "https://docs.aws.amazon.com/kms/latest/developerguide/overview.html",
    referenceLabel: "AWS KMS overview",
    diagram: `flowchart TD
  A[AWS KMS] --> B[Create and Manage Keys]
  A --> C[Define Key Policies]
  A --> D[Encrypt and Decrypt Data]`,
    cliExample: {
      description: "List customer master keys managed in KMS",
      command: "aws kms list-keys",
    },
  },
  {
    id: "sec14",
    domain: "security-and-compliance",
    text: "Which service helps you store, rotate, and retrieve database credentials, API keys, and other secrets programmatically instead of hard-coding them?",
    options: [
      { id: "a", text: "AWS Secrets Manager" },
      { id: "b", text: "AWS KMS" },
      { id: "c", text: "AWS IAM" },
      { id: "d", text: "AWS Certificate Manager" },
    ],
    correctOptionIds: ["a"],
    explanation: "AWS Secrets Manager securely stores, retrieves, and automatically rotates secrets such as database credentials.",
    optionRationale: {
      a: "Correct — Secrets Manager stores, rotates, and retrieves secrets like database credentials programmatically.",
      b: "KMS manages encryption keys, but doesn't store or rotate secrets like credentials itself.",
      c: "IAM manages access permissions, not secret storage and rotation.",
      d: "Certificate Manager issues and manages TLS certificates, not general-purpose secrets.",
    },
    referenceUrl: "https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html",
    referenceLabel: "What is AWS Secrets Manager",
    diagram: `flowchart TD
  A[Application] --> B[AWS Secrets Manager]
  B --> C[Retrieve Secret at Runtime]
  B --> D[Automatic Rotation]`,
    cliExample: {
      description: "List secrets stored in Secrets Manager",
      command: "aws secretsmanager list-secrets",
    },
  },
  {
    id: "sec15",
    domain: "security-and-compliance",
    text: "What does the principle of least privilege mean in AWS IAM?",
    options: [
      { id: "a", text: "Granting users full administrator access by default" },
      { id: "b", text: "Granting only the permissions required to perform a specific task, and nothing more" },
      { id: "c", text: "Granting root access to all new users" },
      { id: "d", text: "Disabling all permissions until manually enabled" },
    ],
    correctOptionIds: ["b"],
    explanation: "Least privilege means granting only the minimum permissions needed to accomplish a task, reducing security risk.",
    optionRationale: {
      a: "Granting full admin access by default is the opposite of least privilege.",
      b: "Correct — least privilege means granting only the permissions needed for a task, nothing more.",
      c: "Granting root access to all new users is a severe security anti-pattern.",
      d: "Least privilege is about scoping permissions precisely, not leaving everything disabled by default.",
    },
    referenceUrl: "https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html",
    referenceLabel: "IAM security best practices",
    diagram: `flowchart TD
  A[Least Privilege] --> B[Grant Only Permissions the Task Needs]
  B --> C[Task Completed Securely]
  A -.-> D[Excess Permissions Avoided]`,
    cliExample: {
      description: "List IAM Access Analyzer instances used to find overly permissive access",
      command: "aws accessanalyzer list-analyzers",
    },
  },
  {
    id: "sec16",
    domain: "security-and-compliance",
    text: "Which TWO of the following are examples of factors used in AWS Multi-Factor Authentication (MFA)?",
    options: [
      { id: "a", text: "Something you know (a password)" },
      { id: "b", text: "Something you have (a hardware or virtual MFA device)" },
      { id: "c", text: "Something you inherited from a parent AWS account" },
      { id: "d", text: "Something you purchased separately from AWS" },
      { id: "e", text: "Something your manager approved" },
    ],
    correctOptionIds: ["a", "b"],
    explanation: "MFA combines a password (something you know) with a physical or virtual device (something you have).",
    optionRationale: {
      a: "Correct — a password is the 'something you know' factor.",
      b: "Correct — a hardware or virtual MFA device is the 'something you have' factor.",
      c: "AWS MFA doesn't use inherited account attributes as a factor.",
      d: "MFA factors are about identity verification methods, not purchases.",
      e: "Manager approval is a workflow control, not an MFA authentication factor.",
    },
    referenceUrl: "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa.html",
    referenceLabel: "Using MFA in AWS",
    diagram: `flowchart TD
  A[AWS MFA] --> B[Something you know: password]
  A --> C[Something you have: MFA device]
  B --> D[Sign-in granted]
  C --> D`,
    cliExample: {
      description: "List MFA devices assigned to an IAM user",
      command: "aws iam list-mfa-devices --user-name my-user",
    },
  },
  {
    id: "sec17",
    domain: "security-and-compliance",
    text: "Which AWS service records account activity and API calls for auditing purposes, including who made a request, what actions were taken, and when?",
    options: [
      { id: "a", text: "AWS CloudTrail" },
      { id: "b", text: "Amazon CloudWatch" },
      { id: "c", text: "AWS Config" },
      { id: "d", text: "AWS X-Ray" },
    ],
    correctOptionIds: ["a"],
    explanation: "AWS CloudTrail logs API calls and account activity for governance, compliance, and auditing.",
    optionRationale: {
      a: "Correct — CloudTrail logs who made a request, what action was taken, and when, for every API call.",
      b: "CloudWatch monitors metrics and logs application and infrastructure performance, not API call auditing specifically.",
      c: "AWS Config tracks resource configuration state over time, not a full API call audit log.",
      d: "X-Ray traces application requests for debugging performance, not account-wide API auditing.",
    },
    referenceUrl: "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html",
    referenceLabel: "AWS CloudTrail User Guide",
    diagram: `flowchart TD
  A[API Call] --> B[AWS CloudTrail]
  B --> C[Event Log: Who, What, When]
  C --> D[Audit Trail for Compliance]`,
    cliExample: {
      description: "Look up recent CloudTrail account activity events",
      command: "aws cloudtrail lookup-events --max-results 10",
    },
  },
  {
    id: "sec18",
    domain: "security-and-compliance",
    text: "Which AWS service continuously monitors and records your AWS resource configurations, allowing you to assess compliance against desired configurations?",
    options: [
      { id: "a", text: "AWS Config" },
      { id: "b", text: "AWS CloudTrail" },
      { id: "c", text: "Amazon Inspector" },
      { id: "d", text: "AWS Trusted Advisor" },
    ],
    correctOptionIds: ["a"],
    explanation: "AWS Config tracks resource configuration changes over time and evaluates them against compliance rules.",
    optionRationale: {
      a: "Correct — AWS Config continuously records resource configurations and evaluates them against compliance rules.",
      b: "CloudTrail logs API calls; it doesn't assess configuration state against rules.",
      c: "Amazon Inspector scans for vulnerabilities, not configuration compliance.",
      d: "Trusted Advisor gives general best-practice checks, not continuous configuration recording.",
    },
    referenceUrl: "https://docs.aws.amazon.com/config/latest/developerguide/WhatIsConfig.html",
    referenceLabel: "What is AWS Config",
    diagram: `flowchart TD
  A[Resource Configuration Changes] --> B[AWS Config]
  B --> C[Compliance Rule Evaluation]
  C --> D[Compliant / Non-compliant Status]`,
    cliExample: {
      description: "List AWS Config rules and their compliance state",
      command: "aws configservice describe-config-rules",
    },
  },
  {
    id: "sec19",
    domain: "security-and-compliance",
    text: "What is the difference between a security group and a network ACL (NACL) in Amazon VPC?",
    options: [
      { id: "a", text: "Security groups operate at the subnet level only, while NACLs operate at the instance level" },
      { id: "b", text: "Security groups are stateful and act at the instance level, while NACLs are stateless and act at the subnet level" },
      { id: "c", text: "NACLs are stateful and security groups are stateless" },
      { id: "d", text: "There is no difference; they are interchangeable" },
    ],
    correctOptionIds: ["b"],
    explanation: "Security groups are stateful firewalls attached to instances; NACLs are stateless firewalls applied at the subnet boundary.",
    optionRationale: {
      a: "This reverses the relationship — security groups act at the instance level, NACLs at the subnet level.",
      b: "Correct — security groups are stateful and attach to instances; NACLs are stateless and apply at the subnet boundary.",
      c: "This also reverses it — NACLs are stateless, security groups are stateful.",
      d: "They behave differently in statefulness and the layer they operate at, so they are not interchangeable.",
    },
    referenceUrl: "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-comparison.html",
    referenceLabel: "Security groups vs. network ACLs",
    diagram: `flowchart TD
  A[VPC Subnet] --> B[Network ACL: stateless, subnet level]
  B --> C[EC2 Instance]
  C --> D[Security Group: stateful, instance level]`,
    cliExample: {
      description: "Describe security groups in the default VPC",
      command: "aws ec2 describe-security-groups",
    },
  },
  {
    id: "sec20",
    domain: "security-and-compliance",
    text: "Which AWS Organizations feature allows an administrator to restrict which AWS services and actions can be used across multiple accounts?",
    options: [
      { id: "a", text: "IAM policies" },
      { id: "b", text: "Service Control Policies (SCPs)" },
      { id: "c", text: "Resource-based policies" },
      { id: "d", text: "AWS Config rules" },
    ],
    correctOptionIds: ["b"],
    explanation: "Service Control Policies set the maximum available permissions for accounts within an AWS Organization.",
    optionRationale: {
      a: "IAM policies grant permissions within a single account; they don't restrict what's available across multiple accounts.",
      b: "Correct — Service Control Policies set permission guardrails across accounts in an AWS Organization.",
      c: "Resource-based policies apply to a single resource, not account-wide service restrictions.",
      d: "AWS Config rules check configuration compliance; they don't restrict which services can be used.",
    },
    referenceUrl: "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html",
    referenceLabel: "Service control policies",
    diagram: `flowchart TD
  A[AWS Organization] --> B[Organizational Unit]
  B --> C[Member Account 1]
  B --> D[Member Account 2]
  A --> E[Service Control Policy]
  E --> B`,
    cliExample: {
      description: "List service control policies in the organization",
      command: "aws organizations list-policies --filter SERVICE_CONTROL_POLICY",
    },
  },
  {
    id: "sec21",
    domain: "security-and-compliance",
    text: "A company wants to allow its application running on an EC2 instance to access an S3 bucket without embedding AWS access keys in the application code. What should they use?",
    options: [
      { id: "a", text: "An IAM user with access keys stored in the code" },
      { id: "b", text: "An IAM role attached to the EC2 instance" },
      { id: "c", text: "The AWS account root user credentials" },
      { id: "d", text: "A shared secret key emailed to developers" },
    ],
    correctOptionIds: ["b"],
    explanation: "Attaching an IAM role to an EC2 instance provides temporary credentials automatically, avoiding hard-coded keys.",
    optionRationale: {
      a: "Storing access keys in code is exactly the hard-coded credential risk this scenario is trying to avoid.",
      b: "Correct — an IAM role attached to the instance supplies temporary credentials automatically, with no keys in code.",
      c: "Using root credentials for an application is a major security risk and unnecessary here.",
      d: "Emailing a shared secret key is insecure and doesn't rotate or scope credentials properly.",
    },
    referenceUrl: "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2.html",
    referenceLabel: "IAM roles for Amazon EC2",
    diagram: `flowchart TD
  A[EC2 Instance] --> B[IAM Role attached]
  B --> C[Temporary credentials issued]
  C --> D[Amazon S3 bucket access]`,
    cliExample: {
      description: "List the IAM instance profile (role) attached to your EC2 instances",
      command: "aws ec2 describe-iam-instance-profile-associations",
    },
  },
  {
    id: "sec22",
    domain: "security-and-compliance",
    text: "What does encryption 'in transit' protect against?",
    options: [
      { id: "a", text: "Unauthorized access to data while it moves across a network" },
      { id: "b", text: "Unauthorized access to data stored on disk" },
      { id: "c", text: "Loss of data due to hardware failure" },
      { id: "d", text: "Accidental deletion of data" },
    ],
    correctOptionIds: ["a"],
    explanation: "Encryption in transit protects data as it travels across a network from being intercepted or read.",
    optionRationale: {
      a: "Correct — encryption in transit protects data as it moves across a network from being intercepted or read.",
      b: "Protecting data stored on disk is encryption at rest, not in transit.",
      c: "Encryption doesn't protect against hardware failure; that's a durability and backup concern.",
      d: "Encryption doesn't prevent accidental deletion; that's addressed by versioning, backups, or permissions.",
    },
    referenceUrl: "https://aws.amazon.com/compliance/data-protection/",
    referenceLabel: "AWS data protection",
    diagram: `flowchart LR
  A[Client] -->|TLS-encrypted request| B[AWS Service]
  A -.->|Unencrypted: interceptable| C[Attacker on the network]`,
    cliExample: {
      description: "List ACM certificates used to enable TLS for data in transit",
      command: "aws acm list-certificates",
    },
  },
  {
    id: "sec23",
    domain: "security-and-compliance",
    text: "Which of the following is a benefit of using AWS Identity and Access Management (IAM) identity federation?",
    options: [
      { id: "a", text: "It allows users to sign in using existing corporate or social identities instead of creating new AWS-specific credentials" },
      { id: "b", text: "It removes the need for any access control" },
      { id: "c", text: "It grants root access to federated users automatically" },
      { id: "d", text: "It disables MFA requirements" },
    ],
    correctOptionIds: ["a"],
    explanation: "Identity federation lets users authenticate with an existing identity provider and receive temporary AWS access.",
    optionRationale: {
      a: "Correct — federation lets users sign in with an existing identity provider and receive temporary AWS access.",
      b: "Federation still requires access control; it doesn't remove the need for permissions.",
      c: "Federated users get scoped temporary permissions, not automatic root access.",
      d: "Federation doesn't disable MFA requirements; MFA can still be enforced by the identity provider or AWS.",
    },
    referenceUrl: "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers.html",
    referenceLabel: "Identity providers and federation",
    diagram: `flowchart TD
  A[Corporate or Social Identity Provider] --> B[SAML / Web Identity Federation]
  B --> C[Temporary AWS Credentials via STS]
  C --> D[Federated Access to AWS]`,
    cliExample: {
      description: "List SAML identity providers configured for federation",
      command: "aws iam list-saml-providers",
    },
  },
  {
    id: "sec24",
    domain: "security-and-compliance",
    text: "Which TWO of the following are AWS services primarily used to help meet compliance and governance requirements?",
    options: [
      { id: "a", text: "AWS Artifact" },
      { id: "b", text: "AWS Config" },
      { id: "c", text: "Amazon Route 53" },
      { id: "d", text: "Amazon EC2 Auto Scaling" },
      { id: "e", text: "Amazon Lightsail" },
    ],
    correctOptionIds: ["a", "b"],
    explanation: "AWS Artifact provides compliance documentation, and AWS Config tracks configuration compliance over time.",
    optionRationale: {
      a: "Correct — AWS Artifact provides on-demand access to AWS's compliance reports and agreements.",
      b: "Correct — AWS Config evaluates resource configurations against compliance rules over time.",
      c: "Route 53 is a DNS service, unrelated to compliance or governance reporting.",
      d: "EC2 Auto Scaling manages capacity, not compliance or governance.",
      e: "Lightsail is a simplified virtual server offering, not a compliance or governance tool.",
    },
    referenceUrl: "https://aws.amazon.com/compliance/",
    referenceLabel: "AWS Compliance",
    diagram: `flowchart TD
  A[Compliance and Governance] --> B[AWS Artifact: Reports and Agreements]
  A --> C[AWS Config: Configuration Compliance]`,
    cliExample: {
      description: "Check resource compliance status against an AWS Config rule",
      command: "aws configservice describe-compliance-by-config-rule",
    },
  },
  {
    id: "sec25",
    domain: "security-and-compliance",
    text: "What type of IAM policy is attached directly to an AWS resource (such as an S3 bucket) rather than to an IAM identity?",
    options: [
      { id: "a", text: "Identity-based policy" },
      { id: "b", text: "Resource-based policy" },
      { id: "c", text: "Permissions boundary" },
      { id: "d", text: "Service control policy" },
    ],
    correctOptionIds: ["b"],
    explanation: "Resource-based policies are attached directly to a resource, such as an S3 bucket policy, rather than to a user or role.",
    optionRationale: {
      a: "Identity-based policies attach to users, groups, or roles, not directly to a resource.",
      b: "Correct — resource-based policies, like an S3 bucket policy, attach directly to the resource itself.",
      c: "A permissions boundary limits the maximum permissions an identity can have; it isn't attached to a resource.",
      d: "A service control policy applies across accounts in an Organization, not to a single resource.",
    },
    referenceUrl: "https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_identity-vs-resource.html",
    referenceLabel: "Identity-based vs. resource-based policies",
    diagram: `flowchart TD
  A[IAM User or Role] -->|Identity-based Policy| C[Permissions Evaluation]
  B[S3 Bucket] -->|Resource-based Policy| C`,
    cliExample: {
      description: "Retrieve the bucket policy attached to an S3 bucket",
      command: "aws s3api get-bucket-policy --bucket my-bucket",
    },
  },
  {
    id: "sec26",
    domain: "security-and-compliance",
    text: "A company must ensure that data stored in Amazon S3 is automatically encrypted at rest. Which feature helps accomplish this?",
    options: [
      { id: "a", text: "Server-side encryption" },
      { id: "b", text: "Security groups" },
      { id: "c", text: "VPC peering" },
      { id: "d", text: "AWS Direct Connect" },
    ],
    correctOptionIds: ["a"],
    explanation: "Server-side encryption automatically encrypts objects before they are written to disk in Amazon S3.",
    optionRationale: {
      a: "Correct — server-side encryption automatically encrypts objects before they're written to disk in S3.",
      b: "Security groups control network traffic; they don't encrypt data at rest.",
      c: "VPC peering connects networks; it has no role in encrypting stored data.",
      d: "Direct Connect provides a dedicated network link; it doesn't encrypt data at rest.",
    },
    referenceUrl: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/serv-side-encryption.html",
    referenceLabel: "Protecting data with server-side encryption",
    diagram: `flowchart TD
  A[Object Upload] --> B[S3 Server-Side Encryption]
  B --> C[Encrypted Before Written to Disk]`,
    cliExample: {
      description: "Check the default encryption configuration on an S3 bucket",
      command: "aws s3api get-bucket-encryption --bucket my-bucket",
    },
  },
  {
    id: "sec27",
    domain: "security-and-compliance",
    text: "Which TWO practices help protect the AWS account root user?",
    options: [
      { id: "a", text: "Enabling multi-factor authentication (MFA) on the root user" },
      { id: "b", text: "Using the root user for daily development tasks" },
      { id: "c", text: "Deleting the root user's access keys if they are not needed" },
      { id: "d", text: "Sharing the root user password across the team for convenience" },
      { id: "e", text: "Disabling CloudTrail logging for the root user" },
    ],
    correctOptionIds: ["a", "c"],
    explanation: "Enabling MFA and removing unused root access keys are core best practices for protecting the root user.",
    optionRationale: {
      a: "Correct — MFA adds a second authentication factor to the root user, the account's most powerful identity.",
      b: "Using the root user for daily work increases exposure; it should be reserved for rare account-level tasks.",
      c: "Correct — removing unused root access keys eliminates a credential that could otherwise be leaked or misused.",
      d: "Sharing the root password removes accountability and is a direct security risk.",
      e: "Disabling CloudTrail logging removes visibility into root user activity, the opposite of good practice.",
    },
    referenceUrl: "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html",
    referenceLabel: "AWS account root user best practices",
    diagram: `flowchart TD
  A[Protect the Root User] --> B[Enable MFA]
  A --> C[Delete Unused Access Keys]
  A --> D[Avoid Daily Use]`,
    cliExample: {
      description: "List MFA devices registered to the account",
      command: "aws iam list-virtual-mfa-devices",
    },
  },
];
