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
  { id: "5odtVlORq_w", label: "6 Pillars of the Well-Architected Framework", keywords: ["well-architected", "well architected", "operational excellence", "reliability pillar", "performance efficiency", "cost optimization pillar", "sustainability pillar", "six pillars"] },
  { id: "WuL_MueH4Xk", label: "AWS Cloud Adoption Framework (CAF) Breakdown", keywords: ["cloud adoption framework", "caf", "perspectives"] },
  { id: "0hlZvybbaGk", label: "AWS Global Infrastructure Overview", keywords: ["availability zone", "availability zones", "region", "regions", "global infrastructure", "data center", "data centers"] },
  { id: "PHjYRn_mrs0", label: "AWS Edge Locations and CloudFront", keywords: ["cloudfront", "edge location", "edge locations", "content delivery", "cdn", "points of presence"] },
  { id: "bJCmZn9fASM", label: "7 Rs Migration Strategies and AWS Migration Services", keywords: ["migration", "migrate", "rehost", "replatform", "refactor", "repurchase", "retire", "retain", "relocate", "migration hub", "application migration service", "database migration service", "dms", "migration evaluator"] },
  { id: "ppG2FFB0mMQ", label: "AWS Outposts: Overview and How It Works", keywords: ["outposts", "local zones", "local zone", "wavelength", "hybrid"] },
  { id: "QMcqZ_vIXfE", label: "Console, CLI, or SDK Explained", keywords: ["aws cli", "command line interface", "sdk", "software development kit", "management console", "cloudshell", "infrastructure as code", "cdk"] },
  { id: "NhDYbskXRgc", label: "AWS Cloud Practitioner Full Course (freeCodeCamp)", keywords: [] },

  // Security and compliance
  { id: "_ZCTvmaPgao", label: "AWS IAM Core Concepts You NEED to Know", keywords: ["iam", "identity and access management", "iam policy", "iam policies", "least privilege", "permissions"] },
  { id: "DgTLq1NfJI4", label: "IAM Roles vs Users vs Groups", keywords: ["iam role", "iam roles", "iam user", "iam users", "iam group", "iam groups", "access key", "access keys", "temporary credentials", "sts", "identity center", "single sign-on", "sso", "federation"] },
  { id: "MiPItT74ZLs", label: "Service Control Policies (SCPs) Explained", keywords: ["service control polic", "scp", "scps", "aws organizations", "organizational unit", "organizational units", "management account", "member account"] },
  { id: "zbI8owkUDrc", label: "AWS Root User Explained in 5 Minutes", keywords: ["root user", "root account"] },
  { id: "q2exR3ZUlSQ", label: "Root User Security, MFA, Access Keys and Best Practices", keywords: ["mfa", "multi-factor", "multi factor", "password policy", "credential report", "access analyzer"] },
  { id: "zSUUBAxjIbk", label: "AWS Key Management Service (KMS)", keywords: ["kms", "key management service", "encryption key", "encryption keys", "cloudhsm", "hsm", "encryption at rest", "encrypt", "envelope encryption"] },
  { id: "-9YzrRCzaKM", label: "DDoS Protection with AWS Shield and AWS WAF", keywords: ["shield", "waf", "web application firewall", "ddos", "sql injection", "cross-site scripting", "firewall manager", "network firewall"] },
  { id: "M4aOKikd7-s", label: "Amazon GuardDuty Deep Dive", keywords: ["guardduty", "threat detection", "detective"] },
  { id: "V3WVSBsq3-g", label: "Amazon Inspector Tutorial", keywords: ["inspector", "vulnerability", "vulnerabilities"] },
  { id: "S5X0PnBwp9I", label: "CloudWatch vs CloudTrail: What's the Difference?", keywords: ["cloudtrail", "api call", "api calls", "audit", "who made", "who deleted"] },
  { id: "S9FQhGZ47PM", label: "AWS Config Explanation and Walkthrough", keywords: ["aws config", "config rule", "config rules", "configuration history", "configuration change", "configuration changes", "compliance of resources"] },
  { id: "O307zdIOmWo", label: "Using AWS Artifact to Retrieve Compliance Reports", keywords: ["artifact", "compliance report", "compliance reports", "soc", "pci", "hipaa", "iso 27001", "audit report", "audit reports", "attestation"] },
  { id: "ItzzgWe7elE", label: "AWS Secrets Manager Step-by-Step", keywords: ["secrets manager", "rotate", "rotation", "database credentials", "parameter store"] },
  { id: "nBusvrDEjdk", label: "AWS Security Hub Demo", keywords: ["security hub", "security findings", "security posture", "cis benchmark"] },
  { id: "RR4MtDl09Vk", label: "What is Amazon Macie?", keywords: ["macie", "sensitive data", "personally identifiable", "pii"] },
  { id: "EAWWTjjQWz8", label: "Amazon Cognito: User Pool vs Identity Pool", keywords: ["cognito", "user pool", "identity pool", "sign-up", "sign-in", "social identity"] },
  { id: "Nk77te-cksQ", label: "What is AWS Certificate Manager?", keywords: ["certificate manager", "acm", "ssl", "tls", "certificate", "certificates", "in transit"] },
  { id: "pyiJbkJROTE", label: "Understanding AWS Control Tower", keywords: ["control tower", "landing zone", "guardrail", "guardrails", "multi-account"] },

  // Compute
  { id: "YH_DVenJHII", label: "Amazon EC2 Basics", keywords: ["ec2", "elastic compute cloud", "ami", "amazon machine image", "virtual server", "virtual servers", "user data", "key pair"] },
  { id: "4gQ5SOfBUm4", label: "EC2 Instance Types Explained", keywords: ["instance type", "instance types", "compute optimized", "memory optimized", "storage optimized", "accelerated computing", "general purpose", "burstable"] },
  { id: "rcWgcFMlwFw", label: "EC2 Auto Scaling: How it Works", keywords: ["auto scaling", "autoscaling", "scale out", "scale in", "scaling policy", "scaling policies", "horizontal scaling", "vertical scaling", "launch template"] },
  { id: "qpHLRc4Qt1E", label: "Elastic Load Balancing Introduction", keywords: ["load balancer", "load balancing", "elb", "alb", "nlb", "application load balancer", "network load balancer", "gateway load balancer", "health check", "health checks"] },
  { id: "eOBq__h4OJ4", label: "Introduction to AWS Lambda", keywords: ["lambda", "serverless", "function", "functions", "event-driven"] },
  { id: "DVrGXjjkpig", label: "ECS vs Fargate: When To Use What", keywords: ["ecs", "eks", "fargate", "container", "containers", "kubernetes", "docker", "ecr", "elastic container"] },
  { id: "SrwxAScdyT0", label: "Introduction to AWS Elastic Beanstalk", keywords: ["elastic beanstalk", "beanstalk", "platform as a service", "paas"] },
  { id: "COK3ko4np-0", label: "Amazon Lightsail vs EC2", keywords: ["lightsail"] },
  { id: "T4aAWrGHmxQ", label: "How AWS Batch Works", keywords: ["aws batch", "batch job", "batch jobs", "batch processing"] },
  { id: "juCUwETXv0I", label: "What is AWS Compute Optimizer?", keywords: ["compute optimizer", "rightsizing", "right-sizing", "right sizing", "over-provisioned", "underutilized"] },

  // Storage
  { id: "R0fqpQd9mSM", label: "Amazon S3 Explained in 10 Minutes", keywords: ["s3", "simple storage service", "bucket", "buckets", "object storage", "versioning", "static website", "durability"] },
  { id: "w5ocEIDR5WE", label: "Amazon S3 Storage Classes", keywords: ["storage class", "storage classes", "s3 standard", "infrequent access", "intelligent-tiering", "intelligent tiering", "one zone"] },
  { id: "Fo_cTVelDKk", label: "S3 Storage Classes Explained (Demo)", keywords: ["s3 standard-ia", "s3 one zone-ia", "s3 express", "reduced redundancy"] },
  { id: "c5PKWc_n2Kc", label: "S3 Lifecycle Management Policies", keywords: ["lifecycle", "lifecycle policy", "lifecycle rule", "transition", "expire", "expiration"] },
  { id: "gMzVi7Z8zBo", label: "Amazon S3 Glacier Storage Classes", keywords: ["glacier", "archive", "archival", "deep archive", "retrieval", "vault lock"] },
  { id: "smF92POVrhE", label: "EBS vs EFS vs Instance Store", keywords: ["ebs", "elastic block store", "efs", "elastic file system", "instance store", "block storage", "file storage", "fsx", "snapshot", "snapshots", "iops", "nfs"] },
  { id: "zxlV86Wh7EQ", label: "AWS Storage Gateway Explained", keywords: ["storage gateway", "file gateway", "volume gateway", "tape gateway", "on-premises storage"] },
  { id: "zXyudn7KeZM", label: "AWS Snow Family Explained", keywords: ["snow family", "snowball", "snowcone", "snowmobile", "petabyte", "petabytes", "physical device", "limited bandwidth", "offline transfer", "datasync", "transfer family"] },
  { id: "NNpIbip8nGE", label: "AWS Backup Tutorial for Beginners", keywords: ["aws backup", "backup plan", "backup plans", "backups", "disaster recovery", "recovery point", "recovery time", "rpo", "rto", "pilot light", "warm standby", "elastic disaster recovery"] },

  // Databases
  { id: "eMzCI7S1P9M", label: "Understanding Amazon RDS", keywords: ["rds", "relational database service", "relational database", "multi-az", "multi az", "read replica", "read replicas", "mysql", "postgresql", "sql server", "oracle", "mariadb", "managed database"] },
  { id: "l7IpsIzMa6E", label: "What is Amazon Aurora", keywords: ["aurora"] },
  { id: "kxW3-k7NXwo", label: "What is Amazon DynamoDB?", keywords: ["dynamodb", "nosql", "key-value", "key value", "document database", "single-digit millisecond", "dax", "documentdb", "keyspaces", "neptune", "graph database", "timestream", "qldb", "ledger"] },
  { id: "dSybACt3fX8", label: "How Does ElastiCache Work?", keywords: ["elasticache", "redis", "memcached", "in-memory", "in memory", "caching", "cache layer", "memorydb"] },
  { id: "lWwFJV_9PoE", label: "Data Warehousing with Amazon Redshift", keywords: ["redshift", "data warehouse", "data warehousing", "olap", "analytics queries", "columnar"] },

  // Networking
  { id: "7_NNlnH7sAg", label: "Amazon VPC Basics", keywords: ["vpc", "virtual private cloud", "subnet", "subnets", "internet gateway", "nat gateway", "route table", "route tables", "vpc peering", "vpc endpoint", "privatelink", "cidr", "elastic ip"] },
  { id: "JWoNu2Mtpdg", label: "Security Groups vs Network ACLs", keywords: ["security group", "security groups", "network acl", "network acls", "nacl", "nacls", "stateful", "stateless", "inbound rule", "inbound rules", "outbound rule"] },
  { id: "JRZiQFVWpi8", label: "Amazon Route 53 Basics", keywords: ["route 53", "route53", "dns", "domain name", "domain registration", "routing policy", "routing policies", "hosted zone", "latency-based", "failover routing", "geolocation"] },
  { id: "A_1pXqChn3s", label: "Hybrid Cloud with AWS VPN and Direct Connect", keywords: ["direct connect", "site-to-site vpn", "site to site vpn", "vpn", "dedicated network connection", "private connection", "virtual private gateway", "client vpn"] },
  { id: "yRyr_TjtiDg", label: "Global Networking with AWS Transit Gateway", keywords: ["transit gateway", "hub-and-spoke", "hub and spoke", "connect multiple vpcs", "thousands of vpcs"] },
  { id: "K-zh-SKfjLA", label: "What is AWS Global Accelerator?", keywords: ["global accelerator", "anycast", "static ip", "static ips", "aws global network"] },
  { id: "1XcpQHfTOvs", label: "What is Amazon API Gateway?", keywords: ["api gateway", "rest api", "restful", "http api", "websocket", "throttling", "api keys", "appsync", "graphql"] },

  // Application integration and deployment
  { id: "RoKAEzdcr7k", label: "SQS vs SNS vs EventBridge: When to Use What", keywords: ["sqs", "sns", "eventbridge", "simple queue", "simple notification", "queue", "queues", "pub/sub", "publish", "subscribe", "decouple", "decoupling", "loosely coupled", "message", "messages", "messaging", "fan-out", "fan out", "mq", "kinesis"] },
  { id: "wdJ5DN15jus", label: "AWS Step Functions Explained in 90 Seconds", keywords: ["step functions", "state machine", "workflow", "workflows", "orchestrat"] },
  { id: "Omppm_YUG2g", label: "Introduction to AWS CloudFormation", keywords: ["cloudformation", "template", "templates", "stack", "stacks", "provision resources", "repeatable", "declarative", "json or yaml", "yaml"] },
  { id: "7GVSvVUoze4", label: "CodePipeline, CodeCommit, CodeBuild and CodeDeploy", keywords: ["codepipeline", "codecommit", "codebuild", "codedeploy", "codestar", "codeartifact", "ci/cd", "continuous integration", "continuous delivery", "continuous deployment", "devops", "cloud9", "blue/green", "blue-green", "canary", "source control"] },
  { id: "pSVK-ingvfc", label: "AWS Systems Manager Introduction", keywords: ["systems manager", "session manager", "patch manager", "run command", "patching", "patch", "ops center", "opscenter", "fleet"] },
  { id: "HkbjHtG_d7w", label: "What is AWS Amplify?", keywords: ["amplify", "mobile app", "mobile application", "web and mobile", "full-stack", "frontend"] },

  // Monitoring and support
  { id: "Yxl7e88cTAQ", label: "Basics of Amazon CloudWatch", keywords: ["cloudwatch", "metric", "metrics", "alarm", "alarms", "cloudwatch logs", "monitor", "monitoring", "dashboard", "cpu utilization"] },
  { id: "Ueh7vyXNtog", label: "AWS X-Ray: Distributed Tracing for Beginners", keywords: ["x-ray", "xray", "tracing", "trace", "traces", "distributed application", "microservices", "bottleneck", "bottlenecks"] },
  { id: "uEIrFbesvP8", label: "AWS Trusted Advisor", keywords: ["trusted advisor", "best practice checks", "best-practice checks", "service limits", "service quotas", "quota"] },
  { id: "mHIba-3Cedo", label: "AWS Health Dashboard and Trusted Advisor", keywords: ["health dashboard", "personal health", "service health", "scheduled maintenance", "planned maintenance", "aws health"] },
  { id: "gkkcM37m5Zc", label: "AWS Support Plans: Everything You Need To Know", keywords: ["support plan", "support plans", "developer support", "business support", "enterprise support", "enterprise on-ramp", "basic support", "technical account manager", "tam", "concierge", "response time", "infrastructure event management", "support case", "support cases", "re:post", "knowledge center", "aws iq", "professional services", "partner network", "apn"] },

  // Billing and pricing
  { id: "-t148tYgnJU", label: "EC2 Pricing: On-Demand, Spot, Reserved, Savings Plans", keywords: ["on-demand", "on demand", "spot instance", "spot instances", "spot fleet", "reserved instance", "reserved instances", "dedicated host", "dedicated hosts", "dedicated instance", "dedicated instances", "capacity reservation", "pricing model", "pricing models", "interrupt"] },
  { id: "uCGgXw1o2Ks", label: "EC2 Costs: On-Demand vs Savings Plans vs Reserved", keywords: ["convertible", "standard reserved", "all upfront", "partial upfront", "no upfront", "1-year", "3-year", "one-year", "three-year"] },
  { id: "xjq-1CdvgQ8", label: "Savings Plans: Pricing Model for AWS Compute", keywords: ["savings plan", "savings plans", "compute savings", "ec2 instance savings", "hourly commitment"] },
  { id: "YAet7EnpvYI", label: "AWS Free Tier Explained in 2 Minutes", keywords: ["free tier", "always free", "12 months free", "12-month", "trial", "free credits"] },
  { id: "oE8TNKGmc40", label: "AWS Cost Explorer", keywords: ["cost explorer", "cost and usage report", "cost allocation tag", "cost allocation tags", "cost categories", "visualize", "spending trends", "forecast", "billing conductor", "cost anomaly"] },
  { id: "O0sofGVT7uw", label: "AWS Budgets: Set Up Billing Alerts", keywords: ["aws budgets", "budget", "budgets", "billing alarm", "billing alert", "billing alerts", "alert when", "threshold", "exceeds"] },
  { id: "PQFztryprPQ", label: "Estimate Costs with the AWS Pricing Calculator", keywords: ["pricing calculator", "estimate", "estimates", "total cost of ownership", "tco", "cost estimate"] },
  { id: "Rpf-_k0lQEQ", label: "Consolidated Billing for AWS", keywords: ["consolidated billing", "single bill", "volume discount", "volume discounts", "tiered pricing", "aggregate usage", "payer account", "multiple accounts"] },
  { id: "4obiejTAlFQ", label: "What is AWS Marketplace", keywords: ["marketplace", "third-party software", "third party software", "isv", "software vendor", "private offer", "saas subscription"] },

  // Analytics, AI and ML
  { id: "Qv_Tr_BCFCQ", label: "Introduction to Amazon SageMaker", keywords: ["sagemaker", "machine learning", "ml model", "ml models", "train and deploy", "rekognition", "comprehend", "polly", "transcribe", "translate", "lex", "textract", "kendra", "personalize", "forecast service", "fraud detector"] },
  { id: "_vdK5PgcNvc", label: "Introducing Amazon Bedrock", keywords: ["bedrock", "generative ai", "foundation model", "foundation models", "large language model", "llm", "amazon q", "codewhisperer", "titan"] },
  { id: "S0XXbFp5Lf0", label: "Athena, Kinesis, and Glue Explained", keywords: ["athena", "glue", "kinesis", "data lake", "lake formation", "etl", "query data in s3", "standard sql", "streaming data", "real-time data", "opensearch", "elasticsearch", "data firehose", "msk"] },
  { id: "QuwaBOESGiU", label: "An Introduction to Amazon EMR", keywords: ["emr", "elastic mapreduce", "hadoop", "spark", "big data", "data pipeline"] },
  { id: "2V1bHRLRG-w", label: "Introducing Amazon QuickSight", keywords: ["quicksight", "business intelligence", "bi tool", "dashboards", "visualization", "visualizations"] },
];

/** Domain-level fallback used when no keyword matches. */
const domainFallback: Record<Domain, string> = {
  "cloud-concepts": "a9__D53WsUs",
  "security-and-compliance": "_ZCTvmaPgao",
  "cloud-technology-and-services": "NhDYbskXRgc",
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
