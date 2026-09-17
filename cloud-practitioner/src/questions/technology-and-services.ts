import { Question } from "../types.js";

export const cloudTechnologyAndServicesQuestions: Question[] = [
  {
    id: "tech1",
    domain: "cloud-technology-and-services",
    text: "Which AWS compute service lets you run code without provisioning or managing servers, charging you only for the compute time consumed?",
    options: [
      { id: "a", text: "Amazon EC2" },
      { id: "b", text: "AWS Lambda" },
      { id: "c", text: "Amazon Lightsail" },
      { id: "d", text: "AWS Elastic Beanstalk" },
    ],
    correctOptionIds: ["b"],
    explanation: "AWS Lambda runs your code in response to events without you provisioning or managing servers, billed per use.",
    optionRationale: {
      a: "EC2 requires you to provision and manage virtual server instances yourself, not a serverless model.",
      b: "Lambda runs your code without provisioning or managing servers, billed only for compute time used.",
      c: "Lightsail hands you a pre-configured virtual private server that you still manage, not a serverless model.",
      d: "Elastic Beanstalk deploys your app onto managed infrastructure (like EC2) that still exists as servers.",
    },
    referenceUrl: "https://docs.aws.amazon.com/lambda/latest/dg/welcome.html",
    referenceLabel: "What Is AWS Lambda?",
    consoleUrl: "https://console.aws.amazon.com/lambda/home#/functions",
    consoleLabel: "Lambda > Functions",
    diagram: `flowchart TD
  Event[Event Trigger] --> Lambda[AWS Lambda]
  Lambda --> Run[Code Runs, No Servers Managed]`,
    cliExample: {
      description: "List your deployed Lambda functions",
      command: "aws lambda list-functions",
      sampleOutput: "{\n  \"Functions\": [\n    {\n      \"FunctionName\": \"process-orders\",\n      \"FunctionArn\": \"arn:aws:lambda:us-east-1:123456789012:function:process-orders\",\n      \"Runtime\": \"python3.12\",\n      \"Role\": \"arn:aws:iam::123456789012:role/lambda-exec-role\",\n      \"Handler\": \"app.handler\",\n      \"CodeSize\": 2048,\n      \"Timeout\": 30,\n      \"MemorySize\": 256,\n      \"LastModified\": \"2026-03-14T09:22:41.000+0000\"\n    }\n  ]\n}",
    },
  },
  {
    id: "tech2",
    domain: "cloud-technology-and-services",
    text: "Which AWS service provides resizable virtual servers in the cloud, giving you full control over the operating system?",
    options: [
      { id: "a", text: "Amazon EC2" },
      { id: "b", text: "AWS Lambda" },
      { id: "c", text: "Amazon S3" },
      { id: "d", text: "Amazon RDS" },
    ],
    correctOptionIds: ["a"],
    explanation: "Amazon EC2 provides resizable virtual servers (instances) with full control over the guest operating system.",
    optionRationale: {
      a: "EC2 gives you resizable virtual server instances with full control over the guest operating system.",
      b: "Lambda is serverless — there's no OS or instance for you to manage.",
      c: "S3 is object storage, not a compute service with an operating system.",
      d: "RDS is a managed database service; you don't get OS-level access to the underlying server.",
    },
    referenceUrl: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html",
    referenceLabel: "Amazon EC2 Concepts",
    consoleUrl: "https://console.aws.amazon.com/ec2/home#Instances:",
    consoleLabel: "EC2 > Instances",
    diagram: `flowchart TD
  EC2[Amazon EC2 Instance] --> OS[Full Control of Guest OS]
  EC2 --> Resize[Resizable Compute Capacity]`,
    cliExample: {
      description: "List your running EC2 instances",
      command: "aws ec2 describe-instances",
      sampleOutput: "{\n  \"Reservations\": [\n    {\n      \"ReservationId\": \"r-0a1b2c3d4e5f67890\",\n      \"OwnerId\": \"123456789012\",\n      \"Instances\": [\n        {\n          \"InstanceId\": \"i-0abc123def456789a\",\n          \"ImageId\": \"ami-0abcdef1234567890\",\n          \"InstanceType\": \"t3.micro\",\n          \"State\": {\n            \"Code\": 16,\n            \"Name\": \"running\"\n          },\n          \"PrivateIpAddress\": \"10.0.1.25\",\n          \"VpcId\": \"vpc-0123456789abcdef0\",\n          \"SubnetId\": \"subnet-0123456789abcdef0\",\n          \"LaunchTime\": \"2026-02-10T08:15:32+00:00\"\n        }\n      ]\n    }\n  ]\n}",
    },
  },
  {
    id: "tech3",
    domain: "cloud-technology-and-services",
    text: "Which service automatically adjusts the number of EC2 instances in a group based on demand?",
    options: [
      { id: "a", text: "Elastic Load Balancing" },
      { id: "b", text: "Amazon EC2 Auto Scaling" },
      { id: "c", text: "AWS Lambda" },
      { id: "d", text: "Amazon CloudFront" },
    ],
    correctOptionIds: ["b"],
    explanation: "Amazon EC2 Auto Scaling adds or removes instances automatically to match changing demand.",
    optionRationale: {
      a: "ELB distributes traffic across existing targets; it doesn't add or remove instances itself.",
      b: "EC2 Auto Scaling automatically launches or terminates instances in a group to match demand.",
      c: "Lambda scales its own concurrency automatically, but it doesn't manage an EC2 instance group.",
      d: "CloudFront is a content delivery network and has no role in EC2 instance counts.",
    },
    referenceUrl: "https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html",
    referenceLabel: "What Is Amazon EC2 Auto Scaling?",
    consoleUrl: "https://console.aws.amazon.com/ec2/home#AutoScalingGroups:",
    consoleLabel: "EC2 > Auto Scaling Groups",
    diagram: `flowchart TD
  A[Demand Increases] --> B[Amazon EC2 Auto Scaling]
  B --> C[Launch New Instances]
  D[Demand Decreases] --> B
  B --> E[Terminate Instances]`,
    cliExample: {
      description: "List your Auto Scaling groups",
      command: "aws autoscaling describe-auto-scaling-groups",
      sampleOutput: "{\n  \"AutoScalingGroups\": [\n    {\n      \"AutoScalingGroupName\": \"web-asg\",\n      \"AutoScalingGroupARN\": \"arn:aws:autoscaling:us-east-1:123456789012:autoScalingGroup:1a2b3c4d-5e6f-7890-abcd-ef1234567890:autoScalingGroupName/web-asg\",\n      \"MinSize\": 2,\n      \"MaxSize\": 6,\n      \"DesiredCapacity\": 2,\n      \"DefaultCooldown\": 300,\n      \"AvailabilityZones\": [\n        \"us-east-1a\",\n        \"us-east-1b\"\n      ],\n      \"Instances\": [\n        {\n          \"InstanceId\": \"i-0abc123def456789a\",\n          \"AvailabilityZone\": \"us-east-1a\",\n          \"LifecycleState\": \"InService\",\n          \"HealthStatus\": \"Healthy\"\n        }\n      ],\n      \"CreatedTime\": \"2026-01-20T11:05:17.512000+00:00\"\n    }\n  ]\n}",
    },
  },
  {
    id: "tech4",
    domain: "cloud-technology-and-services",
    text: "What is the primary function of Elastic Load Balancing (ELB)?",
    options: [
      { id: "a", text: "To store static website files" },
      { id: "b", text: "To automatically distribute incoming application traffic across multiple targets, such as EC2 instances" },
      { id: "c", text: "To encrypt data at rest" },
      { id: "d", text: "To provide a managed relational database" },
    ],
    correctOptionIds: ["b"],
    explanation: "Elastic Load Balancing distributes incoming traffic across multiple targets to improve availability and fault tolerance.",
    optionRationale: {
      a: "Storing static files is Amazon S3's job, not a load balancer's.",
      b: "ELB automatically distributes incoming traffic across multiple targets like EC2 instances.",
      c: "Encryption at rest is handled by storage/database services and KMS, not ELB.",
      d: "A managed relational database is Amazon RDS, unrelated to traffic distribution.",
    },
    referenceUrl: "https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/what-is-load-balancing.html",
    referenceLabel: "What Is Elastic Load Balancing?",
    consoleUrl: "https://console.aws.amazon.com/ec2/home#LoadBalancers:",
    consoleLabel: "EC2 > Load Balancers",
    diagram: `flowchart TD
  U[Incoming Traffic] --> LB[Elastic Load Balancer]
  LB --> I1[EC2 Instance 1]
  LB --> I2[EC2 Instance 2]
  LB --> I3[EC2 Instance 3]`,
    cliExample: {
      description: "List your load balancers",
      command: "aws elbv2 describe-load-balancers",
      sampleOutput: "{\n  \"LoadBalancers\": [\n    {\n      \"LoadBalancerArn\": \"arn:aws:elasticloadbalancing:us-east-1:123456789012:loadbalancer/app/web-alb/50dc6c495c0c9188\",\n      \"DNSName\": \"web-alb-1234567890.us-east-1.elb.amazonaws.com\",\n      \"LoadBalancerName\": \"web-alb\",\n      \"Scheme\": \"internet-facing\",\n      \"VpcId\": \"vpc-0123456789abcdef0\",\n      \"State\": {\n        \"Code\": \"active\"\n      },\n      \"Type\": \"application\",\n      \"IpAddressType\": \"ipv4\",\n      \"CreatedTime\": \"2026-01-22T14:30:00.000Z\"\n    }\n  ]\n}",
    },
  },
  {
    id: "tech5",
    domain: "cloud-technology-and-services",
    text: "Which AWS service is a fully managed container orchestration option that runs Amazon ECS and Kubernetes-compatible workloads without requiring you to manage the underlying servers?",
    options: [
      { id: "a", text: "AWS Fargate" },
      { id: "b", text: "Amazon EC2" },
      { id: "c", text: "AWS Lambda" },
      { id: "d", text: "Amazon Lightsail" },
    ],
    correctOptionIds: ["a"],
    explanation: "AWS Fargate is a serverless compute engine for containers that removes the need to provision or manage servers.",
    optionRationale: {
      a: "Fargate runs ECS and EKS container workloads as a serverless compute engine, with no servers to manage.",
      b: "EC2 requires you to provision and manage the underlying servers yourself.",
      c: "Lambda runs individual functions; it isn't the engine that runs ECS/Kubernetes container workloads.",
      d: "Lightsail offers simplified virtual private servers, not serverless container orchestration.",
    },
    referenceUrl: "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html",
    referenceLabel: "AWS Fargate",
    consoleUrl: "https://console.aws.amazon.com/ecs/v2/clusters",
    consoleLabel: "ECS > Clusters",
    diagram: `flowchart TD
  Container[Container Definition] --> Fargate[AWS Fargate]
  Fargate --> ECS[Amazon ECS]
  Fargate --> EKS[Amazon EKS]`,
    cliExample: {
      description: "List available Fargate capacity providers",
      command: "aws ecs describe-capacity-providers",
      sampleOutput: "{\n  \"capacityProviders\": [\n    {\n      \"capacityProviderArn\": \"arn:aws:ecs:us-east-1:123456789012:capacity-provider/FARGATE\",\n      \"name\": \"FARGATE\",\n      \"status\": \"ACTIVE\"\n    },\n    {\n      \"capacityProviderArn\": \"arn:aws:ecs:us-east-1:123456789012:capacity-provider/FARGATE_SPOT\",\n      \"name\": \"FARGATE_SPOT\",\n      \"status\": \"ACTIVE\"\n    }\n  ]\n}",
    },
  },
  {
    id: "tech6",
    domain: "cloud-technology-and-services",
    text: "A developer wants the simplest way to deploy a web application to AWS without manually configuring the underlying infrastructure like load balancers and EC2 instances. Which service should they use?",
    options: [
      { id: "a", text: "AWS Elastic Beanstalk" },
      { id: "b", text: "Amazon VPC" },
      { id: "c", text: "AWS Direct Connect" },
      { id: "d", text: "Amazon Route 53" },
    ],
    correctOptionIds: ["a"],
    explanation: "AWS Elastic Beanstalk automatically handles provisioning, load balancing, and scaling for deployed applications.",
    optionRationale: {
      a: "Elastic Beanstalk automatically provisions and configures the load balancer, instances, and scaling for you.",
      b: "VPC defines a virtual network; it doesn't deploy or configure an application for you.",
      c: "Direct Connect is a dedicated network link to AWS, unrelated to application deployment.",
      d: "Route 53 handles DNS routing, not application infrastructure provisioning.",
    },
    referenceUrl: "https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/Welcome.html",
    referenceLabel: "What Is AWS Elastic Beanstalk?",
    consoleUrl: "https://console.aws.amazon.com/elasticbeanstalk/home#/applications",
    consoleLabel: "Elastic Beanstalk > Applications",
    diagram: `flowchart TD
  App[Application Code] --> EB[AWS Elastic Beanstalk]
  EB --> LB[Load Balancer]
  EB --> ASG[Auto Scaling Group]
  EB --> Inst[EC2 Instances]`,
    cliExample: {
      description: "List your Elastic Beanstalk environments",
      command: "aws elasticbeanstalk describe-environments",
      sampleOutput: "{\n  \"Environments\": [\n    {\n      \"EnvironmentName\": \"my-web-app-env\",\n      \"EnvironmentId\": \"e-abcd1234ef\",\n      \"ApplicationName\": \"my-web-app\",\n      \"SolutionStackName\": \"64bit Amazon Linux 2023 v6.4.0 running Node.js 20\",\n      \"CNAME\": \"my-web-app-env.eba-abc123.us-east-1.elasticbeanstalk.com\",\n      \"Status\": \"Ready\",\n      \"Health\": \"Green\",\n      \"DateCreated\": \"2026-03-01T10:00:00.000Z\"\n    }\n  ]\n}",
    },
  },
  {
    id: "tech7",
    domain: "cloud-technology-and-services",
    text: "Which Amazon S3 storage class is best suited for data that is accessed infrequently but requires rapid access when needed?",
    options: [
      { id: "a", text: "S3 Standard" },
      { id: "b", text: "S3 Standard-Infrequent Access (S3 Standard-IA)" },
      { id: "c", text: "S3 Glacier Deep Archive" },
      { id: "d", text: "S3 Intelligent-Tiering configured only for frequent access" },
    ],
    correctOptionIds: ["b"],
    explanation: "S3 Standard-IA offers lower storage cost for infrequently accessed data while still allowing millisecond retrieval.",
    optionRationale: {
      a: "S3 Standard costs more and is designed for data accessed frequently, not infrequently.",
      b: "Standard-IA is priced for infrequent access but still offers millisecond retrieval when you need the data.",
      c: "Glacier Deep Archive retrieval takes hours, not the rapid access this scenario requires.",
      d: "Forcing Intelligent-Tiering to frequent access defeats its purpose and costs more than Standard-IA for this pattern.",
    },
    referenceUrl: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html",
    referenceLabel: "Amazon S3 Storage Classes",
    consoleUrl: "https://console.aws.amazon.com/s3/buckets",
    consoleLabel: "S3 > Buckets",
    diagram: `flowchart LR
  A[S3 Standard] --> B[S3 Standard-IA]
  B --> C[S3 One Zone-IA]
  C --> D[S3 Glacier Instant Retrieval]
  D --> E[S3 Glacier Deep Archive]`,
    cliExample: {
      description: "List your S3 buckets",
      command: "aws s3api list-buckets",
      sampleOutput: "{\n  \"Buckets\": [\n    {\n      \"Name\": \"my-reports-bucket\",\n      \"CreationDate\": \"2026-01-15T09:12:44+00:00\"\n    },\n    {\n      \"Name\": \"my-backups-bucket\",\n      \"CreationDate\": \"2026-02-03T16:40:02+00:00\"\n    }\n  ],\n  \"Owner\": {\n    \"DisplayName\": \"admin\",\n    \"ID\": \"a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2\"\n  }\n}",
    },
  },
  {
    id: "tech8",
    domain: "cloud-technology-and-services",
    text: "Which S3 storage class is designed for long-term archival data that is rarely accessed and can tolerate retrieval times of many hours?",
    options: [
      { id: "a", text: "S3 Standard" },
      { id: "b", text: "S3 One Zone-IA" },
      { id: "c", text: "S3 Glacier Deep Archive" },
      { id: "d", text: "S3 Standard-IA" },
    ],
    correctOptionIds: ["c"],
    explanation: "S3 Glacier Deep Archive is the lowest-cost S3 storage class, meant for long-term archives rarely accessed.",
    optionRationale: {
      a: "S3 Standard is the most expensive option here and is meant for frequently accessed data.",
      b: "One Zone-IA still offers millisecond retrieval, not the multi-hour retrieval tolerance described.",
      c: "Glacier Deep Archive is the lowest-cost class, built for archives rarely accessed and retrieved over hours.",
      d: "Standard-IA still offers millisecond retrieval, not built for long-term rarely accessed archives.",
    },
    referenceUrl: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html",
    referenceLabel: "Amazon S3 Storage Classes",
    consoleUrl: "https://console.aws.amazon.com/s3/buckets",
    consoleLabel: "S3 > Buckets",
    diagram: `flowchart LR
  Standard[Millisecond Retrieval] --> GIR[Glacier Instant Retrieval]
  GIR --> GFR[Glacier Flexible Retrieval - Hours]
  GFR --> GDA[Glacier Deep Archive - Up to 12 Hours]`,
    cliExample: {
      description: "List your S3 buckets",
      command: "aws s3api list-buckets",
      sampleOutput: "{\n  \"Buckets\": [\n    {\n      \"Name\": \"my-archive-bucket\",\n      \"CreationDate\": \"2026-01-15T09:12:44+00:00\"\n    },\n    {\n      \"Name\": \"my-compliance-records\",\n      \"CreationDate\": \"2026-02-03T16:40:02+00:00\"\n    }\n  ],\n  \"Owner\": {\n    \"DisplayName\": \"admin\",\n    \"ID\": \"a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2\"\n  }\n}",
    },
  },
  {
    id: "tech9",
    domain: "cloud-technology-and-services",
    text: "Which TWO of the following statements about Amazon EBS are true?",
    options: [
      { id: "a", text: "EBS volumes provide block-level storage for use with EC2 instances" },
      { id: "b", text: "EBS volumes can be attached to multiple Availability Zones simultaneously" },
      { id: "c", text: "EBS volumes can persist independently of the life of the instance, when configured to do so" },
      { id: "d", text: "EBS is an object storage service like Amazon S3" },
      { id: "e", text: "EBS volumes cannot be backed up" },
    ],
    correctOptionIds: ["a", "c"],
    explanation: "EBS provides block storage for EC2, and volumes can be configured to persist after an instance is terminated.",
    optionRationale: {
      a: "EBS provides block-level storage volumes that attach to EC2 instances.",
      b: "An EBS volume lives in a single Availability Zone; it can't span multiple AZs at once.",
      c: "You can configure a volume to persist (skip 'delete on termination') so it survives instance termination.",
      d: "EBS is block storage, not object storage — that's what distinguishes it from S3.",
      e: "EBS volumes can be backed up using snapshots stored in S3.",
    },
    referenceUrl: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AmazonEBS.html",
    referenceLabel: "Amazon EBS",
    consoleUrl: "https://console.aws.amazon.com/ec2/home#Volumes:",
    consoleLabel: "EC2 > Volumes",
    diagram: `flowchart TD
  EC2[EC2 Instance] --> EBS[EBS Volume]
  EBS --> Data[(Persistent Block Storage)]
  EBS --> Snap[EBS Snapshot in S3]`,
    cliExample: {
      description: "List your EBS volumes",
      command: "aws ec2 describe-volumes",
      sampleOutput: "{\n  \"Volumes\": [\n    {\n      \"VolumeId\": \"vol-0123456789abcdef0\",\n      \"Size\": 30,\n      \"VolumeType\": \"gp3\",\n      \"State\": \"in-use\",\n      \"AvailabilityZone\": \"us-east-1a\",\n      \"Encrypted\": true,\n      \"Iops\": 3000,\n      \"Attachments\": [\n        {\n          \"VolumeId\": \"vol-0123456789abcdef0\",\n          \"InstanceId\": \"i-0abc123def456789a\",\n          \"Device\": \"/dev/xvda\",\n          \"State\": \"attached\",\n          \"DeleteOnTermination\": false\n        }\n      ],\n      \"CreateTime\": \"2026-02-10T08:15:30.000Z\"\n    }\n  ]\n}",
    },
  },
  {
    id: "tech10",
    domain: "cloud-technology-and-services",
    text: "Which AWS storage service provides a scalable, fully managed file system that can be mounted concurrently by multiple EC2 instances?",
    options: [
      { id: "a", text: "Amazon S3" },
      { id: "b", text: "Amazon EFS (Elastic File System)" },
      { id: "c", text: "Amazon EBS" },
      { id: "d", text: "AWS Storage Gateway" },
    ],
    correctOptionIds: ["b"],
    explanation: "Amazon EFS is a managed, elastic file system that many EC2 instances can mount and share at once.",
    optionRationale: {
      a: "S3 is object storage accessed via API calls, not a POSIX file system you mount on instances.",
      b: "EFS is a managed elastic file system that many EC2 instances can mount and share concurrently.",
      c: "A standard EBS volume attaches to one instance at a time, not shared concurrently across many.",
      d: "Storage Gateway bridges on-premises storage with AWS; it isn't itself a shared EC2-mountable file system.",
    },
    referenceUrl: "https://docs.aws.amazon.com/efs/latest/ug/whatisefs.html",
    referenceLabel: "What Is Amazon EFS?",
    consoleUrl: "https://console.aws.amazon.com/efs/home#/file-systems",
    consoleLabel: "EFS > File systems",
    diagram: `flowchart TD
  EFS[Amazon EFS] --> I1[EC2 Instance 1]
  EFS --> I2[EC2 Instance 2]
  EFS --> I3[EC2 Instance 3]`,
    cliExample: {
      description: "List your EFS file systems",
      command: "aws efs describe-file-systems",
      sampleOutput: "{\n  \"FileSystems\": [\n    {\n      \"OwnerId\": \"123456789012\",\n      \"CreationToken\": \"shared-content\",\n      \"FileSystemId\": \"fs-0123456789abcdef0\",\n      \"FileSystemArn\": \"arn:aws:elasticfilesystem:us-east-1:123456789012:file-system/fs-0123456789abcdef0\",\n      \"CreationTime\": \"2026-02-18T13:45:10+00:00\",\n      \"LifeCycleState\": \"available\",\n      \"NumberOfMountTargets\": 2,\n      \"SizeInBytes\": {\n        \"Value\": 6291456\n      },\n      \"PerformanceMode\": \"generalPurpose\",\n      \"Encrypted\": true,\n      \"ThroughputMode\": \"elastic\"\n    }\n  ]\n}",
    },
  },
  {
    id: "tech11",
    domain: "cloud-technology-and-services",
    text: "Which service helps organizations integrate on-premises storage environments with AWS cloud storage?",
    options: [
      { id: "a", text: "AWS Storage Gateway" },
      { id: "b", text: "Amazon S3 Transfer Acceleration" },
      { id: "c", text: "AWS Snowball" },
      { id: "d", text: "Amazon FSx" },
    ],
    correctOptionIds: ["a"],
    explanation: "AWS Storage Gateway is a hybrid cloud storage service connecting on-premises environments with AWS storage.",
    optionRationale: {
      a: "Storage Gateway is purpose-built to connect on-premises environments to AWS storage.",
      b: "Transfer Acceleration speeds up uploads to S3 over the internet; it's not a hybrid storage integration.",
      c: "Snowball is for one-off physical bulk data transfer, not ongoing hybrid storage integration.",
      d: "FSx provides managed file systems that run in AWS, not an on-premises integration layer.",
    },
    referenceUrl: "https://docs.aws.amazon.com/storagegateway/latest/userguide/WhatIsStorageGateway.html",
    referenceLabel: "What Is AWS Storage Gateway?",
    consoleUrl: "https://console.aws.amazon.com/storagegateway/home#/gateways",
    consoleLabel: "Storage Gateway > Gateways",
    diagram: `flowchart LR
  OnPrem[On-Premises Storage] --> SGW[AWS Storage Gateway]
  SGW --> S3[Amazon S3]
  SGW --> Glacier[S3 Glacier]`,
    cliExample: {
      description: "List your Storage Gateway gateways",
      command: "aws storagegateway list-gateways",
      sampleOutput: "{\n  \"Gateways\": [\n    {\n      \"GatewayId\": \"sgw-12A3456B\",\n      \"GatewayARN\": \"arn:aws:storagegateway:us-east-1:123456789012:gateway/sgw-12A3456B\",\n      \"GatewayType\": \"FILE_S3\",\n      \"GatewayOperationalState\": \"ACTIVE\",\n      \"GatewayName\": \"onprem-file-gateway\",\n      \"Ec2InstanceRegion\": \"us-east-1\",\n      \"HostEnvironment\": \"VMWARE\"\n    }\n  ]\n}",
    },
  },
  {
    id: "tech12",
    domain: "cloud-technology-and-services",
    text: "Which AWS database service is a fully managed relational database that supports engines such as MySQL, PostgreSQL, and SQL Server?",
    options: [
      { id: "a", text: "Amazon DynamoDB" },
      { id: "b", text: "Amazon RDS" },
      { id: "c", text: "Amazon Redshift" },
      { id: "d", text: "Amazon ElastiCache" },
    ],
    correctOptionIds: ["b"],
    explanation: "Amazon RDS is a managed relational database service supporting multiple engines including MySQL and PostgreSQL.",
    optionRationale: {
      a: "DynamoDB is a NoSQL key-value/document database, not a relational engine like MySQL or SQL Server.",
      b: "RDS is a managed relational database service supporting engines including MySQL, PostgreSQL, and SQL Server.",
      c: "Redshift is a data warehouse for analytics, not a general-purpose relational database service.",
      d: "ElastiCache is an in-memory caching service, not a relational database.",
    },
    referenceUrl: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html",
    referenceLabel: "What Is Amazon RDS?",
    consoleUrl: "https://console.aws.amazon.com/rds/home#databases:",
    consoleLabel: "RDS > Databases",
    diagram: `flowchart TD
  RDS[Amazon RDS] --> MySQL[MySQL]
  RDS --> Postgres[PostgreSQL]
  RDS --> SQLServer[SQL Server]`,
    cliExample: {
      description: "List your RDS database instances",
      command: "aws rds describe-db-instances",
      sampleOutput: "{\n  \"DBInstances\": [\n    {\n      \"DBInstanceIdentifier\": \"mydb\",\n      \"DBInstanceClass\": \"db.t3.medium\",\n      \"Engine\": \"postgres\",\n      \"EngineVersion\": \"16.3\",\n      \"DBInstanceStatus\": \"available\",\n      \"MasterUsername\": \"admin\",\n      \"Endpoint\": {\n        \"Address\": \"mydb.c9akciq32rlq.us-east-1.rds.amazonaws.com\",\n        \"Port\": 5432\n      },\n      \"AllocatedStorage\": 20,\n      \"MultiAZ\": false,\n      \"StorageType\": \"gp3\",\n      \"DBInstanceArn\": \"arn:aws:rds:us-east-1:123456789012:db:mydb\"\n    }\n  ]\n}",
    },
  },
  {
    id: "tech13",
    domain: "cloud-technology-and-services",
    text: "Which AWS database service is a key-value and document NoSQL database designed for single-digit millisecond performance at any scale?",
    options: [
      { id: "a", text: "Amazon RDS" },
      { id: "b", text: "Amazon DynamoDB" },
      { id: "c", text: "Amazon Redshift" },
      { id: "d", text: "Amazon Aurora" },
    ],
    correctOptionIds: ["b"],
    explanation: "Amazon DynamoDB is a fully managed NoSQL key-value and document database built for fast, consistent performance.",
    optionRationale: {
      a: "RDS is a relational database service, not a key-value/document NoSQL store.",
      b: "DynamoDB is a fully managed NoSQL key-value/document database built for single-digit millisecond performance.",
      c: "Redshift is a SQL data warehouse for analytics, not a low-latency NoSQL store.",
      d: "Aurora is a relational (MySQL/PostgreSQL-compatible) database, not NoSQL.",
    },
    referenceUrl: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html",
    referenceLabel: "What Is Amazon DynamoDB?",
    consoleUrl: "https://console.aws.amazon.com/dynamodbv2/home#tables",
    consoleLabel: "DynamoDB > Tables",
    diagram: `flowchart LR
  App[Application] --> DDB[Amazon DynamoDB]
  DDB --> KV[Key-Value Item]
  DDB --> Doc[Document Item]`,
    cliExample: {
      description: "List your DynamoDB tables",
      command: "aws dynamodb list-tables",
      sampleOutput: "{\n  \"TableNames\": [\n    \"Orders\",\n    \"UserSessions\"\n  ]\n}",
    },
  },
  {
    id: "tech14",
    domain: "cloud-technology-and-services",
    text: "Which TWO caching engines are supported by Amazon ElastiCache?",
    options: [
      { id: "a", text: "Redis" },
      { id: "b", text: "Memcached" },
      { id: "c", text: "MySQL" },
      { id: "d", text: "PostgreSQL" },
      { id: "e", text: "MongoDB" },
    ],
    correctOptionIds: ["a", "b"],
    explanation: "Amazon ElastiCache supports the Redis and Memcached in-memory caching engines.",
    optionRationale: {
      a: "Redis is one of the two in-memory engines ElastiCache supports.",
      b: "Memcached is the other in-memory engine ElastiCache supports.",
      c: "MySQL is a relational database engine, not an ElastiCache caching engine.",
      d: "PostgreSQL is a relational database engine, not an ElastiCache caching engine.",
      e: "MongoDB is a document database, not one of ElastiCache's supported caching engines.",
    },
    referenceUrl: "https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/WhatIs.html",
    referenceLabel: "What Is Amazon ElastiCache?",
    consoleUrl: "https://console.aws.amazon.com/elasticache/home#/redis",
    consoleLabel: "ElastiCache > Redis caches",
    diagram: `flowchart LR
  App[Application] --> Cache[Amazon ElastiCache]
  Cache --> Redis[Redis Engine]
  Cache --> Memcached[Memcached Engine]`,
    cliExample: {
      description: "List your ElastiCache clusters",
      command: "aws elasticache describe-cache-clusters",
      sampleOutput: "{\n  \"CacheClusters\": [\n    {\n      \"CacheClusterId\": \"session-cache-001\",\n      \"CacheNodeType\": \"cache.t3.micro\",\n      \"Engine\": \"redis\",\n      \"EngineVersion\": \"7.1\",\n      \"CacheClusterStatus\": \"available\",\n      \"NumCacheNodes\": 1,\n      \"PreferredAvailabilityZone\": \"us-east-1a\",\n      \"CacheClusterCreateTime\": \"2026-03-05T12:00:00.000Z\",\n      \"ARN\": \"arn:aws:elasticache:us-east-1:123456789012:cluster:session-cache-001\"\n    }\n  ]\n}",
    },
  },
  {
    id: "tech15",
    domain: "cloud-technology-and-services",
    text: "Which AWS service is purpose-built as a fully managed data warehouse for running complex analytic queries against large volumes of data?",
    options: [
      { id: "a", text: "Amazon RDS" },
      { id: "b", text: "Amazon Redshift" },
      { id: "c", text: "Amazon DynamoDB" },
      { id: "d", text: "Amazon Aurora" },
    ],
    correctOptionIds: ["b"],
    explanation: "Amazon Redshift is a managed data warehouse service optimized for large-scale analytic queries.",
    optionRationale: {
      a: "RDS is optimized for transactional (OLTP) workloads, not large-scale analytic queries.",
      b: "Redshift is a managed data warehouse purpose-built for complex analytic queries at scale.",
      c: "DynamoDB is a NoSQL store optimized for fast lookups, not complex analytic SQL queries.",
      d: "Aurora is a relational database for transactional workloads, not a dedicated data warehouse.",
    },
    referenceUrl: "https://docs.aws.amazon.com/redshift/latest/mgmt/welcome.html",
    referenceLabel: "What Is Amazon Redshift?",
    consoleUrl: "https://console.aws.amazon.com/redshiftv2/home#clusters",
    consoleLabel: "Redshift > Clusters",
    diagram: `flowchart LR
  RDS[Amazon RDS - OLTP] --> Redshift[Amazon Redshift - Analytics]
  Redshift --> Query[Complex Analytic Queries]`,
    cliExample: {
      description: "List your Redshift clusters",
      command: "aws redshift describe-clusters",
      sampleOutput: "{\n  \"Clusters\": [\n    {\n      \"ClusterIdentifier\": \"analytics-cluster\",\n      \"NodeType\": \"ra3.xlplus\",\n      \"ClusterStatus\": \"available\",\n      \"MasterUsername\": \"awsuser\",\n      \"DBName\": \"dev\",\n      \"Endpoint\": {\n        \"Address\": \"analytics-cluster.abc123xyz.us-east-1.redshift.amazonaws.com\",\n        \"Port\": 5439\n      },\n      \"ClusterCreateTime\": \"2026-02-25T10:30:00.000Z\",\n      \"NumberOfNodes\": 2,\n      \"VpcId\": \"vpc-0123456789abcdef0\",\n      \"ClusterNamespaceArn\": \"arn:aws:redshift:us-east-1:123456789012:namespace:1a2b3c4d-5e6f-7890-abcd-ef1234567890\"\n    }\n  ]\n}",
    },
  },
  {
    id: "tech16",
    domain: "cloud-technology-and-services",
    text: "Which AWS networking service lets you provision a logically isolated section of the AWS Cloud where you can launch resources in a virtual network you define?",
    options: [
      { id: "a", text: "Amazon VPC" },
      { id: "b", text: "Amazon Route 53" },
      { id: "c", text: "AWS Direct Connect" },
      { id: "d", text: "Amazon CloudFront" },
    ],
    correctOptionIds: ["a"],
    explanation: "Amazon VPC lets you define and control a logically isolated virtual network within AWS.",
    optionRationale: {
      a: "VPC lets you provision a logically isolated virtual network and define its IP ranges, subnets, and routing.",
      b: "Route 53 is a DNS service; it doesn't provision an isolated virtual network.",
      c: "Direct Connect is a dedicated physical link into AWS, not the virtual network itself.",
      d: "CloudFront is a content delivery network, unrelated to defining a virtual network.",
    },
    referenceUrl: "https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html",
    referenceLabel: "What Is Amazon VPC?",
    consoleUrl: "https://console.aws.amazon.com/vpcconsole/home#vpcs:",
    consoleLabel: "VPC > Your VPCs",
    diagram: `flowchart TD
  V[Amazon VPC] --> PubSub[Public Subnet]
  V --> PrivSub[Private Subnet]
  PubSub --> IGW[Internet Gateway]
  PrivSub --> NAT[NAT Gateway]
  NAT --> IGW`,
    cliExample: {
      description: "List your VPCs",
      command: "aws ec2 describe-vpcs",
      sampleOutput: "{\n  \"Vpcs\": [\n    {\n      \"OwnerId\": \"123456789012\",\n      \"VpcId\": \"vpc-0123456789abcdef0\",\n      \"CidrBlock\": \"10.0.0.0/16\",\n      \"DhcpOptionsId\": \"dopt-0123456789abcdef0\",\n      \"State\": \"available\",\n      \"InstanceTenancy\": \"default\",\n      \"IsDefault\": false,\n      \"Tags\": [\n        {\n          \"Key\": \"Name\",\n          \"Value\": \"prod-vpc\"\n        }\n      ]\n    }\n  ]\n}",
    },
  },
  {
    id: "tech17",
    domain: "cloud-technology-and-services",
    text: "Which AWS service is a scalable Domain Name System (DNS) web service used to route end users to internet applications?",
    options: [
      { id: "a", text: "Amazon CloudFront" },
      { id: "b", text: "Amazon Route 53" },
      { id: "c", text: "AWS Global Accelerator" },
      { id: "d", text: "Amazon API Gateway" },
    ],
    correctOptionIds: ["b"],
    explanation: "Amazon Route 53 is AWS's scalable DNS and domain registration service.",
    optionRationale: {
      a: "CloudFront is a content delivery network that caches content; it isn't the DNS service itself.",
      b: "Route 53 is AWS's scalable DNS web service, used to route users to internet applications.",
      c: "Global Accelerator improves network performance using the AWS global network, but it isn't primarily a DNS service.",
      d: "API Gateway manages and publishes APIs; it doesn't provide general-purpose DNS routing.",
    },
    referenceUrl: "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Welcome.html",
    referenceLabel: "What Is Amazon Route 53?",
    consoleUrl: "https://console.aws.amazon.com/route53/v2/hostedzones",
    consoleLabel: "Route 53 > Hosted zones",
    diagram: `flowchart LR
  User[End User] --> DNS[Amazon Route 53]
  DNS --> App[Internet Application]`,
    cliExample: {
      description: "List your Route 53 hosted zones",
      command: "aws route53 list-hosted-zones",
      sampleOutput: "{\n  \"HostedZones\": [\n    {\n      \"Id\": \"/hostedzone/Z0123456789ABCDEFGHIJ\",\n      \"Name\": \"example.com.\",\n      \"CallerReference\": \"2026-01-12T10:00:00Z\",\n      \"Config\": {\n        \"Comment\": \"Public zone for example.com\",\n        \"PrivateZone\": false\n      },\n      \"ResourceRecordSetCount\": 6\n    }\n  ]\n}",
    },
  },
  {
    id: "tech18",
    domain: "cloud-technology-and-services",
    text: "Which AWS service is a content delivery network (CDN) that securely delivers data, videos, and applications to users with low latency by caching content at edge locations?",
    options: [
      { id: "a", text: "Amazon Route 53" },
      { id: "b", text: "Amazon CloudFront" },
      { id: "c", text: "AWS Direct Connect" },
      { id: "d", text: "Amazon VPC" },
    ],
    correctOptionIds: ["b"],
    explanation: "Amazon CloudFront is AWS's CDN, caching content at edge locations to reduce latency for end users.",
    optionRationale: {
      a: "Route 53 is a DNS service; it doesn't cache content at edge locations.",
      b: "CloudFront is AWS's CDN, caching content at edge locations for low-latency delivery.",
      c: "Direct Connect provides a private network link to AWS, not edge caching for end users.",
      d: "VPC defines a virtual network; it plays no role in content caching or delivery.",
    },
    referenceUrl: "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html",
    referenceLabel: "What Is Amazon CloudFront?",
    consoleUrl: "https://console.aws.amazon.com/cloudfront/v4/home#/distributions",
    consoleLabel: "CloudFront > Distributions",
    diagram: `flowchart LR
  Origin[Origin Server] --> CF[CloudFront Distribution]
  CF --> Edge1[Edge Location A]
  CF --> Edge2[Edge Location B]
  Edge1 --> User1[End User]
  Edge2 --> User2[End User]`,
    cliExample: {
      description: "List your CloudFront distributions",
      command: "aws cloudfront list-distributions",
      sampleOutput: "{\n  \"DistributionList\": {\n    \"Marker\": \"\",\n    \"MaxItems\": 100,\n    \"IsTruncated\": false,\n    \"Quantity\": 1,\n    \"Items\": [\n      {\n        \"Id\": \"E1A2B3C4D5E6F7\",\n        \"ARN\": \"arn:aws:cloudfront::123456789012:distribution/E1A2B3C4D5E6F7\",\n        \"Status\": \"Deployed\",\n        \"LastModifiedTime\": \"2026-03-10T15:20:00.000Z\",\n        \"DomainName\": \"d111111abcdef8.cloudfront.net\",\n        \"Enabled\": true,\n        \"Origins\": {\n          \"Quantity\": 1,\n          \"Items\": [\n            {\n              \"Id\": \"S3-my-static-site\",\n              \"DomainName\": \"my-static-site.s3.us-east-1.amazonaws.com\"\n            }\n          ]\n        },\n        \"PriceClass\": \"PriceClass_All\",\n        \"HttpVersion\": \"http2\"\n      }\n    ]\n  }\n}",
    },
  },
  {
    id: "tech19",
    domain: "cloud-technology-and-services",
    text: "Which service provides a dedicated, private network connection between an on-premises data center and AWS, bypassing the public internet?",
    options: [
      { id: "a", text: "AWS VPN" },
      { id: "b", text: "AWS Direct Connect" },
      { id: "c", text: "Amazon CloudFront" },
      { id: "d", text: "AWS Transit Gateway" },
    ],
    correctOptionIds: ["b"],
    explanation: "AWS Direct Connect establishes a dedicated private network connection between on-premises infrastructure and AWS.",
    optionRationale: {
      a: "AWS VPN creates encrypted tunnels over the public internet, not a dedicated private line.",
      b: "Direct Connect establishes a dedicated private connection between on-premises infrastructure and AWS, bypassing the public internet.",
      c: "CloudFront is a CDN and has no role in private network connectivity.",
      d: "Transit Gateway interconnects VPCs and on-premises networks, but it doesn't itself provide the dedicated physical link.",
    },
    referenceUrl: "https://docs.aws.amazon.com/directconnect/latest/UserGuide/Welcome.html",
    referenceLabel: "What Is AWS Direct Connect?",
    consoleUrl: "https://console.aws.amazon.com/directconnect/v2/home#/connections",
    consoleLabel: "Direct Connect > Connections",
    diagram: `flowchart LR
  OnPrem[On-Premises Data Center] -->|dedicated private link| DX[AWS Direct Connect]
  DX --> Cloud[AWS Cloud]`,
    cliExample: {
      description: "List your Direct Connect connections",
      command: "aws directconnect describe-connections",
      sampleOutput: "{\n  \"connections\": [\n    {\n      \"ownerAccount\": \"123456789012\",\n      \"connectionId\": \"dxcon-fg1a2b3c\",\n      \"connectionName\": \"dc-to-aws-primary\",\n      \"connectionState\": \"available\",\n      \"region\": \"us-east-1\",\n      \"location\": \"EqDC2\",\n      \"bandwidth\": \"1Gbps\",\n      \"vlan\": 101,\n      \"partnerName\": \"Equinix\",\n      \"jumboFrameCapable\": true,\n      \"macSecCapable\": false\n    }\n  ]\n}",
    },
  },
  {
    id: "tech20",
    domain: "cloud-technology-and-services",
    text: "Which AWS service allows developers to create, publish, and manage APIs at scale, including handling authorization, throttling, and monitoring?",
    options: [
      { id: "a", text: "Amazon API Gateway" },
      { id: "b", text: "AWS AppSync" },
      { id: "c", text: "Amazon Route 53" },
      { id: "d", text: "AWS Lambda" },
    ],
    correctOptionIds: ["a"],
    explanation: "Amazon API Gateway lets you create, publish, and manage APIs, including authorization, throttling, and monitoring.",
    optionRationale: {
      a: "API Gateway lets you create, publish, and manage APIs, including authorization, throttling, and monitoring.",
      b: "AppSync focuses specifically on managed GraphQL APIs, a narrower case than general API management.",
      c: "Route 53 is a DNS service, not an API management platform.",
      d: "Lambda can run the backend code behind an API, but it doesn't provide API publishing or throttling itself.",
    },
    referenceUrl: "https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html",
    referenceLabel: "What Is Amazon API Gateway?",
    consoleUrl: "https://console.aws.amazon.com/apigateway/main/apis",
    consoleLabel: "API Gateway > APIs",
    diagram: `flowchart LR
  Client[Client App] --> APIGW[Amazon API Gateway]
  APIGW --> Lambda[AWS Lambda Function]
  Lambda --> DB[(Database)]`,
    cliExample: {
      description: "List your REST APIs",
      command: "aws apigateway get-rest-apis",
      sampleOutput: "{\n  \"items\": [\n    {\n      \"id\": \"a1b2c3d4e5\",\n      \"name\": \"orders-api\",\n      \"description\": \"Public orders API\",\n      \"createdDate\": \"2026-02-14T09:00:00+00:00\",\n      \"apiKeySource\": \"HEADER\",\n      \"endpointConfiguration\": {\n        \"types\": [\n          \"REGIONAL\"\n        ]\n      },\n      \"disableExecuteApiEndpoint\": false\n    }\n  ]\n}",
    },
  },
  {
    id: "tech21",
    domain: "cloud-technology-and-services",
    text: "Which AWS service provides detailed monitoring through metrics, logs, and alarms for AWS resources and applications?",
    options: [
      { id: "a", text: "AWS CloudTrail" },
      { id: "b", text: "Amazon CloudWatch" },
      { id: "c", text: "AWS Config" },
      { id: "d", text: "AWS X-Ray" },
    ],
    correctOptionIds: ["b"],
    explanation: "Amazon CloudWatch collects metrics and logs and lets you set alarms to monitor AWS resources and applications.",
    optionRationale: {
      a: "CloudTrail logs API activity for auditing, rather than general metrics, logs, and alarms.",
      b: "CloudWatch collects metrics and logs and lets you configure alarms across AWS resources and applications.",
      c: "AWS Config tracks resource configuration changes and compliance, not general performance monitoring.",
      d: "X-Ray traces requests through distributed applications for debugging, a narrower focus than CloudWatch.",
    },
    referenceUrl: "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html",
    referenceLabel: "What Is Amazon CloudWatch?",
    consoleUrl: "https://console.aws.amazon.com/cloudwatch/home#alarmsV2:",
    consoleLabel: "CloudWatch > Alarms",
    diagram: `flowchart TD
  Res[AWS Resources] --> Metrics[CloudWatch Metrics]
  Res --> Logs[CloudWatch Logs]
  Metrics --> Alarm[CloudWatch Alarm]
  Alarm --> Notify[Notification]`,
    cliExample: {
      description: "List your CloudWatch alarms",
      command: "aws cloudwatch describe-alarms",
      sampleOutput: "{\n  \"MetricAlarms\": [\n    {\n      \"AlarmName\": \"HighCPU-web\",\n      \"AlarmArn\": \"arn:aws:cloudwatch:us-east-1:123456789012:alarm:HighCPU-web\",\n      \"AlarmDescription\": \"CPU above 80% for 5 minutes\",\n      \"StateValue\": \"OK\",\n      \"StateUpdatedTimestamp\": \"2026-03-15T07:45:12.000Z\",\n      \"MetricName\": \"CPUUtilization\",\n      \"Namespace\": \"AWS/EC2\",\n      \"Statistic\": \"Average\",\n      \"Dimensions\": [\n        {\n          \"Name\": \"InstanceId\",\n          \"Value\": \"i-0abc123def456789a\"\n        }\n      ],\n      \"Period\": 300,\n      \"EvaluationPeriods\": 1,\n      \"Threshold\": 80,\n      \"ComparisonOperator\": \"GreaterThanThreshold\",\n      \"AlarmActions\": [\n        \"arn:aws:sns:us-east-1:123456789012:ops-alerts\"\n      ]\n    }\n  ],\n  \"CompositeAlarms\": []\n}",
    },
  },
  {
    id: "tech22",
    domain: "cloud-technology-and-services",
    text: "Which service lets you model, provision, and manage AWS resources by treating infrastructure as code using declarative templates?",
    options: [
      { id: "a", text: "AWS CloudFormation" },
      { id: "b", text: "AWS Systems Manager" },
      { id: "c", text: "AWS OpsWorks" },
      { id: "d", text: "AWS Config" },
    ],
    correctOptionIds: ["a"],
    explanation: "AWS CloudFormation provisions and manages AWS resources using declarative infrastructure-as-code templates.",
    optionRationale: {
      a: "CloudFormation provisions and manages AWS resources from declarative infrastructure-as-code templates.",
      b: "Systems Manager focuses on operational visibility and automation, not declarative resource provisioning.",
      c: "OpsWorks manages infrastructure through Chef/Puppet configuration management, a different IaC approach.",
      d: "AWS Config tracks and audits configuration state; it doesn't provision resources from templates.",
    },
    referenceUrl: "https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html",
    referenceLabel: "What Is AWS CloudFormation?",
    consoleUrl: "https://console.aws.amazon.com/cloudformation/home#/stacks",
    consoleLabel: "CloudFormation > Stacks",
    diagram: `flowchart LR
  Template[Declarative Template] --> CFN[AWS CloudFormation]
  CFN --> Stack[Provisioned Stack of Resources]`,
    cliExample: {
      description: "List your CloudFormation stacks",
      command: "aws cloudformation list-stacks",
      sampleOutput: "{\n  \"StackSummaries\": [\n    {\n      \"StackId\": \"arn:aws:cloudformation:us-east-1:123456789012:stack/web-tier/1a2b3c4d-5e6f-7890-abcd-ef1234567890\",\n      \"StackName\": \"web-tier\",\n      \"CreationTime\": \"2026-02-01T12:00:00.000Z\",\n      \"LastUpdatedTime\": \"2026-03-08T09:30:00.000Z\",\n      \"StackStatus\": \"UPDATE_COMPLETE\",\n      \"DriftInformation\": {\n        \"StackDriftStatus\": \"NOT_CHECKED\"\n      }\n    }\n  ]\n}",
    },
  },
  {
    id: "tech23",
    domain: "cloud-technology-and-services",
    text: "Which AWS service gives you visibility into operational data and allows you to automate operational tasks across your AWS resources, such as patch management?",
    options: [
      { id: "a", text: "AWS Systems Manager" },
      { id: "b", text: "Amazon CloudWatch" },
      { id: "c", text: "AWS Config" },
      { id: "d", text: "AWS Trusted Advisor" },
    ],
    correctOptionIds: ["a"],
    explanation: "AWS Systems Manager provides operational visibility and automation, including patch management, across AWS resources.",
    optionRationale: {
      a: "Systems Manager provides operational visibility and automation, including patch management, across resources.",
      b: "CloudWatch focuses on metrics, logs, and alarms, not broad operational automation like patching.",
      c: "AWS Config tracks configuration state and compliance; it doesn't automate operational tasks like patching.",
      d: "Trusted Advisor gives best-practice recommendations but doesn't execute automated operational tasks.",
    },
    referenceUrl: "https://docs.aws.amazon.com/systems-manager/latest/userguide/what-is-systems-manager.html",
    referenceLabel: "What Is AWS Systems Manager?",
    consoleUrl: "https://console.aws.amazon.com/systems-manager/managed-instances",
    consoleLabel: "Systems Manager > Fleet Manager",
    diagram: `flowchart TD
  SSM[AWS Systems Manager] --> Patch[Patch Management]
  SSM --> Inventory[Operational Inventory]
  SSM --> Automation[Automation Runbooks]`,
    cliExample: {
      description: "List instances managed by Systems Manager",
      command: "aws ssm describe-instance-information",
      sampleOutput: "{\n  \"InstanceInformationList\": [\n    {\n      \"InstanceId\": \"i-0abc123def456789a\",\n      \"PingStatus\": \"Online\",\n      \"LastPingDateTime\": \"2026-03-16T08:02:11.000000+00:00\",\n      \"AgentVersion\": \"3.3.1345.0\",\n      \"IsLatestVersion\": true,\n      \"PlatformType\": \"Linux\",\n      \"PlatformName\": \"Amazon Linux\",\n      \"PlatformVersion\": \"2023\",\n      \"ResourceType\": \"EC2Instance\",\n      \"IPAddress\": \"10.0.1.25\",\n      \"ComputerName\": \"ip-10-0-1-25.ec2.internal\"\n    }\n  ]\n}",
    },
  },
  {
    id: "tech24",
    domain: "cloud-technology-and-services",
    text: "Which fully managed message queuing service enables you to decouple and scale microservices, distributed systems, and serverless applications?",
    options: [
      { id: "a", text: "Amazon SNS" },
      { id: "b", text: "Amazon SQS" },
      { id: "c", text: "Amazon EventBridge" },
      { id: "d", text: "AWS Step Functions" },
    ],
    correctOptionIds: ["b"],
    explanation: "Amazon SQS is a fully managed message queuing service used to decouple and scale distributed application components.",
    optionRationale: {
      a: "SNS is a pub/sub service for fanning out notifications, not a point-to-point message queue.",
      b: "SQS is a fully managed message queue that decouples and scales distributed application components.",
      c: "EventBridge routes events between applications based on rules; it's an event bus, not a simple queue.",
      d: "Step Functions orchestrates multi-step workflows; it isn't a message queuing service.",
    },
    referenceUrl: "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html",
    referenceLabel: "What Is Amazon SQS?",
    consoleUrl: "https://console.aws.amazon.com/sqs/v3/home#/queues",
    consoleLabel: "SQS > Queues",
    diagram: `flowchart LR
  Producer[Producer] --> Queue[Amazon SQS Queue]
  Queue --> Consumer[Consumer]`,
    cliExample: {
      description: "List your SQS queues",
      command: "aws sqs list-queues",
      sampleOutput: "{\n  \"QueueUrls\": [\n    \"https://sqs.us-east-1.amazonaws.com/123456789012/order-processing\",\n    \"https://sqs.us-east-1.amazonaws.com/123456789012/order-processing-dlq\"\n  ]\n}",
    },
  },
  {
    id: "tech25",
    domain: "cloud-technology-and-services",
    text: "Which AWS service is a fully managed publish/subscribe messaging service used to fan out notifications to multiple subscribers, such as email, SMS, or Lambda functions?",
    options: [
      { id: "a", text: "Amazon SQS" },
      { id: "b", text: "Amazon SNS" },
      { id: "c", text: "Amazon MQ" },
      { id: "d", text: "AWS Step Functions" },
    ],
    correctOptionIds: ["b"],
    explanation: "Amazon SNS is a publish/subscribe messaging service that fans out notifications to multiple types of subscribers.",
    optionRationale: {
      a: "SQS is a queue meant for one consumer processing messages, not fanning out to many subscriber types.",
      b: "SNS is a pub/sub service that fans out notifications to subscribers like email, SMS, and Lambda.",
      c: "Amazon MQ is a managed broker for existing protocols like JMS/AMQP, a different messaging model.",
      d: "Step Functions orchestrates workflows; it doesn't fan out notifications to subscribers.",
    },
    referenceUrl: "https://docs.aws.amazon.com/sns/latest/dg/welcome.html",
    referenceLabel: "What Is Amazon SNS?",
    consoleUrl: "https://console.aws.amazon.com/sns/v3/home#/topics",
    consoleLabel: "SNS > Topics",
    diagram: `flowchart TD
  Pub[Publisher] --> Topic[Amazon SNS Topic]
  Topic --> Email[Email]
  Topic --> SMS[SMS]
  Topic --> Lambda[Lambda Function]`,
    cliExample: {
      description: "List your SNS topics",
      command: "aws sns list-topics",
      sampleOutput: "{\n  \"Topics\": [\n    {\n      \"TopicArn\": \"arn:aws:sns:us-east-1:123456789012:ops-alerts\"\n    },\n    {\n      \"TopicArn\": \"arn:aws:sns:us-east-1:123456789012:order-events\"\n    }\n  ]\n}",
    },
  },
  {
    id: "tech26",
    domain: "cloud-technology-and-services",
    text: "Which service allows you to coordinate multiple AWS Lambda functions and other AWS services into serverless workflows using visual state machines?",
    options: [
      { id: "a", text: "AWS Step Functions" },
      { id: "b", text: "Amazon EventBridge" },
      { id: "c", text: "Amazon SQS" },
      { id: "d", text: "AWS Batch" },
    ],
    correctOptionIds: ["a"],
    explanation: "AWS Step Functions coordinates multiple AWS services into serverless workflows using visual state machines.",
    optionRationale: {
      a: "Step Functions coordinates Lambda functions and other services into serverless workflows using visual state machines.",
      b: "EventBridge routes events between services based on rules; it doesn't provide a visual state-machine builder.",
      c: "SQS is a message queue, not a workflow orchestrator.",
      d: "AWS Batch runs batch computing jobs; it doesn't coordinate multi-step serverless workflows visually.",
    },
    referenceUrl: "https://docs.aws.amazon.com/step-functions/latest/dg/welcome.html",
    referenceLabel: "What Is AWS Step Functions?",
    consoleUrl: "https://console.aws.amazon.com/states/home#/statemachines",
    consoleLabel: "Step Functions > State machines",
    diagram: `stateDiagram-v2
  [*] --> ValidateInput
  ValidateInput --> ProcessOrder
  ProcessOrder --> SendNotification
  SendNotification --> [*]`,
    cliExample: {
      description: "List your Step Functions state machines",
      command: "aws stepfunctions list-state-machines",
      sampleOutput: "{\n  \"stateMachines\": [\n    {\n      \"stateMachineArn\": \"arn:aws:states:us-east-1:123456789012:stateMachine:OrderFulfillment\",\n      \"name\": \"OrderFulfillment\",\n      \"type\": \"STANDARD\",\n      \"creationDate\": \"2026-02-20T14:10:00.000000+00:00\"\n    }\n  ]\n}",
    },
  },
  {
    id: "tech27",
    domain: "cloud-technology-and-services",
    text: "Which AWS service converts speech to text?",
    options: [
      { id: "a", text: "Amazon Polly" },
      { id: "b", text: "Amazon Transcribe" },
      { id: "c", text: "Amazon Comprehend" },
      { id: "d", text: "Amazon Lex" },
    ],
    correctOptionIds: ["b"],
    explanation: "Amazon Transcribe is an automatic speech recognition service that converts spoken audio into text.",
    optionRationale: {
      a: "Polly converts text to speech — the opposite direction from what's described.",
      b: "Transcribe is AWS's automatic speech recognition service, converting spoken audio into text.",
      c: "Comprehend analyzes existing text for sentiment and entities; it doesn't transcribe audio.",
      d: "Lex builds conversational chatbots and uses speech recognition internally, but it isn't the standalone transcription service.",
    },
    referenceUrl: "https://docs.aws.amazon.com/transcribe/latest/dg/what-is-transcribe.html",
    referenceLabel: "What Is Amazon Transcribe?",
    consoleUrl: "https://console.aws.amazon.com/transcribe/home#jobs",
    consoleLabel: "Amazon Transcribe > Transcription jobs",
    diagram: `flowchart LR
  Audio[Spoken Audio] --> Transcribe[Amazon Transcribe]
  Transcribe --> Text[Text Output]`,
    cliExample: {
      description: "List your transcription jobs",
      command: "aws transcribe list-transcription-jobs",
      sampleOutput: "{\n  \"TranscriptionJobSummaries\": [\n    {\n      \"TranscriptionJobName\": \"support-call-0042\",\n      \"CreationTime\": \"2026-03-12T10:05:00.000000+00:00\",\n      \"StartTime\": \"2026-03-12T10:05:02.000000+00:00\",\n      \"CompletionTime\": \"2026-03-12T10:07:48.000000+00:00\",\n      \"LanguageCode\": \"en-US\",\n      \"TranscriptionJobStatus\": \"COMPLETED\",\n      \"OutputLocationType\": \"SERVICE_BUCKET\"\n    }\n  ]\n}",
    },
  },
  {
    id: "tech28",
    domain: "cloud-technology-and-services",
    text: "Which AWS service provides a fully managed environment for building, training, and deploying machine learning models?",
    options: [
      { id: "a", text: "Amazon SageMaker" },
      { id: "b", text: "Amazon Rekognition" },
      { id: "c", text: "Amazon Comprehend" },
      { id: "d", text: "AWS DeepLens" },
    ],
    correctOptionIds: ["a"],
    explanation: "Amazon SageMaker provides a fully managed environment covering the full machine learning lifecycle.",
    optionRationale: {
      a: "SageMaker provides a fully managed environment covering the full build-train-deploy ML lifecycle.",
      b: "Rekognition analyzes images and video; it's a pre-built AI service, not a general ML development platform.",
      c: "Comprehend performs natural language processing; it's a pre-built AI service, not a general ML platform.",
      d: "DeepLens is an AI-enabled camera device, not a managed ML development environment.",
    },
    referenceUrl: "https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html",
    referenceLabel: "What Is Amazon SageMaker?",
    consoleUrl: "https://console.aws.amazon.com/sagemaker/home#/notebook-instances",
    consoleLabel: "SageMaker > Notebook instances",
    diagram: `flowchart LR
  Data[Training Data] --> SM[Amazon SageMaker]
  SM --> Build[Build]
  SM --> Train[Train]
  SM --> Deploy[Deploy]`,
    cliExample: {
      description: "List your SageMaker notebook instances",
      command: "aws sagemaker list-notebook-instances",
      sampleOutput: "{\n  \"NotebookInstances\": [\n    {\n      \"NotebookInstanceName\": \"ml-experiments\",\n      \"NotebookInstanceArn\": \"arn:aws:sagemaker:us-east-1:123456789012:notebook-instance/ml-experiments\",\n      \"NotebookInstanceStatus\": \"InService\",\n      \"Url\": \"ml-experiments.notebook.us-east-1.sagemaker.aws\",\n      \"InstanceType\": \"ml.t3.medium\",\n      \"CreationTime\": \"2026-03-02T09:00:00.000000+00:00\",\n      \"LastModifiedTime\": \"2026-03-02T09:06:31.000000+00:00\"\n    }\n  ]\n}",
    },
  },
  {
    id: "tech29",
    domain: "cloud-technology-and-services",
    text: "Which service allows you to run interactive SQL queries directly against data stored in Amazon S3 without needing to load it into a database?",
    options: [
      { id: "a", text: "Amazon Athena" },
      { id: "b", text: "Amazon Redshift" },
      { id: "c", text: "Amazon EMR" },
      { id: "d", text: "Amazon Kinesis" },
    ],
    correctOptionIds: ["a"],
    explanation: "Amazon Athena is a serverless query service that runs SQL directly against data stored in Amazon S3.",
    optionRationale: {
      a: "Athena is a serverless query service that runs SQL directly against data already sitting in S3.",
      b: "Redshift requires loading data into its own warehouse first, unlike Athena's direct S3 querying.",
      c: "EMR runs big data frameworks like Hadoop/Spark on managed clusters, a heavier tool than ad hoc SQL on S3.",
      d: "Kinesis is for ingesting streaming data, not running ad hoc SQL queries against data at rest in S3.",
    },
    referenceUrl: "https://docs.aws.amazon.com/athena/latest/ug/what-is.html",
    referenceLabel: "What Is Amazon Athena?",
    consoleUrl: "https://console.aws.amazon.com/athena/home#/query-editor",
    consoleLabel: "Athena > Query editor",
    diagram: `flowchart LR
  S3[Data in Amazon S3] --> Athena[Amazon Athena]
  Athena --> SQL[Interactive SQL Query]`,
    cliExample: {
      description: "List your Athena query executions",
      command: "aws athena list-query-executions",
      sampleOutput: "{\n  \"QueryExecutionIds\": [\n    \"1a2b3c4d-5e6f-7890-abcd-ef1234567890\",\n    \"9f8e7d6c-5b4a-3210-fedc-ba0987654321\"\n  ]\n}",
    },
  },
  {
    id: "tech30",
    domain: "cloud-technology-and-services",
    text: "Which TWO of the following AWS services are primarily used for real-time or near-real-time streaming data ingestion and processing?",
    options: [
      { id: "a", text: "Amazon Kinesis" },
      { id: "b", text: "Amazon MSK (Managed Streaming for Apache Kafka)" },
      { id: "c", text: "Amazon Redshift" },
      { id: "d", text: "Amazon RDS" },
      { id: "e", text: "AWS CloudFormation" },
    ],
    correctOptionIds: ["a", "b"],
    explanation: "Amazon Kinesis and Amazon MSK are both built for ingesting and processing streaming data in real time.",
    optionRationale: {
      a: "Kinesis is purpose-built for real-time streaming data ingestion and processing.",
      b: "MSK is a managed Apache Kafka service, also purpose-built for streaming data.",
      c: "Redshift queries data already loaded into a warehouse; it isn't a streaming ingestion service.",
      d: "RDS is a transactional relational database, not built for streaming ingestion.",
      e: "CloudFormation provisions infrastructure and has nothing to do with streaming data.",
    },
    referenceUrl: "https://docs.aws.amazon.com/streams/latest/dev/introduction.html",
    referenceLabel: "What Is Amazon Kinesis Data Streams?",
    consoleUrl: "https://console.aws.amazon.com/kinesis/home#/streams/list",
    consoleLabel: "Kinesis > Data streams",
    diagram: `flowchart LR
  Source[Streaming Data Source] --> Kinesis[Amazon Kinesis]
  Source --> MSK[Amazon MSK]
  Kinesis --> Consumer[Real-Time Consumer]
  MSK --> Consumer`,
    cliExample: {
      description: "List your Kinesis data streams",
      command: "aws kinesis list-streams",
      sampleOutput: "{\n  \"StreamNames\": [\n    \"clickstream-events\",\n    \"iot-telemetry\"\n  ],\n  \"StreamSummaries\": [\n    {\n      \"StreamName\": \"clickstream-events\",\n      \"StreamARN\": \"arn:aws:kinesis:us-east-1:123456789012:stream/clickstream-events\",\n      \"StreamStatus\": \"ACTIVE\",\n      \"StreamModeDetails\": {\n        \"StreamMode\": \"ON_DEMAND\"\n      },\n      \"StreamCreationTimestamp\": \"2026-02-11T08:00:00+00:00\"\n    }\n  ],\n  \"HasMoreStreams\": false\n}",
    },
  },
  {
    id: "tech31",
    domain: "cloud-technology-and-services",
    text: "Which TWO of the following are container-related AWS services?",
    options: [
      { id: "a", text: "Amazon ECS (Elastic Container Service)" },
      { id: "b", text: "Amazon EKS (Elastic Kubernetes Service)" },
      { id: "c", text: "Amazon Route 53" },
      { id: "d", text: "AWS Direct Connect" },
      { id: "e", text: "Amazon SNS" },
    ],
    correctOptionIds: ["a", "b"],
    explanation: "Amazon ECS and Amazon EKS are AWS's managed container orchestration services.",
    optionRationale: {
      a: "ECS is AWS's native container orchestration service.",
      b: "EKS is AWS's managed Kubernetes service for running containers.",
      c: "Route 53 is a DNS service, unrelated to running containers.",
      d: "Direct Connect is dedicated network connectivity, unrelated to running containers.",
      e: "SNS is a pub/sub messaging service, unrelated to running containers.",
    },
    referenceUrl: "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html",
    referenceLabel: "What Is Amazon ECS?",
    consoleUrl: "https://console.aws.amazon.com/ecs/v2/clusters",
    consoleLabel: "ECS > Clusters",
    diagram: `flowchart TD
  Dev[Container Image] --> ECR[Amazon ECR]
  ECR --> Orchestrator{ECS or EKS}
  Orchestrator --> Fargate[AWS Fargate]
  Orchestrator --> EC2[EC2 Cluster]`,
    cliExample: {
      description: "List your ECS clusters",
      command: "aws ecs list-clusters",
      sampleOutput: "{\n  \"clusterArns\": [\n    \"arn:aws:ecs:us-east-1:123456789012:cluster/prod-cluster\",\n    \"arn:aws:ecs:us-east-1:123456789012:cluster/staging-cluster\"\n  ]\n}",
    },
  },
  {
    id: "tech32",
    domain: "cloud-technology-and-services",
    text: "A company runs a MySQL database on Amazon RDS and wants a MySQL-compatible engine that delivers up to five times the throughput of standard MySQL, replicates six copies of data across three Availability Zones, and scales storage automatically. Which service should they migrate to?",
    options: [
      { id: "a", text: "Amazon DynamoDB" },
      { id: "b", text: "Amazon Aurora" },
      { id: "c", text: "Amazon Redshift" },
      { id: "d", text: "Amazon ElastiCache for Redis" },
    ],
    correctOptionIds: ["b"],
    explanation: "Amazon Aurora is a MySQL- and PostgreSQL-compatible relational database built for the cloud, with storage replicated six ways across three AZs and automatic storage scaling.",
    optionRationale: {
      a: "DynamoDB is a NoSQL key-value/document database; it is not MySQL-compatible.",
      b: "Aurora is MySQL/PostgreSQL-compatible, delivers higher throughput than standard engines, and keeps six copies of data across three AZs.",
      c: "Redshift is a columnar data warehouse for analytics, not a drop-in MySQL-compatible transactional database.",
      d: "ElastiCache for Redis is an in-memory cache, not a durable relational database engine.",
    },
    referenceUrl: "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/CHAP_AuroraOverview.html",
    referenceLabel: "What Is Amazon Aurora?",
    consoleUrl: "https://console.aws.amazon.com/rds/home#databases:",
    consoleLabel: "RDS > Databases",
    diagram: `flowchart LR
  App[Application] --> Aurora[Amazon Aurora Cluster]
  Aurora --> AZ1[AZ 1 - 2 copies]
  Aurora --> AZ2[AZ 2 - 2 copies]
  Aurora --> AZ3[AZ 3 - 2 copies]`,
    cliExample: {
      description: "List your Aurora DB clusters",
      command: "aws rds describe-db-clusters",
      sampleOutput: "{\n  \"DBClusters\": [\n    {\n      \"DBClusterIdentifier\": \"orders-aurora\",\n      \"Engine\": \"aurora-mysql\",\n      \"EngineVersion\": \"8.0.mysql_aurora.3.06.0\",\n      \"Status\": \"available\",\n      \"Endpoint\": \"orders-aurora.cluster-c9akciq32rlq.us-east-1.rds.amazonaws.com\",\n      \"ReaderEndpoint\": \"orders-aurora.cluster-ro-c9akciq32rlq.us-east-1.rds.amazonaws.com\",\n      \"MultiAZ\": true,\n      \"Port\": 3306,\n      \"MasterUsername\": \"admin\",\n      \"DBClusterMembers\": [\n        {\n          \"DBInstanceIdentifier\": \"orders-aurora-instance-1\",\n          \"IsClusterWriter\": true\n        }\n      ],\n      \"StorageEncrypted\": true,\n      \"DBClusterArn\": \"arn:aws:rds:us-east-1:123456789012:cluster:orders-aurora\"\n    }\n  ]\n}",
    },
  },
  {
    id: "tech33",
    domain: "cloud-technology-and-services",
    text: "An application on Amazon RDS must keep running with minimal downtime if the primary database instance or its Availability Zone fails. Which RDS feature directly meets this high-availability requirement?",
    options: [
      { id: "a", text: "Read replicas" },
      { id: "b", text: "Multi-AZ deployment" },
      { id: "c", text: "Automated backups" },
      { id: "d", text: "RDS Performance Insights" },
    ],
    correctOptionIds: ["b"],
    explanation: "An RDS Multi-AZ deployment maintains a synchronous standby in another Availability Zone and fails over to it automatically, which is designed for high availability rather than read scaling.",
    optionRationale: {
      a: "Read replicas use asynchronous replication to scale read traffic; they are not automatic failover targets for high availability.",
      b: "Multi-AZ keeps a synchronous standby replica in another AZ and fails over automatically when the primary or its AZ fails.",
      c: "Automated backups let you restore to a point in time, but restoring takes time and is not an automatic failover mechanism.",
      d: "Performance Insights is a monitoring and tuning tool; it has no effect on availability.",
    },
    referenceUrl: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html",
    referenceLabel: "Multi-AZ Deployments for Amazon RDS",
    consoleUrl: "https://console.aws.amazon.com/rds/home#databases:",
    consoleLabel: "RDS > Databases",
    diagram: `flowchart LR
  App[Application] --> Primary[Primary DB - AZ a]
  Primary -->|synchronous replication| Standby[Standby DB - AZ b]
  Primary -.->|automatic failover| Standby
  Primary -->|asynchronous| RR[Read Replica - read scaling]`,
    cliExample: {
      description: "Convert an RDS instance to a Multi-AZ deployment",
      command: "aws rds modify-db-instance --db-instance-identifier mydb --multi-az --apply-immediately",
      sampleOutput: "{\n  \"DBInstance\": {\n    \"DBInstanceIdentifier\": \"mydb\",\n    \"DBInstanceClass\": \"db.t3.medium\",\n    \"Engine\": \"mysql\",\n    \"DBInstanceStatus\": \"modifying\",\n    \"MasterUsername\": \"admin\",\n    \"Endpoint\": {\n      \"Address\": \"mydb.c9akciq32rlq.us-east-1.rds.amazonaws.com\",\n      \"Port\": 3306\n    },\n    \"AvailabilityZone\": \"us-east-1a\",\n    \"MultiAZ\": false,\n    \"PendingModifiedValues\": {\n      \"MultiAZ\": true\n    },\n    \"DBInstanceArn\": \"arn:aws:rds:us-east-1:123456789012:db:mydb\"\n  }\n}",
    },
  },
  {
    id: "tech34",
    domain: "cloud-technology-and-services",
    text: "A company stores logs in Amazon S3. They want to protect objects from accidental deletion and automatically move objects to a cheaper storage class after 90 days. Which TWO S3 features should they enable?",
    options: [
      { id: "a", text: "S3 Versioning" },
      { id: "b", text: "S3 Lifecycle configuration" },
      { id: "c", text: "S3 Transfer Acceleration" },
      { id: "d", text: "S3 Static website hosting" },
      { id: "e", text: "S3 Requester Pays" },
    ],
    correctOptionIds: ["a", "b"],
    explanation: "Versioning keeps previous versions so deleted or overwritten objects can be recovered, and Lifecycle rules automate transitions to lower-cost storage classes or expiration after a set period.",
    optionRationale: {
      a: "Versioning preserves every version of an object, so an accidental delete only adds a delete marker and the data can be restored.",
      b: "Lifecycle configuration defines rules that transition objects to another storage class (or expire them) after a number of days.",
      c: "Transfer Acceleration speeds up long-distance uploads via edge locations; it does not protect or tier data.",
      d: "Static website hosting serves a bucket's content as a website; unrelated to deletion protection or tiering.",
      e: "Requester Pays shifts data transfer and request costs to the requester; it does not protect or tier data.",
    },
    referenceUrl: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html",
    referenceLabel: "Managing Your Storage Lifecycle",
    consoleUrl: "https://console.aws.amazon.com/s3/buckets",
    consoleLabel: "S3 > Buckets",
    diagram: `flowchart LR
  Upload[Object Uploaded] --> Std[S3 Standard - versioned]
  Std -->|Lifecycle rule: 90 days| IA[S3 Standard-IA]
  IA -->|Lifecycle rule: 1 year| Glacier[S3 Glacier Deep Archive]
  Std -->|accidental delete| Marker[Delete Marker - previous version kept]`,
    cliExample: {
      description: "Enable versioning on an S3 bucket",
      command: "aws s3api put-bucket-versioning --bucket my-logs-bucket --versioning-configuration Status=Enabled",
      sampleOutput: "(no output — the command prints nothing on success and exits with code 0)",
    },
  },
  {
    id: "tech35",
    domain: "cloud-technology-and-services",
    text: "An EC2 instance uses an instance store volume for temporary scratch data. What happens to that data if the instance is stopped or terminated?",
    options: [
      { id: "a", text: "The data is retained and reattached when the instance restarts" },
      { id: "b", text: "The data is lost because instance store is ephemeral storage physically attached to the host" },
      { id: "c", text: "The data is automatically copied to Amazon S3" },
      { id: "d", text: "The data is automatically snapshotted to Amazon EBS" },
    ],
    correctOptionIds: ["b"],
    explanation: "Instance store volumes are ephemeral disks on the physical host; data persists only for the life of the instance and is lost on stop, hibernate, termination, or host failure. Use EBS for data that must persist.",
    optionRationale: {
      a: "Only EBS volumes persist independently of the instance; instance store data does not survive a stop or terminate.",
      b: "Instance store is temporary block storage on the host machine, so its contents are lost when the instance stops or terminates.",
      c: "AWS does not automatically copy instance store contents to S3; you would have to do that yourself.",
      d: "Snapshots are a feature of EBS volumes; instance store volumes cannot be snapshotted.",
    },
    referenceUrl: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/InstanceStorage.html",
    referenceLabel: "Amazon EC2 Instance Store",
    consoleUrl: "https://console.aws.amazon.com/ec2/home#InstanceTypes:",
    consoleLabel: "EC2 > Instance Types",
    diagram: `flowchart TD
  EC2[EC2 Instance] --> IS[Instance Store - ephemeral, on host]
  EC2 --> EBS[EBS Volume - persistent, network-attached]
  IS -->|stop or terminate| Lost[Data Lost]
  EBS -->|stop or terminate| Kept[Data Retained]`,
    cliExample: {
      description: "Show instance types that include instance store volumes",
      command: "aws ec2 describe-instance-types --filters Name=instance-storage-supported,Values=true",
      sampleOutput: "{\n  \"InstanceTypes\": [\n    {\n      \"InstanceType\": \"m5d.large\",\n      \"CurrentGeneration\": true,\n      \"VCpuInfo\": {\n        \"DefaultVCpus\": 2\n      },\n      \"MemoryInfo\": {\n        \"SizeInMiB\": 8192\n      },\n      \"InstanceStorageSupported\": true,\n      \"InstanceStorageInfo\": {\n        \"TotalSizeInGB\": 75,\n        \"Disks\": [\n          {\n            \"SizeInGB\": 75,\n            \"Count\": 1,\n            \"Type\": \"ssd\"\n          }\n        ],\n        \"NvmeSupport\": \"required\"\n      },\n      \"Hypervisor\": \"nitro\"\n    }\n  ]\n}",
    },
  },
  {
    id: "tech36",
    domain: "cloud-technology-and-services",
    text: "A company wants to build an event-driven architecture in which events from AWS services, their own applications, and SaaS partners are matched against rules and routed to targets such as Lambda functions and SQS queues. Which service should they use?",
    options: [
      { id: "a", text: "Amazon EventBridge" },
      { id: "b", text: "Amazon SQS" },
      { id: "c", text: "AWS Step Functions" },
      { id: "d", text: "Amazon Kinesis Data Streams" },
    ],
    correctOptionIds: ["a"],
    explanation: "Amazon EventBridge is a serverless event bus that ingests events from AWS services, custom applications, and SaaS partners, and routes them to targets based on rules.",
    optionRationale: {
      a: "EventBridge is the serverless event bus that matches events against rules and routes them to many AWS targets.",
      b: "SQS is a point-to-point queue; it does not evaluate routing rules or integrate natively with SaaS event sources.",
      c: "Step Functions orchestrates workflows as state machines; it is often an EventBridge target rather than the event router.",
      d: "Kinesis Data Streams ingests high-volume streaming records for consumers; it does not do rule-based event routing.",
    },
    referenceUrl: "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-what-is.html",
    referenceLabel: "What Is Amazon EventBridge?",
    consoleUrl: "https://console.aws.amazon.com/events/home#/rules",
    consoleLabel: "EventBridge > Rules",
    diagram: `flowchart LR
  AWS[AWS Services] --> Bus[EventBridge Event Bus]
  Custom[Custom Apps] --> Bus
  SaaS[SaaS Partners] --> Bus
  Bus -->|rule match| Lambda[Lambda Function]
  Bus -->|rule match| SQS[SQS Queue]`,
    cliExample: {
      description: "List EventBridge rules on the default event bus",
      command: "aws events list-rules",
      sampleOutput: "{\n  \"Rules\": [\n    {\n      \"Name\": \"order-created-to-lambda\",\n      \"Arn\": \"arn:aws:events:us-east-1:123456789012:rule/order-created-to-lambda\",\n      \"EventPattern\": \"{\\\"source\\\":[\\\"com.example.orders\\\"],\\\"detail-type\\\":[\\\"OrderCreated\\\"]}\",\n      \"State\": \"ENABLED\",\n      \"EventBusName\": \"default\"\n    },\n    {\n      \"Name\": \"nightly-report\",\n      \"Arn\": \"arn:aws:events:us-east-1:123456789012:rule/nightly-report\",\n      \"ScheduleExpression\": \"cron(0 2 * * ? *)\",\n      \"State\": \"ENABLED\",\n      \"EventBusName\": \"default\"\n    }\n  ]\n}",
    },
  },
  {
    id: "tech37",
    domain: "cloud-technology-and-services",
    text: "A gaming company runs a non-HTTP, UDP-based multiplayer service behind Network Load Balancers in two Regions. They want static anycast IP addresses and to route users over the AWS global network to the nearest healthy endpoint. Which service best meets this need?",
    options: [
      { id: "a", text: "Amazon CloudFront" },
      { id: "b", text: "AWS Global Accelerator" },
      { id: "c", text: "Amazon Route 53 simple routing" },
      { id: "d", text: "AWS Direct Connect" },
    ],
    correctOptionIds: ["b"],
    explanation: "AWS Global Accelerator provides two static anycast IPs and routes TCP/UDP traffic across the AWS global network to the optimal healthy regional endpoint, whereas CloudFront caches HTTP(S) content at the edge.",
    optionRationale: {
      a: "CloudFront is an HTTP/HTTPS content delivery network with caching; it does not front UDP services or provide static anycast IPs.",
      b: "Global Accelerator gives static anycast IPs and uses the AWS backbone to direct TCP and UDP traffic to the nearest healthy endpoint.",
      c: "Route 53 simple routing returns DNS records without health-aware, network-optimized routing or static IPs.",
      d: "Direct Connect is a private link from on-premises to AWS; it does not serve internet users.",
    },
    referenceUrl: "https://docs.aws.amazon.com/global-accelerator/latest/dg/what-is-global-accelerator.html",
    referenceLabel: "What Is AWS Global Accelerator?",
    consoleUrl: "https://us-west-2.console.aws.amazon.com/globalaccelerator/home#/accelerators",
    consoleLabel: "Global Accelerator > Accelerators",
    diagram: `flowchart LR
  User[Player] --> Edge[Nearest AWS Edge - static anycast IP]
  Edge --> GA[AWS Global Accelerator]
  GA -->|AWS global network| NLB1[NLB - Region A]
  GA -->|AWS global network| NLB2[NLB - Region B]`,
    cliExample: {
      description: "List your Global Accelerator accelerators",
      command: "aws globalaccelerator list-accelerators --region us-west-2",
      sampleOutput: "{\n  \"Accelerators\": [\n    {\n      \"AcceleratorArn\": \"arn:aws:globalaccelerator::123456789012:accelerator/1a2b3c4d-5e6f-7890-abcd-ef1234567890\",\n      \"Name\": \"game-servers\",\n      \"IpAddressType\": \"IPV4\",\n      \"Enabled\": true,\n      \"IpSets\": [\n        {\n          \"IpFamily\": \"IPv4\",\n          \"IpAddresses\": [\n            \"75.2.10.11\",\n            \"99.83.20.22\"\n          ]\n        }\n      ],\n      \"DnsName\": \"a1234567890abcdef.awsglobalaccelerator.com\",\n      \"Status\": \"DEPLOYED\",\n      \"CreatedTime\": \"2026-02-28T11:00:00+00:00\",\n      \"LastModifiedTime\": \"2026-02-28T11:05:00+00:00\"\n    }\n  ]\n}",
    },
  },
  {
    id: "tech38",
    domain: "cloud-technology-and-services",
    text: "EC2 instances in a private subnet need to download operating system patches from the internet, but they must not be reachable from the internet. Which VPC component should be added?",
    options: [
      { id: "a", text: "An internet gateway attached directly to the private subnet's route table" },
      { id: "b", text: "A NAT gateway in a public subnet, with a route from the private subnet to it" },
      { id: "c", text: "A VPC peering connection" },
      { id: "d", text: "A virtual private gateway" },
    ],
    correctOptionIds: ["b"],
    explanation: "A NAT gateway in a public subnet lets instances in private subnets initiate outbound connections to the internet while blocking inbound connections initiated from the internet.",
    optionRationale: {
      a: "Routing a subnet directly to an internet gateway makes it a public subnet, so instances with public IPs become reachable from the internet.",
      b: "A NAT gateway allows outbound-only internet access from private subnets; return traffic is allowed but unsolicited inbound is not.",
      c: "VPC peering connects two VPCs privately; it does not provide internet access.",
      d: "A virtual private gateway is the VPC side of a Site-to-Site VPN or Direct Connect link to on-premises, not an internet path.",
    },
    referenceUrl: "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html",
    referenceLabel: "NAT Gateways",
    consoleUrl: "https://console.aws.amazon.com/vpcconsole/home#NatGateways:",
    consoleLabel: "VPC > NAT gateways",
    diagram: `flowchart LR
  Priv[EC2 in Private Subnet] --> NAT[NAT Gateway in Public Subnet]
  NAT --> IGW[Internet Gateway]
  IGW --> Internet[Internet]
  Internet -.->|inbound blocked| Priv`,
    cliExample: {
      description: "List your NAT gateways",
      command: "aws ec2 describe-nat-gateways",
      sampleOutput: "{\n  \"NatGateways\": [\n    {\n      \"NatGatewayId\": \"nat-0123456789abcdef0\",\n      \"VpcId\": \"vpc-0123456789abcdef0\",\n      \"SubnetId\": \"subnet-0aaa111bbb222ccc3\",\n      \"State\": \"available\",\n      \"ConnectivityType\": \"public\",\n      \"CreateTime\": \"2026-02-05T10:20:00+00:00\",\n      \"NatGatewayAddresses\": [\n        {\n          \"AllocationId\": \"eipalloc-0123456789abcdef0\",\n          \"NetworkInterfaceId\": \"eni-0123456789abcdef0\",\n          \"PrivateIp\": \"10.0.0.45\",\n          \"PublicIp\": \"54.210.12.34\"\n        }\n      ]\n    }\n  ]\n}",
    },
  },
  {
    id: "tech39",
    domain: "cloud-technology-and-services",
    text: "A company wants to automatically detect objects and faces in uploaded photos, and separately extract text and form fields from scanned invoices. Which TWO AI services should they use?",
    options: [
      { id: "a", text: "Amazon Rekognition" },
      { id: "b", text: "Amazon Textract" },
      { id: "c", text: "Amazon Polly" },
      { id: "d", text: "Amazon Translate" },
      { id: "e", text: "Amazon Lex" },
    ],
    correctOptionIds: ["a", "b"],
    explanation: "Amazon Rekognition analyzes images and video for objects, scenes, and faces, while Amazon Textract extracts printed text, handwriting, and structured form/table data from scanned documents.",
    optionRationale: {
      a: "Rekognition performs image and video analysis, including object, scene, and facial detection.",
      b: "Textract goes beyond OCR to extract text, key-value pairs, and tables from scanned documents such as invoices.",
      c: "Polly converts text into lifelike speech; it does not analyze images or documents.",
      d: "Translate performs neural machine translation between languages; it does not read images.",
      e: "Lex builds conversational chatbots and voice interfaces; it does not process photos or scanned documents.",
    },
    referenceUrl: "https://docs.aws.amazon.com/textract/latest/dg/what-is.html",
    referenceLabel: "What Is Amazon Textract?",
    consoleUrl: "https://console.aws.amazon.com/rekognition/home#/label-detection",
    consoleLabel: "Rekognition > Label detection",
    diagram: `flowchart LR
  Photo[Uploaded Photo] --> Rek[Amazon Rekognition]
  Rek --> Labels[Objects, Scenes, Faces]
  Invoice[Scanned Invoice] --> Tex[Amazon Textract]
  Tex --> Fields[Text, Key-Value Pairs, Tables]`,
    cliExample: {
      description: "Detect labels in an image stored in S3 with Rekognition",
      command: "aws rekognition detect-labels --image '{\"S3Object\":{\"Bucket\":\"my-photos\",\"Name\":\"photo.jpg\"}}'",
      sampleOutput: "{\n  \"Labels\": [\n    {\n      \"Name\": \"Person\",\n      \"Confidence\": 99.21,\n      \"Instances\": [\n        {\n          \"BoundingBox\": {\n            \"Width\": 0.31,\n            \"Height\": 0.72,\n            \"Left\": 0.35,\n            \"Top\": 0.14\n          },\n          \"Confidence\": 99.21\n        }\n      ],\n      \"Parents\": []\n    },\n    {\n      \"Name\": \"Dog\",\n      \"Confidence\": 96.87,\n      \"Instances\": [],\n      \"Parents\": [\n        {\n          \"Name\": \"Animal\"\n        },\n        {\n          \"Name\": \"Pet\"\n        }\n      ]\n    }\n  ],\n  \"LabelModelVersion\": \"3.0\"\n}",
    },
  },
  {
    id: "tech40",
    domain: "cloud-technology-and-services",
    text: "A data team needs a serverless service to discover the schema of data in Amazon S3, catalog it, and run extract, transform, and load (ETL) jobs to prepare the data for analytics. Which service should they use?",
    options: [
      { id: "a", text: "AWS Glue" },
      { id: "b", text: "Amazon QuickSight" },
      { id: "c", text: "Amazon Kinesis Data Streams" },
      { id: "d", text: "AWS Batch" },
    ],
    correctOptionIds: ["a"],
    explanation: "AWS Glue is a serverless data integration service with crawlers that populate a Data Catalog and managed ETL jobs to transform and load data for analytics.",
    optionRationale: {
      a: "Glue provides crawlers, a central Data Catalog, and serverless Spark-based ETL jobs.",
      b: "QuickSight is a business intelligence service for dashboards and visualizations; it consumes prepared data rather than performing ETL.",
      c: "Kinesis Data Streams ingests real-time streaming data; it does not catalog schemas or run ETL jobs.",
      d: "AWS Batch schedules generic batch compute jobs on EC2/Fargate; it has no data catalog or built-in ETL tooling.",
    },
    referenceUrl: "https://docs.aws.amazon.com/glue/latest/dg/what-is-glue.html",
    referenceLabel: "What Is AWS Glue?",
    consoleUrl: "https://console.aws.amazon.com/glue/home#/v2/data-catalog/databases",
    consoleLabel: "Glue > Data Catalog > Databases",
    diagram: `flowchart LR
  S3[Raw Data in S3] --> Crawler[Glue Crawler]
  Crawler --> Catalog[Glue Data Catalog]
  Catalog --> ETL[Glue ETL Job]
  ETL --> Clean[Transformed Data in S3]
  Clean --> Athena[Athena / Redshift / QuickSight]`,
    cliExample: {
      description: "List databases in the Glue Data Catalog",
      command: "aws glue get-databases",
      sampleOutput: "{\n  \"DatabaseList\": [\n    {\n      \"Name\": \"sales_raw\",\n      \"Description\": \"Raw CSV exports in S3\",\n      \"LocationUri\": \"s3://my-data-lake/sales_raw/\",\n      \"CreateTime\": \"2026-02-16T09:00:00+00:00\",\n      \"CatalogId\": \"123456789012\"\n    }\n  ]\n}",
    },
  },
  {
    id: "tech41",
    domain: "cloud-technology-and-services",
    text: "A hospital must keep certain workloads on-premises for data residency and low latency, but wants to run them using the same AWS APIs, tools, and services (such as EC2 and EBS) it uses in the cloud. Which service should it use?",
    options: [
      { id: "a", text: "AWS Outposts" },
      { id: "b", text: "AWS Local Zones" },
      { id: "c", text: "AWS Wavelength" },
      { id: "d", text: "AWS Snowball Edge" },
    ],
    correctOptionIds: ["a"],
    explanation: "AWS Outposts delivers AWS-managed racks or servers into a customer's own facility, so native AWS services run on-premises with the same APIs and tools as the Region.",
    optionRationale: {
      a: "Outposts installs AWS hardware in the customer's data center, running EC2, EBS, and other services on-premises with the same AWS APIs.",
      b: "Local Zones are AWS-owned infrastructure placed near large population centers, not inside a customer's own facility.",
      c: "Wavelength embeds AWS compute in telecom providers' 5G networks for ultra-low-latency mobile applications, not on-premises residency.",
      d: "Snowball Edge is a rugged device for edge computing and bulk data transfer, not a long-term extension of the AWS Region on-premises.",
    },
    referenceUrl: "https://docs.aws.amazon.com/outposts/latest/userguide/what-is-outposts.html",
    referenceLabel: "What Is AWS Outposts?",
    consoleUrl: "https://console.aws.amazon.com/outposts/home#OutpostsList",
    consoleLabel: "Outposts > Outposts",
    diagram: `flowchart LR
  Region[AWS Region] -->|same APIs and control plane| OP[AWS Outposts Rack in Hospital Data Center]
  OP --> EC2[EC2 Instances]
  OP --> EBS[EBS Volumes]
  OP --> Local[Low-Latency, Data-Resident Workloads]`,
    cliExample: {
      description: "List your Outposts",
      command: "aws outposts list-outposts",
      sampleOutput: "{\n  \"Outposts\": [\n    {\n      \"OutpostId\": \"op-0abcdef1234567890\",\n      \"OwnerId\": \"123456789012\",\n      \"OutpostArn\": \"arn:aws:outposts:us-east-1:123456789012:outpost/op-0abcdef1234567890\",\n      \"SiteId\": \"os-0123456789abcdef0\",\n      \"Name\": \"hospital-dc-rack-1\",\n      \"LifeCycleStatus\": \"ACTIVE\",\n      \"AvailabilityZone\": \"us-east-1a\",\n      \"SupportedHardwareType\": \"RACK\"\n    }\n  ]\n}",
    },
  },
  {
    id: "tech42",
    domain: "cloud-technology-and-services",
    text: "A development team wants a fully managed CI/CD pipeline on AWS that compiles source code and runs unit tests, then automatically deploys the build to EC2 instances. Which TWO services are used for the build and deployment stages respectively?",
    options: [
      { id: "a", text: "AWS CodeBuild" },
      { id: "b", text: "AWS CodeDeploy" },
      { id: "c", text: "AWS CloudFormation" },
      { id: "d", text: "AWS Config" },
      { id: "e", text: "Amazon Inspector" },
    ],
    correctOptionIds: ["a", "b"],
    explanation: "Within a CodePipeline workflow, AWS CodeBuild compiles code and runs tests, and AWS CodeDeploy automates deployments to EC2, Lambda, ECS, or on-premises servers.",
    optionRationale: {
      a: "CodeBuild is the managed build service that compiles source, runs tests, and produces deployable artifacts.",
      b: "CodeDeploy automates application deployments to EC2 instances, on-premises servers, Lambda, and ECS.",
      c: "CloudFormation provisions infrastructure from templates; it is not the application build or deployment stage.",
      d: "AWS Config records and evaluates resource configurations for compliance; it has no role in CI/CD.",
      e: "Amazon Inspector scans workloads for software vulnerabilities; it does not build or deploy code.",
    },
    referenceUrl: "https://docs.aws.amazon.com/codepipeline/latest/userguide/welcome.html",
    referenceLabel: "What Is AWS CodePipeline?",
    consoleUrl: "https://console.aws.amazon.com/codesuite/codepipeline/pipelines",
    consoleLabel: "CodePipeline > Pipelines",
    diagram: `flowchart LR
  Src[Source Repository] --> Pipe[AWS CodePipeline]
  Pipe --> Build[AWS CodeBuild - compile and test]
  Build --> Deploy[AWS CodeDeploy]
  Deploy --> EC2[EC2 Instances]`,
    cliExample: {
      description: "List your CodePipeline pipelines",
      command: "aws codepipeline list-pipelines",
      sampleOutput: "{\n  \"pipelines\": [\n    {\n      \"name\": \"web-app-pipeline\",\n      \"version\": 3,\n      \"pipelineType\": \"V2\",\n      \"executionMode\": \"QUEUED\",\n      \"created\": \"2026-01-30T10:00:00.000000+00:00\",\n      \"updated\": \"2026-03-11T15:42:00.000000+00:00\"\n    }\n  ]\n}",
    },
  },
  {
    id: "tech43",
    domain: "cloud-technology-and-services",
    text: "A company needs to migrate 80 TB of archived video from an on-premises data center with a slow, unreliable internet connection to Amazon S3 within two weeks. Which approach is most appropriate?",
    options: [
      { id: "a", text: "Upload the data using AWS DataSync over the existing internet connection" },
      { id: "b", text: "Order an AWS Snowball Edge device, load the data locally, and ship it back to AWS" },
      { id: "c", text: "Use AWS Transfer Family to upload the data over SFTP" },
      { id: "d", text: "Enable S3 Transfer Acceleration and upload with the AWS CLI" },
    ],
    correctOptionIds: ["b"],
    explanation: "AWS Snowball Edge is a physical, ruggedized device used to move tens of terabytes to petabytes offline, avoiding limited or unreliable network bandwidth entirely.",
    optionRationale: {
      a: "DataSync accelerates online transfers, but it still depends on the slow, unreliable network link, which is the bottleneck here.",
      b: "Snowball Edge provides an offline bulk transfer: data is copied onto the device on-site and shipped to AWS for import into S3.",
      c: "Transfer Family provides managed SFTP/FTPS/FTP endpoints into S3 or EFS; it is still an online transfer constrained by the network.",
      d: "Transfer Acceleration uses edge locations to speed up S3 uploads over the internet, so it cannot overcome an unreliable local link.",
    },
    referenceUrl: "https://docs.aws.amazon.com/snowball/latest/developer-guide/whatisedge.html",
    referenceLabel: "What Is AWS Snowball Edge?",
    consoleUrl: "https://console.aws.amazon.com/importexport/home#/jobs",
    consoleLabel: "AWS Snow Family > Jobs",
    diagram: `flowchart LR
  DC[On-Premises Data - 80 TB] --> Snow[AWS Snowball Edge Device]
  Snow -->|shipped to AWS| Import[AWS Import Facility]
  Import --> S3[Amazon S3 Bucket]`,
    cliExample: {
      description: "List your Snow Family jobs",
      command: "aws snowball list-jobs",
      sampleOutput: "{\n  \"JobListEntries\": [\n    {\n      \"JobId\": \"JID1a2b3c4d-5e6f-7890-abcd-ef1234567890\",\n      \"JobState\": \"InTransitToAWS\",\n      \"IsMaster\": false,\n      \"JobType\": \"IMPORT\",\n      \"SnowballType\": \"EDGE_S\",\n      \"CreationDate\": \"2026-03-04T09:30:00.000000+00:00\",\n      \"Description\": \"Archived video import - 80 TB\"\n    }\n  ]\n}",
    },
  },
  {
    id: "tech44",
    domain: "cloud-technology-and-services",
    text: "A team runs an in-memory analytics database that needs a very large amount of RAM relative to vCPUs. Which Amazon EC2 instance family is the most appropriate choice?",
    options: [
      { id: "a", text: "Compute optimized (for example, C family)" },
      { id: "b", text: "Memory optimized (for example, R or X family)" },
      { id: "c", text: "Storage optimized (for example, I or D family)" },
      { id: "d", text: "Accelerated computing (for example, P or G family)" },
    ],
    correctOptionIds: ["b"],
    explanation: "Memory optimized instances (R, X, and z families) are designed for workloads that process large datasets in memory, such as in-memory databases and real-time big data analytics.",
    optionRationale: {
      a: "Compute optimized instances have a high vCPU-to-memory ratio, suited to CPU-bound workloads like batch processing and gaming servers.",
      b: "Memory optimized instances provide the largest memory-to-vCPU ratio, ideal for in-memory databases and caches.",
      c: "Storage optimized instances provide high sequential read/write to large local NVMe or HDD storage, for workloads like distributed file systems.",
      d: "Accelerated computing instances use GPUs or FPGAs for machine learning and graphics workloads, not memory-heavy databases.",
    },
    referenceUrl: "https://docs.aws.amazon.com/ec2/latest/instancetypes/instance-types.html",
    referenceLabel: "Amazon EC2 Instance Types",
    consoleUrl: "https://console.aws.amazon.com/ec2/home#InstanceTypes:",
    consoleLabel: "EC2 > Instance Types",
    diagram: `flowchart TD
  Need{Workload Bottleneck?} -->|CPU| C[Compute Optimized - C]
  Need -->|RAM| R[Memory Optimized - R, X]
  Need -->|Local disk IO| I[Storage Optimized - I, D]
  Need -->|GPU| P[Accelerated Computing - P, G]`,
    cliExample: {
      description: "List memory optimized instance types with at least 256 GiB of RAM",
      command: "aws ec2 describe-instance-types --filters Name=memory-info.size-in-mib,Values=262144 --query 'InstanceTypes[].InstanceType'",
      sampleOutput: "[\n  \"r6i.8xlarge\",\n  \"r5.8xlarge\",\n  \"r6g.8xlarge\",\n  \"x2iedn.2xlarge\"\n]",
    },
  },
];
