import { Question } from "../types.js";

export const billingPricingAndSupportQuestions: Question[] = [
  {
    id: "bill1",
    domain: "billing-pricing-and-support",
    text: "Which AWS pricing model requires no upfront payment and lets you pay for compute capacity by the second or hour with no long-term commitment?",
    options: [
      { id: "a", text: "Reserved Instances" },
      { id: "b", text: "On-Demand Instances" },
      { id: "c", text: "Spot Instances" },
      { id: "d", text: "Savings Plans" },
    ],
    correctOptionIds: ["b"],
    explanation: "On-Demand Instances let you pay for compute capacity with no upfront payment or long-term commitment.",
    optionRationale: {
      a: "Reserved Instances require a 1- or 3-year commitment in exchange for a discount, so they don't fit 'no commitment'.",
      b: "On-Demand Instances are billed by the second or hour with no upfront payment and no long-term contract.",
      c: "Spot Instances also carry no commitment, but they draw on spare capacity at a discount and can be interrupted by AWS, which isn't what's described here.",
      d: "Savings Plans trade a 1- or 3-year usage commitment for a lower rate — the opposite of what's being asked about.",
    },
    referenceUrl: "https://aws.amazon.com/ec2/pricing/on-demand/",
    referenceLabel: "Amazon EC2 On-Demand Pricing",
    consoleUrl: "https://console.aws.amazon.com/ec2/home#Instances:",
    consoleLabel: "EC2 > Instances",
    diagram: "flowchart TD\n  Need{Workload Commitment?} --> None[No Commitment] --> OnDemand[On-Demand Pricing]\n  Need --> Term[1 or 3 Year Term] --> Reserved[Reserved Instances or Savings Plans]\n  Need --> Flex[Interruptible and Flexible] --> Spot[Spot Instances]",
    cliExample: {
      description: "List running EC2 instances using standard (on-demand) lifecycle",
      command: "aws ec2 describe-instances --filters Name=instance-lifecycle,Values=normal",
      sampleOutput:
        "{\n  \"Reservations\": [\n    {\n      \"ReservationId\": \"r-0a1b2c3d4e5f67890\",\n      \"OwnerId\": \"123456789012\",\n      \"Instances\": [\n        {\n          \"InstanceId\": \"i-0abcd1234efgh5678\",\n          \"InstanceType\": \"t3.micro\",\n          \"State\": {\n            \"Code\": 16,\n            \"Name\": \"running\"\n          },\n          \"LaunchTime\": \"2026-03-14T08:21:05+00:00\",\n          \"Placement\": {\n            \"AvailabilityZone\": \"us-east-1a\",\n            \"Tenancy\": \"default\"\n          },\n          \"Tags\": [\n            {\n              \"Key\": \"Name\",\n              \"Value\": \"web-1\"\n            }\n          ]\n        }\n      ]\n    }\n  ]\n}",
    },
  },
  {
    id: "bill2",
    domain: "billing-pricing-and-support",
    text: "Which EC2 purchasing option lets you use spare AWS compute capacity at steep discounts, with the risk that the instance can be interrupted by AWS with short notice?",
    options: [
      { id: "a", text: "On-Demand Instances" },
      { id: "b", text: "Reserved Instances" },
      { id: "c", text: "Spot Instances" },
      { id: "d", text: "Dedicated Hosts" },
    ],
    correctOptionIds: ["c"],
    explanation: "Spot Instances use spare EC2 capacity at a discount but can be reclaimed by AWS with short notice.",
    optionRationale: {
      a: "On-Demand Instances aren't discounted spare capacity, and AWS never reclaims them for pricing reasons.",
      b: "Reserved Instances require a commitment and are guaranteed for their term — the opposite of interruptible spare capacity.",
      c: "Spot Instances let you tap spare EC2 capacity at up to 90% off, with the trade-off that AWS can reclaim them with a two-minute interruption notice.",
      d: "Dedicated Hosts are physical servers billed for compliance or licensing needs, not discounted spare capacity.",
    },
    referenceUrl: "https://aws.amazon.com/ec2/spot/",
    referenceLabel: "Amazon EC2 Spot Instances",
    consoleUrl: "https://console.aws.amazon.com/ec2/home#SpotInstances:",
    consoleLabel: "EC2 > Spot Requests",
    diagram: "flowchart LR\n  Spare[AWS Spare Capacity] --> Spot[Spot Instance at a Discount]\n  Spot --> Notice[2-Minute Interruption Notice]\n  Notice --> Reclaim[AWS Reclaims Capacity]",
    cliExample: {
      description: "View recent Spot price history for an instance type",
      command: "aws ec2 describe-spot-price-history --instance-types t3.micro --product-descriptions Linux/UNIX --max-results 5",
      sampleOutput:
        "{\n  \"SpotPriceHistory\": [\n    {\n      \"AvailabilityZone\": \"us-east-1a\",\n      \"InstanceType\": \"t3.micro\",\n      \"ProductDescription\": \"Linux/UNIX\",\n      \"SpotPrice\": \"0.003100\",\n      \"Timestamp\": \"2026-03-14T09:12:41+00:00\"\n    },\n    {\n      \"AvailabilityZone\": \"us-east-1b\",\n      \"InstanceType\": \"t3.micro\",\n      \"ProductDescription\": \"Linux/UNIX\",\n      \"SpotPrice\": \"0.003300\",\n      \"Timestamp\": \"2026-03-14T08:47:10+00:00\"\n    }\n  ],\n  \"NextToken\": \"eyJ2IjoiMiIsImMiOiJ...\"\n}",
    },
  },
  {
    id: "bill3",
    domain: "billing-pricing-and-support",
    text: "A company plans to run a steady, predictable workload for the next three years and wants the lowest possible price for that commitment. Which pricing option best fits this need?",
    options: [
      { id: "a", text: "On-Demand Instances" },
      { id: "b", text: "Spot Instances" },
      { id: "c", text: "Reserved Instances or Savings Plans" },
      { id: "d", text: "Free Tier" },
    ],
    correctOptionIds: ["c"],
    explanation: "Reserved Instances and Savings Plans offer significant discounts in exchange for a committed usage term.",
    optionRationale: {
      a: "On-Demand carries no discount for a long-term commitment, so it isn't the cheapest choice for a known 3-year workload.",
      b: "Spot Instances suit flexible, interruptible workloads, not a workload that needs a guaranteed steady 3-year presence.",
      c: "Reserved Instances and Savings Plans both let you commit to 1 or 3 years of usage in exchange for the deepest discounts — ideal for predictable, steady workloads.",
      d: "Free Tier only covers limited usage for new accounts and doesn't apply to a sustained production workload.",
    },
    referenceUrl: "https://aws.amazon.com/savingsplans/",
    referenceLabel: "AWS Savings Plans",
    consoleUrl: "https://console.aws.amazon.com/costmanagement/home#/savings-plans/overview",
    consoleLabel: "Billing and Cost Management > Savings Plans",
    diagram: "flowchart LR\n  Steady[Steady Predictable Workload] --> Commit[1 or 3 Year Commitment] --> Discount[Reserved Instances or Savings Plans Discount]",
    cliExample: {
      description: "List available Reserved Instance offerings for an instance type",
      command: "aws ec2 describe-reserved-instances-offerings --instance-type t3.micro --product-description Linux/UNIX --max-results 5",
      sampleOutput:
        "{\n  \"ReservedInstancesOfferings\": [\n    {\n      \"ReservedInstancesOfferingId\": \"a6ce8269-7b8c-42cd-a7f5-0cd78f5f0b37\",\n      \"InstanceType\": \"t3.micro\",\n      \"AvailabilityZone\": \"us-east-1a\",\n      \"Duration\": 94608000,\n      \"FixedPrice\": 140.0,\n      \"UsagePrice\": 0.0,\n      \"ProductDescription\": \"Linux/UNIX\",\n      \"InstanceTenancy\": \"default\",\n      \"CurrencyCode\": \"USD\",\n      \"OfferingClass\": \"standard\",\n      \"OfferingType\": \"All Upfront\",\n      \"RecurringCharges\": [],\n      \"Marketplace\": false,\n      \"Scope\": \"Availability Zone\"\n    }\n  ],\n  \"NextToken\": \"eyJ2IjoiMiIsImMiOiJ...\"\n}",
    },
  },
  {
    id: "bill4",
    domain: "billing-pricing-and-support",
    text: "Which AWS service allows you to set custom cost and usage budgets and receive alerts when actual or forecasted costs exceed your thresholds?",
    options: [
      { id: "a", text: "AWS Cost Explorer" },
      { id: "b", text: "AWS Budgets" },
      { id: "c", text: "AWS Trusted Advisor" },
      { id: "d", text: "AWS Cost and Usage Report" },
    ],
    correctOptionIds: ["b"],
    explanation: "AWS Budgets lets you set custom cost and usage thresholds and alerts when they are exceeded or forecast to be exceeded.",
    optionRationale: {
      a: "Cost Explorer visualizes historical and forecasted costs but doesn't let you define alert thresholds.",
      b: "AWS Budgets lets you define custom cost, usage, RI, or Savings Plans budgets and sends alerts when actual or forecasted spend crosses your threshold.",
      c: "Trusted Advisor offers best-practice checks, including some cost checks, but it isn't a budgeting or alerting service.",
      d: "The Cost and Usage Report is a detailed data export, not an interactive budgeting or alerting tool.",
    },
    referenceUrl: "https://aws.amazon.com/aws-cost-management/aws-budgets/",
    referenceLabel: "AWS Budgets",
    consoleUrl: "https://console.aws.amazon.com/billing/home#/budgets",
    consoleLabel: "Billing and Cost Management > Budgets",
    diagram: "flowchart LR\n  Usage[AWS Usage and Billing Data] --> Explorer[AWS Cost Explorer]\n  Usage --> Budgets[AWS Budgets]\n  Budgets --> Alert[Budget Alert Notification]\n  Explorer --> Forecast[Cost Forecast]",
    cliExample: {
      description: "Retrieve the budgets configured for your account",
      command: "aws budgets describe-budgets --account-id $(aws sts get-caller-identity --query Account --output text)",
      sampleOutput:
        "{\n  \"Budgets\": [\n    {\n      \"BudgetName\": \"monthly-total-cost\",\n      \"BudgetLimit\": {\n        \"Amount\": \"500.0\",\n        \"Unit\": \"USD\"\n      },\n      \"CostTypes\": {\n        \"IncludeTax\": true,\n        \"IncludeSubscription\": true,\n        \"UseBlended\": false\n      },\n      \"TimeUnit\": \"MONTHLY\",\n      \"TimePeriod\": {\n        \"Start\": \"2026-01-01T00:00:00+00:00\",\n        \"End\": \"2087-06-15T00:00:00+00:00\"\n      },\n      \"CalculatedSpend\": {\n        \"ActualSpend\": {\n          \"Amount\": \"312.48\",\n          \"Unit\": \"USD\"\n        },\n        \"ForecastedSpend\": {\n          \"Amount\": \"468.10\",\n          \"Unit\": \"USD\"\n        }\n      },\n      \"BudgetType\": \"COST\",\n      \"LastUpdatedTime\": \"2026-03-14T07:00:12+00:00\"\n    }\n  ]\n}",
    },
  },
  {
    id: "bill5",
    domain: "billing-pricing-and-support",
    text: "Which AWS service provides visualization and analysis of your historical AWS spending and usage patterns?",
    options: [
      { id: "a", text: "AWS Budgets" },
      { id: "b", text: "AWS Cost Explorer" },
      { id: "c", text: "Amazon CloudWatch" },
      { id: "d", text: "AWS Organizations" },
    ],
    correctOptionIds: ["b"],
    explanation: "AWS Cost Explorer visualizes and analyzes historical AWS costs and usage patterns.",
    optionRationale: {
      a: "AWS Budgets sets thresholds and sends alerts; it isn't the visualization and analysis tool itself.",
      b: "AWS Cost Explorer gives you a visual, filterable view of historical costs and usage trends, plus basic forecasting.",
      c: "CloudWatch monitors operational metrics and logs, not billing and cost data.",
      d: "AWS Organizations manages multiple accounts and consolidated billing, but Cost Explorer is the dedicated spend-visualization tool.",
    },
    referenceUrl: "https://aws.amazon.com/aws-cost-management/aws-cost-explorer/",
    referenceLabel: "AWS Cost Explorer",
    consoleUrl: "https://console.aws.amazon.com/costmanagement/home#/cost-explorer",
    consoleLabel: "Billing and Cost Management > Cost Explorer",
    diagram: "flowchart LR\n  Data[Historical Billing Data] --> CE[AWS Cost Explorer] --> Viz[Interactive Cost and Usage Charts]",
    cliExample: {
      description: "Retrieve unblended cost and usage totals for a monthly period",
      command: "aws ce get-cost-and-usage --time-period Start=2024-01-01,End=2024-02-01 --granularity MONTHLY --metrics UnblendedCost",
      sampleOutput:
        "{\n  \"ResultsByTime\": [\n    {\n      \"TimePeriod\": {\n        \"Start\": \"2024-01-01\",\n        \"End\": \"2024-02-01\"\n      },\n      \"Total\": {\n        \"UnblendedCost\": {\n          \"Amount\": \"1427.36\",\n          \"Unit\": \"USD\"\n        }\n      },\n      \"Groups\": [],\n      \"Estimated\": false\n    }\n  ],\n  \"DimensionValueAttributes\": []\n}",
    },
  },
  {
    id: "bill6",
    domain: "billing-pricing-and-support",
    text: "What is a key benefit of using AWS Organizations' consolidated billing feature?",
    options: [
      { id: "a", text: "It combines usage across multiple accounts to potentially achieve volume pricing discounts, with a single bill" },
      { id: "b", text: "It grants every account root-level access to all resources" },
      { id: "c", text: "It automatically encrypts all account data" },
      { id: "d", text: "It eliminates the need for a payment method" },
    ],
    correctOptionIds: ["a"],
    explanation: "Consolidated billing combines usage from multiple accounts into a single bill and can unlock volume discounts.",
    optionRationale: {
      a: "Consolidated billing rolls usage from every linked account into one bill, combining volume to reach pricing tier and Savings Plans/RI discounts sooner.",
      b: "Consolidated billing doesn't grant cross-account root access; each account's access is still controlled independently through IAM and SCPs.",
      c: "Consolidated billing has nothing to do with encryption; encryption is configured per resource and service.",
      d: "The management account still needs a valid payment method — consolidated billing doesn't remove that requirement.",
    },
    referenceUrl: "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_introduction.html",
    referenceLabel: "AWS Organizations",
    consoleUrl: "https://console.aws.amazon.com/organizations/v2/home/accounts",
    consoleLabel: "AWS Organizations > AWS accounts",
    diagram: "flowchart TD\n  Mgmt[Management Account] --> A1[Member Account A]\n  Mgmt --> A2[Member Account B]\n  Mgmt --> A3[Member Account C]\n  A1 --> Bill[Single Consolidated Bill]\n  A2 --> Bill\n  A3 --> Bill",
    cliExample: {
      description: "List the member accounts included in an AWS Organization",
      command: "aws organizations list-accounts",
      sampleOutput:
        "{\n  \"Accounts\": [\n    {\n      \"Id\": \"123456789012\",\n      \"Arn\": \"arn:aws:organizations::123456789012:account/o-a1b2c3d4e5/123456789012\",\n      \"Email\": \"aws-management@example.com\",\n      \"Name\": \"Management\",\n      \"Status\": \"ACTIVE\",\n      \"JoinedMethod\": \"INVITED\",\n      \"JoinedTimestamp\": \"2025-11-02T10:15:30.412000+00:00\"\n    },\n    {\n      \"Id\": \"210987654321\",\n      \"Arn\": \"arn:aws:organizations::123456789012:account/o-a1b2c3d4e5/210987654321\",\n      \"Email\": \"aws-dev@example.com\",\n      \"Name\": \"Development\",\n      \"Status\": \"ACTIVE\",\n      \"JoinedMethod\": \"CREATED\",\n      \"JoinedTimestamp\": \"2026-01-18T14:02:11.905000+00:00\"\n    }\n  ]\n}",
    },
  },
  {
    id: "bill7",
    domain: "billing-pricing-and-support",
    text: "Which AWS Support plan is the only paid plan that includes access to a designated Technical Account Manager (TAM)?",
    options: [
      { id: "a", text: "Basic" },
      { id: "b", text: "Developer" },
      { id: "c", text: "Business" },
      { id: "d", text: "Enterprise" },
    ],
    correctOptionIds: ["d"],
    explanation: "Only the Enterprise Support plan includes a designated Technical Account Manager.",
    optionRationale: {
      a: "Basic Support is free and doesn't include a TAM or proactive guidance.",
      b: "Developer Support adds business-hours technical support but still has no TAM.",
      c: "Business Support adds 24/7 technical support and full Trusted Advisor checks, but a TAM is exclusive to Enterprise.",
      d: "Enterprise Support is the only tier that includes a designated Technical Account Manager for proactive, ongoing guidance.",
    },
    referenceUrl: "https://aws.amazon.com/premiumsupport/plans/",
    referenceLabel: "AWS Support Plans",
    consoleUrl: "https://console.aws.amazon.com/support/home#/",
    consoleLabel: "AWS Support Center",
    diagram: "flowchart BT\n  Basic[Basic Support Free] --> Developer[Developer Support]\n  Developer --> Business[Business Support]\n  Business --> Enterprise[Enterprise Support with TAM]",
    cliExample: {
      description: "List the case severity levels available under your support plan",
      command: "aws support describe-severity-levels",
      sampleOutput:
        "{\n  \"severityLevels\": [\n    {\n      \"code\": \"low\",\n      \"name\": \"Low\"\n    },\n    {\n      \"code\": \"normal\",\n      \"name\": \"Normal\"\n    },\n    {\n      \"code\": \"high\",\n      \"name\": \"High\"\n    },\n    {\n      \"code\": \"urgent\",\n      \"name\": \"Urgent\"\n    },\n    {\n      \"code\": \"critical\",\n      \"name\": \"Critical\"\n    }\n  ]\n}",
    },
  },
  {
    id: "bill8",
    domain: "billing-pricing-and-support",
    text: "A startup wants free access to basic account and billing support, along with access to AWS Trusted Advisor's core checks, without paying for a support plan. Which support plan provides this?",
    options: [
      { id: "a", text: "Basic Support" },
      { id: "b", text: "Developer Support" },
      { id: "c", text: "Business Support" },
      { id: "d", text: "Enterprise Support" },
    ],
    correctOptionIds: ["a"],
    explanation: "Basic Support is free for all AWS customers and includes core Trusted Advisor checks and account/billing support.",
    optionRationale: {
      a: "Basic Support is included free with every AWS account and provides account/billing support plus the core Trusted Advisor checks.",
      b: "Developer Support is a paid plan aimed at testing and early-stage production use, not a free tier.",
      c: "Business Support is a paid, 24/7 plan for production workloads, well beyond a free basic offering.",
      d: "Enterprise Support is the highest, paid tier with a TAM — not a free option.",
    },
    referenceUrl: "https://aws.amazon.com/premiumsupport/plans/",
    referenceLabel: "AWS Support Plans",
    consoleUrl: "https://console.aws.amazon.com/support/home#/",
    consoleLabel: "AWS Support Center",
    diagram: "flowchart LR\n  Basic[Basic Support: Free] --> AccountBilling[Account and Billing Support]\n  Basic --> CoreTA[Core Trusted Advisor Checks]",
    cliExample: {
      description: "List Trusted Advisor checks available to your account (requires a Business or Enterprise support plan)",
      command: "aws support describe-trusted-advisor-checks --language en",
      sampleOutput:
        "{\n  \"checks\": [\n    {\n      \"id\": \"Qch7DwouX1\",\n      \"name\": \"Low Utilization Amazon EC2 Instances\",\n      \"description\": \"Checks the Amazon EC2 instances that were running at any time during the last 14 days...\",\n      \"category\": \"cost_optimizing\",\n      \"metadata\": [\n        \"Region/AZ\",\n        \"Instance ID\",\n        \"Instance Name\",\n        \"Instance Type\",\n        \"Estimated Monthly Savings\"\n      ]\n    },\n    {\n      \"id\": \"Pfx0RwqBli\",\n      \"name\": \"Amazon S3 Bucket Permissions\",\n      \"description\": \"Checks buckets in Amazon S3 that have open access permissions...\",\n      \"category\": \"security\",\n      \"metadata\": [\n        \"Region Name\",\n        \"Region API Parameter\",\n        \"Bucket Name\",\n        \"ACL Allows List\",\n        \"ACL Allows Upload/Delete\",\n        \"Status\",\n        \"Policy Allows Access\"\n      ]\n    }\n  ]\n}",
    },
  },
  {
    id: "bill9",
    domain: "billing-pricing-and-support",
    text: "Which tool helps prospective and current AWS customers estimate the monthly cost of AWS services before deploying them?",
    options: [
      { id: "a", text: "AWS Cost Explorer" },
      { id: "b", text: "AWS Pricing Calculator" },
      { id: "c", text: "AWS Budgets" },
      { id: "d", text: "AWS Trusted Advisor" },
    ],
    correctOptionIds: ["b"],
    explanation: "AWS Pricing Calculator estimates the cost of AWS services before you deploy them.",
    optionRationale: {
      a: "Cost Explorer analyzes costs you've already incurred, not a pre-deployment cost estimate.",
      b: "AWS Pricing Calculator lets you model the cost of a planned architecture before you deploy any of it.",
      c: "AWS Budgets tracks and alerts on spend after usage starts, not a pre-deployment estimator.",
      d: "Trusted Advisor reviews your existing account for best practices; it doesn't estimate costs for services you haven't deployed.",
    },
    referenceUrl: "https://calculator.aws/",
    referenceLabel: "AWS Pricing Calculator",
    consoleUrl: "https://calculator.aws/#/",
    consoleLabel: "AWS Pricing Calculator",
    diagram: "flowchart LR\n  Plan[Planned Architecture] --> Calc[AWS Pricing Calculator] --> Estimate[Monthly Cost Estimate]",
  },
  {
    id: "bill10",
    domain: "billing-pricing-and-support",
    text: "Which TWO of the following can help reduce AWS costs?",
    options: [
      { id: "a", text: "Using Reserved Instances or Savings Plans for steady-state workloads" },
      { id: "b", text: "Using Spot Instances for fault-tolerant, flexible workloads" },
      { id: "c", text: "Always choosing On-Demand pricing regardless of workload" },
      { id: "d", text: "Ignoring AWS Budgets alerts" },
      { id: "e", text: "Provisioning maximum capacity at all times 'just in case'" },
    ],
    correctOptionIds: ["a", "b"],
    explanation: "Matching commitment-based pricing to steady workloads and Spot to flexible ones are common cost-reduction strategies.",
    optionRationale: {
      a: "Matching Reserved Instances or Savings Plans to steady-state workloads locks in a lower rate in exchange for commitment, cutting cost for predictable usage.",
      b: "Spot Instances can cut compute costs by up to 90% for workloads that tolerate interruption, such as batch jobs or fault-tolerant distributed processing.",
      c: "Always using On-Demand regardless of workload shape means paying the highest rate even for steady usage, which increases cost rather than reducing it.",
      d: "Ignoring Budgets alerts removes your early warning for overspend, which tends to increase costs, not reduce them.",
      e: "Provisioning maximum capacity 'just in case' wastes money on unused resources instead of scaling to actual demand.",
    },
    referenceUrl: "https://aws.amazon.com/aws-cost-management/",
    referenceLabel: "AWS Cost Management",
    diagram: "flowchart TD\n  Reduce[Reduce AWS Costs] --> Steady[Steady Workloads] --> RI[Reserved Instances or Savings Plans]\n  Reduce --> Flexible[Flexible, Fault-Tolerant Workloads] --> Spot[Spot Instances]",
    cliExample: {
      description: "Get EC2 right-sizing recommendations to help cut costs",
      command: "aws compute-optimizer get-ec2-instance-recommendations",
      sampleOutput:
        "{\n  \"instanceRecommendations\": [\n    {\n      \"instanceArn\": \"arn:aws:ec2:us-east-1:123456789012:instance/i-0abcd1234efgh5678\",\n      \"accountId\": \"123456789012\",\n      \"instanceName\": \"web-1\",\n      \"currentInstanceType\": \"m5.xlarge\",\n      \"finding\": \"OVER_PROVISIONED\",\n      \"findingReasonCodes\": [\n        \"CPUOverprovisioned\",\n        \"MemoryOverprovisioned\"\n      ],\n      \"utilizationMetrics\": [\n        {\n          \"name\": \"CPU\",\n          \"statistic\": \"MAXIMUM\",\n          \"value\": 11.4\n        }\n      ],\n      \"lookBackPeriodInDays\": 14.0,\n      \"recommendationOptions\": [\n        {\n          \"instanceType\": \"m5.large\",\n          \"performanceRisk\": 1.0,\n          \"rank\": 1\n        },\n        {\n          \"instanceType\": \"t3.large\",\n          \"performanceRisk\": 2.0,\n          \"rank\": 2\n        }\n      ],\n      \"lastRefreshTimestamp\": \"2026-03-14T06:30:00+00:00\",\n      \"currentPerformanceRisk\": \"VeryLow\"\n    }\n  ],\n  \"errors\": []\n}",
    },
  },
  {
    id: "bill11",
    domain: "billing-pricing-and-support",
    text: "Which TWO of the following are ways to organize and track AWS costs across teams or projects?",
    options: [
      { id: "a", text: "Cost allocation tags" },
      { id: "b", text: "AWS Organizations with consolidated billing" },
      { id: "c", text: "Deleting the AWS Cost and Usage Report" },
      { id: "d", text: "Disabling AWS Budgets" },
      { id: "e", text: "Sharing root account credentials" },
    ],
    correctOptionIds: ["a", "b"],
    explanation: "Cost allocation tags and consolidated billing under AWS Organizations both help attribute and track spend across teams.",
    optionRationale: {
      a: "Cost allocation tags label resources by team, project, or environment so spend can be broken down in Cost Explorer and the Cost and Usage Report.",
      b: "AWS Organizations with consolidated billing groups accounts — for example by team or project — under one management account, making it easy to track spend per account.",
      c: "Deleting the Cost and Usage Report removes a key source of detailed billing data, which hurts cost tracking rather than helping it.",
      d: "Disabling Budgets removes cost alerting, making it harder, not easier, to track and control spend.",
      e: "Sharing root account credentials is a security anti-pattern and has nothing to do with organizing or tracking costs.",
    },
    referenceUrl: "https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/cost-alloc-tags.html",
    referenceLabel: "Cost Allocation Tags",
    consoleUrl: "https://console.aws.amazon.com/billing/home#/tags",
    consoleLabel: "Billing and Cost Management > Cost allocation tags",
    diagram: "flowchart TD\n  Track[Track Cost by Team or Project] --> Tags[Cost Allocation Tags]\n  Track --> Orgs[AWS Organizations Consolidated Billing]",
    cliExample: {
      description: "Retrieve cost and usage grouped by a cost allocation tag",
      command:
        "aws ce get-cost-and-usage --time-period Start=2024-01-01,End=2024-02-01 --granularity MONTHLY --metrics UnblendedCost --group-by Type=TAG,Key=Project",
      sampleOutput:
        "{\n  \"GroupDefinitions\": [\n    {\n      \"Type\": \"TAG\",\n      \"Key\": \"Project\"\n    }\n  ],\n  \"ResultsByTime\": [\n    {\n      \"TimePeriod\": {\n        \"Start\": \"2024-01-01\",\n        \"End\": \"2024-02-01\"\n      },\n      \"Total\": {},\n      \"Groups\": [\n        {\n          \"Keys\": [\n            \"Project$checkout\"\n          ],\n          \"Metrics\": {\n            \"UnblendedCost\": {\n              \"Amount\": \"612.90\",\n              \"Unit\": \"USD\"\n            }\n          }\n        },\n        {\n          \"Keys\": [\n            \"Project$analytics\"\n          ],\n          \"Metrics\": {\n            \"UnblendedCost\": {\n              \"Amount\": \"389.15\",\n              \"Unit\": \"USD\"\n            }\n          }\n        }\n      ],\n      \"Estimated\": false\n    }\n  ],\n  \"DimensionValueAttributes\": []\n}",
    },
  },
  {
    id: "bill12",
    domain: "billing-pricing-and-support",
    text: "A company runs a steady compute workload but expects to move some of it from EC2 to AWS Fargate and AWS Lambda over the next year, and may also change instance families and Regions. It wants a 1-year commitment discount that keeps applying as the workload shifts. Which purchasing option best meets these requirements?",
    options: [
      { id: "a", text: "Compute Savings Plan" },
      { id: "b", text: "EC2 Instance Savings Plan" },
      { id: "c", text: "Standard Reserved Instances" },
      { id: "d", text: "Spot Instances" },
    ],
    correctOptionIds: ["a"],
    explanation: "Compute Savings Plans commit to an hourly dollar spend and apply automatically across EC2 instance families, sizes, Regions, operating systems, and tenancy, as well as Fargate and Lambda usage.",
    optionRationale: {
      a: "A Compute Savings Plan is the most flexible commitment option: the discount follows usage across any EC2 instance family, size, Region, OS, and tenancy, and also covers AWS Fargate and AWS Lambda, so it keeps applying as the workload migrates.",
      b: "An EC2 Instance Savings Plan offers a deeper discount but is locked to a specific instance family within a single Region and does not cover Fargate or Lambda, so it wouldn't follow the migration.",
      c: "Standard Reserved Instances are tied to a specific instance type, Region, and platform, and cannot be applied to Fargate or Lambda usage.",
      d: "Spot Instances are interruptible spare capacity with no commitment; they don't provide a commitment-based discount for a steady workload and don't apply to Fargate or Lambda.",
    },
    referenceUrl: "https://docs.aws.amazon.com/savingsplans/latest/userguide/what-is-savings-plans.html",
    referenceLabel: "What are Savings Plans?",
    consoleUrl: "https://console.aws.amazon.com/costmanagement/home#/savings-plans/overview",
    consoleLabel: "Billing and Cost Management > Savings Plans",
    diagram: "flowchart LR\n  Commit[1 or 3 Year Hourly Spend Commitment] --> CSP[Compute Savings Plan]\n  CSP --> EC2[Any EC2 Family, Size, Region, OS]\n  CSP --> Fargate[AWS Fargate]\n  CSP --> Lambda[AWS Lambda]\n  Commit --> ESP[EC2 Instance Savings Plan]\n  ESP --> Family[One Instance Family in One Region]",
    cliExample: {
      description: "Retrieve Savings Plans purchase recommendations for a 1-year, no-upfront Compute Savings Plan",
      command: "aws ce get-savings-plans-purchase-recommendation --savings-plans-type COMPUTE_SP --term-in-years ONE_YEAR --payment-option NO_UPFRONT --lookback-period-in-days THIRTY_DAYS",
      sampleOutput:
        "{\n  \"Metadata\": {\n    \"RecommendationId\": \"9f2c1a4e-5b6d-4c7e-8f90-1a2b3c4d5e6f\",\n    \"GenerationTimestamp\": \"2026-03-14T05:12:44Z\"\n  },\n  \"SavingsPlansPurchaseRecommendation\": {\n    \"AccountScope\": \"PAYER\",\n    \"SavingsPlansType\": \"COMPUTE_SP\",\n    \"TermInYears\": \"ONE_YEAR\",\n    \"PaymentOption\": \"NO_UPFRONT\",\n    \"LookbackPeriodInDays\": \"THIRTY_DAYS\",\n    \"SavingsPlansPurchaseRecommendationDetails\": [\n      {\n        \"SavingsPlansDetails\": {\n          \"Region\": \"us-east-1\",\n          \"OfferingId\": \"a1b2c3d4-e5f6-7890-abcd-ef1234567890\"\n        },\n        \"AccountId\": \"123456789012\",\n        \"HourlyCommitmentToPurchase\": \"1.25\",\n        \"EstimatedMonthlySavingsAmount\": \"214.62\",\n        \"EstimatedSavingsPercentage\": \"23.8\",\n        \"EstimatedOnDemandCost\": \"901.77\",\n        \"CurrencyCode\": \"USD\"\n      }\n    ],\n    \"SavingsPlansPurchaseRecommendationSummary\": {\n      \"EstimatedTotalCost\": \"687.15\",\n      \"TotalRecommendationCount\": \"1\",\n      \"CurrencyCode\": \"USD\"\n    }\n  }\n}",
    },
  },
  {
    id: "bill13",
    domain: "billing-pricing-and-support",
    text: "A company is preparing to launch a production workload on AWS. It needs 24/7 phone, chat, and email access to Cloud Support Engineers and a response time of one hour or less for production system down cases, but it does not need a Technical Account Manager. Which AWS Support plan is the lowest-cost option that meets these requirements?",
    options: [
      { id: "a", text: "Basic Support" },
      { id: "b", text: "Developer Support" },
      { id: "c", text: "Business Support" },
      { id: "d", text: "Enterprise Support" },
    ],
    correctOptionIds: ["c"],
    explanation: "Business Support is the lowest-cost plan that provides 24/7 phone, chat, and email access to Cloud Support Engineers, with a response time of less than one hour for production system down cases and full Trusted Advisor checks.",
    optionRationale: {
      a: "Basic Support is free but only covers account and billing questions plus core Trusted Advisor checks; it provides no technical support cases at all.",
      b: "Developer Support offers business-hours email access to Cloud Support Associates with a 12-hour response for system impaired cases; it has no 24/7 phone or chat access and no production-down SLA.",
      c: "Business Support provides 24/7 phone, chat, and email access to Cloud Support Engineers, with a response time of less than 1 hour for production system down cases and less than 4 hours for production system impaired cases — the lowest-cost plan that meets the requirements.",
      d: "Enterprise Support (and Enterprise On-Ramp) would also meet the response-time requirement, adding a 15-minute business-critical response and a TAM, but at a much higher cost than needed.",
    },
    referenceUrl: "https://aws.amazon.com/premiumsupport/plans/",
    referenceLabel: "Compare AWS Support Plans",
    consoleUrl: "https://console.aws.amazon.com/support/home#/",
    consoleLabel: "AWS Support Center",
    diagram: "flowchart TD\n  Dev[Developer: Business Hours Email] --> DevSLA[System Impaired < 12 hrs]\n  Biz[Business: 24/7 Phone, Chat, Email] --> BizSLA[Production Down < 1 hr]\n  Ramp[Enterprise On-Ramp: 24/7 + Pool of TAMs] --> RampSLA[Business-Critical Down < 30 min]\n  Ent[Enterprise: 24/7 + Designated TAM] --> EntSLA[Business-Critical Down < 15 min]",
    cliExample: {
      description: "Open a high-severity support case (requires a Business, Enterprise On-Ramp, or Enterprise support plan)",
      command: "aws support create-case --subject \"Production API unavailable\" --service-code amazon-elastic-compute-cloud-linux --severity-code urgent --category-code other --communication-body \"Production instances are unreachable since 09:00 UTC.\"",
      sampleOutput:
        "{\n  \"caseId\": \"case-123456789012-muen-2026-9f2c1a4e5b6d4c7e\"\n}",
    },
  },
  {
    id: "bill14",
    domain: "billing-pricing-and-support",
    text: "A startup is reviewing its first AWS bill and wants to understand which data transfer charges to expect. Which TWO statements about AWS data transfer pricing are correct?",
    options: [
      { id: "a", text: "Data transferred into AWS from the internet is generally free of charge" },
      { id: "b", text: "Data transferred out from AWS to the internet is charged per GB" },
      { id: "c", text: "Data transferred between AWS Regions is always free" },
      { id: "d", text: "Data transferred out to the internet is free for the first 10 TB every month regardless of service" },
      { id: "e", text: "Uploading objects to Amazon S3 from on-premises incurs a per-GB inbound transfer charge" },
    ],
    correctOptionIds: ["a", "b"],
    explanation: "Inbound data transfer from the internet to AWS is free, while outbound data transfer from AWS to the internet and transfer between Regions is charged per GB.",
    optionRationale: {
      a: "Inbound data transfer from the internet into AWS services such as EC2 and S3 is free; AWS charges primarily for data leaving its network.",
      b: "Outbound data transfer from AWS to the internet is billed per GB on a tiered schedule, which is why architectures often use CloudFront or keep traffic inside a Region to lower costs.",
      c: "Cross-Region data transfer (for example, S3 Cross-Region Replication or inter-Region VPC peering) is charged per GB; it is not free.",
      d: "The AWS Free Tier includes 100 GB of free outbound data transfer per month across services (and 1 TB from CloudFront), not 10 TB regardless of service.",
      e: "Uploading (inbound transfer) to S3 is free; you pay for storage and requests, not for the inbound bytes.",
    },
    referenceUrl: "https://aws.amazon.com/blogs/aws/aws-free-tier-data-transfer-expansion-100-gb-from-regions-and-1-tb-from-amazon-cloudfront-per-month/",
    referenceLabel: "AWS Free Tier Data Transfer Expansion",
    diagram: "flowchart LR\n  Internet[Internet] -->|Inbound: Free| AWS[AWS Region]\n  AWS -->|Outbound: Charged per GB| Internet\n  AWS -->|Cross-Region: Charged per GB| Region2[Another AWS Region]",
    cliExample: {
      description: "Retrieve monthly cost filtered to data transfer usage types",
      command: "aws ce get-cost-and-usage --time-period Start=2024-01-01,End=2024-02-01 --granularity MONTHLY --metrics UnblendedCost --filter '{\"Dimensions\":{\"Key\":\"USAGE_TYPE_GROUP\",\"Values\":[\"EC2: Data Transfer - Internet (Out)\"]}}'",
      sampleOutput:
        "{\n  \"ResultsByTime\": [\n    {\n      \"TimePeriod\": {\n        \"Start\": \"2024-01-01\",\n        \"End\": \"2024-02-01\"\n      },\n      \"Total\": {\n        \"UnblendedCost\": {\n          \"Amount\": \"142.37\",\n          \"Unit\": \"USD\"\n        }\n      },\n      \"Groups\": [],\n      \"Estimated\": false\n    }\n  ],\n  \"DimensionValueAttributes\": []\n}",
    },
  },
  {
    id: "bill15",
    domain: "billing-pricing-and-support",
    text: "A company must migrate a Windows Server workload that is licensed per physical socket and per core under an existing enterprise agreement. Compliance auditors require visibility into the specific physical server the licenses are bound to. Which EC2 tenancy option should the company choose?",
    options: [
      { id: "a", text: "Dedicated Instances" },
      { id: "b", text: "Dedicated Hosts" },
      { id: "c", text: "Spot Instances with default tenancy" },
      { id: "d", text: "On-Demand Instances with a placement group" },
    ],
    correctOptionIds: ["b"],
    explanation: "Dedicated Hosts give you an entire physical server with visibility into sockets and cores, which is what per-socket or per-core Bring Your Own License (BYOL) agreements require. Dedicated Instances also run on single-tenant hardware but do not expose the underlying host, so they cannot satisfy socket- or core-based licensing.",
    optionRationale: {
      a: "Dedicated Instances run on hardware dedicated to your account, but AWS may move them between hosts and you cannot see sockets, cores, or host IDs, so they don't support socket- or core-bound licenses.",
      b: "A Dedicated Host is a physical server allocated to you; you can see its sockets, cores, and host ID, place instances on it deliberately, and use it for BYOL Windows Server, SQL Server, or other socket-bound licenses.",
      c: "Spot Instances use shared (default) tenancy and can be interrupted; they provide no isolation or hardware visibility for licensing.",
      d: "A placement group controls instance proximity for networking, not tenancy; it doesn't isolate hardware or expose physical server details.",
    },
    referenceUrl: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/dedicated-hosts-overview.html",
    referenceLabel: "Amazon EC2 Dedicated Hosts",
    consoleUrl: "https://console.aws.amazon.com/ec2/home#Hosts:",
    consoleLabel: "EC2 > Dedicated Hosts",
    diagram: `flowchart TD
  Need{Single-Tenant Requirement?} --> Lic[Per-Socket or Per-Core BYOL] --> Host[Dedicated Host: Physical Server Visible]
  Need --> Iso[Isolation Only, No License Binding] --> DI[Dedicated Instance: Hardware Not Exposed]
  Need --> None[No Isolation Needed] --> Shared[Default Shared Tenancy]`,
    cliExample: {
      description: "Allocate a Dedicated Host for a specific instance family in one Availability Zone",
      command: "aws ec2 allocate-hosts --instance-family m5 --availability-zone us-east-1a --quantity 1 --auto-placement off",
      sampleOutput:
        "{\n  \"HostIds\": [\n    \"h-0123456789abcdef0\"\n  ]\n}",
    },
  },
  {
    id: "bill16",
    domain: "billing-pricing-and-support",
    text: "A finance team needs the most detailed billing data AWS can provide, broken down by hour, resource ID, and cost allocation tag, delivered as files to an Amazon S3 bucket so they can load it into their own data warehouse. Which tool should they use?",
    options: [
      { id: "a", text: "AWS Cost Explorer" },
      { id: "b", text: "AWS Cost and Usage Report (CUR)" },
      { id: "c", text: "AWS Budgets" },
      { id: "d", text: "AWS Pricing Calculator" },
    ],
    correctOptionIds: ["b"],
    explanation: "The AWS Cost and Usage Report is the most comprehensive set of cost and usage data available. It is delivered to an S3 bucket at up to hourly granularity with resource-level line items and tag columns, and can be queried with Athena, Redshift, or QuickSight.",
    optionRationale: {
      a: "Cost Explorer is an interactive console tool for visualizing spend; it doesn't deliver raw, resource-level line items to S3 for external analysis.",
      b: "The Cost and Usage Report delivers the most granular billing data (hourly, per-resource, per-tag line items) as CSV or Parquet files to an S3 bucket you own, which is ideal for loading into a warehouse.",
      c: "AWS Budgets tracks thresholds and sends alerts; it isn't a detailed billing data export.",
      d: "AWS Pricing Calculator estimates costs for planned architectures and has no visibility into actual usage.",
    },
    referenceUrl: "https://docs.aws.amazon.com/cur/latest/userguide/what-is-cur.html",
    referenceLabel: "What are AWS Cost and Usage Reports?",
    consoleUrl: "https://console.aws.amazon.com/billing/home#/reports",
    consoleLabel: "Billing and Cost Management > Cost and Usage Reports",
    diagram: `flowchart LR
  Bill[AWS Billing Data] --> CUR[Cost and Usage Report]
  CUR -->|Hourly, per-resource, per-tag CSV or Parquet| S3[Amazon S3 Bucket]
  S3 --> Athena[Amazon Athena]
  S3 --> Redshift[Amazon Redshift]
  S3 --> QS[Amazon QuickSight]`,
    cliExample: {
      description: "List the Cost and Usage Report definitions configured for the account",
      command: "aws cur describe-report-definitions --region us-east-1",
      sampleOutput:
        "{\n  \"ReportDefinitions\": [\n    {\n      \"ReportName\": \"hourly-cur-parquet\",\n      \"TimeUnit\": \"HOURLY\",\n      \"Format\": \"Parquet\",\n      \"Compression\": \"Parquet\",\n      \"AdditionalSchemaElements\": [\n        \"RESOURCES\"\n      ],\n      \"S3Bucket\": \"example-billing-reports\",\n      \"S3Prefix\": \"cur/\",\n      \"S3Region\": \"us-east-1\",\n      \"AdditionalArtifacts\": [\n        \"ATHENA\"\n      ],\n      \"RefreshClosedReports\": true,\n      \"ReportVersioning\": \"OVERWRITE_REPORT\"\n    }\n  ]\n}",
    },
  },
  {
    id: "bill17",
    domain: "billing-pricing-and-support",
    text: "A company's monthly AWS bill has been stable for a year, but last week a misconfigured job started launching hundreds of instances, and nobody noticed until the invoice arrived. The company wants a service that uses machine learning to automatically detect unusual spend patterns and notify the team as they happen, without having to predefine spending limits. Which service should it enable?",
    options: [
      { id: "a", text: "AWS Cost Anomaly Detection" },
      { id: "b", text: "AWS Budgets" },
      { id: "c", text: "AWS Trusted Advisor" },
      { id: "d", text: "Amazon CloudWatch billing alarms" },
    ],
    correctOptionIds: ["a"],
    explanation: "AWS Cost Anomaly Detection uses machine learning to learn your normal spend patterns and flags unexpected increases, sending alerts by email or Amazon SNS. Unlike Budgets or billing alarms, it doesn't require you to set a fixed threshold in advance.",
    optionRationale: {
      a: "Cost Anomaly Detection continuously monitors cost and usage, learns baseline patterns with ML, and alerts you to anomalies along with their root cause (service, account, or tag) without predefined thresholds.",
      b: "AWS Budgets alerts only when spend crosses a threshold you define ahead of time; it doesn't learn patterns or catch anomalies below that limit.",
      c: "Trusted Advisor runs best-practice checks such as idle resources, but it is not a real-time anomaly detection or spend-alerting service.",
      d: "CloudWatch billing alarms trigger on a fixed EstimatedCharges threshold you set; they don't use ML or detect unusual patterns automatically.",
    },
    referenceUrl: "https://docs.aws.amazon.com/cost-management/latest/userguide/manage-ad.html",
    referenceLabel: "Detecting unusual spend with AWS Cost Anomaly Detection",
    consoleUrl: "https://console.aws.amazon.com/costmanagement/home#/anomaly-detection/overview",
    consoleLabel: "Billing and Cost Management > Cost Anomaly Detection",
    diagram: `flowchart LR
  Spend[Daily Cost and Usage] --> ML[Cost Anomaly Detection ML Model]
  ML --> Baseline[Learned Normal Spend Pattern]
  ML --> Anomaly[Unexpected Spike Detected]
  Anomaly --> Alert[Email or SNS Alert with Root Cause]`,
    cliExample: {
      description: "List cost anomalies detected over a date range",
      command: "aws ce get-anomalies --date-interval StartDate=2026-03-01,EndDate=2026-03-14 --max-results 5",
      sampleOutput:
        "{\n  \"Anomalies\": [\n    {\n      \"AnomalyId\": \"a1b2c3d4-e5f6-7890-abcd-ef1234567890\",\n      \"AnomalyStartDate\": \"2026-03-09T00:00:00Z\",\n      \"AnomalyEndDate\": \"2026-03-11T00:00:00Z\",\n      \"DimensionValue\": \"Amazon Elastic Compute Cloud - Compute\",\n      \"RootCauses\": [\n        {\n          \"Service\": \"Amazon Elastic Compute Cloud - Compute\",\n          \"Region\": \"us-east-1\",\n          \"LinkedAccount\": \"123456789012\",\n          \"UsageType\": \"BoxUsage:c5.4xlarge\"\n        }\n      ],\n      \"AnomalyScore\": {\n        \"MaxScore\": 0.93,\n        \"CurrentScore\": 0.88\n      },\n      \"Impact\": {\n        \"MaxImpact\": 2140.55,\n        \"TotalImpact\": 4327.10,\n        \"TotalActualSpend\": 5102.40,\n        \"TotalExpectedSpend\": 775.30,\n        \"TotalImpactPercentage\": 558.1\n      },\n      \"MonitorArn\": \"arn:aws:ce::123456789012:anomalymonitor/9f2c1a4e-5b6d-4c7e-8f90-1a2b3c4d5e6f\",\n      \"Feedback\": \"YES\"\n    }\n  ]\n}",
    },
  },
  {
    id: "bill18",
    domain: "billing-pricing-and-support",
    text: "A company on the Business Support plan wants to use the full set of AWS Trusted Advisor checks to review its account against AWS best practices. Which TWO of the following are check categories that Trusted Advisor provides?",
    options: [
      { id: "a", text: "Cost optimization" },
      { id: "b", text: "Fault tolerance" },
      { id: "c", text: "Application code review" },
      { id: "d", text: "Invoice dispute resolution" },
      { id: "e", text: "Database schema design" },
    ],
    correctOptionIds: ["a", "b"],
    explanation: "Trusted Advisor inspects your AWS environment and makes recommendations in these categories: cost optimization, performance, security, fault tolerance, service limits (service quotas), and operational excellence. Basic and Developer plans get a core subset of security and service-limit checks; Business, Enterprise On-Ramp, and Enterprise plans get the full set.",
    optionRationale: {
      a: "Cost optimization is a Trusted Advisor category, with checks such as Low Utilization EC2 Instances, Idle Load Balancers, and Unassociated Elastic IPs.",
      b: "Fault tolerance is a Trusted Advisor category, with checks such as EBS snapshots, Multi-AZ RDS, and Auto Scaling group health checks.",
      c: "Trusted Advisor does not review application source code; that would be a job for tools such as Amazon CodeGuru or manual review.",
      d: "Invoice disputes are handled through AWS Support billing cases, not Trusted Advisor checks.",
      e: "Trusted Advisor doesn't analyze database schema design; it reports on account-level configuration and resource usage.",
    },
    referenceUrl: "https://docs.aws.amazon.com/awssupport/latest/user/trusted-advisor.html",
    referenceLabel: "AWS Trusted Advisor",
    consoleUrl: "https://console.aws.amazon.com/trustedadvisor/home#/dashboard",
    consoleLabel: "Trusted Advisor > Dashboard",
    diagram: `flowchart TD
  TA[AWS Trusted Advisor] --> Cost[Cost Optimization]
  TA --> Perf[Performance]
  TA --> Sec[Security]
  TA --> FT[Fault Tolerance]
  TA --> Limits[Service Limits]
  TA --> Ops[Operational Excellence]
  Plan{Support Plan} -->|Basic or Developer| Core[Core Checks Only]
  Plan -->|Business, On-Ramp, Enterprise| Full[All Checks + API Access]`,
    cliExample: {
      description: "Refresh and summarize a Trusted Advisor check (requires Business, Enterprise On-Ramp, or Enterprise support)",
      command: "aws support describe-trusted-advisor-check-summaries --check-ids Qch7DwouX1 --region us-east-1",
      sampleOutput:
        "{\n  \"summaries\": [\n    {\n      \"checkId\": \"Qch7DwouX1\",\n      \"timestamp\": \"2026-03-14T06:15:22Z\",\n      \"status\": \"warning\",\n      \"hasFlaggedResources\": true,\n      \"resourcesSummary\": {\n        \"resourcesProcessed\": 42,\n        \"resourcesFlagged\": 6,\n        \"resourcesIgnored\": 0,\n        \"resourcesSuppressed\": 0\n      },\n      \"categorySpecificSummary\": {\n        \"costOptimizing\": {\n          \"estimatedMonthlySavings\": 318.72,\n          \"estimatedPercentMonthlySavings\": 0.11\n        }\n      }\n    }\n  ]\n}",
    },
  },
  {
    id: "bill19",
    domain: "billing-pricing-and-support",
    text: "A company wants to deploy a third-party firewall appliance from a commercial vendor on AWS. It prefers to launch the vendor's pre-configured AMI with a few clicks and have the software subscription charges appear on its regular AWS bill rather than signing a separate contract with the vendor. Which AWS offering meets these requirements?",
    options: [
      { id: "a", text: "AWS Marketplace" },
      { id: "b", text: "AWS Partner Network (APN)" },
      { id: "c", text: "AWS Professional Services" },
      { id: "d", text: "AWS Service Catalog" },
    ],
    correctOptionIds: ["a"],
    explanation: "AWS Marketplace is a curated digital catalog of third-party software, data, and services. Products such as AMIs, containers, and SaaS can be launched directly, and the software fees are consolidated into your AWS bill.",
    optionRationale: {
      a: "AWS Marketplace lets you find, subscribe to, and deploy third-party software (including pre-built AMIs) with software charges billed through your AWS account.",
      b: "The AWS Partner Network is a program for consulting and technology partners; it isn't a storefront for purchasing and deploying software.",
      c: "AWS Professional Services is a team of AWS consultants that helps with migrations and architecture; it doesn't sell third-party appliances.",
      d: "AWS Service Catalog lets an organization publish approved CloudFormation products internally; it isn't where you buy vendor software through the AWS bill.",
    },
    referenceUrl: "https://docs.aws.amazon.com/marketplace/latest/buyerguide/what-is-marketplace.html",
    referenceLabel: "What is AWS Marketplace?",
    consoleUrl: "https://console.aws.amazon.com/marketplace/home#/subscriptions",
    consoleLabel: "AWS Marketplace > Manage subscriptions",
    diagram: `flowchart LR
  Vendor[Third-Party Software Vendor] --> MP[AWS Marketplace Listing]
  MP -->|Subscribe and launch AMI| EC2[EC2 Instance Running Appliance]
  MP -->|Software fees| Bill[Single Consolidated AWS Bill]`,
    cliExample: {
      description: "List the AWS Marketplace products your account has subscribed to",
      command: "aws marketplace-catalog list-entities --catalog AWSMarketplace --entity-type Offer --region us-east-1",
      sampleOutput:
        "{\n  \"EntitySummaryList\": [\n    {\n      \"Name\": \"Fortinet FortiGate Next-Gen Firewall\",\n      \"EntityType\": \"Offer\",\n      \"EntityId\": \"offer-1a2b3c4d5e6f7\",\n      \"EntityArn\": \"arn:aws:aws-marketplace:us-east-1:123456789012:AWSMarketplace/Offer/offer-1a2b3c4d5e6f7\",\n      \"LastModifiedDate\": \"2026-02-20T11:04:53Z\",\n      \"Visibility\": \"Public\"\n    }\n  ]\n}",
    },
  },
  {
    id: "bill20",
    domain: "billing-pricing-and-support",
    text: "A developer on an account with only Basic Support has a general question about how to structure a DynamoDB table. The developer wants to ask AWS experts and the wider community for free, and also browse answers to similar questions that others have already posted. Which resource should the developer use?",
    options: [
      { id: "a", text: "AWS re:Post" },
      { id: "b", text: "AWS Professional Services" },
      { id: "c", text: "An AWS Support technical case" },
      { id: "d", text: "AWS Concierge Support" },
    ],
    correctOptionIds: ["a"],
    explanation: "AWS re:Post is a free, community-driven question-and-answer service where AWS customers, partners, and AWS experts answer technical questions. It is available to everyone regardless of support plan.",
    optionRationale: {
      a: "AWS re:Post is the free community Q&A knowledge base, moderated and with contributions from AWS experts, available without any paid support plan.",
      b: "AWS Professional Services is a paid consulting organization for large engagements such as migrations, not a place to ask a quick question.",
      c: "Technical support cases require at least a Developer Support plan; Basic Support only covers account and billing questions.",
      d: "The Concierge Support team handles billing and account inquiries for Enterprise On-Ramp and Enterprise customers; it's not free and not for technical questions.",
    },
    referenceUrl: "https://aws.amazon.com/premiumsupport/knowledge-center/",
    referenceLabel: "AWS re:Post Knowledge Center",
    consoleUrl: "https://console.aws.amazon.com/support/home#/",
    consoleLabel: "AWS Support Center",
    diagram: `flowchart TD
  Q[Technical Question, Basic Support] --> RePost[AWS re:Post: Free Community Q&A]
  RePost --> Community[Customers, Partners, AWS Experts]
  RePost --> KC[Knowledge Center Articles]
  Paid[Paid Support Plan] --> Case[Technical Support Case]
  Ent[Enterprise Plans] --> Concierge[Concierge: Billing and Account Help]`,
    cliExample: {
      description: "Check which AWS services and categories can be used when opening support cases (fails on Basic Support, which has no technical case access)",
      command: "aws support describe-services --language en --region us-east-1",
      sampleOutput:
        "{\n  \"services\": [\n    {\n      \"code\": \"amazon-dynamodb\",\n      \"name\": \"DynamoDB\",\n      \"categories\": [\n        {\n          \"code\": \"general-guidance\",\n          \"name\": \"General Guidance\"\n        },\n        {\n          \"code\": \"throughput-and-capacity\",\n          \"name\": \"Throughput and Capacity\"\n        }\n      ]\n    }\n  ]\n}",
    },
  },
  {
    id: "bill21",
    domain: "billing-pricing-and-support",
    text: "A student created a new AWS account to experiment with services and wants to avoid unexpected charges. Which TWO statements about the AWS Free Tier are correct?",
    options: [
      { id: "a", text: "Some offers, such as 750 hours per month of t2.micro or t3.micro EC2 usage, are free only for the first 12 months after account creation" },
      { id: "b", text: "Some offers, such as 1 million AWS Lambda requests per month, are always free and never expire" },
      { id: "c", text: "All AWS services are completely free for the first 12 months regardless of usage" },
      { id: "d", text: "Free Tier usage cannot be tracked or alerted on because it isn't part of the bill" },
      { id: "e", text: "Short-term trial offers last indefinitely as long as the account remains active" },
    ],
    correctOptionIds: ["a", "b"],
    explanation: "The AWS Free Tier has three types of offers: 12-month free offers that start at account creation, always-free offers that never expire, and short-term trials that begin when you activate a service. Usage beyond the free limits is charged at standard rates, and AWS Budgets can alert you as you approach the limits.",
    optionRationale: {
      a: "12-month free offers, such as 750 hours per month of eligible micro EC2 instances and 5 GB of S3 Standard storage, are available only for the first year after sign-up.",
      b: "Always-free offers, such as 1 million Lambda requests, 25 GB of DynamoDB storage, and 10 custom CloudWatch metrics, don't expire.",
      c: "Only specific services and usage amounts are free; usage above the limits or for non-Free-Tier services is billed at normal rates even within the first 12 months.",
      d: "AWS Budgets includes Free Tier usage alerts that email you when you approach or exceed a Free Tier limit.",
      e: "Trial offers, such as 30 days of Amazon Inspector or 2 months of SageMaker notebook usage, are time-limited from the moment you start using the service.",
    },
    referenceUrl: "https://aws.amazon.com/free/",
    referenceLabel: "AWS Free Tier",
    consoleUrl: "https://console.aws.amazon.com/billing/home#/freetier",
    consoleLabel: "Billing and Cost Management > Free Tier",
    diagram: `flowchart TD
  FT[AWS Free Tier] --> Twelve[12 Months Free: e.g. 750 hrs micro EC2, 5 GB S3]
  FT --> Always[Always Free: e.g. 1M Lambda requests, 25 GB DynamoDB]
  FT --> Trial[Short-Term Trials: e.g. 30 days Inspector]
  FT --> Alert[Budgets Free Tier Usage Alerts]`,
    cliExample: {
      description: "Show current Free Tier usage and limits for the account",
      command: "aws freetier get-free-tier-usage --region us-east-1",
      sampleOutput:
        "{\n  \"freeTierUsages\": [\n    {\n      \"service\": \"AWS Lambda\",\n      \"operation\": \"Invoke\",\n      \"usageType\": \"Request\",\n      \"region\": \"global\",\n      \"actualUsageAmount\": 184320.0,\n      \"forecastedUsageAmount\": 402500.0,\n      \"limit\": 1000000.0,\n      \"unit\": \"Request\",\n      \"description\": \"1,000,000.0 Request are always free per month as part of AWS Free Usage Tier (Global-Lambda-Requests)\",\n      \"freeTierType\": \"Always Free\"\n    },\n    {\n      \"service\": \"Amazon Elastic Compute Cloud\",\n      \"operation\": \"RunInstances\",\n      \"usageType\": \"BoxUsage:t3.micro\",\n      \"region\": \"us-east-1\",\n      \"actualUsageAmount\": 312.0,\n      \"forecastedUsageAmount\": 690.0,\n      \"limit\": 750.0,\n      \"unit\": \"Hrs\",\n      \"description\": \"750.0 Hrs are free for 12 months as part of AWS Free Usage Tier (Global-BoxUsage:freetier.micro)\",\n      \"freeTierType\": \"12 Months Free\"\n    }\n  ]\n}",
    },
  },
  {
    id: "bill22",
    domain: "billing-pricing-and-support",
    text: "A managed service provider (MSP) resells AWS to several customers from a single AWS Organization. It needs to generate separate, customized pro forma invoices for each customer that apply the MSP's own pricing rules and markups, without changing the actual bill that AWS charges the management account. Which AWS service is designed for this?",
    options: [
      { id: "a", text: "AWS Billing Conductor" },
      { id: "b", text: "AWS Cost Explorer" },
      { id: "c", text: "AWS Control Tower" },
      { id: "d", text: "AWS Cost and Usage Report" },
    ],
    correctOptionIds: ["a"],
    explanation: "AWS Billing Conductor lets you group accounts into billing groups and apply custom pricing plans, markups, or discounts to produce pro forma (showback or chargeback) billing data for each group, independent of the actual AWS invoice.",
    optionRationale: {
      a: "Billing Conductor creates billing groups with custom pricing rules and generates pro forma cost data and CUR files per group, which is exactly what resellers and internal chargeback models need.",
      b: "Cost Explorer visualizes actual spend; it cannot apply custom markups or produce separate customer-facing pro forma bills.",
      c: "Control Tower sets up and governs a multi-account landing zone with guardrails; it has no billing customization capability.",
      d: "The standard Cost and Usage Report reflects actual AWS charges; it doesn't apply custom pricing unless it is generated through a Billing Conductor billing group.",
    },
    referenceUrl: "https://docs.aws.amazon.com/billingconductor/latest/userguide/what-is-billingconductor.html",
    referenceLabel: "What is AWS Billing Conductor?",
    consoleUrl: "https://console.aws.amazon.com/billingconductor/home#/billinggroups",
    consoleLabel: "AWS Billing Conductor > Billing groups",
    diagram: `flowchart LR
  Org[AWS Organization: Actual AWS Bill] --> BC[AWS Billing Conductor]
  BC --> G1[Billing Group: Customer A + 10% markup]
  BC --> G2[Billing Group: Customer B + 5% discount]
  G1 --> PF1[Pro Forma Bill for Customer A]
  G2 --> PF2[Pro Forma Bill for Customer B]`,
    cliExample: {
      description: "List the billing groups defined in AWS Billing Conductor",
      command: "aws billingconductor list-billing-groups --region us-east-1",
      sampleOutput:
        "{\n  \"BillingGroups\": [\n    {\n      \"Name\": \"customer-a\",\n      \"Arn\": \"arn:aws:billingconductor::123456789012:billinggroup/210987654321\",\n      \"Description\": \"Customer A reseller group\",\n      \"PrimaryAccountId\": \"210987654321\",\n      \"ComputationPreference\": {\n        \"PricingPlanArn\": \"arn:aws:billingconductor::123456789012:pricingplan/AbCdEfGhIj\"\n      },\n      \"Size\": 3,\n      \"CreationTime\": 1767225600,\n      \"LastModifiedTime\": 1773705600,\n      \"Status\": \"ACTIVE\",\n      \"AccountGrouping\": {\n        \"AutoAssociate\": false\n      }\n    }\n  ]\n}",
    },
  },
  {
    id: "bill23",
    domain: "billing-pricing-and-support",
    text: "An early-stage startup that has just received seed funding wants to build its product on AWS but has a very limited budget. The founders are looking for AWS credits, technical training, and startup-focused support resources. Which AWS program is designed to help them?",
    options: [
      { id: "a", text: "AWS Activate" },
      { id: "b", text: "AWS Enterprise Support" },
      { id: "c", text: "AWS Migration Acceleration Program (MAP)" },
      { id: "d", text: "AWS IQ" },
    ],
    correctOptionIds: ["a"],
    explanation: "AWS Activate provides startups with AWS promotional credits, technical support, training, and tools to help them build and scale on AWS at low cost.",
    optionRationale: {
      a: "AWS Activate is the startup program that offers promotional credits, Activate Console guidance, technical training, and support resources tailored to early-stage companies.",
      b: "Enterprise Support is the most expensive support tier with a designated TAM, aimed at large mission-critical workloads, not cash-constrained startups.",
      c: "The Migration Acceleration Program helps established enterprises migrate large existing estates to AWS; it doesn't target new startups building from scratch.",
      d: "AWS IQ connects customers with third-party AWS Certified experts for paid project work; it doesn't provide credits or startup programs.",
    },
    referenceUrl: "https://aws.amazon.com/startups/credits",
    referenceLabel: "AWS Activate for Startups",
    consoleUrl: "https://console.aws.amazon.com/billing/home#/credits",
    consoleLabel: "Billing and Cost Management > Credits",
    diagram: `flowchart LR
  Startup[Seed-Stage Startup] --> Activate[AWS Activate]
  Activate --> Credits[Promotional AWS Credits]
  Activate --> Training[Technical Training and Guidance]
  Activate --> Support[Startup Support Resources]
  Credits --> Bill[Applied Automatically to AWS Bill]`,
    cliExample: {
      description: "View how credits and other charge types contributed to the month's cost",
      command: "aws ce get-cost-and-usage --time-period Start=2026-02-01,End=2026-03-01 --granularity MONTHLY --metrics UnblendedCost --group-by Type=DIMENSION,Key=RECORD_TYPE",
      sampleOutput:
        "{\n  \"GroupDefinitions\": [\n    {\n      \"Type\": \"DIMENSION\",\n      \"Key\": \"RECORD_TYPE\"\n    }\n  ],\n  \"ResultsByTime\": [\n    {\n      \"TimePeriod\": {\n        \"Start\": \"2026-02-01\",\n        \"End\": \"2026-03-01\"\n      },\n      \"Total\": {},\n      \"Groups\": [\n        {\n          \"Keys\": [\n            \"Usage\"\n          ],\n          \"Metrics\": {\n            \"UnblendedCost\": {\n              \"Amount\": \"842.17\",\n              \"Unit\": \"USD\"\n            }\n          }\n        },\n        {\n          \"Keys\": [\n            \"Credit\"\n          ],\n          \"Metrics\": {\n            \"UnblendedCost\": {\n              \"Amount\": \"-842.17\",\n              \"Unit\": \"USD\"\n            }\n          }\n        }\n      ],\n      \"Estimated\": false\n    }\n  ],\n  \"DimensionValueAttributes\": []\n}",
    },
  },
];
