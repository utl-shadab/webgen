import { pgTable, serial, text, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Define table for storing project templates
export const projectTemplates = pgTable("project_templates", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  framework: text("framework").notNull(),
  config: jsonb("config").notNull()
});

// Define table for storing generated projects
export const generatedProjects = pgTable("generated_projects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  framework: text("framework").notNull(),
  frameworkVersion: text("framework_version").notNull(),
  libraries: jsonb("libraries").notNull(),
  folders: jsonb("folders").notNull(),
  generatedAt: text("generated_at").notNull(),
  downloadCount: serial("download_count").notNull()
});

// Schema for inserting a template
export const insertTemplateSchema = createInsertSchema(projectTemplates).pick({
  name: true,
  description: true,
  framework: true,
  config: true,
});

// Schema for inserting a generated project
export const insertGeneratedProjectSchema = createInsertSchema(generatedProjects).pick({
  name: true,
  framework: true,
  frameworkVersion: true,
  libraries: true,
  folders: true,
  generatedAt: true,
  downloadCount: true,
});

// Generate types from the schemas
export type InsertTemplate = z.infer<typeof insertTemplateSchema>;
export type Template = typeof projectTemplates.$inferSelect;

export type InsertGeneratedProject = z.infer<typeof insertGeneratedProjectSchema>;
export type GeneratedProject = typeof generatedProjects.$inferSelect;

// Schema for project generation request
export const projectGenerationSchema = z.object({
  projectName: z.string().min(1),
  framework: z.string(),
  frameworkVersion: z.string(),
  libraries: z.array(z.string()),
  folders: z.array(z.string())
});

export type ProjectGenerationRequest = z.infer<typeof projectGenerationSchema>;
