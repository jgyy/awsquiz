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
    referenceUrl: "https://docs.aws.amazon.com/ebs/latest/userguide/what-is-ebs.html",
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
    referenceUrl: "https://docs.aws.amazon.com/storagegateway/latest/tgw/WhatIsStorageGateway.html",
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
    referenceUrl: "https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/WhatIs.html",
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
    referenceUrl: "https://docs.aws.amazon.com/transcribe/latest/dg/what-is.html",
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
  {
    id: "tech45",
    domain: "cloud-technology-and-services",
    text: "A media company stores millions of user-uploaded images in Amazon S3. Access patterns are unpredictable: some objects are read constantly while others are untouched for months. They want to lower storage costs automatically without any performance impact or retrieval fees. Which S3 storage class should they use?",
    options: [
      { id: "a", text: "S3 Standard" },
      { id: "b", text: "S3 Intelligent-Tiering" },
      { id: "c", text: "S3 One Zone-Infrequent Access" },
      { id: "d", text: "S3 Glacier Deep Archive" },
    ],
    correctOptionIds: ["b"],
    explanation: "S3 Intelligent-Tiering monitors access patterns and automatically moves objects between frequent, infrequent, and archive instant access tiers with no retrieval fees and no operational overhead, making it ideal for data with unknown or changing access patterns.",
    optionRationale: {
      a: "S3 Standard offers high performance but charges the highest storage price with no automatic cost optimization for rarely accessed objects.",
      b: "Intelligent-Tiering automatically tiers objects based on observed access with no retrieval charges, which fits unpredictable access patterns.",
      c: "One Zone-IA stores data in a single Availability Zone, has retrieval fees, and is designed for infrequently accessed, easily re-creatable data.",
      d: "Glacier Deep Archive is for long-term archives with retrieval times of up to 12 hours, unsuitable for images that may be read at any moment.",
    },
    referenceUrl: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/intelligent-tiering.html",
    referenceLabel: "Amazon S3 Intelligent-Tiering",
    consoleUrl: "https://console.aws.amazon.com/s3/buckets",
    consoleLabel: "S3 > Buckets",
    diagram: `flowchart LR
  Obj[Uploaded Object] --> IT[S3 Intelligent-Tiering]
  IT -->|accessed often| FA[Frequent Access Tier]
  IT -->|30 days no access| IA[Infrequent Access Tier]
  IT -->|90 days no access| AIA[Archive Instant Access Tier]
  AIA -->|accessed again| FA`,
    cliExample: {
      description: "Upload an object directly into the Intelligent-Tiering storage class",
      command: "aws s3api put-object --bucket media-uploads --key photos/img-1001.jpg --body img-1001.jpg --storage-class INTELLIGENT_TIERING",
      sampleOutput: "{\n  \"ETag\": \"\\\"9b2cf535f27731c974343645a3985328\\\"\",\n  \"ServerSideEncryption\": \"AES256\"\n}",
    },
  },
  {
    id: "tech46",
    domain: "cloud-technology-and-services",
    text: "A legal team stores case archives in S3 Glacier Flexible Retrieval. Occasionally they need a single file within minutes for an urgent court request, but most restores can wait several hours. Which retrieval option should they use for the urgent request?",
    options: [
      { id: "a", text: "Bulk retrieval" },
      { id: "b", text: "Standard retrieval" },
      { id: "c", text: "Expedited retrieval" },
      { id: "d", text: "S3 Select" },
    ],
    correctOptionIds: ["c"],
    explanation: "S3 Glacier Flexible Retrieval offers three retrieval tiers: Expedited (typically 1 to 5 minutes), Standard (3 to 5 hours), and Bulk (5 to 12 hours, lowest cost). Expedited is the right choice when data is needed within minutes.",
    optionRationale: {
      a: "Bulk is the cheapest tier but takes 5 to 12 hours, far too slow for an urgent request.",
      b: "Standard retrieval typically completes in 3 to 5 hours, which does not meet a minutes-level requirement.",
      c: "Expedited retrieval returns archives in about 1 to 5 minutes at a higher per-request price, ideal for occasional urgent access.",
      d: "S3 Select filters the contents of an object with SQL; it is not a Glacier retrieval tier.",
    },
    referenceUrl: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/restoring-objects-retrieval-options.html",
    referenceLabel: "Archive retrieval options",
    consoleUrl: "https://console.aws.amazon.com/s3/buckets",
    consoleLabel: "S3 > Buckets",
    diagram: `flowchart TD
  Req{How fast is the archive needed?} -->|Minutes| Exp[Expedited - 1 to 5 min]
  Req -->|Hours| Std[Standard - 3 to 5 hours]
  Req -->|Overnight and cheapest| Bulk[Bulk - 5 to 12 hours]`,
    cliExample: {
      description: "Initiate an expedited restore of an archived object for 3 days",
      command: "aws s3api restore-object --bucket legal-archive --key cases/2019/case-4471.pdf --restore-request '{\"Days\":3,\"GlacierJobParameters\":{\"Tier\":\"Expedited\"}}'",
      sampleOutput: "{\n  \"RequestCharged\": null\n}",
    },
  },
  {
    id: "tech47",
    domain: "cloud-technology-and-services",
    text: "A company is migrating a Windows-based application to AWS. The application requires a shared file system accessed over the SMB protocol and integrated with its existing Microsoft Active Directory. Which AWS storage service should they choose?",
    options: [
      { id: "a", text: "Amazon EFS" },
      { id: "b", text: "Amazon FSx for Windows File Server" },
      { id: "c", text: "Amazon EBS" },
      { id: "d", text: "Amazon S3" },
    ],
    correctOptionIds: ["b"],
    explanation: "Amazon FSx for Windows File Server provides fully managed, native Windows file shares built on Windows Server, supporting SMB, NTFS, and Active Directory integration.",
    optionRationale: {
      a: "EFS is an NFS-based file system designed for Linux workloads; it does not natively support SMB or Windows ACLs.",
      b: "FSx for Windows File Server delivers SMB file shares with Active Directory integration, matching Windows application requirements.",
      c: "EBS is block storage attached to a single instance (or limited multi-attach), not a shared network file system.",
      d: "S3 is object storage accessed via APIs, not a file system that Windows applications can mount over SMB.",
    },
    referenceUrl: "https://docs.aws.amazon.com/fsx/latest/WindowsGuide/what-is.html",
    referenceLabel: "What is FSx for Windows File Server?",
    consoleUrl: "https://console.aws.amazon.com/fsx/home#file-systems",
    consoleLabel: "FSx > File systems",
    diagram: `flowchart LR
  AD[Microsoft Active Directory] --> FSx[Amazon FSx for Windows File Server]
  Win1[Windows EC2 Instance] -->|SMB| FSx
  Win2[Windows EC2 Instance] -->|SMB| FSx
  OnPrem[On-Premises Clients] -->|SMB over VPN| FSx`,
    cliExample: {
      description: "List FSx file systems in the account",
      command: "aws fsx describe-file-systems --query 'FileSystems[].{Id:FileSystemId,Type:FileSystemType,GiB:StorageCapacity,State:Lifecycle}'",
      sampleOutput: "[\n  {\n    \"Id\": \"fs-0a1b2c3d4e5f67890\",\n    \"Type\": \"WINDOWS\",\n    \"GiB\": 1024,\n    \"State\": \"AVAILABLE\"\n  }\n]",
    },
  },
  {
    id: "tech48",
    domain: "cloud-technology-and-services",
    text: "A reporting application runs heavy read-only queries against a production Amazon RDS for PostgreSQL database, slowing down the main transactional workload. Which RDS feature should be used to offload the read traffic?",
    options: [
      { id: "a", text: "RDS Multi-AZ deployment" },
      { id: "b", text: "RDS read replicas" },
      { id: "c", text: "Automated backups" },
      { id: "d", text: "RDS Proxy" },
    ],
    correctOptionIds: ["b"],
    explanation: "Read replicas use asynchronous replication to create one or more read-only copies of the database that applications can query directly, scaling out read-heavy workloads such as reporting.",
    optionRationale: {
      a: "Multi-AZ provides a synchronous standby for high availability; the standby does not serve read traffic (except in Multi-AZ DB cluster deployments).",
      b: "Read replicas are designed specifically to scale read capacity by routing read queries to replica endpoints.",
      c: "Automated backups enable point-in-time recovery; they do not add query capacity.",
      d: "RDS Proxy pools and shares database connections; it improves connection efficiency but does not add read capacity.",
    },
    referenceUrl: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html",
    referenceLabel: "Working with DB instance read replicas",
    consoleUrl: "https://console.aws.amazon.com/rds/home#databases:",
    consoleLabel: "RDS > Databases",
    diagram: `flowchart LR
  App[Transactional App] -->|writes and reads| Primary[(RDS Primary)]
  Primary -->|async replication| RR1[(Read Replica 1)]
  Primary -->|async replication| RR2[(Read Replica 2)]
  Rpt[Reporting App] -->|read-only queries| RR1
  Rpt --> RR2`,
    cliExample: {
      description: "Create a read replica of a production PostgreSQL instance",
      command: "aws rds create-db-instance-read-replica --db-instance-identifier prod-pg-replica-1 --source-db-instance-identifier prod-pg",
      sampleOutput: "{\n  \"DBInstance\": {\n    \"DBInstanceIdentifier\": \"prod-pg-replica-1\",\n    \"DBInstanceClass\": \"db.r6g.large\",\n    \"Engine\": \"postgres\",\n    \"DBInstanceStatus\": \"creating\",\n    \"ReadReplicaSourceDBInstanceIdentifier\": \"prod-pg\",\n    \"MultiAZ\": false\n  }\n}",
    },
  },
  {
    id: "tech49",
    domain: "cloud-technology-and-services",
    text: "A startup is building two new services: a social network feature that must efficiently query relationships between millions of users (friends-of-friends), and a product catalog that currently runs on MongoDB and should move to a managed service with minimal code changes. Which TWO purpose-built AWS databases should they use?",
    options: [
      { id: "a", text: "Amazon Neptune" },
      { id: "b", text: "Amazon DocumentDB (with MongoDB compatibility)" },
      { id: "c", text: "Amazon Redshift" },
      { id: "d", text: "Amazon Timestream" },
      { id: "e", text: "Amazon Keyspaces (for Apache Cassandra)" },
    ],
    correctOptionIds: ["a", "b"],
    explanation: "Amazon Neptune is a managed graph database optimized for highly connected data such as social graphs, and Amazon DocumentDB is a managed document database compatible with MongoDB APIs and drivers.",
    optionRationale: {
      a: "Neptune supports Gremlin, openCypher, and SPARQL for traversing relationships, which is exactly the social graph use case.",
      b: "DocumentDB is MongoDB-compatible, so existing MongoDB application code can be pointed at it with minimal change.",
      c: "Redshift is a data warehouse for analytical SQL over large datasets, not a graph or document store.",
      d: "Timestream is a time series database for IoT and operational metrics, not for relationship queries or MongoDB workloads.",
      e: "Keyspaces is compatible with Apache Cassandra (wide-column), not MongoDB, and is not a graph database.",
    },
    referenceUrl: "https://aws.amazon.com/products/databases/",
    referenceLabel: "AWS Cloud Databases",
    consoleUrl: "https://console.aws.amazon.com/neptune/home#databases",
    consoleLabel: "Neptune > Databases",
    diagram: `flowchart TD
  Data{Data model?} -->|Highly connected nodes and edges| Nep[Amazon Neptune - Graph]
  Data -->|JSON documents, MongoDB API| Doc[Amazon DocumentDB]
  Data -->|Time-stamped measurements| TS[Amazon Timestream]
  Data -->|Cassandra wide-column| KS[Amazon Keyspaces]`,
    cliExample: {
      description: "List Neptune DB clusters in the account",
      command: "aws neptune describe-db-clusters --query 'DBClusters[].{Id:DBClusterIdentifier,Engine:Engine,Status:Status}'",
      sampleOutput: "[\n  {\n    \"Id\": \"social-graph-cluster\",\n    \"Engine\": \"neptune\",\n    \"Status\": \"available\"\n  }\n]",
    },
  },
  {
    id: "tech50",
    domain: "cloud-technology-and-services",
    text: "A company runs applications that communicate through an on-premises Apache ActiveMQ broker using standard protocols such as AMQP and MQTT. They want to move to AWS without rewriting the messaging code. Which service should they use?",
    options: [
      { id: "a", text: "Amazon SQS" },
      { id: "b", text: "Amazon SNS" },
      { id: "c", text: "Amazon MQ" },
      { id: "d", text: "Amazon EventBridge" },
    ],
    correctOptionIds: ["c"],
    explanation: "Amazon MQ is a managed message broker service for Apache ActiveMQ and RabbitMQ that supports industry-standard APIs and protocols (JMS, AMQP, MQTT, STOMP, OpenWire), so existing applications can migrate without code changes.",
    optionRationale: {
      a: "SQS is a proprietary AWS queue API; migrating to it would require rewriting the messaging layer.",
      b: "SNS is a pub/sub notification service with its own API, not a drop-in replacement for ActiveMQ.",
      c: "Amazon MQ provides managed ActiveMQ and RabbitMQ brokers with standard protocols, minimizing migration effort.",
      d: "EventBridge is an event bus for routing events between AWS services and SaaS apps; it does not speak AMQP or MQTT broker protocols.",
    },
    referenceUrl: "https://docs.aws.amazon.com/amazon-mq/latest/developer-guide/welcome.html",
    referenceLabel: "What is Amazon MQ?",
    consoleUrl: "https://console.aws.amazon.com/amazon-mq/home#/brokers",
    consoleLabel: "Amazon MQ > Brokers",
    diagram: `flowchart LR
  Prod[Producer App - JMS or AMQP] --> MQ[Amazon MQ - ActiveMQ Broker]
  MQ --> Cons1[Consumer App]
  MQ --> Cons2[Consumer App]
  OnPrem[On-Prem ActiveMQ] -.->|migrate, same protocols| MQ`,
    cliExample: {
      description: "List Amazon MQ brokers",
      command: "aws mq list-brokers",
      sampleOutput: "{\n  \"BrokerSummaries\": [\n    {\n      \"BrokerArn\": \"arn:aws:mq:us-east-1:123456789012:broker:orders-broker:b-1a2b3c4d\",\n      \"BrokerId\": \"b-1a2b3c4d\",\n      \"BrokerName\": \"orders-broker\",\n      \"BrokerState\": \"RUNNING\",\n      \"DeploymentMode\": \"ACTIVE_STANDBY_MULTI_AZ\",\n      \"EngineType\": \"ActiveMQ\",\n      \"HostInstanceType\": \"mq.m5.large\"\n    }\n  ]\n}",
    },
  },
  {
    id: "tech51",
    domain: "cloud-technology-and-services",
    text: "A platform team already runs Kubernetes on-premises and wants to move its containerized workloads to AWS while keeping its existing Kubernetes manifests, tooling, and kubectl workflows. Which AWS service should they use?",
    options: [
      { id: "a", text: "Amazon Elastic Container Service (ECS)" },
      { id: "b", text: "Amazon Elastic Kubernetes Service (EKS)" },
      { id: "c", text: "AWS Elastic Beanstalk" },
      { id: "d", text: "Amazon Lightsail" },
    ],
    correctOptionIds: ["b"],
    explanation: "Amazon EKS is a managed, upstream-conformant Kubernetes service, so teams can reuse their existing Kubernetes manifests, Helm charts, and kubectl tooling. ECS is the AWS-native orchestrator with its own task definition model.",
    optionRationale: {
      a: "ECS is a simpler AWS-opinionated orchestrator that does not run Kubernetes manifests or kubectl.",
      b: "EKS runs certified Kubernetes control planes, providing full compatibility with existing Kubernetes workloads.",
      c: "Elastic Beanstalk deploys applications with managed infrastructure; it is not a Kubernetes platform.",
      d: "Lightsail offers simple VPS and container hosting for small projects, not managed Kubernetes.",
    },
    referenceUrl: "https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html",
    referenceLabel: "What is Amazon EKS?",
    consoleUrl: "https://console.aws.amazon.com/eks/home#/clusters",
    consoleLabel: "EKS > Clusters",
    diagram: `flowchart TD
  Q{Need Kubernetes API compatibility?} -->|Yes - existing manifests, kubectl| EKS[Amazon EKS]
  Q -->|No - prefer AWS-native simplicity| ECS[Amazon ECS]
  EKS --> Launch{Compute?}
  ECS --> Launch
  Launch -->|Manage nodes| EC2[EC2]
  Launch -->|Serverless| FG[AWS Fargate]`,
    cliExample: {
      description: "List EKS clusters in the Region",
      command: "aws eks list-clusters",
      sampleOutput: "{\n  \"clusters\": [\n    \"platform-prod\",\n    \"platform-staging\"\n  ]\n}",
    },
  },
  {
    id: "tech52",
    domain: "cloud-technology-and-services",
    text: "A development team builds Docker images in its CI pipeline and needs a private, fully managed registry on AWS to store them so that ECS and EKS can pull the images securely. Which service should they use?",
    options: [
      { id: "a", text: "Amazon S3" },
      { id: "b", text: "AWS CodeArtifact" },
      { id: "c", text: "Amazon Elastic Container Registry (ECR)" },
      { id: "d", text: "AWS CodeCommit" },
    ],
    correctOptionIds: ["c"],
    explanation: "Amazon ECR is a fully managed OCI-compliant container image registry integrated with IAM, ECS, EKS, and Lambda, and it can scan images for vulnerabilities.",
    optionRationale: {
      a: "S3 stores objects but is not a Docker registry; ECS and EKS cannot pull images from it with docker pull.",
      b: "CodeArtifact is a repository for software packages such as npm, Maven, and PyPI, not container images.",
      c: "ECR stores, manages, and serves container images with IAM-based access control and image scanning.",
      d: "CodeCommit is a managed Git source control service for code, not a container image registry.",
    },
    referenceUrl: "https://docs.aws.amazon.com/AmazonECR/latest/userguide/what-is-ecr.html",
    referenceLabel: "What is Amazon ECR?",
    consoleUrl: "https://console.aws.amazon.com/ecr/repositories",
    consoleLabel: "ECR > Repositories",
    diagram: `flowchart LR
  CI[CI Pipeline - docker build] -->|docker push| ECR[Amazon ECR Repository]
  ECR -->|image scan| Scan[Vulnerability Findings]
  ECR -->|docker pull| ECS[Amazon ECS]
  ECR -->|docker pull| EKS[Amazon EKS]`,
    cliExample: {
      description: "List ECR repositories in the account",
      command: "aws ecr describe-repositories --query 'repositories[].{Name:repositoryName,Uri:repositoryUri}'",
      sampleOutput: "[\n  {\n    \"Name\": \"web-api\",\n    \"Uri\": \"123456789012.dkr.ecr.us-east-1.amazonaws.com/web-api\"\n  },\n  {\n    \"Name\": \"worker\",\n    \"Uri\": \"123456789012.dkr.ecr.us-east-1.amazonaws.com/worker\"\n  }\n]",
    },
  },
  {
    id: "tech53",
    domain: "cloud-technology-and-services",
    text: "A small business owner with limited cloud experience wants to launch a WordPress website with a predictable low monthly price that bundles a virtual server, storage, and data transfer. Which AWS service is the best fit?",
    options: [
      { id: "a", text: "Amazon EC2 with an Auto Scaling group" },
      { id: "b", text: "Amazon Lightsail" },
      { id: "c", text: "AWS Lambda" },
      { id: "d", text: "Amazon EKS" },
    ],
    correctOptionIds: ["b"],
    explanation: "Amazon Lightsail provides pre-configured virtual private servers, databases, and container services with simple bundled monthly pricing, designed for users who want an easy on-ramp to AWS.",
    optionRationale: {
      a: "EC2 with Auto Scaling is powerful but requires configuring networking, security groups, and scaling policies, and pricing is usage-based rather than a fixed bundle.",
      b: "Lightsail offers one-click WordPress blueprints with a fixed monthly price that includes compute, SSD storage, and a data transfer allowance.",
      c: "Lambda runs event-driven functions and is not a straightforward way to host a full WordPress site.",
      d: "EKS is managed Kubernetes, far more complex than needed for a simple website.",
    },
    referenceUrl: "https://docs.aws.amazon.com/lightsail/latest/userguide/what-is-amazon-lightsail.html",
    referenceLabel: "What is Amazon Lightsail?",
    consoleUrl: "https://lightsail.aws.amazon.com/ls/webapp/home/instances",
    consoleLabel: "Lightsail > Instances",
    diagram: `flowchart LR
  User[Small Business Owner] --> LS[Amazon Lightsail]
  LS --> BP[WordPress Blueprint]
  BP --> Bundle[Fixed Monthly Bundle - vCPU, RAM, SSD, transfer]
  Bundle --> Site[Live Website with Static IP]`,
    cliExample: {
      description: "List available Lightsail instance bundles and their monthly price",
      command: "aws lightsail get-bundles --query 'bundles[?supportedPlatforms[0]==`LINUX_UNIX`].{Id:bundleId,USD:price,RAM:ramSizeInGb}' --output json",
      sampleOutput: "[\n  {\n    \"Id\": \"nano_3_0\",\n    \"USD\": 5.0,\n    \"RAM\": 0.5\n  },\n  {\n    \"Id\": \"micro_3_0\",\n    \"USD\": 7.0,\n    \"RAM\": 1.0\n  },\n  {\n    \"Id\": \"small_3_0\",\n    \"USD\": 12.0,\n    \"RAM\": 2.0\n  }\n]",
    },
  },
  {
    id: "tech54",
    domain: "cloud-technology-and-services",
    text: "A research group needs to run hundreds of thousands of independent genomics processing jobs each night. They want AWS to queue the jobs, dynamically provision the optimal amount of compute (including Spot capacity), and shut it down when the work is finished. Which service should they use?",
    options: [
      { id: "a", text: "AWS Batch" },
      { id: "b", text: "AWS Step Functions" },
      { id: "c", text: "Amazon SQS" },
      { id: "d", text: "AWS Elastic Beanstalk" },
    ],
    correctOptionIds: ["a"],
    explanation: "AWS Batch plans, schedules, and runs batch computing jobs at any scale, automatically provisioning EC2, Spot, or Fargate compute based on the volume and resource requirements of the submitted jobs.",
    optionRationale: {
      a: "Batch is purpose-built for large-scale batch workloads with managed job queues and dynamic compute environments.",
      b: "Step Functions orchestrates workflows across services but does not itself provision compute for batch jobs.",
      c: "SQS queues messages; it does not schedule jobs or provision compute to process them.",
      d: "Elastic Beanstalk deploys long-running web applications, not scheduled batch job fleets.",
    },
    referenceUrl: "https://docs.aws.amazon.com/batch/latest/userguide/what-is-batch.html",
    referenceLabel: "What is AWS Batch?",
    consoleUrl: "https://console.aws.amazon.com/batch/home#jobs",
    consoleLabel: "AWS Batch > Jobs",
    diagram: `flowchart LR
  Submit[Submit Jobs] --> Queue[AWS Batch Job Queue]
  Queue --> CE[Compute Environment]
  CE -->|scales up| Spot[EC2 Spot and On-Demand Instances]
  Spot --> Done[Results to S3]
  Done -->|queue empty| Down[Scale to zero]`,
    cliExample: {
      description: "Submit a job to an AWS Batch job queue",
      command: "aws batch submit-job --job-name genome-sample-8812 --job-queue genomics-queue --job-definition genome-align:4",
      sampleOutput: "{\n  \"jobArn\": \"arn:aws:batch:us-east-1:123456789012:job/6a1c2b3d-4e5f-6789-abcd-0123456789ab\",\n  \"jobName\": \"genome-sample-8812\",\n  \"jobId\": \"6a1c2b3d-4e5f-6789-abcd-0123456789ab\"\n}",
    },
  },
  {
    id: "tech55",
    domain: "cloud-technology-and-services",
    text: "A company hosts identical copies of its web application in the us-east-1 and eu-west-1 Regions. It wants Amazon Route 53 to direct each user to the Region that provides the lowest network latency for them. Which routing policy should be configured?",
    options: [
      { id: "a", text: "Simple routing" },
      { id: "b", text: "Weighted routing" },
      { id: "c", text: "Latency-based routing" },
      { id: "d", text: "Failover routing" },
    ],
    correctOptionIds: ["c"],
    explanation: "Latency-based routing responds to DNS queries with the resource in the AWS Region that has the lowest measured latency to the user, improving performance for globally distributed applications.",
    optionRationale: {
      a: "Simple routing returns a single resource (or random selection of values) without considering user location or latency.",
      b: "Weighted routing splits traffic by configured percentages, useful for A/B tests or gradual migrations, not latency optimization.",
      c: "Latency-based routing uses AWS latency measurements to route each user to the best-performing Region.",
      d: "Failover routing sends traffic to a primary resource and switches to a secondary only when health checks fail.",
    },
    referenceUrl: "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy.html",
    referenceLabel: "Choosing a routing policy",
    consoleUrl: "https://console.aws.amazon.com/route53/v2/hostedzones",
    consoleLabel: "Route 53 > Hosted zones",
    diagram: `flowchart TD
  U1[User in New York] --> R53[Route 53 - Latency Policy]
  U2[User in Paris] --> R53
  R53 -->|lowest latency| USE1[ALB in us-east-1]
  R53 -->|lowest latency| EUW1[ALB in eu-west-1]`,
    cliExample: {
      description: "List record sets in a hosted zone showing their routing configuration",
      command: "aws route53 list-resource-record-sets --hosted-zone-id Z0123456789ABCDEFGHIJ --query 'ResourceRecordSets[?Type==`A`].{Name:Name,Region:Region,SetId:SetIdentifier}'",
      sampleOutput: "[\n  {\n    \"Name\": \"app.example.com.\",\n    \"Region\": \"us-east-1\",\n    \"SetId\": \"us-east-1-alb\"\n  },\n  {\n    \"Name\": \"app.example.com.\",\n    \"Region\": \"eu-west-1\",\n    \"SetId\": \"eu-west-1-alb\"\n  }\n]",
    },
  },
  {
    id: "tech56",
    domain: "cloud-technology-and-services",
    text: "A company has grown to 40 VPCs across several AWS accounts plus an on-premises data center. Managing a full mesh of VPC peering connections has become unmanageable. Which service provides a central hub to connect all VPCs and the on-premises network through a single gateway?",
    options: [
      { id: "a", text: "VPC peering" },
      { id: "b", text: "AWS Transit Gateway" },
      { id: "c", text: "Internet gateway" },
      { id: "d", text: "AWS PrivateLink" },
    ],
    correctOptionIds: ["b"],
    explanation: "AWS Transit Gateway acts as a regional network hub that connects thousands of VPCs, VPNs, and Direct Connect gateways in a hub-and-spoke model, replacing complex peering meshes. VPC peering is one-to-one and non-transitive.",
    optionRationale: {
      a: "VPC peering is a one-to-one connection that is not transitive, so 40 VPCs would require hundreds of peering connections.",
      b: "Transit Gateway centralizes connectivity: each VPC and VPN attaches once and routing is managed in one place.",
      c: "An internet gateway provides public internet access to a VPC; it does not connect VPCs to each other privately.",
      d: "PrivateLink exposes specific services privately via interface endpoints; it is not a general network-to-network connectivity hub.",
    },
    referenceUrl: "https://docs.aws.amazon.com/vpc/latest/tgw/what-is-transit-gateway.html",
    referenceLabel: "What is a transit gateway?",
    consoleUrl: "https://console.aws.amazon.com/vpcconsole/home#TransitGateways:",
    consoleLabel: "VPC > Transit gateways",
    diagram: `flowchart TD
  TGW((AWS Transit Gateway))
  VPC1[VPC A - Account 1] --- TGW
  VPC2[VPC B - Account 2] --- TGW
  VPC3[VPC C - Account 3] --- TGW
  VPN[Site-to-Site VPN or Direct Connect] --- TGW
  DC[On-Premises Data Center] --- VPN`,
    cliExample: {
      description: "List transit gateway attachments and their resource types",
      command: "aws ec2 describe-transit-gateway-attachments --query 'TransitGatewayAttachments[].{Id:TransitGatewayAttachmentId,Type:ResourceType,State:State}'",
      sampleOutput: "[\n  {\n    \"Id\": \"tgw-attach-0a1b2c3d4e5f67890\",\n    \"Type\": \"vpc\",\n    \"State\": \"available\"\n  },\n  {\n    \"Id\": \"tgw-attach-0f9e8d7c6b5a43210\",\n    \"Type\": \"vpn\",\n    \"State\": \"available\"\n  }\n]",
    },
  },
  {
    id: "tech57",
    domain: "cloud-technology-and-services",
    text: "A company needs to connect its on-premises office network to its Amazon VPC within a few days. The connection must be encrypted, and the company is willing to use its existing internet connection. Which option meets these requirements at the lowest cost?",
    options: [
      { id: "a", text: "AWS Direct Connect" },
      { id: "b", text: "AWS Site-to-Site VPN" },
      { id: "c", text: "VPC peering" },
      { id: "d", text: "Amazon CloudFront" },
    ],
    correctOptionIds: ["b"],
    explanation: "AWS Site-to-Site VPN creates encrypted IPsec tunnels over the public internet between a customer gateway and a virtual private gateway or transit gateway. It can be set up in hours, unlike Direct Connect which takes weeks to provision and is not encrypted by default.",
    optionRationale: {
      a: "Direct Connect provides a dedicated private line with consistent performance, but provisioning takes weeks and it is more expensive; traffic is not encrypted unless combined with VPN or MACsec.",
      b: "Site-to-Site VPN is quick to configure, encrypted with IPsec, and uses the existing internet link at low hourly cost.",
      c: "VPC peering connects two VPCs together; it cannot connect an on-premises network.",
      d: "CloudFront is a CDN for delivering content to end users, not a private network connection for corporate offices.",
    },
    referenceUrl: "https://docs.aws.amazon.com/vpn/latest/s2svpn/VPC_VPN.html",
    referenceLabel: "What is AWS Site-to-Site VPN?",
    consoleUrl: "https://console.aws.amazon.com/vpcconsole/home#VpnConnections:",
    consoleLabel: "VPC > Site-to-Site VPN connections",
    diagram: `flowchart LR
  Office[On-Premises Office] --> CGW[Customer Gateway Device]
  CGW ==>|IPsec tunnel over internet| VGW[Virtual Private Gateway]
  VGW --> VPC[Amazon VPC - Private Subnets]`,
    cliExample: {
      description: "List Site-to-Site VPN connections and their state",
      command: "aws ec2 describe-vpn-connections --query 'VpnConnections[].{Id:VpnConnectionId,State:State,Type:Type}'",
      sampleOutput: "[\n  {\n    \"Id\": \"vpn-0a1b2c3d4e5f67890\",\n    \"State\": \"available\",\n    \"Type\": \"ipsec.1\"\n  }\n]",
    },
  },
  {
    id: "tech58",
    domain: "cloud-technology-and-services",
    text: "An architect is choosing between an Application Load Balancer (ALB) and a Network Load Balancer (NLB) for two different workloads. Which TWO statements correctly describe when to use each?",
    options: [
      { id: "a", text: "Use an ALB to route HTTP requests to different target groups based on URL path or host header" },
      { id: "b", text: "Use an NLB for ultra-low latency TCP/UDP traffic that requires a static IP address per Availability Zone" },
      { id: "c", text: "Use an NLB to inspect HTTP headers and perform path-based routing" },
      { id: "d", text: "Use an ALB to load balance raw TCP traffic at Layer 4 with millions of requests per second" },
      { id: "e", text: "Use an ALB to route traffic across Regions using anycast IP addresses" },
    ],
    correctOptionIds: ["a", "b"],
    explanation: "An ALB operates at Layer 7 and supports content-based routing (path, host, headers) for HTTP/HTTPS. An NLB operates at Layer 4, handles TCP/UDP/TLS at very high throughput and low latency, and provides a static IP per AZ.",
    optionRationale: {
      a: "Path-based and host-based routing are core Layer 7 features of the Application Load Balancer.",
      b: "The Network Load Balancer is built for Layer 4 traffic with extreme performance and supports static and Elastic IP addresses.",
      c: "An NLB does not inspect HTTP content; header and path routing require an ALB.",
      d: "An ALB is a Layer 7 HTTP/HTTPS load balancer; raw TCP at Layer 4 is the job of an NLB.",
      e: "Elastic Load Balancers are regional; cross-Region anycast routing is provided by AWS Global Accelerator.",
    },
    referenceUrl: "https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/what-is-load-balancing.html",
    referenceLabel: "What is Elastic Load Balancing?",
    consoleUrl: "https://console.aws.amazon.com/ec2/home#LoadBalancers:",
    consoleLabel: "EC2 > Load Balancers",
    diagram: `flowchart TD
  T{Traffic type?} -->|HTTP or HTTPS, content routing| ALB[Application Load Balancer - Layer 7]
  T -->|TCP, UDP, TLS, static IP| NLB[Network Load Balancer - Layer 4]
  ALB -->|/api| TG1[API Target Group]
  ALB -->|/images| TG2[Static Target Group]
  NLB --> TG3[Game Server Targets]`,
    cliExample: {
      description: "List load balancers with their type and scheme",
      command: "aws elbv2 describe-load-balancers --query 'LoadBalancers[].{Name:LoadBalancerName,Type:Type,Scheme:Scheme}'",
      sampleOutput: "[\n  {\n    \"Name\": \"web-alb\",\n    \"Type\": \"application\",\n    \"Scheme\": \"internet-facing\"\n  },\n  {\n    \"Name\": \"game-nlb\",\n    \"Type\": \"network\",\n    \"Scheme\": \"internet-facing\"\n  }\n]",
    },
  },
  {
    id: "tech59",
    domain: "cloud-technology-and-services",
    text: "A data engineering team wants to run existing Apache Spark and Hadoop jobs over petabytes of data stored in Amazon S3, using a managed cluster that can be resized or terminated when jobs finish. Which service should they use?",
    options: [
      { id: "a", text: "Amazon EMR" },
      { id: "b", text: "Amazon Athena" },
      { id: "c", text: "Amazon QuickSight" },
      { id: "d", text: "AWS Glue DataBrew" },
    ],
    correctOptionIds: ["a"],
    explanation: "Amazon EMR is a managed big data platform for running open-source frameworks such as Apache Spark, Hadoop, Hive, and Presto on resizable clusters of EC2 instances, EKS, or serverless.",
    optionRationale: {
      a: "EMR provides managed clusters purpose-built for Spark and Hadoop workloads with easy scaling and termination.",
      b: "Athena runs serverless SQL queries over S3 but does not execute custom Spark or Hadoop jobs on a cluster you control.",
      c: "QuickSight is a business intelligence and visualization service, not a data processing framework.",
      d: "Glue DataBrew is a visual, no-code data preparation tool; it does not run existing Spark or Hadoop code.",
    },
    referenceUrl: "https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-what-is-emr.html",
    referenceLabel: "What is Amazon EMR?",
    consoleUrl: "https://console.aws.amazon.com/emr/home#/clusters",
    consoleLabel: "EMR > Clusters",
    diagram: `flowchart LR
  S3in[(Amazon S3 - Raw Data)] --> EMR[Amazon EMR Cluster]
  EMR --> Spark[Apache Spark Jobs]
  EMR --> Hadoop[Hadoop MapReduce Jobs]
  Spark --> S3out[(Amazon S3 - Results)]
  Hadoop --> S3out
  EMR -.->|auto-terminate when idle| Off[Cluster Terminated]`,
    cliExample: {
      description: "List active EMR clusters",
      command: "aws emr list-clusters --active --query 'Clusters[].{Id:Id,Name:Name,State:Status.State}'",
      sampleOutput: "[\n  {\n    \"Id\": \"j-2AXXXXXXGAPLF\",\n    \"Name\": \"nightly-spark-etl\",\n    \"State\": \"RUNNING\"\n  }\n]",
    },
  },
  {
    id: "tech60",
    domain: "cloud-technology-and-services",
    text: "A finance team wants to build interactive dashboards with charts and KPIs from data in Amazon Redshift and Amazon S3, and share them with business users through a web browser without managing any servers. Which AWS service should they use?",
    options: [
      { id: "a", text: "Amazon QuickSight" },
      { id: "b", text: "Amazon CloudWatch Dashboards" },
      { id: "c", text: "AWS Glue" },
      { id: "d", text: "Amazon Kinesis Data Analytics" },
    ],
    correctOptionIds: ["a"],
    explanation: "Amazon QuickSight is a serverless business intelligence (BI) service that connects to sources such as Redshift, S3, Athena, and RDS to build interactive dashboards with pay-per-session pricing.",
    optionRationale: {
      a: "QuickSight is the AWS BI service for business dashboards, visualizations, and ML-powered insights.",
      b: "CloudWatch Dashboards visualize operational metrics of AWS resources, not business data in Redshift or S3.",
      c: "Glue is a serverless ETL and data catalog service; it prepares data but does not provide dashboards.",
      d: "Kinesis Data Analytics (now Managed Service for Apache Flink) processes streaming data in real time; it is not a BI tool.",
    },
    referenceUrl: "https://docs.aws.amazon.com/quicksight/latest/user/welcome.html",
    referenceLabel: "What is Amazon QuickSight?",
    consoleUrl: "https://quicksight.aws.amazon.com/",
    consoleLabel: "Amazon QuickSight",
    diagram: `flowchart LR
  RS[(Amazon Redshift)] --> QS[Amazon QuickSight]
  S3[(Amazon S3 via Athena)] --> QS
  QS --> Dash[Interactive Dashboards]
  Dash --> Users[Business Users - Browser and Mobile]`,
    cliExample: {
      description: "List QuickSight dashboards in the account",
      command: "aws quicksight list-dashboards --aws-account-id 123456789012",
      sampleOutput: "{\n  \"Status\": 200,\n  \"DashboardSummaryList\": [\n    {\n      \"Arn\": \"arn:aws:quicksight:us-east-1:123456789012:dashboard/rev-kpis\",\n      \"DashboardId\": \"rev-kpis\",\n      \"Name\": \"Revenue KPIs\",\n      \"PublishedVersionNumber\": 4,\n      \"LastPublishedTime\": \"2026-03-02T08:15:00+00:00\"\n    }\n  ]\n}",
    },
  },
  {
    id: "tech61",
    domain: "cloud-technology-and-services",
    text: "A retail company wants to add a conversational chatbot to its website that understands customer questions typed in natural language, and it also wants to convert order-status text into natural-sounding speech for its phone system. Which TWO AWS services should they use?",
    options: [
      { id: "a", text: "Amazon Lex" },
      { id: "b", text: "Amazon Polly" },
      { id: "c", text: "Amazon Transcribe" },
      { id: "d", text: "Amazon Rekognition" },
      { id: "e", text: "Amazon Translate" },
    ],
    correctOptionIds: ["a", "b"],
    explanation: "Amazon Lex provides the automatic speech recognition and natural language understanding to build chatbots (the same technology behind Alexa), and Amazon Polly converts text into lifelike speech.",
    optionRationale: {
      a: "Lex builds conversational interfaces that understand user intent from text or voice input.",
      b: "Polly is the text-to-speech service that generates natural-sounding audio from text.",
      c: "Transcribe converts speech to text, the opposite direction of what the phone system needs.",
      d: "Rekognition analyzes images and video; it has no role in chat or speech.",
      e: "Translate converts text between languages; it does not build chatbots or synthesize speech.",
    },
    referenceUrl: "https://docs.aws.amazon.com/lexv2/latest/dg/what-is.html",
    referenceLabel: "What is Amazon Lex V2?",
    consoleUrl: "https://console.aws.amazon.com/lexv2/home#bots",
    consoleLabel: "Amazon Lex > Bots",
    diagram: `flowchart LR
  Cust[Customer Question - text] --> Lex[Amazon Lex - intent and slots]
  Lex --> Lambda[Lambda Fulfillment - order lookup]
  Lambda --> Text[Order Status Text]
  Text --> Polly[Amazon Polly - text to speech]
  Polly --> Phone[Phone System Audio]`,
    cliExample: {
      description: "Synthesize speech from text with Polly and save it as an MP3 file",
      command: "aws polly synthesize-speech --output-format mp3 --voice-id Joanna --text \"Your order 4471 has shipped and will arrive tomorrow.\" status.mp3",
      sampleOutput: "{\n  \"ContentType\": \"audio/mpeg\",\n  \"RequestCharacters\": \"52\"\n}",
    },
  },
  {
    id: "tech62",
    domain: "cloud-technology-and-services",
    text: "A company wants to build a generative AI application that summarizes customer support tickets. They want API access to a choice of foundation models from multiple providers without training their own model or managing any infrastructure. Which AWS service should they use?",
    options: [
      { id: "a", text: "Amazon SageMaker" },
      { id: "b", text: "Amazon Bedrock" },
      { id: "c", text: "Amazon Comprehend" },
      { id: "d", text: "Amazon Kendra" },
    ],
    correctOptionIds: ["b"],
    explanation: "Amazon Bedrock is a fully managed service that offers high-performing foundation models from Amazon and leading AI companies through a single API, along with capabilities such as knowledge bases, agents, and guardrails, without provisioning infrastructure.",
    optionRationale: {
      a: "SageMaker is for building, training, and deploying your own ML models; it involves more infrastructure and ML expertise than needed here.",
      b: "Bedrock provides serverless API access to foundation models for text generation and summarization tasks.",
      c: "Comprehend performs NLP tasks such as sentiment and entity detection with pre-trained models, but it is not a generative foundation model service.",
      d: "Kendra is an intelligent enterprise search service, not a generative AI model provider.",
    },
    referenceUrl: "https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html",
    referenceLabel: "What is Amazon Bedrock?",
    consoleUrl: "https://console.aws.amazon.com/bedrock/home#/overview",
    consoleLabel: "Amazon Bedrock > Overview",
    diagram: `flowchart LR
  Ticket[Support Ticket Text] --> App[Company Application]
  App -->|InvokeModel API| BR[Amazon Bedrock]
  BR --> FM1[Anthropic Claude]
  BR --> FM2[Amazon Nova]
  BR --> FM3[Meta Llama]
  BR --> Summary[Generated Summary]`,
    cliExample: {
      description: "List foundation models available in Bedrock that support text output",
      command: "aws bedrock list-foundation-models --by-output-modality TEXT --query 'modelSummaries[].{Id:modelId,Provider:providerName}' | head -20",
      sampleOutput: "[\n  {\n    \"Id\": \"anthropic.claude-3-5-sonnet-20241022-v2:0\",\n    \"Provider\": \"Anthropic\"\n  },\n  {\n    \"Id\": \"amazon.nova-pro-v1:0\",\n    \"Provider\": \"Amazon\"\n  },\n  {\n    \"Id\": \"meta.llama3-1-70b-instruct-v1:0\",\n    \"Provider\": \"Meta\"\n  }\n]",
    },
  },
  {
    id: "tech63",
    domain: "cloud-technology-and-services",
    text: "A development team wants to define its cloud infrastructure using familiar programming languages such as TypeScript and Python, with loops, conditionals, and reusable classes, instead of writing raw JSON or YAML templates. Which TWO AWS services are involved when they deploy infrastructure this way?",
    options: [
      { id: "a", text: "AWS Cloud Development Kit (CDK)" },
      { id: "b", text: "AWS CloudFormation" },
      { id: "c", text: "AWS Elastic Beanstalk" },
      { id: "d", text: "AWS OpsWorks" },
      { id: "e", text: "AWS CodeCommit" },
    ],
    correctOptionIds: ["a", "b"],
    explanation: "The AWS CDK lets developers define infrastructure in general-purpose programming languages. The CDK synthesizes that code into CloudFormation templates, and CloudFormation provisions the resources.",
    optionRationale: {
      a: "CDK is the framework for modeling infrastructure in TypeScript, Python, Java, C#, and Go.",
      b: "CloudFormation is the provisioning engine; every CDK app is synthesized to a CloudFormation stack and deployed through it.",
      c: "Elastic Beanstalk deploys applications onto managed infrastructure but is not an infrastructure-as-code authoring tool.",
      d: "OpsWorks is a configuration management service for Chef and Puppet, not a code-based infrastructure definition framework.",
      e: "CodeCommit stores source code in Git repositories; it does not define or provision infrastructure.",
    },
    referenceUrl: "https://docs.aws.amazon.com/cdk/v2/guide/home.html",
    referenceLabel: "What is the AWS CDK?",
    consoleUrl: "https://console.aws.amazon.com/cloudformation/home#/stacks",
    consoleLabel: "CloudFormation > Stacks",
    diagram: `flowchart LR
  Code[CDK App - TypeScript or Python] -->|cdk synth| Tpl[CloudFormation Template]
  Tpl -->|cdk deploy| CFN[AWS CloudFormation]
  CFN --> Res[VPC, Lambda, S3, RDS Resources]`,
    cliExample: {
      description: "Synthesize a CDK app into a CloudFormation template and list its stacks",
      command: "cdk synth --quiet && cdk list",
      sampleOutput: "OrdersApiStack\nOrdersDataStack",
    },
  },
  {
    id: "tech64",
    domain: "cloud-technology-and-services",
    text: "A microservices application built on Lambda, API Gateway, and DynamoDB is experiencing intermittent slow responses. Developers want to trace individual requests end to end across all services to identify which component adds the latency. Which AWS service should they use?",
    options: [
      { id: "a", text: "AWS CloudTrail" },
      { id: "b", text: "AWS X-Ray" },
      { id: "c", text: "AWS Config" },
      { id: "d", text: "Amazon Inspector" },
    ],
    correctOptionIds: ["b"],
    explanation: "AWS X-Ray collects trace data as requests travel through distributed applications, producing a service map and per-segment timing that reveal bottlenecks and errors across microservices.",
    optionRationale: {
      a: "CloudTrail records API calls made in the account for auditing; it does not trace application request latency.",
      b: "X-Ray provides distributed tracing with a service map showing latency for each hop in the request path.",
      c: "AWS Config tracks resource configuration changes and compliance, not application performance.",
      d: "Inspector scans for software vulnerabilities and unintended network exposure, not request tracing.",
    },
    referenceUrl: "https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html",
    referenceLabel: "What is AWS X-Ray?",
    consoleUrl: "https://console.aws.amazon.com/cloudwatch/home#xray:service-map",
    consoleLabel: "CloudWatch > X-Ray traces > Service map",
    diagram: `flowchart LR
  Client[Client Request] --> APIGW[API Gateway]
  APIGW --> L1[Lambda - orders]
  L1 --> DDB[(DynamoDB)]
  L1 --> L2[Lambda - pricing]
  APIGW -.->|segments| XR[AWS X-Ray]
  L1 -.->|segments| XR
  L2 -.->|segments| XR
  XR --> Map[Service Map and Trace Timeline]`,
    cliExample: {
      description: "Retrieve trace summaries from the last 10 minutes with response time over 2 seconds",
      command: "aws xray get-trace-summaries --start-time $(date -u -d '10 minutes ago' +%s) --end-time $(date -u +%s) --filter-expression 'responsetime > 2'",
      sampleOutput: "{\n  \"TraceSummaries\": [\n    {\n      \"Id\": \"1-67c5a2f1-3c4d5e6f7a8b9c0d1e2f3a4b\",\n      \"Duration\": 3.412,\n      \"ResponseTime\": 3.398,\n      \"HasFault\": false,\n      \"HasError\": false,\n      \"Http\": {\n        \"HttpURL\": \"https://api.example.com/orders\",\n        \"HttpStatus\": 200,\n        \"HttpMethod\": \"POST\"\n      }\n    }\n  ],\n  \"TracesProcessedCount\": 148,\n  \"ApproximateTime\": \"2026-03-03T10:40:00+00:00\"\n}",
    },
  },
  {
    id: "tech65",
    domain: "cloud-technology-and-services",
    text: "A mobile app team wants a single GraphQL API that lets their app fetch data from DynamoDB and Lambda in one request, receive real-time updates through subscriptions, and support offline data synchronization. Which AWS service should they use?",
    options: [
      { id: "a", text: "Amazon API Gateway (REST API)" },
      { id: "b", text: "AWS AppSync" },
      { id: "c", text: "Amazon SNS" },
      { id: "d", text: "AWS Device Farm" },
    ],
    correctOptionIds: ["b"],
    explanation: "AWS AppSync is a managed GraphQL and Pub/Sub API service that connects to data sources such as DynamoDB, Lambda, and RDS, supports real-time subscriptions over WebSockets, and integrates with Amplify for offline sync.",
    optionRationale: {
      a: "API Gateway builds REST, HTTP, and WebSocket APIs; it does not natively provide GraphQL resolvers or subscriptions.",
      b: "AppSync is the AWS managed GraphQL service with built-in real-time subscriptions and offline capabilities.",
      c: "SNS is a pub/sub notification service, not an API layer for querying application data.",
      d: "Device Farm tests mobile and web apps on real devices; it is not an API service.",
    },
    referenceUrl: "https://docs.aws.amazon.com/appsync/latest/devguide/what-is-appsync.html",
    referenceLabel: "What is AWS AppSync?",
    consoleUrl: "https://console.aws.amazon.com/appsync/home#/apis",
    consoleLabel: "AppSync > APIs",
    diagram: `flowchart LR
  App[Mobile App] -->|GraphQL query, mutation, subscription| AS[AWS AppSync]
  AS -->|resolver| DDB[(DynamoDB)]
  AS -->|resolver| L[Lambda]
  AS -->|WebSocket push| App`,
    cliExample: {
      description: "List AppSync GraphQL APIs in the Region",
      command: "aws appsync list-graphql-apis --query 'graphqlApis[].{Name:name,Id:apiId,Auth:authenticationType}'",
      sampleOutput: "[\n  {\n    \"Name\": \"mobile-orders-api\",\n    \"Id\": \"abcdefghijklmnopqrstuvwxyz\",\n    \"Auth\": \"AMAZON_COGNITO_USER_POOLS\"\n  }\n]",
    },
  },
  {
    id: "tech66",
    domain: "cloud-technology-and-services",
    text: "A manufacturer has thousands of factory sensors that need to securely send telemetry to AWS over MQTT, with rules that route messages to services such as Kinesis, DynamoDB, and Lambda. Which AWS service should the devices connect to?",
    options: [
      { id: "a", text: "AWS IoT Core" },
      { id: "b", text: "Amazon EventBridge" },
      { id: "c", text: "Amazon MQ" },
      { id: "d", text: "AWS Ground Station" },
    ],
    correctOptionIds: ["a"],
    explanation: "AWS IoT Core lets connected devices securely interact with cloud applications over MQTT, HTTPS, and LoRaWAN, using device certificates for authentication and a rules engine to route messages to other AWS services.",
    optionRationale: {
      a: "IoT Core provides the device gateway, message broker, device registry, and rules engine designed for large fleets of sensors.",
      b: "EventBridge routes application and SaaS events; it is not a device-facing MQTT broker with device identity management.",
      c: "Amazon MQ supports MQTT but is a general-purpose broker without device registry, shadows, or fleet-scale device authentication.",
      d: "Ground Station provides satellite communication ground antennas, unrelated to factory sensors.",
    },
    referenceUrl: "https://docs.aws.amazon.com/iot/latest/developerguide/what-is-aws-iot.html",
    referenceLabel: "What is AWS IoT?",
    consoleUrl: "https://console.aws.amazon.com/iot/home#/thinghub",
    consoleLabel: "IoT Core > Things",
    diagram: `flowchart LR
  S1[Sensor 1] -->|MQTT + X.509 cert| Core[AWS IoT Core Message Broker]
  S2[Sensor 2] -->|MQTT + X.509 cert| Core
  Core --> Rules[IoT Rules Engine]
  Rules --> KDS[Kinesis Data Streams]
  Rules --> DDB[(DynamoDB)]
  Rules --> L[Lambda]`,
    cliExample: {
      description: "Retrieve the account-specific IoT Core data endpoint for devices",
      command: "aws iot describe-endpoint --endpoint-type iot:Data-ATS",
      sampleOutput: "{\n  \"endpointAddress\": \"a1b2c3d4e5f6g7-ats.iot.us-east-1.amazonaws.com\"\n}",
    },
  },
];
