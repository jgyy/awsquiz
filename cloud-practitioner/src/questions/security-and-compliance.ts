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
      command: "aws iam update-access-key --user-name dev-user --access-key-id <access-key-id> --status Inactive",
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
      sampleOutput: "{\n  \"Credentials\": {\n    \"AccessKeyId\": \"<temporary-access-key-id>\",\n    \"SecretAccessKey\": \"<temporary-secret-access-key>\",\n    \"SessionToken\": \"<session-token>\",\n    \"Expiration\": \"2025-06-01T13:15:22Z\"\n  },\n  \"AssumedRoleUser\": {\n    \"AssumedRoleId\": \"AROAEXAMPLEID:app-session\",\n    \"Arn\": \"arn:aws:sts::111111111111:assumed-role/CrossAccountS3Read/app-session\"\n  }\n}",
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
  {
    id: "sec60",
    domain: "security-and-compliance",
    text: "A security team wants to find IAM roles and users across the organization that have not been used for 90 days, as well as permissions that were granted but never exercised, so it can remove them. Which capability meets this need with the LEAST operational effort?",
    options: [
      { id: "a", text: "IAM Access Analyzer unused access analyzer" },
      { id: "b", text: "Amazon Inspector network reachability findings" },
      { id: "c", text: "AWS Trusted Advisor service limit checks" },
      { id: "d", text: "Amazon Macie sensitive data discovery" },
    ],
    correctOptionIds: ["a"],
    explanation: "IAM Access Analyzer can create an unused access analyzer that continuously generates findings for unused roles, unused access keys and passwords, and unused permissions across an account or organization, helping teams move toward least privilege.",
    optionRationale: {
      a: "An unused access analyzer reports roles, credentials, and permissions that have not been used within a configurable tracking period, which is exactly what the team wants.",
      b: "Inspector network reachability findings show which ports on EC2 instances are reachable from the internet; they say nothing about IAM usage.",
      c: "Trusted Advisor service limit checks track quota usage, not IAM permission usage.",
      d: "Macie discovers sensitive data in Amazon S3; it does not analyze IAM access patterns.",
    },
    referenceUrl: "https://docs.aws.amazon.com/IAM/latest/UserGuide/access-analyzer-unused-access.html",
    referenceLabel: "Findings for unused access - IAM Access Analyzer",
    consoleUrl: "https://console.aws.amazon.com/access-analyzer/home",
    consoleLabel: "IAM > Access Analyzer",
    diagram: `flowchart LR
  A[Unused access analyzer] --> B[Scans IAM roles and users]
  B --> C[Unused role finding]
  B --> D[Unused access key finding]
  B --> E[Unused permission finding]
  C --> F[Security team removes access]
  D --> F
  E --> F`,
    cliExample: {
      description: "Create an unused access analyzer with a 90-day tracking period for the whole organization",
      command: "aws accessanalyzer create-analyzer --analyzer-name org-unused-access --type ORGANIZATION_UNUSED_ACCESS --configuration '{\"unusedAccess\":{\"unusedAccessAge\":90}}'",
      sampleOutput: "{\n  \"arn\": \"arn:aws:access-analyzer:us-east-1:123456789012:analyzer/org-unused-access\"\n}",
    },
  },
  {
    id: "sec61",
    domain: "security-and-compliance",
    text: "An administrator creates a new IAM user and does not attach any policy or add the user to any group. The user signs in and tries to list Amazon S3 buckets. What happens and why?",
    options: [
      { id: "a", text: "The request is denied because IAM denies all requests by default unless an applicable policy explicitly allows them" },
      { id: "b", text: "The request succeeds because new IAM users inherit the permissions of the root user" },
      { id: "c", text: "The request succeeds because listing buckets is a read-only action that is always permitted" },
      { id: "d", text: "The request is denied only if an explicit Deny statement exists somewhere in the account" },
    ],
    correctOptionIds: ["a"],
    explanation: "IAM policy evaluation starts from an implicit deny. A request is allowed only if an applicable identity-based or resource-based policy contains an Allow and no explicit Deny applies. A brand-new user with no policies has no Allow, so every request is implicitly denied.",
    optionRationale: {
      a: "Correct: by default all requests are implicitly denied; an explicit Allow is required and an explicit Deny always overrides it.",
      b: "IAM users never inherit root user permissions; they start with no permissions at all.",
      c: "There is no set of actions that is always permitted; even read-only actions need an Allow.",
      d: "An explicit Deny is not required for a request to fail; the absence of an Allow (implicit deny) is enough.",
    },
    referenceUrl: "https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic.html",
    referenceLabel: "Policy evaluation logic - IAM User Guide",
    consoleUrl: "https://console.aws.amazon.com/iam/home#/users",
    consoleLabel: "IAM > Users",
    diagram: `flowchart TD
  A[Request from new IAM user] --> B{Explicit Deny?}
  B -->|Yes| C[Denied]
  B -->|No| D{Any Allow in applicable policies?}
  D -->|Yes| E[Allowed]
  D -->|No| F[Implicit deny - request fails]`,
    cliExample: {
      description: "Simulate whether the user can call s3:ListAllMyBuckets before granting anything",
      command: "aws iam simulate-principal-policy --policy-source-arn arn:aws:iam::123456789012:user/new-analyst --action-names s3:ListAllMyBuckets",
      sampleOutput: "{\n  \"EvaluationResults\": [\n    {\n      \"EvalActionName\": \"s3:ListAllMyBuckets\",\n      \"EvalResourceName\": \"*\",\n      \"EvalDecision\": \"implicitDeny\",\n      \"MatchedStatements\": [],\n      \"MissingContextValues\": []\n    }\n  ]\n}",
    },
  },
  {
    id: "sec62",
    domain: "security-and-compliance",
    text: "A company must demonstrate that its AWS accounts are configured according to the CIS AWS Foundations Benchmark and wants automated, continuously updated checks with a compliance score rather than a one-time manual review. Which approach should it take?",
    options: [
      { id: "a", text: "Enable the CIS AWS Foundations Benchmark standard in AWS Security Hub" },
      { id: "b", text: "Download the CIS benchmark PDF from AWS Artifact and review each account manually" },
      { id: "c", text: "Run Amazon Inspector against all EC2 instances once per quarter" },
      { id: "d", text: "Enable Amazon GuardDuty in every account" },
    ],
    correctOptionIds: ["a"],
    explanation: "Security Hub provides security standards such as the CIS AWS Foundations Benchmark, AWS Foundational Security Best Practices, PCI DSS, and NIST. Enabling a standard runs automated controls continuously and produces a security score per standard.",
    optionRationale: {
      a: "Security Hub standards run automated controls (backed by AWS Config rules) continuously and report pass/fail status and an overall score.",
      b: "AWS Artifact provides AWS's own compliance reports; it does not automate checks of your account configuration.",
      c: "Inspector finds software vulnerabilities and network exposure on workloads; it does not evaluate account-level CIS controls such as root MFA or CloudTrail settings.",
      d: "GuardDuty is a threat detection service and does not evaluate configuration compliance against benchmarks.",
    },
    referenceUrl: "https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-standards.html",
    referenceLabel: "Security standards in Security Hub",
    consoleUrl: "https://console.aws.amazon.com/securityhub/home#/standards",
    consoleLabel: "Security Hub > Security standards",
    diagram: `flowchart LR
  A[Security Hub] --> B[CIS AWS Foundations Benchmark]
  A --> C[AWS Foundational Security Best Practices]
  A --> D[PCI DSS]
  B --> E[Automated controls via AWS Config]
  E --> F[Pass or Fail findings]
  F --> G[Security score per standard]`,
    cliExample: {
      description: "List the security standards available to enable in Security Hub",
      command: "aws securityhub describe-standards --query 'Standards[].{Name:Name,Arn:StandardsArn}'",
      sampleOutput: "[\n  {\n    \"Name\": \"CIS AWS Foundations Benchmark v1.4.0\",\n    \"Arn\": \"arn:aws:securityhub:us-east-1::standards/cis-aws-foundations-benchmark/v/1.4.0\"\n  },\n  {\n    \"Name\": \"AWS Foundational Security Best Practices v1.0.0\",\n    \"Arn\": \"arn:aws:securityhub:us-east-1::standards/aws-foundational-security-best-practices/v/1.0.0\"\n  },\n  {\n    \"Name\": \"PCI DSS v3.2.1\",\n    \"Arn\": \"arn:aws:securityhub:us-east-1::standards/pci-dss/v/3.2.1\"\n  }\n]",
    },
  },
  {
    id: "sec63",
    domain: "security-and-compliance",
    text: "A compliance team spends weeks before every audit manually collecting evidence such as CloudTrail logs, IAM configurations, and AWS Config snapshots and mapping them to controls in frameworks like SOC 2 and PCI DSS. Which AWS service automates this evidence collection and produces audit-ready assessment reports?",
    options: [
      { id: "a", text: "AWS Audit Manager" },
      { id: "b", text: "AWS Artifact" },
      { id: "c", text: "AWS Trusted Advisor" },
      { id: "d", text: "Amazon Detective" },
    ],
    correctOptionIds: ["a"],
    explanation: "AWS Audit Manager continuously collects evidence from AWS services, maps it to controls in prebuilt or custom frameworks, and generates assessment reports to simplify audit preparation.",
    optionRationale: {
      a: "Audit Manager automates evidence collection and organizes it by framework control, producing assessment reports for auditors.",
      b: "AWS Artifact lets you download AWS's compliance reports about AWS itself; it does not collect evidence from your own account.",
      c: "Trusted Advisor gives best-practice recommendations, not framework-mapped audit evidence.",
      d: "Detective helps investigate security findings by analyzing log data; it is not an audit evidence tool.",
    },
    referenceUrl: "https://docs.aws.amazon.com/audit-manager/latest/userguide/what-is.html",
    referenceLabel: "What is AWS Audit Manager?",
    consoleUrl: "https://console.aws.amazon.com/auditmanager/home",
    consoleLabel: "AWS Audit Manager",
    diagram: `flowchart LR
  A[CloudTrail] --> D[AWS Audit Manager]
  B[AWS Config] --> D
  C[Security Hub] --> D
  D --> E[Evidence mapped to framework controls]
  E --> F[Assessment report for auditors]`,
    cliExample: {
      description: "List the prebuilt frameworks available in Audit Manager",
      command: "aws auditmanager list-assessment-frameworks --framework-type Standard --max-results 3",
      sampleOutput: "{\n  \"frameworkMetadataList\": [\n    {\n      \"id\": \"11111111-2222-3333-4444-555555555555\",\n      \"type\": \"Standard\",\n      \"name\": \"PCI DSS V3.2.1\",\n      \"controlsCount\": 245,\n      \"controlSetsCount\": 12\n    },\n    {\n      \"id\": \"66666666-7777-8888-9999-000000000000\",\n      \"type\": \"Standard\",\n      \"name\": \"SOC 2\",\n      \"controlsCount\": 61,\n      \"controlSetsCount\": 5\n    }\n  ]\n}",
    },
  },
  {
    id: "sec64",
    domain: "security-and-compliance",
    text: "A healthcare startup is about to store protected health information on AWS and its lawyers require a signed Business Associate Addendum (BAA) with AWS. How can the company accept the BAA?",
    options: [
      { id: "a", text: "Accept the AWS BAA online through the Agreements section of AWS Artifact" },
      { id: "b", text: "Open a support case and request that AWS mail a paper contract" },
      { id: "c", text: "Enable the HIPAA standard in AWS Security Hub, which automatically signs the BAA" },
      { id: "d", text: "A BAA is not needed because AWS is responsible for HIPAA compliance of all workloads" },
    ],
    correctOptionIds: ["a"],
    explanation: "AWS Artifact Agreements lets customers review, accept, and manage agreements such as the Business Associate Addendum for a single account or for all accounts in an AWS Organization.",
    optionRationale: {
      a: "Artifact Agreements is the self-service place to accept the AWS BAA, either per account or organization-wide from the management account.",
      b: "AWS does not require paper contracts for the BAA; it is accepted electronically in Artifact.",
      c: "Security Hub runs automated security checks; it cannot sign legal agreements.",
      d: "Under the shared responsibility model the customer remains responsible for HIPAA compliance of its workloads and must have a BAA in place before storing PHI.",
    },
    referenceUrl: "https://docs.aws.amazon.com/artifact/latest/ug/managing-agreements.html",
    referenceLabel: "Managing agreements in AWS Artifact",
    consoleUrl: "https://console.aws.amazon.com/artifact/home#/agreements",
    consoleLabel: "AWS Artifact > Agreements",
    diagram: `flowchart LR
  A[Healthcare startup] --> B[AWS Artifact Agreements]
  B --> C[Review BAA terms]
  C --> D[Accept for account or organization]
  D --> E[Store PHI in HIPAA-eligible services]`,
    cliExample: {
      description: "List the agreements available to accept in AWS Artifact",
      command: "aws artifact list-customer-agreements --query 'customerAgreements[].{Name:name,State:state}'",
      sampleOutput: "[\n  {\n    \"Name\": \"AWS Business Associate Addendum\",\n    \"State\": \"ACTIVE\"\n  },\n  {\n    \"Name\": \"AWS Australian Notifiable Data Breach Addendum\",\n    \"State\": \"ACTIVE\"\n  }\n]",
    },
  },
  {
    id: "sec65",
    domain: "security-and-compliance",
    text: "A company's security policy states that every new Amazon EBS volume and snapshot created in a Region must be encrypted, without relying on engineers to tick an encryption checkbox each time. What is the SIMPLEST way to enforce this?",
    options: [
      { id: "a", text: "Enable EBS encryption by default in the EC2 settings for the Region" },
      { id: "b", text: "Write a Lambda function that deletes any unencrypted volume it finds" },
      { id: "c", text: "Require all instances to use instance store volumes instead" },
      { id: "d", text: "Attach a KMS key policy that denies the creation of unencrypted volumes" },
    ],
    correctOptionIds: ["a"],
    explanation: "EBS encryption by default is a per-Region account setting. Once enabled, all new EBS volumes and snapshot copies are automatically encrypted with the chosen KMS key, with no changes to launch workflows.",
    optionRationale: {
      a: "This account-level, per-Region setting ensures every new volume is encrypted automatically using the default KMS key.",
      b: "A cleanup function is reactive and destructive; it does not prevent unencrypted volumes from being created.",
      c: "Instance store is ephemeral storage and is not a substitute for persistent EBS volumes.",
      d: "KMS key policies control who can use a key; they cannot force EBS to encrypt volumes.",
    },
    referenceUrl: "https://docs.aws.amazon.com/ebs/latest/userguide/EBSEncryption.html",
    referenceLabel: "Amazon EBS encryption",
    consoleUrl: "https://console.aws.amazon.com/ec2/home#Settings:",
    consoleLabel: "EC2 > Settings > EBS encryption",
    diagram: `flowchart LR
  A[Enable EBS encryption by default] --> B[Region-level account setting]
  B --> C[New EBS volume]
  B --> D[New snapshot copy]
  C --> E[Encrypted with KMS key automatically]
  D --> E`,
    cliExample: {
      description: "Turn on EBS encryption by default for the current Region",
      command: "aws ec2 enable-ebs-encryption-by-default --region us-east-1",
      sampleOutput: "{\n  \"EbsEncryptionByDefault\": true\n}",
    },
  },
  {
    id: "sec66",
    domain: "security-and-compliance",
    text: "An application on EC2 instances in a private subnet reads and writes objects in Amazon S3. Security policy prohibits the traffic from traversing the public internet, and the company does not want to pay for a NAT gateway just for S3 access. Which solution meets these requirements?",
    options: [
      { id: "a", text: "Create a gateway VPC endpoint for Amazon S3 and add a route to it in the private subnet's route table" },
      { id: "b", text: "Attach an internet gateway to the VPC and give the instances public IP addresses" },
      { id: "c", text: "Set up an AWS Site-to-Site VPN between the VPC and Amazon S3" },
      { id: "d", text: "Enable S3 Transfer Acceleration on the bucket" },
    ],
    correctOptionIds: ["a"],
    explanation: "A gateway VPC endpoint for S3 lets resources in a VPC reach S3 privately over the AWS network with no internet gateway, NAT device, or VPN, and it has no additional charge.",
    optionRationale: {
      a: "Gateway endpoints for S3 and DynamoDB route traffic privately via the route table and are free of charge.",
      b: "This exposes the instances to the internet and sends S3 traffic over the public path, violating the policy.",
      c: "Site-to-Site VPN connects on-premises networks to a VPC; S3 is not a VPN endpoint.",
      d: "Transfer Acceleration speeds up long-distance uploads via edge locations; it still uses the public internet.",
    },
    referenceUrl: "https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints-s3.html",
    referenceLabel: "Gateway endpoints for Amazon S3",
    consoleUrl: "https://console.aws.amazon.com/vpcconsole/home#Endpoints:",
    consoleLabel: "VPC > Endpoints",
    diagram: `flowchart LR
  A[EC2 in private subnet] --> B[Route table entry pl-s3]
  B --> C[Gateway VPC endpoint]
  C --> D[Amazon S3]
  A -.-x E[Internet gateway or NAT not used]`,
    cliExample: {
      description: "Create a gateway endpoint for S3 attached to the private route table",
      command: "aws ec2 create-vpc-endpoint --vpc-id vpc-0a1b2c3d4e5f67890 --service-name com.amazonaws.us-east-1.s3 --vpc-endpoint-type Gateway --route-table-ids rtb-0123456789abcdef0",
      sampleOutput: "{\n  \"VpcEndpoint\": {\n    \"VpcEndpointId\": \"vpce-0fedcba9876543210\",\n    \"VpcEndpointType\": \"Gateway\",\n    \"VpcId\": \"vpc-0a1b2c3d4e5f67890\",\n    \"ServiceName\": \"com.amazonaws.us-east-1.s3\",\n    \"State\": \"available\",\n    \"RouteTableIds\": [\n      \"rtb-0123456789abcdef0\"\n    ],\n    \"CreationTimestamp\": \"2026-03-14T09:12:44.000Z\",\n    \"OwnerId\": \"123456789012\"\n  }\n}",
    },
  },
  {
    id: "sec67",
    domain: "security-and-compliance",
    text: "A company must evaluate 40 AWS accounts against a common set of operational best-practice rules, such as encrypted storage and enabled logging, and wants to deploy those rules as a single, versioned package rather than configuring dozens of individual rules per account. Which AWS Config feature should it use?",
    options: [
      { id: "a", text: "AWS Config conformance packs" },
      { id: "b", text: "AWS Config configuration snapshots" },
      { id: "c", text: "AWS Config aggregators only" },
      { id: "d", text: "AWS CloudFormation drift detection" },
    ],
    correctOptionIds: ["a"],
    explanation: "A conformance pack is a collection of AWS Config rules and remediation actions packaged as a single YAML template that can be deployed to an account, a Region, or across an entire AWS Organization.",
    optionRationale: {
      a: "Conformance packs bundle many Config rules and remediation actions into one deployable, versioned unit, with sample packs for common frameworks.",
      b: "Configuration snapshots are point-in-time exports of resource configurations, not rule packages.",
      c: "Aggregators collect Config data from multiple accounts into one view, but they do not deploy rules.",
      d: "CloudFormation drift detection compares a stack with its template; it does not evaluate compliance rules across accounts.",
    },
    referenceUrl: "https://docs.aws.amazon.com/config/latest/developerguide/conformance-packs.html",
    referenceLabel: "Conformance packs - AWS Config",
    consoleUrl: "https://console.aws.amazon.com/config/home#/conformance-packs",
    consoleLabel: "AWS Config > Conformance packs",
    diagram: `flowchart LR
  A[Conformance pack YAML template] --> B[Deploy to organization]
  B --> C[Account 1 Config rules]
  B --> D[Account 2 Config rules]
  B --> E[Account 40 Config rules]
  C --> F[Compliance score per pack]
  D --> F
  E --> F`,
    cliExample: {
      description: "Check the compliance summary of a deployed conformance pack",
      command: "aws configservice get-conformance-pack-compliance-summary --conformance-pack-names operational-best-practices-for-s3",
      sampleOutput: "{\n  \"ConformancePackComplianceSummaryList\": [\n    {\n      \"ConformancePackName\": \"operational-best-practices-for-s3\",\n      \"ConformancePackComplianceStatus\": \"NON_COMPLIANT\"\n    }\n  ]\n}",
    },
  },
  {
    id: "sec68",
    domain: "security-and-compliance",
    text: "A security team needs to run SQL-style queries across several years of API activity from all accounts in its organization, for example to find every principal that called DeleteBucket in 2025, without building its own log pipeline in Amazon Athena. Which AWS feature is designed for this?",
    options: [
      { id: "a", text: "AWS CloudTrail Lake event data stores" },
      { id: "b", text: "Amazon CloudWatch Logs metric filters" },
      { id: "c", text: "AWS Config configuration history" },
      { id: "d", text: "Amazon Inspector findings export" },
    ],
    correctOptionIds: ["a"],
    explanation: "CloudTrail Lake is a managed data lake for CloudTrail events. It stores events in immutable event data stores with retention of up to ten years and lets you run SQL queries on them directly, with no separate S3, Glue, or Athena setup.",
    optionRationale: {
      a: "CloudTrail Lake ingests events into event data stores and exposes a SQL query interface, including across an entire organization.",
      b: "Metric filters count log patterns for alarms; they are not a long-term query engine for API history.",
      c: "Config history tracks resource configuration changes, not who called which API.",
      d: "Inspector reports vulnerabilities and does not store API activity.",
    },
    referenceUrl: "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-lake.html",
    referenceLabel: "Working with AWS CloudTrail Lake",
    consoleUrl: "https://console.aws.amazon.com/cloudtrailv2/home#/lake",
    consoleLabel: "CloudTrail > Lake",
    diagram: `flowchart LR
  A[Management and data events] --> B[CloudTrail Lake event data store]
  B --> C[Retention up to 10 years]
  B --> D[SQL query]
  D --> E[Who called DeleteBucket in 2025]`,
    cliExample: {
      description: "Start a SQL query against a CloudTrail Lake event data store",
      command: "aws cloudtrail start-query --query-statement \"SELECT userIdentity.arn, eventTime FROM 3f4a1b2c-1234-5678-9abc-def012345678 WHERE eventName = 'DeleteBucket' AND eventTime > '2025-01-01 00:00:00'\"",
      sampleOutput: "{\n  \"QueryId\": \"9c8b7a6d-5e4f-4321-8765-4321fedcba98\"\n}",
    },
  },
  {
    id: "sec69",
    domain: "security-and-compliance",
    text: "A company uses AWS Organizations and wants to (1) prevent member accounts from launching resources outside approved Regions and (2) ensure every resource is tagged with a CostCenter key using a standard set of allowed values. Which TWO Organizations policy types address these two requirements respectively?",
    options: [
      { id: "a", text: "A service control policy (SCP) that denies actions when the requested Region is not in the approved list" },
      { id: "b", text: "A tag policy that defines the CostCenter key, its capitalization, and its allowed values" },
      { id: "c", text: "A backup policy that restricts backup vaults to approved Regions" },
      { id: "d", text: "An AI services opt-out policy applied to the root" },
      { id: "e", text: "An IAM permissions boundary attached to the management account root user" },
    ],
    correctOptionIds: ["a", "b"],
    explanation: "SCPs set the maximum permissions available in member accounts and are commonly used to deny actions outside approved Regions. Tag policies standardize tag keys and values across accounts and can report or enforce non-compliant tags.",
    optionRationale: {
      a: "SCPs with a condition on aws:RequestedRegion are the standard way to restrict Regions organization-wide.",
      b: "Tag policies define allowed tag keys, capitalization, and values, and can prevent non-compliant tagging operations on supported resources.",
      c: "Backup policies centrally manage AWS Backup plans; they do not restrict where general resources are launched.",
      d: "AI services opt-out policies control whether AWS AI services may store or use your content; unrelated to Regions or tags.",
      e: "Permissions boundaries apply to IAM users and roles, not to the root user, and do not work across accounts.",
    },
    referenceUrl: "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_tag-policies.html",
    referenceLabel: "Tag policies - AWS Organizations",
    consoleUrl: "https://console.aws.amazon.com/organizations/v2/home/policies",
    consoleLabel: "AWS Organizations > Policies",
    diagram: `flowchart TD
  A[AWS Organizations root] --> B[SCP - deny outside approved Regions]
  A --> C[Tag policy - CostCenter allowed values]
  B --> D[Member account]
  C --> D
  D --> E[Launch blocked in unapproved Region]
  D --> F[Non-compliant tag reported or blocked]`,
    cliExample: {
      description: "List the tag policies attached in the organization",
      command: "aws organizations list-policies --filter TAG_POLICY",
      sampleOutput: "{\n  \"Policies\": [\n    {\n      \"Id\": \"p-costcenter01\",\n      \"Arn\": \"arn:aws:organizations::123456789012:policy/o-exampleorgid/tag_policy/p-costcenter01\",\n      \"Name\": \"CostCenterStandard\",\n      \"Description\": \"Require CostCenter tag with approved values\",\n      \"Type\": \"TAG_POLICY\",\n      \"AwsManaged\": false\n    }\n  ]\n}",
    },
  },
  {
    id: "sec70",
    domain: "security-and-compliance",
    text: "A company is setting up its first multi-account AWS environment and wants a prescriptive landing zone with preconfigured guardrails, such as disallowing public S3 buckets and requiring CloudTrail, that are applied automatically to every new account it provisions. Which service provides this?",
    options: [
      { id: "a", text: "AWS Control Tower" },
      { id: "b", text: "AWS Config alone" },
      { id: "c", text: "AWS Service Catalog alone" },
      { id: "d", text: "AWS Trusted Advisor" },
    ],
    correctOptionIds: ["a"],
    explanation: "AWS Control Tower builds a landing zone on top of AWS Organizations and applies preventive, detective, and proactive controls (formerly called guardrails) to organizational units, so accounts created through Account Factory are governed from day one.",
    optionRationale: {
      a: "Control Tower automates landing zone setup, account provisioning through Account Factory, and enforces controls such as blocking public S3 access or requiring CloudTrail.",
      b: "AWS Config provides detective rules but does not set up an organization, OUs, or preventive controls by itself.",
      c: "Service Catalog manages approved product templates; Control Tower uses it under the hood for Account Factory but Service Catalog alone does not provide guardrails.",
      d: "Trusted Advisor offers recommendations; it cannot enforce controls on new accounts.",
    },
    referenceUrl: "https://docs.aws.amazon.com/controltower/latest/userguide/controls.html",
    referenceLabel: "About controls in AWS Control Tower",
    consoleUrl: "https://console.aws.amazon.com/controltower/home",
    consoleLabel: "AWS Control Tower",
    diagram: `flowchart TD
  A[AWS Control Tower landing zone] --> B[Security OU]
  A --> C[Workloads OU]
  A --> D[Account Factory]
  D --> E[New account]
  C --> E
  E --> F[Preventive controls via SCP]
  E --> G[Detective controls via Config rules]`,
    cliExample: {
      description: "List the controls enabled on an organizational unit managed by Control Tower",
      command: "aws controltower list-enabled-controls --target-identifier arn:aws:organizations::123456789012:ou/o-exampleorgid/ou-abcd-11112222",
      sampleOutput: "{\n  \"enabledControls\": [\n    {\n      \"controlIdentifier\": \"arn:aws:controltower:us-east-1::control/AWS-GR_RESTRICTED_PUBLIC_BUCKETS\",\n      \"statusSummary\": {\n        \"status\": \"SUCCEEDED\"\n      }\n    },\n    {\n      \"controlIdentifier\": \"arn:aws:controltower:us-east-1::control/AWS-GR_CLOUDTRAIL_ENABLED\",\n      \"statusSummary\": {\n        \"status\": \"SUCCEEDED\"\n      }\n    }\n  ]\n}",
    },
  },
  {
    id: "sec71",
    domain: "security-and-compliance",
    text: "A developer is building a document-sharing application and needs fine-grained, policy-based authorization inside the app, for example allowing a user to edit a document only if they are its owner or in its editors group. The team wants a managed service instead of hard-coding these rules. Which AWS service is designed for this?",
    options: [
      { id: "a", text: "Amazon Verified Permissions" },
      { id: "b", text: "AWS IAM Identity Center" },
      { id: "c", text: "AWS Certificate Manager" },
      { id: "d", text: "Amazon Cognito user pools alone" },
    ],
    correctOptionIds: ["a"],
    explanation: "Amazon Verified Permissions is a scalable, fine-grained authorization service for custom applications. Developers write policies in the Cedar language and the application calls the service to make allow or deny decisions for its own resources.",
    optionRationale: {
      a: "Verified Permissions externalizes application-level authorization decisions using Cedar policies, integrating with identity providers like Cognito.",
      b: "IAM Identity Center manages workforce sign-in to AWS accounts and applications; it does not authorize actions on your application's own documents.",
      c: "Certificate Manager provisions TLS certificates and is unrelated to authorization logic.",
      d: "Cognito user pools handle authentication (who the user is); they do not evaluate fine-grained permission policies for application resources.",
    },
    referenceUrl: "https://docs.aws.amazon.com/verifiedpermissions/latest/userguide/what-is-avp.html",
    referenceLabel: "What is Amazon Verified Permissions?",
    consoleUrl: "https://console.aws.amazon.com/verifiedpermissions/home",
    consoleLabel: "Amazon Verified Permissions",
    diagram: `flowchart LR
  A[User signs in via Cognito] --> B[Application]
  B --> C[IsAuthorized request]
  C --> D[Verified Permissions policy store]
  D --> E[Cedar policies]
  E --> F[Allow or Deny decision]
  F --> B`,
    cliExample: {
      description: "Ask Verified Permissions whether a user may edit a document",
      command: "aws verifiedpermissions is-authorized --policy-store-id PSEXAMPLEabcdefg123456 --principal entityType=User,entityId=alice --action actionType=Action,actionId=EditDocument --resource entityType=Document,entityId=doc-42",
      sampleOutput: "{\n  \"decision\": \"ALLOW\",\n  \"determiningPolicies\": [\n    {\n      \"policyId\": \"SPEXAMPLEabcdefg123456\"\n    }\n  ],\n  \"errors\": []\n}",
    },
  },
  {
    id: "sec72",
    domain: "security-and-compliance",
    text: "A company wants to guarantee that only code packages digitally signed by its release team can be deployed to its production AWS Lambda functions, and that any unsigned or tampered package is rejected at deployment time. Which service should it use with Lambda code signing?",
    options: [
      { id: "a", text: "AWS Signer" },
      { id: "b", text: "AWS Certificate Manager" },
      { id: "c", text: "AWS Secrets Manager" },
      { id: "d", text: "Amazon Inspector" },
    ],
    correctOptionIds: ["a"],
    explanation: "AWS Signer is a managed code-signing service. A Lambda code signing configuration references a Signer signing profile, and Lambda then validates that deployment packages are signed by a trusted publisher and unaltered, rejecting or warning on failures.",
    optionRationale: {
      a: "Signer produces signatures for Lambda deployment packages and container images; Lambda code signing configurations enforce them.",
      b: "Certificate Manager issues TLS certificates for endpoints; it does not sign application code.",
      c: "Secrets Manager stores and rotates secrets; it has no code-signing capability.",
      d: "Inspector scans Lambda functions for vulnerabilities after deployment but does not validate signatures.",
    },
    referenceUrl: "https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html",
    referenceLabel: "Configuring code signing for AWS Lambda",
    consoleUrl: "https://console.aws.amazon.com/signer/home",
    consoleLabel: "AWS Signer",
    diagram: `flowchart LR
  A[Release team builds package] --> B[AWS Signer signing profile]
  B --> C[Signed deployment package]
  C --> D[Lambda code signing configuration]
  D -->|Signature valid| E[Deployment allowed]
  D -->|Unsigned or tampered| F[Deployment rejected]`,
    cliExample: {
      description: "Create a Signer signing profile for Lambda deployment packages",
      command: "aws signer put-signing-profile --profile-name prod-release-team --platform-id AWSLambda-SHA384-ECDSA",
      sampleOutput: "{\n  \"arn\": \"arn:aws:signer:us-east-1:123456789012:/signing-profiles/prod-release-team\",\n  \"profileVersion\": \"a1b2c3d4e5\",\n  \"profileVersionArn\": \"arn:aws:signer:us-east-1:123456789012:/signing-profiles/prod-release-team/a1b2c3d4e5\"\n}",
    },
  },
  {
    id: "sec73",
    domain: "security-and-compliance",
    text: "A company runs 300 EC2 instances across Linux and Windows and must apply operating system security patches on a scheduled maintenance window and report which instances are missing critical patches. Which AWS capability provides this with the LEAST custom scripting?",
    options: [
      { id: "a", text: "AWS Systems Manager Patch Manager with patch baselines and maintenance windows" },
      { id: "b", text: "Amazon Inspector network reachability analysis" },
      { id: "c", text: "AWS CloudFormation change sets" },
      { id: "d", text: "Amazon EC2 Auto Scaling instance refresh" },
    ],
    correctOptionIds: ["a"],
    explanation: "Systems Manager Patch Manager automates scanning and installing OS patches on managed instances according to patch baselines, runs during maintenance windows, and reports patch compliance for each instance.",
    optionRationale: {
      a: "Patch Manager handles patch selection via baselines, scheduling via maintenance windows, and compliance reporting for both Linux and Windows.",
      b: "Inspector can identify vulnerable software and open network paths but does not install patches.",
      c: "Change sets preview infrastructure changes to a stack; they are unrelated to OS patching.",
      d: "Instance refresh replaces instances with a new AMI; it does not scan or report missing patches on running instances.",
    },
    referenceUrl: "https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager.html",
    referenceLabel: "AWS Systems Manager Patch Manager",
    consoleUrl: "https://console.aws.amazon.com/systems-manager/patch-manager",
    consoleLabel: "Systems Manager > Patch Manager",
    diagram: `flowchart LR
  A[Patch baseline] --> C[Patch Manager]
  B[Maintenance window] --> C
  C --> D[Scan managed instances]
  D --> E[Install approved patches]
  E --> F[Patch compliance report]`,
    cliExample: {
      description: "Summarize patch compliance across managed instances",
      command: "aws ssm describe-patch-group-state --patch-group Production",
      sampleOutput: "{\n  \"Instances\": 300,\n  \"InstancesWithInstalledPatches\": 284,\n  \"InstancesWithInstalledOtherPatches\": 12,\n  \"InstancesWithInstalledPendingRebootPatches\": 9,\n  \"InstancesWithMissingPatches\": 16,\n  \"InstancesWithFailedPatches\": 2,\n  \"InstancesWithNotApplicablePatches\": 0,\n  \"InstancesWithUnreportedNotApplicablePatches\": 0,\n  \"InstancesWithCriticalNonCompliantPatches\": 7,\n  \"InstancesWithSecurityNonCompliantPatches\": 11,\n  \"InstancesWithOtherNonCompliantPatches\": 3\n}",
    },
  },
  {
    id: "sec74",
    domain: "security-and-compliance",
    text: "A company that processes credit card payments and also sells to US federal agencies is evaluating AWS. Which TWO statements about AWS compliance programs are correct?",
    options: [
      { id: "a", text: "AWS is certified as a PCI DSS Level 1 service provider, but the customer must still validate its own cardholder data environment" },
      { id: "b", text: "AWS GovCloud (US) Regions and many commercial services hold FedRAMP authorizations that federal workloads can inherit controls from" },
      { id: "c", text: "Deploying any workload on AWS automatically makes that workload PCI DSS compliant" },
      { id: "d", text: "AWS compliance certifications only cover Regions in the United States" },
      { id: "e", text: "Customers must hire an AWS-approved auditor before they are allowed to store card data on AWS" },
    ],
    correctOptionIds: ["a", "b"],
    explanation: "AWS inherits many controls to customers through certifications such as PCI DSS Level 1 and FedRAMP, but compliance is shared: customers remain responsible for the compliance of what they build on AWS.",
    optionRationale: {
      a: "AWS is a PCI DSS Level 1 service provider; customers inherit infrastructure controls but must validate their own applications, network segmentation, and processes.",
      b: "AWS services hold FedRAMP Moderate and High authorizations (High in GovCloud US), letting agencies leverage those authorizations.",
      c: "Compliance is shared; using AWS does not make an application compliant on its own.",
      d: "AWS holds global certifications such as ISO 27001 and regional ones across many Regions, not only the US.",
      e: "There is no AWS-approved auditor requirement; customers use their own Qualified Security Assessors as PCI requires.",
    },
    referenceUrl: "https://aws.amazon.com/compliance/programs/",
    referenceLabel: "AWS Compliance Programs",
    consoleUrl: "https://console.aws.amazon.com/artifact/home#/reports",
    consoleLabel: "AWS Artifact > Reports",
    diagram: `flowchart LR
  A[AWS compliance programs] --> B[PCI DSS Level 1]
  A --> C[FedRAMP Moderate and High]
  A --> D[ISO 27001 and SOC]
  B --> E[Customer inherits infrastructure controls]
  E --> F[Customer validates its own workload]`,
    cliExample: {
      description: "List compliance reports available for download in AWS Artifact",
      command: "aws artifact list-reports --max-results 3 --query 'reports[].{Name:name,Category:category}'",
      sampleOutput: "[\n  {\n    \"Name\": \"PCI DSS Attestation of Compliance and Responsibility Summary\",\n    \"Category\": \"Certifications and Attestations\"\n  },\n  {\n    \"Name\": \"FedRAMP Moderate Customer Package\",\n    \"Category\": \"Certifications and Attestations\"\n  },\n  {\n    \"Name\": \"ISO 27001 Certification\",\n    \"Category\": \"Certifications and Attestations\"\n  }\n]",
    },
  },
  {
    id: "sec75",
    domain: "security-and-compliance",
    text: "A company migrates an application from EC2 instances to AWS Lambda functions. Under the AWS Shared Responsibility Model, which TWO security tasks remain the customer's responsibility after the migration?",
    options: [
      { id: "a", text: "Writing secure function code and keeping its third-party libraries up to date" },
      { id: "b", text: "Configuring the IAM execution role with least-privilege permissions" },
      { id: "c", text: "Patching the operating system of the servers that run the functions" },
      { id: "d", text: "Maintaining the physical security of the data centers hosting Lambda" },
      { id: "e", text: "Patching the Lambda runtime environment and its underlying Firecracker microVMs" },
    ],
    correctOptionIds: ["a", "b"],
    explanation: "With Lambda, AWS manages the infrastructure, operating system, and runtime environment. The customer remains responsible for the code it deploys, its dependencies, the function's IAM permissions, and how data is handled and encrypted.",
    optionRationale: {
      a: "Application code and bundled dependencies are always the customer's responsibility in any service model.",
      b: "The execution role and resource-based policies for the function are configured by the customer.",
      c: "AWS manages and patches the underlying compute for Lambda; the customer has no OS to patch.",
      d: "Physical data center security is always AWS's responsibility.",
      e: "AWS maintains the managed runtimes and microVM isolation, though customers must choose a supported runtime version.",
    },
    referenceUrl: "https://docs.aws.amazon.com/lambda/latest/dg/lambda-security.html",
    referenceLabel: "Security in AWS Lambda",
    consoleUrl: "https://console.aws.amazon.com/lambda/home#/functions",
    consoleLabel: "Lambda > Functions",
    diagram: `flowchart TD
  A[Shared responsibility for Lambda] --> B[AWS]
  A --> C[Customer]
  B --> D[Physical hosts and network]
  B --> E[OS and runtime patching]
  B --> F[MicroVM isolation]
  C --> G[Function code and libraries]
  C --> H[IAM execution role]
  C --> I[Data encryption and secrets]`,
    cliExample: {
      description: "Inspect a function's runtime and execution role to confirm customer-managed settings",
      command: "aws lambda get-function-configuration --function-name order-processor --query '{Runtime:Runtime,Role:Role,LastModified:LastModified}'",
      sampleOutput: "{\n  \"Runtime\": \"python3.12\",\n  \"Role\": \"arn:aws:iam::123456789012:role/order-processor-exec-role\",\n  \"LastModified\": \"2026-04-02T11:20:35.000+0000\"\n}",
    },
  },
  {
    id: "sec76",
    domain: "security-and-compliance",
    text: "A company's on-premises servers are receiving a brute-force SSH attack and its firewall logs show the source IP addresses belong to Amazon EC2. The company is not an AWS customer. What is the appropriate way to report this activity to AWS?",
    options: [
      { id: "a", text: "Submit the details, including source IPs, timestamps, and logs, through the AWS abuse report form or by emailing the AWS Trust and Safety team" },
      { id: "b", text: "Open an AWS Support case, which requires purchasing a Business Support plan first" },
      { id: "c", text: "Enable Amazon GuardDuty, which will automatically notify AWS about the attacker" },
      { id: "d", text: "Nothing can be done because AWS does not accept reports from non-customers" },
    ],
    correctOptionIds: ["a"],
    explanation: "Anyone, customer or not, can report suspected abuse originating from AWS resources to the AWS Trust and Safety team using the online abuse report form or the abuse email address, providing logs with source IPs and timestamps so AWS can investigate.",
    optionRationale: {
      a: "The AWS abuse reporting process is open to the public and asks for evidence such as IPs, timestamps in UTC, and log excerpts.",
      b: "Abuse reports do not go through paid support cases and do not require an AWS account or support plan.",
      c: "GuardDuty monitors your own AWS account for threats; it cannot be used by a non-customer and does not file abuse reports.",
      d: "AWS explicitly accepts abuse reports from anyone affected by activity originating from AWS.",
    },
    referenceUrl: "https://aws.amazon.com/premiumsupport/knowledge-center/report-aws-abuse/",
    referenceLabel: "How do I report abuse of AWS resources?",
    consoleUrl: "https://console.aws.amazon.com/support/home",
    consoleLabel: "AWS Support Center",
    diagram: `flowchart LR
  A[Victim collects firewall logs] --> B[AWS abuse report form]
  B --> C[AWS Trust and Safety team]
  C --> D[Investigates AWS customer resource]
  D --> E[Notifies owner or takes action]`,
    cliExample: {
      description: "From your own account, check GuardDuty for signs that your instances are the source of outbound brute-force attacks",
      command: "aws guardduty list-findings --detector-id 12abc34d567e8fa901bc2d34e56789f0 --finding-criteria '{\"Criterion\":{\"type\":{\"Eq\":[\"UnauthorizedAccess:EC2/SSHBruteForce\"]}}}'",
      sampleOutput: "{\n  \"FindingIds\": [\n    \"7ab1c2d3e4f5a6b7c8d9e0f1a2b3c4d5\"\n  ]\n}",
    },
  },
  {
    id: "sec77",
    domain: "security-and-compliance",
    text: "A security architect asks how AWS isolates customer workloads from one another and from AWS operators on modern EC2 instances, and how the hypervisor attack surface is minimized. Which AWS technology provides this hardware-based isolation with dedicated security chips and no operator access to customer memory?",
    options: [
      { id: "a", text: "The AWS Nitro System" },
      { id: "b", text: "AWS CloudHSM" },
      { id: "c", text: "Amazon Macie" },
      { id: "d", text: "AWS Shield Advanced" },
    ],
    correctOptionIds: ["a"],
    explanation: "The AWS Nitro System offloads virtualization, networking, and storage to dedicated hardware and uses a lightweight hypervisor plus the Nitro Security Chip, providing a locked-down environment in which not even AWS operators can access customer instance memory.",
    optionRationale: {
      a: "Nitro offloads functions to dedicated cards, uses a minimal hypervisor, and its security chip prohibits administrative access, enabling features like Nitro Enclaves.",
      b: "CloudHSM provides dedicated hardware security modules for key storage; it is not the EC2 virtualization platform.",
      c: "Macie discovers sensitive data in S3 and is unrelated to instance isolation.",
      d: "Shield Advanced protects against DDoS attacks, not hypervisor-level isolation.",
    },
    referenceUrl: "https://aws.amazon.com/ec2/nitro/",
    referenceLabel: "AWS Nitro System",
    consoleUrl: "https://console.aws.amazon.com/ec2/home#InstanceTypes:",
    consoleLabel: "EC2 > Instance Types",
    diagram: `flowchart LR
  A[AWS Nitro System] --> B[Nitro Cards - network storage offload]
  A --> C[Nitro Security Chip]
  A --> D[Nitro Hypervisor - minimal attack surface]
  C --> E[No operator access to customer memory]
  A --> F[Nitro Enclaves for isolated compute]`,
    cliExample: {
      description: "Check whether an instance type is built on the Nitro hypervisor",
      command: "aws ec2 describe-instance-types --instance-types m6i.large --query 'InstanceTypes[].{Type:InstanceType,Hypervisor:Hypervisor,NitroEnclaves:NitroEnclavesSupport}'",
      sampleOutput: "[\n  {\n    \"Type\": \"m6i.large\",\n    \"Hypervisor\": \"nitro\",\n    \"NitroEnclaves\": \"supported\"\n  }\n]",
    },
  },
  {
    id: "sec78",
    domain: "security-and-compliance",
    text: "A public login API behind an Application Load Balancer is being hit by credential-stuffing bots that send thousands of requests per minute from many IP addresses. The company also wants baseline protection against common exploits without writing its own rules. Which TWO AWS WAF features should it use?",
    options: [
      { id: "a", text: "A rate-based rule that temporarily blocks any IP exceeding a request threshold in a five-minute window" },
      { id: "b", text: "AWS Managed Rules rule groups such as the Core rule set and the Bot Control rule group" },
      { id: "c", text: "Enabling VPC Flow Logs on the ALB subnets" },
      { id: "d", text: "Placing the ALB in a private subnet with no internet gateway" },
      { id: "e", text: "Attaching an AWS Network Firewall policy to the ALB listener" },
    ],
    correctOptionIds: ["a", "b"],
    explanation: "Rate-based rules automatically block source IPs that exceed a request rate, which throttles automated credential-stuffing. AWS Managed Rules provide curated rule groups maintained by AWS, including baseline protection and Bot Control, without custom rule writing.",
    optionRationale: {
      a: "Rate-based rules count requests per IP over a rolling window and block IPs above the limit until the rate drops.",
      b: "Managed rule groups are pre-built and updated by AWS to cover common threats and known bad bots.",
      c: "Flow logs only record metadata for troubleshooting; they do not block requests.",
      d: "A public login API must be reachable from the internet, so a private subnet breaks the application.",
      e: "Network Firewall inspects VPC traffic at the subnet level and cannot be attached to an ALB listener; WAF is the layer 7 web protection service.",
    },
    referenceUrl: "https://docs.aws.amazon.com/waf/latest/developerguide/waf-rule-statement-type-rate-based.html",
    referenceLabel: "Rate-based rule statement - AWS WAF",
    consoleUrl: "https://console.aws.amazon.com/wafv2/homev2/web-acls",
    consoleLabel: "WAF & Shield > Web ACLs",
    diagram: `flowchart LR
  A[Bots and users] --> B[AWS WAF web ACL]
  B --> C[Rate-based rule - block IPs over limit]
  B --> D[AWS Managed Rules - Core rule set]
  B --> E[Bot Control rule group]
  C --> F[Application Load Balancer]
  D --> F
  E --> F`,
    cliExample: {
      description: "List the AWS Managed Rules rule groups available for a regional web ACL",
      command: "aws wafv2 list-available-managed-rule-groups --scope REGIONAL --query 'ManagedRuleGroups[?VendorName==`AWS`].Name | [0:3]'",
      sampleOutput: "[\n  \"AWSManagedRulesCommonRuleSet\",\n  \"AWSManagedRulesKnownBadInputsRuleSet\",\n  \"AWSManagedRulesBotControlRuleSet\"\n]",
    },
  },
  {
    id: "sec79",
    domain: "security-and-compliance",
    text: "An administrator has written a new IAM policy and wants to confirm, before attaching it to users, exactly which API actions it will allow or deny, including how it interacts with existing service control policies and permissions boundaries. Which tool should the administrator use?",
    options: [
      { id: "a", text: "IAM Policy Simulator" },
      { id: "b", text: "AWS CloudTrail" },
      { id: "c", text: "Amazon Inspector" },
      { id: "d", text: "AWS Config" },
    ],
    correctOptionIds: ["a"],
    explanation: "The IAM Policy Simulator evaluates a set of policies against chosen actions and resources and reports allow or deny results, taking SCPs, permissions boundaries, and resource policies into account, without making real API calls.",
    optionRationale: {
      a: "The Policy Simulator tests policies safely before deployment and explains which statement produced each decision.",
      b: "CloudTrail records what actually happened after the fact; it cannot predict a policy's effect.",
      c: "Inspector scans for software vulnerabilities, not IAM policy behavior.",
      d: "AWS Config tracks resource configuration changes rather than simulating permissions.",
    },
    referenceUrl: "https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_testing-policies.html",
    referenceLabel: "Testing IAM Policies with the Policy Simulator",
    consoleUrl: "https://policysim.aws.amazon.com/",
    consoleLabel: "IAM Policy Simulator",
    diagram: "flowchart LR\n  Policy[Draft IAM policy] --> Sim[Policy Simulator]\n  SCP[SCPs and boundaries] --> Sim\n  Sim --> Result[Allowed or denied per action]\n  Result --> Attach[Attach with confidence]",
    cliExample: {
      description: "Simulate whether a user could delete an S3 bucket under their current policies",
      command: "aws iam simulate-principal-policy --policy-source-arn arn:aws:iam::123456789012:user/alice --action-names s3:DeleteBucket --resource-arns arn:aws:s3:::finance-records",
      sampleOutput: "{\n  \"EvaluationResults\": [\n    {\n      \"EvalActionName\": \"s3:DeleteBucket\",\n      \"EvalResourceName\": \"arn:aws:s3:::finance-records\",\n      \"EvalDecision\": \"implicitDeny\",\n      \"MatchedStatements\": []\n    }\n  ]\n}",
    },
  },
  {
    id: "sec80",
    domain: "security-and-compliance",
    text: "A company runs dozens of internal microservices that must use TLS to communicate with each other, but the endpoints are private and will never be reached from the public internet. It wants to issue and manage its own certificates from a managed private certificate authority instead of buying public certificates. Which AWS service should it use?",
    options: [
      { id: "a", text: "AWS Private Certificate Authority (AWS Private CA)" },
      { id: "b", text: "AWS Key Management Service (AWS KMS)" },
      { id: "c", text: "AWS Secrets Manager" },
      { id: "d", text: "Amazon Cognito" },
    ],
    correctOptionIds: ["a"],
    explanation: "AWS Private CA is a managed private certificate authority that issues private X.509 certificates for internal resources, integrated with AWS Certificate Manager for deployment to load balancers and other services.",
    optionRationale: {
      a: "Private CA lets you run a CA hierarchy without on-premises HSMs and issue certificates trusted only inside your organization.",
      b: "KMS manages encryption keys and signing keys but is not a certificate authority.",
      c: "Secrets Manager stores and rotates credentials; it does not issue certificates.",
      d: "Cognito provides user authentication for applications, not TLS certificates for services.",
    },
    referenceUrl: "https://aws.amazon.com/private-ca/",
    referenceLabel: "AWS Private Certificate Authority",
    consoleUrl: "https://console.aws.amazon.com/acm-pca/home",
    consoleLabel: "AWS Private CA",
    diagram: "flowchart LR\n  RootCA[Private root CA] --> SubCA[Subordinate CA]\n  SubCA --> Cert[Private certificate]\n  Cert --> ALB[Internal ALB]\n  Cert --> Svc[Microservice mTLS]",
    cliExample: {
      description: "List private certificate authorities in the account",
      command: "aws acm-pca list-certificate-authorities --query \"CertificateAuthorities[].{Arn:Arn,Status:Status,Type:Type}\"",
      sampleOutput: "[\n  {\n    \"Arn\": \"arn:aws:acm-pca:us-east-1:123456789012:certificate-authority/12345678-1234-1234-1234-123456789012\",\n    \"Status\": \"ACTIVE\",\n    \"Type\": \"SUBORDINATE\"\n  }\n]",
    },
  },
  {
    id: "sec81",
    domain: "security-and-compliance",
    text: "A web application stores customer invoices in a private Amazon S3 bucket. When a customer clicks 'Download', the application must give that user temporary access to only their own invoice for a few minutes, without making the bucket public or creating an IAM user for each customer. Which approach should be used?",
    options: [
      { id: "a", text: "Generate an S3 presigned URL for the object that expires after a short time" },
      { id: "b", text: "Enable public read on the bucket and rely on unguessable object names" },
      { id: "c", text: "Create an IAM user per customer and email them access keys" },
      { id: "d", text: "Disable S3 Block Public Access for the invoices prefix" },
    ],
    correctOptionIds: ["a"],
    explanation: "A presigned URL is signed with the application's credentials and grants time-limited access to a specific object; anyone with the URL can perform the permitted operation until it expires, and the bucket stays private.",
    optionRationale: {
      a: "Presigned URLs give scoped, expiring access to one object with no change to bucket permissions.",
      b: "Public read exposes all invoices to anyone; obscure names are not a security control.",
      c: "Long-lived per-customer IAM users are unmanageable and violate least privilege.",
      d: "Block Public Access is a safeguard that should stay enabled; turning it off does not solve per-user access.",
    },
    referenceUrl: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/ShareObjectPreSignedURL.html",
    referenceLabel: "Sharing Objects with Presigned URLs",
    consoleUrl: "https://console.aws.amazon.com/s3/home",
    consoleLabel: "Amazon S3",
    diagram: "sequenceDiagram\n  participant U as Customer\n  participant App as Application\n  participant S3 as Private S3 bucket\n  U->>App: Click Download\n  App->>App: Sign URL for invoice.pdf, expires 5 min\n  App-->>U: Presigned URL\n  U->>S3: GET with signature\n  S3-->>U: invoice.pdf",
    cliExample: {
      description: "Create a presigned URL valid for five minutes",
      command: "aws s3 presign s3://customer-invoices/2026/inv-10422.pdf --expires-in 300",
      sampleOutput: "https://customer-invoices.s3.amazonaws.com/2026/inv-10422.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIOSFODNN7EXAMPLE%2F20260917%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260917T023000Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=EXAMPLE",
    },
  },
  {
    id: "sec82",
    domain: "security-and-compliance",
    text: "A company runs Microsoft Active Directory on-premises and is moving Windows file servers and applications to AWS. It wants those AWS workloads to keep authenticating against a managed Active Directory in the cloud that trusts the existing on-premises domain. Which AWS service should it use?",
    options: [
      { id: "a", text: "AWS Directory Service for Microsoft Active Directory (AWS Managed Microsoft AD)" },
      { id: "b", text: "Amazon Cognito user pools" },
      { id: "c", text: "AWS Identity and Access Management (IAM) groups" },
      { id: "d", text: "AWS Secrets Manager" },
    ],
    correctOptionIds: ["a"],
    explanation: "AWS Managed Microsoft AD is an actual Microsoft Active Directory running on AWS-managed domain controllers. It supports trust relationships with on-premises AD and integrates with Amazon FSx for Windows, EC2 Windows, RDS for SQL Server, and IAM Identity Center.",
    optionRationale: {
      a: "Managed Microsoft AD provides real AD in the cloud with trusts to on-premises domains, exactly what Windows workloads need.",
      b: "Cognito user pools authenticate application end users, not Windows servers or domain-joined resources.",
      c: "IAM groups control AWS API permissions and are not a directory for Windows authentication.",
      d: "Secrets Manager stores secrets; it is not an identity directory.",
    },
    referenceUrl: "https://aws.amazon.com/directoryservice/",
    referenceLabel: "AWS Directory Service",
    consoleUrl: "https://console.aws.amazon.com/directoryservicev2/home",
    consoleLabel: "Directory Service",
    diagram: "flowchart LR\n  OnPrem[On-premises AD] <-. trust .-> MAD[AWS Managed Microsoft AD]\n  MAD --> EC2[Domain-joined EC2 Windows]\n  MAD --> FSx[FSx for Windows File Server]\n  MAD --> IdC[IAM Identity Center]",
    cliExample: {
      description: "List directories managed by AWS Directory Service",
      command: "aws ds describe-directories --query \"DirectoryDescriptions[].{Id:DirectoryId,Name:Name,Type:Type,Stage:Stage}\"",
      sampleOutput: "[\n  {\n    \"Id\": \"d-9067a1b2c3\",\n    \"Name\": \"corp.example.com\",\n    \"Type\": \"MicrosoftAD\",\n    \"Stage\": \"Active\"\n  }\n]",
    },
  },
  {
    id: "sec83",
    domain: "security-and-compliance",
    text: "An audit finds that several developers use IAM user access keys created three years ago in scripts on their laptops. The security team wants to reduce the risk from these long-lived credentials. Which TWO actions are AWS best practices?",
    options: [
      { id: "a", text: "Replace long-term access keys with temporary credentials obtained through AWS IAM Identity Center or IAM roles" },
      { id: "b", text: "Rotate any remaining access keys regularly and remove keys that are unused" },
      { id: "c", text: "Share one set of access keys across the whole team so there is only one key to protect" },
      { id: "d", text: "Store the access keys in the application source code repository so they are versioned" },
    ],
    correctOptionIds: ["a", "b"],
    explanation: "AWS recommends using temporary credentials (via IAM Identity Center, roles, or STS) wherever possible, and for any long-term keys that remain, rotating them regularly and deleting unused keys, which the IAM credential report and last-used data help identify.",
    optionRationale: {
      a: "Temporary credentials expire automatically, so a leaked credential has limited value; Identity Center provides them for CLI and SDK use.",
      b: "Regular rotation and removal of unused keys shrink the window of exposure for any compromised key.",
      c: "Shared credentials destroy accountability and widen the impact of a single leak.",
      d: "Committing secrets to source control is a common cause of credential exposure and is never recommended.",
    },
    referenceUrl: "https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html",
    referenceLabel: "Security Best Practices in IAM",
    consoleUrl: "https://console.aws.amazon.com/iam/home#/security_credentials",
    consoleLabel: "IAM > Security credentials",
    diagram: "flowchart TD\n  Keys[3-year-old access keys] --> Replace[Use temporary credentials via Identity Center or roles]\n  Keys --> Rotate[Rotate remaining keys]\n  Keys --> Remove[Delete unused keys]",
    cliExample: {
      description: "Find when each of a user's access keys was last used to decide whether to rotate or delete them",
      command: "aws iam get-access-key-last-used --access-key-id AKIAIOSFODNN7EXAMPLE",
      sampleOutput: "{\n  \"UserName\": \"dev-bob\",\n  \"AccessKeyLastUsed\": {\n    \"LastUsedDate\": \"2024-01-09T14:22:31+00:00\",\n    \"ServiceName\": \"s3\",\n    \"Region\": \"us-east-1\"\n  }\n}",
    },
  },
  {
    id: "sec84",
    domain: "security-and-compliance",
    text: "A security team learns that malware on compromised EC2 instances typically exfiltrates data by resolving attacker-controlled domain names. It wants to block DNS queries from all VPCs to a list of known malicious domains, and log any attempts. Which AWS feature provides this?",
    options: [
      { id: "a", text: "Amazon Route 53 Resolver DNS Firewall" },
      { id: "b", text: "Network ACL deny rules" },
      { id: "c", text: "AWS WAF rate-based rules" },
      { id: "d", text: "Amazon CloudFront geo restriction" },
    ],
    correctOptionIds: ["a"],
    explanation: "Route 53 Resolver DNS Firewall lets you create domain lists and rules that block, alert on, or allow outbound DNS queries from your VPCs, including AWS-managed lists of malicious domains, with logging to CloudWatch or S3.",
    optionRationale: {
      a: "DNS Firewall filters queries at the VPC resolver, which is where domain-based blocking belongs.",
      b: "Network ACLs filter by IP address and port, not domain name.",
      c: "WAF protects inbound HTTP requests to your web applications; it does not inspect outbound DNS.",
      d: "CloudFront geo restriction limits which countries can access your content; it is unrelated to DNS from EC2.",
    },
    referenceUrl: "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-dns-firewall.html",
    referenceLabel: "Route 53 Resolver DNS Firewall",
    consoleUrl: "https://console.aws.amazon.com/route53resolver/home#/dns-firewall",
    consoleLabel: "Route 53 > DNS Firewall",
    diagram: "flowchart LR\n  EC2[Compromised EC2] -->|query evil.example| Resolver[Route 53 Resolver]\n  Resolver --> FW{DNS Firewall rule}\n  FW -->|domain on block list| Block[BLOCK and log]\n  FW -->|allowed| DNS[Resolve normally]",
    cliExample: {
      description: "List DNS Firewall rule groups configured in the Region",
      command: "aws route53resolver list-firewall-rule-groups --query \"FirewallRuleGroups[].{Name:Name,Id:Id,Status:Status}\"",
      sampleOutput: "[\n  {\n    \"Name\": \"block-malware-domains\",\n    \"Id\": \"rslvr-frg-0a1b2c3d4e5f6a7b8\",\n    \"Status\": \"COMPLETE\"\n  }\n]",
    },
  },
  {
    id: "sec85",
    domain: "security-and-compliance",
    text: "A company wants remote employees to reach internal web applications hosted in its VPCs without a VPN. Every request should be evaluated against the user's identity and the security posture of their device before access is granted, following a zero trust model. Which AWS service is designed for this?",
    options: [
      { id: "a", text: "AWS Verified Access" },
      { id: "b", text: "AWS Site-to-Site VPN" },
      { id: "c", text: "AWS Direct Connect" },
      { id: "d", text: "Amazon GuardDuty" },
    ],
    correctOptionIds: ["a"],
    explanation: "AWS Verified Access provides VPN-less, per-request access to corporate applications by evaluating identity (from an IdP such as IAM Identity Center or Okta) and device trust signals against fine-grained access policies.",
    optionRationale: {
      a: "Verified Access implements zero trust principles, granting application access only after each request passes identity and device checks.",
      b: "Site-to-Site VPN connects networks, not individual users, and does not evaluate device posture per request.",
      c: "Direct Connect is a dedicated network link from a data center, unrelated to remote user access.",
      d: "GuardDuty detects threats; it does not broker application access.",
    },
    referenceUrl: "https://aws.amazon.com/verified-access/",
    referenceLabel: "AWS Verified Access",
    consoleUrl: "https://console.aws.amazon.com/vpcconsole/home#VerifiedAccessInstances:",
    consoleLabel: "VPC > Verified Access",
    diagram: "flowchart LR\n  User[Remote employee] --> VA[Verified Access endpoint]\n  IdP[Identity provider] --> VA\n  Device[Device trust provider] --> VA\n  VA -->|policy passes| App[Internal web app in VPC]",
    cliExample: {
      description: "List Verified Access instances in the account",
      command: "aws ec2 describe-verified-access-instances --query \"VerifiedAccessInstances[].{Id:VerifiedAccessInstanceId,Description:Description}\"",
      sampleOutput: "[\n  {\n    \"Id\": \"vai-0a1b2c3d4e5f6a7b8\",\n    \"Description\": \"corp-internal-apps\"\n  }\n]",
    },
  },
  {
    id: "sec86",
    domain: "security-and-compliance",
    text: "A company's policy requires that its finance team can call AWS APIs only from the corporate office network, whose public IP range is 203.0.113.0/24. Which IAM mechanism enforces this requirement?",
    options: [
      { id: "a", text: "A policy Condition element using the aws:SourceIp global condition key" },
      { id: "b", text: "A security group inbound rule allowing 203.0.113.0/24" },
      { id: "c", text: "A Route 53 geolocation routing policy" },
      { id: "d", text: "A service control policy that lists allowed Regions" },
    ],
    correctOptionIds: ["a"],
    explanation: "IAM policies support a Condition block; the aws:SourceIp key restricts the statement to requests originating from specified IP ranges, and it can be combined with an explicit Deny for requests from anywhere else.",
    optionRationale: {
      a: "Conditions with aws:SourceIp let you allow or deny API calls based on the caller's source IP address.",
      b: "Security groups control network traffic to resources such as EC2 instances, not who may call AWS APIs.",
      c: "Route 53 routing policies direct DNS traffic and have no effect on IAM authorization.",
      d: "Region restrictions in SCPs limit where resources can be used, not where requests originate.",
    },
    referenceUrl: "https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_condition-keys.html#condition-keys-sourceip",
    referenceLabel: "IAM Global Condition Keys – aws:SourceIp",
    consoleUrl: "https://console.aws.amazon.com/iam/home#/policies",
    consoleLabel: "IAM > Policies",
    diagram: "flowchart LR\n  Req[API request] --> Check{aws:SourceIp in 203.0.113.0/24?}\n  Check -->|yes| Allow[Allow]\n  Check -->|no| Deny[Explicit Deny]",
    cliExample: {
      description: "Create a customer-managed policy that denies all actions unless the request comes from the office IP range",
      command: "aws iam create-policy --policy-name DenyOutsideOffice --policy-document '{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Deny\",\"Action\":\"*\",\"Resource\":\"*\",\"Condition\":{\"NotIpAddress\":{\"aws:SourceIp\":\"203.0.113.0/24\"}}}]}'",
      sampleOutput: "{\n  \"Policy\": {\n    \"PolicyName\": \"DenyOutsideOffice\",\n    \"Arn\": \"arn:aws:iam::123456789012:policy/DenyOutsideOffice\",\n    \"DefaultVersionId\": \"v1\",\n    \"IsAttachable\": true\n  }\n}",
    },
  },
  {
    id: "sec87",
    domain: "security-and-compliance",
    text: "A company has AWS CloudTrail enabled with a multi-Region trail. An investigator asks for a record of every GetObject and PutObject call made against a sensitive S3 bucket last month, but the trail shows only bucket creation and policy changes. Why is the object-level activity missing, and how can it be captured?",
    options: [
      { id: "a", text: "By default trails record management events only; the company must enable S3 data events for the bucket" },
      { id: "b", text: "CloudTrail cannot log S3 activity; the company must use Amazon Macie instead" },
      { id: "c", text: "Object-level calls are only recorded if the bucket is public" },
      { id: "d", text: "Data events are logged automatically but retained for only 24 hours" },
    ],
    correctOptionIds: ["a"],
    explanation: "CloudTrail separates management events (control-plane operations such as CreateBucket) from data events (high-volume data-plane operations such as S3 GetObject and Lambda Invoke). Data events are off by default and must be enabled on the trail, with additional charges.",
    optionRationale: {
      a: "Enabling S3 data events for the bucket makes CloudTrail record object-level reads and writes going forward.",
      b: "CloudTrail can log S3 object-level API calls as data events; Macie classifies sensitive data rather than logging API activity.",
      c: "Bucket visibility has no bearing on which events CloudTrail records.",
      d: "Data events are not automatic, and once enabled they are retained per your S3 lifecycle or event data store settings, not 24 hours.",
    },
    referenceUrl: "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/logging-data-events-with-cloudtrail.html",
    referenceLabel: "Logging Data Events with CloudTrail",
    consoleUrl: "https://console.aws.amazon.com/cloudtrailv2/home#/trails",
    consoleLabel: "CloudTrail > Trails",
    diagram: "flowchart TD\n  CT[CloudTrail trail] --> Mgmt[Management events: default ON]\n  CT --> Data[Data events: default OFF]\n  Mgmt --> Ex1[CreateBucket, PutBucketPolicy]\n  Data --> Ex2[GetObject, PutObject, Lambda Invoke]",
    cliExample: {
      description: "Enable S3 data event logging for a specific bucket on an existing trail",
      command: "aws cloudtrail put-event-selectors --trail-name org-trail --event-selectors '[{\"ReadWriteType\":\"All\",\"IncludeManagementEvents\":true,\"DataResources\":[{\"Type\":\"AWS::S3::Object\",\"Values\":[\"arn:aws:s3:::sensitive-data/\"]}]}]'",
      sampleOutput: "{\n  \"TrailARN\": \"arn:aws:cloudtrail:us-east-1:123456789012:trail/org-trail\",\n  \"EventSelectors\": [\n    {\n      \"ReadWriteType\": \"All\",\n      \"IncludeManagementEvents\": true,\n      \"DataResources\": [\n        {\n          \"Type\": \"AWS::S3::Object\",\n          \"Values\": [\n            \"arn:aws:s3:::sensitive-data/\"\n          ]\n        }\n      ]\n    }\n  ]\n}",
    },
  },
  {
    id: "sec88",
    domain: "security-and-compliance",
    text: "A bank's policy states that certain records must be encrypted before they leave the bank's own systems, so that AWS never has access to the plaintext data or the keys that can decrypt it, even though the ciphertext will be stored in Amazon S3. Which approach satisfies this policy?",
    options: [
      { id: "a", text: "Client-side encryption using keys the bank manages, before uploading the objects to S3" },
      { id: "b", text: "Server-side encryption with Amazon S3 managed keys (SSE-S3)" },
      { id: "c", text: "Server-side encryption with AWS KMS keys (SSE-KMS)" },
      { id: "d", text: "Enabling HTTPS on the S3 bucket endpoint" },
    ],
    correctOptionIds: ["a"],
    explanation: "With client-side encryption the customer encrypts data in its own environment (for example with the AWS Encryption SDK or the S3 Encryption Client) using keys it controls, so S3 only ever stores ciphertext and AWS cannot decrypt it.",
    optionRationale: {
      a: "Encrypting before upload with customer-held keys keeps both plaintext and decryption keys outside AWS.",
      b: "With SSE-S3, AWS manages the keys and performs encryption after receiving the plaintext object.",
      c: "SSE-KMS still has S3 receive plaintext over TLS and encrypt it with keys held in KMS, which does not meet the stated policy.",
      d: "HTTPS protects data in transit only; S3 would still receive and store the data unencrypted at rest without a server-side option.",
    },
    referenceUrl: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingClientSideEncryption.html",
    referenceLabel: "Protecting Data with Client-Side Encryption",
    consoleUrl: "https://console.aws.amazon.com/s3/home",
    consoleLabel: "Amazon S3",
    diagram: "flowchart LR\n  Plain[Plaintext record] --> Enc[Encrypt on-premises with bank key]\n  Enc --> Cipher[Ciphertext]\n  Cipher --> S3[Stored in S3]\n  Key[Bank-managed key] -. never sent .-> S3",
    cliExample: {
      description: "Upload an object that was already encrypted locally; S3 stores it as opaque ciphertext",
      command: "aws s3 cp ./records-2026-09.enc s3://bank-archive/records/2026-09.enc --metadata x-encryption=client-side",
      sampleOutput: "upload: ./records-2026-09.enc to s3://bank-archive/records/2026-09.enc",
    },
  },
  {
    id: "sec89",
    domain: "security-and-compliance",
    text: "A central networking account owns a VPC with subnets and an AWS Transit Gateway. Application teams in other accounts of the same AWS Organization need to launch resources into those subnets and attach to the transit gateway without each account creating its own copies. Which service enables this sharing securely?",
    options: [
      { id: "a", text: "AWS Resource Access Manager (AWS RAM)" },
      { id: "b", text: "AWS IAM Access Analyzer" },
      { id: "c", text: "Amazon VPC peering" },
      { id: "d", text: "AWS Control Tower" },
    ],
    correctOptionIds: ["a"],
    explanation: "AWS RAM lets you share supported resources such as VPC subnets, Transit Gateways, Route 53 Resolver rules, and License Manager configurations with other accounts or the whole organization, while the owning account keeps control.",
    optionRationale: {
      a: "RAM is the purpose-built service for sharing resources across accounts and organizational units.",
      b: "IAM Access Analyzer reports on resources shared with external entities; it does not perform the sharing.",
      c: "VPC peering connects separate VPCs; it does not let another account launch resources into your subnets.",
      d: "Control Tower sets up governed multi-account environments but is not the mechanism for sharing individual resources.",
    },
    referenceUrl: "https://aws.amazon.com/ram/",
    referenceLabel: "AWS Resource Access Manager",
    consoleUrl: "https://console.aws.amazon.com/ram/home",
    consoleLabel: "AWS RAM",
    diagram: "flowchart LR\n  Net[Networking account] -->|shares via RAM| Share[Resource share: subnets, TGW]\n  Share --> A[App account A launches EC2 in shared subnet]\n  Share --> B[App account B attaches to TGW]",
    cliExample: {
      description: "Create a resource share that offers a subnet to the whole organization",
      command: "aws ram create-resource-share --name shared-app-subnets --resource-arns arn:aws:ec2:us-east-1:111122223333:subnet/subnet-0a1b2c3d4e5f6a7b8 --principals arn:aws:organizations::111122223333:organization/o-exampleorgid",
      sampleOutput: "{\n  \"resourceShare\": {\n    \"resourceShareArn\": \"arn:aws:ram:us-east-1:111122223333:resource-share/7ab63972-b505-7e2a-8a1b-3c4d5e6f7a8b\",\n    \"name\": \"shared-app-subnets\",\n    \"owningAccountId\": \"111122223333\",\n    \"allowExternalPrincipals\": false,\n    \"status\": \"ACTIVE\"\n  }\n}",
    },
  },
  {
    id: "sec90",
    domain: "security-and-compliance",
    text: "After a ransomware incident at a peer company, a security team wants to guarantee that backups stored in AWS cannot be deleted or have their retention shortened by anyone, including an administrator whose credentials are stolen, until the retention period ends. Which feature provides this?",
    options: [
      { id: "a", text: "AWS Backup Vault Lock" },
      { id: "b", text: "Amazon EBS snapshot sharing" },
      { id: "c", text: "AWS Backup on-demand backup jobs" },
      { id: "d", text: "Amazon S3 Transfer Acceleration" },
    ],
    correctOptionIds: ["a"],
    explanation: "AWS Backup Vault Lock enforces a write-once-read-many (WORM) policy on a backup vault. In compliance mode, once the grace period passes, no user, including the root user, can delete recovery points or change the lock until retention expires.",
    optionRationale: {
      a: "Vault Lock makes recovery points immutable, which is precisely the ransomware protection described.",
      b: "Sharing snapshots with other accounts does not prevent deletion in the source account.",
      c: "On-demand backups create recovery points but do nothing to protect them from deletion.",
      d: "Transfer Acceleration speeds uploads to S3 and is unrelated to backup immutability.",
    },
    referenceUrl: "https://docs.aws.amazon.com/aws-backup/latest/devguide/vault-lock.html",
    referenceLabel: "AWS Backup Vault Lock",
    consoleUrl: "https://console.aws.amazon.com/backup/home#/backupvaults",
    consoleLabel: "AWS Backup > Vaults",
    diagram: "flowchart LR\n  Backup[Recovery points] --> Vault[Backup vault]\n  Vault --> Lock[Vault Lock compliance mode]\n  Admin[Compromised admin] -->|delete| Lock\n  Lock --> Denied[Denied until retention ends]",
    cliExample: {
      description: "Apply a Vault Lock requiring at least 1 year of retention, with a 3-day grace period before it becomes immutable",
      command: "aws backup put-backup-vault-lock-configuration --backup-vault-name prod-vault --min-retention-days 365 --changeable-for-days 3",
      sampleOutput: "",
    },
  },
  {
    id: "sec91",
    domain: "security-and-compliance",
    text: "A company serves images from an Amazon S3 bucket through Amazon CloudFront. It discovers that users are bypassing CloudFront and fetching objects directly from the S3 URL, avoiding the WAF rules attached to the distribution. How can the company ensure the bucket only serves requests that come through CloudFront?",
    options: [
      { id: "a", text: "Configure CloudFront origin access control (OAC) and update the bucket policy to allow only that CloudFront distribution" },
      { id: "b", text: "Enable S3 Versioning on the bucket" },
      { id: "c", text: "Move the objects to the S3 Glacier Deep Archive storage class" },
      { id: "d", text: "Attach a security group to the S3 bucket allowing only CloudFront IP addresses" },
    ],
    correctOptionIds: ["a"],
    explanation: "Origin access control lets CloudFront sign requests to a private S3 origin. With a bucket policy that grants access only to the CloudFront service principal for that distribution, direct S3 requests are denied.",
    optionRationale: {
      a: "OAC plus a restrictive bucket policy makes CloudFront the sole path to the objects, so WAF rules always apply.",
      b: "Versioning preserves object history; it does not restrict who can read objects.",
      c: "Deep Archive changes cost and retrieval time, not access control.",
      d: "Security groups apply to resources inside a VPC such as EC2; S3 buckets do not use them.",
    },
    referenceUrl: "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html",
    referenceLabel: "Restricting Access to an S3 Origin",
    consoleUrl: "https://console.aws.amazon.com/cloudfront/v4/home#/originaccess",
    consoleLabel: "CloudFront > Origin access",
    diagram: "flowchart LR\n  User --> CF[CloudFront + WAF]\n  CF -->|signed by OAC| S3[Private S3 bucket]\n  User -->|direct request| S3\n  S3 -->|bucket policy| Deny[Access Denied]",
    cliExample: {
      description: "Create an origin access control for S3 origins",
      command: "aws cloudfront create-origin-access-control --origin-access-control-config Name=images-oac,SigningProtocol=sigv4,SigningBehavior=always,OriginAccessControlOriginType=s3",
      sampleOutput: "{\n  \"OriginAccessControl\": {\n    \"Id\": \"E2QWRUHAPOMQZL\",\n    \"OriginAccessControlConfig\": {\n      \"Name\": \"images-oac\",\n      \"SigningProtocol\": \"sigv4\",\n      \"SigningBehavior\": \"always\",\n      \"OriginAccessControlOriginType\": \"s3\"\n    }\n  }\n}",
    },
  },
  {
    id: "sec92",
    domain: "security-and-compliance",
    text: "A US defense contractor must host workloads that are subject to International Traffic in Arms Regulations (ITAR) and FedRAMP High, and it requires that the infrastructure be operated only by US persons on US soil. Which AWS offering is designed for this requirement?",
    options: [
      { id: "a", text: "AWS GovCloud (US) Regions" },
      { id: "b", text: "AWS Local Zones" },
      { id: "c", text: "Any US commercial Region with AWS Artifact reports" },
      { id: "d", text: "AWS Outposts in the contractor's data center" },
    ],
    correctOptionIds: ["a"],
    explanation: "AWS GovCloud (US) Regions are isolated Regions designed to host sensitive data and regulated workloads, operated by employees who are US citizens on US soil, supporting ITAR, FedRAMP High, DoD SRG, and CJIS requirements.",
    optionRationale: {
      a: "GovCloud (US) is purpose-built for US government compliance regimes such as ITAR and FedRAMP High.",
      b: "Local Zones extend a commercial Region closer to users; they do not change operator citizenship requirements.",
      c: "Commercial Regions hold many certifications, but ITAR's US-person operator requirement is specifically met by GovCloud.",
      d: "Outposts brings AWS hardware on-premises but is still managed from a parent commercial Region.",
    },
    referenceUrl: "https://aws.amazon.com/govcloud-us/",
    referenceLabel: "AWS GovCloud (US)",
    consoleUrl: "https://console.amazonaws-us-gov.com/",
    consoleLabel: "AWS GovCloud (US) Console",
    diagram: "flowchart TD\n  Req[ITAR + FedRAMP High] --> Gov[AWS GovCloud US-East / US-West]\n  Gov --> Ops[US persons on US soil]\n  Gov --> Iso[Isolated from commercial Regions]",
    cliExample: {
      description: "List the GovCloud Regions using a GovCloud-partition profile",
      command: "aws ec2 describe-regions --profile govcloud --region us-gov-west-1 --query \"Regions[].RegionName\"",
      sampleOutput: "[\n  \"us-gov-east-1\",\n  \"us-gov-west-1\"\n]",
    },
  },
  {
    id: "sec93",
    domain: "security-and-compliance",
    text: "A company with 40 accounts in AWS Organizations wants its security team, working from a dedicated security account, to see and manage Amazon GuardDuty and AWS Security Hub findings for every account in one place, without logging in to each account or using the management account for daily work. What should the company configure?",
    options: [
      { id: "a", text: "Register the security account as the delegated administrator for GuardDuty and Security Hub in the organization" },
      { id: "b", text: "Create an IAM user in each account for the security team and share the passwords" },
      { id: "c", text: "Export findings from each account to a spreadsheet weekly" },
      { id: "d", text: "Disable GuardDuty in member accounts and run it only in the security account" },
    ],
    correctOptionIds: ["a"],
    explanation: "Many AWS security services support a delegated administrator account in Organizations. The delegated admin can auto-enable the service across all member accounts and aggregates their findings centrally, keeping the management account free of workloads.",
    optionRationale: {
      a: "Delegated administration gives the security account organization-wide visibility and control for GuardDuty and Security Hub.",
      b: "Shared IAM users violate least privilege and still require account-by-account access.",
      c: "Manual exports are slow, error-prone, and provide no real-time response capability.",
      d: "GuardDuty analyzes each account's own logs; disabling it in members removes coverage rather than centralizing it.",
    },
    referenceUrl: "https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_organizations.html",
    referenceLabel: "Managing GuardDuty Accounts with AWS Organizations",
    consoleUrl: "https://console.aws.amazon.com/guardduty/home#/settings",
    consoleLabel: "GuardDuty > Settings",
    diagram: "flowchart TD\n  Mgmt[Management account] -->|delegates| SecAcct[Security account: delegated admin]\n  SecAcct --> M1[Member account 1 findings]\n  SecAcct --> M2[Member account 2 findings]\n  SecAcct --> M40[Member account 40 findings]",
    cliExample: {
      description: "From the management account, designate the security account as GuardDuty delegated administrator",
      command: "aws guardduty enable-organization-admin-account --admin-account-id 444455556666",
      sampleOutput: "",
    },
  },
  {
    id: "sec94",
    domain: "security-and-compliance",
    text: "Which TWO of the following statements correctly describe the primary purpose of an AWS security service?",
    options: [
      { id: "a", text: "Amazon Inspector continuously scans EC2 instances, container images, and Lambda functions for software vulnerabilities and unintended network exposure" },
      { id: "b", text: "Amazon Macie uses machine learning to discover and classify sensitive data such as personal information stored in Amazon S3" },
      { id: "c", text: "Amazon GuardDuty encrypts data at rest across all AWS storage services" },
      { id: "d", text: "AWS Shield scans source code repositories for hard-coded secrets" },
    ],
    correctOptionIds: ["a", "b"],
    explanation: "Inspector is a vulnerability management service; Macie is a data security service for discovering sensitive data in S3; GuardDuty is a threat detection service that analyzes logs; Shield is DDoS protection.",
    optionRationale: {
      a: "Inspector's role is automated vulnerability and network reachability scanning of compute resources.",
      b: "Macie discovers and reports sensitive data, such as PII and credentials, within S3 buckets.",
      c: "GuardDuty detects threats by analyzing CloudTrail, VPC Flow Logs, and DNS logs; it does not perform encryption.",
      d: "Shield protects against DDoS attacks; it has nothing to do with scanning code for secrets.",
    },
    referenceUrl: "https://aws.amazon.com/products/security/",
    referenceLabel: "AWS Security, Identity, and Compliance Services",
    consoleUrl: "https://console.aws.amazon.com/securityhub/home",
    consoleLabel: "AWS Security Hub",
    diagram: "flowchart LR\n  Insp[Amazon Inspector] --> V[Vulnerabilities in EC2, ECR, Lambda]\n  Macie[Amazon Macie] --> P[Sensitive data in S3]\n  GD[Amazon GuardDuty] --> T[Threats from logs]\n  Shield[AWS Shield] --> D[DDoS protection]",
    cliExample: {
      description: "Summarize Inspector findings by severity across the account",
      command: "aws inspector2 list-finding-aggregations --aggregation-type ACCOUNT",
      sampleOutput: "{\n  \"responses\": [\n    {\n      \"accountAggregation\": {\n        \"accountId\": \"123456789012\",\n        \"severityCounts\": {\n          \"critical\": 3,\n          \"high\": 17,\n          \"medium\": 42,\n          \"all\": 70\n        }\n      }\n    }\n  ]\n}",
    },
  },
  {
    id: "sec95",
    domain: "security-and-compliance",
    text: "A company has locked away its root user credentials and expects them to be used only in rare emergencies. The security team wants an email within minutes whenever anyone signs in to the console as the root user. Which combination of services provides this with the LEAST custom code?",
    options: [
      { id: "a", text: "An Amazon EventBridge rule that matches AWS Console sign-in events for the root user from CloudTrail and publishes to an Amazon SNS topic" },
      { id: "b", text: "An AWS Config rule that checks root MFA status every 24 hours" },
      { id: "c", text: "An Amazon Inspector assessment scheduled hourly" },
      { id: "d", text: "An AWS Budgets alert set to a $0 threshold" },
    ],
    correctOptionIds: ["a"],
    explanation: "CloudTrail records console sign-in events. EventBridge can match an event pattern for a ConsoleLogin by the Root user type and route it to an SNS topic that emails subscribers, all without writing code.",
    optionRationale: {
      a: "EventBridge plus SNS is the standard low-code pattern for near-real-time alerts on specific CloudTrail events.",
      b: "Config evaluates configuration compliance periodically; it does not alert on sign-in activity.",
      c: "Inspector finds vulnerabilities and is unrelated to authentication events.",
      d: "Budgets notify on spending, not on who signed in.",
    },
    referenceUrl: "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-cloudtrail-events.html",
    referenceLabel: "EventBridge Events from CloudTrail",
    consoleUrl: "https://console.aws.amazon.com/events/home#/rules",
    consoleLabel: "EventBridge > Rules",
    diagram: "flowchart LR\n  Root[Root console sign-in] --> CT[CloudTrail event]\n  CT --> EB[EventBridge rule: userIdentity.type = Root]\n  EB --> SNS[SNS topic]\n  SNS --> Email[Security team email]",
    cliExample: {
      description: "Create an EventBridge rule that matches root user console sign-ins",
      command: "aws events put-rule --name root-signin-alert --event-pattern '{\"detail-type\":[\"AWS Console Sign In via CloudTrail\"],\"detail\":{\"userIdentity\":{\"type\":[\"Root\"]}}}'",
      sampleOutput: "{\n  \"RuleArn\": \"arn:aws:events:us-east-1:123456789012:rule/root-signin-alert\"\n}",
    },
  },
  {
    id: "sec96",
    domain: "security-and-compliance",
    text: "A fintech company processes highly sensitive card data on EC2 instances and wants to isolate that processing in a hardened environment that has no persistent storage, no interactive access, and no external network connectivity, so that even root users and administrators on the parent instance cannot access the data in use. Which AWS capability provides this?",
    options: [
      { id: "a", text: "AWS Nitro Enclaves" },
      { id: "b", text: "Amazon EC2 Dedicated Hosts" },
      { id: "c", text: "Amazon EBS encryption" },
      { id: "d", text: "AWS Fargate" },
    ],
    correctOptionIds: ["a"],
    explanation: "Nitro Enclaves are isolated compute environments carved out of an EC2 instance with their own CPU and memory, no persistent storage, no operator access, and only a local secure channel to the parent, with cryptographic attestation integrated with KMS.",
    optionRationale: {
      a: "Enclaves protect data in use by fully isolating it from the parent instance's users and processes.",
      b: "Dedicated Hosts isolate you from other customers' instances but do not isolate a process from the instance's own administrators.",
      c: "EBS encryption protects data at rest on volumes, not data being processed in memory.",
      d: "Fargate runs containers without server management but does not provide attested, operator-inaccessible enclaves.",
    },
    referenceUrl: "https://aws.amazon.com/ec2/nitro/nitro-enclaves/",
    referenceLabel: "AWS Nitro Enclaves",
    consoleUrl: "https://console.aws.amazon.com/ec2/home#Instances:",
    consoleLabel: "EC2 > Instances",
    diagram: "flowchart LR\n  Parent[Parent EC2 instance] <-->|vsock only| Enclave[Nitro Enclave: isolated CPU and memory]\n  Enclave -->|attestation| KMS[AWS KMS]\n  Admin[Instance admin] -.->|no access| Enclave",
    cliExample: {
      description: "Launch an instance with Nitro Enclaves support enabled",
      command: "aws ec2 run-instances --image-id ami-0abcdef1234567890 --instance-type m6i.xlarge --enclave-options Enabled=true --subnet-id subnet-0a1b2c3d",
      sampleOutput: "{\n  \"Instances\": [\n    {\n      \"InstanceId\": \"i-0f1e2d3c4b5a69788\",\n      \"InstanceType\": \"m6i.xlarge\",\n      \"EnclaveOptions\": {\n        \"Enabled\": true\n      },\n      \"State\": {\n        \"Name\": \"pending\"\n      }\n    }\n  ]\n}",
    },
  },
  {
    id: "sec97",
    domain: "security-and-compliance",
    text: "A company connects its data center to AWS and must ensure that all traffic between the two is encrypted in transit. Which TWO statements about AWS hybrid connectivity options are correct?",
    options: [
      { id: "a", text: "AWS Site-to-Site VPN encrypts traffic using IPsec tunnels over the public internet" },
      { id: "b", text: "AWS Direct Connect provides a private dedicated connection but does not encrypt traffic by default" },
      { id: "c", text: "AWS Direct Connect automatically encrypts all traffic with TLS at the physical layer" },
      { id: "d", text: "AWS Site-to-Site VPN requires a Direct Connect connection to function" },
    ],
    correctOptionIds: ["a", "b"],
    explanation: "Site-to-Site VPN creates encrypted IPsec tunnels over the internet. Direct Connect is a private physical link that bypasses the internet but is not encrypted on its own; customers needing encryption over Direct Connect run a VPN over it or use MACsec on supported connections.",
    optionRationale: {
      a: "IPsec encryption is inherent to Site-to-Site VPN, which is why it is safe to run over the public internet.",
      b: "Direct Connect provides isolation, not encryption; you add a VPN or MACsec if encryption is required.",
      c: "Direct Connect does not encrypt automatically; MACsec is an optional feature on certain dedicated connections.",
      d: "Site-to-Site VPN works over any internet connection; Direct Connect is not a prerequisite.",
    },
    referenceUrl: "https://docs.aws.amazon.com/vpn/latest/s2svpn/VPC_VPN.html",
    referenceLabel: "What is AWS Site-to-Site VPN?",
    consoleUrl: "https://console.aws.amazon.com/vpcconsole/home#VpnConnections:",
    consoleLabel: "VPC > Site-to-Site VPN connections",
    diagram: "flowchart LR\n  DC[Data center] -->|IPsec encrypted, over internet| VPN[Site-to-Site VPN]\n  DC -->|private fiber, not encrypted by default| DX[Direct Connect]\n  VPN --> VPC\n  DX --> VPC\n  DX -. optional VPN or MACsec .-> Enc[Encryption]",
    cliExample: {
      description: "List Site-to-Site VPN connections and their tunnel status",
      command: "aws ec2 describe-vpn-connections --query \"VpnConnections[].{Id:VpnConnectionId,State:State,Tunnels:VgwTelemetry[].Status}\"",
      sampleOutput: "[\n  {\n    \"Id\": \"vpn-0a1b2c3d4e5f6a7b8\",\n    \"State\": \"available\",\n    \"Tunnels\": [\n      \"UP\",\n      \"UP\"\n    ]\n  }\n]",
    },
  },
  {
    id: "sec98",
    domain: "security-and-compliance",
    text: "A company stores customer orders in Amazon DynamoDB, a fully managed serverless database. Under the AWS Shared Responsibility Model, which TWO of the following remain the customer's responsibility for this DynamoDB table?",
    options: [
      { id: "a", text: "Writing IAM policies that control which principals can read or write the table" },
      { id: "b", text: "Classifying the data and deciding whether items contain sensitive information that needs additional protection" },
      { id: "c", text: "Patching the operating system of the servers that host the DynamoDB service" },
      { id: "d", text: "Replacing failed storage hardware in the underlying data centers" },
      { id: "e", text: "Configuring the database engine software version and applying engine upgrades" },
    ],
    correctOptionIds: ["a", "b"],
    explanation: "For fully managed (abstracted) services such as DynamoDB, AWS operates the infrastructure, servers, operating system, and database software. The customer still owns their data: classifying it, controlling access with IAM, and choosing encryption and backup settings.",
    optionRationale: {
      a: "Access control to your own data through IAM is always the customer's responsibility, regardless of how managed the service is.",
      b: "Data classification and deciding how sensitive data should be protected is a customer responsibility under 'security in the cloud'.",
      c: "DynamoDB is serverless from the customer's perspective; AWS patches the hosts that run it.",
      d: "Physical hardware maintenance is always AWS's responsibility as part of 'security of the cloud'.",
      e: "DynamoDB has no customer-selectable engine version; AWS manages the service software entirely.",
    },
    referenceUrl: "https://aws.amazon.com/compliance/shared-responsibility-model/",
    referenceLabel: "AWS Shared Responsibility Model",
    consoleUrl: "https://console.aws.amazon.com/dynamodbv2/home#tables",
    consoleLabel: "DynamoDB > Tables",
    diagram: "flowchart LR\n  AWS[\"AWS: hardware, OS, service software\"] --> DDB[DynamoDB table]\n  Cust[\"Customer: IAM policies, data classification, encryption choice\"] --> DDB",
    cliExample: {
      description: "Attach a least-privilege policy so an application role can only read one table",
      command: "aws iam put-role-policy --role-name orders-app-role --policy-name orders-read --policy-document '{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":[\"dynamodb:GetItem\",\"dynamodb:Query\"],\"Resource\":\"arn:aws:dynamodb:us-east-1:123456789012:table/Orders\"}]}'",
      sampleOutput: "",
    },
  },
  {
    id: "sec99",
    domain: "security-and-compliance",
    text: "A company wants to let a third-party monitoring SaaS vendor read CloudWatch metrics from its AWS account. The vendor asks for access but the company refuses to create an IAM user and share long-term access keys. Which approach follows AWS best practice?",
    options: [
      { id: "a", text: "Create an IAM role that trusts the vendor's AWS account and require an external ID in the trust policy" },
      { id: "b", text: "Create an IAM user for the vendor with an access key and rotate it every 90 days" },
      { id: "c", text: "Share the root user password with the vendor and enable MFA" },
      { id: "d", text: "Make the CloudWatch metrics publicly accessible through a resource policy" },
    ],
    correctOptionIds: ["a"],
    explanation: "Cross-account IAM roles are the recommended way to grant third parties access. The vendor assumes the role with temporary credentials from AWS STS, and the external ID condition prevents the 'confused deputy' problem where another vendor customer could trick the vendor into using the role.",
    optionRationale: {
      a: "A role with a trust policy and an sts:ExternalId condition gives temporary, revocable, auditable access without sharing secrets.",
      b: "Long-term access keys for third parties are discouraged even when rotated; roles avoid storing secrets at all.",
      c: "Root credentials must never be shared; the root user should not be used for routine access at all.",
      d: "CloudWatch metrics cannot be made public this way and doing so would expose data far beyond the vendor.",
    },
    referenceUrl: "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_common-scenarios_third-party.html",
    referenceLabel: "Providing access to third-party AWS accounts",
    consoleUrl: "https://console.aws.amazon.com/iam/home#/roles",
    consoleLabel: "IAM > Roles",
    diagram: "flowchart LR\n  Vendor[\"Vendor account 999988887777\"] -->|AssumeRole with ExternalId| STS[AWS STS]\n  STS -->|temporary credentials| Role[\"MonitoringRole in account 123456789012\"]\n  Role --> CW[CloudWatch metrics]",
    cliExample: {
      description: "Create a role whose trust policy allows the vendor account only when it supplies the agreed external ID",
      command: "aws iam create-role --role-name VendorMonitoringRole --assume-role-policy-document '{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"AWS\":\"arn:aws:iam::999988887777:root\"},\"Action\":\"sts:AssumeRole\",\"Condition\":{\"StringEquals\":{\"sts:ExternalId\":\"vendor-unique-id-EXAMPLE\"}}}]}'",
      sampleOutput: "{\n  \"Role\": {\n    \"Path\": \"/\",\n    \"RoleName\": \"VendorMonitoringRole\",\n    \"RoleId\": \"AROAEXAMPLEID12345678\",\n    \"Arn\": \"arn:aws:iam::123456789012:role/VendorMonitoringRole\",\n    \"CreateDate\": \"2026-09-18T08:15:00+00:00\"\n  }\n}",
    },
  },
  {
    id: "sec100",
    domain: "security-and-compliance",
    text: "A company has migrated most of its workloads to AWS Lambda functions and container images stored in Amazon ECR. The security team wants automated, continuous scanning of the function code and its dependencies for known software vulnerabilities, with findings prioritized by severity. Which AWS service should they enable?",
    options: [
      { id: "a", text: "Amazon Inspector" },
      { id: "b", text: "Amazon GuardDuty" },
      { id: "c", text: "AWS Shield Advanced" },
      { id: "d", text: "Amazon Macie" },
    ],
    correctOptionIds: ["a"],
    explanation: "Amazon Inspector is a vulnerability management service that continuously scans EC2 instances, container images in Amazon ECR, and AWS Lambda functions (including their code and package dependencies) for software vulnerabilities and unintended network exposure.",
    optionRationale: {
      a: "Inspector's Lambda standard and code scanning discovers vulnerable dependencies and code issues in functions automatically.",
      b: "GuardDuty detects threats and suspicious behavior from logs; it does not scan code packages for CVEs.",
      c: "Shield Advanced is a DDoS protection service and has nothing to do with vulnerability scanning.",
      d: "Macie discovers sensitive data in S3; it does not analyze application code.",
    },
    referenceUrl: "https://docs.aws.amazon.com/inspector/latest/user/scanning-lambda.html",
    referenceLabel: "Scanning AWS Lambda functions with Amazon Inspector",
    consoleUrl: "https://console.aws.amazon.com/inspector/v2/home#/findings",
    consoleLabel: "Amazon Inspector > Findings",
    diagram: "flowchart LR\n  Lambda[Lambda functions] --> Insp[Amazon Inspector]\n  ECR[ECR container images] --> Insp\n  Insp -->|CVE findings by severity| Hub[Security Hub or console]",
    cliExample: {
      description: "Enable Inspector scanning for Lambda functions and ECR images in the current account",
      command: "aws inspector2 enable --resource-types LAMBDA LAMBDA_CODE ECR",
      sampleOutput: "{\n  \"accounts\": [\n    {\n      \"accountId\": \"123456789012\",\n      \"resourceStatus\": {\n        \"ec2\": \"DISABLED\",\n        \"ecr\": \"ENABLED\",\n        \"lambda\": \"ENABLED\",\n        \"lambdaCode\": \"ENABLED\"\n      },\n      \"status\": \"ENABLED\"\n    }\n  ],\n  \"failedAccounts\": []\n}",
    },
  },
  {
    id: "sec101",
    domain: "security-and-compliance",
    text: "A company uses AWS Organizations with 30 member accounts. The security team wants a single AWS CloudTrail configuration that automatically records API activity from every existing and future member account into one central S3 bucket, without asking each account owner to set anything up. What should they create?",
    options: [
      { id: "a", text: "An organization trail in the management account (or a delegated administrator account)" },
      { id: "b", text: "A separate trail in each member account that writes to the same bucket" },
      { id: "c", text: "An AWS Config aggregator covering all accounts" },
      { id: "d", text: "A CloudWatch Logs subscription filter in each account" },
    ],
    correctOptionIds: ["a"],
    explanation: "An organization trail is created once in the management account (or a delegated CloudTrail administrator) and is automatically applied to all member accounts, including accounts added later. Member accounts can see but cannot modify or delete the trail.",
    optionRationale: {
      a: "Organization trails give centralized, tamper-resistant logging that covers new accounts automatically.",
      b: "Per-account trails work but require manual setup in each account and are not automatically applied to new accounts.",
      c: "Config aggregators centralize resource configuration data, not API activity logs.",
      d: "Subscription filters forward log data but do not create the underlying CloudTrail logging.",
    },
    referenceUrl: "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/creating-trail-organization.html",
    referenceLabel: "Creating a trail for an organization",
    consoleUrl: "https://console.aws.amazon.com/cloudtrailv2/home#/trails",
    consoleLabel: "CloudTrail > Trails",
    diagram: "flowchart TD\n  Mgmt[Management account creates organization trail] --> A1[Member account A]\n  Mgmt --> A2[Member account B]\n  Mgmt --> A3[Future accounts]\n  A1 --> S3[Central S3 log bucket]\n  A2 --> S3\n  A3 --> S3",
    cliExample: {
      description: "Create a multi-Region organization trail from the management account",
      command: "aws cloudtrail create-trail --name org-trail --s3-bucket-name central-cloudtrail-logs-123456789012 --is-organization-trail --is-multi-region-trail",
      sampleOutput: "{\n  \"Name\": \"org-trail\",\n  \"S3BucketName\": \"central-cloudtrail-logs-123456789012\",\n  \"IncludeGlobalServiceEvents\": true,\n  \"IsMultiRegionTrail\": true,\n  \"TrailARN\": \"arn:aws:cloudtrail:us-east-1:123456789012:trail/org-trail\",\n  \"LogFileValidationEnabled\": false,\n  \"IsOrganizationTrail\": true\n}",
    },
  },
  {
    id: "sec102",
    domain: "security-and-compliance",
    text: "AWS Config already flags any security group that allows unrestricted SSH access (0.0.0.0/0 on port 22) as NON_COMPLIANT. The security team now wants the offending rule to be removed automatically within minutes, without an engineer logging in. Which AWS Config capability provides this?",
    options: [
      { id: "a", text: "Automatic remediation using an AWS Systems Manager Automation document associated with the rule" },
      { id: "b", text: "Configuration snapshots delivered to Amazon S3" },
      { id: "c", text: "A conformance pack" },
      { id: "d", text: "The AWS Config resource timeline" },
    ],
    correctOptionIds: ["a"],
    explanation: "AWS Config rules can be associated with a remediation action, which is an AWS Systems Manager Automation runbook (for example AWS-DisablePublicAccessForSecurityGroup). With automatic remediation enabled, Config runs the runbook as soon as a resource is evaluated as non-compliant.",
    optionRationale: {
      a: "Remediation actions turn detection into automatic correction using SSM Automation runbooks.",
      b: "Snapshots record configuration state for auditing; they do not change resources.",
      c: "Conformance packs group rules and remediation into a deployable template, but the actual fixing is still done by remediation actions; the pack itself is not the capability.",
      d: "The resource timeline is a history view for investigation, not an enforcement mechanism.",
    },
    referenceUrl: "https://docs.aws.amazon.com/config/latest/developerguide/remediation.html",
    referenceLabel: "Remediating noncompliant resources with AWS Config rules",
    consoleUrl: "https://console.aws.amazon.com/config/home#/rules",
    consoleLabel: "AWS Config > Rules",
    diagram: "flowchart LR\n  SG[\"Security group allows 0.0.0.0/0 on port 22\"] --> Rule[Config rule: restricted-ssh]\n  Rule -->|NON_COMPLIANT| Rem[Remediation action]\n  Rem --> SSM[SSM Automation runbook]\n  SSM -->|removes rule| SG",
    cliExample: {
      description: "Attach an automatic remediation runbook to the restricted-ssh Config rule",
      command: "aws configservice put-remediation-configurations --remediation-configurations '[{\"ConfigRuleName\":\"restricted-ssh\",\"TargetType\":\"SSM_DOCUMENT\",\"TargetId\":\"AWS-DisablePublicAccessForSecurityGroup\",\"Automatic\":true,\"MaximumAutomaticAttempts\":3,\"RetryAttemptSeconds\":60,\"Parameters\":{\"GroupId\":{\"ResourceValue\":{\"Value\":\"RESOURCE_ID\"}},\"AutomationAssumeRole\":{\"StaticValue\":{\"Values\":[\"arn:aws:iam::123456789012:role/ConfigRemediationRole\"]}}}}]'",
      sampleOutput: "{\n  \"FailedBatches\": []\n}",
    },
  },
  {
    id: "sec103",
    domain: "security-and-compliance",
    text: "A mobile app team is evaluating Amazon Cognito. They need (1) a managed user directory where customers register and sign in with a username and password, and (2) a way for signed-in users to obtain temporary AWS credentials to upload photos directly to an S3 bucket. Which TWO Cognito components address these needs respectively?",
    options: [
      { id: "a", text: "A Cognito user pool for registration, sign-in, and issuing identity tokens" },
      { id: "b", text: "A Cognito identity pool for exchanging tokens for temporary AWS credentials via STS" },
      { id: "c", text: "An IAM user created per customer with long-term access keys" },
      { id: "d", text: "AWS IAM Identity Center for customer sign-in" },
      { id: "e", text: "AWS Directory Service Simple AD for the customer directory" },
    ],
    correctOptionIds: ["a", "b"],
    explanation: "User pools are the customer identity directory and authentication layer (sign-up, sign-in, MFA, social and SAML federation). Identity pools (federated identities) take a token from a user pool or other IdP and return temporary, limited-privilege AWS credentials mapped to an IAM role.",
    optionRationale: {
      a: "User pools handle authentication and issue JWTs; they are the directory for app users.",
      b: "Identity pools provide authorization to AWS resources by vending STS credentials for an IAM role.",
      c: "Creating IAM users for application end-users is an anti-pattern; IAM is for workforce and workloads, not customers.",
      d: "IAM Identity Center is for workforce users accessing AWS accounts and business apps, not for customer-facing apps.",
      e: "Simple AD is a directory for Windows workloads and workforce use cases, not a mobile customer identity service.",
    },
    referenceUrl: "https://docs.aws.amazon.com/cognito/latest/developerguide/what-is-amazon-cognito.html",
    referenceLabel: "What is Amazon Cognito?",
    consoleUrl: "https://console.aws.amazon.com/cognito/v2/idp/user-pools",
    consoleLabel: "Amazon Cognito > User pools",
    diagram: "flowchart LR\n  App[Mobile app] -->|sign in| UP[Cognito user pool]\n  UP -->|ID token| IP[Cognito identity pool]\n  IP -->|temporary AWS credentials| STS[AWS STS]\n  App -->|PutObject| S3[S3 bucket]",
    cliExample: {
      description: "Create a user pool that requires email verification for new sign-ups",
      command: "aws cognito-idp create-user-pool --pool-name photo-app-users --auto-verified-attributes email --username-attributes email",
      sampleOutput: "{\n  \"UserPool\": {\n    \"Id\": \"us-east-1_AbCdEfGhI\",\n    \"Name\": \"photo-app-users\",\n    \"AutoVerifiedAttributes\": [\n      \"email\"\n    ],\n    \"UsernameAttributes\": [\n      \"email\"\n    ],\n    \"Arn\": \"arn:aws:cognito-idp:us-east-1:123456789012:userpool/us-east-1_AbCdEfGhI\"\n  }\n}",
    },
  },
  {
    id: "sec104",
    domain: "security-and-compliance",
    text: "An administrator attaches a Service Control Policy (SCP) to a member account in AWS Organizations that denies all actions in the ap-southeast-1 Region. The member account's root user then signs in and tries to launch an EC2 instance in ap-southeast-1. What is the result?",
    options: [
      { id: "a", text: "The request is denied, because SCPs apply to all principals in a member account, including its root user" },
      { id: "b", text: "The request succeeds, because the root user is never restricted by any policy" },
      { id: "c", text: "The request succeeds, because SCPs only affect IAM users, not IAM roles or the root user" },
      { id: "d", text: "The request is denied only if the root user also has an IAM policy attached" },
    ],
    correctOptionIds: ["a"],
    explanation: "SCPs define the maximum permissions for every principal in a member account, including the account's root user. The only account not affected by SCPs is the organization's management account. This is why SCPs are a key guardrail against misuse even of root credentials in member accounts.",
    optionRationale: {
      a: "SCPs are enforced on the member account's root user, IAM users, and IAM roles alike.",
      b: "The member account root user is unrestricted within its own account but is still bounded by the organization's SCPs.",
      c: "SCPs apply to roles and the root user, not just IAM users.",
      d: "Root users do not have IAM policies attached; the SCP alone is enough to deny the action.",
    },
    referenceUrl: "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html",
    referenceLabel: "Service control policies (SCPs)",
    consoleUrl: "https://console.aws.amazon.com/organizations/v2/home/policies/service-control-policy",
    consoleLabel: "AWS Organizations > Service control policies",
    diagram: "flowchart TD\n  Org[Organization SCP: deny ap-southeast-1] --> Member[Member account]\n  Member --> Root[Root user]\n  Member --> Users[IAM users and roles]\n  Root -.-x EC2[\"RunInstances in ap-southeast-1\"]\n  Users -.-x EC2\n  Mgmt[Management account] -->|not affected by SCPs| EC2",
    cliExample: {
      description: "Attach a Region-restriction SCP to a member account",
      command: "aws organizations attach-policy --policy-id p-examplepolicyid1 --target-id 123456789012",
      sampleOutput: "",
    },
  },
  {
    id: "sec105",
    domain: "security-and-compliance",
    text: "A company keeps versioned legal documents in an Amazon S3 bucket. It wants to ensure that no object version can be permanently deleted, and versioning cannot be suspended, unless the person performing the action also provides a valid MFA code. Which S3 feature meets this requirement?",
    options: [
      { id: "a", text: "S3 MFA Delete" },
      { id: "b", text: "S3 Block Public Access" },
      { id: "c", text: "S3 Transfer Acceleration" },
      { id: "d", text: "S3 Intelligent-Tiering" },
    ],
    correctOptionIds: ["a"],
    explanation: "MFA Delete is a setting on a versioned S3 bucket that requires the bucket owner to include an MFA token in requests that permanently delete an object version or change the bucket's versioning state. It can only be enabled by the root user using the CLI or API.",
    optionRationale: {
      a: "MFA Delete adds a second factor to the two most destructive versioning operations.",
      b: "Block Public Access prevents public exposure; it does nothing about deletions by authorized users.",
      c: "Transfer Acceleration speeds up uploads over long distances; it is unrelated to security.",
      d: "Intelligent-Tiering is a storage class for cost optimization.",
    },
    referenceUrl: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/MultiFactorAuthenticationDelete.html",
    referenceLabel: "Configuring MFA delete",
    consoleUrl: "https://s3.console.aws.amazon.com/s3/buckets",
    consoleLabel: "S3 > Buckets",
    diagram: "flowchart LR\n  User[Bucket owner] -->|DeleteObject with versionId plus MFA code| S3[Versioned S3 bucket]\n  User2[Request without MFA] -.-x S3",
    cliExample: {
      description: "Enable versioning with MFA Delete using root credentials and a virtual MFA device",
      command: "aws s3api put-bucket-versioning --bucket legal-docs-123456789012 --versioning-configuration Status=Enabled,MFADelete=Enabled --mfa \"arn:aws:iam::123456789012:mfa/root-account-mfa-device 123456\"",
      sampleOutput: "",
    },
  },
  {
    id: "sec106",
    domain: "security-and-compliance",
    text: "A security group attached to a web server allows inbound HTTPS (port 443) from 0.0.0.0/0 and has no explicit outbound rule for port 443 responses. Users report that the website works normally. Why are the response packets to clients allowed?",
    options: [
      { id: "a", text: "Security groups are stateful, so return traffic for an allowed inbound connection is automatically permitted" },
      { id: "b", text: "Security groups allow all inbound traffic by default" },
      { id: "c", text: "The network ACL overrides the security group for outbound traffic" },
      { id: "d", text: "HTTPS traffic bypasses security groups entirely" },
    ],
    correctOptionIds: ["a"],
    explanation: "Security groups track connection state. When an inbound request is allowed, the corresponding outbound response is allowed regardless of outbound rules (and vice versa). Network ACLs, by contrast, are stateless and require explicit rules in both directions.",
    optionRationale: {
      a: "Stateful filtering is the defining behavior of security groups; only the initiating direction needs a rule.",
      b: "New security groups deny all inbound by default and allow all outbound by default.",
      c: "NACLs and security groups are evaluated independently; one does not override the other.",
      d: "All traffic to an ENI passes through its security groups, including HTTPS.",
    },
    referenceUrl: "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html",
    referenceLabel: "Control traffic to resources using security groups",
    consoleUrl: "https://console.aws.amazon.com/vpcconsole/home#SecurityGroups:",
    consoleLabel: "VPC > Security groups",
    diagram: "flowchart LR\n  Client[Internet client] -->|inbound 443 allowed| SG[Security group: stateful]\n  SG --> Web[Web server]\n  Web -->|response automatically allowed| Client",
    cliExample: {
      description: "Add an inbound HTTPS rule; no matching outbound rule is required for responses",
      command: "aws ec2 authorize-security-group-ingress --group-id sg-0123456789abcdef0 --protocol tcp --port 443 --cidr 0.0.0.0/0",
      sampleOutput: "{\n  \"Return\": true,\n  \"SecurityGroupRules\": [\n    {\n      \"SecurityGroupRuleId\": \"sgr-0abc123def4567890\",\n      \"GroupId\": \"sg-0123456789abcdef0\",\n      \"IsEgress\": false,\n      \"IpProtocol\": \"tcp\",\n      \"FromPort\": 443,\n      \"ToPort\": 443,\n      \"CidrIpv4\": \"0.0.0.0/0\"\n    }\n  ]\n}",
    },
  },
  {
    id: "sec107",
    domain: "security-and-compliance",
    text: "An engineer created an EC2 key pair in the console six months ago but has lost the downloaded .pem file. She now needs to SSH into an instance that was launched with that key pair. Which statement is correct?",
    options: [
      { id: "a", text: "AWS does not store the private key; she cannot download it again and must use an alternative such as Session Manager or replace the key on the instance" },
      { id: "b", text: "She can re-download the private key from the EC2 console under Key Pairs" },
      { id: "c", text: "AWS Support can email her the private key after identity verification" },
      { id: "d", text: "The private key is stored in AWS Secrets Manager automatically" },
    ],
    correctOptionIds: ["a"],
    explanation: "When a key pair is created, AWS stores only the public key. The private key is provided once at creation and never retained by AWS, which is why it must be downloaded and safeguarded. Recovery options include using Systems Manager Session Manager, EC2 Instance Connect, or attaching the root volume to another instance to replace the authorized key.",
    optionRationale: {
      a: "AWS keeps only the public half of the key pair, making the customer responsible for private key custody.",
      b: "The console only lists key pair names and fingerprints; there is no re-download option.",
      c: "Support cannot provide the private key because AWS never had it.",
      d: "Key pair private keys are not stored in Secrets Manager unless you put them there yourself.",
    },
    referenceUrl: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html",
    referenceLabel: "Amazon EC2 key pairs and Linux instances",
    consoleUrl: "https://console.aws.amazon.com/ec2/home#KeyPairs:",
    consoleLabel: "EC2 > Key Pairs",
    diagram: "flowchart LR\n  Create[Create key pair] --> Pub[Public key stored by AWS]\n  Create --> Priv[Private key downloaded once by customer]\n  Priv -. lost .-> Alt[Session Manager or key replacement]",
    cliExample: {
      description: "List key pairs; note that only names and fingerprints are returned, never private key material",
      command: "aws ec2 describe-key-pairs --key-names web-admin-key",
      sampleOutput: "{\n  \"KeyPairs\": [\n    {\n      \"KeyPairId\": \"key-0abc123def4567890\",\n      \"KeyFingerprint\": \"1f:51:ae:28:bf:89:e9:d8:1f:25:5d:37:2d:7d:b8:ca:9f:f5:f1:6f\",\n      \"KeyName\": \"web-admin-key\",\n      \"KeyType\": \"rsa\"\n    }\n  ]\n}",
    },
  },
  {
    id: "sec108",
    domain: "security-and-compliance",
    text: "A company already logs all API calls with AWS CloudTrail. The security team wants CloudTrail itself to automatically detect unusual spikes in API call volume or error rates, such as a sudden burst of DeleteBucket calls, and surface them as events without the team writing custom analytics. Which feature should they enable?",
    options: [
      { id: "a", text: "CloudTrail Insights" },
      { id: "b", text: "CloudTrail log file integrity validation" },
      { id: "c", text: "CloudTrail data events" },
      { id: "d", text: "CloudTrail Lake" },
    ],
    correctOptionIds: ["a"],
    explanation: "CloudTrail Insights analyzes management events to establish a baseline and then generates Insights events when it detects anomalous API call rates or error rates, helping identify misconfigurations, runaway scripts, or malicious activity.",
    optionRationale: {
      a: "Insights is purpose-built to flag unusual write API volume and error-rate anomalies.",
      b: "Integrity validation proves logs were not tampered with; it does not analyze activity patterns.",
      c: "Data events record object-level operations (like S3 GetObject) but do not detect anomalies.",
      d: "CloudTrail Lake lets you run SQL queries over events; you would need to write the detection logic yourself.",
    },
    referenceUrl: "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/logging-insights-events-with-cloudtrail.html",
    referenceLabel: "Logging Insights events",
    consoleUrl: "https://console.aws.amazon.com/cloudtrailv2/home#/insights",
    consoleLabel: "CloudTrail > Insights",
    diagram: "flowchart LR\n  API[Management API calls] --> Trail[CloudTrail trail]\n  Trail --> Insights[CloudTrail Insights baseline]\n  Insights -->|unusual call or error rate| Event[Insights event]\n  Event --> Team[Security team]",
    cliExample: {
      description: "Turn on Insights for API call rate and error rate anomalies on an existing trail",
      command: "aws cloudtrail put-insight-selectors --trail-name org-trail --insight-selectors '[{\"InsightType\":\"ApiCallRateInsight\"},{\"InsightType\":\"ApiErrorRateInsight\"}]'",
      sampleOutput: "{\n  \"TrailARN\": \"arn:aws:cloudtrail:us-east-1:123456789012:trail/org-trail\",\n  \"InsightSelectors\": [\n    {\n      \"InsightType\": \"ApiCallRateInsight\"\n    },\n    {\n      \"InsightType\": \"ApiErrorRateInsight\"\n    }\n  ]\n}",
    },
  },
  {
    id: "sec109",
    domain: "security-and-compliance",
    text: "Which of the following is a design principle of the Security pillar of the AWS Well-Architected Framework?",
    options: [
      { id: "a", text: "Apply security at all layers, from the edge network and VPC down to the operating system and application" },
      { id: "b", text: "Store all credentials in application source code so they are version controlled" },
      { id: "c", text: "Rely on a single strong perimeter firewall and trust everything inside the VPC" },
      { id: "d", text: "Grant broad permissions initially and reduce them only after an incident" },
    ],
    correctOptionIds: ["a"],
    explanation: "The Security pillar's design principles include implementing a strong identity foundation, enabling traceability, applying security at all layers (defense in depth), automating security best practices, protecting data in transit and at rest, keeping people away from data, and preparing for security events.",
    optionRationale: {
      a: "Defense in depth across multiple layers is an explicit Well-Architected security design principle.",
      b: "Credentials in source code violate the principle of protecting secrets; use Secrets Manager or IAM roles.",
      c: "A single perimeter is the opposite of defense in depth and ignores insider and lateral-movement threats.",
      d: "The framework recommends least privilege from the start, not permissive-by-default.",
    },
    referenceUrl: "https://docs.aws.amazon.com/wellarchitected/latest/security-pillar/design-principles.html",
    referenceLabel: "Security pillar design principles",
    consoleUrl: "https://console.aws.amazon.com/wellarchitected/home#/workloads",
    consoleLabel: "AWS Well-Architected Tool > Workloads",
    diagram: "flowchart TD\n  Edge[\"Edge: CloudFront, WAF, Shield\"] --> Net[\"Network: VPC, NACL, security groups\"]\n  Net --> Host[\"Compute: patched OS, Inspector\"]\n  Host --> App[\"Application: IAM, encryption, secrets\"]\n  App --> Data[\"Data: KMS, S3 policies\"]",
    cliExample: {
      description: "List Well-Architected workloads to review against the Security pillar",
      command: "aws wellarchitected list-workloads",
      sampleOutput: "{\n  \"WorkloadSummaries\": [\n    {\n      \"WorkloadId\": \"a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6\",\n      \"WorkloadArn\": \"arn:aws:wellarchitected:us-east-1:123456789012:workload/a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6\",\n      \"WorkloadName\": \"payments-api\",\n      \"Owner\": \"123456789012\",\n      \"UpdatedAt\": \"2026-09-10T09:30:00+00:00\",\n      \"Lenses\": [\n        \"wellarchitected\"\n      ],\n      \"RiskCounts\": {\n        \"HIGH\": 2,\n        \"MEDIUM\": 5,\n        \"NONE\": 30\n      },\n      \"ImprovementStatus\": \"IN_PROGRESS\"\n    }\n  ]\n}",
    },
  },
  {
    id: "sec110",
    domain: "security-and-compliance",
    text: "Amazon GuardDuty reports that an EC2 instance is exhibiting behavior consistent with a compromise. The security team wants GuardDuty to automatically scan the instance's attached EBS volumes for malware, without installing any agent and without taking the instance offline. Which GuardDuty capability does this?",
    options: [
      { id: "a", text: "GuardDuty Malware Protection for EC2" },
      { id: "b", text: "GuardDuty S3 Protection" },
      { id: "c", text: "Amazon Inspector network reachability findings" },
      { id: "d", text: "AWS Systems Manager Patch Manager" },
    ],
    correctOptionIds: ["a"],
    explanation: "GuardDuty Malware Protection for EC2 takes snapshots of the EBS volumes attached to an instance when GuardDuty detects suspicious behavior, then scans those snapshots agentlessly for malware and produces findings, all without impacting the running workload.",
    optionRationale: {
      a: "Malware Protection performs agentless, snapshot-based scanning of EBS volumes triggered by GuardDuty findings.",
      b: "S3 Protection monitors S3 data-plane activity for suspicious access; it does not scan EBS volumes.",
      c: "Inspector reachability findings identify open network paths, not malware on disk.",
      d: "Patch Manager applies OS patches; it does not detect or scan for malware.",
    },
    referenceUrl: "https://docs.aws.amazon.com/guardduty/latest/ug/malware-protection.html",
    referenceLabel: "GuardDuty Malware Protection for EC2",
    consoleUrl: "https://console.aws.amazon.com/guardduty/home#/malware-scans",
    consoleLabel: "GuardDuty > Malware scans",
    diagram: "flowchart LR\n  GD[GuardDuty finding on instance] --> Snap[EBS snapshot created]\n  Snap --> Scan[Agentless malware scan]\n  Scan -->|malware found| Finding[\"Execution:EC2 MaliciousFile finding\"]\n  Inst[Running EC2 instance] -. not interrupted .-> GD",
    cliExample: {
      description: "Enable GuardDuty Malware Protection for EC2 on an existing detector",
      command: "aws guardduty update-detector --detector-id 12abc34d567e8fa901bc2d34e56789f0 --features '[{\"Name\":\"EBS_MALWARE_PROTECTION\",\"Status\":\"ENABLED\"}]'",
      sampleOutput: "",
    },
  },
  {
    id: "sec111",
    domain: "security-and-compliance",
    text: "A security team is reviewing how workloads authenticate to AWS. Which statement BEST explains why AWS recommends IAM roles with temporary credentials over IAM users with long-term access keys for applications?",
    options: [
      { id: "a", text: "Temporary credentials from AWS STS expire automatically, are not stored in code or config files, and are rotated without any customer action" },
      { id: "b", text: "IAM roles are free while IAM users incur a monthly charge" },
      { id: "c", text: "Access keys cannot be used with the AWS CLI" },
      { id: "d", text: "IAM users cannot be assigned any permissions" },
    ],
    correctOptionIds: ["a"],
    explanation: "When an application assumes a role, AWS STS issues short-lived credentials that expire (typically after 1 to 12 hours) and are rotated automatically. Long-term access keys never expire on their own and are frequently leaked through code repositories, backups, or laptops.",
    optionRationale: {
      a: "Automatic expiry and rotation dramatically reduce the impact of a leaked credential.",
      b: "Both IAM users and roles are free of charge; cost is not the reason.",
      c: "Access keys work with the CLI and SDKs; that is exactly why leaking them is dangerous.",
      d: "IAM users can have policies attached; the concern is credential lifetime, not capability.",
    },
    referenceUrl: "https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html",
    referenceLabel: "Security best practices in IAM",
    consoleUrl: "https://console.aws.amazon.com/iam/home#/roles",
    consoleLabel: "IAM > Roles",
    diagram: "flowchart LR\n  App[Application] -->|AssumeRole| STS[AWS STS]\n  STS -->|credentials expire in 1 hour| App\n  Keys[Long-term access key] -. never expires, may leak .-> Risk[Higher risk]",
    cliExample: {
      description: "Assume a role and observe that the returned credentials carry an expiration time",
      command: "aws sts assume-role --role-arn arn:aws:iam::123456789012:role/AppRole --role-session-name app-session --duration-seconds 3600",
      sampleOutput: "{\n  \"Credentials\": {\n    \"AccessKeyId\": \"ASIAIOSFODNN7EXAMPLE\",\n    \"SecretAccessKey\": \"wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY\",\n    \"SessionToken\": \"FwoGZXIvYXdzEBYaDEXAMPLESESSIONTOKEN...\",\n    \"Expiration\": \"2026-09-18T10:15:00+00:00\"\n  },\n  \"AssumedRoleUser\": {\n    \"AssumedRoleId\": \"AROAEXAMPLEID12345678:app-session\",\n    \"Arn\": \"arn:aws:sts::123456789012:assumed-role/AppRole/app-session\"\n  }\n}",
    },
  },
  {
    id: "sec112",
    domain: "security-and-compliance",
    text: "A company wants to share an encrypted EBS snapshot from its development account with its production account. The snapshot was encrypted with the default AWS managed key (aws/ebs). The share fails. What must the company do?",
    options: [
      { id: "a", text: "Re-encrypt the snapshot with a customer managed KMS key and grant the production account access to that key" },
      { id: "b", text: "Make the snapshot public so the production account can copy it" },
      { id: "c", text: "Disable encryption on the snapshot before sharing" },
      { id: "d", text: "Ask AWS Support to share the AWS managed key with the other account" },
    ],
    correctOptionIds: ["a"],
    explanation: "Snapshots encrypted with an AWS managed key (aws/ebs) cannot be shared with other accounts because AWS managed keys cannot be shared. You must copy the snapshot using a customer managed KMS key, then share the snapshot and update the key policy to allow the target account to use the key.",
    optionRationale: {
      a: "Only customer managed keys support cross-account key policies, which the recipient needs to decrypt the snapshot.",
      b: "Encrypted snapshots cannot be made public, and public sharing would be a serious security risk anyway.",
      c: "Encryption cannot simply be removed from a snapshot, and doing so would violate most data-protection policies.",
      d: "AWS managed keys are account-scoped by design; Support cannot change this.",
    },
    referenceUrl: "https://docs.aws.amazon.com/ebs/latest/userguide/ebs-modifying-snapshot-permissions.html",
    referenceLabel: "Share an Amazon EBS snapshot",
    consoleUrl: "https://console.aws.amazon.com/ec2/home#Snapshots:",
    consoleLabel: "EC2 > Snapshots",
    diagram: "flowchart LR\n  Snap1[\"Snapshot encrypted with aws/ebs\"] -->|copy with CMK| Snap2[Snapshot encrypted with customer managed key]\n  Snap2 -->|modify permissions| Prod[Production account 999988887777]\n  Key[Customer managed key policy] -->|grants kms:Decrypt to prod| Prod",
    cliExample: {
      description: "Copy the snapshot with a customer managed key so it can be shared cross-account",
      command: "aws ec2 copy-snapshot --source-region us-east-1 --source-snapshot-id snap-0abc123def4567890 --encrypted --kms-key-id arn:aws:kms:us-east-1:123456789012:key/1234abcd-12ab-34cd-56ef-1234567890ab --description \"Shareable copy\"",
      sampleOutput: "{\n  \"SnapshotId\": \"snap-0fedcba9876543210\"\n}",
    },
  },
  {
    id: "sec113",
    domain: "security-and-compliance",
    text: "A company allows its database administrators to stop and terminate RDS instances, but wants those specific destructive actions to succeed only if the administrator signed in using multi-factor authentication. Which IAM feature enforces this?",
    options: [
      { id: "a", text: "A policy condition using the aws:MultiFactorAuthPresent context key" },
      { id: "b", text: "An IAM permissions boundary" },
      { id: "c", text: "A resource-based policy on the RDS instance" },
      { id: "d", text: "An AWS Organizations tag policy" },
    ],
    correctOptionIds: ["a"],
    explanation: "IAM policies support condition keys. Adding a condition such as {\"Bool\": {\"aws:MultiFactorAuthPresent\": \"true\"}} to the Allow statement (or a Deny with false) makes sensitive actions require an MFA-authenticated session, while other actions remain available without MFA.",
    optionRationale: {
      a: "MFA-based conditions let you require MFA only for specific high-risk actions.",
      b: "Permissions boundaries cap maximum permissions; they do not evaluate MFA state.",
      c: "RDS does not use resource-based policies for instance actions, and this is about the caller's authentication.",
      d: "Tag policies standardize tags across accounts and have nothing to do with MFA.",
    },
    referenceUrl: "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_configure-api-require.html",
    referenceLabel: "Secure API access with MFA",
    consoleUrl: "https://console.aws.amazon.com/iam/home#/policies",
    consoleLabel: "IAM > Policies",
    diagram: "flowchart LR\n  DBA[DBA with MFA session] -->|aws:MultiFactorAuthPresent = true| Allow[DeleteDBInstance allowed]\n  DBA2[DBA without MFA] -.-x Deny[DeleteDBInstance denied]\n  DBA2 -->|other actions| OK[DescribeDBInstances allowed]",
    cliExample: {
      description: "Create a policy that allows RDS deletion only when MFA is present",
      command: "aws iam create-policy --policy-name RdsDeleteRequiresMfa --policy-document '{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":[\"rds:DeleteDBInstance\",\"rds:StopDBInstance\"],\"Resource\":\"*\",\"Condition\":{\"Bool\":{\"aws:MultiFactorAuthPresent\":\"true\"}}}]}'",
      sampleOutput: "{\n  \"Policy\": {\n    \"PolicyName\": \"RdsDeleteRequiresMfa\",\n    \"PolicyId\": \"ANPAEXAMPLEID12345678\",\n    \"Arn\": \"arn:aws:iam::123456789012:policy/RdsDeleteRequiresMfa\",\n    \"Path\": \"/\",\n    \"DefaultVersionId\": \"v1\",\n    \"AttachmentCount\": 0,\n    \"IsAttachable\": true,\n    \"CreateDate\": \"2026-09-18T08:20:00+00:00\"\n  }\n}",
    },
  },
  {
    id: "sec114",
    domain: "security-and-compliance",
    text: "A compliance rule states that data must be encrypted in transit whenever it is uploaded to or downloaded from a specific Amazon S3 bucket. The company wants S3 itself to reject any request made over plain HTTP. What is the simplest way to enforce this?",
    options: [
      { id: "a", text: "Add a bucket policy that denies all actions when the aws:SecureTransport condition is false" },
      { id: "b", text: "Enable S3 Versioning on the bucket" },
      { id: "c", text: "Enable default encryption with SSE-S3" },
      { id: "d", text: "Turn on S3 Block Public Access" },
    ],
    correctOptionIds: ["a"],
    explanation: "The aws:SecureTransport global condition key is true when a request uses TLS. A bucket policy with an explicit Deny on s3:* where aws:SecureTransport is false forces every client to use HTTPS, providing encryption in transit at the service level.",
    optionRationale: {
      a: "An explicit Deny on non-TLS requests is the standard pattern for enforcing HTTPS on S3.",
      b: "Versioning protects against overwrites and deletes; it says nothing about transport.",
      c: "Default encryption protects data at rest on disk, not in transit over the network.",
      d: "Block Public Access controls public exposure, not the protocol used by authorized clients.",
    },
    referenceUrl: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/security-best-practices.html",
    referenceLabel: "Security best practices for Amazon S3",
    consoleUrl: "https://s3.console.aws.amazon.com/s3/buckets",
    consoleLabel: "S3 > Buckets > Permissions",
    diagram: "flowchart LR\n  HTTPS[Client over HTTPS] -->|aws:SecureTransport = true| S3[S3 bucket]\n  HTTP[Client over HTTP] -.-x S3\n  Policy[Bucket policy: Deny if SecureTransport false] --> S3",
    cliExample: {
      description: "Apply a bucket policy that denies any request not made over TLS",
      command: "aws s3api put-bucket-policy --bucket compliance-data-123456789012 --policy '{\"Version\":\"2012-10-17\",\"Statement\":[{\"Sid\":\"DenyInsecureTransport\",\"Effect\":\"Deny\",\"Principal\":\"*\",\"Action\":\"s3:*\",\"Resource\":[\"arn:aws:s3:::compliance-data-123456789012\",\"arn:aws:s3:::compliance-data-123456789012/*\"],\"Condition\":{\"Bool\":{\"aws:SecureTransport\":\"false\"}}}]}'",
      sampleOutput: "",
    },
  },
  {
    id: "sec115",
    domain: "security-and-compliance",
    text: "A company wants to use AWS WAF to protect its web applications. Which TWO of the following resource types can an AWS WAF web ACL be associated with directly?",
    options: [
      { id: "a", text: "Amazon CloudFront distribution" },
      { id: "b", text: "Application Load Balancer" },
      { id: "c", text: "An individual Amazon EC2 instance's elastic network interface" },
      { id: "d", text: "An Amazon S3 bucket configured for static website hosting" },
      { id: "e", text: "A Network Load Balancer" },
    ],
    correctOptionIds: ["a", "b"],
    explanation: "AWS WAF operates at layer 7 and is attached to services that terminate HTTP(S): CloudFront distributions, Application Load Balancers, Amazon API Gateway REST APIs, AWS AppSync GraphQL APIs, Amazon Cognito user pools, AWS App Runner services, and Verified Access instances. It cannot be attached to EC2 instances, NLBs, or S3 buckets directly.",
    optionRationale: {
      a: "CloudFront is one of the most common WAF integration points, filtering traffic at the edge.",
      b: "ALBs terminate HTTP and support WAF web ACL association in the Region.",
      c: "WAF does not attach to instances or ENIs; use security groups or place the instance behind an ALB or CloudFront.",
      d: "S3 website endpoints cannot have a WAF attached; put CloudFront in front of the bucket instead.",
      e: "NLBs operate at layer 4 and do not inspect HTTP, so WAF cannot be associated with them.",
    },
    referenceUrl: "https://docs.aws.amazon.com/waf/latest/developerguide/web-acl-associating-aws-resource.html",
    referenceLabel: "Associating or disassociating a web ACL with an AWS resource",
    consoleUrl: "https://console.aws.amazon.com/wafv2/homev2/web-acls",
    consoleLabel: "AWS WAF > Web ACLs",
    diagram: "flowchart LR\n  WAF[AWS WAF web ACL] --> CF[CloudFront]\n  WAF --> ALB[Application Load Balancer]\n  WAF --> APIGW[API Gateway REST API]\n  WAF -.-x EC2[EC2 instance directly]\n  WAF -.-x NLB[Network Load Balancer]",
    cliExample: {
      description: "Associate a Regional web ACL with an Application Load Balancer",
      command: "aws wafv2 associate-web-acl --web-acl-arn arn:aws:wafv2:us-east-1:123456789012:regional/webacl/prod-acl/a1b2c3d4-5678-90ab-cdef-EXAMPLE11111 --resource-arn arn:aws:elasticloadbalancing:us-east-1:123456789012:loadbalancer/app/prod-alb/50dc6c495c0c9188",
      sampleOutput: "",
    },
  },
  {
    id: "sec116",
    domain: "security-and-compliance",
    text: "A company must produce an audit trail showing exactly which IAM principals decrypted objects in an S3 bucket, and wants the ability to immediately revoke all access to the data by disabling a single key. Which S3 server-side encryption option satisfies BOTH requirements?",
    options: [
      { id: "a", text: "SSE-KMS with a customer managed key" },
      { id: "b", text: "SSE-S3 (Amazon S3 managed keys)" },
      { id: "c", text: "Client-side encryption with a key stored on a developer laptop" },
      { id: "d", text: "No encryption, relying on bucket policies only" },
    ],
    correctOptionIds: ["a"],
    explanation: "With SSE-KMS, every encrypt and decrypt operation is an API call to AWS KMS that is logged in CloudTrail, giving a per-principal audit trail of data access. Disabling or scheduling deletion of the customer managed key makes all objects encrypted under it unreadable. SSE-S3 keys are fully managed by S3, so there is no key-usage log and no key to disable.",
    optionRationale: {
      a: "SSE-KMS provides CloudTrail-logged key usage, key policies, and a central kill switch by disabling the key.",
      b: "SSE-S3 encrypts at rest transparently but offers no separate key-usage logging or customer control over the key.",
      c: "Client-side encryption gives control but no centralized, tamper-evident audit trail, and an unmanaged laptop key is a poor practice.",
      d: "Bucket policies control access but do not encrypt data or record decryption events per key.",
    },
    referenceUrl: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingKMSEncryption.html",
    referenceLabel: "Using server-side encryption with AWS KMS keys (SSE-KMS)",
    consoleUrl: "https://console.aws.amazon.com/kms/home#/kms/keys",
    consoleLabel: "KMS > Customer managed keys",
    diagram: "flowchart LR\n  User[IAM principal] -->|GetObject| S3[S3 bucket with SSE-KMS]\n  S3 -->|Decrypt call| KMS[Customer managed key]\n  KMS --> CT[CloudTrail: who used the key]\n  Admin[Disable key] -.-x KMS",
    cliExample: {
      description: "Set SSE-KMS with a customer managed key as the bucket's default encryption",
      command: "aws s3api put-bucket-encryption --bucket audit-data-123456789012 --server-side-encryption-configuration '{\"Rules\":[{\"ApplyServerSideEncryptionByDefault\":{\"SSEAlgorithm\":\"aws:kms\",\"KMSMasterKeyID\":\"arn:aws:kms:us-east-1:123456789012:key/1234abcd-12ab-34cd-56ef-1234567890ab\"},\"BucketKeyEnabled\":true}]}'",
      sampleOutput: "",
    },
  },
  {
    id: "sec117",
    domain: "security-and-compliance",
    text: "A small startup runs a public website on an Application Load Balancer and uses Amazon Route 53 and CloudFront. It has not purchased any additional security services. Which statement about DDoS protection for this website is correct?",
    options: [
      { id: "a", text: "AWS Shield Standard automatically protects against common network and transport layer DDoS attacks at no additional charge" },
      { id: "b", text: "The website has no DDoS protection until the startup subscribes to AWS Shield Advanced" },
      { id: "c", text: "DDoS protection is only available for EC2 instances, not for CloudFront or Route 53" },
      { id: "d", text: "AWS WAF must be enabled before any DDoS mitigation applies" },
    ],
    correctOptionIds: ["a"],
    explanation: "AWS Shield Standard is enabled automatically for all AWS customers at no cost and defends against the most common, frequently occurring layer 3 and 4 attacks such as SYN floods and UDP reflection attacks. Shield Advanced is an optional paid tier adding enhanced detection, cost protection, and access to the Shield Response Team.",
    optionRationale: {
      a: "Shield Standard is always on, free, and covers CloudFront, Route 53, ALB, and other edge and Regional resources.",
      b: "Shield Advanced adds features but baseline protection exists without it.",
      c: "CloudFront and Route 53 are among the best-protected services because they sit at the AWS edge.",
      d: "WAF addresses layer 7 application attacks and is separate from Shield's automatic network-layer mitigation.",
    },
    referenceUrl: "https://docs.aws.amazon.com/waf/latest/developerguide/ddos-standard-summary.html",
    referenceLabel: "AWS Shield Standard overview",
    consoleUrl: "https://console.aws.amazon.com/wafv2/shieldv2#/overview",
    consoleLabel: "AWS Shield > Overview",
    diagram: "flowchart LR\n  Attack[\"SYN flood or UDP reflection (layer 3 and 4)\"] --> Shield[\"Shield Standard: automatic, free\"]\n  Shield --> CF[CloudFront and Route 53]\n  CF --> ALB[Application Load Balancer]\n  Adv[\"Shield Advanced: optional, paid\"] -. adds SRT and cost protection .-> Shield",
    cliExample: {
      description: "Check whether the account has a Shield Advanced subscription; absence still means Shield Standard applies",
      command: "aws shield get-subscription-state",
      sampleOutput: "{\n  \"SubscriptionState\": \"INACTIVE\"\n}",
    },
  },
  {
    id: "sec118",
    domain: "security-and-compliance",
    text: "A security team collects logs from AWS CloudTrail, VPC Flow Logs, Route 53 resolver logs, and several third-party security tools. Analysts complain that every source uses a different format and that the data is scattered across many accounts. Which AWS service automatically centralizes this security data into a purpose-built data lake and normalizes it into the Open Cybersecurity Schema Framework (OCSF)?",
    options: [
      { id: "a", text: "Amazon Security Lake" },
      { id: "b", text: "AWS Security Hub" },
      { id: "c", text: "Amazon Macie" },
      { id: "d", text: "AWS CloudTrail Lake" },
    ],
    correctOptionIds: ["a"],
    explanation: "Amazon Security Lake automatically collects security data from AWS services and supported third-party sources across accounts and Regions, converts it to the OCSF open standard, and stores it in Amazon S3 buckets in your account. Analysts can then query it with Athena, OpenSearch, or partner SIEM tools. Security Hub aggregates findings, not raw logs; CloudTrail Lake stores only CloudTrail events.",
    optionRationale: {
      a: "Security Lake is the managed security data lake that normalizes multiple log sources into OCSF.",
      b: "Security Hub consolidates findings and compliance checks, but does not build a normalized log data lake.",
      c: "Macie discovers sensitive data in S3; it is not a log-aggregation service.",
      d: "CloudTrail Lake is limited to CloudTrail and a few event types; it does not normalize VPC Flow Logs or third-party sources into OCSF.",
    },
    referenceUrl: "https://docs.aws.amazon.com/security-lake/latest/userguide/what-is-security-lake.html",
    referenceLabel: "What is Amazon Security Lake?",
    consoleUrl: "https://console.aws.amazon.com/securitylake/home",
    consoleLabel: "Amazon Security Lake",
    diagram: "flowchart LR\n  CT[CloudTrail] --> SL[Amazon Security Lake]\n  VPC[VPC Flow Logs] --> SL\n  R53[Route 53 resolver logs] --> SL\n  Third[Third-party tools] --> SL\n  SL --> OCSF[\"OCSF data in S3\"]\n  OCSF --> Athena[Athena or SIEM]",
    cliExample: {
      description: "List the log sources currently enabled in Security Lake",
      command: "aws securitylake list-log-sources --regions us-east-1",
      sampleOutput: "{\n  \"sources\": [\n    {\n      \"account\": \"123456789012\",\n      \"region\": \"us-east-1\",\n      \"sources\": [\n        { \"awsLogSource\": { \"sourceName\": \"CLOUD_TRAIL_MGMT\", \"sourceVersion\": \"2.0\" } },\n        { \"awsLogSource\": { \"sourceName\": \"VPC_FLOW\", \"sourceVersion\": \"2.0\" } }\n      ]\n    }\n  ]\n}",
    },
  },
  {
    id: "sec119",
    domain: "security-and-compliance",
    text: "An application encrypts multi-gigabyte files before storing them. A developer notices that AWS KMS refuses to encrypt data larger than 4 KB directly. Which encryption pattern does AWS recommend so that the application can encrypt large data while still protecting the key with KMS?",
    options: [
      { id: "a", text: "Envelope encryption: ask KMS to generate a data key, encrypt the file locally with the plaintext data key, and store the encrypted data key alongside the file" },
      { id: "b", text: "Split the file into 4 KB chunks and call the KMS Encrypt API for each chunk" },
      { id: "c", text: "Export the KMS key material and use it directly inside the application" },
      { id: "d", text: "Disable encryption for files larger than 4 KB" },
    ],
    correctOptionIds: ["a"],
    explanation: "Envelope encryption is the pattern used by KMS and by AWS services such as S3 and EBS. The application calls GenerateDataKey, receives a plaintext data key and a copy encrypted under the KMS key, encrypts the data locally with the plaintext key, discards it, and stores the encrypted data key with the ciphertext. To decrypt, it sends the encrypted data key back to KMS. Only the small data key ever crosses the KMS API.",
    optionRationale: {
      a: "This is exactly envelope encryption: a KMS key encrypts a data key, and the data key encrypts the data.",
      b: "Chunking would require huge numbers of KMS calls, adding cost and latency; it is not the recommended approach.",
      c: "KMS key material cannot be exported in plaintext; the key never leaves the HSMs unencrypted.",
      d: "Leaving large files unencrypted violates the requirement and basic security practice.",
    },
    referenceUrl: "https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#enveloping",
    referenceLabel: "AWS KMS concepts: envelope encryption",
    consoleUrl: "https://console.aws.amazon.com/kms/home#/kms/keys",
    consoleLabel: "KMS > Customer managed keys",
    diagram: "flowchart LR\n  App[Application] -->|GenerateDataKey| KMS[KMS key]\n  KMS --> DK[Plaintext data key]\n  KMS --> EDK[Encrypted data key]\n  DK --> Enc[Encrypt large file locally]\n  Enc --> S3[Ciphertext plus encrypted data key stored]",
    cliExample: {
      description: "Generate a 256-bit data key protected by a KMS key for envelope encryption",
      command: "aws kms generate-data-key --key-id alias/app-data --key-spec AES_256",
      sampleOutput: "{\n  \"CiphertextBlob\": \"AQIDAHh...EXAMPLE...==\",\n  \"Plaintext\": \"K7gNU3sdo+OL0wNhqoVWhr3g6s1xYv72ol/pe/Unols=\",\n  \"KeyId\": \"arn:aws:kms:us-east-1:123456789012:key/1234abcd-12ab-34cd-56ef-1234567890ab\"\n}",
    },
  },
  {
    id: "sec120",
    domain: "security-and-compliance",
    text: "A company's security policy requires that the cryptographic material of encryption keys be rotated periodically without re-encrypting existing data or changing the key identifiers used by applications. Which AWS KMS feature satisfies this for a customer managed key?",
    options: [
      { id: "a", text: "Enable automatic key rotation on the customer managed key, which generates new key material on a schedule while keeping the same key ID and retaining old material to decrypt older data" },
      { id: "b", text: "Delete the key each year and create a new one with the same alias" },
      { id: "c", text: "Automatic rotation is available only for AWS managed keys, so the company must rotate manually" },
      { id: "d", text: "Rotate the IAM access keys of the users who use the KMS key" },
    ],
    correctOptionIds: ["a"],
    explanation: "Automatic key rotation for symmetric customer managed keys generates new backing key material on a configurable period (by default every year; customers can set 90 to 2560 days) while the key ID, ARN, alias, and policies stay the same. KMS keeps all previous key material so that data encrypted under it can still be decrypted, so no re-encryption is required.",
    optionRationale: {
      a: "Automatic rotation changes the backing material transparently and preserves the key ID and old material.",
      b: "Deleting a key makes all data encrypted under it permanently unrecoverable.",
      c: "AWS managed keys rotate automatically every year, but customer managed keys also support optional automatic rotation.",
      d: "IAM access key rotation is unrelated to KMS key material rotation.",
    },
    referenceUrl: "https://docs.aws.amazon.com/kms/latest/developerguide/rotate-keys.html",
    referenceLabel: "Rotating AWS KMS keys",
    consoleUrl: "https://console.aws.amazon.com/kms/home#/kms/keys",
    consoleLabel: "KMS > Customer managed keys",
    diagram: "flowchart LR\n  Key[\"KMS key ID stays the same\"] --> M1[Key material 2024]\n  Key --> M2[Key material 2025]\n  Key --> M3[Key material 2026 current]\n  M1 --> Dec[Old data still decrypts]\n  M3 --> Enc[New data encrypted]",
    cliExample: {
      description: "Enable automatic rotation on a customer managed key every 180 days",
      command: "aws kms enable-key-rotation --key-id 1234abcd-12ab-34cd-56ef-1234567890ab --rotation-period-in-days 180",
      sampleOutput: "",
    },
  },
  {
    id: "sec121",
    domain: "security-and-compliance",
    text: "A company moves its containerized application from self-managed EC2 hosts to Amazon ECS running on AWS Fargate. Under the AWS Shared Responsibility Model, which TWO security tasks remain the customer's responsibility after the move?",
    options: [
      { id: "a", text: "Patching vulnerabilities in the application libraries inside the container image" },
      { id: "b", text: "Granting the ECS task an IAM role with least-privilege permissions" },
      { id: "c", text: "Patching the operating system kernel of the underlying Fargate host" },
      { id: "d", text: "Physically securing the data center where the containers run" },
      { id: "e", text: "Maintaining the hypervisor that isolates Fargate tasks" },
    ],
    correctOptionIds: ["a", "b"],
    explanation: "With Fargate, AWS takes over management of the underlying compute infrastructure, host OS, kernel patching, and the isolation boundary between tasks. The customer still owns everything inside the container: the image and its dependencies, application code, secrets handling, IAM task roles, security groups, and network configuration.",
    optionRationale: {
      a: "The container image and its libraries are customer-supplied content that the customer must scan and patch.",
      b: "IAM configuration, including task roles, is always the customer's responsibility.",
      c: "Fargate is serverless compute; AWS patches and manages the host OS and kernel.",
      d: "Physical security is always AWS's responsibility.",
      e: "The virtualization and isolation layer is managed by AWS.",
    },
    referenceUrl: "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/security-fargate.html",
    referenceLabel: "AWS Fargate security in Amazon ECS",
    consoleUrl: "https://console.aws.amazon.com/ecs/v2/clusters",
    consoleLabel: "Amazon ECS > Clusters",
    diagram: "flowchart TB\n  Cust[Customer] --> Img[Container image and libraries]\n  Cust --> Role[IAM task role]\n  Cust --> SG[Security groups]\n  AWS[AWS] --> Host[Fargate host OS and kernel]\n  AWS --> Hyp[Isolation and hypervisor]\n  AWS --> DC[Physical data center]",
    cliExample: {
      description: "Register a Fargate task definition that runs with a least-privilege task role",
      command: "aws ecs register-task-definition --family web-api --requires-compatibilities FARGATE --network-mode awsvpc --cpu 256 --memory 512 --task-role-arn arn:aws:iam::123456789012:role/WebApiTaskRole --execution-role-arn arn:aws:iam::123456789012:role/ecsTaskExecutionRole --container-definitions '[{\"name\":\"api\",\"image\":\"123456789012.dkr.ecr.us-east-1.amazonaws.com/web-api:1.4.2\",\"essential\":true}]'",
      sampleOutput: "{\n  \"taskDefinition\": {\n    \"taskDefinitionArn\": \"arn:aws:ecs:us-east-1:123456789012:task-definition/web-api:7\",\n    \"family\": \"web-api\",\n    \"revision\": 7,\n    \"status\": \"ACTIVE\",\n    \"requiresCompatibilities\": [\"FARGATE\"]\n  }\n}",
    },
  },
  {
    id: "sec122",
    domain: "security-and-compliance",
    text: "A network ACL contains rule 100 that ALLOWS inbound TCP port 22 from 0.0.0.0/0 and rule 200 that DENIES inbound TCP port 22 from 203.0.113.0/24. An SSH connection arrives from 203.0.113.10. What happens?",
    options: [
      { id: "a", text: "The connection is allowed, because network ACL rules are evaluated in ascending rule-number order and the first matching rule (100, ALLOW) wins" },
      { id: "b", text: "The connection is denied, because an explicit deny always overrides an allow in a network ACL" },
      { id: "c", text: "The connection is denied, because network ACLs evaluate the most specific CIDR first" },
      { id: "d", text: "The connection is allowed only if a security group also allows it, otherwise both rules are ignored" },
    ],
    correctOptionIds: ["a"],
    explanation: "Network ACLs are ordered lists. Rules are evaluated starting from the lowest number, and as soon as a rule matches the traffic it is applied and evaluation stops. Because rule 100 matches first and allows, rule 200 is never reached. To block that range you would have to give the deny a lower number than the allow. This differs from IAM policies, where an explicit deny always wins, and from security groups, which have only allow rules.",
    optionRationale: {
      a: "Lowest rule number first, first match wins: rule 100 allows the traffic.",
      b: "Explicit-deny-wins is IAM policy logic, not network ACL logic.",
      c: "Network ACLs do not use longest-prefix matching; they use rule-number order.",
      d: "A security group is also checked, but the network ACL decision itself is ALLOW based on rule 100.",
    },
    referenceUrl: "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html#nacl-rules",
    referenceLabel: "Network ACL rules",
    consoleUrl: "https://console.aws.amazon.com/vpcconsole/home#acls:",
    consoleLabel: "VPC > Network ACLs",
    diagram: "flowchart LR\n  Pkt[\"SSH from 203.0.113.10\"] --> R100[\"Rule 100: allow port 22 from anywhere\"]\n  R100 --> Match[First match wins: ALLOWED]\n  R100 --> R200[\"Rule 200: deny 203.0.113.0/24 never evaluated\"]",
    cliExample: {
      description: "Add a deny rule with a lower number so it is evaluated before the broad allow",
      command: "aws ec2 create-network-acl-entry --network-acl-id acl-0123456789abcdef0 --ingress --rule-number 90 --protocol tcp --port-range From=22,To=22 --cidr-block 203.0.113.0/24 --rule-action deny",
      sampleOutput: "",
    },
  },
  {
    id: "sec123",
    domain: "security-and-compliance",
    text: "A government agency in Australia must guarantee that its customer data stored on AWS never leaves Australian territory. Which statement about data residency on AWS is correct?",
    options: [
      { id: "a", text: "Customer content stays in the Region the customer selects; AWS does not move or replicate it to another Region unless the customer chooses a feature that does so" },
      { id: "b", text: "AWS automatically replicates all customer data to at least two Regions on different continents for durability" },
      { id: "c", text: "Data residency can be enforced only by purchasing an AWS Outposts rack" },
      { id: "d", text: "AWS support engineers may relocate customer data to another Region during maintenance without notice" },
    ],
    correctOptionIds: ["a"],
    explanation: "Customers choose the AWS Region in which their content is stored, and AWS commits that it will not move or replicate that content outside the chosen Region except as required by law or when the customer enables a cross-Region feature such as S3 Cross-Region Replication or global tables. Regions such as Asia Pacific (Sydney) and Asia Pacific (Melbourne) let the agency keep data in Australia. Organizations can further enforce this with SCPs that deny actions in other Regions.",
    optionRationale: {
      a: "This is the AWS data residency commitment: customers control the Region and cross-Region movement is opt-in.",
      b: "Durability is achieved within a Region across Availability Zones; data is not copied to other continents automatically.",
      c: "Outposts is one option for on-premises placement, but choosing an in-country Region already satisfies residency.",
      d: "AWS does not access or relocate customer content in that way; the customer controls where content resides.",
    },
    referenceUrl: "https://aws.amazon.com/compliance/data-privacy-faq/",
    referenceLabel: "AWS Data Privacy FAQ",
    consoleUrl: "https://console.aws.amazon.com/organizations/v2/home/policies/service-control-policy",
    consoleLabel: "AWS Organizations > Service control policies",
    diagram: "flowchart LR\n  Agency[Agency chooses Sydney Region] --> Data[Customer content in ap-southeast-2]\n  Data --> AZ[Replicated across AZs in the same Region]\n  SCP[\"SCP denies other Regions\"] --> Data\n  Data -.-x Other[Other Regions unless customer opts in]",
    cliExample: {
      description: "Check which Regions are opted in and enabled for the account",
      command: "aws account list-regions --region-opt-status-contains ENABLED ENABLED_BY_DEFAULT --query 'Regions[?contains(RegionName, `ap-southeast`)]'",
      sampleOutput: "[\n  { \"RegionName\": \"ap-southeast-1\", \"RegionOptStatus\": \"ENABLED_BY_DEFAULT\" },\n  { \"RegionName\": \"ap-southeast-2\", \"RegionOptStatus\": \"ENABLED_BY_DEFAULT\" },\n  { \"RegionName\": \"ap-southeast-4\", \"RegionOptStatus\": \"ENABLED\" }\n]",
    },
  },
  {
    id: "sec124",
    domain: "security-and-compliance",
    text: "A new administrator is reading an IAM identity-based policy written in JSON. Which TWO of the following are elements of a policy statement?",
    options: [
      { id: "a", text: "Effect, which is either Allow or Deny" },
      { id: "b", text: "Action, which lists the API operations the statement applies to" },
      { id: "c", text: "Region, which lists the Regions the statement applies to" },
      { id: "d", text: "Owner, which identifies the IAM user who wrote the policy" },
      { id: "e", text: "Priority, which ranks the statement against other statements" },
    ],
    correctOptionIds: ["a", "b"],
    explanation: "An IAM policy statement is built from Effect (Allow or Deny), Action or NotAction, Resource or NotResource, an optional Condition block, an optional Sid, and, for resource-based policies, a Principal. There is no Region, Owner, or Priority element; Regions are restricted through Condition keys such as aws:RequestedRegion, and statement order has no effect because an explicit deny always wins.",
    optionRationale: {
      a: "Effect is required in every statement and is either Allow or Deny.",
      b: "Action (or NotAction) names the operations, for example s3:GetObject.",
      c: "Region is not a policy element; use a Condition on aws:RequestedRegion instead.",
      d: "Policies have no Owner element; authorship is tracked in CloudTrail, not in the policy.",
      e: "Statement order and priority do not exist; evaluation logic is deny-first regardless of order.",
    },
    referenceUrl: "https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements.html",
    referenceLabel: "IAM JSON policy element reference",
    consoleUrl: "https://console.aws.amazon.com/iam/home#/policies",
    consoleLabel: "IAM > Policies",
    diagram: "flowchart TB\n  Stmt[Policy statement] --> Effect[\"Effect: Allow or Deny\"]\n  Stmt --> Action[\"Action: s3:GetObject\"]\n  Stmt --> Resource[\"Resource: bucket ARN\"]\n  Stmt --> Cond[\"Condition: optional\"]",
    cliExample: {
      description: "Create a customer managed policy that uses Effect, Action, Resource, and Condition",
      command: "aws iam create-policy --policy-name ReadReportsSydneyOnly --policy-document '{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":[\"s3:GetObject\"],\"Resource\":\"arn:aws:s3:::reports-123456789012/*\",\"Condition\":{\"StringEquals\":{\"aws:RequestedRegion\":\"ap-southeast-2\"}}}]}'",
      sampleOutput: "{\n  \"Policy\": {\n    \"PolicyName\": \"ReadReportsSydneyOnly\",\n    \"Arn\": \"arn:aws:iam::123456789012:policy/ReadReportsSydneyOnly\",\n    \"DefaultVersionId\": \"v1\",\n    \"AttachmentCount\": 0\n  }\n}",
    },
  },
  {
    id: "sec125",
    domain: "security-and-compliance",
    text: "An administrator creates an IAM role that grants read access to DynamoDB. A Lambda function in the same account fails to assume the role, even though the role's permissions policy is correct. Which part of the role most likely needs to be fixed?",
    options: [
      { id: "a", text: "The role's trust policy, which defines which principals (such as the Lambda service) are allowed to assume the role" },
      { id: "b", text: "The role's permission boundary, which must list DynamoDB" },
      { id: "c", text: "The role's password policy, which must allow programmatic sign-in" },
      { id: "d", text: "The role's inline policy, which must include sts:AssumeRole on itself" },
    ],
    correctOptionIds: ["a"],
    explanation: "Every IAM role has two kinds of policies: a permissions policy that says what the role can do, and a trust policy (a resource-based policy on the role) that says who can assume it. If the trust policy does not list lambda.amazonaws.com as a trusted principal, the Lambda service cannot assume the role regardless of how generous the permissions policy is.",
    optionRationale: {
      a: "The trust policy is what controls role assumption; for Lambda it must trust the lambda.amazonaws.com service principal.",
      b: "A permission boundary limits maximum permissions but does not control who can assume the role.",
      c: "Roles have no passwords; password policies apply to IAM users' console sign-in.",
      d: "A role does not assume itself; sts:AssumeRole permission belongs on the caller side, and for AWS services the trust policy alone is what matters.",
    },
    referenceUrl: "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_terms-and-concepts.html",
    referenceLabel: "IAM roles terms and concepts",
    consoleUrl: "https://console.aws.amazon.com/iam/home#/roles",
    consoleLabel: "IAM > Roles",
    diagram: "flowchart LR\n  Lambda[Lambda service principal] -->|AssumeRole| Trust[\"Trust policy: who can assume\"]\n  Trust --> Role[IAM role]\n  Role --> Perm[\"Permissions policy: what it can do\"]\n  Perm --> DDB[DynamoDB read access]",
    cliExample: {
      description: "Replace the trust policy so that the Lambda service can assume the role",
      command: "aws iam update-assume-role-policy --role-name OrdersReaderRole --policy-document '{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Action\":\"sts:AssumeRole\"}]}'",
      sampleOutput: "",
    },
  },
  {
    id: "sec126",
    domain: "security-and-compliance",
    text: "A software vendor hosts an API in its own VPC behind a Network Load Balancer and wants dozens of customers to call it privately from their own VPCs without VPC peering, without exposing the API on the public internet, and without sharing IP address space. Which AWS capability should the vendor use?",
    options: [
      { id: "a", text: "Create an AWS PrivateLink endpoint service; customers connect through interface VPC endpoints in their own VPCs" },
      { id: "b", text: "Create a VPC peering connection with every customer VPC" },
      { id: "c", text: "Assign a public Elastic IP to the load balancer and restrict access with a security group" },
      { id: "d", text: "Set up a site-to-site VPN to each customer's VPC" },
    ],
    correctOptionIds: ["a"],
    explanation: "AWS PrivateLink lets a provider publish a service, fronted by a Network Load Balancer or Gateway Load Balancer, as an endpoint service. Consumers create interface endpoints (elastic network interfaces with private IPs) in their VPCs, and traffic flows over the AWS network only. There is no route-table exposure, no overlapping-CIDR problem, and the provider can approve each consumer individually.",
    optionRationale: {
      a: "PrivateLink endpoint services are the standard way to expose a service privately to many VPCs at scale.",
      b: "Peering does not scale to many customers, exposes entire CIDR ranges, and fails when address spaces overlap.",
      c: "A public IP puts the API on the internet, which the requirement forbids.",
      d: "VPNs traverse the internet, require per-customer tunnels, and still suffer from overlapping CIDR issues.",
    },
    referenceUrl: "https://docs.aws.amazon.com/vpc/latest/privatelink/privatelink-share-your-services.html",
    referenceLabel: "Share your services through AWS PrivateLink",
    consoleUrl: "https://console.aws.amazon.com/vpcconsole/home#EndpointServices:",
    consoleLabel: "VPC > Endpoint services",
    diagram: "flowchart LR\n  C1[Customer VPC A] --> EP1[Interface endpoint]\n  C2[Customer VPC B] --> EP2[Interface endpoint]\n  EP1 --> PL[PrivateLink endpoint service]\n  EP2 --> PL\n  PL --> NLB[Vendor Network Load Balancer]\n  NLB --> API[Vendor API]",
    cliExample: {
      description: "Publish the vendor NLB as a PrivateLink endpoint service that requires consumer approval",
      command: "aws ec2 create-vpc-endpoint-service-configuration --network-load-balancer-arns arn:aws:elasticloadbalancing:us-east-1:123456789012:loadbalancer/net/vendor-api-nlb/1a2b3c4d5e6f7a8b --acceptance-required",
      sampleOutput: "{\n  \"ServiceConfiguration\": {\n    \"ServiceType\": [{ \"ServiceType\": \"Interface\" }],\n    \"ServiceId\": \"vpce-svc-0123456789abcdef0\",\n    \"ServiceName\": \"com.amazonaws.vpce.us-east-1.vpce-svc-0123456789abcdef0\",\n    \"ServiceState\": \"Available\",\n    \"AcceptanceRequired\": true\n  }\n}",
    },
  },
  {
    id: "sec127",
    domain: "security-and-compliance",
    text: "A company wants to validate that its AWS-hosted application can withstand a large-scale DDoS attack by generating a simulated attack of several gigabits per second against its own CloudFront distribution and ALB. According to the AWS customer support policy for security testing, what must the company do?",
    options: [
      { id: "a", text: "Request and receive prior authorization from AWS, using an AWS-approved DDoS test partner, because DDoS simulation is not covered by the general permission for penetration testing" },
      { id: "b", text: "Nothing; DDoS simulation against your own resources is permitted without notice, like ordinary penetration testing" },
      { id: "c", text: "Enable AWS Shield Advanced, which automatically authorizes any customer to run DDoS simulations" },
      { id: "d", text: "Open a billing support case and pay a testing fee" },
    ],
    correctOptionIds: ["a"],
    explanation: "AWS permits customers to run ordinary penetration testing against a list of services without prior approval, but explicitly excludes DoS/DDoS attacks and DDoS simulation testing. Simulated DDoS testing is allowed only when performed through an AWS-approved DDoS test partner and after AWS has authorized the test window and targets. Other prohibited activities include DNS zone walking, port flooding, and protocol flooding.",
    optionRationale: {
      a: "DDoS simulation requires prior authorization from AWS and an approved partner; it is not part of the self-service testing policy.",
      b: "The self-service permission covers penetration testing of listed services, not DoS or DDoS attacks.",
      c: "Shield Advanced protects against attacks; it does not grant permission to launch them.",
      d: "There is no testing fee; the requirement is authorization, not payment.",
    },
    referenceUrl: "https://aws.amazon.com/security/ddos-simulation-testing/",
    referenceLabel: "AWS DDoS simulation testing policy",
    consoleUrl: "https://console.aws.amazon.com/wafv2/shieldv2#/overview",
    consoleLabel: "AWS Shield > Overview",
    diagram: "flowchart LR\n  Pen[Ordinary penetration test] --> OK[Allowed without approval]\n  DDoS[DDoS simulation] --> Partner[AWS-approved test partner]\n  Partner --> Auth[AWS authorization]\n  Auth --> Run[Test executed in approved window]",
    cliExample: {
      description: "Confirm Shield Advanced is protecting the CloudFront distribution before the authorized test",
      command: "aws shield list-protections",
      sampleOutput: "{\n  \"Protections\": [\n    {\n      \"Id\": \"a1b2c3d4-5678-90ab-cdef-EXAMPLE22222\",\n      \"Name\": \"prod-cloudfront\",\n      \"ResourceArn\": \"arn:aws:cloudfront::123456789012:distribution/E1EXAMPLE12345\",\n      \"ProtectionArn\": \"arn:aws:shield::123456789012:protection/a1b2c3d4-5678-90ab-cdef-EXAMPLE22222\"\n    }\n  ]\n}",
    },
  },
  {
    id: "sec128",
    domain: "security-and-compliance",
    text: "An e-commerce startup reads that AWS is certified as a PCI DSS Level 1 service provider and concludes that any application it deploys on AWS is therefore automatically PCI DSS compliant. Which statement correctly describes the situation?",
    options: [
      { id: "a", text: "The startup inherits controls for the infrastructure AWS manages, but it must still implement and demonstrate its own controls (application security, access management, logging, encryption configuration) to be compliant" },
      { id: "b", text: "The startup is correct; AWS's certification covers every workload deployed on AWS" },
      { id: "c", text: "The startup cannot process card data on AWS because only AWS itself is certified" },
      { id: "d", text: "The startup must obtain its own physical data center audit before using AWS" },
    ],
    correctOptionIds: ["a"],
    explanation: "Compliance on AWS follows the shared responsibility model. AWS's PCI DSS attestation covers the physical, network, and hypervisor layers that AWS operates, and customers can inherit those controls in their own assessment. The customer remains responsible for the controls that apply to how they build and configure their workload, and must complete their own PCI DSS assessment for the cardholder data environment.",
    optionRationale: {
      a: "Control inheritance reduces the customer's scope but never eliminates the customer's own compliance obligations.",
      b: "AWS compliance does not transfer automatically; the customer's configuration and application are outside AWS's attestation.",
      c: "Customers process card data on AWS every day; the certification enables it rather than forbids it.",
      d: "The physical data center controls are exactly the part the customer inherits from AWS's attestation via AWS Artifact.",
    },
    referenceUrl: "https://aws.amazon.com/compliance/pci-dss-level-1-faqs/",
    referenceLabel: "PCI DSS Level 1 FAQs",
    consoleUrl: "https://console.aws.amazon.com/artifact/home#/reports",
    consoleLabel: "AWS Artifact > Reports",
    diagram: "flowchart TB\n  AWS[AWS PCI DSS attestation] --> Inherit[Inherited controls: physical, network, hypervisor]\n  Cust[Customer assessment] --> Own[Own controls: app, IAM, logging, encryption]\n  Inherit --> Result[Customer PCI DSS compliance]\n  Own --> Result",
    cliExample: {
      description: "List AWS Artifact reports so the PCI DSS attestation can be downloaded for the assessor",
      command: "aws artifact list-reports --max-results 3",
      sampleOutput: "{\n  \"reports\": [\n    {\n      \"id\": \"report-abcdef0123456789\",\n      \"name\": \"PCI DSS Attestation of Compliance (AOC) and Responsibility Summary\",\n      \"version\": 5,\n      \"state\": \"PUBLISHED\",\n      \"category\": \"Certifications and Attestations\"\n    }\n  ]\n}",
    },
  },
  {
    id: "sec129",
    domain: "security-and-compliance",
    text: "A company discovers that one of its production Amazon RDS for PostgreSQL instances was created without encryption at rest. A new policy requires that all databases be encrypted. What must the company do to encrypt this existing instance?",
    options: [
      { id: "a", text: "Take a snapshot, create an encrypted copy of the snapshot with a KMS key, and restore a new DB instance from the encrypted copy, because encryption cannot be turned on for an existing unencrypted instance" },
      { id: "b", text: "Modify the instance and toggle the Encryption setting to enabled; RDS will encrypt the volume in place" },
      { id: "c", text: "Enable default EBS encryption in the Region, which retroactively encrypts the RDS storage" },
      { id: "d", text: "Nothing; RDS encrypts all instances at rest by default" },
    ],
    correctOptionIds: ["a"],
    explanation: "RDS encryption at rest is set when a DB instance is created and cannot be enabled on an existing unencrypted instance. The supported path is to snapshot the instance, copy the snapshot while specifying a KMS key (which produces an encrypted snapshot), and restore a new instance from that copy, then repoint the application. Encryption then covers the storage, automated backups, read replicas, and snapshots.",
    optionRationale: {
      a: "Snapshot, encrypted copy, restore is the documented procedure for encrypting an existing RDS instance.",
      b: "The encryption option is immutable after creation; modify-db-instance cannot enable it.",
      c: "EBS default encryption applies to EBS volumes you create; RDS manages its storage separately and requires its own setting.",
      d: "Encryption is optional at creation for RDS (though the console defaults to enabled), and this instance was created without it.",
    },
    referenceUrl: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.Encryption.html",
    referenceLabel: "Encrypting Amazon RDS resources",
    consoleUrl: "https://console.aws.amazon.com/rds/home#snapshots-list:",
    consoleLabel: "RDS > Snapshots",
    diagram: "flowchart LR\n  DB[Unencrypted RDS instance] --> Snap[Snapshot]\n  Snap -->|copy with KMS key| EncSnap[Encrypted snapshot]\n  EncSnap --> NewDB[New encrypted RDS instance]\n  NewDB --> App[Repoint application]",
    cliExample: {
      description: "Copy an unencrypted RDS snapshot into an encrypted snapshot using a KMS key",
      command: "aws rds copy-db-snapshot --source-db-snapshot-identifier orders-db-snap-20260918 --target-db-snapshot-identifier orders-db-snap-20260918-encrypted --kms-key-id arn:aws:kms:us-east-1:123456789012:key/1234abcd-12ab-34cd-56ef-1234567890ab",
      sampleOutput: "{\n  \"DBSnapshot\": {\n    \"DBSnapshotIdentifier\": \"orders-db-snap-20260918-encrypted\",\n    \"DBInstanceIdentifier\": \"orders-db\",\n    \"Engine\": \"postgres\",\n    \"Status\": \"creating\",\n    \"Encrypted\": true,\n    \"KmsKeyId\": \"arn:aws:kms:us-east-1:123456789012:key/1234abcd-12ab-34cd-56ef-1234567890ab\"\n  }\n}",
    },
  },
  {
    id: "sec130",
    domain: "security-and-compliance",
    text: "A company lets external partners upload files to an Amazon S3 bucket that an internal application later processes. The security team wants every newly uploaded object to be automatically scanned for malware before the application touches it, without building a scanning pipeline. Which managed capability provides this?",
    options: [
      { id: "a", text: "Amazon GuardDuty Malware Protection for S3, which scans new objects in the bucket and tags them with the scan result" },
      { id: "b", text: "Amazon Macie, which classifies objects as malware or clean" },
      { id: "c", text: "S3 Object Lock, which rejects infected uploads" },
      { id: "d", text: "AWS Shield Advanced, which inspects file contents at the edge" },
    ],
    correctOptionIds: ["a"],
    explanation: "GuardDuty Malware Protection for S3 can be enabled on individual buckets, even without the rest of GuardDuty. It scans newly uploaded objects for malware, tags each object with a result such as NO_THREATS_FOUND or THREATS_FOUND, and publishes results to EventBridge, so the application can be configured to process only clean objects. Macie discovers sensitive data such as PII, not malware.",
    optionRationale: {
      a: "Malware Protection for S3 is the purpose-built, agentless scan for new objects in a bucket.",
      b: "Macie identifies sensitive data types and access risks; it does not detect malware.",
      c: "Object Lock prevents deletion and overwriting; it does not inspect content.",
      d: "Shield mitigates DDoS attacks and has nothing to do with file scanning.",
    },
    referenceUrl: "https://docs.aws.amazon.com/guardduty/latest/ug/gdu-malware-protection-s3.html",
    referenceLabel: "GuardDuty Malware Protection for S3",
    consoleUrl: "https://console.aws.amazon.com/guardduty/home#/malware-protection-s3",
    consoleLabel: "GuardDuty > Malware Protection for S3",
    diagram: "flowchart LR\n  Partner[Partner uploads file] --> S3[S3 bucket]\n  S3 --> GD[GuardDuty Malware Protection for S3]\n  GD --> Tag[\"Object tag: scan result\"]\n  GD --> EB[EventBridge event]\n  Tag --> App[Application processes clean objects only]",
    cliExample: {
      description: "Enable Malware Protection for S3 on a bucket with object tagging of scan results",
      command: "aws guardduty create-malware-protection-plan --role arn:aws:iam::123456789012:role/GuardDutyMalwareProtectionS3Role --protected-resource '{\"S3Bucket\":{\"BucketName\":\"partner-uploads-123456789012\"}}' --actions '{\"Tagging\":{\"Status\":\"ENABLED\"}}'",
      sampleOutput: "{\n  \"MalwareProtectionPlanId\": \"a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4\"\n}",
    },
  },
  {
    id: "sec131",
    domain: "security-and-compliance",
    text: "An administrator wants IAM users to sign in to the console using phishing-resistant MFA and also wants each user to be able to register a backup MFA device in case the primary one is lost. Which statement about IAM MFA is correct?",
    options: [
      { id: "a", text: "IAM supports passkeys and FIDO2 security keys as phishing-resistant MFA, and a single IAM user or root user can register up to eight MFA devices" },
      { id: "b", text: "IAM supports only virtual authenticator apps, and each user may register exactly one device" },
      { id: "c", text: "Passkeys can be used only for the root user, not for IAM users" },
      { id: "d", text: "Backup MFA devices require AWS Support to enable on the account" },
    ],
    correctOptionIds: ["a"],
    explanation: "IAM supports several MFA types: passkeys and security keys (FIDO2/WebAuthn, which are phishing-resistant), virtual authenticator apps (TOTP), and hardware TOTP tokens. Since 2022, each IAM user and the root user can register up to eight MFA devices of any combination, which allows a backup device without any support involvement.",
    optionRationale: {
      a: "Passkeys and FIDO2 keys are supported, and the limit is eight devices per user, so a backup is easy to configure.",
      b: "Multiple device types are supported and a user can have up to eight devices.",
      c: "Passkeys are supported for both IAM users and the root user.",
      d: "Adding a second device is self-service in the IAM console; no support case is needed.",
    },
    referenceUrl: "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa.html",
    referenceLabel: "Multi-factor authentication in IAM",
    consoleUrl: "https://console.aws.amazon.com/iam/home#/security_credentials",
    consoleLabel: "IAM > My security credentials",
    diagram: "flowchart LR\n  User[IAM user] --> Key1[\"Primary: FIDO2 security key\"]\n  User --> Key2[\"Backup: passkey on phone\"]\n  User --> App[\"Optional: virtual TOTP app\"]\n  Key1 --> Limit[Up to 8 devices per user]",
    cliExample: {
      description: "List the MFA devices registered for an IAM user",
      command: "aws iam list-mfa-devices --user-name alice",
      sampleOutput: "{\n  \"MFADevices\": [\n    {\n      \"UserName\": \"alice\",\n      \"SerialNumber\": \"arn:aws:iam::123456789012:u2f/user/alice/yubikey-primary-EXAMPLE1234\",\n      \"EnableDate\": \"2026-01-12T09:15:32+00:00\"\n    },\n    {\n      \"UserName\": \"alice\",\n      \"SerialNumber\": \"arn:aws:iam::123456789012:u2f/user/alice/passkey-backup-EXAMPLE5678\",\n      \"EnableDate\": \"2026-01-12T09:20:04+00:00\"\n    }\n  ]\n}",
    },
  },
  {
    id: "sec132",
    domain: "security-and-compliance",
    text: "A company's regulator requires that the encryption keys used for objects in Amazon S3 are generated and held by the company itself and are never stored by AWS, while still letting S3 perform the encryption and decryption. Which S3 server-side encryption option meets this requirement?",
    options: [
      { id: "a", text: "SSE-C, where the client supplies its own encryption key in each request and S3 discards the key after use" },
      { id: "b", text: "SSE-S3, where S3 manages the keys" },
      { id: "c", text: "SSE-KMS with an AWS managed key" },
      { id: "d", text: "S3 Bucket Keys" },
    ],
    correctOptionIds: ["a"],
    explanation: "With server-side encryption with customer-provided keys (SSE-C), the customer sends the encryption key in the request headers over HTTPS. S3 uses the key to encrypt or decrypt the object and then removes it from memory; it stores only a salted HMAC of the key to validate future requests. AWS never stores the key, so the customer must manage and supply it on every request.",
    optionRationale: {
      a: "SSE-C keeps key ownership with the customer while S3 still does the cryptographic work.",
      b: "SSE-S3 keys are generated, stored, and managed by AWS.",
      c: "SSE-KMS keys are stored in AWS KMS, so AWS holds the key material.",
      d: "S3 Bucket Keys are a cost-reduction feature for SSE-KMS, not a separate key-ownership model.",
    },
    referenceUrl: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/ServerSideEncryptionCustomerKeys.html",
    referenceLabel: "Using server-side encryption with customer-provided keys (SSE-C)",
    consoleUrl: "https://console.aws.amazon.com/s3/home",
    consoleLabel: "Amazon S3 > Buckets",
    diagram: "flowchart LR\n  Client[Client holds key] -->|HTTPS request with key| S3[S3 encrypts object]\n  S3 --> Obj[Encrypted object stored]\n  S3 --> Discard[Key discarded after use]\n  Client -->|same key on GET| S3",
    cliExample: {
      description: "Upload an object using SSE-C with a customer-provided 256-bit key",
      command: "aws s3api put-object --bucket regulated-data-123456789012 --key contracts/2026-q3.pdf --body 2026-q3.pdf --sse-customer-algorithm AES256 --sse-customer-key fileb://customer-key.bin",
      sampleOutput: "{\n  \"ETag\": \"\\\"5d41402abc4b2a76b9719d911017c592\\\"\",\n  \"SSECustomerAlgorithm\": \"AES256\",\n  \"SSECustomerKeyMD5\": \"P1nk3bq4ExAmPLeKeyMD5HashValueA==\"\n}",
    },
  },
  {
    id: "sec133",
    domain: "security-and-compliance",
    text: "A company uses AWS Organizations with SCPs to limit what its own IAM principals can do. However, it also wants to guarantee that S3 buckets in any member account can never be accessed by principals from outside the organization, even if a developer writes a permissive bucket policy. Which Organizations policy type is designed for this?",
    options: [
      { id: "a", text: "Resource control policies (RCPs), which set the maximum available permissions on resources across the organization regardless of who is calling" },
      { id: "b", text: "Service control policies (SCPs), because they also apply to external principals" },
      { id: "c", text: "Tag policies" },
      { id: "d", text: "Backup policies" },
    ],
    correctOptionIds: ["a"],
    explanation: "SCPs restrict what principals inside the organization can do, but they have no effect on external principals accessing a resource through its resource-based policy. Resource control policies (RCPs) close that gap: they are attached to the organization, OUs, or accounts and act as a ceiling on resource-based policies for supported services such as S3, KMS, SQS, Secrets Manager, and STS, for example by denying access unless aws:PrincipalOrgID matches the organization.",
    optionRationale: {
      a: "RCPs are the organization-wide data perimeter control for resources, covering external as well as internal callers.",
      b: "SCPs apply only to principals in member accounts, not to external principals granted access by a bucket policy.",
      c: "Tag policies standardize tag keys and values; they do not control access.",
      d: "Backup policies manage AWS Backup plans, not access to resources.",
    },
    referenceUrl: "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_rcps.html",
    referenceLabel: "Resource control policies (RCPs)",
    consoleUrl: "https://console.aws.amazon.com/organizations/v2/home/policies/resource-control-policy",
    consoleLabel: "AWS Organizations > Resource control policies",
    diagram: "flowchart LR\n  SCP[SCP] --> Internal[Limits internal principals]\n  RCP[RCP] --> Resource[Limits access to resources]\n  External[External principal] --> Resource\n  Resource --> S3[S3 bucket in member account]",
    cliExample: {
      description: "Create an RCP that denies S3 access to any principal outside the organization",
      command: "aws organizations create-policy --name DenyExternalS3Access --type RESOURCE_CONTROL_POLICY --content '{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Deny\",\"Principal\":\"*\",\"Action\":\"s3:*\",\"Resource\":\"*\",\"Condition\":{\"StringNotEqualsIfExists\":{\"aws:PrincipalOrgID\":\"o-exampleorgid\"},\"BoolIfExists\":{\"aws:PrincipalIsAWSService\":\"false\"}}}]}'",
      sampleOutput: "{\n  \"Policy\": {\n    \"PolicySummary\": {\n      \"Id\": \"p-examplercp01\",\n      \"Arn\": \"arn:aws:organizations::123456789012:policy/o-exampleorgid/resource_control_policy/p-examplercp01\",\n      \"Name\": \"DenyExternalS3Access\",\n      \"Type\": \"RESOURCE_CONTROL_POLICY\",\n      \"AwsManaged\": false\n    }\n  }\n}",
    },
  },
  {
    id: "sec134",
    domain: "security-and-compliance",
    text: "A security architect is classifying the company's AWS security controls as either preventive (stop an unwanted action before it happens) or detective (identify an unwanted action after it happens). Which TWO of the following are PREVENTIVE controls?",
    options: [
      { id: "a", text: "A service control policy that denies the ability to disable CloudTrail" },
      { id: "b", text: "A security group that allows inbound traffic only on port 443" },
      { id: "c", text: "Amazon GuardDuty findings for anomalous API calls" },
      { id: "d", text: "An AWS Config rule that reports unencrypted EBS volumes" },
      { id: "e", text: "AWS CloudTrail logs of console sign-in events" },
    ],
    correctOptionIds: ["a", "b"],
    explanation: "Preventive controls enforce a boundary so that a violation cannot occur: SCPs, IAM policies, permission boundaries, security groups, NACLs, and S3 Block Public Access are examples. Detective controls observe and report on activity that has already happened: GuardDuty, AWS Config, CloudTrail, Security Hub, and Macie. Well-architected environments use both, with detective findings often feeding automated responsive controls.",
    optionRationale: {
      a: "An SCP deny stops the action from ever succeeding, which is preventive.",
      b: "A security group blocks unwanted traffic before it reaches the instance.",
      c: "GuardDuty analyzes activity that already occurred and raises findings; it is detective.",
      d: "Config evaluates resources after they exist and reports non-compliance; it is detective.",
      e: "CloudTrail records events after they happen; it is detective.",
    },
    referenceUrl: "https://docs.aws.amazon.com/prescriptive-guidance/latest/aws-security-controls/introduction.html",
    referenceLabel: "AWS security controls: preventative, detective, and responsive",
    consoleUrl: "https://console.aws.amazon.com/organizations/v2/home/policies/service-control-policy",
    consoleLabel: "AWS Organizations > Service control policies",
    diagram: "flowchart LR\n  Prev[Preventive controls] --> SCP[SCP deny]\n  Prev --> SG[Security group]\n  Det[Detective controls] --> GD[GuardDuty]\n  Det --> Config[AWS Config rules]\n  Det --> CT[CloudTrail]",
    cliExample: {
      description: "Create an SCP that prevents anyone in the OU from stopping or deleting CloudTrail trails",
      command: "aws organizations create-policy --name ProtectCloudTrail --type SERVICE_CONTROL_POLICY --content '{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Deny\",\"Action\":[\"cloudtrail:StopLogging\",\"cloudtrail:DeleteTrail\"],\"Resource\":\"*\"}]}'",
      sampleOutput: "{\n  \"Policy\": {\n    \"PolicySummary\": {\n      \"Id\": \"p-examplescp02\",\n      \"Name\": \"ProtectCloudTrail\",\n      \"Type\": \"SERVICE_CONTROL_POLICY\",\n      \"AwsManaged\": false\n    }\n  }\n}",
    },
  },
  {
    id: "sec135",
    domain: "security-and-compliance",
    text: "The AWS Trust & Safety team emails a company's account contacts stating that an EC2 instance in the company's account has been reported for sending spam and port-scanning external hosts. What is the appropriate response?",
    options: [
      { id: "a", text: "Investigate and remediate the instance promptly (for example, isolate it and remove the malicious process), then reply to the abuse report explaining the actions taken, because unresolved abuse can lead to the resources or account being suspended" },
      { id: "b", text: "Ignore the email, because AWS is responsible for security of the cloud and will fix the instance" },
      { id: "c", text: "Delete the AWS account immediately to avoid liability" },
      { id: "d", text: "Forward the email to the company's ISP, since abuse handling is the ISP's responsibility" },
    ],
    correctOptionIds: ["a"],
    explanation: "When AWS receives an abuse report about a customer's resources, the Trust & Safety team notifies the account's registered contacts and expects the customer to investigate, stop the abusive activity, and respond with the steps taken. Under the shared responsibility model, the workload inside the instance is the customer's responsibility. Keeping the account's alternate contacts (especially the Security and Operations contacts) current ensures these notices reach the right team.",
    optionRationale: {
      a: "Investigating, remediating, and replying to Trust & Safety is the expected process and prevents escalation.",
      b: "The guest OS and what runs on the instance are the customer's responsibility, not AWS's.",
      c: "Closing the account is unnecessary and does not remediate the compromised resource.",
      d: "AWS is the network provider here; the ISP has no role in this report.",
    },
    referenceUrl: "https://repost.aws/knowledge-center/aws-abuse-report",
    referenceLabel: "Respond to an AWS abuse report",
    consoleUrl: "https://console.aws.amazon.com/billing/home#/account",
    consoleLabel: "Account settings > Alternate contacts",
    diagram: "flowchart LR\n  Report[Abuse report received by AWS] --> TS[AWS Trust and Safety notice]\n  TS --> Contacts[Account security contact]\n  Contacts --> Fix[Isolate and remediate instance]\n  Fix --> Reply[Reply with actions taken]\n  Reply --> Closed[Case resolved]",
    cliExample: {
      description: "Set the Security alternate contact so abuse notices reach the security team",
      command: "aws account put-alternate-contact --alternate-contact-type SECURITY --name \"Security Operations\" --title \"SecOps\" --email-address secops@example.com --phone-number \"+1-555-0100\"",
      sampleOutput: "",
    },
  },
  {
    id: "sec136",
    domain: "security-and-compliance",
    text: "A compliance officer asks which AWS storage services encrypt data at rest without the customer having to configure anything. Which TWO statements are correct?",
    options: [
      { id: "a", text: "Amazon S3 automatically applies server-side encryption (SSE-S3) to every new object as the default, at no additional cost" },
      { id: "b", text: "Amazon DynamoDB always encrypts all table data at rest and this cannot be disabled" },
      { id: "c", text: "Amazon EBS volumes are always encrypted and there is no option to create an unencrypted volume" },
      { id: "d", text: "Amazon RDS databases cannot be encrypted at rest" },
      { id: "e", text: "Encryption at rest on AWS is available only for customers on the Enterprise Support plan" },
    ],
    correctOptionIds: ["a", "b"],
    explanation: "Since January 2023, Amazon S3 encrypts every new object with SSE-S3 by default unless another option is specified, with no performance or cost impact. DynamoDB has always encrypted data at rest using KMS keys (AWS owned by default) and offers no way to turn encryption off. EBS encryption is optional unless the account-level default is enabled, and RDS supports encryption at rest when the instance is created.",
    optionRationale: {
      a: "Default S3 encryption with SSE-S3 is automatic for all new objects in all buckets.",
      b: "DynamoDB encryption at rest is mandatory; customers can only choose which KMS key type to use.",
      c: "EBS encryption is opt-in per volume unless 'encryption by default' is enabled for the Region.",
      d: "RDS supports encryption at rest with KMS; it must be chosen at creation.",
      e: "Encryption features are available to every customer regardless of support plan.",
    },
    referenceUrl: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/default-encryption-faq.html",
    referenceLabel: "Amazon S3 default encryption FAQ",
    consoleUrl: "https://console.aws.amazon.com/s3/home",
    consoleLabel: "Amazon S3 > Buckets",
    diagram: "flowchart LR\n  S3[Amazon S3] --> S3E[\"SSE-S3 by default for new objects\"]\n  DDB[DynamoDB] --> DDBE[\"Always encrypted at rest\"]\n  EBS[Amazon EBS] --> EBSE[\"Optional unless default encryption enabled\"]\n  RDS[Amazon RDS] --> RDSE[\"Chosen at creation\"]",
    cliExample: {
      description: "Confirm a DynamoDB table's encryption at rest status and key type",
      command: "aws dynamodb describe-table --table-name Orders --query 'Table.SSEDescription'",
      sampleOutput: "{\n  \"Status\": \"ENABLED\",\n  \"SSEType\": \"KMS\",\n  \"KMSMasterKeyArn\": \"arn:aws:kms:us-east-1:123456789012:key/1234abcd-12ab-34cd-56ef-1234567890ab\"\n}",
    },
  },
  {
    id: "sec137",
    domain: "security-and-compliance",
    text: "A development team runs an Amazon RDS for MySQL database and stores the master user password in application configuration files. The security team wants the master password to be generated, stored, and rotated automatically without the developers ever handling it. Which approach requires the LEAST operational effort?",
    options: [
      { id: "a", text: "Enable RDS managed master user password integration with AWS Secrets Manager, so RDS creates the secret and rotates the password on a schedule" },
      { id: "b", text: "Store the password in a Systems Manager Parameter Store String parameter and rotate it manually every quarter" },
      { id: "c", text: "Encrypt the configuration file with AWS KMS and commit it to the source repository" },
      { id: "d", text: "Write a cron job on an EC2 instance that changes the password and emails the new value to developers" },
    ],
    correctOptionIds: ["a"],
    explanation: "Amazon RDS (and Aurora) can manage the master user password in AWS Secrets Manager. When enabled, RDS generates the password, stores it as a secret encrypted with KMS, and rotates it automatically (every seven days by default) with no Lambda function or custom code. Applications retrieve the current credential from Secrets Manager using IAM permissions, so the value never lives in configuration files.",
    optionRationale: {
      a: "RDS managed master passwords in Secrets Manager remove the credential from developer hands and rotate it automatically.",
      b: "Parameter Store has no built-in rotation, and a plain String parameter is not even encrypted.",
      c: "Encrypting a file still leaves the secret in the repository and provides no rotation.",
      d: "A custom cron job and emailing passwords is insecure and high-effort compared with the managed integration.",
    },
    referenceUrl: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-secrets-manager.html",
    referenceLabel: "Password management with Amazon RDS and AWS Secrets Manager",
    consoleUrl: "https://console.aws.amazon.com/secretsmanager/listsecrets",
    consoleLabel: "AWS Secrets Manager > Secrets",
    diagram: "flowchart LR\n  RDS[RDS instance] -->|creates and rotates| SM[Secrets Manager secret]\n  SM --> KMS[Encrypted with KMS key]\n  App[Application with IAM role] -->|GetSecretValue| SM\n  App --> RDS",
    cliExample: {
      description: "Switch an existing RDS instance to a Secrets Manager managed master password",
      command: "aws rds modify-db-instance --db-instance-identifier orders-db --manage-master-user-password --apply-immediately",
      sampleOutput: "{\n  \"DBInstance\": {\n    \"DBInstanceIdentifier\": \"orders-db\",\n    \"Engine\": \"mysql\",\n    \"DBInstanceStatus\": \"available\",\n    \"MasterUserSecret\": {\n      \"SecretArn\": \"arn:aws:secretsmanager:us-east-1:123456789012:secret:rds!db-a1b2c3d4-5678-90ab-cdef-EXAMPLE33333-AbCdEf\",\n      \"SecretStatus\": \"creating\",\n      \"KmsKeyId\": \"arn:aws:kms:us-east-1:123456789012:key/1234abcd-12ab-34cd-56ef-1234567890ab\"\n    }\n  }\n}",
    },
  },
];
