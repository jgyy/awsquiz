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
  {
    id: "sec28",
    domain: "security-and-compliance",
    text: "A company runs a public web application on AWS and wants 24/7 access to the AWS DDoS Response Team and cost protection against scaling charges caused by a DDoS attack. Which option meets these requirements?",
    options: [
      { id: "a", text: "AWS Shield Standard, which is enabled automatically at no additional cost" },
      { id: "b", text: "AWS Shield Advanced, a paid subscription with DDoS Response Team access and cost protection" },
      { id: "c", text: "AWS WAF with a rate-based rule" },
      { id: "d", text: "Amazon GuardDuty with DDoS findings enabled" },
    ],
    correctOptionIds: ["b"],
    explanation: "Shield Standard is free and automatic but only protects against common infrastructure-layer attacks. Shield Advanced adds enhanced detection, DDoS Response Team (DRT) access, and cost protection for a monthly fee.",
    optionRationale: {
      a: "Shield Standard is free and automatic, but it does not include DDoS Response Team access or cost protection.",
      b: "Correct — Shield Advanced is the paid tier that adds 24/7 DRT access, advanced mitigation, and DDoS cost protection.",
      c: "AWS WAF rate-based rules help block abusive request rates at layer 7, but WAF provides no DRT access or cost protection.",
      d: "GuardDuty is a threat detection service that analyzes logs; it does not mitigate DDoS attacks or offer cost protection.",
    },
    referenceUrl: "https://docs.aws.amazon.com/waf/latest/developerguide/ddos-overview.html",
    referenceLabel: "AWS Shield Standard and Shield Advanced",
    diagram: `flowchart TD
  A[AWS Shield] --> B[Shield Standard]
  A --> C[Shield Advanced]
  B --> B1[Free, automatic]
  B --> B2[Common L3/L4 attacks]
  C --> C1[Paid subscription]
  C --> C2[DDoS Response Team]
  C --> C3[Cost protection]`,
    cliExample: {
      description: "Add a resource (such as a CloudFront distribution) to AWS Shield Advanced protection",
      command: "aws shield create-protection --name web-app --resource-arn arn:aws:cloudfront::123456789012:distribution/EXAMPLE",
    },
  },
  {
    id: "sec29",
    domain: "security-and-compliance",
    text: "An organization with dozens of AWS accounts wants employees to sign in once with their corporate directory credentials and then choose which account and permission set to access from a single portal. Which service should they use?",
    options: [
      { id: "a", text: "AWS IAM Identity Center (successor to AWS Single Sign-On)" },
      { id: "b", text: "Amazon Cognito user pools" },
      { id: "c", text: "IAM users created in each account" },
      { id: "d", text: "AWS Secrets Manager" },
    ],
    correctOptionIds: ["a"],
    explanation: "IAM Identity Center provides workforce single sign-on to multiple AWS accounts and applications from one access portal, integrating with AWS Organizations and external identity providers.",
    optionRationale: {
      a: "Correct — IAM Identity Center centrally manages workforce SSO access to all accounts in an AWS Organization via permission sets.",
      b: "Cognito is for customer-facing application authentication (sign-up/sign-in for your own apps), not workforce access to AWS accounts.",
      c: "Creating separate IAM users in every account is exactly the credential sprawl that SSO is meant to eliminate.",
      d: "Secrets Manager stores and rotates application secrets; it is not an identity or sign-in service.",
    },
    referenceUrl: "https://docs.aws.amazon.com/singlesignon/latest/userguide/what-is.html",
    referenceLabel: "What is IAM Identity Center",
    diagram: `flowchart LR
  A[Employee] --> B[Corporate Identity Provider]
  B --> C[IAM Identity Center Access Portal]
  C --> D[Account A: Admin permission set]
  C --> E[Account B: ReadOnly permission set]`,
    cliExample: {
      description: "List the IAM Identity Center instances in the organization",
      command: "aws sso-admin list-instances",
    },
  },
  {
    id: "sec30",
    domain: "security-and-compliance",
    text: "A security auditor asks for a list of all IAM users in an account showing when each user last used their password and access keys, and whether MFA is enabled. Which IAM feature provides this in a single downloadable file?",
    options: [
      { id: "a", text: "IAM credential report" },
      { id: "b", text: "AWS CloudTrail event history" },
      { id: "c", text: "IAM Access Analyzer" },
      { id: "d", text: "AWS Config snapshot" },
    ],
    correctOptionIds: ["a"],
    explanation: "The IAM credential report is a CSV that lists every user in the account and the status and age of their passwords, access keys, and MFA devices.",
    optionRationale: {
      a: "Correct — the credential report is generated on demand and lists credential status, rotation age, and MFA state for every IAM user.",
      b: "CloudTrail records API calls; you could search it, but it does not produce a per-user credential status summary.",
      c: "IAM Access Analyzer identifies resources shared with external principals and unused access; it is not a credential inventory.",
      d: "AWS Config records resource configurations, but it is not the tool for a per-user credential lifecycle report.",
    },
    referenceUrl: "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_getting-report.html",
    referenceLabel: "Getting credential reports for your AWS account",
    diagram: `flowchart LR
  A[IAM] --> B[Generate credential report]
  B --> C[CSV file]
  C --> D[Password last used]
  C --> E[Access key age]
  C --> F[MFA active]`,
    cliExample: {
      description: "Generate and then download the IAM credential report",
      command: "aws iam generate-credential-report && aws iam get-credential-report --output text --query Content | base64 -d",
    },
  },
  {
    id: "sec31",
    domain: "security-and-compliance",
    text: "A financial company must meet a regulatory requirement that encryption keys be stored in dedicated, single-tenant, FIPS 140-2 Level 3 validated hardware that the company controls exclusively. Which service best meets this requirement?",
    options: [
      { id: "a", text: "AWS KMS with AWS-managed keys" },
      { id: "b", text: "AWS CloudHSM" },
      { id: "c", text: "AWS Secrets Manager" },
      { id: "d", text: "AWS Certificate Manager" },
    ],
    correctOptionIds: ["b"],
    explanation: "AWS CloudHSM provides dedicated, single-tenant hardware security modules in your VPC where you control the keys and the HSM; AWS KMS is a multi-tenant managed key service.",
    optionRationale: {
      a: "KMS uses shared (multi-tenant) HSMs managed by AWS; it is easier to use but does not give a dedicated single-tenant device.",
      b: "Correct — CloudHSM gives you exclusive, single-tenant HSM hardware validated to FIPS 140-2 Level 3, with full key control.",
      c: "Secrets Manager stores secrets such as passwords; it relies on KMS for encryption and is not an HSM.",
      d: "Certificate Manager provisions TLS certificates; it does not provide dedicated key storage hardware.",
    },
    referenceUrl: "https://docs.aws.amazon.com/cloudhsm/latest/userguide/introduction.html",
    referenceLabel: "What is AWS CloudHSM",
    diagram: `flowchart TD
  A[Key Management Options] --> B[AWS KMS]
  A --> C[AWS CloudHSM]
  B --> B1[Multi-tenant, fully managed]
  B --> B2[Integrated with most AWS services]
  C --> C1[Single-tenant dedicated HSM]
  C --> C2[Customer controls keys and HSM]`,
    cliExample: {
      description: "List CloudHSM clusters in the account",
      command: "aws cloudhsmv2 describe-clusters",
    },
  },
  {
    id: "sec32",
    domain: "security-and-compliance",
    text: "A company wants to enable HTTPS on its Application Load Balancer and would like the public TLS certificate to be provisioned and renewed automatically at no additional cost. Which service should they use?",
    options: [
      { id: "a", text: "AWS Certificate Manager (ACM)" },
      { id: "b", text: "AWS KMS" },
      { id: "c", text: "AWS Secrets Manager" },
      { id: "d", text: "AWS CloudHSM" },
    ],
    correctOptionIds: ["a"],
    explanation: "ACM provisions, deploys, and automatically renews public SSL/TLS certificates for use with integrated services such as ELB, CloudFront, and API Gateway at no charge.",
    optionRationale: {
      a: "Correct — ACM issues free public certificates and renews them automatically for integrated AWS services.",
      b: "KMS manages encryption keys for data at rest; it does not issue TLS certificates.",
      c: "Secrets Manager stores and rotates secrets like database passwords, not TLS certificates for load balancers.",
      d: "CloudHSM is dedicated key-storage hardware; it does not provision or renew public certificates.",
    },
    referenceUrl: "https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html",
    referenceLabel: "What is AWS Certificate Manager",
    diagram: `flowchart LR
  A[Request certificate in ACM] --> B[Domain validation]
  B --> C[Certificate attached to ALB or CloudFront]
  C --> D[Automatic renewal before expiry]`,
    cliExample: {
      description: "Request a public TLS certificate with DNS validation",
      command: "aws acm request-certificate --domain-name www.example.com --validation-method DNS",
    },
  },
  {
    id: "sec33",
    domain: "security-and-compliance",
    text: "A startup is building a mobile app and needs to add user sign-up, sign-in, and social login (Google, Apple) for its customers without building its own authentication system. Which AWS service should they use?",
    options: [
      { id: "a", text: "AWS IAM users" },
      { id: "b", text: "Amazon Cognito" },
      { id: "c", text: "AWS IAM Identity Center" },
      { id: "d", text: "AWS Directory Service" },
    ],
    correctOptionIds: ["b"],
    explanation: "Amazon Cognito provides user pools for app sign-up/sign-in (including social and SAML identity providers) and identity pools for granting temporary AWS credentials to app users.",
    optionRationale: {
      a: "IAM users are for people and workloads that manage AWS resources, not for millions of end customers of a mobile app.",
      b: "Correct — Cognito is the customer identity service for web and mobile apps, with built-in social and federated sign-in.",
      c: "IAM Identity Center manages workforce (employee) access to AWS accounts, not customer-facing app authentication.",
      d: "Directory Service provides managed Microsoft Active Directory for enterprise workloads, not consumer app sign-in.",
    },
    referenceUrl: "https://docs.aws.amazon.com/cognito/latest/developerguide/what-is-amazon-cognito.html",
    referenceLabel: "What is Amazon Cognito",
    diagram: `flowchart LR
  A[Mobile App User] --> B[Cognito User Pool: sign-up / sign-in]
  A --> C[Google or Apple login]
  C --> B
  B --> D[Cognito Identity Pool]
  D --> E[Temporary AWS credentials for app]`,
    cliExample: {
      description: "List Cognito user pools in the current region",
      command: "aws cognito-idp list-user-pools --max-results 20",
    },
  },
  {
    id: "sec34",
    domain: "security-and-compliance",
    text: "A company needs a managed, stateful network firewall deployed inside its VPC that can perform intrusion prevention, domain filtering, and deep packet inspection on traffic flowing between subnets and the internet. Which service provides this?",
    options: [
      { id: "a", text: "AWS Network Firewall" },
      { id: "b", text: "AWS WAF" },
      { id: "c", text: "AWS Firewall Manager" },
      { id: "d", text: "Network ACLs" },
    ],
    correctOptionIds: ["a"],
    explanation: "AWS Network Firewall is a managed VPC-level firewall with stateful inspection, intrusion prevention, and web filtering. Firewall Manager centrally administers firewall rules (WAF, Shield, Network Firewall, security groups) across accounts but is not itself a firewall.",
    optionRationale: {
      a: "Correct — Network Firewall is the managed VPC firewall offering stateful rules, IPS, and domain-based filtering.",
      b: "AWS WAF filters HTTP/HTTPS requests at the application layer for CloudFront, ALB, and API Gateway; it does not inspect all VPC network traffic.",
      c: "Firewall Manager is a central management service for security rules across an Organization; it relies on other services (including Network Firewall) to enforce them.",
      d: "Network ACLs are simple stateless allow/deny rule lists at the subnet level, with no packet inspection or intrusion prevention.",
    },
    referenceUrl: "https://docs.aws.amazon.com/network-firewall/latest/developerguide/what-is-aws-network-firewall.html",
    referenceLabel: "What is AWS Network Firewall",
    diagram: `flowchart LR
  A[Internet Gateway] --> B[Firewall Subnet: AWS Network Firewall]
  B -->|Stateful rules, IPS, domain filtering| C[Protected Subnets]
  D[AWS Firewall Manager] -.->|Centrally deploys policy| B`,
    cliExample: {
      description: "List AWS Network Firewall firewalls in the region",
      command: "aws network-firewall list-firewalls",
    },
  },
  {
    id: "sec35",
    domain: "security-and-compliance",
    text: "Which TWO of the following are security checks provided by AWS Trusted Advisor?",
    options: [
      { id: "a", text: "Security groups with unrestricted access on specific ports (0.0.0.0/0)" },
      { id: "b", text: "MFA not enabled on the root account" },
      { id: "c", text: "Scanning EC2 instances for operating system CVEs" },
      { id: "d", text: "Machine-learning detection of compromised credentials" },
      { id: "e", text: "Classifying PII stored in Amazon S3 objects" },
    ],
    correctOptionIds: ["a", "b"],
    explanation: "Trusted Advisor's security category includes checks such as open security group ports, MFA on the root account, IAM use, exposed access keys, and S3 bucket permissions.",
    optionRationale: {
      a: "Correct — Trusted Advisor flags security groups that allow unrestricted access to ports such as 22 or 3389.",
      b: "Correct — Trusted Advisor checks whether MFA is enabled on the account's root user.",
      c: "Scanning instances for software vulnerabilities (CVEs) is done by Amazon Inspector, not Trusted Advisor.",
      d: "ML-based detection of compromised credentials and anomalous behavior is the role of Amazon GuardDuty.",
      e: "Discovering and classifying PII in S3 is performed by Amazon Macie.",
    },
    referenceUrl: "https://docs.aws.amazon.com/awssupport/latest/user/security-checks.html",
    referenceLabel: "AWS Trusted Advisor security checks",
    diagram: `flowchart TD
  A[AWS Trusted Advisor: Security] --> B[Security groups: unrestricted ports]
  A --> C[MFA on root account]
  A --> D[IAM access key rotation]
  A --> E[S3 bucket permissions]`,
    cliExample: {
      description: "List Trusted Advisor checks in the security category (requires Business or Enterprise Support)",
      command: "aws support describe-trusted-advisor-checks --language en --query \"checks[?category=='security'].name\"",
    },
  },
  {
    id: "sec36",
    domain: "security-and-compliance",
    text: "A company wants administrators to open interactive shell sessions on EC2 instances without opening inbound port 22 in security groups, without managing SSH key pairs, and with every session logged for auditing. Which approach meets these requirements?",
    options: [
      { id: "a", text: "AWS Systems Manager Session Manager" },
      { id: "b", text: "A bastion host with SSH keys shared among administrators" },
      { id: "c", text: "Opening port 22 to 0.0.0.0/0 and rotating SSH keys monthly" },
      { id: "d", text: "AWS Direct Connect" },
    ],
    correctOptionIds: ["a"],
    explanation: "Session Manager provides browser- or CLI-based shell access through the Systems Manager agent, controlled by IAM, with no inbound ports, no SSH keys, and optional session logging to S3 or CloudWatch Logs.",
    optionRationale: {
      a: "Correct — Session Manager uses IAM permissions and the SSM agent, so no open inbound ports or key pairs are needed and sessions can be logged.",
      b: "A bastion host still requires inbound SSH access and shared key management, which is what the company wants to avoid.",
      c: "Opening port 22 to the whole internet greatly increases the attack surface; key rotation does not remove that exposure.",
      d: "Direct Connect is a dedicated network link from on-premises to AWS; it has nothing to do with instance shell access.",
    },
    referenceUrl: "https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager.html",
    referenceLabel: "AWS Systems Manager Session Manager",
    diagram: `flowchart LR
  A[Administrator with IAM permission] --> B[Systems Manager Session Manager]
  B --> C[SSM Agent on EC2 instance]
  C --> D[Interactive shell, no inbound port 22]
  B --> E[Session logs to S3 / CloudWatch Logs]`,
    cliExample: {
      description: "Start a Session Manager shell session on an EC2 instance",
      command: "aws ssm start-session --target i-0123456789abcdef0",
    },
  },
  {
    id: "sec37",
    domain: "security-and-compliance",
    text: "A security team wants to run penetration tests against its own EC2 instances and RDS databases hosted in AWS. According to the AWS customer support policy for penetration testing, what is required?",
    options: [
      { id: "a", text: "No prior approval is needed for these services, but the tests must stay within the permitted services and must not target other customers or AWS infrastructure" },
      { id: "b", text: "Written approval from AWS Support is required before every test" },
      { id: "c", text: "Penetration testing is never allowed in AWS" },
      { id: "d", text: "Tests may include DDoS simulations against any AWS endpoint without restriction" },
    ],
    correctOptionIds: ["a"],
    explanation: "AWS permits customers to run security assessments against a list of approved services (including EC2, RDS, Lambda, CloudFront, API Gateway, and others) without prior authorization, subject to the policy's rules. Certain activities such as DoS/DDoS and DNS zone walking remain prohibited.",
    optionRationale: {
      a: "Correct — the current policy allows pen testing of permitted services without pre-approval, provided the terms of the policy are followed.",
      b: "Pre-approval from AWS Support was required in the past, but this is no longer the case for the permitted services.",
      c: "Penetration testing of your own resources is allowed and encouraged within the policy's boundaries.",
      d: "DDoS simulation is specifically prohibited unless performed through an AWS-approved partner under the DDoS simulation testing policy.",
    },
    referenceUrl: "https://aws.amazon.com/security/penetration-testing/",
    referenceLabel: "AWS penetration testing policy",
    diagram: `flowchart TD
  A[Customer security assessment] --> B{Permitted service?}
  B -->|EC2, RDS, Lambda, API Gateway, etc.| C[No pre-approval required]
  B -->|DoS/DDoS, DNS zone walking| D[Prohibited activity]
  C --> E[Follow policy terms; do not affect other customers]`,
    cliExample: {
      description: "Open an AWS Support case to request approval for a simulated event outside the standard policy",
      command: "aws support create-case --subject \"Simulated event request\" --service-code general-info --category-code using-aws --communication-body \"Request for approval of stress test\"",
    },
  },
  {
    id: "sec38",
    domain: "security-and-compliance",
    text: "A network engineer needs to capture metadata about IP traffic (source, destination, port, accept/reject) going to and from the network interfaces in a VPC in order to troubleshoot why a security group is rejecting connections. Which feature should they enable?",
    options: [
      { id: "a", text: "VPC Flow Logs" },
      { id: "b", text: "AWS CloudTrail" },
      { id: "c", text: "Amazon CloudWatch metrics" },
      { id: "d", text: "AWS Config" },
    ],
    correctOptionIds: ["a"],
    explanation: "VPC Flow Logs capture information about IP traffic accepted or rejected by network interfaces and publish it to CloudWatch Logs or S3, which is ideal for diagnosing security group and NACL rules.",
    optionRationale: {
      a: "Correct — Flow Logs record source/destination addresses, ports, protocol, and ACCEPT/REJECT decisions for VPC traffic.",
      b: "CloudTrail records API calls made to AWS services, not the network packets flowing between instances.",
      c: "CloudWatch metrics show aggregate numbers such as bytes in/out; they do not show per-connection accept/reject details.",
      d: "AWS Config records the configuration of the security group itself, but not the traffic it accepts or rejects.",
    },
    referenceUrl: "https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html",
    referenceLabel: "Logging IP traffic using VPC Flow Logs",
    diagram: `flowchart LR
  A[VPC network interfaces] --> B[VPC Flow Logs]
  B --> C[CloudWatch Logs or Amazon S3]
  C --> D[Analyze ACCEPT / REJECT records]`,
    cliExample: {
      description: "Create a flow log for a VPC that publishes to CloudWatch Logs",
      command: "aws ec2 create-flow-logs --resource-type VPC --resource-ids vpc-0123456789abcdef0 --traffic-type ALL --log-group-name vpc-flow-logs --deliver-logs-permission-arn arn:aws:iam::123456789012:role/FlowLogsRole",
    },
  },
  {
    id: "sec39",
    domain: "security-and-compliance",
    text: "A company migrates its database to Amazon RDS. Under the AWS Shared Responsibility Model, which TWO tasks remain the customer's responsibility?",
    options: [
      { id: "a", text: "Managing database user accounts and permissions inside the database" },
      { id: "b", text: "Choosing to enable encryption at rest and restricting network access with security groups" },
      { id: "c", text: "Patching the database engine and the underlying operating system" },
      { id: "d", text: "Replacing failed storage hardware in the data center" },
      { id: "e", text: "Physically securing the facilities that host the database" },
    ],
    correctOptionIds: ["a", "b"],
    explanation: "With a managed service like RDS, AWS takes over OS and engine patching, hardware, and physical security, while the customer still controls data, in-database access, encryption settings, and network access rules.",
    optionRationale: {
      a: "Correct — database logins, roles, and table permissions are part of the customer's data and access management.",
      b: "Correct — enabling encryption, choosing KMS keys, and configuring security groups are customer configuration choices.",
      c: "For RDS, AWS patches the database engine and the OS of the DB instance (the customer only chooses the maintenance window).",
      d: "Hardware replacement is part of AWS's responsibility for the infrastructure that runs managed services.",
      e: "Physical security of data centers is always AWS's responsibility.",
    },
    referenceUrl: "https://aws.amazon.com/compliance/shared-responsibility-model/",
    referenceLabel: "AWS Shared Responsibility Model",
    diagram: `flowchart TD
  A[Amazon RDS] --> B[AWS responsibility]
  A --> C[Customer responsibility]
  B --> B1[OS and engine patching]
  B --> B2[Hardware and facilities]
  C --> C1[Database users and permissions]
  C --> C2[Encryption and security groups]`,
    cliExample: {
      description: "Create an RDS instance with storage encryption enabled using KMS",
      command: "aws rds create-db-instance --db-instance-identifier mydb --db-instance-class db.t3.micro --engine mysql --master-username admin --master-user-password ExamplePassword123 --allocated-storage 20 --storage-encrypted",
    },
  },
  {
    id: "sec40",
    domain: "security-and-compliance",
    text: "An IAM user belongs to a group whose policy allows s3:* on all buckets. A second policy attached directly to the user contains an explicit Deny for s3:DeleteObject. What happens when the user tries to delete an object?",
    options: [
      { id: "a", text: "The request is denied, because an explicit Deny always overrides any Allow" },
      { id: "b", text: "The request is allowed, because the group policy was attached first" },
      { id: "c", text: "The request is allowed, because s3:* is broader than s3:DeleteObject" },
      { id: "d", text: "IAM prompts the user to choose which policy to apply" },
    ],
    correctOptionIds: ["a"],
    explanation: "IAM policy evaluation starts with an implicit deny, then an explicit Allow in any applicable policy grants access, but an explicit Deny in any policy overrides all Allows.",
    optionRationale: {
      a: "Correct — in IAM evaluation logic, an explicit Deny in any policy takes precedence over every Allow.",
      b: "Policy attachment order has no effect; all applicable policies are evaluated together.",
      c: "A broader Allow does not outrank a Deny; explicit Deny wins regardless of how specific the Allow is.",
      d: "IAM never prompts interactively; policy evaluation is automatic and deterministic.",
    },
    referenceUrl: "https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic.html",
    referenceLabel: "IAM policy evaluation logic",
    diagram: `flowchart TD
  A[Request: s3:DeleteObject] --> B{Explicit Deny in any policy?}
  B -->|Yes| C[Access denied]
  B -->|No| D{Explicit Allow in any policy?}
  D -->|Yes| E[Access allowed]
  D -->|No| F[Implicit deny]`,
    cliExample: {
      description: "Simulate whether an IAM user is allowed to perform s3:DeleteObject",
      command: "aws iam simulate-principal-policy --policy-source-arn arn:aws:iam::123456789012:user/alice --action-names s3:DeleteObject",
    },
  },
];
