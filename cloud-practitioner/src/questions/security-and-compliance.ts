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
      sampleOutput: "{\n  \"Policies\": [\n    {\n      \"PolicyName\": \"DevS3ReadOnly\",\n      \"PolicyId\": \"ANPAIEXAMPLE1234567890\",\n      \"Arn\": \"arn:aws:iam::123456789012:policy/DevS3ReadOnly\",\n      \"Path\": \"/\",\n      \"DefaultVersionId\": \"v2\",\n      \"AttachmentCount\": 3,\n      \"PermissionsBoundaryUsageCount\": 0,\n      \"IsAttachable\": true,\n      \"CreateDate\": \"2026-01-14T09:12:33+00:00\",\n      \"UpdateDate\": \"2026-03-02T15:40:10+00:00\"\n    }\n  ]\n}",
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
    consoleUrl: "https://console.aws.amazon.com/iam/home#/security_credentials",
    consoleLabel: "IAM > Security credentials",
    diagram: `flowchart TD
  A[AWS Root User] --> B[Enable MFA]
  A --> C[Avoid daily administrative use]
  B --> D[Reserved for rare account-level tasks]
  C --> D`,
    cliExample: {
      description: "Check whether MFA is enabled on the account (root user)",
      command: "aws iam get-account-summary",
      sampleOutput: "{\n  \"SummaryMap\": {\n    \"Users\": 12,\n    \"UsersQuota\": 5000,\n    \"Groups\": 4,\n    \"GroupsQuota\": 300,\n    \"Roles\": 27,\n    \"RolesQuota\": 1000,\n    \"Policies\": 9,\n    \"PoliciesQuota\": 1500,\n    \"MFADevices\": 11,\n    \"MFADevicesInUse\": 11,\n    \"AccountMFAEnabled\": 1,\n    \"AccountAccessKeysPresent\": 0,\n    \"AccountSigningCertificatesPresent\": 0\n  }\n}",
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
    consoleUrl: "https://console.aws.amazon.com/iam/home#/roles",
    consoleLabel: "IAM > Roles",
    diagram: `flowchart TD
  A[Trusted Service or Federated User] --> B[Assumes IAM Role]
  B --> C[Temporary Credentials Issued]
  C --> D[Access Granted, No Long-term Keys]`,
    cliExample: {
      description: "List IAM roles available to assume in the account",
      command: "aws iam list-roles",
      sampleOutput: "{\n  \"Roles\": [\n    {\n      \"Path\": \"/\",\n      \"RoleName\": \"EC2-S3-ReadOnly\",\n      \"RoleId\": \"AROAEXAMPLE1234567890\",\n      \"Arn\": \"arn:aws:iam::123456789012:role/EC2-S3-ReadOnly\",\n      \"CreateDate\": \"2026-02-10T08:30:00+00:00\",\n      \"AssumeRolePolicyDocument\": {\n        \"Version\": \"2012-10-17\",\n        \"Statement\": [\n          {\n            \"Effect\": \"Allow\",\n            \"Principal\": {\n              \"Service\": \"ec2.amazonaws.com\"\n            },\n            \"Action\": \"sts:AssumeRole\"\n          }\n        ]\n      },\n      \"MaxSessionDuration\": 3600\n    }\n  ]\n}",
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
    consoleUrl: "https://console.aws.amazon.com/iam/home#/groups",
    consoleLabel: "IAM > User groups",
    diagram: `flowchart TD
  A[IAM Group] --> B[Policy Attached Once]
  A --> C[User 1]
  A --> D[User 2]
  A --> E[User 3]`,
    cliExample: {
      description: "List IAM groups in the account",
      command: "aws iam list-groups",
      sampleOutput: "{\n  \"Groups\": [\n    {\n      \"Path\": \"/\",\n      \"GroupName\": \"Developers\",\n      \"GroupId\": \"AGPAEXAMPLE1234567890\",\n      \"Arn\": \"arn:aws:iam::123456789012:group/Developers\",\n      \"CreateDate\": \"2026-01-05T10:00:00+00:00\"\n    },\n    {\n      \"Path\": \"/\",\n      \"GroupName\": \"Admins\",\n      \"GroupId\": \"AGPAEXAMPLE0987654321\",\n      \"Arn\": \"arn:aws:iam::123456789012:group/Admins\",\n      \"CreateDate\": \"2026-01-05T10:02:14+00:00\"\n    }\n  ]\n}",
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
    consoleUrl: "https://console.aws.amazon.com/securityhub/home",
    consoleLabel: "Security Hub",
    diagram: `flowchart TD
  A[Amazon GuardDuty] --> D[AWS Security Hub]
  B[Amazon Inspector] --> D
  C[Amazon Macie] --> D
  E[AWS Config] --> D
  D --> F[Consolidated findings dashboard]`,
    cliExample: {
      description: "Retrieve current Security Hub findings",
      command: "aws securityhub get-findings --max-results 10",
      sampleOutput: "{\n  \"Findings\": [\n    {\n      \"SchemaVersion\": \"2018-10-08\",\n      \"Id\": \"arn:aws:securityhub:us-east-1:123456789012:security-control/IAM.6/finding/1234abcd-12ab-34cd-56ef-1234567890ab\",\n      \"ProductArn\": \"arn:aws:securityhub:us-east-1::product/aws/securityhub\",\n      \"GeneratorId\": \"security-control/IAM.6\",\n      \"AwsAccountId\": \"123456789012\",\n      \"CreatedAt\": \"2026-04-02T06:15:22.000Z\",\n      \"Severity\": {\n        \"Label\": \"CRITICAL\",\n        \"Normalized\": 90\n      },\n      \"Title\": \"Hardware MFA should be enabled for the root user\",\n      \"Compliance\": {\n        \"Status\": \"FAILED\"\n      },\n      \"Workflow\": {\n        \"Status\": \"NEW\"\n      },\n      \"RecordState\": \"ACTIVE\"\n    }\n  ]\n}",
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
    consoleUrl: "https://console.aws.amazon.com/guardduty/home",
    consoleLabel: "GuardDuty",
    diagram: `flowchart TD
  A[VPC Flow Logs] --> D[Amazon GuardDuty]
  B[CloudTrail Logs] --> D
  C[DNS Logs] --> D
  D --> E[Machine Learning Threat Findings]`,
    cliExample: {
      description: "List GuardDuty detectors in the account",
      command: "aws guardduty list-detectors",
      sampleOutput: "{\n  \"DetectorIds\": [\n    \"12abc34d567e8fa901bc2d34e56789f0\"\n  ]\n}",
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
    consoleUrl: "https://console.aws.amazon.com/macie/home",
    consoleLabel: "Amazon Macie",
    diagram: `flowchart TD
  A[Amazon S3 Buckets] --> B[Amazon Macie]
  B --> C[Machine Learning Data Discovery]
  C --> D[PII Classification Findings]`,
    cliExample: {
      description: "List Amazon Macie sensitive data discovery jobs",
      command: "aws macie2 list-classification-jobs",
      sampleOutput: "{\n  \"items\": [\n    {\n      \"jobId\": \"a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6\",\n      \"name\": \"pii-scan-customer-uploads\",\n      \"jobType\": \"ONE_TIME\",\n      \"jobStatus\": \"COMPLETE\",\n      \"createdAt\": \"2026-03-18T02:00:00+00:00\",\n      \"bucketDefinitions\": [\n        {\n          \"accountId\": \"123456789012\",\n          \"buckets\": [\n            \"customer-uploads-prod\"\n          ]\n        }\n      ]\n    }\n  ]\n}",
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
    referenceUrl: "https://docs.aws.amazon.com/inspector/latest/user/what-is-inspector.html",
    referenceLabel: "What is Amazon Inspector",
    consoleUrl: "https://console.aws.amazon.com/inspector/v2/home",
    consoleLabel: "Amazon Inspector",
    diagram: `flowchart TD
  A[EC2 Instances] --> C[Amazon Inspector]
  B[Container Images] --> C
  C --> D[Vulnerability and Exposure Findings]`,
    cliExample: {
      description: "List vulnerability findings from Amazon Inspector",
      command: "aws inspector2 list-findings --max-results 10",
      sampleOutput: "{\n  \"findings\": [\n    {\n      \"findingArn\": \"arn:aws:inspector2:us-east-1:123456789012:finding/1234abcd12ab34cd56ef1234567890ab\",\n      \"awsAccountId\": \"123456789012\",\n      \"type\": \"PACKAGE_VULNERABILITY\",\n      \"severity\": \"HIGH\",\n      \"status\": \"ACTIVE\",\n      \"title\": \"CVE-2026-1234 - openssl\",\n      \"inspectorScore\": 8.1,\n      \"firstObservedAt\": \"2026-05-11T13:04:51+00:00\",\n      \"resources\": [\n        {\n          \"type\": \"AWS_EC2_INSTANCE\",\n          \"id\": \"i-0123456789abcdef0\",\n          \"region\": \"us-east-1\"\n        }\n      ]\n    }\n  ]\n}",
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
    consoleUrl: "https://console.aws.amazon.com/artifact/home",
    consoleLabel: "AWS Artifact",
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
    consoleUrl: "https://console.aws.amazon.com/wafv2/shieldv2#/",
    consoleLabel: "AWS Shield",
    diagram: `flowchart TD
  A[Incoming Traffic] --> B[AWS Shield]
  B --> C[DDoS Attack Mitigated]
  B --> D[Application Stays Available]`,
    cliExample: {
      description: "Check AWS Shield Advanced subscription status",
      command: "aws shield describe-subscription",
      sampleOutput: "{\n  \"Subscription\": {\n    \"StartTime\": \"2026-01-01T00:00:00+00:00\",\n    \"EndTime\": \"2027-01-01T00:00:00+00:00\",\n    \"TimeCommitmentInSeconds\": 31536000,\n    \"AutoRenew\": \"ENABLED\",\n    \"Limits\": [\n      {\n        \"Type\": \"CF_DISTRIBUTION\",\n        \"Max\": 1000\n      }\n    ],\n    \"ProactiveEngagementStatus\": \"ENABLED\",\n    \"SubscriptionArn\": \"arn:aws:shield::123456789012:subscription/1234abcd-12ab-34cd-56ef-1234567890ab\"\n  }\n}",
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
    consoleUrl: "https://console.aws.amazon.com/wafv2/homev2",
    consoleLabel: "AWS WAF > Web ACLs",
    diagram: `flowchart TD
  A[Web Request] --> B[AWS WAF Rules]
  B -->|Matches SQLi or XSS pattern| C[Request Blocked]
  B -->|No match| D[Request Forwarded to App]`,
    cliExample: {
      description: "List AWS WAF web ACLs protecting regional resources",
      command: "aws wafv2 list-web-acls --scope REGIONAL",
      sampleOutput: "{\n  \"NextMarker\": \"web-app-acl\",\n  \"WebACLs\": [\n    {\n      \"Name\": \"web-app-acl\",\n      \"Id\": \"1234abcd-12ab-34cd-56ef-1234567890ab\",\n      \"Description\": \"Blocks SQLi and XSS\",\n      \"LockToken\": \"a1b2c3d4-0000-1111-2222-333344445555\",\n      \"ARN\": \"arn:aws:wafv2:us-east-1:123456789012:regional/webacl/web-app-acl/1234abcd-12ab-34cd-56ef-1234567890ab\"\n    }\n  ]\n}",
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
    consoleUrl: "https://console.aws.amazon.com/kms/home#/kms/keys",
    consoleLabel: "KMS > Customer managed keys",
    diagram: `flowchart TD
  A[AWS KMS] --> B[Create and Manage Keys]
  A --> C[Define Key Policies]
  A --> D[Encrypt and Decrypt Data]`,
    cliExample: {
      description: "List customer master keys managed in KMS",
      command: "aws kms list-keys",
      sampleOutput: "{\n  \"Keys\": [\n    {\n      \"KeyId\": \"1234abcd-12ab-34cd-56ef-1234567890ab\",\n      \"KeyArn\": \"arn:aws:kms:us-east-1:123456789012:key/1234abcd-12ab-34cd-56ef-1234567890ab\"\n    },\n    {\n      \"KeyId\": \"0987fedc-98fe-76dc-54ba-0987654321fe\",\n      \"KeyArn\": \"arn:aws:kms:us-east-1:123456789012:key/0987fedc-98fe-76dc-54ba-0987654321fe\"\n    }\n  ]\n}",
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
    consoleUrl: "https://console.aws.amazon.com/secretsmanager/listsecrets",
    consoleLabel: "Secrets Manager > Secrets",
    diagram: `flowchart TD
  A[Application] --> B[AWS Secrets Manager]
  B --> C[Retrieve Secret at Runtime]
  B --> D[Automatic Rotation]`,
    cliExample: {
      description: "List secrets stored in Secrets Manager",
      command: "aws secretsmanager list-secrets",
      sampleOutput: "{\n  \"SecretList\": [\n    {\n      \"ARN\": \"arn:aws:secretsmanager:us-east-1:123456789012:secret:prod/db/credentials-AbCdEf\",\n      \"Name\": \"prod/db/credentials\",\n      \"Description\": \"RDS MySQL admin credentials\",\n      \"RotationEnabled\": true,\n      \"RotationLambdaARN\": \"arn:aws:lambda:us-east-1:123456789012:function:SecretsManagerRotation\",\n      \"RotationRules\": {\n        \"AutomaticallyAfterDays\": 30\n      },\n      \"LastRotatedDate\": \"2026-08-20T03:00:00+00:00\",\n      \"LastChangedDate\": \"2026-08-20T03:00:01+00:00\",\n      \"CreatedDate\": \"2026-01-12T11:45:00+00:00\"\n    }\n  ]\n}",
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
      sampleOutput: "{\n  \"analyzers\": [\n    {\n      \"arn\": \"arn:aws:access-analyzer:us-east-1:123456789012:analyzer/account-analyzer\",\n      \"name\": \"account-analyzer\",\n      \"type\": \"ACCOUNT\",\n      \"createdAt\": \"2026-02-01T09:00:00+00:00\",\n      \"lastResourceAnalyzed\": \"arn:aws:s3:::my-bucket\",\n      \"lastResourceAnalyzedAt\": \"2026-09-16T22:10:05+00:00\",\n      \"status\": \"ACTIVE\"\n    }\n  ]\n}",
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
    consoleUrl: "https://console.aws.amazon.com/iam/home#/security_credentials",
    consoleLabel: "IAM > Security credentials > MFA",
    diagram: `flowchart TD
  A[AWS MFA] --> B[Something you know: password]
  A --> C[Something you have: MFA device]
  B --> D[Sign-in granted]
  C --> D`,
    cliExample: {
      description: "List MFA devices assigned to an IAM user",
      command: "aws iam list-mfa-devices --user-name my-user",
      sampleOutput: "{\n  \"MFADevices\": [\n    {\n      \"UserName\": \"my-user\",\n      \"SerialNumber\": \"arn:aws:iam::123456789012:mfa/my-user\",\n      \"EnableDate\": \"2026-03-05T14:22:10+00:00\"\n    }\n  ]\n}",
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
    consoleUrl: "https://console.aws.amazon.com/cloudtrail/home#/trails",
    consoleLabel: "CloudTrail > Trails",
    diagram: `flowchart TD
  A[API Call] --> B[AWS CloudTrail]
  B --> C[Event Log: Who, What, When]
  C --> D[Audit Trail for Compliance]`,
    cliExample: {
      description: "Look up recent CloudTrail account activity events",
      command: "aws cloudtrail lookup-events --max-results 10",
      sampleOutput: "{\n  \"Events\": [\n    {\n      \"EventId\": \"1234abcd-12ab-34cd-56ef-1234567890ab\",\n      \"EventName\": \"ConsoleLogin\",\n      \"ReadOnly\": \"false\",\n      \"EventTime\": \"2026-09-16T08:41:12+00:00\",\n      \"EventSource\": \"signin.amazonaws.com\",\n      \"Username\": \"alice\",\n      \"Resources\": [],\n      \"CloudTrailEvent\": \"{\\\"eventVersion\\\":\\\"1.08\\\",\\\"userIdentity\\\":{\\\"type\\\":\\\"IAMUser\\\",\\\"userName\\\":\\\"alice\\\"},\\\"sourceIPAddress\\\":\\\"203.0.113.25\\\"}\"\n    }\n  ]\n}",
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
    consoleUrl: "https://console.aws.amazon.com/config/home",
    consoleLabel: "AWS Config",
    diagram: `flowchart TD
  A[Resource Configuration Changes] --> B[AWS Config]
  B --> C[Compliance Rule Evaluation]
  C --> D[Compliant / Non-compliant Status]`,
    cliExample: {
      description: "List AWS Config rules and their compliance state",
      command: "aws configservice describe-config-rules",
      sampleOutput: "{\n  \"ConfigRules\": [\n    {\n      \"ConfigRuleName\": \"s3-bucket-server-side-encryption-enabled\",\n      \"ConfigRuleArn\": \"arn:aws:config:us-east-1:123456789012:config-rule/config-rule-abcd12\",\n      \"ConfigRuleId\": \"config-rule-abcd12\",\n      \"Source\": {\n        \"Owner\": \"AWS\",\n        \"SourceIdentifier\": \"S3_BUCKET_SERVER_SIDE_ENCRYPTION_ENABLED\"\n      },\n      \"ConfigRuleState\": \"ACTIVE\"\n    }\n  ]\n}",
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
    referenceUrl: "https://docs.aws.amazon.com/vpc/latest/userguide/infrastructure-security.html",
    referenceLabel: "Security groups vs. network ACLs",
    consoleUrl: "https://console.aws.amazon.com/vpcconsole/home#SecurityGroups:",
    consoleLabel: "VPC > Security groups",
    diagram: `flowchart TD
  A[VPC Subnet] --> B[Network ACL: stateless, subnet level]
  B --> C[EC2 Instance]
  C --> D[Security Group: stateful, instance level]`,
    cliExample: {
      description: "Describe security groups in the default VPC",
      command: "aws ec2 describe-security-groups",
      sampleOutput: "{\n  \"SecurityGroups\": [\n    {\n      \"GroupId\": \"sg-0abc123def456789a\",\n      \"GroupName\": \"web-sg\",\n      \"Description\": \"Allow HTTPS from anywhere\",\n      \"VpcId\": \"vpc-0123456789abcdef0\",\n      \"OwnerId\": \"123456789012\",\n      \"IpPermissions\": [\n        {\n          \"IpProtocol\": \"tcp\",\n          \"FromPort\": 443,\n          \"ToPort\": 443,\n          \"IpRanges\": [\n            {\n              \"CidrIp\": \"0.0.0.0/0\"\n            }\n          ]\n        }\n      ],\n      \"IpPermissionsEgress\": [\n        {\n          \"IpProtocol\": \"-1\",\n          \"IpRanges\": [\n            {\n              \"CidrIp\": \"0.0.0.0/0\"\n            }\n          ]\n        }\n      ]\n    }\n  ]\n}",
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
    consoleUrl: "https://console.aws.amazon.com/organizations/v2/home/policies/service-control-policy",
    consoleLabel: "Organizations > Service control policies",
    diagram: `flowchart TD
  A[AWS Organization] --> B[Organizational Unit]
  B --> C[Member Account 1]
  B --> D[Member Account 2]
  A --> E[Service Control Policy]
  E --> B`,
    cliExample: {
      description: "List service control policies in the organization",
      command: "aws organizations list-policies --filter SERVICE_CONTROL_POLICY",
      sampleOutput: "{\n  \"Policies\": [\n    {\n      \"Id\": \"p-FullAWSAccess\",\n      \"Arn\": \"arn:aws:organizations::aws:policy/service_control_policy/p-FullAWSAccess\",\n      \"Name\": \"FullAWSAccess\",\n      \"Description\": \"Allows access to every operation\",\n      \"Type\": \"SERVICE_CONTROL_POLICY\",\n      \"AwsManaged\": true\n    },\n    {\n      \"Id\": \"p-abcd1234\",\n      \"Arn\": \"arn:aws:organizations::123456789012:policy/o-exampleorgid/service_control_policy/p-abcd1234\",\n      \"Name\": \"DenyLeaveOrganization\",\n      \"Description\": \"Prevents member accounts from leaving\",\n      \"Type\": \"SERVICE_CONTROL_POLICY\",\n      \"AwsManaged\": false\n    }\n  ]\n}",
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
    consoleUrl: "https://console.aws.amazon.com/iam/home#/roles",
    consoleLabel: "IAM > Roles",
    diagram: `flowchart TD
  A[EC2 Instance] --> B[IAM Role attached]
  B --> C[Temporary credentials issued]
  C --> D[Amazon S3 bucket access]`,
    cliExample: {
      description: "List the IAM instance profile (role) attached to your EC2 instances",
      command: "aws ec2 describe-iam-instance-profile-associations",
      sampleOutput: "{\n  \"IamInstanceProfileAssociations\": [\n    {\n      \"AssociationId\": \"iip-assoc-0abc123def456789a\",\n      \"InstanceId\": \"i-0123456789abcdef0\",\n      \"IamInstanceProfile\": {\n        \"Arn\": \"arn:aws:iam::123456789012:instance-profile/EC2-S3-ReadOnly\",\n        \"Id\": \"AIPAEXAMPLE1234567890\"\n      },\n      \"State\": \"associated\"\n    }\n  ]\n}",
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
      sampleOutput: "{\n  \"CertificateSummaryList\": [\n    {\n      \"CertificateArn\": \"arn:aws:acm:us-east-1:123456789012:certificate/1234abcd-12ab-34cd-56ef-1234567890ab\",\n      \"DomainName\": \"www.example.com\",\n      \"SubjectAlternativeNameSummaries\": [\n        \"www.example.com\",\n        \"example.com\"\n      ],\n      \"Status\": \"ISSUED\",\n      \"Type\": \"AMAZON_ISSUED\",\n      \"KeyAlgorithm\": \"RSA-2048\",\n      \"InUse\": true,\n      \"RenewalEligibility\": \"ELIGIBLE\",\n      \"NotAfter\": \"2027-04-15T23:59:59+00:00\"\n    }\n  ]\n}",
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
    consoleUrl: "https://console.aws.amazon.com/iam/home#/identity_providers",
    consoleLabel: "IAM > Identity providers",
    diagram: `flowchart TD
  A[Corporate or Social Identity Provider] --> B[SAML / Web Identity Federation]
  B --> C[Temporary AWS Credentials via STS]
  C --> D[Federated Access to AWS]`,
    cliExample: {
      description: "List SAML identity providers configured for federation",
      command: "aws iam list-saml-providers",
      sampleOutput: "{\n  \"SAMLProviderList\": [\n    {\n      \"Arn\": \"arn:aws:iam::123456789012:saml-provider/CorpADFS\",\n      \"ValidUntil\": \"2031-06-30T00:00:00+00:00\",\n      \"CreateDate\": \"2026-02-20T16:05:44+00:00\"\n    }\n  ]\n}",
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
    consoleUrl: "https://console.aws.amazon.com/artifact/home",
    consoleLabel: "AWS Artifact",
    diagram: `flowchart TD
  A[Compliance and Governance] --> B[AWS Artifact: Reports and Agreements]
  A --> C[AWS Config: Configuration Compliance]`,
    cliExample: {
      description: "Check resource compliance status against an AWS Config rule",
      command: "aws configservice describe-compliance-by-config-rule",
      sampleOutput: "{\n  \"ComplianceByConfigRules\": [\n    {\n      \"ConfigRuleName\": \"s3-bucket-server-side-encryption-enabled\",\n      \"Compliance\": {\n        \"ComplianceType\": \"NON_COMPLIANT\",\n        \"ComplianceContributorCount\": {\n          \"CappedCount\": 2,\n          \"CapExceeded\": false\n        }\n      }\n    },\n    {\n      \"ConfigRuleName\": \"root-account-mfa-enabled\",\n      \"Compliance\": {\n        \"ComplianceType\": \"COMPLIANT\"\n      }\n    }\n  ]\n}",
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
    referenceUrl: "https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_identity-vs-resource.html",
    referenceLabel: "Identity-based vs. resource-based policies",
    consoleUrl: "https://console.aws.amazon.com/s3/buckets",
    consoleLabel: "S3 > Buckets > Permissions",
    diagram: `flowchart TD
  A[IAM User or Role] -->|Identity-based Policy| C[Permissions Evaluation]
  B[S3 Bucket] -->|Resource-based Policy| C`,
    cliExample: {
      description: "Retrieve the bucket policy attached to an S3 bucket",
      command: "aws s3api get-bucket-policy --bucket my-bucket",
      sampleOutput: "{\n  \"Policy\": \"{\\\"Version\\\":\\\"2012-10-17\\\",\\\"Statement\\\":[{\\\"Sid\\\":\\\"AllowReadFromAnalytics\\\",\\\"Effect\\\":\\\"Allow\\\",\\\"Principal\\\":{\\\"AWS\\\":\\\"arn:aws:iam::123456789012:role/AnalyticsRole\\\"},\\\"Action\\\":\\\"s3:GetObject\\\",\\\"Resource\\\":\\\"arn:aws:s3:::my-bucket/*\\\"}]}\"\n}",
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
    consoleUrl: "https://console.aws.amazon.com/s3/buckets",
    consoleLabel: "S3 > Buckets > Properties > Default encryption",
    diagram: `flowchart TD
  A[Object Upload] --> B[S3 Server-Side Encryption]
  B --> C[Encrypted Before Written to Disk]`,
    cliExample: {
      description: "Check the default encryption configuration on an S3 bucket",
      command: "aws s3api get-bucket-encryption --bucket my-bucket",
      sampleOutput: "{\n  \"ServerSideEncryptionConfiguration\": {\n    \"Rules\": [\n      {\n        \"ApplyServerSideEncryptionByDefault\": {\n          \"SSEAlgorithm\": \"aws:kms\",\n          \"KMSMasterKeyID\": \"arn:aws:kms:us-east-1:123456789012:key/1234abcd-12ab-34cd-56ef-1234567890ab\"\n        },\n        \"BucketKeyEnabled\": true\n      }\n    ]\n  }\n}",
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
    consoleUrl: "https://console.aws.amazon.com/iam/home#/security_credentials",
    consoleLabel: "IAM > Security credentials",
    diagram: `flowchart TD
  A[Protect the Root User] --> B[Enable MFA]
  A --> C[Delete Unused Access Keys]
  A --> D[Avoid Daily Use]`,
    cliExample: {
      description: "List MFA devices registered to the account",
      command: "aws iam list-virtual-mfa-devices",
      sampleOutput: "{\n  \"VirtualMFADevices\": [\n    {\n      \"SerialNumber\": \"arn:aws:iam::123456789012:mfa/root-account-mfa-device\",\n      \"User\": {\n        \"Path\": \"/\",\n        \"UserName\": \"root\",\n        \"UserId\": \"123456789012\",\n        \"Arn\": \"arn:aws:iam::123456789012:root\",\n        \"CreateDate\": \"2025-11-03T09:00:00+00:00\"\n      },\n      \"EnableDate\": \"2026-01-08T12:30:45+00:00\"\n    }\n  ]\n}",
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
    consoleUrl: "https://console.aws.amazon.com/wafv2/shieldv2#/",
    consoleLabel: "AWS Shield",
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
      sampleOutput: "{\n  \"ProtectionId\": \"1234abcd-12ab-34cd-56ef-1234567890ab\"\n}",
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
    consoleUrl: "https://console.aws.amazon.com/singlesignon/home",
    consoleLabel: "IAM Identity Center",
    diagram: `flowchart LR
  A[Employee] --> B[Corporate Identity Provider]
  B --> C[IAM Identity Center Access Portal]
  C --> D[Account A: Admin permission set]
  C --> E[Account B: ReadOnly permission set]`,
    cliExample: {
      description: "List the IAM Identity Center instances in the organization",
      command: "aws sso-admin list-instances",
      sampleOutput: "{\n  \"Instances\": [\n    {\n      \"InstanceArn\": \"arn:aws:sso:::instance/ssoins-1234abcd5678ef90\",\n      \"IdentityStoreId\": \"d-1234567890\",\n      \"OwnerAccountId\": \"123456789012\",\n      \"Name\": \"corp-identity-center\",\n      \"Status\": \"ACTIVE\",\n      \"CreatedDate\": \"2026-01-20T10:15:00+00:00\"\n    }\n  ]\n}",
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
    consoleUrl: "https://console.aws.amazon.com/iam/home#/credential_report",
    consoleLabel: "IAM > Credential report",
    diagram: `flowchart LR
  A[IAM] --> B[Generate credential report]
  B --> C[CSV file]
  C --> D[Password last used]
  C --> E[Access key age]
  C --> F[MFA active]`,
    cliExample: {
      description: "Generate and then download the IAM credential report",
      command: "aws iam generate-credential-report && aws iam get-credential-report --output text --query Content | base64 -d",
      sampleOutput: "user,arn,user_creation_time,password_enabled,password_last_used,password_last_changed,password_next_rotation,mfa_active,access_key_1_active,access_key_1_last_rotated,access_key_1_last_used_date,access_key_2_active\n<root_account>,arn:aws:iam::123456789012:root,2025-11-03T09:00:00+00:00,not_supported,2026-09-01T07:12:44+00:00,not_supported,not_supported,true,false,N/A,N/A,false\nalice,arn:aws:iam::123456789012:user/alice,2026-01-12T11:45:00+00:00,true,2026-09-16T08:41:12+00:00,2026-07-01T09:00:00+00:00,2026-09-29T09:00:00+00:00,true,true,2026-06-15T10:00:00+00:00,2026-09-16T14:02:31+00:00,false\nbob,arn:aws:iam::123456789012:user/bob,2026-02-02T13:20:00+00:00,false,no_information,N/A,N/A,false,true,2026-02-02T13:20:00+00:00,2026-03-30T18:55:07+00:00,false",
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
    consoleUrl: "https://console.aws.amazon.com/cloudhsm/home",
    consoleLabel: "AWS CloudHSM",
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
      sampleOutput: "{\n  \"Clusters\": [\n    {\n      \"ClusterId\": \"cluster-1234abcd5678ef90\",\n      \"State\": \"ACTIVE\",\n      \"StateMessage\": \"The cluster is ready for use.\",\n      \"HsmType\": \"hsm2m.medium\",\n      \"VpcId\": \"vpc-0123456789abcdef0\",\n      \"SubnetMapping\": {\n        \"us-east-1a\": \"subnet-0abc123def456789a\"\n      },\n      \"SecurityGroup\": \"sg-0abc123def456789a\",\n      \"Hsms\": [\n        {\n          \"HsmId\": \"hsm-1234abcd5678ef90\",\n          \"State\": \"ACTIVE\",\n          \"AvailabilityZone\": \"us-east-1a\",\n          \"EniIp\": \"10.0.1.25\"\n        }\n      ],\n      \"BackupPolicy\": \"DEFAULT\",\n      \"CreateTimestamp\": \"2026-03-12T08:00:00+00:00\"\n    }\n  ]\n}",
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
    consoleUrl: "https://console.aws.amazon.com/acm/home#/certificates",
    consoleLabel: "ACM > Certificates",
    diagram: `flowchart LR
  A[Request certificate in ACM] --> B[Domain validation]
  B --> C[Certificate attached to ALB or CloudFront]
  C --> D[Automatic renewal before expiry]`,
    cliExample: {
      description: "Request a public TLS certificate with DNS validation",
      command: "aws acm request-certificate --domain-name www.example.com --validation-method DNS",
      sampleOutput: "{\n  \"CertificateArn\": \"arn:aws:acm:us-east-1:123456789012:certificate/1234abcd-12ab-34cd-56ef-1234567890ab\"\n}",
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
    consoleUrl: "https://console.aws.amazon.com/cognito/v2/idp/user-pools",
    consoleLabel: "Cognito > User pools",
    diagram: `flowchart LR
  A[Mobile App User] --> B[Cognito User Pool: sign-up / sign-in]
  A --> C[Google or Apple login]
  C --> B
  B --> D[Cognito Identity Pool]
  D --> E[Temporary AWS credentials for app]`,
    cliExample: {
      description: "List Cognito user pools in the current region",
      command: "aws cognito-idp list-user-pools --max-results 20",
      sampleOutput: "{\n  \"UserPools\": [\n    {\n      \"Id\": \"us-east-1_AbCdEfGhI\",\n      \"Name\": \"mobile-app-users\",\n      \"LambdaConfig\": {},\n      \"LastModifiedDate\": \"2026-06-04T11:20:00+00:00\",\n      \"CreationDate\": \"2026-05-30T09:10:00+00:00\"\n    }\n  ]\n}",
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
    consoleUrl: "https://console.aws.amazon.com/vpcconsole/home#NetworkFirewalls:",
    consoleLabel: "VPC > Network Firewall > Firewalls",
    diagram: `flowchart LR
  A[Internet Gateway] --> B[Firewall Subnet: AWS Network Firewall]
  B -->|Stateful rules, IPS, domain filtering| C[Protected Subnets]
  D[AWS Firewall Manager] -.->|Centrally deploys policy| B`,
    cliExample: {
      description: "List AWS Network Firewall firewalls in the region",
      command: "aws network-firewall list-firewalls",
      sampleOutput: "{\n  \"Firewalls\": [\n    {\n      \"FirewallName\": \"prod-vpc-firewall\",\n      \"FirewallArn\": \"arn:aws:network-firewall:us-east-1:123456789012:firewall/prod-vpc-firewall\"\n    }\n  ]\n}",
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
    consoleUrl: "https://console.aws.amazon.com/trustedadvisor/home#/category/security",
    consoleLabel: "Trusted Advisor > Security",
    diagram: `flowchart TD
  A[AWS Trusted Advisor: Security] --> B[Security groups: unrestricted ports]
  A --> C[MFA on root account]
  A --> D[IAM access key rotation]
  A --> E[S3 bucket permissions]`,
    cliExample: {
      description: "List Trusted Advisor checks in the security category (requires Business or Enterprise Support)",
      command: "aws support describe-trusted-advisor-checks --language en --query \"checks[?category=='security'].name\"",
      sampleOutput: "[\n  \"Security Groups - Specific Ports Unrestricted\",\n  \"Security Groups - Unrestricted Access\",\n  \"IAM Use\",\n  \"Amazon S3 Bucket Permissions\",\n  \"MFA on Root Account\",\n  \"Exposed Access Keys\",\n  \"IAM Access Key Rotation\",\n  \"AWS CloudTrail Logging\"\n]",
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
    consoleUrl: "https://console.aws.amazon.com/systems-manager/session-manager",
    consoleLabel: "Systems Manager > Session Manager",
    diagram: `flowchart LR
  A[Administrator with IAM permission] --> B[Systems Manager Session Manager]
  B --> C[SSM Agent on EC2 instance]
  C --> D[Interactive shell, no inbound port 22]
  B --> E[Session logs to S3 / CloudWatch Logs]`,
    cliExample: {
      description: "Start a Session Manager shell session on an EC2 instance",
      command: "aws ssm start-session --target i-0123456789abcdef0",
      sampleOutput: "Starting session with SessionId: alice-0abc123def456789a\n\nsh-5.2$ whoami\nssm-user\nsh-5.2$ exit\n\nExiting session with sessionId: alice-0abc123def456789a.",
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
      sampleOutput: "{\n  \"caseId\": \"case-123456789012-muen-2026-1234abcd5678ef90\"\n}",
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
    consoleUrl: "https://console.aws.amazon.com/vpcconsole/home#vpcs:",
    consoleLabel: "VPC > Your VPCs > Flow logs",
    diagram: `flowchart LR
  A[VPC network interfaces] --> B[VPC Flow Logs]
  B --> C[CloudWatch Logs or Amazon S3]
  C --> D[Analyze ACCEPT / REJECT records]`,
    cliExample: {
      description: "Create a flow log for a VPC that publishes to CloudWatch Logs",
      command: "aws ec2 create-flow-logs --resource-type VPC --resource-ids vpc-0123456789abcdef0 --traffic-type ALL --log-group-name vpc-flow-logs --deliver-logs-permission-arn arn:aws:iam::123456789012:role/FlowLogsRole",
      sampleOutput: "{\n  \"ClientToken\": \"1234abcd-12ab-34cd-56ef-1234567890ab\",\n  \"FlowLogIds\": [\n    \"fl-0abc123def456789a\"\n  ],\n  \"Unsuccessful\": []\n}",
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
      sampleOutput: "{\n  \"DBInstance\": {\n    \"DBInstanceIdentifier\": \"mydb\",\n    \"DBInstanceClass\": \"db.t3.micro\",\n    \"Engine\": \"mysql\",\n    \"DBInstanceStatus\": \"creating\",\n    \"MasterUsername\": \"admin\",\n    \"AllocatedStorage\": 20,\n    \"EngineVersion\": \"8.0.40\",\n    \"StorageEncrypted\": true,\n    \"KmsKeyId\": \"arn:aws:kms:us-east-1:123456789012:key/1234abcd-12ab-34cd-56ef-1234567890ab\",\n    \"PubliclyAccessible\": false,\n    \"VpcSecurityGroups\": [\n      {\n        \"VpcSecurityGroupId\": \"sg-0abc123def456789a\",\n        \"Status\": \"active\"\n      }\n    ],\n    \"DBInstanceArn\": \"arn:aws:rds:us-east-1:123456789012:db:mydb\"\n  }\n}",
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
      sampleOutput: "{\n  \"EvaluationResults\": [\n    {\n      \"EvalActionName\": \"s3:DeleteObject\",\n      \"EvalResourceName\": \"*\",\n      \"EvalDecision\": \"explicitDeny\",\n      \"MatchedStatements\": [\n        {\n          \"SourcePolicyId\": \"DenyS3Delete\",\n          \"SourcePolicyType\": \"IAM Policy\",\n          \"StartPosition\": {\n            \"Line\": 3,\n            \"Column\": 17\n          },\n          \"EndPosition\": {\n            \"Line\": 8,\n            \"Column\": 6\n          }\n        }\n      ],\n      \"MissingContextValues\": []\n    }\n  ]\n}",
    },
  },
  {
    id: "sec41",
    domain: "security-and-compliance",
    text: "A security team wants to automatically identify S3 buckets, IAM roles, and KMS keys whose resource policies grant access to principals outside the company's AWS Organization. Which service should they enable?",
    options: [
      { id: "a", text: "IAM Access Analyzer" },
      { id: "b", text: "IAM credential report" },
      { id: "c", text: "Amazon Inspector" },
      { id: "d", text: "AWS Trusted Advisor" },
    ],
    correctOptionIds: ["a"],
    explanation: "IAM Access Analyzer continuously analyzes resource-based policies and produces findings for any resource that is shared with an external entity outside your zone of trust (account or organization).",
    optionRationale: {
      a: "Correct — Access Analyzer generates findings for resources such as S3 buckets, IAM roles, KMS keys, and SQS queues that are accessible from outside the account or organization.",
      b: "The credential report lists IAM users and their credential status; it does not analyze resource policies.",
      c: "Inspector scans EC2, containers, and Lambda for software vulnerabilities, not for external resource sharing.",
      d: "Trusted Advisor flags some public S3 buckets but does not perform provable policy analysis across resource types.",
    },
    referenceUrl: "https://docs.aws.amazon.com/IAM/latest/UserGuide/what-is-access-analyzer.html",
    referenceLabel: "Using IAM Access Analyzer",
    consoleUrl: "https://console.aws.amazon.com/access-analyzer/home",
    consoleLabel: "IAM > Access Analyzer",
    diagram: `flowchart TD
  A[IAM Access Analyzer] --> B[Analyzes resource policies]
  B --> C[S3 bucket policy]
  B --> D[IAM role trust policy]
  B --> E[KMS key policy]
  C --> F{Shared outside zone of trust?}
  D --> F
  E --> F
  F -->|Yes| G[Finding generated]
  F -->|No| H[No finding]`,
    cliExample: {
      description: "Create an Access Analyzer with the AWS Organization as the zone of trust",
      command: "aws accessanalyzer create-analyzer --analyzer-name org-analyzer --type ORGANIZATION",
      sampleOutput: "{\n  \"arn\": \"arn:aws:access-analyzer:us-east-1:123456789012:analyzer/org-analyzer\"\n}",
    },
  },
  {
    id: "sec42",
    domain: "security-and-compliance",
    text: "A company allows developers to create IAM roles for their applications but wants to guarantee that no role a developer creates can ever exceed a defined maximum set of permissions, regardless of the policies attached. Which IAM feature enforces this?",
    options: [
      { id: "a", text: "IAM groups" },
      { id: "b", text: "Permissions boundaries" },
      { id: "c", text: "Resource-based policies" },
      { id: "d", text: "IAM Access Analyzer" },
    ],
    correctOptionIds: ["b"],
    explanation: "A permissions boundary is a managed policy that sets the maximum permissions an identity-based policy can grant to a user or role; effective permissions are the intersection of the boundary and the identity policies.",
    optionRationale: {
      a: "Groups organize users and attach policies, but they add permissions rather than capping them, and roles cannot be in groups.",
      b: "Correct — attaching a permissions boundary caps the maximum permissions a user or role can have, even if broader policies are attached.",
      c: "Resource-based policies control access to a specific resource; they do not limit what a role can be granted.",
      d: "Access Analyzer reports on external access and unused permissions; it does not enforce limits.",
    },
    referenceUrl: "https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html",
    referenceLabel: "Permissions boundaries for IAM entities",
    consoleUrl: "https://console.aws.amazon.com/iam/home#/policies",
    consoleLabel: "IAM > Policies",
    diagram: `flowchart LR
  A[Identity-based policy: s3:* ec2:*] --> C{Intersection}
  B[Permissions boundary: s3:* only] --> C
  C --> D[Effective permissions: s3:* only]`,
    cliExample: {
      description: "Attach a permissions boundary to an IAM role",
      command: "aws iam put-role-permissions-boundary --role-name dev-app-role --permissions-boundary arn:aws:iam::123456789012:policy/DeveloperBoundary",
      sampleOutput: "{}",
    },
  },
  {
    id: "sec43",
    domain: "security-and-compliance",
    text: "A company stores confidential documents in Amazon S3 and wants to guarantee that no bucket or object in the account can ever be made publicly accessible, even if an administrator accidentally attaches a public bucket policy or ACL. Which feature should they enable?",
    options: [
      { id: "a", text: "S3 Block Public Access at the account level" },
      { id: "b", text: "S3 Versioning" },
      { id: "c", text: "S3 Transfer Acceleration" },
      { id: "d", text: "Amazon Macie" },
    ],
    correctOptionIds: ["a"],
    explanation: "S3 Block Public Access provides account-level and bucket-level settings that override any bucket policy or ACL that would grant public access, ensuring buckets cannot be exposed publicly.",
    optionRationale: {
      a: "Correct — enabling all four Block Public Access settings at the account level overrides public ACLs and policies for every bucket.",
      b: "Versioning keeps multiple copies of objects for recovery; it does not restrict public access.",
      c: "Transfer Acceleration speeds up uploads over long distances; it has nothing to do with access control.",
      d: "Macie discovers sensitive data and reports public buckets, but it does not block public access.",
    },
    referenceUrl: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-control-block-public-access.html",
    referenceLabel: "Blocking public access to your Amazon S3 storage",
    consoleUrl: "https://s3.console.aws.amazon.com/s3/settings",
    consoleLabel: "S3 > Block Public Access settings for this account",
    diagram: `flowchart TD
  A[Admin attaches public bucket policy] --> B{Block Public Access enabled?}
  B -->|Yes| C[Public access blocked]
  B -->|No| D[Bucket becomes public]`,
    cliExample: {
      description: "Enable all Block Public Access settings for the entire account",
      command: "aws s3control put-public-access-block --account-id 123456789012 --public-access-block-configuration BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true",
      sampleOutput: "",
    },
  },
  {
    id: "sec44",
    domain: "security-and-compliance",
    text: "After Amazon GuardDuty reports that an EC2 instance is communicating with a known command-and-control server, a security analyst needs to investigate the root cause by visualizing the related API calls, VPC flow logs, and GuardDuty findings over time in one place. Which service is designed for this?",
    options: [
      { id: "a", text: "Amazon Detective" },
      { id: "b", text: "AWS Config" },
      { id: "c", text: "Amazon Inspector" },
      { id: "d", text: "AWS Artifact" },
    ],
    correctOptionIds: ["a"],
    explanation: "Amazon Detective automatically collects CloudTrail logs, VPC Flow Logs, and GuardDuty findings, then builds a linked graph so analysts can quickly investigate and determine the root cause of security findings.",
    optionRationale: {
      a: "Correct — Detective is purpose-built for security investigations and root-cause analysis using visualizations built from log data.",
      b: "Config tracks resource configuration changes and compliance; it does not correlate security findings.",
      c: "Inspector finds software vulnerabilities; it is not an investigation tool.",
      d: "Artifact provides compliance reports, not security analytics.",
    },
    referenceUrl: "https://docs.aws.amazon.com/detective/latest/userguide/what-is-detective.html",
    referenceLabel: "What is Amazon Detective?",
    consoleUrl: "https://console.aws.amazon.com/detective/home",
    consoleLabel: "Amazon Detective",
    diagram: `flowchart LR
  A[GuardDuty finding] --> D[Amazon Detective]
  B[CloudTrail logs] --> D
  C[VPC Flow Logs] --> D
  D --> E[Behavior graph]
  E --> F[Root cause analysis]`,
    cliExample: {
      description: "Enable Amazon Detective by creating a behavior graph",
      command: "aws detective create-graph",
      sampleOutput: "{\n  \"GraphArn\": \"arn:aws:detective:us-east-1:123456789012:graph:1234abcd5678efgh1234abcd5678efgh\"\n}",
    },
  },
  {
    id: "sec45",
    domain: "security-and-compliance",
    text: "A company with 50 AWS accounts in AWS Organizations wants to centrally configure and enforce AWS WAF rules and security group policies across all accounts, and automatically apply them to new accounts as they are created. Which service should they use?",
    options: [
      { id: "a", text: "AWS Firewall Manager" },
      { id: "b", text: "AWS Network Firewall" },
      { id: "c", text: "AWS Shield Standard" },
      { id: "d", text: "Amazon GuardDuty" },
    ],
    correctOptionIds: ["a"],
    explanation: "AWS Firewall Manager is a security management service that lets you centrally configure and manage WAF rules, Shield Advanced protections, security groups, and Network Firewall policies across accounts in an AWS Organization.",
    optionRationale: {
      a: "Correct — Firewall Manager applies firewall policies organization-wide and automatically covers new accounts and resources.",
      b: "Network Firewall is a per-VPC firewall; it does not manage policies across many accounts on its own.",
      c: "Shield Standard is automatic DDoS protection, not a policy management tool.",
      d: "GuardDuty detects threats; it does not configure WAF rules or security groups.",
    },
    referenceUrl: "https://docs.aws.amazon.com/waf/latest/developerguide/fms-chapter.html",
    referenceLabel: "AWS Firewall Manager",
    consoleUrl: "https://console.aws.amazon.com/wafv2/fmsv2/home",
    consoleLabel: "AWS Firewall Manager",
    diagram: `flowchart TD
  A[AWS Firewall Manager] --> B[Organization-wide policy]
  B --> C[Account 1: WAF rules applied]
  B --> D[Account 2: Security groups audited]
  B --> E[New account: policy auto-applied]`,
    cliExample: {
      description: "List Firewall Manager policies in the administrator account",
      command: "aws fms list-policies",
      sampleOutput: "{\n  \"PolicyList\": [\n    {\n      \"PolicyArn\": \"arn:aws:fms:us-east-1:123456789012:policy/a1b2c3d4-5678-90ab-cdef-EXAMPLE11111\",\n      \"PolicyId\": \"a1b2c3d4-5678-90ab-cdef-EXAMPLE11111\",\n      \"PolicyName\": \"org-waf-baseline\",\n      \"ResourceType\": \"AWS::ElasticLoadBalancingV2::LoadBalancer\",\n      \"SecurityServiceType\": \"WAFV2\",\n      \"RemediationEnabled\": true,\n      \"DeleteUnusedFMManagedResources\": false\n    }\n  ]\n}",
    },
  },
  {
    id: "sec46",
    domain: "security-and-compliance",
    text: "A development team needs to store non-sensitive configuration values such as feature flags and environment names, as well as a few database passwords that must be rotated automatically every 30 days. Which combination is the most cost-effective and appropriate?",
    options: [
      { id: "a", text: "Store everything in AWS Secrets Manager" },
      { id: "b", text: "Store configuration values in Systems Manager Parameter Store and the database passwords in AWS Secrets Manager with rotation enabled" },
      { id: "c", text: "Store everything in AWS KMS" },
      { id: "d", text: "Hard-code all values in the application source code" },
    ],
    correctOptionIds: ["b"],
    explanation: "Parameter Store standard parameters are free and ideal for configuration data, while Secrets Manager adds built-in automatic rotation for secrets such as database credentials.",
    optionRationale: {
      a: "Secrets Manager charges per secret and per API call, so using it for non-sensitive configuration is unnecessary cost.",
      b: "Correct — Parameter Store handles plain configuration at no cost and Secrets Manager provides native automatic rotation for credentials.",
      c: "KMS creates and manages encryption keys; it does not store arbitrary configuration or secret values.",
      d: "Hard-coding secrets is a security anti-pattern and makes rotation impossible.",
    },
    referenceUrl: "https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html",
    referenceLabel: "AWS Systems Manager Parameter Store",
    consoleUrl: "https://console.aws.amazon.com/systems-manager/parameters",
    consoleLabel: "Systems Manager > Parameter Store",
    diagram: `flowchart TD
  A[Application config] --> B{Needs automatic rotation?}
  B -->|No: feature flags, env names| C[Parameter Store - free standard tier]
  B -->|Yes: DB passwords| D[Secrets Manager - built-in rotation]`,
    cliExample: {
      description: "Store a plain configuration value in Parameter Store",
      command: "aws ssm put-parameter --name /myapp/prod/feature-flag-beta --value enabled --type String",
      sampleOutput: "{\n  \"Version\": 1,\n  \"Tier\": \"Standard\"\n}",
    },
  },
  {
    id: "sec47",
    domain: "security-and-compliance",
    text: "An auditor requires proof that AWS CloudTrail log files delivered to an S3 bucket have not been modified, deleted, or forged since CloudTrail delivered them. Which CloudTrail feature satisfies this requirement?",
    options: [
      { id: "a", text: "CloudTrail log file integrity validation" },
      { id: "b", text: "CloudTrail Insights" },
      { id: "c", text: "S3 Transfer Acceleration" },
      { id: "d", text: "CloudWatch Logs metric filters" },
    ],
    correctOptionIds: ["a"],
    explanation: "Log file integrity validation makes CloudTrail deliver hourly digest files containing SHA-256 hashes signed with RSA, letting you verify that log files were not changed after delivery.",
    optionRationale: {
      a: "Correct — integrity validation uses signed digest files so you can prove logs are unaltered, which is essential for forensic and compliance investigations.",
      b: "CloudTrail Insights detects unusual API activity volumes; it does not prove log integrity.",
      c: "Transfer Acceleration speeds up S3 uploads and is unrelated to CloudTrail.",
      d: "Metric filters create CloudWatch metrics from log patterns; they cannot detect tampering with stored log files.",
    },
    referenceUrl: "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-log-file-validation-intro.html",
    referenceLabel: "Validating CloudTrail log file integrity",
    consoleUrl: "https://console.aws.amazon.com/cloudtrailv2/home#/trails",
    consoleLabel: "CloudTrail > Trails",
    diagram: `flowchart LR
  A[CloudTrail delivers log files] --> B[S3 bucket]
  A --> C[Hourly digest file with SHA-256 hashes]
  C --> D[Signed with CloudTrail private key]
  B --> E[validate-logs command]
  D --> E
  E --> F{Hashes match?}
  F -->|Yes| G[Logs unaltered]
  F -->|No| H[Tampering detected]`,
    cliExample: {
      description: "Validate CloudTrail log files delivered during a time range",
      command: "aws cloudtrail validate-logs --trail-arn arn:aws:cloudtrail:us-east-1:123456789012:trail/management-trail --start-time 2025-06-01T00:00:00Z --end-time 2025-06-02T00:00:00Z",
      sampleOutput: "Validating log files for trail arn:aws:cloudtrail:us-east-1:123456789012:trail/management-trail between 2025-06-01T00:00:00Z and 2025-06-02T00:00:00Z\n\nResults requested for 2025-06-01T00:00:00Z to 2025-06-02T00:00:00Z\nResults found for 2025-06-01T00:03:12Z to 2025-06-01T23:58:44Z:\n\n24/24 digest files valid\n1436/1436 log files valid",
    },
  },
  {
    id: "sec48",
    domain: "security-and-compliance",
    text: "A compliance team must continuously verify that every EBS volume in the account is encrypted, and be alerted whenever a new unencrypted volume is created. Which approach achieves this with the least operational effort?",
    options: [
      { id: "a", text: "Enable the AWS Config managed rule encrypted-volumes and use its compliance status to trigger notifications" },
      { id: "b", text: "Manually review the EC2 console once a week" },
      { id: "c", text: "Enable Amazon Macie on the EBS volumes" },
      { id: "d", text: "Run a penetration test against each volume" },
    ],
    correctOptionIds: ["a"],
    explanation: "AWS Config managed rules such as encrypted-volumes evaluate resources continuously against a desired configuration and mark them NON_COMPLIANT, which can drive SNS notifications or automatic remediation.",
    optionRationale: {
      a: "Correct — Config managed rules run automatically on configuration changes and provide a compliance dashboard and notifications with no custom code.",
      b: "Manual weekly reviews are error-prone, slow, and do not scale.",
      c: "Macie analyzes data in Amazon S3, not EBS volume encryption settings.",
      d: "Penetration tests find exploitable weaknesses; they are not a continuous configuration check.",
    },
    referenceUrl: "https://docs.aws.amazon.com/config/latest/developerguide/encrypted-volumes.html",
    referenceLabel: "AWS Config rule: encrypted-volumes",
    consoleUrl: "https://console.aws.amazon.com/config/home#/rules",
    consoleLabel: "AWS Config > Rules",
    diagram: `flowchart TD
  A[New EBS volume created] --> B[AWS Config records configuration]
  B --> C[Managed rule: encrypted-volumes]
  C --> D{Encrypted?}
  D -->|Yes| E[COMPLIANT]
  D -->|No| F[NON_COMPLIANT]
  F --> G[SNS notification or auto-remediation]`,
    cliExample: {
      description: "Create the encrypted-volumes managed Config rule",
      command: "aws configservice put-config-rule --config-rule '{\"ConfigRuleName\":\"encrypted-volumes\",\"Source\":{\"Owner\":\"AWS\",\"SourceIdentifier\":\"ENCRYPTED_VOLUMES\"}}'",
      sampleOutput: "",
    },
  },
  {
    id: "sec49",
    domain: "security-and-compliance",
    text: "A healthcare provider plans to store protected health information (PHI) on AWS and must comply with HIPAA. Which statement about running HIPAA-regulated workloads on AWS is correct?",
    options: [
      { id: "a", text: "AWS becomes fully responsible for HIPAA compliance once the account is created" },
      { id: "b", text: "The customer must accept the AWS Business Associate Addendum (BAA) and use only HIPAA-eligible services for PHI, while remaining responsible for configuring them securely" },
      { id: "c", text: "HIPAA workloads cannot run on AWS" },
      { id: "d", text: "Any AWS service can store PHI without additional agreements" },
    ],
    correctOptionIds: ["b"],
    explanation: "AWS offers a BAA (accepted through AWS Artifact) and a list of HIPAA-eligible services; compliance is shared, so the customer must still architect and configure the workload appropriately.",
    optionRationale: {
      a: "Compliance is shared; AWS provides the compliant infrastructure but the customer is responsible for how PHI is handled in the cloud.",
      b: "Correct — a BAA must be in place and PHI must be processed only in HIPAA-eligible services, with the customer configuring encryption, access control, and logging.",
      c: "Many healthcare organizations run HIPAA workloads on AWS.",
      d: "Only services designated as HIPAA-eligible may be used for PHI under the BAA.",
    },
    referenceUrl: "https://aws.amazon.com/compliance/hipaa-compliance/",
    referenceLabel: "HIPAA compliance on AWS",
    consoleUrl: "https://console.aws.amazon.com/artifact/home#/agreements",
    consoleLabel: "AWS Artifact > Agreements",
    diagram: `flowchart TD
  A[Store PHI on AWS] --> B[Accept BAA in AWS Artifact]
  B --> C[Use only HIPAA-eligible services]
  C --> D[Customer configures encryption, IAM, logging]
  D --> E[Shared compliance achieved]`,
    cliExample: {
      description: "List the agreements available for acceptance in AWS Artifact",
      command: "aws artifact list-customer-agreements",
      sampleOutput: "{\n  \"customerAgreements\": [\n    {\n      \"name\": \"AWS Business Associate Addendum\",\n      \"arn\": \"arn:aws:artifact::123456789012:customer-agreement/ca-1234abcd5678efgh\",\n      \"id\": \"ca-1234abcd5678efgh\",\n      \"agreementArn\": \"arn:aws:artifact:::agreement/ag-baa-2024\",\n      \"state\": \"ACTIVE\",\n      \"type\": \"DEFAULT\",\n      \"effectiveStart\": \"2025-03-14T09:22:11Z\",\n      \"acceptanceTerms\": [\"Applies to all accounts in the organization\"],\n      \"terminateTerms\": []\n    }\n  ]\n}",
    },
  },
  {
    id: "sec50",
    domain: "security-and-compliance",
    text: "A European company must comply with GDPR and needs assurance that customer personal data stored in Amazon S3 and Amazon RDS remains physically within the European Union. What is the correct way to achieve this?",
    options: [
      { id: "a", text: "Create the resources in an EU Region such as eu-central-1; AWS does not replicate customer content outside the Region the customer selects unless the customer configures it" },
      { id: "b", text: "Ask AWS Support to pin the data to Europe after creating resources in us-east-1" },
      { id: "c", text: "Enable AWS Shield Advanced, which enforces data residency" },
      { id: "d", text: "Data residency cannot be controlled on AWS" },
    ],
    correctOptionIds: ["a"],
    explanation: "Customers choose the AWS Region in which their content is stored, and AWS does not move or replicate customer content outside that Region except as the customer directs, which supports GDPR data-residency requirements.",
    optionRationale: {
      a: "Correct — Region selection is the primary data-residency control; content stays in the chosen Region unless the customer enables cross-Region features.",
      b: "Region is fixed at resource creation; AWS Support cannot retroactively relocate data.",
      c: "Shield Advanced is DDoS protection and has no data-residency function.",
      d: "Data residency is fully under the customer's control through Region choice.",
    },
    referenceUrl: "https://aws.amazon.com/compliance/gdpr-center/",
    referenceLabel: "GDPR Center",
    consoleUrl: "https://console.aws.amazon.com/artifact/home#/reports",
    consoleLabel: "AWS Artifact > Reports",
    diagram: `flowchart TD
  A[GDPR data residency requirement] --> B[Choose EU Region e.g. eu-central-1]
  B --> C[S3 bucket in Frankfurt]
  B --> D[RDS instance in Frankfurt]
  C --> E[Content stays in Region unless customer replicates]
  D --> E`,
    cliExample: {
      description: "Create an S3 bucket in the Frankfurt Region to keep data inside the EU",
      command: "aws s3api create-bucket --bucket customer-records-eu --region eu-central-1 --create-bucket-configuration LocationConstraint=eu-central-1",
      sampleOutput: "{\n  \"Location\": \"http://customer-records-eu.s3.amazonaws.com/\"\n}",
    },
  },
  {
    id: "sec51",
    domain: "security-and-compliance",
    text: "A company's security policy requires that it can define its own key policies, control who can use each encryption key, and enable automatic annual key rotation for keys protecting data in Amazon S3. Which AWS KMS key type should they use?",
    options: [
      { id: "a", text: "AWS owned keys" },
      { id: "b", text: "AWS managed keys" },
      { id: "c", text: "Customer managed keys" },
      { id: "d", text: "SSH key pairs" },
    ],
    correctOptionIds: ["c"],
    explanation: "Customer managed KMS keys give the customer full control over the key policy, grants, aliases, enabling/disabling, and rotation settings, whereas AWS managed and AWS owned keys are controlled by AWS.",
    optionRationale: {
      a: "AWS owned keys are used across many accounts by AWS services and are not visible or controllable by the customer.",
      b: "AWS managed keys are created on your behalf per service; you can view them but cannot edit their key policies or rotation schedule.",
      c: "Correct — customer managed keys let you write the key policy, control usage, and configure automatic rotation.",
      d: "SSH key pairs are for EC2 login, not data encryption in KMS.",
    },
    referenceUrl: "https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#key-mgmt",
    referenceLabel: "AWS KMS key types",
    consoleUrl: "https://console.aws.amazon.com/kms/home#/kms/keys",
    consoleLabel: "KMS > Customer managed keys",
    diagram: `flowchart TD
  A[KMS key types] --> B[AWS owned: hidden, AWS controlled]
  A --> C[AWS managed: visible, AWS controlled]
  A --> D[Customer managed: customer controls policy and rotation]
  D --> E[Custom key policy]
  D --> F[Automatic rotation]
  D --> G[Enable or disable at will]`,
    cliExample: {
      description: "Create a customer managed key and enable automatic rotation",
      command: "aws kms create-key --description \"S3 data key\" && aws kms enable-key-rotation --key-id 1234abcd-12ab-34cd-56ef-1234567890ab",
      sampleOutput: "{\n  \"KeyMetadata\": {\n    \"AWSAccountId\": \"123456789012\",\n    \"KeyId\": \"1234abcd-12ab-34cd-56ef-1234567890ab\",\n    \"Arn\": \"arn:aws:kms:us-east-1:123456789012:key/1234abcd-12ab-34cd-56ef-1234567890ab\",\n    \"CreationDate\": \"2025-06-01T10:15:22.000Z\",\n    \"Enabled\": true,\n    \"Description\": \"S3 data key\",\n    \"KeyUsage\": \"ENCRYPT_DECRYPT\",\n    \"KeyState\": \"Enabled\",\n    \"Origin\": \"AWS_KMS\",\n    \"KeyManager\": \"CUSTOMER\",\n    \"KeySpec\": \"SYMMETRIC_DEFAULT\"\n  }\n}",
    },
  },
  {
    id: "sec52",
    domain: "security-and-compliance",
    text: "A company follows best practice by locking away its root user credentials and using IAM identities for daily work. Which TWO tasks can ONLY be performed by the account root user and therefore still require signing in as root?",
    options: [
      { id: "a", text: "Closing the AWS account" },
      { id: "b", text: "Changing the AWS Support plan" },
      { id: "c", text: "Launching an EC2 instance" },
      { id: "d", text: "Creating an IAM user" },
      { id: "e", text: "Uploading an object to Amazon S3" },
    ],
    correctOptionIds: ["a", "b"],
    explanation: "A small set of account-level tasks, such as closing the account, changing the support plan, changing the root email, and restoring IAM user permissions, can only be done by the root user; all normal service operations should use IAM identities.",
    optionRationale: {
      a: "Correct — closing an AWS account is a root-only task.",
      b: "Correct — changing or cancelling the AWS Support plan requires root user credentials.",
      c: "Launching EC2 instances is a normal service action any IAM identity with permission can perform.",
      d: "IAM users and roles with the right permissions can create other IAM users.",
      e: "Uploading to S3 is an ordinary API action available to IAM identities.",
    },
    referenceUrl: "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html#root-user-tasks",
    referenceLabel: "Tasks that require root user credentials",
    consoleUrl: "https://console.aws.amazon.com/billing/home#/account",
    consoleLabel: "Account settings",
    diagram: `flowchart TD
  A[Task to perform] --> B{Root-only task?}
  B -->|Close account, change support plan, change root email| C[Sign in as root with MFA]
  B -->|Launch EC2, create IAM user, use S3| D[Use IAM user or role]`,
    cliExample: {
      description: "Check whether the caller is the root user by inspecting the identity ARN",
      command: "aws sts get-caller-identity",
      sampleOutput: "{\n  \"UserId\": \"123456789012\",\n  \"Account\": \"123456789012\",\n  \"Arn\": \"arn:aws:iam::123456789012:root\"\n}",
    },
  },
  {
    id: "sec53",
    domain: "security-and-compliance",
    text: "A developer accidentally commits an IAM user's access key and secret key to a public GitHub repository. What is the FIRST action the company should take?",
    options: [
      { id: "a", text: "Immediately deactivate or delete the exposed access key in IAM and create a new one if still needed" },
      { id: "b", text: "Delete the GitHub repository and assume the key is safe" },
      { id: "c", text: "Enable Amazon Macie to scan GitHub" },
      { id: "d", text: "Wait for AWS to automatically rotate the key" },
    ],
    correctOptionIds: ["a"],
    explanation: "Exposed long-term credentials must be invalidated immediately because copies may already exist; afterwards, review CloudTrail for unauthorized activity and move the workload to IAM roles with temporary credentials.",
    optionRationale: {
      a: "Correct — revoking the key stops any attacker from using it; rotation is the standard first response to a credential leak.",
      b: "Removing the repository does not remove copies already scraped by bots; the key is still valid.",
      c: "Macie analyzes data in Amazon S3, not third-party code repositories.",
      d: "AWS does not automatically rotate IAM user access keys; the customer must act.",
    },
    referenceUrl: "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html",
    referenceLabel: "Managing access keys for IAM users",
    consoleUrl: "https://console.aws.amazon.com/iam/home#/users",
    consoleLabel: "IAM > Users",
    diagram: `flowchart TD
  A[Access key leaked to public repo] --> B[Deactivate or delete the key immediately]
  B --> C[Review CloudTrail for misuse]
  C --> D[Create new key or switch to IAM role]
  D --> E[Remove secret from repo history]`,
    cliExample: {
      description: "Deactivate a compromised access key for an IAM user",
      command: "aws iam update-access-key --user-name dev-user --access-key-id AKIAIOSFODNN7EXAMPLE --status Inactive",
      sampleOutput: "",
    },
  },
  {
    id: "sec54",
    domain: "security-and-compliance",
    text: "An IAM user in a member account of an AWS Organization has an identity-based policy granting full access to Amazon EC2. A Service Control Policy (SCP) attached to the account's organizational unit denies ec2:RunInstances. What happens when the user tries to launch an instance?",
    options: [
      { id: "a", text: "The request is denied, because SCPs set the maximum permissions available to any principal in the account" },
      { id: "b", text: "The request is allowed, because IAM policies take precedence over SCPs" },
      { id: "c", text: "The request is allowed, because SCPs only affect the root user" },
      { id: "d", text: "The request is allowed once the user enables MFA" },
    ],
    correctOptionIds: ["a"],
    explanation: "SCPs act as guardrails that define the maximum available permissions for all IAM users and roles in member accounts; an action denied by an SCP cannot be allowed by any IAM policy in that account.",
    optionRationale: {
      a: "Correct — effective permissions are the intersection of the SCP and IAM policies, so the SCP deny wins.",
      b: "IAM policies cannot override SCPs; the SCP is evaluated first as an organizational boundary.",
      c: "SCPs apply to every principal in member accounts, including the root user of the member account.",
      d: "MFA does not bypass SCP restrictions.",
    },
    referenceUrl: "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html",
    referenceLabel: "Service control policies (SCPs)",
    consoleUrl: "https://console.aws.amazon.com/organizations/v2/home/policies/service-control-policy",
    consoleLabel: "Organizations > Service control policies",
    diagram: `flowchart LR
  A[SCP: Deny ec2:RunInstances] --> C{Intersection}
  B[IAM policy: Allow ec2:*] --> C
  C --> D[ec2:RunInstances denied]`,
    cliExample: {
      description: "List the SCPs attached to an organizational unit",
      command: "aws organizations list-policies-for-target --target-id ou-ab12-11111111 --filter SERVICE_CONTROL_POLICY",
      sampleOutput: "{\n  \"Policies\": [\n    {\n      \"Id\": \"p-examplepolicyid111\",\n      \"Arn\": \"arn:aws:organizations::123456789012:policy/o-exampleorgid/service_control_policy/p-examplepolicyid111\",\n      \"Name\": \"DenyEC2Launch\",\n      \"Description\": \"Prevents launching EC2 instances in sandbox OUs\",\n      \"Type\": \"SERVICE_CONTROL_POLICY\",\n      \"AwsManaged\": false\n    }\n  ]\n}",
    },
  },
  {
    id: "sec55",
    domain: "security-and-compliance",
    text: "A company stores critical financial records in Amazon S3 and wants to protect them against accidental or malicious deletion by users who have write access. Which TWO S3 features help meet this requirement?",
    options: [
      { id: "a", text: "S3 Versioning" },
      { id: "b", text: "MFA Delete" },
      { id: "c", text: "S3 Transfer Acceleration" },
      { id: "d", text: "S3 Intelligent-Tiering" },
      { id: "e", text: "Amazon S3 Select" },
    ],
    correctOptionIds: ["a", "b"],
    explanation: "Versioning preserves every version of an object so deletions can be undone, and MFA Delete requires a valid MFA code to permanently delete a version or change the versioning state of the bucket.",
    optionRationale: {
      a: "Correct — with versioning, a delete simply adds a delete marker and earlier versions can be restored.",
      b: "Correct — MFA Delete adds a second factor before object versions can be permanently removed.",
      c: "Transfer Acceleration improves upload speed; it offers no deletion protection.",
      d: "Intelligent-Tiering optimizes storage cost; it does not prevent deletion.",
      e: "S3 Select queries data inside objects; it is unrelated to protection.",
    },
    referenceUrl: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/MultiFactorAuthenticationDelete.html",
    referenceLabel: "Configuring MFA delete",
    consoleUrl: "https://s3.console.aws.amazon.com/s3/buckets",
    consoleLabel: "S3 > Buckets",
    diagram: `flowchart TD
  A[Delete request on S3 object] --> B{Versioning enabled?}
  B -->|Yes| C[Delete marker added, versions retained]
  C --> D{Permanent delete of version?}
  D --> E{MFA Delete enabled?}
  E -->|Yes| F[MFA code required]
  E -->|No| G[Version deleted]`,
    cliExample: {
      description: "Enable versioning and MFA Delete on a bucket (requires root user MFA device)",
      command: "aws s3api put-bucket-versioning --bucket financial-records --versioning-configuration Status=Enabled,MFADelete=Enabled --mfa \"arn:aws:iam::123456789012:mfa/root-account-mfa-device 123456\"",
      sampleOutput: "",
    },
  },
  {
    id: "sec56",
    domain: "security-and-compliance",
    text: "A company's web servers in a public subnet are being scanned repeatedly from a single known-malicious IP address. The company wants to explicitly block all traffic from that IP address at the subnet level. Which VPC feature should they use?",
    options: [
      { id: "a", text: "Add a Deny rule to the subnet's network ACL" },
      { id: "b", text: "Add a Deny rule to the instances' security group" },
      { id: "c", text: "Enable VPC Flow Logs" },
      { id: "d", text: "Create a VPC peering connection" },
    ],
    correctOptionIds: ["a"],
    explanation: "Network ACLs support both Allow and Deny rules and operate at the subnet level, making them the right tool for explicitly blocking a specific IP; security groups support only Allow rules.",
    optionRationale: {
      a: "Correct — a NACL Deny rule with a lower rule number than the Allow rules blocks the malicious IP for the entire subnet.",
      b: "Security groups have no Deny rules; they only permit traffic that is explicitly allowed.",
      c: "Flow Logs record traffic metadata for analysis; they do not block anything.",
      d: "VPC peering connects VPCs; it is unrelated to blocking inbound traffic.",
    },
    referenceUrl: "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html",
    referenceLabel: "Control traffic to subnets using network ACLs",
    consoleUrl: "https://console.aws.amazon.com/vpcconsole/home#acls:",
    consoleLabel: "VPC > Network ACLs",
    diagram: `flowchart TD
  A[Traffic from 203.0.113.5] --> B[Subnet network ACL]
  B --> C{Rule 50: Deny 203.0.113.5/32}
  C -->|Match| D[Traffic dropped at subnet edge]
  C -->|No match| E[Rule 100: Allow 0.0.0.0/0]
  E --> F[Security group evaluation]`,
    cliExample: {
      description: "Add an inbound Deny rule for a single IP address to a network ACL",
      command: "aws ec2 create-network-acl-entry --network-acl-id acl-0abc123def456789a --ingress --rule-number 50 --protocol -1 --cidr-block 203.0.113.5/32 --rule-action deny",
      sampleOutput: "",
    },
  },
  {
    id: "sec57",
    domain: "security-and-compliance",
    text: "A company needs to grant a new team read-only access to Amazon S3 and wants to reuse a ready-made policy that AWS maintains and updates automatically as S3 adds new API actions. Which type of policy should they attach?",
    options: [
      { id: "a", text: "An AWS managed policy such as AmazonS3ReadOnlyAccess" },
      { id: "b", text: "A customer managed policy written from scratch" },
      { id: "c", text: "An inline policy embedded in each user" },
      { id: "d", text: "A Service Control Policy" },
    ],
    correctOptionIds: ["a"],
    explanation: "AWS managed policies are standalone policies created and maintained by AWS for common job functions and service access levels; AWS updates them when new services or actions are introduced.",
    optionRationale: {
      a: "Correct — AmazonS3ReadOnlyAccess is an AWS managed policy that AWS keeps up to date, requiring no maintenance by the customer.",
      b: "A customer managed policy gives finer control but the customer must maintain it as S3 evolves.",
      c: "Inline policies are tied to a single identity and are harder to reuse and audit.",
      d: "SCPs restrict permissions across an Organization; they never grant permissions.",
    },
    referenceUrl: "https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_managed-vs-inline.html",
    referenceLabel: "Managed policies and inline policies",
    consoleUrl: "https://console.aws.amazon.com/iam/home#/policies?type=aws",
    consoleLabel: "IAM > Policies (AWS managed)",
    diagram: `flowchart TD
  A[IAM policy types] --> B[AWS managed: maintained by AWS, reusable]
  A --> C[Customer managed: maintained by you, reusable]
  A --> D[Inline: embedded in one identity]
  B --> E[AmazonS3ReadOnlyAccess]`,
    cliExample: {
      description: "Attach the AWS managed S3 read-only policy to an IAM group",
      command: "aws iam attach-group-policy --group-name analytics-team --policy-arn arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess",
      sampleOutput: "",
    },
  },
  {
    id: "sec58",
    domain: "security-and-compliance",
    text: "Account A owns an S3 bucket, and an application running in Account B needs to read objects from it. Which TWO approaches allow this cross-account access without creating IAM users in Account A?",
    options: [
      { id: "a", text: "Create an IAM role in Account A that trusts Account B, and have the application assume that role" },
      { id: "b", text: "Attach a bucket policy in Account A that grants s3:GetObject to the Account B principal" },
      { id: "c", text: "Share Account A's root user credentials with the application" },
      { id: "d", text: "Enable S3 Transfer Acceleration on the bucket" },
      { id: "e", text: "Create a security group rule allowing Account B" },
    ],
    correctOptionIds: ["a", "b"],
    explanation: "Cross-account access is achieved either with an IAM role in the resource account that the other account can assume, or with a resource-based policy (bucket policy) that directly grants access to the other account's principals.",
    optionRationale: {
      a: "Correct — cross-account IAM roles let Account B obtain temporary credentials scoped to what Account A permits.",
      b: "Correct — a bucket policy is a resource-based policy that can name principals from other accounts.",
      c: "Sharing root credentials violates every security best practice.",
      d: "Transfer Acceleration affects upload speed, not permissions.",
      e: "Security groups control network traffic to instances and cannot grant S3 permissions.",
    },
    referenceUrl: "https://docs.aws.amazon.com/IAM/latest/UserGuide/tutorial_cross-account-with-roles.html",
    referenceLabel: "Delegate access across AWS accounts using IAM roles",
    consoleUrl: "https://console.aws.amazon.com/iam/home#/roles",
    consoleLabel: "IAM > Roles",
    diagram: `flowchart LR
  subgraph Account B
    App[Application]
  end
  subgraph Account A
    Role[IAM role trusting Account B]
    Bucket[S3 bucket with bucket policy]
  end
  App -->|sts:AssumeRole| Role
  Role -->|s3:GetObject| Bucket
  App -->|Direct via bucket policy| Bucket`,
    cliExample: {
      description: "Assume a cross-account role in Account A from Account B",
      command: "aws sts assume-role --role-arn arn:aws:iam::111111111111:role/CrossAccountS3Read --role-session-name app-session",
      sampleOutput: "{\n  \"Credentials\": {\n    \"AccessKeyId\": \"ASIAIOSFODNN7EXAMPLE\",\n    \"SecretAccessKey\": \"wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY\",\n    \"SessionToken\": \"FwoGZXIvYXdzEBYaDExample...\",\n    \"Expiration\": \"2025-06-01T13:15:22Z\"\n  },\n  \"AssumedRoleUser\": {\n    \"AssumedRoleId\": \"AROAEXAMPLEID:app-session\",\n    \"Arn\": \"arn:aws:sts::111111111111:assumed-role/CrossAccountS3Read/app-session\"\n  }\n}",
    },
  },
  {
    id: "sec59",
    domain: "security-and-compliance",
    text: "A security operations team wants to be notified by email within minutes whenever Amazon GuardDuty generates a high-severity finding, without polling the GuardDuty console. Which approach should they use?",
    options: [
      { id: "a", text: "Create an Amazon EventBridge rule that matches GuardDuty findings and sends them to an Amazon SNS topic with an email subscription" },
      { id: "b", text: "Download findings from AWS Artifact every morning" },
      { id: "c", text: "Enable AWS Shield Advanced to email findings" },
      { id: "d", text: "Use AWS Config to email GuardDuty findings" },
    ],
    correctOptionIds: ["a"],
    explanation: "GuardDuty publishes findings to Amazon EventBridge, where a rule can filter by severity and forward matching events to targets such as SNS, Lambda, or Security Hub for automated notification and response.",
    optionRationale: {
      a: "Correct — EventBridge plus SNS is the standard event-driven pattern for near-real-time security alerting on AWS.",
      b: "Artifact provides compliance documents, not GuardDuty findings, and daily downloads are far from real time.",
      c: "Shield Advanced protects against DDoS attacks; it does not route GuardDuty findings.",
      d: "Config evaluates resource configurations and does not consume GuardDuty findings.",
    },
    referenceUrl: "https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_findings_cloudwatch.html",
    referenceLabel: "Creating custom responses to GuardDuty findings with Amazon EventBridge",
    consoleUrl: "https://console.aws.amazon.com/events/home#/rules",
    consoleLabel: "EventBridge > Rules",
    diagram: `flowchart LR
  A[GuardDuty finding severity 8] --> B[Amazon EventBridge]
  B --> C{Rule: severity >= 7?}
  C -->|Match| D[SNS topic]
  D --> E[Email to security team]
  C -->|Match| F[Lambda auto-remediation]`,
    cliExample: {
      description: "Create an EventBridge rule that matches high-severity GuardDuty findings",
      command: "aws events put-rule --name guardduty-high-severity --event-pattern '{\"source\":[\"aws.guardduty\"],\"detail-type\":[\"GuardDuty Finding\"],\"detail\":{\"severity\":[7,7.5,8,8.5,9]}}'",
      sampleOutput: "{\n  \"RuleArn\": \"arn:aws:events:us-east-1:123456789012:rule/guardduty-high-severity\"\n}",
    },
  },
];
