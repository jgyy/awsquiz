import { Domain, Question } from "./types.js";

/** A curated YouTube video covering one CLF-C02 topic. */
export interface VideoEntry {
  /** YouTube video ID (the `v=` query parameter). */
  id: string;
  label: string;
  /** Case-insensitive phrases that indicate a question is about this topic. Longer phrases score higher. */
  keywords: string[];
}

/**
 * Curated catalog of verified YouTube videos, keyed by topic.
 * Every ID was checked live against YouTube's oEmbed endpoint when added.
 */
export const videoCatalog: VideoEntry[] = [
  // Cloud concepts
  { id: "mxT233EdY5c", label: "What is Cloud Computing? (AWS)", keywords: ["cloud computing", "on-premises", "on premises", "capital expense", "variable expense", "trade capital", "economies of scale", "pay-as-you-go", "agility", "elasticity"] },
  { id: "a9__D53WsUs", label: "What is AWS? (AWS)", keywords: ["what is aws", "aws cloud", "benefits of aws"] },
  { id: "5odtVlORq_w", label: "6 Pillars of the Well-Architected Framework", keywords: ["well-architected", "well architected", "six pillars", "five pillars", "pillars"] },
  { id: "WuL_MueH4Xk", label: "AWS Cloud Adoption Framework (CAF) Breakdown", keywords: ["cloud adoption framework", "caf", "perspectives"] },
  { id: "0hlZvybbaGk", label: "AWS Global Infrastructure Overview", keywords: ["region", "regions", "global infrastructure", "data center", "data centers", "geographic", "closest to"] },
  { id: "PHjYRn_mrs0", label: "AWS Edge Locations and CloudFront", keywords: ["edge location", "edge locations", "points of presence", "point of presence", "regional edge cache"] },
  { id: "bJCmZn9fASM", label: "7 Rs Migration Strategies and AWS Migration Services", keywords: ["migration", "migrate", "migrating", "replatform", "refactor", "repurchase", "retire", "retain", "relocate", "7 rs", "six rs", "seven rs", "migration strategy", "migration strategies"] },
  { id: "ppG2FFB0mMQ", label: "AWS Outposts: Overview and How It Works", keywords: ["outposts", "hybrid", "on-premises hardware", "own data center"] },
  { id: "QMcqZ_vIXfE", label: "Console, CLI, or SDK Explained", keywords: ["aws cli", "command line interface", "sdk", "software development kit", "management console", "cloudshell", "infrastructure as code", "programmatic access"] },
  { id: "JIbIYCM48to", label: "Top 50+ AWS Services Explained in 10 Minutes", keywords: [] },

  // Security and compliance
  { id: "9Pk2J_5qnlk", label: "Learn AWS IAM in Less Than 10 Minutes (AWS)", keywords: ["iam", "identity and access management", "least privilege", "permissions", "principal", "authentication", "authorization"] },
  { id: "DgTLq1NfJI4", label: "IAM Roles vs Users vs Groups", keywords: ["iam role", "iam roles", "iam user", "iam users", "iam group", "iam groups", "access key", "access keys", "temporary credentials", "sts", "assume role"] },
  { id: "MiPItT74ZLs", label: "Service Control Policies (SCPs) Explained", keywords: ["service control polic", "scp", "scps", "restrict what", "maximum permissions", "guardrails across"] },
  { id: "zbI8owkUDrc", label: "AWS Root User Explained in 5 Minutes", keywords: ["root user", "root account"] },
  { id: "di95GQdEc0w", label: "AWS Multi-Factor Authentication (MFA) Explained", keywords: ["mfa", "multi-factor", "multi factor", "password policy", "access analyzer", "phishing-resistant", "passkey", "passkeys", "fido"] },
  { id: "zSUUBAxjIbk", label: "AWS Key Management Service (KMS)", keywords: ["kms", "key management service", "encryption key", "encryption keys", "cloudhsm", "hsm", "encryption at rest", "encrypt", "envelope encryption"] },
  { id: "-9YzrRCzaKM", label: "DDoS Protection with AWS Shield and AWS WAF", keywords: ["shield", "waf", "web application firewall", "ddos", "sql injection", "cross-site scripting", "layer 7", "layer 3", "layer 4"] },
  { id: "M4aOKikd7-s", label: "Amazon GuardDuty Deep Dive", keywords: ["guardduty", "threat detection", "malicious", "compromised", "unusual api"] },
  { id: "V3WVSBsq3-g", label: "Amazon Inspector Tutorial", keywords: ["inspector", "vulnerability", "vulnerabilities"] },
  { id: "S5X0PnBwp9I", label: "CloudWatch vs CloudTrail: What's the Difference?", keywords: ["cloudwatch vs cloudtrail", "cloudwatch and cloudtrail", "cloudtrail and cloudwatch", "difference between cloudwatch"] },
  { id: "qHdFoYSrUvk", label: "AWS Config Tutorial (Stephane Maarek)", keywords: ["aws config", "config rule", "config rules", "configuration history", "configuration change", "configuration changes", "compliance of resources"] },
  { id: "O307zdIOmWo", label: "Using AWS Artifact to Retrieve Compliance Reports", keywords: ["artifact", "compliance report", "compliance reports", "soc", "pci", "hipaa", "iso 27001", "audit report", "audit reports", "attestation"] },
  { id: "ItzzgWe7elE", label: "AWS Secrets Manager Step-by-Step", keywords: ["secrets manager", "rotate", "rotation", "database credentials", "secret", "secrets"] },
  { id: "nBusvrDEjdk", label: "AWS Security Hub Demo", keywords: ["security hub", "security findings", "security posture", "cis benchmark"] },
  { id: "RR4MtDl09Vk", label: "What is Amazon Macie?", keywords: ["macie", "sensitive data", "personally identifiable", "pii"] },
  { id: "EAWWTjjQWz8", label: "Amazon Cognito: User Pool vs Identity Pool", keywords: ["cognito", "user pool", "identity pool", "sign-up", "sign-in", "social identity"] },
  { id: "Nk77te-cksQ", label: "What is AWS Certificate Manager?", keywords: ["certificate manager", "acm", "ssl", "tls", "certificate", "certificates", "in transit"] },
  { id: "pyiJbkJROTE", label: "Understanding AWS Control Tower", keywords: ["control tower", "landing zone", "guardrail", "guardrails", "multi-account"] },

  // Compute
  { id: "YH_DVenJHII", label: "Amazon EC2 Basics", keywords: ["ec2", "elastic compute cloud", "virtual server", "virtual servers", "user data", "key pair"] },
  { id: "4gQ5SOfBUm4", label: "EC2 Instance Types Explained", keywords: ["instance type", "instance types", "compute optimized", "memory optimized", "storage optimized", "accelerated computing", "general purpose", "burstable"] },
  { id: "rcWgcFMlwFw", label: "EC2 Auto Scaling: How it Works", keywords: ["auto scaling", "autoscaling", "scale out", "scale in", "scaling policy", "scaling policies", "horizontal scaling", "vertical scaling", "launch template"] },
  { id: "qpHLRc4Qt1E", label: "Elastic Load Balancing Introduction", keywords: ["load balancer", "load balancing", "elb", "alb", "nlb", "application load balancer", "network load balancer", "health check", "health checks"] },
  { id: "eOBq__h4OJ4", label: "Introduction to AWS Lambda", keywords: ["lambda", "serverless", "function", "functions", "event-driven"] },
  { id: "DVrGXjjkpig", label: "ECS vs Fargate: When To Use What", keywords: ["ecs", "elastic container service", "container", "containers", "docker", "task definition", "cluster"] },
  { id: "SrwxAScdyT0", label: "Introduction to AWS Elastic Beanstalk", keywords: ["elastic beanstalk", "beanstalk", "platform as a service", "paas"] },
  { id: "FRN27b1VLXg", label: "AWS Lightsail Explained: Simplified Cloud VPS", keywords: ["lightsail"] },
  { id: "T4aAWrGHmxQ", label: "How AWS Batch Works", keywords: ["aws batch", "batch job", "batch jobs", "batch processing"] },
  { id: "juCUwETXv0I", label: "What is AWS Compute Optimizer?", keywords: ["compute optimizer", "rightsizing", "right-sizing", "right sizing", "over-provisioned", "underutilized"] },

  // Storage
  { id: "R0fqpQd9mSM", label: "Amazon S3 Explained in 10 Minutes", keywords: ["s3", "simple storage service", "bucket", "buckets", "object storage", "unlimited storage", "objects"] },
  { id: "w5ocEIDR5WE", label: "Amazon S3 Storage Classes", keywords: ["storage class", "storage classes", "s3 standard", "infrequent access", "intelligent-tiering", "intelligent tiering", "one zone"] },
  { id: "Fo_cTVelDKk", label: "S3 Storage Classes Explained (Demo)", keywords: ["s3 standard-ia", "s3 one zone-ia", "s3 express", "reduced redundancy"] },
  { id: "c5PKWc_n2Kc", label: "S3 Lifecycle Management Policies", keywords: ["lifecycle", "lifecycle policy", "lifecycle rule", "transition", "expire", "expiration"] },
  { id: "gMzVi7Z8zBo", label: "Amazon S3 Glacier Storage Classes", keywords: ["glacier", "archive", "archival", "deep archive", "retrieval", "vault lock"] },
  { id: "smF92POVrhE", label: "EBS vs EFS vs Instance Store", keywords: ["instance store", "ephemeral", "fsx", "fsx for windows", "fsx for lustre", "ebs vs efs", "storage options", "storage types"] },
  { id: "zxlV86Wh7EQ", label: "AWS Storage Gateway Explained", keywords: ["storage gateway", "file gateway", "volume gateway", "tape gateway", "on-premises storage"] },
  { id: "zXyudn7KeZM", label: "AWS Snow Family Explained", keywords: ["snow family", "snowball", "snowcone", "snowmobile", "petabyte", "petabytes", "physical device", "limited bandwidth", "offline transfer", "datasync", "transfer family"] },
  { id: "ihVcyD3MCvI", label: "How AWS Backup Works", keywords: ["aws backup", "backup plan", "backup plans", "backups", "backup vault", "centralized backup", "centrally manage backups"] },

  // Databases
  { id: "eMzCI7S1P9M", label: "Understanding Amazon RDS", keywords: ["rds", "relational database service", "relational database", "mysql", "postgresql", "sql server", "oracle", "mariadb", "managed database", "automated backups", "patching the database"] },
  { id: "l7IpsIzMa6E", label: "What is Amazon Aurora", keywords: ["aurora"] },
  { id: "kxW3-k7NXwo", label: "What is Amazon DynamoDB?", keywords: ["dynamodb", "nosql", "key-value", "key value", "document database", "single-digit millisecond", "dax", "documentdb", "keyspaces", "timestream", "qldb", "ledger", "mongodb", "cassandra"] },
  { id: "dSybACt3fX8", label: "How Does ElastiCache Work?", keywords: ["elasticache", "redis", "memcached", "in-memory", "in memory", "caching", "cache layer", "memorydb"] },
  { id: "lWwFJV_9PoE", label: "Data Warehousing with Amazon Redshift", keywords: ["redshift", "data warehouse", "data warehousing", "olap", "analytics queries", "columnar"] },

  // Networking
  { id: "7_NNlnH7sAg", label: "Amazon VPC Basics", keywords: ["vpc", "virtual private cloud", "subnet", "subnets", "route table", "route tables", "vpc peering", "cidr", "elastic ip", "isolated network", "logically isolated"] },
  { id: "JWoNu2Mtpdg", label: "Security Groups vs Network ACLs", keywords: ["security group", "security groups", "network acl", "network acls", "nacl", "nacls", "stateful", "stateless", "inbound rule", "inbound rules", "outbound rule"] },
  { id: "JRZiQFVWpi8", label: "Amazon Route 53 Basics", keywords: ["route 53", "route53", "dns", "domain name", "domain registration", "routing policy", "routing policies", "hosted zone", "latency-based", "failover routing", "geolocation"] },
  { id: "A_1pXqChn3s", label: "Hybrid Cloud with AWS VPN and Direct Connect", keywords: ["direct connect", "site-to-site vpn", "site to site vpn", "vpn", "dedicated network connection", "private connection", "virtual private gateway", "client vpn"] },
  { id: "yRyr_TjtiDg", label: "Global Networking with AWS Transit Gateway", keywords: ["transit gateway", "hub-and-spoke", "hub and spoke", "connect multiple vpcs", "thousands of vpcs"] },
  { id: "K-zh-SKfjLA", label: "What is AWS Global Accelerator?", keywords: ["global accelerator", "anycast", "static ip", "static ips", "aws global network"] },
  { id: "1XcpQHfTOvs", label: "What is Amazon API Gateway?", keywords: ["api gateway", "rest api", "restful", "http api", "websocket", "throttling", "api keys", "appsync", "graphql"] },

  // Application integration and deployment
  { id: "jXQhaJIxLnE", label: "SNS vs SQS vs EventBridge: When To Use What?", keywords: ["decouple", "decoupling", "decoupled", "loosely coupled", "message", "messages", "messaging", "mq", "amazon mq", "activemq", "rabbitmq", "sqs vs sns"] },
  { id: "wdJ5DN15jus", label: "AWS Step Functions Explained in 90 Seconds", keywords: ["step functions", "state machine", "workflow", "workflows", "orchestrat"] },
  { id: "Omppm_YUG2g", label: "Introduction to AWS CloudFormation", keywords: ["cloudformation", "template", "templates", "stack", "stacks", "provision resources", "repeatable", "declarative", "json or yaml", "yaml", "change set", "change sets", "drift"] },
  { id: "iGCJ-N7bPX0", label: "CodePipeline, CodeBuild, CodeCommit and CodeDeploy Basics", keywords: ["codepipeline", "codecommit", "codebuild", "codedeploy", "codestar", "codeartifact", "ci/cd", "continuous integration", "continuous delivery", "continuous deployment", "devops", "cloud9", "blue/green", "blue-green", "canary", "source control"] },
  { id: "pSVK-ingvfc", label: "AWS Systems Manager Introduction", keywords: ["systems manager", "patch manager", "run command", "patching", "patch", "ops center", "opscenter", "fleet", "maintenance window", "automation document"] },
  { id: "HkbjHtG_d7w", label: "What is AWS Amplify?", keywords: ["amplify", "mobile app", "mobile application", "web and mobile", "full-stack", "frontend"] },

  // Monitoring and support
  { id: "Yxl7e88cTAQ", label: "Basics of Amazon CloudWatch", keywords: ["cloudwatch", "metric", "metrics", "monitor", "monitoring", "dashboard", "custom metric", "custom metrics"] },
  { id: "Ueh7vyXNtog", label: "AWS X-Ray: Distributed Tracing for Beginners", keywords: ["x-ray", "xray", "tracing", "trace", "traces", "distributed application", "microservices", "bottleneck", "bottlenecks"] },
  { id: "uEIrFbesvP8", label: "AWS Trusted Advisor", keywords: ["trusted advisor", "best practice checks", "best-practice checks", "service limits", "service quotas", "quota"] },
  { id: "mHIba-3Cedo", label: "AWS Health Dashboard and Trusted Advisor", keywords: ["health dashboard", "personal health", "service health", "scheduled maintenance", "planned maintenance", "aws health"] },
  { id: "gkkcM37m5Zc", label: "AWS Support Plans: Everything You Need To Know", keywords: ["support plan", "support plans", "enterprise support", "enterprise on-ramp", "infrastructure event management", "support case", "support cases", "aws iq", "support tier", "support tiers"] },

  // Billing and pricing
  { id: "-t148tYgnJU", label: "EC2 Pricing: On-Demand, Spot, Reserved, Savings Plans", keywords: ["on-demand", "on demand", "dedicated host", "dedicated hosts", "dedicated instance", "dedicated instances", "capacity reservation", "pricing model", "pricing models", "purchasing option", "purchasing options", "pay by the second", "per-second"] },
  { id: "uCGgXw1o2Ks", label: "EC2 Costs: On-Demand vs Savings Plans vs Reserved", keywords: ["all upfront", "partial upfront", "no upfront", "upfront payment", "payment option", "payment options"] },
  { id: "xjq-1CdvgQ8", label: "Savings Plans: Pricing Model for AWS Compute", keywords: ["savings plan", "savings plans", "compute savings", "ec2 instance savings", "hourly commitment"] },
  { id: "YAet7EnpvYI", label: "AWS Free Tier Explained in 2 Minutes", keywords: ["free tier", "always free", "12 months free", "12-month", "trial", "free credits"] },
  { id: "oE8TNKGmc40", label: "AWS Cost Explorer", keywords: ["cost explorer", "cost categories", "visualize", "spending trends", "forecast", "billing conductor", "cost anomaly", "anomaly detection", "usage over time"] },
  { id: "O0sofGVT7uw", label: "AWS Budgets: Set Up Billing Alerts", keywords: ["aws budgets", "budget", "budgets", "billing alarm", "billing alert", "billing alerts", "alert when", "exceeds", "spending limit", "monthly spend"] },
  { id: "PQFztryprPQ", label: "Estimate Costs with the AWS Pricing Calculator", keywords: ["pricing calculator", "estimate", "estimates", "total cost of ownership", "tco", "cost estimate"] },
  { id: "Rpf-_k0lQEQ", label: "Consolidated Billing for AWS", keywords: ["consolidated billing", "single bill", "volume discount", "volume discounts", "tiered pricing", "aggregate usage", "payer account", "multiple accounts"] },
  { id: "4obiejTAlFQ", label: "What is AWS Marketplace", keywords: ["marketplace", "third-party software", "third party software", "isv", "software vendor", "private offer", "saas subscription"] },

  // Analytics, AI and ML
  { id: "Qv_Tr_BCFCQ", label: "Introduction to Amazon SageMaker", keywords: ["sagemaker", "machine learning", "ml model", "ml models", "train and deploy", "kendra", "personalize", "forecast service", "fraud detector", "build, train", "jupyter", "notebook"] },
  { id: "_vdK5PgcNvc", label: "Introducing Amazon Bedrock", keywords: ["bedrock", "generative ai", "foundation model", "foundation models", "large language model", "llm", "titan", "claude", "anthropic", "prompt"] },
  { id: "S0XXbFp5Lf0", label: "Athena, Kinesis, and Glue Explained", keywords: ["data lake", "lake formation", "opensearch", "elasticsearch", "msk", "managed streaming for kafka", "kafka", "big data analytics"] },
  { id: "QuwaBOESGiU", label: "An Introduction to Amazon EMR", keywords: ["emr", "elastic mapreduce", "hadoop", "spark", "big data", "data pipeline"] },
  { id: "2V1bHRLRG-w", label: "Introducing Amazon QuickSight", keywords: ["quicksight", "business intelligence", "bi tool", "dashboards", "visualization", "visualizations"] },
  // Added: more specific videos so fewer questions share the same link
  { id: "tv7SsA2eVHE", label: "AWS Operational Excellence Pillar Explained", keywords: ["operational excellence", "runbook", "runbooks", "operations as code", "learn from failures", "small, reversible"] },
  { id: "bubRYxwipzk", label: "AWS Reliability Pillar Explained", keywords: ["reliability pillar", "reliability", "recover from failure", "recover from failures", "automatically recover", "test recovery"] },
  { id: "hwG3jS5_8jo", label: "Well-Architected Security Pillar", keywords: ["security pillar", "traceability", "security at all layers", "strong identity foundation", "protect data in transit and at rest"] },
  { id: "V2EjQbFxSgM", label: "AWS Performance Efficiency Pillar Explained", keywords: ["performance efficiency", "go global in minutes", "serverless architectures", "experiment more often", "mechanical sympathy"] },
  { id: "HCe_V9NIB_E", label: "AWS Cost Optimization Pillar", keywords: ["cost optimization", "cloud financial management", "unnecessary cost", "measure overall efficiency", "adopt a consumption model"] },
  { id: "tNDquSJp904", label: "AWS Sustainability Pillar", keywords: ["sustainability", "environmental impact", "carbon", "energy"] },
  { id: "n4BTqappip0", label: "Navigating Best Practices with the AWS Well-Architected Tool", keywords: ["well-architected tool", "well architected tool", "review workloads", "architecture review"] },
  { id: "o13js0hIO_o", label: "Simplify the AWS Shared Responsibility Model (AWS)", keywords: ["shared responsibility", "security of the cloud", "security in the cloud", "responsible for", "customer's responsibility", "aws is responsible", "customer is responsible", "physical security"] },
  { id: "V1dffu8QOlU", label: "Understanding High Availability and Fault Tolerance", keywords: ["high availability", "highly available", "fault tolerance", "fault tolerant", "fault-tolerant", "single point of failure", "redundancy", "redundant"] },
  { id: "Fi1KaVrWYTE", label: "AWS Global Infrastructure Explained in 3 Minutes", keywords: ["availability zone", "availability zones", "multiple availability zones", "isolated locations", "low-latency links", "one or more discrete"] },
  { id: "GfUcmVP1gWo", label: "AWS Local Zones: Product Overview", keywords: ["local zone", "local zones", "closer to end users", "latency-sensitive applications"] },
  { id: "EhMqwPqPzcY", label: "AWS Wavelength: Edge Computing for 5G Networks", keywords: ["wavelength", "5g", "telecommunications", "mobile edge"] },
  { id: "zOnhkotoBII", label: "AWS CAF: 6 Perspectives, 4 Phases and 4 Domains", keywords: ["business perspective", "people perspective", "governance perspective", "platform perspective", "operations perspective", "security perspective", "envision phase", "align phase", "transformation domains", "caf perspectives"] },
  { id: "AT-nHW3_SVI", label: "Introduction to Amazon CloudFront (AWS)", keywords: ["cloudfront", "content delivery", "cdn", "distribution", "cache content", "origin", "low latency delivery", "deliver content"] },
  { id: "v2oiElpOzNk", label: "AWS Migration Hub Explained", keywords: ["migration hub", "track migration", "track the progress", "migration progress"] },
  { id: "KVV5Hd70Uc8", label: "Introduction to AWS Application Migration Service (AWS)", keywords: ["application migration service", "mgn", "lift and shift", "lift-and-shift", "rehost", "server migration"] },
  { id: "QMkhABGobI4", label: "AWS Database Migration Explained in 2 Minutes", keywords: ["database migration service", "dms", "schema conversion", "sct", "heterogeneous", "homogeneous", "migrate a database", "migrate databases"] },
  { id: "tbZvgSRTSuk", label: "AWS DataSync Explained", keywords: ["datasync", "online data transfer", "transfer large amounts", "nfs to s3"] },
  { id: "bxSD1Nha2k8", label: "AWS Snowball Edge Overview (AWS)", keywords: ["snowball edge", "edge computing", "disconnected environments", "rugged"] },
  { id: "nlb8yo7SZ2I", label: "An Introduction to AWS CDK", keywords: ["cdk", "cloud development kit", "familiar programming language", "programming languages", "typescript", "python code"] },

  { id: "IpByb6Z6Yh0", label: "AWS IAM Policies Tutorial: JSON Policies for Beginners", keywords: ["iam policy", "iam policies", "policy document", "json policy", "allow or deny", "explicit deny", "inline policy", "inline policies", "managed policy", "managed policies", "customer managed", "aws managed", "policy statement"] },
  { id: "t8P8ffqWrsY", label: "AWS IAM Permissions Boundary", keywords: ["permissions boundary", "permission boundary", "permissions boundaries", "delegate permissions"] },
  { id: "gpquYmcpZpo", label: "What is AWS IAM Identity Center?", keywords: ["identity center", "single sign-on", "sso", "federation", "federated", "active directory", "saml", "identity provider", "corporate credentials", "existing corporate"] },
  { id: "T4NK8fv8YdI", label: "Introducing AWS Organizations (AWS)", keywords: ["aws organizations", "organizations", "organizational unit", "organizational units", "management account", "member account", "member accounts", "multiple aws accounts", "multi-account", "centrally manage accounts"] },
  { id: "xFzJw6wJ8eY", label: "Amazon S3 Access Control: IAM, Bucket Policies and ACLs", keywords: ["bucket policy", "bucket policies", "block public access", "public access", "acl", "acls", "access point", "access points", "publicly accessible", "presigned", "pre-signed"] },
  { id: "84BhFGIxIqg", label: "What is Amazon Detective? (AWS)", keywords: ["detective", "root cause", "investigate", "investigation", "security investigations"] },
  { id: "Y7-37tkO1CA", label: "AWS Network Firewall Explainer (AWS)", keywords: ["network firewall", "intrusion", "vpc-level firewall", "stateful inspection"] },
  { id: "FGhKpPDBvXc", label: "Getting Started with AWS Firewall Manager (AWS)", keywords: ["firewall manager", "centrally manage firewall", "centrally configure", "firewall rules across"] },
  { id: "CXbdsp9ThvM", label: "AWS CloudTrail Basics", keywords: ["cloudtrail", "api call", "api calls", "audit", "auditing", "who made", "who deleted", "event history", "management events", "record actions", "governance, compliance"] },
  { id: "cUEFGKaZOyU", label: "AWS Session Manager Overview (AWS)", keywords: ["session manager", "without ssh", "no ssh", "bastion", "bastion host", "ssh keys", "inbound ports", "browser-based shell"] },
  { id: "zxi3M_rIE2k", label: "AWS Systems Manager Parameter Store Tutorial", keywords: ["parameter store", "configuration data", "hierarchical storage", "plaintext or encrypted"] },
  { id: "cx87pMvMg10", label: "AWS Abuse (Cloud Practitioner)", keywords: ["aws abuse", "abuse", "abusive", "abuse team"] },
  { id: "1eaRm11vgaw", label: "AWS Tagging Best Practices", keywords: ["tag", "tags", "tagging", "resource groups", "key-value pair", "key-value pairs", "metadata"] },

  { id: "E956xeOt050", label: "Amazon EKS Explained", keywords: ["eks", "kubernetes", "elastic kubernetes", "k8s"] },
  { id: "BRCQltXQEoU", label: "AWS Fargate Tutorial: Serverless Containers", keywords: ["fargate", "serverless container", "serverless containers", "serverless compute engine for containers", "without managing ec2"] },
  { id: "GtbTmvMcKRg", label: "Amazon ECR Explained (AWS)", keywords: ["ecr", "container registry", "container image", "container images", "docker image", "docker images", "store images"] },
  { id: "_LLqbAe7YTs", label: "Lambda Pricing Explained in 5 Minutes", keywords: ["lambda pricing", "per request", "number of requests", "execution time", "duration", "15 minutes", "15-minute", "memory allocated", "compute time", "1 ms", "millisecond increments"] },
  { id: "LIouXADhGz0", label: "AWS Lambda Triggers: Complete Guide to Event Sources", keywords: ["trigger", "triggers", "triggered", "event source", "event sources", "invoke", "invoked", "invokes", "invocation", "s3 event", "upload to s3", "in response to events"] },
  { id: "fw33RsNWSR0", label: "EC2 Spot Instances Explained", keywords: ["spot instance", "spot instances", "spot fleet", "spot", "interrupt", "interrupted", "interruption", "fault-tolerant workloads", "flexible start", "up to 90%", "unused capacity", "spare capacity"] },
  { id: "XrmdkRQZhUQ", label: "Introduction to Amazon EC2 Reserved Instances (AWS)", keywords: ["reserved instance", "reserved instances", "steady-state", "steady state", "predictable usage", "1-year", "3-year", "one-year", "three-year", "convertible", "standard reserved", "up to 72%", "commit to"] },

  { id: "kAaPjE9-a2A", label: "Amazon S3: Cross-Region Replication and Versioning (AWS)", keywords: ["versioning", "cross-region replication", "replication", "accidental deletion", "accidentally deleted", "previous version", "previous versions", "overwritten", "mfa delete"] },
  { id: "-l83oqcaTHg", label: "How to Host a Static Website on AWS S3", keywords: ["static website", "static web", "static content", "website hosting", "html, css", "host a website"] },
  { id: "77qLAl-lRpo", label: "Amazon Elastic Block Store (EBS) Overview (AWS)", keywords: ["ebs", "elastic block store", "block storage", "ebs volume", "ebs volumes", "snapshot", "snapshots", "iops", "gp3", "gp2", "io2", "io1", "persistent block", "attached to a single"] },
  { id: "vAV4ASDnbN0", label: "Amazon EFS Overview (AWS)", keywords: ["efs", "elastic file system", "nfs", "shared file", "shared file system", "multiple ec2 instances", "file system", "concurrently", "thousands of ec2"] },
  { id: "GAMUCIJR5as", label: "Get Started with AWS Elastic Disaster Recovery (AWS)", keywords: ["elastic disaster recovery", "drs", "cloudendure", "continuous replication"] },
  { id: "qZd6TokRWf0", label: "AWS Disaster Recovery Strategies Explained", keywords: ["pilot light", "warm standby", "multi-site", "active-active", "backup and restore", "disaster recovery", "rpo", "rto", "recovery point", "recovery time", "recovery point objective", "recovery time objective"] },

  { id: "fW_prKJR79Y", label: "Multi-AZ vs Read Replicas: Amazon RDS Tutorial", keywords: ["multi-az", "multi az", "read replica", "read replicas", "standby", "synchronous", "asynchronous", "failover", "read-heavy", "read traffic", "offload read"] },
  { id: "YmR2_zlQO5w", label: "Introduction to Amazon Neptune Graph Database (AWS)", keywords: ["neptune", "graph database", "graph", "highly connected", "social network", "recommendation engine", "fraud graph"] },

  { id: "2htfhgcySfs", label: "AWS Internet Gateway vs NAT Gateway in 3 Minutes", keywords: ["internet gateway", "nat gateway", "nat instance", "outbound internet", "private subnet", "private subnets", "public subnet", "public subnets", "access the internet", "internet access"] },
  { id: "jo3X_aay4Vs", label: "Keep Your Network Traffic in AWS with VPC Endpoints", keywords: ["vpc endpoint", "vpc endpoints", "gateway endpoint", "interface endpoint", "without traversing", "public internet", "privately connect", "private connectivity"] },

  { id: "MH01PNZLR98", label: "Simple Queue Service (SQS) Basics", keywords: ["sqs", "simple queue service", "queue", "queues", "message queue", "dead-letter", "dead letter", "fifo", "visibility timeout", "polling", "at-least-once", "exactly-once"] },
  { id: "3oMpDoYwqpM", label: "Amazon SNS Tutorial: Simple Notification Service Explained", keywords: ["sns", "simple notification service", "topic", "topics", "push notification", "push notifications", "sms", "email notification", "email notifications", "pub/sub", "publish", "subscribe", "subscribers", "fan-out", "fan out", "notify"] },
  { id: "TXh5oU_yo9M", label: "Intro to Amazon EventBridge (AWS)", keywords: ["eventbridge", "event bus", "event rule", "event rules", "scheduled event", "saas applications", "cloudwatch events", "event-driven", "event driven", "route events"] },
  { id: "hLLgkTUmwOU", label: "Amazon Kinesis Data Streams Fundamentals (AWS)", keywords: ["kinesis", "data streams", "streaming data", "real-time data", "real time data", "data firehose", "firehose", "clickstream", "video streams", "real-time analytics", "ingest streaming"] },
  { id: "qgWMfNSN9f4", label: "What is AWS Glue? (AWS)", keywords: ["glue", "etl", "data catalog", "crawler", "crawlers", "extract, transform", "prepare data", "data integration"] },
  { id: "q9yxcWcHH4Q", label: "Amazon Athena Explained: Query S3 with SQL", keywords: ["athena", "query data in s3", "standard sql", "serverless query", "query s3", "sql queries", "query data directly", "pay per query"] },
  { id: "A6-jv3gZa4U", label: "Introduction to AWS Service Catalog (AWS)", keywords: ["service catalog", "approved products", "portfolio", "portfolios", "approved it services", "catalog of"] },
  { id: "HmXkLtSYHtk", label: "Tag AWS Resources to Divide Up Your Bill (AWS)", keywords: ["cost allocation tag", "cost allocation tags", "cost center", "cost centers", "divide up", "by department", "by project", "by team", "chargeback", "showback"] },
  { id: "NfONXHkTefA", label: "How Do I Use the AWS Cost and Usage Report? (AWS)", keywords: ["cost and usage report", "cur", "most comprehensive", "most detailed", "granular billing", "hourly line items"] },

  { id: "dIfJ0-ichVs", label: "AWS Support Plans Explained: Which Plan Is Right for You?", keywords: ["developer support", "business support", "basic support", "cloud support associates", "cloud support engineers", "12 hours", "24 hours", "1 hour", "15 minutes", "general guidance", "system impaired", "production system", "business hours", "24x7", "24/7 phone", "third-party software support"] },
  { id: "bWwlNaF6Jw8", label: "What Is the Role of a Technical Account Manager? (AWS)", keywords: ["technical account manager", "tam", "concierge", "designated", "proactive guidance", "account team"] },
  { id: "_C0NHqtRFdw", label: "Introducing AWS re:Post (AWS)", keywords: ["re:post", "repost", "knowledge center", "community", "question-and-answer", "q&a"] },
  { id: "VjtcENUtn-A", label: "AWS Partner Network (APN) Overview", keywords: ["professional services", "partner network", "apn", "consulting partner", "consulting partners", "technology partner", "aws partner", "aws partners", "system integrator", "proserve"] },

  { id: "fnFpE6UEd_I", label: "What Is Amazon Rekognition? (AWS)", keywords: ["rekognition", "image analysis", "facial", "face", "faces", "image and video", "object detection", "objects in images", "content moderation", "celebrity", "video analysis"] },
  { id: "BKgTJCJ0eGg", label: "What is Amazon Comprehend? (AWS)", keywords: ["comprehend", "natural language processing", "nlp", "sentiment", "sentiment analysis", "key phrases", "entities", "insights from text", "customer reviews"] },
  { id: "XUd5M_mQaA0", label: "Text to Speech with Amazon Polly", keywords: ["polly", "text to speech", "text-to-speech", "lifelike speech", "spoken audio", "voice"] },
  { id: "AaPIdNEz3xk", label: "Amazon Transcribe, Translate and Polly", keywords: ["transcribe", "speech to text", "speech-to-text", "translate", "translation", "translates", "languages", "transcription", "call recordings", "subtitles"] },
  { id: "uYu1OR8wU8A", label: "Amazon Lex Explained: Conversational AI Chatbots", keywords: ["lex", "chatbot", "chatbots", "conversational", "voice and text", "alexa", "conversational interfaces", "bots"] },
  { id: "5Cs4_e2CJRo", label: "What is Amazon Textract? (AWS)", keywords: ["textract", "extract text", "scanned document", "scanned documents", "ocr", "forms and tables", "handwriting", "extract data from documents"] },
  { id: "fQITLL5WncE", label: "Discover Amazon Q: AWS Generative AI Assistant (AWS)", keywords: ["amazon q", "q developer", "q business", "codewhisperer", "coding assistant", "generative ai assistant", "code suggestions"] },

  { id: "lHWrAAzoxJA", label: "AWS CloudWatch Alarm Setup Tutorial", keywords: ["cloudwatch alarm", "cloudwatch alarms", "alarm", "alarms", "cpu utilization", "metric alarm", "alarm state", "trigger an action", "above a threshold"] },
  { id: "HRJnhzSSFtk", label: "AWS CloudWatch Logs Core Concepts", keywords: ["cloudwatch logs", "log group", "log groups", "log stream", "log streams", "application logs", "logs insights", "log data", "log files", "centralize logs", "retention period"] },
  // Added: every video below is under 20 minutes; more specific topics so fewer questions share a link
  // Cloud concepts and global infrastructure
  { id: "Kv3b48fKcUY", label: "How to Choose the Right AWS Region", keywords: ["choose a region", "choosing a region", "which aws region", "which region", "data residency", "data sovereignty", "gdpr", "sovereignty", "never leaves", "proximity", "close to its users", "close to customers", "service availability", "govcloud", "china", "partition", "opt-in", "disabled by default"] },
  { id: "yrOcNcVVTE4", label: "AWS Availability Zones: Beginner Overview", keywords: ["loss of a single", "single data center", "single facility", "multiple data centers", "three availability zones", "two availability zones", "across availability zones", "az failure", "spread across"] },
  { id: "v53nNaA_VsA", label: "AWS Global Network: Regions, AZs, Edge Locations and Local Zones", keywords: ["inter-region", "between regions", "aws backbone", "private backbone", "aws-owned", "global network", "copy an ami", "copy the ami", "ami to another region", "global service", "global services", "is a global"] },
  { id: "KwJwqb9RVx0", label: "Comparing Public, Private and Hybrid Clouds", keywords: ["public cloud", "private cloud", "hybrid cloud", "deployment model", "deployment models", "cloud-based", "multi-cloud", "multicloud", "both providers", "cloud bursting", "burst to the cloud", "bursts to the cloud", "virtualization platform"] },
  { id: "E-iV44wUbNI", label: "CapEx vs OpEx Explained: AWS, Azure and GCP", keywords: ["capex", "opex", "capital expenditure", "operational expenditure", "upfront purchases", "upfront investment", "large upfront", "depreciated", "usage-based", "hardware purchases", "buying hardware"] },
  { id: "22mtNlfGEc8", label: "Key Cloud Economics: Elasticity, Availability and Agility", keywords: ["scalability and elasticity", "scalability", "provisioned quickly", "provision resources in minutes", "speed and ease", "guessing capacity", "guess at", "guessing at", "stop guessing", "overprovision", "over-provision", "experiment"] },
  { id: "Qn6mGayIw6o", label: "AWS Data Transfer Costs Explained", keywords: ["data transfer", "data transfer out", "transfer out", "dto", "egress", "inbound data transfer", "data transfer charges", "transfer charges", "transfer in is free"] },
  { id: "n8BQ83lG8lQ", label: "AWS Pricing Models and Cost Calculator (AWS)", keywords: ["pricing model", "pricing models", "fundamental ways", "pay for what you use", "pay only for", "no upfront", "pay less when", "reserve capacity", "pay less as aws grows", "pricing philosophy", "three fundamental", "drivers of cost"] },

  // Migration
  { id: "6vHFTTca5qA", label: "AWS Migration Evaluator Explained", keywords: ["migration evaluator", "business case", "data-driven", "total cost of ownership", "tco", "actual utilization", "rough estimate", "projected savings"] },
  { id: "5tt6Y89oH74", label: "AWS Application Discovery Service Explained", keywords: ["application discovery", "discovery service", "discovery agent", "agentless collector", "inventory its servers", "inventory of the servers", "network dependencies", "dependency mapping", "dependencies between"] },
  { id: "VXCk8-UkrU8", label: "AWS Migration: 3 Phases and 7R Strategies", keywords: ["three-phase", "three phase", "assess phase", "mobilize", "migrate and modernize", "wave", "waves", "group applications", "grouping applications", "groups applications", "portfolio assessment", "portfolio"] },
  { id: "Zv_q7_S2op0", label: "AWS Migration Acceleration Program (MAP) Overview (AWS)", keywords: ["migration acceleration program", "map program", "proven methodology", "migration program", "aws program", "funding", "partner-led"] },
  { id: "zACe0LLkWVA", label: "AWS Mainframe Modernization Features", keywords: ["mainframe", "cobol", "mainframe modernization", "legacy system"] },

  // Identity and access
  { id: "xK69zkQpEcg", label: "IAM Credentials Report (Cybr)", keywords: ["credential report", "credentials report", "access advisor", "last accessed", "unused credentials", "unused access keys", "unused permissions", "last used"] },
  { id: "9jzwEUHKmVI", label: "IAM Roles vs IAM Users: Stop Using Long-Term Keys", keywords: ["long-term access key", "long-term access keys", "long-lived", "long-term credentials", "embedded", "embed", "hardcoded", "hard-coded", "instance profile", "role attached", "attached to the instance", "attach an iam role", "without embedding", "without storing"] },
  { id: "2r-zBXyFL8o", label: "How to Rotate AWS Access Keys", keywords: ["rotate the key", "rotate access key", "rotate access keys", "rotate the access key", "key rotation", "rotating", "committed", "public github", "public repository", "exposed", "leaked", "deactivate", "compromised"] },
  { id: "Qrm84k9vRXg", label: "Cross-Account IAM Roles Hands-On", keywords: ["cross-account", "cross account", "account a", "account b", "another aws account", "other account", "trust policy", "external id", "third-party vendor", "third party vendor", "saas vendor", "assumes a role in"] },
  { id: "tPQsI8n6er0", label: "EC2 Instance Metadata Tutorial (Stephane Maarek)", keywords: ["instance metadata", "metadata service", "imds", "imdsv2", "169.254.169.254", "its own instance id"] },
  { id: "8KLh1idp-1M", label: "IAM Policy Evaluation Logic: Explicit Deny (AWS)", keywords: ["explicit deny", "implicit deny", "implicitly denied", "denied by default", "default deny", "evaluation logic", "policy evaluation", "conflicting", "overrides", "allow and a deny", "does not attach any policy", "effective permissions"] },
  { id: "yOKrd-lt0gM", label: "Managed vs Inline IAM Policies (Cybr)", keywords: ["aws managed policy", "aws managed policies", "customer managed policy", "customer managed policies", "inline policy", "inline policies", "managed policies", "ready-made policy", "reuse a policy", "readonlyaccess"] },
  { id: "FNbHpOTwifQ", label: "Test IAM Policies with the IAM Policy Simulator", keywords: ["policy simulator", "simulate", "simulator", "test a policy", "test the policy", "before attaching", "which api calls", "confirm exactly which"] },

  // Encryption, detection and audit
  { id: "MWhKuoHV57Q", label: "KMS Key Types: AWS Owned vs AWS Managed vs Customer Managed", keywords: ["aws owned key", "aws owned keys", "aws managed key", "aws managed keys", "customer managed key", "customer managed keys", "key policy", "key policies", "cmk", "key material", "import key material", "rotation of the key", "automatic key rotation", "schedule key deletion", "delete a kms key", "kms key deletion", "retire a customer managed"] },
  { id: "Nvim7tQ22_k", label: "Multi-Region KMS Keys Explained", keywords: ["multi-region key", "multi-region keys", "replicate the key", "replica key", "kms key in another region", "keys are regional", "kms keys are regional", "decrypt in another region", "re-encrypt"] },
  { id: "FvWQlMVY4g4", label: "EBS Encryption: Secure Data at Rest", keywords: ["ebs encryption", "encrypted ebs", "encrypted snapshot", "encrypted snapshots", "unencrypted volume", "unencrypted snapshot", "encrypt an existing", "share a snapshot", "share the snapshot", "snapshot with another account", "copy the snapshot"] },
  { id: "AGZ3cuzyKuY", label: "AWS WAF Rate-Based Rules Explained", keywords: ["rate-based", "rate based", "rate limit", "rate limiting", "requests per minute", "credential-stuffing", "credential stuffing", "bots", "bot control", "geo match", "geo-match", "geographic match", "block requests from", "block web requests", "ip set", "ip address ranges"] },
  { id: "8Ku27Gh1WaU", label: "AWS CloudTrail Lake Explained", keywords: ["cloudtrail lake", "sql-style queries", "sql-style", "event data store", "seven years", "retain aws api activity", "retain events", "query across", "immutable event"] },
  { id: "rk0RHxQCD8Q", label: "CloudTrail Log File Integrity Validation", keywords: ["integrity validation", "log file integrity", "integrity of the log", "not been modified", "have not been modified", "modified or deleted", "tampered", "tampering", "digest", "digest file", "digest files", "sha-256"] },
  { id: "mSMlxUJERdg", label: "AWS Audit Manager in 5 Minutes", keywords: ["audit manager", "collecting evidence", "collect evidence", "evidence collection", "audit evidence", "assessment report", "audit-ready", "continuously audit", "audit preparation", "prepare for audits", "collecting screenshots"] },
  { id: "RH3uQ1A6WGs", label: "GuardDuty vs Detective: What Are the Differences?", keywords: ["how guardduty works", "guardduty works", "telemetry", "dns logs", "analyzes vpc flow", "out of the box", "enable guardduty", "enabling guardduty", "enables amazon guardduty", "enable amazon guardduty"] },
  { id: "tT8LXTztKjE", label: "AWS Config and Conformance Packs (AWS)", keywords: ["conformance pack", "conformance packs", "aggregator", "config aggregator", "across all accounts and regions", "compliance status of resources", "noncompliant", "non-compliant", "remediation", "auto-remediation", "automatic remediation"] },
  { id: "8ky1JvDY52g", label: "Code Signing with AWS Signer (Cybr)", keywords: ["aws signer", "code signing", "signed by", "digitally signed", "signing profile", "signing configuration"] },
  { id: "iODPCcQEPto", label: "AWS Shared Responsibility Model (Digital Cloud Training)", keywords: ["managed service", "fully managed", "managed node", "self-managed", "patching the operating system", "guest operating system", "operating system patches", "os patching", "patch the os", "worker nodes", "infrastructure services", "container services", "abstracted services", "who patches", "patching of the underlying"] },
  { id: "ESPBBEK-cvo", label: "The AWS Shared Responsibility Model in 4 Minutes", keywords: ["shared controls", "inherited controls", "customer specific controls", "customer-specific", "patch management", "configuration management", "awareness and training", "physical disks", "end of life", "decommission", "decommissioned", "media disposal", "destroyed", "badge access", "physical data centers"] },

  // Compute and serverless
  { id: "4HNE1IscKUg", label: "Amazon Machine Images (AMI) Explained", keywords: ["ami", "amis", "amazon machine image", "amazon machine images", "golden image", "custom ami", "custom image", "marketplace ami", "appliance ami", "ami is regional", "preconfigured"] },
  { id: "h07XKYLmzYs", label: "AWS Lambda Cold and Warm Start Explained", keywords: ["cold start", "cold starts", "provisioned concurrency", "warm", "initialization", "first request to each", "latency targets", "snapstart"] },
  { id: "C02cylYvMkw", label: "What Are Lambda Layers?", keywords: ["lambda layer", "lambda layers", "shared libraries", "shared dependencies", "bundle the same", "deployment package", "common code"] },
  { id: "iR1eb6AJ-zk", label: "AWS Lambda Function URLs Explained", keywords: ["function url", "function urls", "over https", "https endpoint", "invoke it over https", "dedicated https endpoint", "without api gateway"] },
  { id: "84Ga-Z-A8SU", label: "Lambda and EventBridge: Scheduled Tasks (Cron Jobs)", keywords: ["cron", "run on a schedule", "runs on a schedule", "scheduled lambda", "schedule a lambda", "schedule the function", "rate expression", "cron expression", "run automatically every", "every day at", "nightly", "eventbridge scheduler", "at a specific time", "on a schedule"] },
  { id: "OJrxbr9ebDE", label: "S3 File Upload + Lambda Trigger Step-by-Step", keywords: ["thumbnail", "thumbnails", "resize", "image-processing", "image processing", "uploads an image", "upload an image", "every time a user uploads", "when an object is created", "object is uploaded", "new object"] },
  { id: "MVxHQbmA2Dg", label: "What Are S3 Event Notifications", keywords: ["event notification", "event notifications", "s3 notification", "notifies", "notify", "when a file lands", "when objects are"] },
  { id: "f2HG8_0eE80", label: "SQS Dead Letter Queues Explained", keywords: ["dead-letter", "dead letter", "dlq", "maxreceivecount", "poison", "failed messages", "problem messages", "repeatedly fail", "fails to process", "retry", "retries", "visibility timeout"] },

  // Storage
  { id: "kgrCecl2cjM", label: "S3 Pre-Signed URLs Explained", keywords: ["presigned", "pre-signed", "presigned url", "pre-signed url", "time-limited", "time limited", "temporary access to an object", "temporary url", "temporary link", "download link", "without making the bucket public", "private objects", "private object"] },
  { id: "-b0gTxpTyik", label: "S3 Transfer Acceleration Explained", keywords: ["transfer acceleration", "accelerate uploads", "accelerated upload", "around the world who upload", "around the world upload", "upload multi-gigabyte", "long-distance", "long distance", "edge network to upload"] },
  { id: "hslYYmjy_as", label: "Why S3 Uploads Fail Without Multipart Upload", keywords: ["multipart", "multi-part", "single connection", "large file upload", "large files", "4 tb", "parallel upload", "in parts", "parts in parallel"] },
  { id: "I039A_NkTDo", label: "What Is S3 Batch Operations?", keywords: ["batch operations", "s3 batch", "million existing objects", "existing objects", "bulk", "in bulk", "hundreds of millions of objects"] },
  { id: "N_eNklFKQMQ", label: "What Is S3 Object Lock", keywords: ["object lock", "worm", "write once", "write-once", "legal hold", "retention period", "immutable", "cannot be deleted or overwritten", "compliance mode", "governance mode"] },
  { id: "DaHmxRg2GWc", label: "How Amazon S3 Achieves 11 Nines of Durability", keywords: ["99.999999999", "eleven nines", "11 nines", "durability", "durable", "designed for", "99.99% availability"] },
  { id: "7vfrDYIHlaI", label: "S3 Encryption: Client-Side, In-Transit and Server-Side Keys", keywords: ["sse-s3", "sse-kms", "sse-c", "server-side encryption", "client-side encryption", "client side encryption", "encrypted before they leave", "encrypted before", "default encryption", "automatically encrypted at rest", "encrypt objects", "encrypted at rest in"] },

  // Networking and load balancing
  { id: "VFwLffElIgc", label: "Which Type of Elastic Load Balancer Should I Use?", keywords: ["path-based", "path based", "host-based", "host based", "content-based", "layer 7 routing", "/api/", "target group", "target groups", "listener", "listeners", "ultra-low latency", "ultra low latency", "millions of requests per second", "static ip address", "static ip", "tcp traffic", "udp", "layer 4 load", "alb vs nlb", "alb or nlb", "alb and a network"] },
  { id: "GZzt0iJPC9Q", label: "Gateway Load Balancers (LearnCantrill)", keywords: ["gateway load balancer", "gwlb", "third-party firewall", "third party firewall", "virtual appliance", "virtual appliances", "firewall appliances", "intrusion detection appliance", "inspect all traffic", "packet inspection", "full packet", "geneve", "inline inspection", "security appliance", "security appliances"] },
  { id: "kAdnshoSYwc", label: "ALB Sticky Sessions Explained for Beginners", keywords: ["sticky session", "sticky sessions", "stickiness", "session affinity", "stateful web", "same target", "same instance", "session state", "user's session"] },
  { id: "3fUBKhMfvlE", label: "What Is AWS PrivateLink", keywords: ["privatelink", "endpoint service", "endpoint services", "expose the api privately", "call the api privately", "dozens of customers", "customers to call", "saas provider", "own vpc", "service provider vpc", "consumer vpc", "without vpc peering", "without peering"] },
  { id: "vT9PVdNY8sw", label: "Route 53: DNS, Routing, Health Checks and Failover", keywords: ["failover routing", "failover", "health check fails", "unhealthy", "route 53 health", "dns failover", "weighted", "latency-based", "latency routing", "geolocation", "geoproximity", "routing policy", "routing policies", "multivalue"] },

  // Databases
  { id: "r_o4RTl1zXo", label: "Lambda + DynamoDB Streams: How They Work Together", keywords: ["dynamodb stream", "dynamodb streams", "item is inserted", "inserted or", "whenever an item", "change data capture", "changes to items", "table changes", "stream of changes"] },
  { id: "HdtHyqNl-As", label: "What Is Amazon Aurora Global Database", keywords: ["aurora global", "global database", "cross-region read", "secondary region", "under a second", "less than one second", "replication lag", "sub-second", "promote the secondary", "another region that stays"] },
  { id: "3e0-63LvAsA", label: "What Is AWS RDS Proxy?", keywords: ["rds proxy", "connection pooling", "connection pool", "too many connections", "database connections", "connections from lambda", "exhaust", "exhausts"] },

  // Billing and organizations
  { id: "80Dx_VdkYwY", label: "AWS Organizations for Beginners: Billing, RI and Savings Plan Sharing", keywords: ["reserved instance sharing", "ri sharing", "discount sharing", "shared across accounts", "promotional credits", "credits", "aws credits", "reserved instance discount", "savings plans discount", "benefit of the reserved", "apply to other accounts", "other accounts in the organization"] },
];

/** Domain-level fallback used when no keyword matches. */
const domainFallback: Record<Domain, string> = {
  "cloud-concepts": "a9__D53WsUs",
  "security-and-compliance": "9Pk2J_5qnlk",
  "cloud-technology-and-services": "JIbIYCM48to",
  "billing-pricing-and-support": "-t148tYgnJU",
};

export function videoUrlFor(id: string): string {
  return `https://www.youtube.com/watch?v=${id}`;
}

/** Text a keyword must match against: the question, its explanation, and the correct options. */
function searchableText(question: Question): string {
  const correctOptions = question.options
    .filter((o) => question.correctOptionIds.includes(o.id))
    .map((o) => o.text);
  return [question.text, question.explanation, ...correctOptions].join(" \n ").toLowerCase();
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Scores a keyword against the haystack. Whole-word matches only, so "ec2" does not match
 * "ec2-classic"'s neighbour text incorrectly and "scp" does not match "scope".
 * Each hit is worth the keyword's length so multi-word phrases dominate single words.
 */
function keywordScore(keyword: string, haystack: string): number {
  const pattern = new RegExp(`(^|[^a-z0-9])${escapeRegExp(keyword)}(?=$|[^a-z0-9])`, "g");
  const hits = haystack.match(pattern)?.length ?? 0;
  return hits * keyword.length;
}

/**
 * Picks the best curated video for a question. An explicit `videoUrl` on the question wins;
 * otherwise the catalog entry with the highest keyword score is used, falling back to a
 * domain-level video so every question has a link.
 */
export function resolveVideo(question: Question): { url: string; label: string } {
  if (question.videoUrl) {
    return { url: question.videoUrl, label: question.videoLabel ?? "YouTube" };
  }

  const haystack = searchableText(question);
  let best: VideoEntry | undefined;
  let bestScore = 0;

  for (const entry of videoCatalog) {
    let score = 0;
    for (const keyword of entry.keywords) {
      score += keywordScore(keyword.toLowerCase(), haystack);
    }
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  const chosen = best ?? videoCatalog.find((v) => v.id === domainFallback[question.domain])!;
  return { url: videoUrlFor(chosen.id), label: chosen.label };
}
