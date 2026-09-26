import { CertificationId } from "./certifications.js";

/** One hotlinked image that illustrates a topic. The repo stores only the link and its credit. */
export interface ImageEntry {
  /** Kebab-case slug, unique across the catalog. */
  id: string;
  /** Direct https URL of the image file, loaded from the publisher's server. */
  url: string;
  /** What the image shows, for screen readers. */
  alt: string;
  /** One short line shown under the image. */
  caption: string;
  /** Publisher, plus the licence where one applies, e.g. "Wikimedia Commons, CC BY-SA 4.0". */
  credit: string;
  /** Page the image appears on; the figure links here. */
  sourceUrl: string;
  /** Case-insensitive phrases that indicate a question is about this image's topic. Longer phrases score higher. */
  keywords: string[];
  certs: CertificationId[];
}

export const imageCatalog: ImageEntry[] = [
  {
    id: "shared-responsibility-model",
    url: "https://d1.awsstatic.com/onedam/marketing-channels/website/aws/en_US/product-categories/security-identity-compliance/compliance/approved/images/7a404923-5572-409c-b30e-6d44706bcd89.92c57224d8acd09bf44d94bc25db5c58419a8941.jpeg",
    alt: "AWS shared responsibility model diagram: customer responsible for security 'in' the cloud (customer data, platform, applications, IAM, operating system, network and firewall configuration, client-side and server-side encryption); AWS responsible for security 'of' the cloud (software, compute, storage, database, networking, and the hardware and global infrastructure of Regions, Availability Zones and edge locations)",
    caption: "The AWS shared responsibility model",
    credit: "AWS",
    sourceUrl: "https://aws.amazon.com/compliance/shared-responsibility-model/",
    keywords: ["shared responsibility", "shared responsibility model", "security of the cloud", "security in the cloud", "customer is responsible", "aws is responsible"],
    certs: ["clf-c02", "aif-c01"],
  },
  {
    id: "aws-global-infrastructure-map",
    url: "https://docs.aws.amazon.com/global-infrastructure/latest/regions/images/availability-zones.png",
    alt: "Diagram of an AWS Region containing three Availability Zones, each shown as a separate dashed box nested inside the Region to illustrate their physical isolation",
    caption: "An AWS Region and its Availability Zones",
    credit: "AWS Documentation",
    sourceUrl: "https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions-availability-zones.html",
    keywords: ["region", "regions", "availability zone", "availability zones", "global infrastructure", "edge location", "edge locations"],
    certs: ["clf-c02"],
  },
  {
    id: "data-centre-server-racks",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Datacenter_Server_Racks_%2822370909788%29.jpg/960px-Datacenter_Server_Racks_%2822370909788%29.jpg",
    alt: "Rows of tall black server racks with cabling and equipment inside a data centre, standing on a raised, perforated floor",
    caption: "Server racks inside a data centre",
    credit: "Wikimedia Commons, CC BY 2.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Datacenter_Server_Racks_(22370909788).jpg",
    keywords: ["data center", "data centre", "server rack", "server racks", "on-premises", "colocation"],
    certs: ["clf-c02"],
  },
  {
    id: "cost-explorer-console",
    url: "https://d2908q01vomqb2.cloudfront.net/2e01e17467891f7c933dbaa00e1459d23db3fe4f/2026/06/08/New-Fig-2.png",
    alt: "AWS Cost Explorer console showing a cost and usage graph as a stacked bar chart of daily AWS costs by service, with a cost and usage breakdown table below and a report parameters panel on the right",
    caption: "The AWS Cost Explorer console",
    credit: "AWS",
    sourceUrl: "https://aws.amazon.com/blogs/aws-cloud-financial-management/introducing-intelligent-cost-explanations-in-aws-cost-explorer/",
    keywords: ["cost explorer", "cost and usage report", "billing console", "cost management console"],
    certs: ["clf-c02"],
  },
  {
    id: "ai-ml-deep-learning",
    url: "https://docs.aws.amazon.com/images/whitepapers/latest/aws-caf-for-ai/images/taxonomy-of-ai-ml-deeplearning-and-genai.png",
    alt: "Nested taxonomy diagram: artificial intelligence (AI) contains machine learning (ML), which contains deep learning (DL), which contains generative AI, with a one-line definition under each term",
    caption: "The taxonomy of AI, ML, deep learning and generative AI",
    credit: "AWS Whitepaper: AWS Cloud Adoption Framework for AI, ML, and Generative AI",
    sourceUrl: "https://docs.aws.amazon.com/whitepapers/latest/aws-caf-for-ai/aws-caf-for-ai.html",
    keywords: ["deep learning", "neural network", "artificial intelligence", "machine learning", "subset of ai", "subset of ml"],
    certs: ["aif-c01"],
  },
  {
    id: "transformer-architecture",
    url: "https://docs.aws.amazon.com/images/prescriptive-guidance/latest/gen-ai-inference-architecture-and-best-practices-on-aws/images/guide-img/1e4a4636-9247-4346-9ab7-62170783f8a2/images/f5c783c8-26d0-43b9-a990-34dd842f8ca5.png",
    alt: "The transformer neural network architecture, showing an encoder stack (input embedding, positional encoding, multi-head attention, feed forward) on the left and a decoder stack (output embedding, masked multi-head attention, multi-head attention, feed forward, linear and softmax layers producing output probabilities) on the right",
    caption: "The transformer architecture (encoder-decoder)",
    credit: "AWS Documentation",
    sourceUrl: "https://docs.aws.amazon.com/prescriptive-guidance/latest/gen-ai-inference-architecture-and-best-practices-on-aws/how-ai-inference-works.html",
    keywords: ["transformer", "transformers", "self-attention", "attention mechanism", "encoder-decoder", "large language model", "llm"],
    certs: ["aif-c01"],
  },
  {
    id: "bedrock-knowledge-base-rag",
    url: "https://docs.aws.amazon.com/images/bedrock/latest/userguide/images/kb/rag-runtime.png",
    alt: "Retrieval-augmented generation flow at runtime: a user query is turned into embeddings, used to retrieve similar documents from a vector database, and the retrieved documents augment the query sent to a text model, which responds to the user",
    caption: "Retrieval-augmented generation with Amazon Bedrock Knowledge Bases",
    credit: "AWS Documentation",
    sourceUrl: "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-how-it-works.html",
    keywords: ["retrieval augmented generation", "rag", "knowledge base", "knowledge bases", "vector database", "embeddings"],
    certs: ["aif-c01"],
  },
  {
    id: "responsible-ai-dimensions",
    url: "https://d1.awsstatic.com/onedam/marketing-channels/website/aws/en_US/product-categories/ai-ml/machine-learning/approved/images/responsible-ai-best-practices-1200x900-v2.ebdbfe2c1f00c0bbb88f851edbf1d90da925beec.png",
    alt: "A wheel divided into Design, Develop and Operate phases, each split into responsible AI practices: use case, benefits and risks, release criteria, dataset planning, system planning, evaluate and release, user guidance, and monitor",
    caption: "AWS responsible AI best practices, from design through operation",
    credit: "AWS",
    sourceUrl: "https://aws.amazon.com/ai/responsible-ai/",
    keywords: ["responsible ai", "responsible use of ai", "fairness", "transparency", "governance", "explainability"],
    certs: ["aif-c01"],
  },
  {
    id: "genai-security-scoping-matrix",
    url: "https://d2908q01vomqb2.cloudfront.net/22d200f8670dbdb3e253a90eee5098477c95c23d/2023/10/18/Figure_1-Generative_AI_Security_Scoping_Matrix-new.png",
    alt: "The Generative AI Security Scoping Matrix: five scopes from Scope 1 Consumer App through Scope 5 Self-trained Models, each with an example, spanning shared concerns of governance and compliance, legal and privacy, risk management, controls, and resilience",
    caption: "The Generative AI Security Scoping Matrix",
    credit: "AWS Security Blog",
    sourceUrl: "https://aws.amazon.com/blogs/security/securing-generative-ai-an-introduction-to-the-generative-ai-security-scoping-matrix/",
    keywords: ["scoping matrix", "security scoping matrix", "scope 1", "scope 2", "scope 3", "scope 4", "scope 5"],
    certs: ["aif-c01"],
  },
];

/** Image used when no keyword matches, keyed by domain id across all certs. */
export const domainImageFallback: Record<string, string> = {
  "cloud-concepts": "aws-global-infrastructure-map",
  "security-and-compliance": "shared-responsibility-model",
  "cloud-technology-and-services": "data-centre-server-racks",
  "billing-pricing-and-support": "cost-explorer-console",
  "ai-ml-fundamentals": "ai-ml-deep-learning",
  "genai-fundamentals": "transformer-architecture",
  "foundation-model-applications": "bedrock-knowledge-base-rag",
  "responsible-ai": "responsible-ai-dimensions",
  "ai-security-governance": "genai-security-scoping-matrix",
};
