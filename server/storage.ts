import { 
  InsertTemplate, 
  Template, 
  InsertGeneratedProject, 
  GeneratedProject 
} from "@shared/schema";

// Interface for storage methods
export interface IStorage {
  // Template methods
  getTemplate(id: number): Promise<Template | undefined>;
  getTemplateByName(name: string): Promise<Template | undefined>;
  getAllTemplates(): Promise<Template[]>;
  createTemplate(template: InsertTemplate): Promise<Template>;
  
  // Generated projects methods
  getGeneratedProject(id: number): Promise<GeneratedProject | undefined>;
  getAllGeneratedProjects(): Promise<GeneratedProject[]>;
  createGeneratedProject(project: InsertGeneratedProject): Promise<GeneratedProject>;
  incrementDownloadCount(id: number): Promise<void>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private templates: Map<number, Template>;
  private generatedProjects: Map<number, GeneratedProject>;
  private templateId: number;
  private projectId: number;

  constructor() {
    this.templates = new Map();
    this.generatedProjects = new Map();
    this.templateId = 1;
    this.projectId = 1;
    
    // Initialize with some default templates
    this.createTemplate({
      name: "React Basic",
      description: "A basic React setup with minimal configuration",
      framework: "react",
      config: JSON.stringify({ version: "18.2.0", libraries: ["tailwind"] })
    });
    
    this.createTemplate({
      name: "Next.js Starter",
      description: "A Next.js starter template with Tailwind CSS",
      framework: "nextjs",
      config: JSON.stringify({ version: "13.4.3", libraries: ["tailwind", "shadcn"] })
    });
  }

  // Template methods
  async getTemplate(id: number): Promise<Template | undefined> {
    return this.templates.get(id);
  }

  async getTemplateByName(name: string): Promise<Template | undefined> {
    return Array.from(this.templates.values()).find(
      (template) => template.name === name
    );
  }

  async getAllTemplates(): Promise<Template[]> {
    return Array.from(this.templates.values());
  }

  async createTemplate(template: InsertTemplate): Promise<Template> {
    const id = this.templateId++;
    const newTemplate: Template = { ...template, id };
    this.templates.set(id, newTemplate);
    return newTemplate;
  }

  // Generated projects methods
  async getGeneratedProject(id: number): Promise<GeneratedProject | undefined> {
    return this.generatedProjects.get(id);
  }

  async getAllGeneratedProjects(): Promise<GeneratedProject[]> {
    return Array.from(this.generatedProjects.values());
  }

  async createGeneratedProject(project: InsertGeneratedProject): Promise<GeneratedProject> {
    const id = this.projectId++;
    const newProject: GeneratedProject = { ...project, id };
    this.generatedProjects.set(id, newProject);
    return newProject;
  }

  async incrementDownloadCount(id: number): Promise<void> {
    const project = this.generatedProjects.get(id);
    if (project) {
      project.downloadCount += 1;
      this.generatedProjects.set(id, project);
    }
  }
}

// Export singleton instance
export const storage = new MemStorage();
