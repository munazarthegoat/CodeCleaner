import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email"),
  fullName: text("full_name"),
  companyName: text("company_name"),
  onboardingCompleted: boolean("onboarding_completed").default(false),
  onboardingStep: integer("onboarding_step").default(1),
  industry: text("industry"),
  teamSize: text("team_size"),
  aiExperienceLevel: text("ai_experience_level"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  fullName: true,
  companyName: true,
});

// AI Agents model
export const agents = pgTable("agents", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  goals: text("goals").notNull(),
  personality: text("personality").notNull(),
  autonomyLevel: text("autonomy_level").notNull(),
  dataAccess: text("data_access").array().notNull(),
  specialInstructions: text("special_instructions"),
  status: text("status").default("offline").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  lastActive: timestamp("last_active").defaultNow(),
});

export const insertAgentSchema = createInsertSchema(agents).pick({
  userId: true,
  name: true,
  role: true,
  goals: true,
  personality: true,
  autonomyLevel: true,
  dataAccess: true,
  specialInstructions: true,
  status: true,
});

// Messages model
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  agentId: integer("agent_id").notNull(),
  userId: integer("user_id").notNull(),
  content: text("content").notNull(),
  sender: text("sender").notNull(), // Either 'user' or 'agent'
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const insertMessageSchema = createInsertSchema(messages).pick({
  agentId: true,
  userId: true,
  content: true,
  sender: true,
});

// Tasks model
export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  agentId: integer("agent_id").notNull(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  status: text("status").default("pending").notNull(), // 'pending', 'in_progress', 'completed', 'failed'
  createdAt: timestamp("created_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
  result: jsonb("result"),
});

export const insertTaskSchema = createInsertSchema(tasks).pick({
  agentId: true,
  userId: true,
  title: true,
  description: true,
  status: true,
});

// Type definitions
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Agent = typeof agents.$inferSelect;
export type InsertAgent = z.infer<typeof insertAgentSchema>;

export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;

export type Task = typeof tasks.$inferSelect;
export type InsertTask = z.infer<typeof insertTaskSchema>;
