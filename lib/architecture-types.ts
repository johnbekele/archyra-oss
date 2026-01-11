// Architecture Designer Types

export interface ArchitectureDesign {
  id: string;
  userId: string;
  name: string;
  nodes: DesignNode[];
  connections: DesignConnection[];
  viewport: Viewport;
  createdAt: Date;
  updatedAt: Date;
}

export interface DesignNode {
  id: string;
  serviceId: string;
  position: { x: number; y: number };
  properties: Record<string, string | number | boolean>;
}

export interface DesignConnection {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
}

export interface Viewport {
  x: number;
  y: number;
  zoom: number;
}

export interface GeneratedCode {
  terraform: string;
  pulumi: string;
}

export type CodeLanguage = 'terraform' | 'pulumi';
