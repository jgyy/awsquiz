import { Question } from "../types.js";

export const cloudConceptsQuestions: Question[] = [
  {
    id: "cc1",
    domain: "cloud-concepts",
    text: "Which AWS pricing benefit allows customers to pay only for the compute capacity they actually use, with no upfront commitment?",
    options: [
      { id: "a", text: "Economies of scale" },
      { id: "b", text: "Pay-as-you-go pricing" },
      { id: "c", text: "Reserved capacity guarantee" },
      { id: "d", text: "Fixed monthly billing" },
    ],
    correctOptionIds: ["b"],
    explanation: "Pay-as-you-go pricing means you pay only for what you consume, with no long-term contracts required.",
    optionRationale: {
      a: "Economies of scale explains why AWS's costs (and prices) fall as it grows — it's not the customer's payment model.",
      b: "Pay-as-you-go pricing charges you only for the compute capacity you actually consume, with no upfront commitment.",
      c: "Reserved capacity requires a commitment in exchange for a discount, the opposite of pay-as-you-go.",
      d: "Fixed monthly billing doesn't track actual usage, so it isn't pay-as-you-go pricing.",
    },
    referenceUrl: "https://aws.amazon.com/pricing/",
    referenceLabel: "AWS Pricing Overview",
    diagram:
      "flowchart LR\n    Usage[Track Actual Usage] --> Bill[Pay-as-you-go Bill]\n    NoCommit[No Upfront Commitment] --> Bill\n    Bill --> Stop[Stop Anytime]",
    cliExample: {
      description: "Look up on-demand (pay-as-you-go) pricing for an EC2 instance type",
      command: "aws pricing get-products --service-code AmazonEC2 --region us-east-1 --filters Type=TERM_MATCH,Field=instanceType,Value=t3.micro",
      sampleOutput: "{\n  \"FormatVersion\": \"aws_v1\",\n  \"PriceList\": [\n    \"{\\\"product\\\":{\\\"productFamily\\\":\\\"Compute Instance\\\",\\\"attributes\\\":{\\\"instanceType\\\":\\\"t3.micro\\\",\\\"vcpu\\\":\\\"2\\\",\\\"memory\\\":\\\"1 GiB\\\",\\\"location\\\":\\\"US East (N. Virginia)\\\"}},\\\"terms\\\":{\\\"OnDemand\\\":{\\\"...\\\":{\\\"priceDimensions\\\":{\\\"...\\\":{\\\"unit\\\":\\\"Hrs\\\",\\\"pricePerUnit\\\":{\\\"USD\\\":\\\"0.0104000000\\\"}}}}}}}\"\n  ],\n  \"NextToken\": \"AYABeF0z...\"\n}",
    },
  },
  {
    id: "cc2",
    domain: "cloud-concepts",
    text: "What does 'elasticity' mean in the context of cloud computing?",
    options: [
      { id: "a", text: "The ability to automatically scale resources up or down to match demand" },
      { id: "b", text: "The physical durability of AWS data centers" },
      { id: "c", text: "The ability to run workloads across multiple regions simultaneously" },
      { id: "d", text: "The encryption of data at rest" },
    ],
    correctOptionIds: ["a"],
    explanation: "Elasticity is the ability to grow or shrink infrastructure resources dynamically to meet changing demand.",
    optionRationale: {
      a: "This is the definition of elasticity: resources scale automatically to match demand.",
      b: "Physical durability of data centers is a facilities/resilience concept, not elasticity.",
      c: "Running across multiple regions is about geographic reach, not scaling capacity up or down.",
      d: "Encryption at rest is a data-protection concept, unrelated to scaling.",
    },
    referenceUrl: "https://aws.amazon.com/what-is-cloud-computing/",
    referenceLabel: "What Is Cloud Computing?",
    diagram:
      "flowchart LR\n    Low[Low Demand] --> Scale[Elastic Resources]\n    High[High Demand] --> Scale\n    Scale --> Out[Scale Out Automatically]\n    Scale --> In[Scale In Automatically]",
    cliExample: {
      description: "List Auto Scaling groups, which implement elasticity for EC2 capacity",
      command: "aws autoscaling describe-auto-scaling-groups",
      sampleOutput: "{\n  \"AutoScalingGroups\": [\n    {\n      \"AutoScalingGroupName\": \"web-asg\",\n      \"AutoScalingGroupARN\": \"arn:aws:autoscaling:us-east-1:123456789012:autoScalingGroup:6f9a1b2c-3d4e-5f60-7a8b-9c0d1e2f3a4b:autoScalingGroupName/web-asg\",\n      \"LaunchTemplate\": {\n        \"LaunchTemplateId\": \"lt-0123456789abcdef0\",\n        \"Version\": \"$Latest\"\n      },\n      \"MinSize\": 2,\n      \"MaxSize\": 10,\n      \"DesiredCapacity\": 4,\n      \"AvailabilityZones\": [\n        \"us-east-1a\",\n        \"us-east-1b\"\n      ],\n      \"Instances\": [\n        {\n          \"InstanceId\": \"i-0abc123def456789a\",\n          \"AvailabilityZone\": \"us-east-1a\",\n          \"LifecycleState\": \"InService\",\n          \"HealthStatus\": \"Healthy\"\n        }\n      ],\n      \"CreatedTime\": \"2026-03-02T09:15:30.000Z\"\n    }\n  ]\n}",
    },
  },
  {
    id: "cc3",
    domain: "cloud-concepts",
    text: "A company wants to convert its large upfront hardware purchases into ongoing, usage-based expenses. Which cloud economic benefit does this describe?",
    options: [
      { id: "a", text: "Economies of scale" },
      { id: "b", text: "Trading capital expense for variable expense" },
      { id: "c", text: "Increased speed and agility" },
      { id: "d", text: "Going global in minutes" },
    ],
    correctOptionIds: ["b"],
    explanation: "Cloud computing replaces large upfront capital expenditure with variable operational expense based on actual usage.",
    optionRationale: {
      a: "Economies of scale is about AWS's costs falling as it grows, not about how a customer's spending is structured.",
      b: "This directly describes trading capex for variable opex: large upfront purchases become ongoing usage-based spending.",
      c: "Speed and agility is about how fast resources can be provisioned, not the expense model.",
      d: "Going global in minutes describes geographic reach, not the shift from capex to opex.",
    },
    referenceUrl: "https://aws.amazon.com/economics/",
    referenceLabel: "AWS Cloud Economics",
    diagram:
      "flowchart LR\n    CapEx[Upfront Capital Expense] --> Cloud[Move to AWS Cloud]\n    Cloud --> OpEx[Ongoing Variable Operating Expense]",
    cliExample: {
      description: "View AWS costs by month, reflecting usage-based variable operating expense",
      command: "aws ce get-cost-and-usage --time-period Start=2024-01-01,End=2024-02-01 --granularity MONTHLY --metrics UnblendedCost",
      sampleOutput: "{\n  \"ResultsByTime\": [\n    {\n      \"TimePeriod\": {\n        \"Start\": \"2024-01-01\",\n        \"End\": \"2024-02-01\"\n      },\n      \"Total\": {\n        \"UnblendedCost\": {\n          \"Amount\": \"1284.7312\",\n          \"Unit\": \"USD\"\n        }\n      },\n      \"Groups\": [],\n      \"Estimated\": false\n    }\n  ],\n  \"DimensionValueAttributes\": []\n}",
    },
  },
  {
    id: "cc4",
    domain: "cloud-concepts",
    text: "Which AWS Cloud Adoption Framework (AWS CAF) perspective focuses on aligning IT strategy with business goals?",
    options: [
      { id: "a", text: "Technology" },
      { id: "b", text: "Operations" },
      { id: "c", text: "Business" },
      { id: "d", text: "Security" },
    ],
    correctOptionIds: ["c"],
    explanation: "The Business perspective of AWS CAF focuses on ensuring IT aligns with and enables business strategy and outcomes.",
    optionRationale: {
      a: "The Technology perspective covers architecture and technical delivery, not business-IT alignment.",
      b: "The Operations perspective covers running, monitoring, and managing workloads day to day.",
      c: "The Business perspective ensures IT investments and strategy align with and enable business outcomes.",
      d: "The Security perspective covers risk management and compliance, not business alignment.",
    },
    referenceUrl: "https://docs.aws.amazon.com/whitepapers/latest/overview-aws-cloud-adoption-framework/welcome.html",
    referenceLabel: "AWS Cloud Adoption Framework",
    diagram:
      "flowchart LR\n    Business[Business Perspective] --> Strategy[IT Strategy]\n    Strategy --> Goals[Aligned Business Outcomes]",
  },
  {
    id: "cc5",
    domain: "cloud-concepts",
    text: "What is the primary advantage of AWS's global infrastructure for a company launching an application to customers on multiple continents?",
    options: [
      { id: "a", text: "It eliminates the need for a content delivery network" },
      { id: "b", text: "It allows the company to deploy in new geographic regions in minutes instead of months" },
      { id: "c", text: "It guarantees zero latency worldwide" },
      { id: "d", text: "It removes the need for an internet connection" },
    ],
    correctOptionIds: ["b"],
    explanation: "AWS's global footprint of Regions lets companies deploy infrastructure close to customers worldwide in minutes.",
    optionRationale: {
      a: "Global infrastructure complements a CDN like Amazon CloudFront; it doesn't remove the need for one.",
      b: "AWS's global footprint of Regions lets a company stand up infrastructure near customers worldwide in minutes.",
      c: "No infrastructure can guarantee zero latency; AWS reduces latency but doesn't eliminate it entirely.",
      d: "Cloud applications still require network connectivity; global infrastructure doesn't remove that need.",
    },
    referenceUrl: "https://aws.amazon.com/about-aws/global-infrastructure/",
    referenceLabel: "AWS Global Infrastructure",
    consoleUrl: "https://console.aws.amazon.com/ec2globalview/home",
    consoleLabel: "EC2 Global View",
    diagram:
      "flowchart LR\n    Company[Company] --> Launch[Launch Infrastructure]\n    Launch --> Region[New AWS Region]\n    Region --> Minutes[Live in Minutes]",
    cliExample: {
      description: "List AWS Regions available to deploy infrastructure into",
      command: "aws ec2 describe-regions",
      sampleOutput: "{\n  \"Regions\": [\n    {\n      \"Endpoint\": \"ec2.us-east-1.amazonaws.com\",\n      \"RegionName\": \"us-east-1\",\n      \"OptInStatus\": \"opt-in-not-required\"\n    },\n    {\n      \"Endpoint\": \"ec2.ap-southeast-1.amazonaws.com\",\n      \"RegionName\": \"ap-southeast-1\",\n      \"OptInStatus\": \"opt-in-not-required\"\n    }\n  ]\n}",
    },
  },
  {
    id: "cc6",
    domain: "cloud-concepts",
    text: "An Availability Zone (AZ) consists of one or more discrete data centers with redundant power, networking, and connectivity. What is the main purpose of having multiple AZs within a Region?",
    options: [
      { id: "a", text: "To reduce data transfer costs" },
      { id: "b", text: "To provide high availability and fault tolerance within a Region" },
      { id: "c", text: "To enable multi-factor authentication" },
      { id: "d", text: "To provide a global content delivery network" },
    ],
    correctOptionIds: ["b"],
    explanation: "Spreading resources across multiple, isolated Availability Zones protects applications from a single data center failure.",
    optionRationale: {
      a: "Multiple AZs exist for resilience, not primarily to lower data transfer costs.",
      b: "Spreading resources across isolated AZs protects an application from a single data center or facility failure.",
      c: "Multi-factor authentication is an identity security feature, unrelated to AZ design.",
      d: "A global CDN is provided by edge locations and CloudFront, not by AZs within a Region.",
    },
    referenceUrl: "https://aws.amazon.com/about-aws/global-infrastructure/regions_az/",
    referenceLabel: "AWS Regions and Availability Zones",
    diagram:
      "flowchart TD\n    R[AWS Region] --> AZ1[Availability Zone 1]\n    R --> AZ2[Availability Zone 2]\n    R --> AZ3[Availability Zone 3]\n    AZ1 --> DC1[Data Center]\n    AZ2 --> DC2[Data Center]\n    AZ3 --> DC3[Data Center]",
    cliExample: {
      description: "List the Availability Zones available in a Region",
      command: "aws ec2 describe-availability-zones --region us-east-1",
      sampleOutput: "{\n  \"AvailabilityZones\": [\n    {\n      \"State\": \"available\",\n      \"OptInStatus\": \"opt-in-not-required\",\n      \"RegionName\": \"us-east-1\",\n      \"ZoneName\": \"us-east-1a\",\n      \"ZoneId\": \"use1-az6\",\n      \"ZoneType\": \"availability-zone\",\n      \"NetworkBorderGroup\": \"us-east-1\"\n    },\n    {\n      \"State\": \"available\",\n      \"OptInStatus\": \"opt-in-not-required\",\n      \"RegionName\": \"us-east-1\",\n      \"ZoneName\": \"us-east-1b\",\n      \"ZoneId\": \"use1-az1\",\n      \"ZoneType\": \"availability-zone\",\n      \"NetworkBorderGroup\": \"us-east-1\"\n    }\n  ]\n}",
    },
  },
  {
    id: "cc7",
    domain: "cloud-concepts",
    text: "Which TWO of the following are pillars of the AWS Well-Architected Framework?",
    options: [
      { id: "a", text: "Operational Excellence" },
      { id: "b", text: "Cost Optimization" },
      { id: "c", text: "Marketing Efficiency" },
      { id: "d", text: "Vendor Lock-in Avoidance" },
      { id: "e", text: "Customer Obsession" },
    ],
    correctOptionIds: ["a", "b"],
    explanation: "The six pillars are Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization, and Sustainability.",
    optionRationale: {
      a: "Operational Excellence is one of the six official Well-Architected Framework pillars.",
      b: "Cost Optimization is one of the six official Well-Architected Framework pillars.",
      c: "Marketing Efficiency is not a real Well-Architected pillar.",
      d: "Vendor Lock-in Avoidance is not a named Well-Architected pillar.",
      e: "Customer Obsession is an Amazon leadership principle, not a Well-Architected Framework pillar.",
    },
    referenceUrl: "https://aws.amazon.com/well-architected/",
    referenceLabel: "AWS Well-Architected Framework",
    diagram:
      "flowchart TD\n    WAF[AWS Well-Architected Framework] --> P1[Operational Excellence]\n    WAF --> P2[Security]\n    WAF --> P3[Reliability]\n    WAF --> P4[Performance Efficiency]\n    WAF --> P5[Cost Optimization]\n    WAF --> P6[Sustainability]",
  },
  {
    id: "cc8",
    domain: "cloud-concepts",
    text: "A company is deciding between building its own data center and using AWS. Which factor is a common advantage of AWS over on-premises infrastructure?",
    options: [
      { id: "a", text: "No need to ever patch software" },
      { id: "b", text: "Ability to stop guessing capacity and scale based on actual demand" },
      { id: "c", text: "Guaranteed lower cost regardless of usage" },
      { id: "d", text: "Unlimited free data transfer" },
    ],
    correctOptionIds: ["b"],
    explanation: "Cloud computing removes the need to guess infrastructure capacity in advance; you can scale up or down as actual demand changes.",
    optionRationale: {
      a: "Patching responsibilities still exist under the shared responsibility model; AWS doesn't eliminate all patching.",
      b: "Cloud removes the need to guess capacity ahead of time — you scale to match actual, observed demand.",
      c: "Cost isn't guaranteed to be lower regardless of usage; it depends heavily on how resources are used and managed.",
      d: "Data transfer is a billed dimension in AWS pricing, not unlimited and free.",
    },
    referenceUrl: "https://aws.amazon.com/economics/",
    referenceLabel: "AWS Cloud Economics",
    diagram:
      "flowchart LR\n    Guess[Guess Capacity Upfront] --> Waste[Over- or Under-provisioned]\n    Cloud[AWS Cloud] --> Match[Scale to Match Actual Demand]",
    cliExample: {
      description: "View recent Auto Scaling activity that matches capacity to actual demand",
      command: "aws autoscaling describe-scaling-activities",
      sampleOutput: "{\n  \"Activities\": [\n    {\n      \"ActivityId\": \"9a8b7c6d-5e4f-3a2b-1c0d-9e8f7a6b5c4d\",\n      \"AutoScalingGroupName\": \"web-asg\",\n      \"Description\": \"Launching a new EC2 instance: i-0abc123def456789a\",\n      \"Cause\": \"At 2026-04-11T14:02:10Z a monitor alarm cpu-high in state ALARM triggered policy scale-out changing the desired capacity from 2 to 3.\",\n      \"StartTime\": \"2026-04-11T14:02:12.000Z\",\n      \"EndTime\": \"2026-04-11T14:02:55.000Z\",\n      \"StatusCode\": \"Successful\",\n      \"Progress\": 100\n    }\n  ]\n}",
    },
  },
  {
    id: "cc9",
    domain: "cloud-concepts",
    text: "Which migration strategy (one of the '6 R's') involves moving an application to the cloud with no code changes?",
    options: [
      { id: "a", text: "Refactor" },
      { id: "b", text: "Rehost ('lift and shift')" },
      { id: "c", text: "Replatform" },
      { id: "d", text: "Retire" },
    ],
    correctOptionIds: ["b"],
    explanation: "Rehosting, or 'lift and shift', moves an application to the cloud as-is, without changing its code or architecture.",
    optionRationale: {
      a: "Refactor re-architects the application to take advantage of cloud-native features, the opposite of no changes.",
      b: "Rehost, or 'lift and shift', moves the application to the cloud as-is with no code changes.",
      c: "Replatform makes some targeted optimizations during the move, so it isn't strictly zero changes.",
      d: "Retire means decommissioning an application, not migrating it.",
    },
    referenceUrl: "https://aws.amazon.com/blogs/enterprise-strategy/6-strategies-for-migrating-applications-to-the-cloud/",
    referenceLabel: "6 Strategies for Migrating Applications to the Cloud",
    diagram:
      "flowchart LR\n    Retire --> Retain --> Repurchase --> Rehost --> Replatform --> Refactor",
  },
  {
    id: "cc10",
    domain: "cloud-concepts",
    text: "Which migration strategy involves making minor optimizations to take advantage of cloud capabilities without changing the application's core architecture?",
    options: [
      { id: "a", text: "Rehost" },
      { id: "b", text: "Replatform ('lift and reshape')" },
      { id: "c", text: "Repurchase" },
      { id: "d", text: "Retain" },
    ],
    correctOptionIds: ["b"],
    explanation: "Replatforming makes a few targeted cloud optimizations, such as swapping a self-managed database for a managed one, without a full rearchitecture.",
    optionRationale: {
      a: "Rehost makes no changes at all, so it doesn't involve any cloud optimizations.",
      b: "Replatform, or 'lift and reshape', makes small targeted optimizations without changing the core architecture.",
      c: "Repurchase means switching to a different product entirely, not tuning the existing application.",
      d: "Retain means keeping the application where it currently runs, not migrating and optimizing it.",
    },
    referenceUrl: "https://aws.amazon.com/blogs/enterprise-strategy/6-strategies-for-migrating-applications-to-the-cloud/",
    referenceLabel: "6 Strategies for Migrating Applications to the Cloud",
    diagram:
      "flowchart LR\n    Rehost[Rehost: No Changes] --> Replatform[Replatform: Minor Optimizations]\n    Replatform --> Refactor[Refactor: Re-architect]",
  },
  {
    id: "cc11",
    domain: "cloud-concepts",
    text: "A business decides to stop using a legacy on-premises application and instead subscribe to a SaaS alternative. Which migration strategy does this represent?",
    options: [
      { id: "a", text: "Retire" },
      { id: "b", text: "Repurchase" },
      { id: "c", text: "Rehost" },
      { id: "d", text: "Refactor" },
    ],
    correctOptionIds: ["b"],
    explanation: "Repurchasing means replacing an existing application with a different product, typically a SaaS offering.",
    optionRationale: {
      a: "Retire means shutting the application down without a direct replacement.",
      b: "Repurchase means replacing the existing application with a different product, commonly a SaaS offering.",
      c: "Rehost keeps the same application and simply moves it to the cloud unchanged.",
      d: "Refactor re-architects the existing application rather than replacing it with a different product.",
    },
    referenceUrl: "https://aws.amazon.com/blogs/enterprise-strategy/6-strategies-for-migrating-applications-to-the-cloud/",
    referenceLabel: "6 Strategies for Migrating Applications to the Cloud",
    diagram:
      "flowchart LR\n    Legacy[Legacy On-premises App] --> SaaS[SaaS Alternative]",
  },
  {
    id: "cc12",
    domain: "cloud-concepts",
    text: "Which cloud computing benefit refers to the increased speed and ease with which IT resources can be provisioned, enabling faster experimentation?",
    options: [
      { id: "a", text: "Agility" },
      { id: "b", text: "Elasticity" },
      { id: "c", text: "Durability" },
      { id: "d", text: "Compliance" },
    ],
    correctOptionIds: ["a"],
    explanation: "Agility describes how quickly teams can provision resources, experiment, and iterate compared to traditional infrastructure.",
    optionRationale: {
      a: "Agility is exactly this: the speed and ease of provisioning resources to experiment and iterate quickly.",
      b: "Elasticity is about scaling capacity up or down with demand, not the speed of initial provisioning.",
      c: "Durability describes long-term data resilience, unrelated to provisioning speed.",
      d: "Compliance describes meeting regulatory requirements, unrelated to provisioning speed.",
    },
    referenceUrl: "https://aws.amazon.com/what-is-cloud-computing/",
    referenceLabel: "What Is Cloud Computing?",
    diagram:
      "flowchart LR\n    Idea[New Idea] --> Provision[Provision Resources in Minutes]\n    Provision --> Experiment[Experiment and Iterate Fast]",
  },
  {
    id: "cc13",
    domain: "cloud-concepts",
    text: "What is a key characteristic that differentiates fault tolerance from high availability?",
    options: [
      {
        id: "a",
        text: "Fault-tolerant systems continue operating with zero downtime even if a component fails, while highly available systems minimize but may not eliminate downtime",
      },
      { id: "b", text: "Fault tolerance only applies to storage services" },
      { id: "c", text: "High availability requires multiple AWS accounts" },
      { id: "d", text: "Fault tolerance is only achieved through manual intervention" },
    ],
    correctOptionIds: ["a"],
    explanation: "Fault tolerance masks failures entirely with no downtime, while high availability aims to minimize downtime but may involve a brief interruption.",
    optionRationale: {
      a: "This is the key distinction: fault tolerance masks a failure with zero downtime, while high availability minimizes but doesn't guarantee zero downtime.",
      b: "Fault tolerance is a design principle that applies broadly across services, not only storage.",
      c: "High availability doesn't require multiple AWS accounts; it's typically achieved with redundancy across AZs.",
      d: "Fault tolerance is normally achieved through automatic failover, not manual intervention.",
    },
    referenceUrl: "https://aws.amazon.com/well-architected/",
    referenceLabel: "Reliability Pillar — AWS Well-Architected Framework",
    diagram:
      "flowchart TD\n    Goal[Minimize Downtime] --> HA[High Availability]\n    Goal --> FT[Fault Tolerance]\n    HA --> HA1[Brief interruption possible]\n    FT --> FT1[Zero downtime on component failure]",
    cliExample: {
      description: "List load balancer target groups, used to monitor health and support high availability",
      command: "aws elbv2 describe-target-groups",
      sampleOutput: "{\n  \"TargetGroups\": [\n    {\n      \"TargetGroupArn\": \"arn:aws:elasticloadbalancing:us-east-1:123456789012:targetgroup/web-tg/73e2d6bc24d8a067\",\n      \"TargetGroupName\": \"web-tg\",\n      \"Protocol\": \"HTTP\",\n      \"Port\": 80,\n      \"VpcId\": \"vpc-0123456789abcdef0\",\n      \"HealthCheckProtocol\": \"HTTP\",\n      \"HealthCheckPath\": \"/health\",\n      \"HealthCheckIntervalSeconds\": 30,\n      \"HealthyThresholdCount\": 5,\n      \"UnhealthyThresholdCount\": 2,\n      \"LoadBalancerArns\": [\n        \"arn:aws:elasticloadbalancing:us-east-1:123456789012:loadbalancer/app/web-alb/50dc6c495c0c9188\"\n      ],\n      \"TargetType\": \"instance\"\n    }\n  ]\n}",
    },
  },
  {
    id: "cc14",
    domain: "cloud-concepts",
    text: "Which TWO of the following are perspectives in the AWS Cloud Adoption Framework (AWS CAF)?",
    options: [
      { id: "a", text: "Governance" },
      { id: "b", text: "Platform" },
      { id: "c", text: "Advertising" },
      { id: "d", text: "Sales Enablement" },
      { id: "e", text: "Human Resources" },
    ],
    correctOptionIds: ["a", "b"],
    explanation: "The six CAF perspectives are Business, People, Governance, Platform, Security, and Operations.",
    optionRationale: {
      a: "Governance is one of the six official AWS CAF perspectives.",
      b: "Platform is one of the six official AWS CAF perspectives.",
      c: "Advertising is not one of the AWS CAF perspectives.",
      d: "Sales Enablement is not one of the AWS CAF perspectives.",
      e: "Human Resources is not a CAF perspective; the closest official perspective is People.",
    },
    referenceUrl: "https://docs.aws.amazon.com/whitepapers/latest/overview-aws-cloud-adoption-framework/welcome.html",
    referenceLabel: "AWS Cloud Adoption Framework",
    diagram:
      "flowchart TD\n    CAF[AWS Cloud Adoption Framework] --> Business\n    CAF --> People\n    CAF --> Governance\n    CAF --> Platform\n    CAF --> Security\n    CAF --> Operations",
  },
  {
    id: "cc15",
    domain: "cloud-concepts",
    text: "A startup wants to test a new idea with minimal upfront investment. Which cloud benefit best supports this goal?",
    options: [
      { id: "a", text: "Stop spending money running and maintaining data centers" },
      { id: "b", text: "Guaranteed 100% uptime" },
      { id: "c", text: "Mandatory long-term contracts" },
      { id: "d", text: "Fixed hardware refresh cycles" },
    ],
    correctOptionIds: ["a"],
    explanation: "By not owning data centers, a startup avoids large upfront investments and can redirect resources toward its product.",
    optionRationale: {
      a: "Not owning or maintaining data centers avoids large upfront investment, letting a startup redirect funds to its product.",
      b: "AWS does not guarantee 100% uptime, and this isn't related to minimizing upfront investment.",
      c: "Mandatory long-term contracts would work against a startup's need for low upfront commitment.",
      d: "Fixed hardware refresh cycles describe an on-premises constraint, not a cloud benefit.",
    },
    referenceUrl: "https://aws.amazon.com/economics/",
    referenceLabel: "AWS Cloud Economics",
    diagram:
      "flowchart LR\n    Startup[Startup] --> Avoid[Avoid Data Center Capex]\n    Avoid --> Invest[Redirect Funds to Product]",
  },
  {
    id: "cc16",
    domain: "cloud-concepts",
    text: "What is the relationship between a Region and Availability Zones in AWS?",
    options: [
      { id: "a", text: "A Region contains multiple, isolated Availability Zones" },
      { id: "b", text: "An Availability Zone contains multiple Regions" },
      { id: "c", text: "Regions and Availability Zones are the same thing" },
      { id: "d", text: "Availability Zones exist outside of Regions" },
    ],
    correctOptionIds: ["a"],
    explanation: "Each AWS Region is a separate geographic area made up of multiple isolated Availability Zones.",
    optionRationale: {
      a: "Correct: an AWS Region is a geographic area made up of multiple, isolated Availability Zones.",
      b: "This reverses the actual relationship — a Region contains AZs, not the other way around.",
      c: "Regions and AZs are distinct concepts: a Region is the geographic area, AZs are the isolated locations within it.",
      d: "Every Availability Zone belongs to a specific Region; none exist outside one.",
    },
    referenceUrl: "https://aws.amazon.com/about-aws/global-infrastructure/regions_az/",
    referenceLabel: "AWS Regions and Availability Zones",
    diagram:
      "flowchart TD\n    Region[AWS Region] --> AZ1[Availability Zone A]\n    Region --> AZ2[Availability Zone B]\n    Region --> AZ3[Availability Zone C]",
    cliExample: {
      description: "List the Availability Zones that make up a Region",
      command: "aws ec2 describe-availability-zones --region us-east-1",
      sampleOutput: "{\n  \"AvailabilityZones\": [\n    {\n      \"State\": \"available\",\n      \"OptInStatus\": \"opt-in-not-required\",\n      \"RegionName\": \"us-east-1\",\n      \"ZoneName\": \"us-east-1a\",\n      \"ZoneId\": \"use1-az6\",\n      \"ZoneType\": \"availability-zone\",\n      \"NetworkBorderGroup\": \"us-east-1\"\n    },\n    {\n      \"State\": \"available\",\n      \"OptInStatus\": \"opt-in-not-required\",\n      \"RegionName\": \"us-east-1\",\n      \"ZoneName\": \"us-east-1b\",\n      \"ZoneId\": \"use1-az1\",\n      \"ZoneType\": \"availability-zone\",\n      \"NetworkBorderGroup\": \"us-east-1\"\n    }\n  ]\n}",
    },
  },
  {
    id: "cc17",
    domain: "cloud-concepts",
    text: "Which of the following best describes an AWS edge location?",
    options: [
      { id: "a", text: "A primary data center used exclusively for compute workloads" },
      { id: "b", text: "A site used by Amazon CloudFront and other services to cache content closer to end users" },
      { id: "c", text: "A backup Region used only for disaster recovery" },
      { id: "d", text: "A physical office where AWS support staff work" },
    ],
    correctOptionIds: ["b"],
    explanation: "Edge locations cache content near end users to reduce latency for services like Amazon CloudFront.",
    optionRationale: {
      a: "Edge locations aren't primary compute data centers; they're smaller sites focused on caching content.",
      b: "Edge locations are used by services like Amazon CloudFront to cache content closer to end users, reducing latency.",
      c: "Disaster recovery uses full AWS Regions, not edge locations.",
      d: "Edge locations are technical infrastructure sites, not support offices.",
    },
    referenceUrl: "https://aws.amazon.com/cloudfront/",
    referenceLabel: "Amazon CloudFront",
    consoleUrl: "https://console.aws.amazon.com/cloudfront/v4/home#/distributions",
    consoleLabel: "CloudFront > Distributions",
    diagram:
      "flowchart LR\n    User[End User Request] --> Edge[Edge Location Cache]\n    Edge -->|Cache Hit| User\n    Edge -->|Cache Miss| Origin[Origin Server]",
    cliExample: {
      description: "List CloudFront distributions that use edge locations to cache content",
      command: "aws cloudfront list-distributions",
      sampleOutput: "{\n  \"DistributionList\": {\n    \"Marker\": \"\",\n    \"MaxItems\": 100,\n    \"IsTruncated\": false,\n    \"Quantity\": 1,\n    \"Items\": [\n      {\n        \"Id\": \"E1A2B3C4D5E6F7\",\n        \"ARN\": \"arn:aws:cloudfront::123456789012:distribution/E1A2B3C4D5E6F7\",\n        \"Status\": \"Deployed\",\n        \"LastModifiedTime\": \"2026-02-18T08:41:12.345Z\",\n        \"DomainName\": \"d111111abcdef8.cloudfront.net\",\n        \"Enabled\": true,\n        \"PriceClass\": \"PriceClass_All\",\n        \"HttpVersion\": \"http2and3\"\n      }\n    ]\n  }\n}",
    },
  },
  {
    id: "cc18",
    domain: "cloud-concepts",
    text: "A company currently runs all its workloads on-premises but occasionally bursts to the cloud during peak demand. Which deployment model does this describe?",
    options: [
      { id: "a", text: "All-in cloud" },
      { id: "b", text: "On-premises only" },
      { id: "c", text: "Hybrid" },
      { id: "d", text: "Multi-cloud" },
    ],
    correctOptionIds: ["c"],
    explanation: "A hybrid deployment combines on-premises infrastructure with cloud resources, often used for cloud bursting.",
    optionRationale: {
      a: "All-in cloud means running entirely in the cloud, which contradicts the on-premises baseline described here.",
      b: "On-premises only would mean never using the cloud, which contradicts the described cloud bursting.",
      c: "Combining an on-premises baseline with cloud bursting for peak demand is the definition of a hybrid deployment.",
      d: "Multi-cloud means using multiple cloud providers, not combining on-premises with a single cloud provider.",
    },
    referenceUrl: "https://aws.amazon.com/hybrid/",
    referenceLabel: "Hybrid Cloud with AWS",
    diagram:
      "flowchart LR\n    OnPrem[On-premises Data Center] <--> Link[Network Connection]\n    Link <--> Cloud[AWS Cloud]",
    cliExample: {
      description: "List VPN connections linking on-premises infrastructure to AWS for a hybrid deployment",
      command: "aws ec2 describe-vpn-connections",
      sampleOutput: "{\n  \"VpnConnections\": [\n    {\n      \"VpnConnectionId\": \"vpn-0123456789abcdef0\",\n      \"State\": \"available\",\n      \"Type\": \"ipsec.1\",\n      \"CustomerGatewayId\": \"cgw-0123456789abcdef0\",\n      \"VpnGatewayId\": \"vgw-0123456789abcdef0\",\n      \"Category\": \"VPN\",\n      \"VgwTelemetry\": [\n        {\n          \"OutsideIpAddress\": \"203.0.113.10\",\n          \"Status\": \"UP\",\n          \"LastStatusChange\": \"2026-05-03T02:17:44.000Z\",\n          \"AcceptedRouteCount\": 3\n        },\n        {\n          \"OutsideIpAddress\": \"203.0.113.11\",\n          \"Status\": \"UP\",\n          \"LastStatusChange\": \"2026-05-03T02:17:49.000Z\",\n          \"AcceptedRouteCount\": 3\n        }\n      ]\n    }\n  ]\n}",
    },
  },
  {
    id: "cc19",
    domain: "cloud-concepts",
    text: "Which TWO of the following are benefits commonly associated with cloud computing over traditional on-premises IT?",
    options: [
      { id: "a", text: "Trade capital expense for variable expense" },
      { id: "b", text: "Benefit from massive economies of scale" },
      { id: "c", text: "Guaranteed zero cost" },
      { id: "d", text: "Elimination of the shared responsibility model" },
      { id: "e", text: "No need for any security controls" },
    ],
    correctOptionIds: ["a", "b"],
    explanation: "Cloud computing's core benefits include trading capex for variable opex and benefiting from AWS's economies of scale.",
    optionRationale: {
      a: "Trading capital expense for variable expense is one of the core cloud computing benefits.",
      b: "Benefiting from AWS's massive economies of scale is one of the core cloud computing benefits.",
      c: "Cloud computing is not free; usage is billed based on consumption.",
      d: "The shared responsibility model still applies in the cloud — it isn't eliminated.",
      e: "Security controls are still required; the customer retains responsibility for security 'in' the cloud.",
    },
    referenceUrl: "https://aws.amazon.com/economics/",
    referenceLabel: "AWS Cloud Economics",
    diagram:
      "flowchart LR\n    Cloud[Cloud Computing Benefits] --> CapexOpex[Capex to Variable Opex]\n    Cloud --> Scale[Economies of Scale]",
  },
  {
    id: "cc20",
    domain: "cloud-concepts",
    text: "Which statement best describes 'economies of scale' as an AWS Cloud benefit?",
    options: [
      { id: "a", text: "As AWS grows, higher volumes lead to lower costs, which AWS can pass on as lower pricing to customers" },
      { id: "b", text: "Each customer negotiates a unique lower price directly" },
      { id: "c", text: "Costs decrease only for customers using a single AWS service" },
      { id: "d", text: "Economies of scale apply only to compute services" },
    ],
    correctOptionIds: ["a"],
    explanation: "AWS's massive scale of operation drives down per-unit costs, savings that are passed on to customers through lower prices.",
    optionRationale: {
      a: "This is the definition: AWS's growing scale lowers its costs, and those savings are passed on as lower prices for everyone.",
      b: "Economies of scale come from AWS's aggregate volume, not individual customer negotiations.",
      c: "The benefit isn't limited to single-service customers; it comes from AWS's overall infrastructure scale.",
      d: "Economies of scale apply broadly across AWS services, not only compute.",
    },
    referenceUrl: "https://aws.amazon.com/economics/",
    referenceLabel: "AWS Cloud Economics",
    diagram:
      "flowchart LR\n    Scale[AWS Growing Scale] --> LowerCosts[Lower AWS Costs]\n    LowerCosts --> LowerPrices[Lower Prices for Customers]",
  },
  {
    id: "cc21",
    domain: "cloud-concepts",
    text: "What is the main purpose of the AWS Well-Architected Framework?",
    options: [
      { id: "a", text: "To provide a consistent approach for evaluating and improving cloud architectures against best practices" },
      { id: "b", text: "To replace the AWS Shared Responsibility Model" },
      { id: "c", text: "To calculate exact monthly billing" },
      { id: "d", text: "To manage IAM permissions automatically" },
    ],
    correctOptionIds: ["a"],
    explanation: "The Well-Architected Framework gives a consistent set of questions and best practices for reviewing cloud architectures.",
    optionRationale: {
      a: "The framework provides a consistent set of questions and best practices for reviewing and improving architectures.",
      b: "The Well-Architected Framework complements, not replaces, the Shared Responsibility Model.",
      c: "Exact billing calculations come from tools like the Pricing Calculator and Cost Explorer, not Well-Architected.",
      d: "Well-Architected is a review framework, not an IAM automation tool.",
    },
    referenceUrl: "https://aws.amazon.com/well-architected/",
    referenceLabel: "AWS Well-Architected Framework",
    consoleUrl: "https://console.aws.amazon.com/wellarchitected/home",
    consoleLabel: "AWS Well-Architected Tool",
    diagram:
      "flowchart LR\n    Review[Well-Architected Review] --> BestPractices[Best Practices Checklist]\n    BestPractices --> Improve[Improve Architecture]",
    cliExample: {
      description: "List workloads registered in the AWS Well-Architected Tool",
      command: "aws wellarchitected list-workloads",
      sampleOutput: "{\n  \"WorkloadSummaries\": [\n    {\n      \"WorkloadId\": \"5f2c1a9b8e7d6c5b4a3f2e1d0c9b8a7f\",\n      \"WorkloadArn\": \"arn:aws:wellarchitected:us-east-1:123456789012:workload/5f2c1a9b8e7d6c5b4a3f2e1d0c9b8a7f\",\n      \"WorkloadName\": \"retail-web-platform\",\n      \"Owner\": \"platform-team@example.com\",\n      \"UpdatedAt\": \"2026-06-09T11:30:00.000Z\",\n      \"Lenses\": [\n        \"wellarchitected\"\n      ],\n      \"RiskCounts\": {\n        \"UNANSWERED\": 12,\n        \"HIGH\": 3,\n        \"MEDIUM\": 5,\n        \"NONE\": 26,\n        \"NOT_APPLICABLE\": 0\n      },\n      \"ImprovementStatus\": \"IN_PROGRESS\"\n    }\n  ]\n}",
    },
  },
  {
    id: "cc22",
    domain: "cloud-concepts",
    text: "A company's web application runs on a single EC2 instance in one Availability Zone. During a recent AZ disruption the site was offline for several hours. Which Well-Architected Framework pillar most directly addresses designing the workload to recover from this type of failure?",
    options: [
      { id: "a", text: "Reliability" },
      { id: "b", text: "Performance Efficiency" },
      { id: "c", text: "Cost Optimization" },
      { id: "d", text: "Operational Excellence" },
    ],
    correctOptionIds: ["a"],
    explanation: "The Reliability pillar covers the ability of a workload to perform its intended function correctly and consistently, including recovering from infrastructure or service disruptions by using multiple Availability Zones and automated recovery.",
    optionRationale: {
      a: "Reliability focuses on recovering from failures, scaling to meet demand, and mitigating disruptions such as an AZ outage through redundancy and automatic recovery.",
      b: "Performance Efficiency is about using computing resources efficiently to meet requirements as demand and technology change, not surviving failures.",
      c: "Cost Optimization is about avoiding unnecessary spending, which does not address availability during an outage.",
      d: "Operational Excellence covers running and monitoring systems and improving processes and procedures, not the redundancy design itself.",
    },
    referenceUrl: "https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/welcome.html",
    referenceLabel: "Reliability Pillar — AWS Well-Architected Framework",
    diagram:
      "flowchart LR\n    Single[Single AZ Instance] -->|AZ outage| Down[Site Offline]\n    Multi[Instances in Multiple AZs] -->|AZ outage| Up[Traffic Shifts to Healthy AZ]\n    Multi --> Pillar[Reliability Pillar]",
    cliExample: {
      description: "List lens reviews for a workload in the AWS Well-Architected Tool, which include the Reliability pillar",
      command: "aws wellarchitected list-lens-reviews --workload-id 0123456789abcdef0123456789abcdef",
      sampleOutput: "{\n  \"WorkloadId\": \"5f2c1a9b8e7d6c5b4a3f2e1d0c9b8a7f\",\n  \"LensReviewSummaries\": [\n    {\n      \"LensAlias\": \"wellarchitected\",\n      \"LensArn\": \"arn:aws:wellarchitected::aws:lens/wellarchitected\",\n      \"LensVersion\": \"2024-06-27\",\n      \"LensName\": \"AWS Well-Architected Framework\",\n      \"LensStatus\": \"CURRENT\",\n      \"UpdatedAt\": \"2026-06-09T11:30:00.000Z\",\n      \"RiskCounts\": {\n        \"UNANSWERED\": 12,\n        \"HIGH\": 3,\n        \"MEDIUM\": 5,\n        \"NONE\": 26,\n        \"NOT_APPLICABLE\": 0\n      }\n    }\n  ]\n}",
    },
  },
  {
    id: "cc23",
    domain: "cloud-concepts",
    text: "An organization wants to reduce the environmental impact of its cloud workloads by right-sizing resources and choosing Regions with lower carbon intensity. Which Well-Architected Framework pillar addresses this goal?",
    options: [
      { id: "a", text: "Security" },
      { id: "b", text: "Sustainability" },
      { id: "c", text: "Operational Excellence" },
      { id: "d", text: "Performance Efficiency" },
    ],
    correctOptionIds: ["b"],
    explanation: "The Sustainability pillar, added in 2021, focuses on minimizing the environmental impact of running cloud workloads through efficient resource usage, Region selection, and reducing waste.",
    optionRationale: {
      a: "Security covers protecting data, systems, and assets through identity management, detection, and encryption.",
      b: "Sustainability addresses environmental impact, including right-sizing, maximizing utilization, and selecting Regions near renewable energy sources.",
      c: "Operational Excellence is about running workloads effectively and continually improving procedures, not environmental impact.",
      d: "Performance Efficiency focuses on selecting the right resource types to meet performance requirements; while related, it is not the pillar dedicated to environmental impact.",
    },
    referenceUrl: "https://docs.aws.amazon.com/wellarchitected/latest/sustainability-pillar/sustainability-pillar.html",
    referenceLabel: "Sustainability Pillar — AWS Well-Architected Framework",
    diagram:
      "flowchart LR\n    Goal[Reduce Environmental Impact] --> RightSize[Right-size Resources]\n    Goal --> Region[Choose Low-carbon Regions]\n    Goal --> Utilize[Maximize Utilization]\n    RightSize --> Pillar[Sustainability Pillar]\n    Region --> Pillar\n    Utilize --> Pillar",
    cliExample: {
      description: "Retrieve EC2 right-sizing recommendations from AWS Compute Optimizer to reduce over-provisioned resources",
      command: "aws compute-optimizer get-ec2-instance-recommendations",
      sampleOutput: "{\n  \"instanceRecommendations\": [\n    {\n      \"instanceArn\": \"arn:aws:ec2:us-east-1:123456789012:instance/i-0abc123def456789a\",\n      \"accountId\": \"123456789012\",\n      \"instanceName\": \"batch-worker-1\",\n      \"currentInstanceType\": \"m5.2xlarge\",\n      \"finding\": \"OVER_PROVISIONED\",\n      \"findingReasonCodes\": [\n        \"CPUOverprovisioned\",\n        \"MemoryOverprovisioned\"\n      ],\n      \"recommendationOptions\": [\n        {\n          \"instanceType\": \"m5.large\",\n          \"projectedUtilizationMetrics\": [\n            {\n              \"name\": \"CPU\",\n              \"statistic\": \"MAXIMUM\",\n              \"value\": 38.5\n            }\n          ],\n          \"performanceRisk\": 1.0,\n          \"rank\": 1,\n          \"savingsOpportunity\": {\n            \"savingsOpportunityPercentage\": 75.0,\n            \"estimatedMonthlySavings\": {\n              \"currency\": \"USD\",\n              \"value\": 210.24\n            }\n          }\n        }\n      ],\n      \"lastRefreshTimestamp\": \"2026-07-01T00:12:44.000Z\",\n      \"currentPerformanceRisk\": \"VeryLow\"\n    }\n  ],\n  \"errors\": []\n}",
    },
  },
  {
    id: "cc24",
    domain: "cloud-concepts",
    text: "During migration discovery, a company finds that 15% of its on-premises applications are no longer used by anyone. Which migration strategy should be applied to these applications?",
    options: [
      { id: "a", text: "Retain" },
      { id: "b", text: "Rehost" },
      { id: "c", text: "Retire" },
      { id: "d", text: "Refactor" },
    ],
    correctOptionIds: ["c"],
    explanation: "Retire means decommissioning applications that are no longer needed, which reduces the migration scope and eliminates their ongoing cost.",
    optionRationale: {
      a: "Retain means keeping an application on-premises for now, typically because it is not ready to migrate or has dependencies; unused apps should not be kept.",
      b: "Rehost would move the unused applications to the cloud as-is, wasting effort and money on something nobody uses.",
      c: "Retire is the correct choice: applications that are no longer useful are decommissioned rather than migrated.",
      d: "Refactor re-architects an application for cloud-native benefits, which makes no sense for an application with no users.",
    },
    referenceUrl: "https://docs.aws.amazon.com/prescriptive-guidance/latest/migration-retiring-applications/",
    referenceLabel: "AWS Prescriptive Guidance — Retiring Applications",
    diagram:
      "flowchart TD\n    Discover[Discovery: App Inventory] --> Used{Still in use?}\n    Used -->|Yes| Migrate[Choose Migration Strategy]\n    Used -->|No| Retire[Retire: Decommission]\n    Retire --> Savings[Reduced Scope and Cost]",
    cliExample: {
      description: "List servers discovered by AWS Application Discovery Service to help identify unused applications",
      command: "aws discovery list-configurations --configuration-type SERVER",
      sampleOutput: "{\n  \"configurations\": [\n    {\n      \"server.configurationId\": \"d-server-0123456789abcdef0\",\n      \"server.hostName\": \"legacy-app-01.corp.example.com\",\n      \"server.osName\": \"Windows Server 2012 R2\",\n      \"server.type\": \"VMWARE\",\n      \"server.agentId\": \"o-0123456789abcdef0\",\n      \"server.timeOfCreation\": \"2026-01-20 03:14:07.0\"\n    },\n    {\n      \"server.configurationId\": \"d-server-0fedcba9876543210\",\n      \"server.hostName\": \"legacy-app-02.corp.example.com\",\n      \"server.osName\": \"Linux - Red Hat Enterprise Linux 7.9\",\n      \"server.type\": \"VMWARE\",\n      \"server.agentId\": \"o-0fedcba9876543210\",\n      \"server.timeOfCreation\": \"2026-01-20 03:14:09.0\"\n    }\n  ]\n}",
    },
  },
  {
    id: "cc25",
    domain: "cloud-concepts",
    text: "A financial company must keep certain workloads on-premises for data residency reasons but wants to use native AWS services and APIs on that hardware. Which AWS offering meets this requirement?",
    options: [
      { id: "a", text: "AWS Local Zones" },
      { id: "b", text: "AWS Wavelength" },
      { id: "c", text: "AWS Outposts" },
      { id: "d", text: "Amazon CloudFront" },
    ],
    correctOptionIds: ["c"],
    explanation: "AWS Outposts is a fully managed rack or server that AWS installs in the customer's own data center, extending AWS infrastructure, services, and APIs to on-premises locations.",
    optionRationale: {
      a: "AWS Local Zones are AWS-owned facilities placed in metropolitan areas to bring low-latency compute closer to users; they are not installed in the customer's data center.",
      b: "AWS Wavelength embeds AWS compute and storage inside telecommunications providers' 5G networks for ultra-low-latency mobile applications.",
      c: "AWS Outposts delivers AWS hardware and services into the customer's own facility, satisfying data residency while using the same AWS APIs and tools.",
      d: "Amazon CloudFront is a content delivery network that caches content at edge locations; it does not host workloads on-premises.",
    },
    referenceUrl: "https://aws.amazon.com/outposts/",
    referenceLabel: "AWS Outposts",
    consoleUrl: "https://console.aws.amazon.com/outposts/home",
    consoleLabel: "AWS Outposts",
    diagram:
      "flowchart LR\n    Region[AWS Region] --> Outposts[AWS Outposts in Customer Data Center]\n    Region --> LZ[Local Zone in Metro Area]\n    Region --> WL[Wavelength Zone in 5G Network]\n    Outposts --> Residency[Data Stays On-premises]",
    cliExample: {
      description: "List AWS Outposts installed for the account",
      command: "aws outposts list-outposts",
      sampleOutput: "{\n  \"Outposts\": [\n    {\n      \"OutpostId\": \"op-0123456789abcdef0\",\n      \"OwnerId\": \"123456789012\",\n      \"OutpostArn\": \"arn:aws:outposts:us-east-1:123456789012:outpost/op-0123456789abcdef0\",\n      \"SiteId\": \"os-0123456789abcdef0\",\n      \"Name\": \"nyc-dc1-rack\",\n      \"LifeCycleStatus\": \"ACTIVE\",\n      \"AvailabilityZone\": \"us-east-1a\",\n      \"AvailabilityZoneId\": \"use1-az6\",\n      \"SiteArn\": \"arn:aws:outposts:us-east-1:123456789012:site/os-0123456789abcdef0\",\n      \"SupportedHardwareType\": \"RACK\"\n    }\n  ]\n}",
    },
  },
  {
    id: "cc26",
    domain: "cloud-concepts",
    text: "A new administrator notices that some AWS services in the Management Console do not require selecting a Region. Which of the following is a global service that operates across all Regions?",
    options: [
      { id: "a", text: "Amazon EC2" },
      { id: "b", text: "AWS Identity and Access Management (IAM)" },
      { id: "c", text: "Amazon RDS" },
      { id: "d", text: "AWS Lambda" },
    ],
    correctOptionIds: ["b"],
    explanation: "IAM is a global service: users, groups, roles, and policies are defined once and apply across every Region in the account. Other global services include Route 53, CloudFront, and AWS Organizations.",
    optionRationale: {
      a: "Amazon EC2 is Regional; instances are launched into a specific Region and AZ.",
      b: "IAM is global — identities and policies are not tied to any Region and are visible everywhere in the account.",
      c: "Amazon RDS is Regional; database instances live in a chosen Region's subnets.",
      d: "AWS Lambda is Regional; functions are deployed to and invoked in a specific Region.",
    },
    referenceUrl: "https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions.html",
    referenceLabel: "AWS Regions and Global Services",
    consoleUrl: "https://console.aws.amazon.com/iam/home#/users",
    consoleLabel: "IAM > Users",
    diagram:
      "flowchart TD\n    Account[AWS Account] --> Global[Global Services: IAM, Route 53, CloudFront]\n    Account --> R1[us-east-1: EC2, RDS, Lambda]\n    Account --> R2[eu-west-1: EC2, RDS, Lambda]\n    Global -.applies to.-> R1\n    Global -.applies to.-> R2",
    cliExample: {
      description: "List IAM users; no Region flag is needed because IAM is a global service",
      command: "aws iam list-users",
      sampleOutput: "{\n  \"Users\": [\n    {\n      \"Path\": \"/\",\n      \"UserName\": \"alice\",\n      \"UserId\": \"AIDA2EXAMPLE1234567890\",\n      \"Arn\": \"arn:aws:iam::123456789012:user/alice\",\n      \"CreateDate\": \"2026-01-15T08:22:10+00:00\",\n      \"PasswordLastUsed\": \"2026-09-16T07:45:31+00:00\"\n    },\n    {\n      \"Path\": \"/\",\n      \"UserName\": \"ci-deployer\",\n      \"UserId\": \"AIDA2EXAMPLE0987654321\",\n      \"Arn\": \"arn:aws:iam::123456789012:user/ci-deployer\",\n      \"CreateDate\": \"2026-02-03T12:00:00+00:00\"\n    }\n  ]\n}",
    },
  },
  {
    id: "cc27",
    domain: "cloud-concepts",
    text: "A company wants a disaster recovery strategy in which a minimal version of its core environment (such as a replicated database) is always running in a second Region, with application servers only started when a disaster occurs. Which DR strategy does this describe?",
    options: [
      { id: "a", text: "Backup and restore" },
      { id: "b", text: "Pilot light" },
      { id: "c", text: "Warm standby" },
      { id: "d", text: "Multi-site active/active" },
    ],
    correctOptionIds: ["b"],
    explanation: "Pilot light keeps core components such as data replication running in the recovery Region while other resources are provisioned only during failover, giving faster recovery than backup and restore at lower cost than warm standby.",
    optionRationale: {
      a: "Backup and restore stores backups in the recovery Region but has nothing running there; everything must be restored, giving the slowest recovery and lowest cost.",
      b: "Pilot light keeps the essential 'core' (typically data) live and scaled-down, and only starts the remaining infrastructure when a disaster occurs.",
      c: "Warm standby runs a scaled-down but fully functional copy of the entire environment that can immediately handle reduced traffic.",
      d: "Multi-site active/active runs full production capacity in multiple Regions simultaneously, giving near-zero recovery time at the highest cost.",
    },
    referenceUrl: "https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html",
    referenceLabel: "Disaster Recovery Options in the Cloud",
    diagram:
      "flowchart LR\n    BR[Backup and Restore] --> PL[Pilot Light]\n    PL --> WS[Warm Standby]\n    WS --> MS[Multi-site Active/Active]\n    BR -.Lower cost, slower recovery.-> MS\n    PL --> Core[Core data replicated, app servers off until failover]",
    cliExample: {
      description: "Create a cross-Region read replica so core data is always replicated for a pilot light strategy",
      command: "aws rds create-db-instance-read-replica --db-instance-identifier dr-replica --source-db-instance-identifier arn:aws:rds:us-east-1:123456789012:db:prod-db --region us-west-2",
      sampleOutput: "{\n  \"DBInstance\": {\n    \"DBInstanceIdentifier\": \"dr-replica\",\n    \"DBInstanceClass\": \"db.r6g.large\",\n    \"Engine\": \"mysql\",\n    \"DBInstanceStatus\": \"creating\",\n    \"DBInstanceArn\": \"arn:aws:rds:us-west-2:123456789012:db:dr-replica\",\n    \"ReadReplicaSourceDBInstanceIdentifier\": \"arn:aws:rds:us-east-1:123456789012:db:prod-db\",\n    \"AvailabilityZone\": \"us-west-2a\",\n    \"MultiAZ\": false,\n    \"EngineVersion\": \"8.0.36\",\n    \"StorageEncrypted\": true,\n    \"KmsKeyId\": \"arn:aws:kms:us-west-2:123456789012:key/1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d\",\n    \"StorageType\": \"gp3\",\n    \"AllocatedStorage\": 100\n  }\n}",
    },
  },
  {
    id: "cc28",
    domain: "cloud-concepts",
    text: "A development team deploys code to AWS Elastic Beanstalk, which automatically handles capacity provisioning, load balancing, and patching of the underlying platform. Which cloud service model does this best represent?",
    options: [
      { id: "a", text: "Infrastructure as a Service (IaaS)" },
      { id: "b", text: "Platform as a Service (PaaS)" },
      { id: "c", text: "Software as a Service (SaaS)" },
      { id: "d", text: "On-premises hosting" },
    ],
    correctOptionIds: ["b"],
    explanation: "PaaS removes the need to manage the underlying infrastructure so teams can focus on deploying and managing applications; Elastic Beanstalk is a classic PaaS example.",
    optionRationale: {
      a: "IaaS provides raw building blocks such as virtual machines, storage, and networking (for example, Amazon EC2) that the customer configures and manages.",
      b: "PaaS manages the hardware, operating system, and runtime platform so developers only deploy code, which is exactly what Elastic Beanstalk provides.",
      c: "SaaS delivers a complete end-user application managed by the provider (for example, a web-based email service); you do not deploy your own code to it.",
      d: "On-premises hosting means the company owns and operates the hardware itself, the opposite of a managed cloud platform.",
    },
    referenceUrl: "https://aws.amazon.com/types-of-cloud-computing/",
    referenceLabel: "Types of Cloud Computing",
    consoleUrl: "https://console.aws.amazon.com/elasticbeanstalk/home#/applications",
    consoleLabel: "Elastic Beanstalk > Applications",
    diagram:
      "flowchart LR\n    IaaS[IaaS: EC2, EBS, VPC] --> PaaS[PaaS: Elastic Beanstalk]\n    PaaS --> SaaS[SaaS: Complete Application]\n    IaaS -.Customer manages more.-> SaaS",
    cliExample: {
      description: "Create an Elastic Beanstalk application, a PaaS offering that manages the underlying platform",
      command: "aws elasticbeanstalk create-application --application-name my-web-app",
      sampleOutput: "{\n  \"Application\": {\n    \"ApplicationArn\": \"arn:aws:elasticbeanstalk:us-east-1:123456789012:application/my-web-app\",\n    \"ApplicationName\": \"my-web-app\",\n    \"DateCreated\": \"2026-08-12T10:05:22.113Z\",\n    \"DateUpdated\": \"2026-08-12T10:05:22.113Z\",\n    \"ConfigurationTemplates\": [],\n    \"ResourceLifecycleConfig\": {\n      \"VersionLifecycleConfig\": {\n        \"MaxCountRule\": {\n          \"Enabled\": false,\n          \"MaxCount\": 200,\n          \"DeleteSourceFromS3\": false\n        },\n        \"MaxAgeRule\": {\n          \"Enabled\": false,\n          \"MaxAgeInDays\": 180,\n          \"DeleteSourceFromS3\": false\n        }\n      }\n    }\n  }\n}",
    },
  },
  {
    id: "cc29",
    domain: "cloud-concepts",
    text: "A company is planning a large data center migration to AWS. It wants to build a business case that estimates projected cloud costs, and then perform automated lift-and-shift of its servers. Which TWO AWS services should it use?",
    options: [
      { id: "a", text: "AWS Migration Evaluator" },
      { id: "b", text: "AWS Application Migration Service" },
      { id: "c", text: "Amazon Inspector" },
      { id: "d", text: "AWS Trusted Advisor" },
      { id: "e", text: "Amazon QuickSight" },
    ],
    correctOptionIds: ["a", "b"],
    explanation: "Migration Evaluator (formerly TSO Logic) builds a data-driven business case with projected AWS costs, while Application Migration Service (AWS MGN) automates the lift-and-shift rehosting of physical, virtual, and cloud servers.",
    optionRationale: {
      a: "Migration Evaluator collects on-premises usage data and produces a business case and cost projection for moving to AWS.",
      b: "Application Migration Service (AWS MGN) replicates source servers and converts them to run natively on AWS for automated rehosting.",
      c: "Amazon Inspector is a vulnerability management service that scans EC2 instances and container images for software vulnerabilities.",
      d: "AWS Trusted Advisor provides best-practice recommendations for existing AWS resources, not migration planning or execution.",
      e: "Amazon QuickSight is a business intelligence and dashboarding service, not a migration tool.",
    },
    referenceUrl: "https://aws.amazon.com/application-migration-service/",
    referenceLabel: "AWS Application Migration Service",
    consoleUrl: "https://console.aws.amazon.com/mgn/home#/sourceServers",
    consoleLabel: "Application Migration Service > Source servers",
    diagram:
      "flowchart LR\n    Assess[Assess: Migration Evaluator Business Case] --> Mobilize[Mobilize: Plan Migration]\n    Mobilize --> Migrate[Migrate: Application Migration Service Lift-and-Shift]\n    Migrate --> AWS[Servers Running on AWS]",
    cliExample: {
      description: "List source servers registered with AWS Application Migration Service for rehosting",
      command: "aws mgn describe-source-servers",
      sampleOutput: "{\n  \"items\": [\n    {\n      \"sourceServerID\": \"s-0123456789abcdef0\",\n      \"arn\": \"arn:aws:mgn:us-east-1:123456789012:source-server/s-0123456789abcdef0\",\n      \"isArchived\": false,\n      \"dataReplicationInfo\": {\n        \"dataReplicationState\": \"CONTINUOUS\",\n        \"lagDuration\": \"PT0S\",\n        \"replicatedDisks\": [\n          {\n            \"deviceName\": \"/dev/sda1\",\n            \"totalStorageBytes\": 107374182400,\n            \"replicatedStorageBytes\": 107374182400,\n            \"backloggedStorageBytes\": 0\n          }\n        ]\n      },\n      \"lifeCycle\": {\n        \"state\": \"READY_FOR_TEST\",\n        \"addedToServiceDateTime\": \"2026-05-20T09:12:30.000Z\"\n      },\n      \"sourceProperties\": {\n        \"identificationHints\": {\n          \"hostname\": \"erp-app-01\"\n        },\n        \"os\": {\n          \"fullString\": \"Ubuntu 22.04.4 LTS\"\n        },\n        \"cpus\": [\n          {\n            \"cores\": 4,\n            \"modelName\": \"Intel(R) Xeon(R) CPU E5-2686 v4\"\n          }\n        ],\n        \"ramBytes\": 17179869184\n      },\n      \"replicationType\": \"AGENT_BASED\"\n    }\n  ]\n}",
    },
  },
  {
    id: "cc30",
    domain: "cloud-concepts",
    text: "A research institute needs to move 400 TB of archived data to Amazon S3 from a remote site with an unreliable, low-bandwidth internet connection. Which AWS service is the MOST appropriate for this one-time migration?",
    options: [
      { id: "a", text: "AWS Direct Connect" },
      { id: "b", text: "AWS Snowball Edge" },
      { id: "c", text: "AWS DataSync over the internet" },
      { id: "d", text: "Amazon S3 Transfer Acceleration" },
    ],
    correctOptionIds: ["b"],
    explanation: "The AWS Snow Family provides physical devices for offline data transfer; Snowball Edge devices are shipped to the customer, loaded locally, and returned to AWS, avoiding the need for network bandwidth entirely.",
    optionRationale: {
      a: "AWS Direct Connect is a dedicated private network link that takes weeks to provision and is meant for ongoing hybrid connectivity, not a one-time transfer from a remote site.",
      b: "Snowball Edge is a rugged physical appliance (tens of TB per device) designed exactly for petabyte-scale offline migrations where the network is a bottleneck.",
      c: "AWS DataSync accelerates online transfers but still depends on the available internet bandwidth, which is unreliable and slow here.",
      d: "S3 Transfer Acceleration speeds up uploads through CloudFront edge locations but still requires a usable internet connection for hundreds of terabytes.",
    },
    referenceUrl: "https://aws.amazon.com/snowball/",
    referenceLabel: "AWS Snowball",
    consoleUrl: "https://console.aws.amazon.com/snowfamily/home#/jobs",
    consoleLabel: "AWS Snow Family > Jobs",
    diagram:
      "flowchart LR\n    AWS[AWS ships Snowball Edge] --> Site[Remote Site loads 400 TB]\n    Site --> Return[Device shipped back to AWS]\n    Return --> S3[Data imported into Amazon S3]",
    cliExample: {
      description: "List Snow Family jobs, such as a Snowball Edge import job",
      command: "aws snowball list-jobs",
      sampleOutput: "{\n  \"JobListEntries\": [\n    {\n      \"JobId\": \"JID123e4567-e89b-12d3-a456-426614174000\",\n      \"JobState\": \"InProgress\",\n      \"IsMaster\": false,\n      \"JobType\": \"IMPORT\",\n      \"SnowballType\": \"EDGE_S\",\n      \"CreationDate\": \"2026-06-22T04:30:15.000Z\",\n      \"Description\": \"Archive migration batch 1\"\n    },\n    {\n      \"JobId\": \"JID987e6543-e21b-45d3-b654-426614174999\",\n      \"JobState\": \"Complete\",\n      \"IsMaster\": false,\n      \"JobType\": \"IMPORT\",\n      \"SnowballType\": \"EDGE_S\",\n      \"CreationDate\": \"2026-05-02T11:03:48.000Z\",\n      \"Description\": \"Archive migration pilot\"\n    }\n  ]\n}",
    },
  },
  {
    id: "cc31",
    domain: "cloud-concepts",
    text: "An e-commerce application's order service calls the inventory service directly. When the inventory service is slow or unavailable, orders fail. Which architectural principle should be applied, and which AWS service helps implement it?",
    options: [
      { id: "a", text: "Tight coupling using direct API calls with retries" },
      { id: "b", text: "Loose coupling using Amazon SQS as a buffer between the services" },
      { id: "c", text: "Vertical scaling by using a larger instance for the inventory service" },
      { id: "d", text: "Data encryption using AWS KMS" },
    ],
    correctOptionIds: ["b"],
    explanation: "Loose coupling means components interact through intermediaries such as queues or topics, so a failure or slowdown in one component does not cascade to others. Amazon SQS decouples producers from consumers.",
    optionRationale: {
      a: "Tight coupling is the current problem: direct dependencies mean one component's failure directly breaks the other.",
      b: "Placing an SQS queue between the services lets the order service enqueue messages and continue even when inventory is slow; inventory processes messages when ready.",
      c: "Vertical scaling may reduce slowness temporarily but does not remove the direct dependency, so an outage still breaks orders.",
      d: "Encryption with AWS KMS protects data confidentiality and has no effect on service dependencies.",
    },
    referenceUrl: "https://docs.aws.amazon.com/whitepapers/latest/aws-overview/six-advantages-of-cloud-computing.html",
    referenceLabel: "Overview of Amazon Web Services",
    consoleUrl: "https://console.aws.amazon.com/sqs/v3/home#/queues",
    consoleLabel: "Amazon SQS > Queues",
    diagram:
      "flowchart LR\n    Order[Order Service] --> Queue[Amazon SQS Queue]\n    Queue --> Inventory[Inventory Service]\n    Inventory -.slow or down.-> Queue\n    Queue --> Buffer[Messages buffered until processed]",
    cliExample: {
      description: "Create an SQS queue to decouple the order and inventory services",
      command: "aws sqs create-queue --queue-name order-events",
      sampleOutput: "{\n  \"QueueUrl\": \"https://sqs.us-east-1.amazonaws.com/123456789012/order-events\"\n}",
    },
  },
  {
    id: "cc32",
    domain: "cloud-concepts",
    text: "A startup is deciding whether to build a new API on AWS Lambda and Amazon API Gateway instead of on a fleet of EC2 instances. Which TWO benefits are characteristic of a serverless architecture?",
    options: [
      { id: "a", text: "No servers to provision, patch, or manage" },
      { id: "b", text: "Automatic scaling with pay-per-use billing when code is not running" },
      { id: "c", text: "Full control over the underlying operating system and kernel" },
      { id: "d", text: "Guaranteed dedicated physical hardware for each function" },
      { id: "e", text: "Requirement to purchase Reserved Instances for cost savings" },
    ],
    correctOptionIds: ["a", "b"],
    explanation: "Serverless services such as Lambda remove infrastructure management, scale automatically with demand, and charge only for the compute consumed, with no charge when the code is idle.",
    optionRationale: {
      a: "With serverless, AWS manages the servers, operating systems, and patching; developers only supply code.",
      b: "Lambda scales automatically in response to requests and bills per invocation and duration, so idle time costs nothing.",
      c: "Serverless abstracts away the OS entirely; if you need OS or kernel control, you would use EC2 instead.",
      d: "Serverless runs on shared, AWS-managed infrastructure; dedicated hardware is an EC2 Dedicated Host or Dedicated Instance feature.",
      e: "Reserved Instances apply to EC2 and RDS; Lambda has no such requirement and uses pay-per-use pricing.",
    },
    referenceUrl: "https://aws.amazon.com/serverless/",
    referenceLabel: "Serverless on AWS",
    consoleUrl: "https://console.aws.amazon.com/lambda/home#/functions",
    consoleLabel: "Lambda > Functions",
    diagram:
      "flowchart LR\n    Client[Client Request] --> APIGW[Amazon API Gateway]\n    APIGW --> Lambda[AWS Lambda Function]\n    Lambda --> Scale[Scales Automatically]\n    Lambda --> Pay[Pay Only While Running]\n    Lambda --> NoOps[No Servers to Manage]",
    cliExample: {
      description: "List Lambda functions, which run without any servers to manage",
      command: "aws lambda list-functions",
      sampleOutput: "{\n  \"Functions\": [\n    {\n      \"FunctionName\": \"orders-api\",\n      \"FunctionArn\": \"arn:aws:lambda:us-east-1:123456789012:function:orders-api\",\n      \"Runtime\": \"nodejs22.x\",\n      \"Role\": \"arn:aws:iam::123456789012:role/orders-api-role\",\n      \"Handler\": \"index.handler\",\n      \"CodeSize\": 48213,\n      \"Description\": \"Order API backend\",\n      \"Timeout\": 10,\n      \"MemorySize\": 256,\n      \"LastModified\": \"2026-08-30T15:20:11.000+0000\",\n      \"Version\": \"$LATEST\",\n      \"PackageType\": \"Zip\",\n      \"Architectures\": [\n        \"arm64\"\n      ],\n      \"EphemeralStorage\": {\n        \"Size\": 512\n      }\n    }\n  ]\n}",
    },
  },
  {
    id: "cc33",
    domain: "cloud-concepts",
    text: "A media company runs a video transcoding workload on general-purpose EC2 instances and finds jobs take too long. An architect recommends evaluating GPU-based instance types and using managed services where possible so the team can focus on the application rather than tuning infrastructure. Which Well-Architected Framework pillar does this recommendation align with?",
    options: [
      { id: "a", text: "Security" },
      { id: "b", text: "Performance efficiency" },
      { id: "c", text: "Cost optimization" },
      { id: "d", text: "Sustainability" },
    ],
    correctOptionIds: ["b"],
    explanation: "The performance efficiency pillar focuses on using computing resources efficiently to meet requirements, including selecting the right resource types and sizes, using managed and serverless services, and experimenting with new technologies.",
    optionRationale: {
      a: "Security covers protecting data, systems, and assets; it does not address choosing instance types for throughput.",
      b: "Selecting purpose-built resources such as GPU instances and democratizing advanced technologies through managed services are core performance efficiency design principles.",
      c: "Cost optimization focuses on avoiding unnecessary spend; while related, the recommendation is driven by workload performance requirements.",
      d: "Sustainability addresses minimizing environmental impact; the recommendation is about meeting performance needs.",
    },
    referenceUrl: "https://docs.aws.amazon.com/wellarchitected/latest/performance-efficiency-pillar/welcome.html",
    referenceLabel: "Performance Efficiency Pillar - AWS Well-Architected Framework",
    consoleUrl: "https://console.aws.amazon.com/ec2/home#InstanceTypes:",
    consoleLabel: "EC2 > Instance Types",
    diagram: `flowchart LR
    Workload[Video Transcoding Workload] --> Select[Select Right Resource Type]
    Select --> GPU[GPU Instance Family]
    Select --> Managed[Managed / Serverless Services]
    GPU --> Perf[Faster Jobs]
    Managed --> Focus[Team Focuses on Application]`,
    cliExample: {
      description: "Describe GPU-accelerated instance types to evaluate for the transcoding workload",
      command: "aws ec2 describe-instance-types --filters Name=instance-type,Values=g5.xlarge --query 'InstanceTypes[].{Type:InstanceType,vCPUs:VCpuInfo.DefaultVCpus,GPUs:GpuInfo.Gpus[0].Count}'",
      sampleOutput: "[\n  {\n    \"Type\": \"g5.xlarge\",\n    \"vCPUs\": 4,\n    \"GPUs\": 1\n  }\n]",
    },
  },
  {
    id: "cc34",
    domain: "cloud-concepts",
    text: "An operations team manually configures each new environment through the AWS Management Console, which has led to inconsistent deployments and a lengthy outage caused by a misconfiguration. The team wants to define infrastructure as code, make small reversible changes, and run frequent game days to rehearse failures. Which Well-Architected Framework pillar do these practices belong to?",
    options: [
      { id: "a", text: "Operational excellence" },
      { id: "b", text: "Reliability" },
      { id: "c", text: "Performance efficiency" },
      { id: "d", text: "Cost optimization" },
    ],
    correctOptionIds: ["a"],
    explanation: "The operational excellence pillar covers running and monitoring systems to deliver business value and continually improving processes. Its design principles include performing operations as code, making frequent small reversible changes, refining procedures, anticipating failure, and learning from operational events.",
    optionRationale: {
      a: "Operations as code, small reversible changes, and anticipating failure through game days are explicitly listed operational excellence design principles.",
      b: "Reliability focuses on the workload's ability to recover from failures and scale; it is related but the practices described concern how operations are performed.",
      c: "Performance efficiency is about using resources efficiently to meet requirements, not operational procedures.",
      d: "Cost optimization deals with avoiding unnecessary spending, not deployment consistency.",
    },
    referenceUrl: "https://docs.aws.amazon.com/wellarchitected/latest/operational-excellence-pillar/welcome.html",
    referenceLabel: "Operational Excellence Pillar - AWS Well-Architected Framework",
    consoleUrl: "https://console.aws.amazon.com/cloudformation/home#/stacks",
    consoleLabel: "CloudFormation > Stacks",
    diagram: `flowchart LR
    Manual[Manual Console Changes] --> Problem[Inconsistent Environments]
    Problem --> OpsCode[Operations as Code - CloudFormation]
    OpsCode --> Small[Small Reversible Changes]
    Small --> GameDay[Game Days - Anticipate Failure]
    GameDay --> Improve[Learn and Improve]`,
    cliExample: {
      description: "Deploy an environment from a CloudFormation template instead of configuring it manually",
      command: "aws cloudformation create-stack --stack-name web-env-dev --template-body file://web-env.yaml",
      sampleOutput: "{\n  \"StackId\": \"arn:aws:cloudformation:us-east-1:123456789012:stack/web-env-dev/a1b2c3d4-5e6f-7a8b-9c0d-e1f2a3b4c5d6\"\n}",
    },
  },
  {
    id: "cc35",
    domain: "cloud-concepts",
    text: "A company migrated its servers to EC2 by matching the instance sizes to its old on-premises hardware. Monitoring now shows most instances average 8% CPU utilization. Which cloud concept describes matching instance types and sizes to actual workload requirements, and which AWS service provides recommendations to do so?",
    options: [
      { id: "a", text: "Right-sizing, using AWS Compute Optimizer" },
      { id: "b", text: "Vertical scaling, using Amazon Route 53" },
      { id: "c", text: "Elasticity, using AWS Artifact" },
      { id: "d", text: "Fault tolerance, using AWS Shield" },
    ],
    correctOptionIds: ["a"],
    explanation: "Right-sizing is the process of matching instance types and sizes to workload performance and capacity requirements at the lowest possible cost. AWS Compute Optimizer analyzes utilization metrics and recommends optimal instance types.",
    optionRationale: {
      a: "Right-sizing directly addresses over-provisioned resources, and Compute Optimizer uses CloudWatch metrics to recommend appropriately sized instances.",
      b: "Vertical scaling means adding resources to an instance, which would make over-provisioning worse; Route 53 is a DNS service.",
      c: "Elasticity refers to automatically acquiring and releasing resources; AWS Artifact provides compliance reports and has nothing to do with sizing.",
      d: "Fault tolerance is about continuing operation despite failures; AWS Shield provides DDoS protection.",
    },
    referenceUrl: "https://docs.aws.amazon.com/compute-optimizer/latest/ug/what-is-compute-optimizer.html",
    referenceLabel: "What is AWS Compute Optimizer?",
    consoleUrl: "https://console.aws.amazon.com/compute-optimizer/home#/dashboard",
    consoleLabel: "AWS Compute Optimizer > Dashboard",
    diagram: `flowchart LR
    Lift[Lift and Shift - Same Sizes] --> Low[8% CPU Utilization]
    Low --> CO[AWS Compute Optimizer]
    CO --> Rec[Recommend Smaller Instance Type]
    Rec --> RightSize[Right-Sized Fleet]
    RightSize --> Savings[Lower Cost, Same Performance]`,
    cliExample: {
      description: "Get right-sizing recommendations for over-provisioned EC2 instances",
      command: "aws compute-optimizer get-ec2-instance-recommendations --filters name=Finding,values=Overprovisioned",
      sampleOutput: "{\n  \"instanceRecommendations\": [\n    {\n      \"instanceArn\": \"arn:aws:ec2:us-east-1:123456789012:instance/i-0abcd1234ef567890\",\n      \"accountId\": \"123456789012\",\n      \"instanceName\": \"app-server-01\",\n      \"currentInstanceType\": \"m5.2xlarge\",\n      \"finding\": \"OVER_PROVISIONED\",\n      \"recommendationOptions\": [\n        {\n          \"instanceType\": \"m5.large\",\n          \"performanceRisk\": 1.0,\n          \"rank\": 1\n        }\n      ]\n    }\n  ],\n  \"errors\": []\n}",
    },
  },
  {
    id: "cc36",
    domain: "cloud-concepts",
    text: "A company's monolithic order-processing application struggles to scale. During migration, the team decides to rebuild it as event-driven microservices using AWS Lambda, Amazon SQS, and Amazon DynamoDB to gain agility and scalability. Which migration strategy (one of the 7 Rs) does this describe?",
    options: [
      { id: "a", text: "Rehost" },
      { id: "b", text: "Relocate" },
      { id: "c", text: "Refactor (re-architect)" },
      { id: "d", text: "Retain" },
    ],
    correctOptionIds: ["c"],
    explanation: "Refactor, also called re-architect, means changing how an application is designed and developed, typically using cloud-native features, to improve agility, performance, and scalability. It has the highest effort but the greatest long-term benefit.",
    optionRationale: {
      a: "Rehost (lift and shift) moves the application unchanged, which would not solve the scaling limits of the monolith.",
      b: "Relocate moves infrastructure such as VMware environments to AWS without changing the application.",
      c: "Rebuilding the monolith as serverless microservices is a textbook refactor / re-architect migration.",
      d: "Retain keeps the application where it is, which does not address the problem.",
    },
    referenceUrl: "https://docs.aws.amazon.com/prescriptive-guidance/latest/large-migration-guide/migration-strategies.html",
    referenceLabel: "Migration strategies - AWS Prescriptive Guidance",
    consoleUrl: "https://console.aws.amazon.com/migrationhub/home#/strategy",
    consoleLabel: "Migration Hub > Strategy Recommendations",
    diagram: `flowchart LR
    Mono[Monolithic Order App] --> Refactor[Refactor / Re-architect]
    Refactor --> L[AWS Lambda]
    Refactor --> Q[Amazon SQS]
    Refactor --> D[Amazon DynamoDB]
    L --> Benefit[Agility + Scalability]
    Q --> Benefit
    D --> Benefit`,
    cliExample: {
      description: "Retrieve Migration Hub Strategy Recommendations for an application being assessed for refactoring",
      command: "aws migrationhub-strategy get-application-component-strategies --application-component-id app-comp-0a1b2c3d4e5f6a7b8",
      sampleOutput: "{\n  \"applicationComponentStrategies\": [\n    {\n      \"recommendation\": {\n        \"strategy\": \"Refactor\",\n        \"targetDestination\": \"AWS Lambda\",\n        \"transformationTool\": {\n          \"name\": \"Strategy Recommendation Support\",\n          \"description\": \"Refactor to serverless microservices\"\n        }\n      },\n      \"status\": \"Recommended\",\n      \"isPreferred\": true\n    }\n  ]\n}",
    },
  },
  {
    id: "cc37",
    domain: "cloud-concepts",
    text: "A company runs hundreds of virtual machines on VMware vSphere in its data center. Its lease is ending and it wants to move the entire environment to AWS quickly without converting VM formats, changing hypervisors, or modifying applications. Which migration strategy BEST fits this scenario?",
    options: [
      { id: "a", text: "Repurchase" },
      { id: "b", text: "Relocate" },
      { id: "c", text: "Refactor" },
      { id: "d", text: "Retire" },
    ],
    correctOptionIds: ["b"],
    explanation: "Relocate (hypervisor-level lift and shift) moves infrastructure to the cloud without purchasing new hardware, rewriting applications, or modifying existing operations, for example by moving vSphere VMs to VMware Cloud on AWS.",
    optionRationale: {
      a: "Repurchase means switching to a different product, typically SaaS; the company wants to keep its existing VMs.",
      b: "Relocate moves VMware workloads to AWS as-is at the hypervisor level, so no VM conversion or application change is required.",
      c: "Refactor requires re-architecting applications, which the company explicitly wants to avoid.",
      d: "Retire means decommissioning applications; these workloads are still needed.",
    },
    referenceUrl: "https://docs.aws.amazon.com/prescriptive-guidance/latest/large-migration-guide/migration-strategies.html",
    referenceLabel: "Migration strategies - AWS Prescriptive Guidance",
    consoleUrl: "https://console.aws.amazon.com/migrationhub/home#/dashboard",
    consoleLabel: "AWS Migration Hub > Dashboard",
    diagram: `flowchart LR
    DC[On-Premises vSphere VMs] --> Relocate[Relocate - Hypervisor-Level Move]
    Relocate --> VMC[VMware Cloud on AWS]
    VMC --> Same[Same VM Format, Same Tools]
    Same --> Fast[Fast Exit from Data Center]`,
    cliExample: {
      description: "List migration tasks tracked in AWS Migration Hub during the relocation",
      command: "aws mgh list-migration-tasks --region us-west-2",
      sampleOutput: "{\n  \"MigrationTaskSummaryList\": [\n    {\n      \"ProgressUpdateStream\": \"VMware-Relocate\",\n      \"MigrationTaskName\": \"vsphere-cluster-01\",\n      \"Status\": \"IN_PROGRESS\",\n      \"ProgressPercent\": 65,\n      \"StatusDetail\": \"Replicating VMs to VMware Cloud on AWS\",\n      \"UpdateDateTime\": \"2026-09-10T08:45:00+00:00\"\n    }\n  ]\n}",
    },
  },
  {
    id: "cc38",
    domain: "cloud-concepts",
    text: "During a migration assessment, a company identifies a mainframe billing system that is business critical but is scheduled to be replaced in two years. The company decides to keep it running on-premises for now and revisit it later. Which migration strategy does this decision represent?",
    options: [
      { id: "a", text: "Retain" },
      { id: "b", text: "Retire" },
      { id: "c", text: "Rehost" },
      { id: "d", text: "Replatform" },
    ],
    correctOptionIds: ["a"],
    explanation: "Retain (sometimes called revisit) means keeping an application in its source environment, either because it is not ready to migrate, has compliance constraints, or the business plans to replace or revisit it later.",
    optionRationale: {
      a: "Keeping the system where it is and revisiting it later is exactly the retain strategy.",
      b: "Retire means decommissioning; the billing system is still critical and in use.",
      c: "Rehost would move the mainframe workload to AWS, which the company is choosing not to do now.",
      d: "Replatform involves optimizing while migrating; no migration is planned at this time.",
    },
    referenceUrl: "https://docs.aws.amazon.com/prescriptive-guidance/latest/large-migration-guide/migration-strategies.html",
    referenceLabel: "Migration strategies - AWS Prescriptive Guidance",
    consoleUrl: "https://console.aws.amazon.com/migrationhub/home#/servers",
    consoleLabel: "Migration Hub > Servers",
    diagram: `flowchart LR
    Assess[Migration Assessment] --> Decision{Ready to Migrate?}
    Decision -->|No, replacing in 2 years| Retain[Retain On-Premises]
    Decision -->|Yes| Migrate[Rehost / Replatform / Refactor]
    Retain --> Revisit[Revisit Later]`,
    cliExample: {
      description: "Tag a discovered on-premises server with its migration strategy in Application Discovery Service",
      command: "aws discovery create-tags --configuration-ids d-server-0123456789abcdef0 --tags key=MigrationStrategy,value=Retain",
      sampleOutput: "{}",
    },
  },
  {
    id: "cc39",
    domain: "cloud-concepts",
    text: "A gaming company in Los Angeles needs single-digit millisecond latency for real-time multiplayer sessions. The nearest AWS Region is too far away to meet this requirement. Which AWS infrastructure component should the company use to run compute and storage closer to its users in that metropolitan area?",
    options: [
      { id: "a", text: "An AWS Local Zone" },
      { id: "b", text: "An additional Availability Zone in the nearest Region" },
      { id: "c", text: "A CloudFront edge location" },
      { id: "d", text: "An AWS Direct Connect location" },
    ],
    correctOptionIds: ["a"],
    explanation: "AWS Local Zones are extensions of a Region that place compute, storage, database, and other services close to large population and industry centers, delivering single-digit millisecond latency for latency-sensitive applications.",
    optionRationale: {
      a: "Local Zones bring EC2, EBS, and other services to a specific metro area, which is exactly what low-latency gaming in Los Angeles requires.",
      b: "Availability Zones are all within the parent Region's geographic area, so adding one does not bring resources closer to a distant city.",
      c: "Edge locations cache content and terminate connections for CloudFront and Route 53 but do not run general EC2 workloads.",
      d: "Direct Connect provides dedicated private network connectivity from on-premises to AWS; it does not host compute.",
    },
    referenceUrl: "https://aws.amazon.com/about-aws/global-infrastructure/localzones/",
    referenceLabel: "AWS Local Zones",
    consoleUrl: "https://console.aws.amazon.com/ec2/home#Settings:tab=zones",
    consoleLabel: "EC2 > Settings > Zones",
    diagram: `flowchart LR
    Player[Players in Los Angeles] -->|single-digit ms| LZ[AWS Local Zone us-west-2-lax-1]
    LZ --> Parent[Parent Region us-west-2 Oregon]
    Player -.tens of ms.-> Parent
    LZ --> Game[Game Server on EC2]`,
    cliExample: {
      description: "Opt in to the Los Angeles Local Zone group so EC2 resources can be launched there",
      command: "aws ec2 modify-availability-zone-group --group-name us-west-2-lax-1 --opt-in-status opted-in --region us-west-2",
      sampleOutput: "{\n  \"Return\": true\n}",
    },
  },
  {
    id: "cc40",
    domain: "cloud-concepts",
    text: "A company is building an augmented reality application for mobile users on a telecommunications provider's 5G network. The application must process data with ultra-low latency by running compute at the edge of the 5G network itself. Which AWS infrastructure offering is designed for this use case?",
    options: [
      { id: "a", text: "AWS Outposts" },
      { id: "b", text: "AWS Wavelength" },
      { id: "c", text: "Amazon CloudFront" },
      { id: "d", text: "AWS Global Accelerator" },
    ],
    correctOptionIds: ["b"],
    explanation: "AWS Wavelength embeds AWS compute and storage services within telecommunications providers' 5G networks, so application traffic reaches servers in Wavelength Zones without leaving the mobile network, minimizing latency.",
    optionRationale: {
      a: "Outposts extends AWS into a customer's own data center, not into a carrier's 5G network.",
      b: "Wavelength Zones are located inside telecom providers' data centers at the edge of the 5G network, purpose-built for ultra-low-latency mobile applications.",
      c: "CloudFront is a content delivery network that caches content at edge locations; it does not run EC2 compute inside 5G networks.",
      d: "Global Accelerator improves routing over the AWS global network but does not place compute within a mobile carrier's network.",
    },
    referenceUrl: "https://aws.amazon.com/wavelength/",
    referenceLabel: "AWS Wavelength",
    consoleUrl: "https://console.aws.amazon.com/ec2/home#Settings:tab=zones",
    consoleLabel: "EC2 > Settings > Zones",
    diagram: `flowchart LR
    Phone[5G Mobile Device] --> Carrier[Telecom 5G Network]
    Carrier --> WZ[AWS Wavelength Zone]
    WZ --> App[AR Application on EC2]
    WZ -.backhaul.-> Region[Parent AWS Region]`,
    cliExample: {
      description: "List Wavelength Zones available to the account in a Region",
      command: "aws ec2 describe-availability-zones --all-availability-zones --filters Name=zone-type,Values=wavelength-zone --region us-east-1",
      sampleOutput: "{\n  \"AvailabilityZones\": [\n    {\n      \"State\": \"available\",\n      \"OptInStatus\": \"opted-in\",\n      \"RegionName\": \"us-east-1\",\n      \"ZoneName\": \"us-east-1-wl1-bos-wlz-1\",\n      \"ZoneId\": \"use1-wl1-bos-wlz1\",\n      \"GroupName\": \"us-east-1-wl1\",\n      \"NetworkBorderGroup\": \"us-east-1-wl1-bos-wlz-1\",\n      \"ZoneType\": \"wavelength-zone\",\n      \"ParentZoneName\": \"us-east-1a\",\n      \"ParentZoneId\": \"use1-az1\"\n    }\n  ]\n}",
    },
  },
  {
    id: "cc41",
    domain: "cloud-concepts",
    text: "A healthcare company is choosing which AWS Region to deploy a new patient portal in. Which TWO factors should MOST influence the choice of Region?",
    options: [
      { id: "a", text: "Data residency and compliance requirements that dictate where patient data may be stored" },
      { id: "b", text: "Proximity to end users to minimize network latency" },
      { id: "c", text: "The number of edge locations inside the Region" },
      { id: "d", text: "Whether the Region uses the same IAM users as other Regions" },
      { id: "e", text: "The alphabetical order of Region codes" },
    ],
    correctOptionIds: ["a", "b"],
    explanation: "The four key Region selection criteria are compliance and data governance, proximity to customers (latency), available services and features, and pricing. For a healthcare portal, data residency rules and user latency are the most important.",
    optionRationale: {
      a: "Regulations often require that healthcare data stays within a specific country or jurisdiction, making compliance a primary Region selection factor.",
      b: "Deploying close to users reduces latency and improves the patient experience, another core selection criterion.",
      c: "Edge locations are separate from Regions and are used by CloudFront and Route 53; they are not a Region-selection factor.",
      d: "IAM is a global service, so identities are the same in every Region; this does not differentiate Regions.",
      e: "Region codes have no bearing on suitability for a workload.",
    },
    referenceUrl: "https://docs.aws.amazon.com/whitepapers/latest/aws-overview/global-infrastructure.html",
    referenceLabel: "AWS Global Infrastructure - Overview of Amazon Web Services",
    consoleUrl: "https://console.aws.amazon.com/ec2/home#Settings:tab=regions",
    consoleLabel: "EC2 > Settings > Regions",
    diagram: `flowchart TD
    Choose[Choose a Region] --> C[Compliance / Data Residency]
    Choose --> L[Latency / Proximity to Users]
    Choose --> S[Service Availability]
    Choose --> P[Pricing]
    C --> Region[Selected Region]
    L --> Region`,
    cliExample: {
      description: "List the Regions available to the account when evaluating deployment locations",
      command: "aws ec2 describe-regions --query 'Regions[].{Name:RegionName,Endpoint:Endpoint}' --output json",
      sampleOutput: "[\n  {\n    \"Name\": \"eu-central-1\",\n    \"Endpoint\": \"ec2.eu-central-1.amazonaws.com\"\n  },\n  {\n    \"Name\": \"ap-southeast-1\",\n    \"Endpoint\": \"ec2.ap-southeast-1.amazonaws.com\"\n  },\n  {\n    \"Name\": \"us-east-1\",\n    \"Endpoint\": \"ec2.us-east-1.amazonaws.com\"\n  }\n]",
    },
  },
  {
    id: "cc42",
    domain: "cloud-concepts",
    text: "A company's disaster recovery plan states that after a Regional outage the application must be restored within 4 hours and may lose at most 15 minutes of data. Which TWO terms correspond to these requirements, in order?",
    options: [
      { id: "a", text: "RTO of 4 hours and RPO of 15 minutes" },
      { id: "b", text: "RPO of 4 hours and RTO of 15 minutes" },
      { id: "c", text: "SLA of 4 hours and MTBF of 15 minutes" },
      { id: "d", text: "Availability of 4 hours and durability of 15 minutes" },
    ],
    correctOptionIds: ["a"],
    explanation: "Recovery Time Objective (RTO) is the maximum acceptable time to restore service after a disruption. Recovery Point Objective (RPO) is the maximum acceptable amount of data loss measured in time, which determines how frequently backups or replication must occur.",
    optionRationale: {
      a: "Restoring within 4 hours is the RTO; losing at most 15 minutes of data is the RPO.",
      b: "This reverses the definitions; RPO measures data loss, not restoration time.",
      c: "An SLA is a contractual commitment and MTBF measures average time between failures; neither defines the DR targets described.",
      d: "Availability and durability describe uptime and data persistence percentages, not recovery targets.",
    },
    referenceUrl: "https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html",
    referenceLabel: "Disaster Recovery of Workloads on AWS",
    consoleUrl: "https://console.aws.amazon.com/backup/home#/backupplans",
    consoleLabel: "AWS Backup > Backup plans",
    diagram: `flowchart LR
    Backup[Last Backup] -->|RPO: max 15 min of data loss| Disaster[Disaster Occurs]
    Disaster -->|RTO: restore within 4 hours| Restored[Service Restored]`,
    cliExample: {
      description: "Create a backup plan with a 15-minute schedule to meet the RPO",
      command: "aws backup create-backup-plan --backup-plan '{\"BackupPlanName\":\"portal-dr\",\"Rules\":[{\"RuleName\":\"every-15-min\",\"TargetBackupVaultName\":\"Default\",\"ScheduleExpression\":\"cron(0/15 * * * ? *)\"}]}'",
      sampleOutput: "{\n  \"BackupPlanId\": \"5d1a2b3c-4e5f-6a7b-8c9d-0e1f2a3b4c5d\",\n  \"BackupPlanArn\": \"arn:aws:backup:us-east-1:123456789012:backup-plan:5d1a2b3c-4e5f-6a7b-8c9d-0e1f2a3b4c5d\",\n  \"CreationDate\": \"2026-09-12T10:15:00+00:00\",\n  \"VersionId\": \"NjQ2ZjE4ZDMtNmM5MS00YjZk\"\n}",
    },
  },
  {
    id: "cc43",
    domain: "cloud-concepts",
    text: "A retailer wants a disaster recovery strategy in which a scaled-down but fully functional copy of its production environment is always running in a second Region and can be scaled up to handle full production load when a disaster occurs. Which DR strategy does this describe?",
    options: [
      { id: "a", text: "Backup and restore" },
      { id: "b", text: "Pilot light" },
      { id: "c", text: "Warm standby" },
      { id: "d", text: "Multi-site active/active" },
    ],
    correctOptionIds: ["c"],
    explanation: "Warm standby keeps a scaled-down but fully functional version of the workload always running in the recovery Region. On failover it is scaled up to full capacity, giving faster recovery than pilot light at a lower cost than active/active.",
    optionRationale: {
      a: "Backup and restore keeps only backups in the recovery Region and rebuilds infrastructure after a disaster, giving the slowest recovery.",
      b: "Pilot light keeps only core components such as the database running; application servers are not running until failover.",
      c: "A reduced-capacity but fully functional running copy that scales up on failover is the definition of warm standby.",
      d: "Multi-site active/active runs the workload at full capacity in multiple Regions serving traffic simultaneously.",
    },
    referenceUrl: "https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html",
    referenceLabel: "Disaster Recovery Options in the Cloud",
    consoleUrl: "https://console.aws.amazon.com/route53/v2/healthchecks/home",
    consoleLabel: "Route 53 > Health checks",
    diagram: `flowchart LR
    Users --> R53[Route 53 Failover Routing]
    R53 -->|primary| Prod[Primary Region - Full Capacity]
    R53 -.failover.-> Warm[DR Region - Scaled-Down Running Copy]
    Warm -->|scale up on disaster| Full[Full Production Capacity]`,
    cliExample: {
      description: "Scale up the warm standby Auto Scaling group to full production capacity during failover",
      command: "aws autoscaling update-auto-scaling-group --auto-scaling-group-name retail-web-dr --min-size 6 --desired-capacity 6 --max-size 12 --region us-west-2",
      sampleOutput: "",
    },
  },
  {
    id: "cc44",
    domain: "cloud-concepts",
    text: "A small team currently runs a PostgreSQL database on a self-managed EC2 instance and spends significant time on maintenance. The team plans to move to Amazon RDS to reduce operational burden. Which TWO tasks would AWS take over after the move to the managed service?",
    options: [
      { id: "a", text: "Applying database engine patches and operating system updates" },
      { id: "b", text: "Performing automated backups and point-in-time recovery" },
      { id: "c", text: "Designing the database schema and writing application queries" },
      { id: "d", text: "Deciding which tables to index for application performance" },
      { id: "e", text: "Managing application-level user permissions inside the database" },
    ],
    correctOptionIds: ["a", "b"],
    explanation: "Managed services shift undifferentiated heavy lifting to AWS. With Amazon RDS, AWS handles provisioning, patching, backups, recovery, failure detection, and Multi-AZ replication, while the customer remains responsible for schema design, queries, and data-level access control.",
    optionRationale: {
      a: "RDS applies engine patches and manages the underlying operating system during maintenance windows.",
      b: "RDS provides automated backups, snapshots, and point-in-time recovery without customer scripting.",
      c: "Schema design and application queries are customer responsibilities regardless of where the database runs.",
      d: "Index design is part of application tuning and remains with the customer.",
      e: "Database-level users, roles, and grants are configured and managed by the customer.",
    },
    referenceUrl: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html",
    referenceLabel: "What is Amazon RDS?",
    consoleUrl: "https://console.aws.amazon.com/rds/home#databases:",
    consoleLabel: "RDS > Databases",
    diagram: `flowchart LR
    Self[Self-Managed PostgreSQL on EC2] --> RDS[Amazon RDS Managed Service]
    RDS --> AWS[AWS Handles: Patching, Backups, HA, Hardware]
    RDS --> Cust[Customer Handles: Schema, Queries, Data Access]
    AWS --> Less[Less Operational Burden]`,
    cliExample: {
      description: "Create an RDS PostgreSQL instance with automated backups retained for 7 days",
      command: "aws rds create-db-instance --db-instance-identifier team-postgres --engine postgres --db-instance-class db.t4g.medium --allocated-storage 50 --master-username admin --manage-master-user-password --backup-retention-period 7 --auto-minor-version-upgrade",
      sampleOutput: "{\n  \"DBInstance\": {\n    \"DBInstanceIdentifier\": \"team-postgres\",\n    \"DBInstanceClass\": \"db.t4g.medium\",\n    \"Engine\": \"postgres\",\n    \"DBInstanceStatus\": \"creating\",\n    \"MasterUsername\": \"admin\",\n    \"AllocatedStorage\": 50,\n    \"BackupRetentionPeriod\": 7,\n    \"AutoMinorVersionUpgrade\": true,\n    \"MultiAZ\": false,\n    \"EngineVersion\": \"16.4\",\n    \"StorageType\": \"gp3\"\n  }\n}",
    },
  },
  {
    id: "cc45",
    domain: "cloud-concepts",
    text: "A company beginning its cloud journey is worried that its IT staff lack cloud skills and that existing teams are resistant to new ways of working. It wants to build a cloud-fluent workforce and manage organizational change. Which AWS Cloud Adoption Framework (AWS CAF) perspective addresses these concerns?",
    options: [
      { id: "a", text: "Platform" },
      { id: "b", text: "People" },
      { id: "c", text: "Governance" },
      { id: "d", text: "Operations" },
    ],
    correctOptionIds: ["b"],
    explanation: "The AWS CAF People perspective serves as a bridge between technology and business, focusing on culture, organizational structure, leadership, workforce transformation, and change acceleration to build a cloud-ready workforce.",
    optionRationale: {
      a: "The Platform perspective focuses on building an enterprise-grade, scalable hybrid cloud platform and modernizing workloads.",
      b: "Skills development, culture evolution, and change acceleration are the core capabilities of the People perspective.",
      c: "Governance covers program management, benefits management, risk, and cloud financial management, not workforce skills.",
      d: "Operations ensures cloud services are delivered to meet business needs, such as observability and incident management.",
    },
    referenceUrl: "https://docs.aws.amazon.com/whitepapers/latest/overview-aws-cloud-adoption-framework/people-perspective.html",
    referenceLabel: "People perspective - AWS Cloud Adoption Framework",
    consoleUrl: "https://console.aws.amazon.com/wellarchitected/home#/workloads",
    consoleLabel: "AWS Well-Architected Tool > Workloads",
    diagram: `flowchart LR
    Concern[Skills Gap + Resistance to Change] --> CAF[AWS CAF People Perspective]
    CAF --> Culture[Culture Evolution]
    CAF --> Skills[Cloud Fluency / Workforce Transformation]
    CAF --> Change[Change Acceleration]
    Skills --> Ready[Cloud-Ready Organization]`,
    cliExample: {
      description: "Create a Well-Architected Tool workload to track readiness as the organization adopts the cloud",
      command: "aws wellarchitected create-workload --workload-name cloud-adoption-pilot --description 'First workload of the cloud adoption program' --environment PREPRODUCTION --aws-regions us-east-1 --lenses wellarchitected --review-owner platform-team@example.com",
      sampleOutput: "{\n  \"WorkloadId\": \"a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6\",\n  \"WorkloadArn\": \"arn:aws:wellarchitected:us-east-1:123456789012:workload/a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6\"\n}",
    },
  },
  {
    id: "cc46",
    domain: "cloud-concepts",
    text: "A web application runs on a single large EC2 instance. Traffic is growing, and the operations team is debating between upgrading to an even larger instance type or adding more smaller instances behind a load balancer. Which statement correctly describes these two approaches?",
    options: [
      { id: "a", text: "Upgrading to a larger instance is horizontal scaling; adding more instances is vertical scaling" },
      { id: "b", text: "Upgrading to a larger instance is vertical scaling; adding more instances is horizontal scaling, which also improves availability" },
      { id: "c", text: "Both approaches are forms of horizontal scaling" },
      { id: "d", text: "Both approaches are forms of vertical scaling" },
    ],
    correctOptionIds: ["b"],
    explanation: "Vertical scaling (scaling up) adds more CPU, memory, or storage to a single instance and has an upper limit. Horizontal scaling (scaling out) adds more instances, which is the cloud-native approach: it can scale further, works with Auto Scaling, and removes the single point of failure.",
    optionRationale: {
      a: "The definitions are reversed; adding instances is horizontal scaling.",
      b: "Scaling up is vertical, scaling out is horizontal, and multiple instances behind a load balancer eliminate the single instance as a point of failure.",
      c: "Changing the instance size does not add instances, so it is not horizontal scaling.",
      d: "Adding instances is horizontal, not vertical, scaling.",
    },
    referenceUrl: "https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html",
    referenceLabel: "What is Amazon EC2 Auto Scaling?",
    consoleUrl: "https://console.aws.amazon.com/ec2/home#AutoScalingGroups:",
    consoleLabel: "EC2 > Auto Scaling Groups",
    diagram: `flowchart TD
    Single[Single Large Instance] --> V[Vertical Scaling - Bigger Instance]
    Single --> H[Horizontal Scaling - More Instances]
    V --> Limit[Hardware Ceiling + Single Point of Failure]
    H --> ELB[Load Balancer + Auto Scaling]
    ELB --> HA[Higher Availability + Near-Unlimited Scale]`,
    cliExample: {
      description: "Scale out horizontally by increasing the desired capacity of an Auto Scaling group",
      command: "aws autoscaling set-desired-capacity --auto-scaling-group-name web-asg --desired-capacity 4 --honor-cooldown",
      sampleOutput: "",
    },
  },
  {
    id: "cc47",
    domain: "cloud-concepts",
    text: "A company wants to design its web tier on AWS to remain available even if an entire Availability Zone fails. Which TWO design choices support this high-availability goal?",
    options: [
      { id: "a", text: "Deploy EC2 instances in multiple Availability Zones behind an Elastic Load Balancer" },
      { id: "b", text: "Use an Auto Scaling group with health checks to replace unhealthy instances automatically" },
      { id: "c", text: "Place all instances in a single Availability Zone to minimize inter-AZ data transfer costs" },
      { id: "d", text: "Store session state on the local disk of each instance" },
      { id: "e", text: "Use a single, larger instance type to reduce the number of servers to manage" },
    ],
    correctOptionIds: ["a", "b"],
    explanation: "High availability on AWS is achieved by removing single points of failure: distributing instances across multiple Availability Zones behind a load balancer and using Auto Scaling with health checks so failed instances are automatically replaced.",
    optionRationale: {
      a: "Multi-AZ deployment behind a load balancer keeps the application serving traffic from healthy AZs when one fails.",
      b: "Auto Scaling health checks detect failed instances and launch replacements, maintaining capacity without manual intervention.",
      c: "A single AZ is a single point of failure; an AZ outage would take the whole application offline.",
      d: "Local session state ties users to a specific instance, so instance failure loses sessions; state should be externalized to services such as ElastiCache or DynamoDB.",
      e: "A single instance, however large, cannot survive an AZ or instance failure.",
    },
    referenceUrl: "https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/use-fault-isolation-to-protect-your-workload.html",
    referenceLabel: "Use fault isolation to protect your workload - Reliability Pillar",
    consoleUrl: "https://console.aws.amazon.com/ec2/home#LoadBalancers:",
    consoleLabel: "EC2 > Load Balancers",
    diagram: `flowchart TD
    Users --> ELB[Elastic Load Balancer]
    ELB --> AZ1[EC2 in AZ-a]
    ELB --> AZ2[EC2 in AZ-b]
    ASG[Auto Scaling Group + Health Checks] --> AZ1
    ASG --> AZ2
    AZ1 -.AZ failure.-> ELB
    ELB -->|traffic continues| AZ2`,
    cliExample: {
      description: "Create an Auto Scaling group spanning two Availability Zones with ELB health checks",
      command: "aws autoscaling create-auto-scaling-group --auto-scaling-group-name web-asg --launch-template LaunchTemplateName=web-lt,Version='$Latest' --min-size 2 --max-size 6 --desired-capacity 2 --vpc-zone-identifier \"subnet-0a1b2c3d,subnet-4e5f6a7b\" --target-group-arns arn:aws:elasticloadbalancing:us-east-1:123456789012:targetgroup/web-tg/73e2d6bc24d8a067 --health-check-type ELB --health-check-grace-period 120",
      sampleOutput: "",
    },
  },
  {
    id: "cc48",
    domain: "cloud-concepts",
    text: "An operations team wants to improve how it runs workloads on AWS. It plans to define all runbooks as code, make small frequent reversible changes, and hold regular game days to rehearse failure scenarios. Which AWS Well-Architected Framework pillar do these practices belong to?",
    options: [
      { id: "a", text: "Operational Excellence" },
      { id: "b", text: "Cost Optimization" },
      { id: "c", text: "Performance Efficiency" },
      { id: "d", text: "Sustainability" },
    ],
    correctOptionIds: ["a"],
    explanation: "The Operational Excellence pillar covers running and monitoring systems to deliver business value and continually improving processes. Its design principles include performing operations as code, making frequent small reversible changes, refining procedures frequently, anticipating failure, and learning from operational failures.",
    optionRationale: {
      a: "Operations as code, small reversible changes, and game days that rehearse failure are the core design principles of the Operational Excellence pillar.",
      b: "Cost Optimization is about avoiding unnecessary spend through right-sizing, pricing models, and measuring efficiency, not about operational procedures.",
      c: "Performance Efficiency focuses on using computing resources efficiently and selecting the right resource types, not on runbooks and game days.",
      d: "Sustainability addresses minimizing the environmental impact of workloads; it does not define operational practices like game days.",
    },
    referenceUrl: "https://docs.aws.amazon.com/wellarchitected/latest/operational-excellence-pillar/welcome.html",
    referenceLabel: "AWS Well-Architected Framework - Operational Excellence Pillar",
    consoleUrl: "https://console.aws.amazon.com/wellarchitected/home#/workloads",
    consoleLabel: "AWS Well-Architected Tool > Workloads",
    diagram: `flowchart LR
  OE[Operational Excellence Pillar] --> Code[Perform Operations as Code]
  OE --> Small[Small Frequent Reversible Changes]
  OE --> Refine[Refine Procedures Frequently]
  OE --> Anticipate[Anticipate Failure with Game Days]
  OE --> Learn[Learn from Operational Failures]`,
    cliExample: {
      description: "Create a Systems Manager Automation runbook so that an operational procedure is stored and executed as code",
      command: "aws ssm create-document --name RestartWebTier --document-type Automation --document-format YAML --content file://restart-web-tier.yaml",
      sampleOutput:
        "{\n  \"DocumentDescription\": {\n    \"Hash\": \"3f1c5e8a9b2d4c6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e\",\n    \"HashType\": \"Sha256\",\n    \"Name\": \"RestartWebTier\",\n    \"Owner\": \"123456789012\",\n    \"CreatedDate\": \"2026-03-04T09:12:41.000Z\",\n    \"Status\": \"Creating\",\n    \"DocumentVersion\": \"1\",\n    \"PlatformTypes\": [\n      \"Windows\",\n      \"Linux\",\n      \"MacOS\"\n    ],\n    \"DocumentType\": \"Automation\",\n    \"SchemaVersion\": \"0.3\",\n    \"LatestVersion\": \"1\",\n    \"DefaultVersion\": \"1\",\n    \"DocumentFormat\": \"YAML\"\n  }\n}",
    },
  },
  {
    id: "cc49",
    domain: "cloud-concepts",
    text: "A company wants to review a production workload against AWS best practices, answer a structured set of questions across the six pillars, and receive a list of high-risk issues with improvement plans. Which AWS service or tool provides this capability at no additional charge?",
    options: [
      { id: "a", text: "AWS Well-Architected Tool" },
      { id: "b", text: "AWS Trusted Advisor" },
      { id: "c", text: "AWS Config" },
      { id: "d", text: "AWS Compute Optimizer" },
    ],
    correctOptionIds: ["a"],
    explanation: "The AWS Well-Architected Tool is a free service in the AWS Management Console that lets you define a workload, answer the questions of the Well-Architected Framework and its lenses, and get a report of high-risk and medium-risk issues along with an improvement plan.",
    optionRationale: {
      a: "The Well-Architected Tool is purpose-built for pillar-by-pillar architecture reviews and generates improvement plans and risk reports for a workload.",
      b: "Trusted Advisor runs automated checks against your account and resources; it does not walk you through a question-based architecture review.",
      c: "AWS Config records resource configurations and evaluates them against rules; it does not perform a Well-Architected review.",
      d: "Compute Optimizer recommends right-sized EC2, EBS, Lambda, and ECS resources based on utilization; it is not a framework review tool.",
    },
    referenceUrl: "https://docs.aws.amazon.com/wellarchitected/latest/userguide/intro.html",
    referenceLabel: "AWS Well-Architected Tool User Guide",
    consoleUrl: "https://console.aws.amazon.com/wellarchitected/home#/workloads",
    consoleLabel: "AWS Well-Architected Tool > Workloads",
    diagram: `flowchart LR
  Define[Define Workload] --> Review[Answer Pillar Questions]
  Review --> Risks[High and Medium Risk Issues]
  Risks --> Plan[Improvement Plan]
  Plan --> Milestone[Save Milestone and Re-review]`,
    cliExample: {
      description: "List the workloads defined in the AWS Well-Architected Tool along with their risk counts",
      command: "aws wellarchitected list-workloads",
      sampleOutput:
        "{\n  \"WorkloadSummaries\": [\n    {\n      \"WorkloadId\": \"a1b2c3d4e5f60718293a4b5c6d7e8f90\",\n      \"WorkloadArn\": \"arn:aws:wellarchitected:us-east-1:123456789012:workload/a1b2c3d4e5f60718293a4b5c6d7e8f90\",\n      \"WorkloadName\": \"order-platform-prod\",\n      \"Owner\": \"platform-team\",\n      \"UpdatedAt\": \"2026-04-10T14:22:07.000Z\",\n      \"Lenses\": [\n        \"wellarchitected\"\n      ],\n      \"RiskCounts\": {\n        \"HIGH\": 3,\n        \"MEDIUM\": 7,\n        \"NONE\": 25,\n        \"NOT_APPLICABLE\": 2,\n        \"UNANSWERED\": 9\n      },\n      \"ImprovementStatus\": \"IMPROVEMENT_IN_PROGRESS\"\n    }\n  ]\n}",
    },
  },
  {
    id: "cc50",
    domain: "cloud-concepts",
    text: "A company is preparing to move to AWS and wants to structure its transformation effort. Which TWO of the following correctly pair an AWS Cloud Adoption Framework (AWS CAF) perspective with a capability it contains?",
    options: [
      { id: "a", text: "Governance perspective - Cloud financial management" },
      { id: "b", text: "Security perspective - Observability" },
      { id: "c", text: "Platform perspective - Data engineering" },
      { id: "d", text: "People perspective - Incident and problem management" },
    ],
    correctOptionIds: ["a", "c"],
    explanation: "The AWS CAF Governance perspective includes capabilities such as program and project management, benefits management, risk management, cloud financial management, and data governance. The Platform perspective includes platform architecture, data architecture, platform engineering, data engineering, provisioning and orchestration, modern application development, and CI/CD.",
    optionRationale: {
      a: "Cloud financial management is a Governance perspective capability focused on planning, measuring, and optimizing cloud spend.",
      b: "Observability belongs to the Operations perspective, not the Security perspective, which covers areas such as identity and access management and threat detection.",
      c: "Data engineering is a Platform perspective capability that covers building data pipelines and platforms on AWS.",
      d: "Incident and problem management is an Operations perspective capability; the People perspective covers culture, workforce transformation, and change acceleration.",
    },
    referenceUrl: "https://docs.aws.amazon.com/whitepapers/latest/overview-aws-cloud-adoption-framework/foundational-capabilities.html",
    referenceLabel: "AWS CAF - Foundational Capabilities",
    consoleUrl: "https://console.aws.amazon.com/wellarchitected/home#/lenses",
    consoleLabel: "AWS Well-Architected Tool > Lenses",
    diagram: `flowchart TD
  CAF[AWS CAF Perspectives] --> Gov[Governance]
  CAF --> Plat[Platform]
  CAF --> Ops[Operations]
  CAF --> Ppl[People]
  Gov --> CFM[Cloud Financial Management]
  Gov --> Risk[Risk Management]
  Plat --> DE[Data Engineering]
  Plat --> CICD[CI and CD]
  Ops --> Obs[Observability]
  Ppl --> Culture[Culture Evolution]`,
    cliExample: {
      description: "Enable a cost allocation tag so that cloud financial management can attribute spend to migration workstreams",
      command: "aws ce update-cost-allocation-tags-status --cost-allocation-tags-status TagKey=Workstream,Status=Active",
      sampleOutput:
        "{\n  \"Errors\": []\n}",
    },
  },
  {
    id: "cc51",
    domain: "cloud-concepts",
    text: "A CFO is comparing the total cost of ownership (TCO) of running an application on-premises versus on AWS. Which TWO cost components are typically included in the on-premises estimate but are eliminated or significantly reduced when moving to AWS?",
    options: [
      { id: "a", text: "Data center facilities costs such as power, cooling, and physical space" },
      { id: "b", text: "Application licensing for software that the company brings to AWS" },
      { id: "c", text: "Hardware procurement and refresh cycles for servers and storage" },
      { id: "d", text: "Salaries of developers who build the application" },
    ],
    correctOptionIds: ["a", "c"],
    explanation: "A TCO analysis covers direct costs such as servers, storage, and networking hardware plus indirect costs such as facilities, power, cooling, and the labor required to operate them. Moving to AWS removes the need for hardware procurement and refresh and for physical data center facilities, since AWS provides and operates the underlying infrastructure.",
    optionRationale: {
      a: "Power, cooling, rack space, and physical security are facilities costs that AWS absorbs into its service pricing, so they disappear from the customer's estimate.",
      b: "Software licenses that the company brings to AWS (BYOL) are still paid by the company; they do not disappear with migration.",
      c: "AWS owns and refreshes the physical servers and storage, so the customer no longer buys hardware or budgets for periodic replacement.",
      d: "Developer salaries are an application cost that remains the same regardless of where the application runs.",
    },
    referenceUrl: "https://aws.amazon.com/economics/",
    referenceLabel: "AWS Cloud Economics Center",
    consoleUrl: "https://console.aws.amazon.com/migrationhub/home#/home",
    consoleLabel: "AWS Migration Hub > Home",
    diagram: `flowchart LR
  TCO[On-Premises TCO] --> HW[Server and Storage Hardware]
  TCO --> Fac[Facilities Power and Cooling]
  TCO --> Net[Network Equipment]
  TCO --> Labor[Infrastructure Labor]
  HW -.eliminated.-> AWS[AWS Usage-Based Pricing]
  Fac -.eliminated.-> AWS
  Net -.reduced.-> AWS
  Labor -.reduced.-> AWS`,
    cliExample: {
      description: "Retrieve the last month's usage-based costs grouped by service to compare against the on-premises TCO baseline",
      command: "aws ce get-cost-and-usage --time-period Start=2026-05-01,End=2026-06-01 --granularity MONTHLY --metrics UnblendedCost --group-by Type=DIMENSION,Key=SERVICE",
      sampleOutput:
        "{\n  \"ResultsByTime\": [\n    {\n      \"TimePeriod\": {\n        \"Start\": \"2026-05-01\",\n        \"End\": \"2026-06-01\"\n      },\n      \"Total\": {},\n      \"Groups\": [\n        {\n          \"Keys\": [\n            \"Amazon Elastic Compute Cloud - Compute\"\n          ],\n          \"Metrics\": {\n            \"UnblendedCost\": {\n              \"Amount\": \"4318.52\",\n              \"Unit\": \"USD\"\n            }\n          }\n        },\n        {\n          \"Keys\": [\n            \"Amazon Simple Storage Service\"\n          ],\n          \"Metrics\": {\n            \"UnblendedCost\": {\n              \"Amount\": \"612.09\",\n              \"Unit\": \"USD\"\n            }\n          }\n        }\n      ],\n      \"Estimated\": false\n    }\n  ],\n  \"DimensionValueAttributes\": []\n}",
    },
  },
  {
    id: "cc52",
    domain: "cloud-concepts",
    text: "A web application stores user session data in the memory of each EC2 instance. When Auto Scaling terminates an instance during scale-in, users on that instance lose their shopping carts. Which design principle should be applied so that instances can be added or removed freely?",
    options: [
      { id: "a", text: "Design the application tier to be stateless by storing session data in an external store such as Amazon ElastiCache or DynamoDB" },
      { id: "b", text: "Disable scale-in on the Auto Scaling group so that instances are never terminated" },
      { id: "c", text: "Use a larger EC2 instance type so that fewer instances are needed" },
      { id: "d", text: "Enable sticky sessions on the load balancer and keep session data on the instance" },
    ],
    correctOptionIds: ["a"],
    explanation: "Stateless application tiers keep no client session data on individual servers, so any instance can serve any request and instances can be replaced or scaled at will. Moving session state to a shared store such as ElastiCache or DynamoDB is the recommended cloud design pattern.",
    optionRationale: {
      a: "Externalizing session state makes each instance interchangeable, which is the foundation of horizontal scaling and self-healing on AWS.",
      b: "Disabling scale-in wastes money and does not solve the problem when an instance fails or is replaced for other reasons.",
      c: "A larger instance still holds state locally and creates a single point of failure; vertical scaling does not address statelessness.",
      d: "Sticky sessions reduce but do not eliminate the problem; sessions are still lost whenever an instance is terminated or fails.",
    },
    referenceUrl: "https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/implement-loosely-coupled-dependencies.html",
    referenceLabel: "Reliability Pillar - Loosely Coupled Dependencies",
    consoleUrl: "https://console.aws.amazon.com/elasticache/home#/redis",
    consoleLabel: "Amazon ElastiCache > Redis OSS caches",
    diagram: `flowchart LR
  User[User] --> ALB[Application Load Balancer]
  ALB --> EC2a[Stateless EC2 Instance A]
  ALB --> EC2b[Stateless EC2 Instance B]
  EC2a --> Cache[ElastiCache Session Store]
  EC2b --> Cache
  EC2b -.terminated by scale-in.-> Cache`,
    cliExample: {
      description: "Create a DynamoDB table with TTL-friendly design to hold user sessions outside of the EC2 instances",
      command: "aws dynamodb create-table --table-name user-sessions --attribute-definitions AttributeName=sessionId,AttributeType=S --key-schema AttributeName=sessionId,KeyType=HASH --billing-mode PAY_PER_REQUEST",
      sampleOutput:
        "{\n  \"TableDescription\": {\n    \"AttributeDefinitions\": [\n      {\n        \"AttributeName\": \"sessionId\",\n        \"AttributeType\": \"S\"\n      }\n    ],\n    \"TableName\": \"user-sessions\",\n    \"KeySchema\": [\n      {\n        \"AttributeName\": \"sessionId\",\n        \"KeyType\": \"HASH\"\n      }\n    ],\n    \"TableStatus\": \"CREATING\",\n    \"CreationDateTime\": \"2026-02-18T11:05:33.412000+00:00\",\n    \"TableArn\": \"arn:aws:dynamodb:us-east-1:123456789012:table/user-sessions\",\n    \"TableId\": \"8c2f1a4e-6b7d-4e5f-9a0b-1c2d3e4f5a6b\",\n    \"BillingModeSummary\": {\n      \"BillingMode\": \"PAY_PER_REQUEST\"\n    }\n  }\n}",
    },
  },
  {
    id: "cc53",
    domain: "cloud-concepts",
    text: "A news website serves the same articles to millions of readers, and the database is overloaded by repeated reads of identical content. Which Well-Architected Performance Efficiency approach best reduces database load and improves response time?",
    options: [
      { id: "a", text: "Introduce caching layers, such as Amazon CloudFront at the edge and Amazon ElastiCache in front of the database" },
      { id: "b", text: "Increase the database instance size every time traffic grows" },
      { id: "c", text: "Move the database to a single larger Availability Zone" },
      { id: "d", text: "Replace the load balancer with Route 53 weighted routing" },
    ],
    correctOptionIds: ["a"],
    explanation: "Caching frequently read, rarely changing data at the edge and in memory is a core performance efficiency and cost optimization pattern. It removes repeated identical queries from the database and delivers content closer to users.",
    optionRationale: {
      a: "CloudFront caches responses at edge locations and ElastiCache serves hot data from memory, so most reads never reach the database.",
      b: "Continually scaling the database vertically is expensive, has an upper limit, and does not stop redundant reads.",
      c: "Availability Zones do not have sizes; this option does not address read load.",
      d: "Route 53 routing policies distribute DNS traffic; they do not reduce database queries.",
    },
    referenceUrl: "https://docs.aws.amazon.com/wellarchitected/latest/performance-efficiency-pillar/welcome.html",
    referenceLabel: "AWS Well-Architected Framework - Performance Efficiency Pillar",
    consoleUrl: "https://console.aws.amazon.com/cloudfront/v4/home#/distributions",
    consoleLabel: "Amazon CloudFront > Distributions",
    diagram: `flowchart LR
  Reader[Reader] --> CF[CloudFront Edge Cache]
  CF -->|cache miss| App[Application Tier]
  App --> EC[ElastiCache In-Memory Cache]
  EC -->|cache miss| DB[Database]
  CF -->|cache hit| Reader`,
    cliExample: {
      description: "Check the CloudFront cache hit rate for a distribution to measure how much traffic is served from the edge",
      command: "aws cloudwatch get-metric-statistics --namespace AWS/CloudFront --metric-name CacheHitRate --dimensions Name=DistributionId,Value=E2EXAMPLE1ABCD Name=Region,Value=Global --start-time 2026-06-01T00:00:00Z --end-time 2026-06-02T00:00:00Z --period 86400 --statistics Average --region us-east-1",
      sampleOutput:
        "{\n  \"Label\": \"CacheHitRate\",\n  \"Datapoints\": [\n    {\n      \"Timestamp\": \"2026-06-01T00:00:00+00:00\",\n      \"Average\": 93.7,\n      \"Unit\": \"Percent\"\n    }\n  ]\n}",
    },
  },
  {
    id: "cc54",
    domain: "cloud-concepts",
    text: "A company operates hundreds of EC2 instances and pays for them 24/7, although utilization data shows most are idle overnight and many are oversized. Which TWO Well-Architected Cost Optimization practices should the company adopt?",
    options: [
      { id: "a", text: "Right-size instances using utilization data from AWS Compute Optimizer" },
      { id: "b", text: "Schedule non-production instances to stop outside business hours" },
      { id: "c", text: "Move all instances to a single Availability Zone to reduce data transfer" },
      { id: "d", text: "Purchase the largest instance types available to avoid future resizing" },
    ],
    correctOptionIds: ["a", "b"],
    explanation: "The Cost Optimization pillar recommends adopting a consumption model (pay only when resources are needed), measuring overall efficiency, and continually right-sizing. Stopping idle instances and matching instance sizes to actual demand directly implements these principles.",
    optionRationale: {
      a: "Right-sizing based on real utilization metrics is a core Cost Optimization practice and Compute Optimizer provides those recommendations.",
      b: "Stopping non-production instances when they are not needed applies the consumption model and eliminates pay-for-idle waste.",
      c: "Concentrating everything in one AZ sacrifices reliability and saves little; cross-AZ data transfer is rarely the dominant cost.",
      d: "Over-provisioning is the opposite of right-sizing and increases waste.",
    },
    referenceUrl: "https://docs.aws.amazon.com/wellarchitected/latest/cost-optimization-pillar/welcome.html",
    referenceLabel: "AWS Well-Architected Framework - Cost Optimization Pillar",
    consoleUrl: "https://console.aws.amazon.com/compute-optimizer/home#/dashboard",
    consoleLabel: "AWS Compute Optimizer > Dashboard",
    diagram: `flowchart LR
  Idle[Idle and Oversized EC2 Fleet] --> Measure[Measure Utilization]
  Measure --> Rightsize[Right-Size with Compute Optimizer]
  Measure --> Schedule[Stop Instances Outside Business Hours]
  Rightsize --> Savings[Lower Monthly Cost]
  Schedule --> Savings`,
    cliExample: {
      description: "Get right-sizing recommendations for EC2 instances from AWS Compute Optimizer",
      command: "aws compute-optimizer get-ec2-instance-recommendations --max-results 1",
      sampleOutput:
        "{\n  \"instanceRecommendations\": [\n    {\n      \"instanceArn\": \"arn:aws:ec2:us-east-1:123456789012:instance/i-0abc123def4567890\",\n      \"accountId\": \"123456789012\",\n      \"instanceName\": \"batch-worker-07\",\n      \"currentInstanceType\": \"m5.2xlarge\",\n      \"finding\": \"OVER_PROVISIONED\",\n      \"findingReasonCodes\": [\n        \"CPUOverprovisioned\",\n        \"MemoryOverprovisioned\"\n      ],\n      \"recommendationOptions\": [\n        {\n          \"instanceType\": \"m5.large\",\n          \"performanceRisk\": 1.0,\n          \"rank\": 1\n        }\n      ],\n      \"lastRefreshTimestamp\": \"2026-07-09T06:00:00.000Z\",\n      \"currentPerformanceRisk\": \"VeryLow\"\n    }\n  ],\n  \"errors\": []\n}",
    },
  },
  {
    id: "cc55",
    domain: "cloud-concepts",
    text: "A company runs workloads on AWS and also on Microsoft Azure, and it deliberately keeps its data platform on both providers to avoid dependence on a single vendor. Which cloud deployment model does this describe?",
    options: [
      { id: "a", text: "Multi-cloud" },
      { id: "b", text: "Hybrid cloud" },
      { id: "c", text: "Private cloud" },
      { id: "d", text: "Community cloud" },
    ],
    correctOptionIds: ["a"],
    explanation: "Multi-cloud refers to using services from two or more public cloud providers. Hybrid cloud, by contrast, combines on-premises (or private cloud) infrastructure with a public cloud.",
    optionRationale: {
      a: "Running workloads across AWS and Azure to avoid vendor lock-in is the definition of a multi-cloud strategy.",
      b: "Hybrid cloud connects on-premises infrastructure with a public cloud; no on-premises component is mentioned here.",
      c: "A private cloud is infrastructure dedicated to a single organization, usually on-premises; this scenario uses two public clouds.",
      d: "A community cloud is shared by several organizations with common concerns; it is not what is described.",
    },
    referenceUrl: "https://aws.amazon.com/types-of-cloud-computing/",
    referenceLabel: "Types of Cloud Computing",
    consoleUrl: "https://console.aws.amazon.com/console/home",
    consoleLabel: "AWS Management Console > Home",
    diagram: `flowchart TD
  Models[Cloud Deployment Models] --> Public[Public Cloud - single provider]
  Models --> Hybrid[Hybrid Cloud - on-premises plus public cloud]
  Models --> Multi[Multi-Cloud - two or more public providers]
  Models --> Private[Private Cloud - dedicated infrastructure]
  Multi --> AWS[AWS]
  Multi --> Azure[Azure]`,
    cliExample: {
      description: "List the enabled AWS Regions for the account when planning where AWS-side workloads of a multi-cloud estate will run",
      command: "aws account list-regions --region-opt-status-contains ENABLED ENABLED_BY_DEFAULT --max-results 3",
      sampleOutput:
        "{\n  \"Regions\": [\n    {\n      \"RegionName\": \"ap-southeast-1\",\n      \"RegionOptStatus\": \"ENABLED_BY_DEFAULT\"\n    },\n    {\n      \"RegionName\": \"eu-west-1\",\n      \"RegionOptStatus\": \"ENABLED_BY_DEFAULT\"\n    },\n    {\n      \"RegionName\": \"us-east-1\",\n      \"RegionOptStatus\": \"ENABLED_BY_DEFAULT\"\n    }\n  ]\n}",
    },
  },
  {
    id: "cc56",
    domain: "cloud-concepts",
    text: "A company is planning a migration and does not have an accurate inventory of the servers in its data center, their utilization, or the network dependencies between them. Which AWS service should it use FIRST to collect this information?",
    options: [
      { id: "a", text: "AWS Application Discovery Service" },
      { id: "b", text: "AWS Application Migration Service" },
      { id: "c", text: "AWS Database Migration Service" },
      { id: "d", text: "AWS DataSync" },
    ],
    correctOptionIds: ["a"],
    explanation: "AWS Application Discovery Service collects server specifications, performance data, and network connections from on-premises environments using agents or an agentless connector, and stores the results in AWS Migration Hub to help plan the migration.",
    optionRationale: {
      a: "Application Discovery Service is designed for the assessment phase: it discovers servers, utilization, and dependencies before any migration takes place.",
      b: "Application Migration Service performs the lift-and-shift of servers; it assumes you already know which servers to migrate.",
      c: "DMS migrates databases; it does not inventory servers or map dependencies.",
      d: "DataSync transfers files between on-premises storage and AWS; it is not a discovery tool.",
    },
    referenceUrl: "https://docs.aws.amazon.com/application-discovery/latest/userguide/what-is-appdiscovery.html",
    referenceLabel: "What is AWS Application Discovery Service?",
    consoleUrl: "https://console.aws.amazon.com/migrationhub/discover/home#/servers",
    consoleLabel: "AWS Migration Hub > Discover > Servers",
    diagram: `flowchart LR
  DC[On-Premises Data Center] --> Agent[Discovery Agent or Agentless Collector]
  Agent --> ADS[AWS Application Discovery Service]
  ADS --> Hub[AWS Migration Hub Inventory]
  Hub --> Plan[Migration Waves and Dependencies]`,
    cliExample: {
      description: "List the on-premises servers that the discovery agents have reported to Application Discovery Service",
      command: "aws discovery list-configurations --configuration-type SERVER --max-results 1 --region us-west-2",
      sampleOutput:
        "{\n  \"configurations\": [\n    {\n      \"server.configurationId\": \"d-server-0a1b2c3d4e5f6a7b8\",\n      \"server.hostName\": \"erp-db-01.corp.example\",\n      \"server.osName\": \"Red Hat Enterprise Linux\",\n      \"server.osVersion\": \"8.9\",\n      \"server.type\": \"VMWARE\",\n      \"server.agentId\": \"o-0f1e2d3c4b5a69788\",\n      \"server.performance.avgCpuUsagePct\": \"12.4\",\n      \"server.performance.avgNumCores\": \"8\"\n    }\n  ]\n}",
    },
  },
  {
    id: "cc57",
    domain: "cloud-concepts",
    text: "A retailer is migrating an on-premises Oracle database to Amazon Aurora PostgreSQL. The team needs to convert the schema and stored procedures to the new engine and then keep the source and target in sync with minimal downtime until cutover. Which AWS service is designed for this?",
    options: [
      { id: "a", text: "AWS Database Migration Service with the AWS Schema Conversion Tool" },
      { id: "b", text: "AWS Application Migration Service" },
      { id: "c", text: "AWS Snowball Edge" },
      { id: "d", text: "AWS Backup" },
    ],
    correctOptionIds: ["a"],
    explanation: "AWS Database Migration Service (DMS) replicates data from a source to a target database, including continuous change data capture for near-zero downtime cutovers. For heterogeneous migrations between different engines, the AWS Schema Conversion Tool (SCT) converts the schema and code objects first.",
    optionRationale: {
      a: "DMS plus SCT is the purpose-built combination for heterogeneous database migrations with ongoing replication.",
      b: "Application Migration Service replicates entire servers block by block; it does not convert database engines or schemas.",
      c: "Snowball Edge is for bulk offline data transfer; it does not convert schemas or keep databases in sync.",
      d: "AWS Backup manages backups of AWS resources; it is not a migration service.",
    },
    referenceUrl: "https://docs.aws.amazon.com/dms/latest/userguide/Welcome.html",
    referenceLabel: "What is AWS Database Migration Service?",
    consoleUrl: "https://console.aws.amazon.com/dms/v2/home#/tasks",
    consoleLabel: "AWS DMS > Database migration tasks",
    diagram: `flowchart LR
  Oracle[On-Premises Oracle] --> SCT[Schema Conversion Tool]
  SCT --> Aurora[Aurora PostgreSQL]
  Oracle --> DMS[DMS Replication Instance]
  DMS -->|full load then CDC| Aurora
  Aurora --> Cutover[Application Cutover]`,
    cliExample: {
      description: "Describe the replication tasks in DMS to check full-load and CDC progress",
      command: "aws dms describe-replication-tasks --without-settings",
      sampleOutput:
        "{\n  \"ReplicationTasks\": [\n    {\n      \"ReplicationTaskIdentifier\": \"oracle-to-aurora-orders\",\n      \"SourceEndpointArn\": \"arn:aws:dms:us-east-1:123456789012:endpoint:ABCDEFGHIJKLMNOPQRSTUVWXYZ012345\",\n      \"TargetEndpointArn\": \"arn:aws:dms:us-east-1:123456789012:endpoint:ZYXWVUTSRQPONMLKJIHGFEDCBA543210\",\n      \"ReplicationInstanceArn\": \"arn:aws:dms:us-east-1:123456789012:rep:REPLICATIONINSTANCE0123456789ABC\",\n      \"MigrationType\": \"full-load-and-cdc\",\n      \"Status\": \"running\",\n      \"ReplicationTaskCreationDate\": \"2026-04-21T08:30:12.000Z\",\n      \"ReplicationTaskStats\": {\n        \"FullLoadProgressPercent\": 100,\n        \"TablesLoaded\": 42,\n        \"TablesLoading\": 0,\n        \"TablesQueued\": 0,\n        \"TablesErrored\": 0\n      },\n      \"ReplicationTaskArn\": \"arn:aws:dms:us-east-1:123456789012:task:TASK0123456789ABCDEFGHIJKLMNOPQR\"\n    }\n  ]\n}",
    },
  },
  {
    id: "cc58",
    domain: "cloud-concepts",
    text: "A company has a large migration involving many teams and tools. Leadership wants a single place to track the status of every application being migrated, regardless of whether it is moved with AWS Application Migration Service, AWS DMS, or partner tools. Which AWS service provides this?",
    options: [
      { id: "a", text: "AWS Migration Hub" },
      { id: "b", text: "AWS Systems Manager" },
      { id: "c", text: "AWS CloudFormation" },
      { id: "d", text: "AWS Control Tower" },
    ],
    correctOptionIds: ["a"],
    explanation: "AWS Migration Hub provides a single location to discover existing servers, plan migrations, and track the status of each application migration across multiple AWS and partner migration tools.",
    optionRationale: {
      a: "Migration Hub aggregates progress from Application Migration Service, DMS, and integrated partner tools into one dashboard.",
      b: "Systems Manager manages and operates resources already in AWS; it does not track migration progress.",
      c: "CloudFormation provisions infrastructure as code; it is not a migration tracking service.",
      d: "Control Tower sets up and governs a multi-account landing zone; it does not track application migrations.",
    },
    referenceUrl: "https://docs.aws.amazon.com/migrationhub/latest/ug/whatishub.html",
    referenceLabel: "What is AWS Migration Hub?",
    consoleUrl: "https://console.aws.amazon.com/migrationhub/home#/dashboard",
    consoleLabel: "AWS Migration Hub > Dashboard",
    diagram: `flowchart LR
  MGN[Application Migration Service] --> Hub[AWS Migration Hub]
  DMS[Database Migration Service] --> Hub
  Partner[Partner Migration Tools] --> Hub
  Hub --> Status[Per-Application Migration Status]`,
    cliExample: {
      description: "List the migration tasks currently reported to Migration Hub in the home Region",
      command: "aws mgh list-migration-tasks --region us-west-2",
      sampleOutput:
        "{\n  \"MigrationTaskSummaryList\": [\n    {\n      \"ProgressUpdateStream\": \"MGN\",\n      \"MigrationTaskName\": \"s-0123456789abcdef0\",\n      \"Status\": \"IN_PROGRESS\",\n      \"ProgressPercent\": 65,\n      \"StatusDetail\": \"Replicating data\",\n      \"UpdateDateTime\": \"2026-08-02T15:47:19.000Z\"\n    },\n    {\n      \"ProgressUpdateStream\": \"DMS\",\n      \"MigrationTaskName\": \"oracle-to-aurora-orders\",\n      \"Status\": \"COMPLETED\",\n      \"ProgressPercent\": 100,\n      \"StatusDetail\": \"Full load complete\",\n      \"UpdateDateTime\": \"2026-08-01T22:10:05.000Z\"\n    }\n  ]\n}",
    },
  },
  {
    id: "cc59",
    domain: "cloud-concepts",
    text: "A company must move its data center out of a facility whose lease expires in 90 days. It runs hundreds of VMware VMs and has no time to re-architect. Which AWS service and migration strategy best fits this timeline?",
    options: [
      { id: "a", text: "Relocate using VMware Cloud on AWS to move the vSphere environment as-is" },
      { id: "b", text: "Refactor every application into serverless microservices" },
      { id: "c", text: "Repurchase all applications with SaaS equivalents" },
      { id: "d", text: "Retain all workloads in the current facility" },
    ],
    correctOptionIds: ["a"],
    explanation: "Relocate is the 7 Rs strategy for moving infrastructure to the cloud without purchasing new hardware, rewriting applications, or changing operations. VMware Cloud on AWS lets a company move vSphere-based VMs to AWS-managed hosts while continuing to use familiar VMware tooling.",
    optionRationale: {
      a: "Relocating a VMware estate to VMware Cloud on AWS moves the environment quickly with no application changes, which fits a 90-day deadline.",
      b: "Refactoring hundreds of applications is the slowest and most expensive strategy and is impossible in 90 days.",
      c: "Repurchasing requires finding SaaS replacements for every application, which is not feasible in this timeframe.",
      d: "Retain is not an option because the lease is ending and the facility must be vacated.",
    },
    referenceUrl: "https://docs.aws.amazon.com/prescriptive-guidance/latest/large-migration-guide/migration-strategies.html",
    referenceLabel: "AWS Prescriptive Guidance - Migration Strategies (7 Rs)",
    consoleUrl: "https://console.aws.amazon.com/migrationhub/home#/strategy",
    consoleLabel: "AWS Migration Hub > Strategy Recommendations",
    diagram: `flowchart TD
  R7[The 7 Rs of Migration] --> Rehost[Rehost - lift and shift]
  R7 --> Relocate[Relocate - move VMware as-is]
  R7 --> Replatform[Replatform - minor tweaks]
  R7 --> Refactor[Refactor - re-architect]
  R7 --> Repurchase[Repurchase - move to SaaS]
  R7 --> Retire[Retire - decommission]
  R7 --> Retain[Retain - keep as is]
  Relocate --> VMC[VMware Cloud on AWS]`,
    cliExample: {
      description: "Retrieve the Migration Hub Strategy Recommendations assessment summary that suggests a strategy per application",
      command: "aws migrationhubstrategy get-portfolio-summary --region us-east-1",
      sampleOutput:
        "{\n  \"assessmentSummary\": {\n    \"listServerStrategySummary\": [\n      {\n        \"strategy\": \"Rehost\",\n        \"count\": 212\n      },\n      {\n        \"strategy\": \"Relocate\",\n        \"count\": 96\n      },\n      {\n        \"strategy\": \"Replatform\",\n        \"count\": 18\n      },\n      {\n        \"strategy\": \"Retire\",\n        \"count\": 11\n      }\n    ],\n    \"lastAnalyzedTimestamp\": \"2026-05-14T03:20:00.000Z\",\n    \"listServerSummary\": [\n      {\n        \"ServerOsType\": \"WindowsServer\",\n        \"count\": 180\n      },\n      {\n        \"ServerOsType\": \"Linux\",\n        \"count\": 157\n      }\n    ]\n  }\n}",
    },
  },
  {
    id: "cc60",
    domain: "cloud-concepts",
    text: "A company wants to deploy a workload in a Region for the first time and needs to know whether a specific AWS service is available in that Region. Which TWO statements about AWS Regions and service availability are correct?",
    options: [
      { id: "a", text: "Not every AWS service is available in every Region, and new services usually launch in a subset of Regions first" },
      { id: "b", text: "Regional services store and process data only in the Region you select unless you explicitly copy or replicate it elsewhere" },
      { id: "c", text: "All Regions contain exactly three Availability Zones" },
      { id: "d", text: "AWS automatically moves customer data between Regions to balance capacity" },
    ],
    correctOptionIds: ["a", "b"],
    explanation: "AWS Regions are isolated from each other. Service availability varies by Region, and customers should check the AWS Regional Services List. Data placed in a Region stays there unless the customer chooses to replicate it, which supports data sovereignty requirements.",
    optionRationale: {
      a: "Service availability differs by Region; the Regional Services List shows which services are offered where.",
      b: "AWS does not replicate customer data across Regions without the customer configuring it, so data residency can be controlled by Region choice.",
      c: "Regions have at least three AZs in most cases, but the exact number varies; some have more.",
      d: "AWS never moves customer content between Regions on its own; the customer controls where data resides.",
    },
    referenceUrl: "https://aws.amazon.com/about-aws/global-infrastructure/regional-product-services/",
    referenceLabel: "AWS Regional Services List",
    consoleUrl: "https://console.aws.amazon.com/ec2/home#Home:",
    consoleLabel: "Amazon EC2 > Dashboard (Region selector)",
    diagram: `flowchart LR
  Choose[Choose a Region] --> Check[Check Regional Services List]
  Check --> Avail{Service Available?}
  Avail -->|yes| Deploy[Deploy Workload]
  Avail -->|no| Other[Pick Another Region or Wait]
  Deploy --> Data[Data Stays in Selected Region]`,
    cliExample: {
      description: "Check whether a service is available in a Region by listing its endpoint in the Systems Manager global infrastructure parameters",
      command: "aws ssm get-parameters-by-path --path /aws/service/global-infrastructure/regions/ap-southeast-3/services/lambda --region us-east-1",
      sampleOutput:
        "{\n  \"Parameters\": [\n    {\n      \"Name\": \"/aws/service/global-infrastructure/regions/ap-southeast-3/services/lambda\",\n      \"Type\": \"String\",\n      \"Value\": \"lambda\",\n      \"Version\": 1,\n      \"LastModifiedDate\": \"2026-01-15T10:00:00.000000+00:00\",\n      \"ARN\": \"arn:aws:ssm:us-east-1::parameter/aws/service/global-infrastructure/regions/ap-southeast-3/services/lambda\",\n      \"DataType\": \"text\"\n    }\n  ]\n}",
    },
  },
  {
    id: "cc61",
    domain: "cloud-concepts",
    text: "An IT director wants to quantify the business value of moving to AWS beyond simple infrastructure savings, including staff productivity, operational resilience, and business agility. Which AWS framework organizes these benefits into four pillars?",
    options: [
      { id: "a", text: "AWS Cloud Value Framework" },
      { id: "b", text: "AWS Well-Architected Framework" },
      { id: "c", text: "AWS Shared Responsibility Model" },
      { id: "d", text: "AWS Cloud Adoption Framework" },
    ],
    correctOptionIds: ["a"],
    explanation: "The AWS Cloud Value Framework describes the value of the cloud in four pillars: cost savings (TCO), staff productivity, operational resilience, and business agility. It is used to build the business case for migration.",
    optionRationale: {
      a: "The Cloud Value Framework's four pillars are exactly cost savings, staff productivity, operational resilience, and business agility.",
      b: "The Well-Architected Framework has six pillars about how to design workloads, not about quantifying business value.",
      c: "The Shared Responsibility Model defines which security tasks belong to AWS versus the customer.",
      d: "The CAF organizes organizational capabilities into six perspectives; it does not quantify cloud value in four pillars.",
    },
    referenceUrl: "https://aws.amazon.com/economics/",
    referenceLabel: "AWS Cloud Economics Center",
    consoleUrl: "https://console.aws.amazon.com/migrationhub/home#/home",
    consoleLabel: "AWS Migration Hub > Home",
    diagram: `flowchart LR
  CVF[AWS Cloud Value Framework] --> Cost[Cost Savings - TCO]
  CVF --> Staff[Staff Productivity]
  CVF --> Resil[Operational Resilience]
  CVF --> Agility[Business Agility]`,
    cliExample: {
      description: "Retrieve the account's recommended Savings Plans purchase as input to the cost savings pillar of a business case",
      command: "aws ce get-savings-plans-purchase-recommendation --savings-plans-type COMPUTE_SP --term-in-years ONE_YEAR --payment-option NO_UPFRONT --lookback-period-in-days THIRTY_DAYS",
      sampleOutput:
        "{\n  \"Metadata\": {\n    \"RecommendationId\": \"9e2c4f6a-1b3d-4e5f-8a7b-6c5d4e3f2a1b\",\n    \"GenerationTimestamp\": \"2026-06-20T04:11:00Z\"\n  },\n  \"SavingsPlansPurchaseRecommendation\": {\n    \"SavingsPlansType\": \"COMPUTE_SP\",\n    \"TermInYears\": \"ONE_YEAR\",\n    \"PaymentOption\": \"NO_UPFRONT\",\n    \"LookbackPeriodInDays\": \"THIRTY_DAYS\",\n    \"SavingsPlansPurchaseRecommendationSummary\": {\n      \"EstimatedROI\": \"32.5\",\n      \"CurrencyCode\": \"USD\",\n      \"EstimatedTotalCost\": \"6120.00\",\n      \"CurrentOnDemandSpend\": \"9070.00\",\n      \"EstimatedSavingsAmount\": \"2950.00\",\n      \"EstimatedSavingsPercentage\": \"32.5\",\n      \"EstimatedMonthlySavingsAmount\": \"2950.00\",\n      \"HourlyCommitmentToPurchase\": \"8.50\"\n    }\n  }\n}",
    },
  },
  {
    id: "cc62",
    domain: "cloud-concepts",
    text: "An architect is designing a new system and wants to follow AWS design principles for reliability. Which TWO practices reflect the 'design for failure' principle recommended in the AWS Well-Architected Framework?",
    options: [
      { id: "a", text: "Automatically recover from failure by monitoring key metrics and triggering automated remediation" },
      { id: "b", text: "Test recovery procedures regularly by injecting failures, for example with AWS Fault Injection Service" },
      { id: "c", text: "Consolidate all components onto one very large, highly specified server to minimize moving parts" },
      { id: "d", text: "Manually inspect logs each morning to determine whether anything failed overnight" },
    ],
    correctOptionIds: ["a", "b"],
    explanation: "The Reliability pillar's design principles include automatically recovering from failure, testing recovery procedures, scaling horizontally to increase aggregate availability, and managing change through automation. Designing for failure assumes components will fail and builds automated detection and recovery in from the start.",
    optionRationale: {
      a: "Automated recovery driven by monitoring is a named design principle of the Reliability pillar.",
      b: "Regularly testing how the workload fails and recovers, including with chaos engineering tools such as AWS FIS, is a core Reliability design principle.",
      c: "A single large server is a single point of failure; the framework recommends scaling horizontally with many small resources instead.",
      d: "Manual daily log review is slow and reactive; it does not automate detection or recovery.",
    },
    referenceUrl: "https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/design-principles.html",
    referenceLabel: "Reliability Pillar - Design Principles",
    consoleUrl: "https://console.aws.amazon.com/fis/home#/experiment-templates",
    consoleLabel: "AWS Fault Injection Service > Experiment templates",
    diagram: `flowchart LR
  Monitor[CloudWatch Monitoring] --> Alarm[Alarm on Key Metric]
  Alarm --> Auto[Automated Remediation]
  Auto --> Healthy[Workload Restored]
  FIS[Fault Injection Experiment] -.injects failure.-> Monitor
  FIS --> Verify[Verify Recovery Works]`,
    cliExample: {
      description: "List the AWS Fault Injection Service experiment templates used to rehearse failures",
      command: "aws fis list-experiment-templates",
      sampleOutput:
        "{\n  \"experimentTemplates\": [\n    {\n      \"id\": \"EXT7abCdEfGhIjKlM\",\n      \"arn\": \"arn:aws:fis:us-east-1:123456789012:experiment-template/EXT7abCdEfGhIjKlM\",\n      \"description\": \"Terminate one EC2 instance in the web tier and verify Auto Scaling replaces it\",\n      \"creationTime\": \"2026-03-11T13:45:02.000Z\",\n      \"lastUpdateTime\": \"2026-03-11T13:45:02.000Z\",\n      \"tags\": {\n        \"Name\": \"web-tier-az-failure\"\n      }\n    }\n  ]\n}",
    },
  },
];
