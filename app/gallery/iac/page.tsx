'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Cloud, Globe, Server, Layers, Database, GitBranch,
  ArrowRight, Copy, Check, ExternalLink, Sparkles
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// IaC Template Categories
const categories = [
  { id: 'all', name: 'All Templates', icon: Layers, color: 'bg-slate-500' },
  { id: 'static-website', name: 'Static Website', icon: Globe, color: 'bg-blue-500' },
  { id: 'api-backend', name: 'API Backend', icon: Server, color: 'bg-green-500' },
  { id: 'full-stack', name: 'Full-Stack App', icon: Layers, color: 'bg-purple-500' },
  { id: 'serverless', name: 'Serverless', icon: Cloud, color: 'bg-cyan-500' },
  { id: 'data-pipeline', name: 'Data Pipeline', icon: Database, color: 'bg-orange-500' },
  { id: 'microservices', name: 'Microservices', icon: GitBranch, color: 'bg-pink-500' },
];

// Sample IaC Templates
const templates = [
  {
    id: 'static-website-s3-cloudfront',
    name: 'Static Website with CloudFront',
    description: 'Host a static website on S3 with CloudFront CDN for global distribution and HTTPS.',
    category: 'static-website',
    services: ['S3', 'CloudFront', 'Route53', 'ACM'],
    complexity: 'beginner',
    estimatedCost: '$1-5/month',
    terraform: `# AWS Provider
provider "aws" {
  region = "us-east-1"
}

# S3 Bucket for website hosting
resource "aws_s3_bucket" "website" {
  bucket = "my-static-website-bucket"
}

resource "aws_s3_bucket_website_configuration" "website" {
  bucket = aws_s3_bucket.website.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "error.html"
  }
}

# CloudFront Distribution
resource "aws_cloudfront_distribution" "website" {
  origin {
    domain_name = aws_s3_bucket.website.bucket_regional_domain_name
    origin_id   = "S3-Website"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.website.cloudfront_access_identity_path
    }
  }

  enabled             = true
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-Website"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}

output "website_url" {
  value = aws_cloudfront_distribution.website.domain_name
}`,
    pulumi: `import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

// S3 Bucket for website hosting
const websiteBucket = new aws.s3.Bucket("website-bucket", {
  website: {
    indexDocument: "index.html",
    errorDocument: "error.html",
  },
});

// Origin Access Identity
const originAccessIdentity = new aws.cloudfront.OriginAccessIdentity("oai", {
  comment: "OAI for static website",
});

// CloudFront Distribution
const distribution = new aws.cloudfront.Distribution("website-distribution", {
  origins: [{
    domainName: websiteBucket.bucketRegionalDomainName,
    originId: "S3-Website",
    s3OriginConfig: {
      originAccessIdentity: originAccessIdentity.cloudfrontAccessIdentityPath,
    },
  }],
  enabled: true,
  defaultRootObject: "index.html",
  defaultCacheBehavior: {
    allowedMethods: ["GET", "HEAD"],
    cachedMethods: ["GET", "HEAD"],
    targetOriginId: "S3-Website",
    forwardedValues: {
      queryString: false,
      cookies: { forward: "none" },
    },
    viewerProtocolPolicy: "redirect-to-https",
    minTtl: 0,
    defaultTtl: 3600,
    maxTtl: 86400,
  },
  restrictions: {
    geoRestriction: {
      restrictionType: "none",
    },
  },
  viewerCertificate: {
    cloudfrontDefaultCertificate: true,
  },
});

export const websiteUrl = distribution.domainName;`,
  },
  {
    id: 'api-lambda-dynamodb',
    name: 'Serverless API with DynamoDB',
    description: 'RESTful API using API Gateway, Lambda, and DynamoDB for data persistence.',
    category: 'api-backend',
    services: ['API Gateway', 'Lambda', 'DynamoDB', 'IAM'],
    complexity: 'intermediate',
    estimatedCost: '$5-20/month',
    terraform: `# Lambda function for API
resource "aws_lambda_function" "api" {
  filename         = "lambda.zip"
  function_name    = "api-handler"
  role            = aws_iam_role.lambda_role.arn
  handler         = "index.handler"
  runtime         = "nodejs18.x"

  environment {
    variables = {
      TABLE_NAME = aws_dynamodb_table.main.name
    }
  }
}

# DynamoDB Table
resource "aws_dynamodb_table" "main" {
  name           = "api-data"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"
  }
}

# API Gateway
resource "aws_apigatewayv2_api" "main" {
  name          = "serverless-api"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_integration" "lambda" {
  api_id           = aws_apigatewayv2_api.main.id
  integration_type = "AWS_PROXY"
  integration_uri  = aws_lambda_function.api.invoke_arn
}

resource "aws_apigatewayv2_route" "default" {
  api_id    = aws_apigatewayv2_api.main.id
  route_key = "ANY /{proxy+}"
  target    = "integrations/\${aws_apigatewayv2_integration.lambda.id}"
}`,
    pulumi: `import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

// DynamoDB Table
const table = new aws.dynamodb.Table("api-data", {
  attributes: [{ name: "id", type: "S" }],
  hashKey: "id",
  billingMode: "PAY_PER_REQUEST",
});

// Lambda Role
const lambdaRole = new aws.iam.Role("lambda-role", {
  assumeRolePolicy: JSON.stringify({
    Version: "2012-10-17",
    Statement: [{
      Action: "sts:AssumeRole",
      Effect: "Allow",
      Principal: { Service: "lambda.amazonaws.com" },
    }],
  }),
});

// Lambda Function
const lambda = new aws.lambda.Function("api-handler", {
  runtime: "nodejs18.x",
  handler: "index.handler",
  role: lambdaRole.arn,
  code: new pulumi.asset.FileArchive("./lambda"),
  environment: {
    variables: { TABLE_NAME: table.name },
  },
});

// API Gateway
const api = new aws.apigatewayv2.Api("serverless-api", {
  protocolType: "HTTP",
});

export const apiEndpoint = api.apiEndpoint;`,
  },
  {
    id: 'ecs-fargate-rds',
    name: 'Container App with Database',
    description: 'Containerized application on ECS Fargate with RDS PostgreSQL database.',
    category: 'full-stack',
    services: ['ECS', 'Fargate', 'RDS', 'ALB', 'VPC'],
    complexity: 'advanced',
    estimatedCost: '$50-150/month',
    terraform: `# ECS Cluster
resource "aws_ecs_cluster" "main" {
  name = "app-cluster"
}

# ECS Task Definition
resource "aws_ecs_task_definition" "app" {
  family                   = "app-task"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = 256
  memory                   = 512

  container_definitions = jsonencode([{
    name  = "app"
    image = "nginx:latest"
    portMappings = [{
      containerPort = 80
      hostPort      = 80
    }]
  }])
}

# RDS PostgreSQL
resource "aws_db_instance" "main" {
  identifier           = "app-database"
  engine              = "postgres"
  engine_version      = "15"
  instance_class      = "db.t3.micro"
  allocated_storage   = 20
  db_name             = "appdb"
  username            = "admin"
  password            = var.db_password
  skip_final_snapshot = true
}`,
    pulumi: `import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

// ECS Cluster
const cluster = new aws.ecs.Cluster("app-cluster");

// RDS Instance
const db = new aws.rds.Instance("app-database", {
  engine: "postgres",
  engineVersion: "15",
  instanceClass: "db.t3.micro",
  allocatedStorage: 20,
  dbName: "appdb",
  username: "admin",
  password: config.requireSecret("dbPassword"),
  skipFinalSnapshot: true,
});

export const dbEndpoint = db.endpoint;`,
  },
];

export default function IaCGalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredTemplates = selectedCategory === 'all'
    ? templates
    : templates.filter(t => t.category === selectedCategory);

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="border-b bg-gradient-to-br from-emerald-500/5 via-teal-500/5 to-cyan-500/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center">
              <Cloud className="w-6 h-6 text-white" />
            </div>
            <Badge className="bg-emerald-500/10 text-emerald-600">IaC Templates</Badge>
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Infrastructure as Code Templates
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Pre-built AWS infrastructure templates with Terraform and Pulumi code.
            Deploy production-ready architectures in minutes.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                  transition-all duration-200
                  ${isActive
                    ? 'bg-emerald-500 text-white'
                    : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                {category.name}
              </button>
            );
          })}
        </div>

        {/* Templates Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {filteredTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {template.description}
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="shrink-0">
                      {template.complexity}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {template.services.map((service) => (
                      <Badge key={service} variant="secondary" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="terraform" className="w-full">
                    <div className="flex items-center justify-between mb-2">
                      <TabsList className="h-8">
                        <TabsTrigger value="terraform" className="text-xs">Terraform</TabsTrigger>
                        <TabsTrigger value="pulumi" className="text-xs">Pulumi</TabsTrigger>
                      </TabsList>
                      <span className="text-xs text-muted-foreground">
                        Est. {template.estimatedCost}
                      </span>
                    </div>
                    <TabsContent value="terraform" className="mt-0">
                      <div className="relative">
                        <pre className="bg-zinc-950 text-zinc-100 rounded-lg p-4 overflow-x-auto text-xs max-h-64">
                          <code>{template.terraform}</code>
                        </pre>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 h-7 w-7 text-zinc-400 hover:text-zinc-100"
                          onClick={() => copyCode(template.terraform, `${template.id}-tf`)}
                        >
                          {copiedId === `${template.id}-tf` ? (
                            <Check className="w-3.5 h-3.5" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </Button>
                      </div>
                    </TabsContent>
                    <TabsContent value="pulumi" className="mt-0">
                      <div className="relative">
                        <pre className="bg-zinc-950 text-zinc-100 rounded-lg p-4 overflow-x-auto text-xs max-h-64">
                          <code>{template.pulumi}</code>
                        </pre>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 h-7 w-7 text-zinc-400 hover:text-zinc-100"
                          onClick={() => copyCode(template.pulumi, `${template.id}-pulumi`)}
                        >
                          {copiedId === `${template.id}-pulumi` ? (
                            <Check className="w-3.5 h-3.5" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Designer CTA */}
        <Card className="mt-12 bg-gradient-to-br from-orange-500/10 to-amber-500/10 border-orange-500/20">
          <CardContent className="py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center">
                  <GitBranch className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Need a custom architecture?</h3>
                  <p className="text-muted-foreground">
                    Use the Architecture Designer to create your own infrastructure visually.
                  </p>
                </div>
              </div>
              <Link href="/gallery/designer">
                <Button className="gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600">
                  <Sparkles className="w-4 h-4" />
                  Open Designer
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
