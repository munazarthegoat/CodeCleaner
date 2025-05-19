import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertAgentSchema, insertMessageSchema, insertTaskSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const data = insertUserSchema.parse(req.body);
      
      // Check if username already exists
      const existingUser = await storage.getUserByUsername(data.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
      
      // In a real app, we would hash the password before storing
      const user = await storage.createUser(data);
      
      // Don't return password in the response
      const { password, ...userWithoutPassword } = user;
      
      return res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      // Validate required fields
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }
      
      const user = await storage.getUserByUsername(username);
      
      // In a real app, we would compare hashed passwords
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // Set user in session
      req.session.userId = user.id;
      
      // Don't return password in the response
      const { password: _, ...userWithoutPassword } = user;
      
      return res.status(200).json(userWithoutPassword);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/auth/me", async (req, res) => {
    try {
      // Check if user is authenticated
      if (!req.session.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const user = await storage.getUserById(req.session.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Don't return password in the response
      const { password, ...userWithoutPassword } = user;
      
      return res.status(200).json(userWithoutPassword);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to logout" });
      }
      
      res.status(200).json({ message: "Logged out successfully" });
    });
  });

  // Agent routes
  app.get("/api/agents", async (req, res) => {
    try {
      // Check if user is authenticated
      if (!req.session.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const agents = await storage.getAgentsByUserId(req.session.userId);
      
      return res.status(200).json(agents);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/agents/:id", async (req, res) => {
    try {
      // Check if user is authenticated
      if (!req.session.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid agent ID" });
      }
      
      const agent = await storage.getAgentById(id);
      
      if (!agent) {
        return res.status(404).json({ message: "Agent not found" });
      }
      
      // Check if the agent belongs to the authenticated user
      if (agent.userId !== req.session.userId) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      return res.status(200).json(agent);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/agents", async (req, res) => {
    try {
      // Check if user is authenticated
      if (!req.session.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      // Add userId to the request body
      const data = insertAgentSchema.parse({
        ...req.body,
        userId: req.session.userId,
        status: 'online', // Set default status to online for newly created agents
      });
      
      const agent = await storage.createAgent(data);
      
      return res.status(201).json(agent);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.patch("/api/agents/:id", async (req, res) => {
    try {
      // Check if user is authenticated
      if (!req.session.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid agent ID" });
      }
      
      const agent = await storage.getAgentById(id);
      
      if (!agent) {
        return res.status(404).json({ message: "Agent not found" });
      }
      
      // Check if the agent belongs to the authenticated user
      if (agent.userId !== req.session.userId) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      const updatedAgent = await storage.updateAgent(id, req.body);
      
      return res.status(200).json(updatedAgent);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/api/agents/:id", async (req, res) => {
    try {
      // Check if user is authenticated
      if (!req.session.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid agent ID" });
      }
      
      const agent = await storage.getAgentById(id);
      
      if (!agent) {
        return res.status(404).json({ message: "Agent not found" });
      }
      
      // Check if the agent belongs to the authenticated user
      if (agent.userId !== req.session.userId) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      await storage.deleteAgent(id);
      
      return res.status(200).json({ message: "Agent deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // Message routes
  app.get("/api/agents/:id/messages", async (req, res) => {
    try {
      // Check if user is authenticated
      if (!req.session.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const agentId = parseInt(req.params.id);
      if (isNaN(agentId)) {
        return res.status(400).json({ message: "Invalid agent ID" });
      }
      
      const agent = await storage.getAgentById(agentId);
      
      if (!agent) {
        return res.status(404).json({ message: "Agent not found" });
      }
      
      // Check if the agent belongs to the authenticated user
      if (agent.userId !== req.session.userId) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      const messages = await storage.getMessagesByAgentId(agentId);
      
      return res.status(200).json(messages);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/agents/:id/messages", async (req, res) => {
    try {
      // Check if user is authenticated
      if (!req.session.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const agentId = parseInt(req.params.id);
      if (isNaN(agentId)) {
        return res.status(400).json({ message: "Invalid agent ID" });
      }
      
      const agent = await storage.getAgentById(agentId);
      
      if (!agent) {
        return res.status(404).json({ message: "Agent not found" });
      }
      
      // Check if the agent belongs to the authenticated user
      if (agent.userId !== req.session.userId) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      // Add userId and agentId to the request body
      const data = insertMessageSchema.parse({
        ...req.body,
        userId: req.session.userId,
        agentId,
      });
      
      const message = await storage.createMessage(data);
      
      // If this is a user message, simulate an AI response after a delay
      if (data.sender === 'user') {
        // Update agent status to "typing"
        await storage.updateAgent(agentId, { status: 'typing' });
        
        // In a real app, this would be handled by an AI service
        setTimeout(async () => {
          // Generate simple response
          const responses = [
            "I'm analyzing that information now.",
            "Great question! Let me work on that for you.",
            "I'll handle that task right away.",
            "Based on the data, I'd recommend proceeding with caution.",
            "I've reviewed your request and have some suggestions.",
          ];
          
          const randomResponse = responses[Math.floor(Math.random() * responses.length)];
          
          await storage.createMessage({
            agentId,
            userId: req.session.userId,
            content: randomResponse,
            sender: 'agent',
          });
          
          // Update agent status back to "online"
          await storage.updateAgent(agentId, { status: 'online' });
        }, 2000);
      }
      
      return res.status(201).json(message);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // Task routes
  app.get("/api/tasks", async (req, res) => {
    try {
      // Check if user is authenticated
      if (!req.session.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const tasks = await storage.getTasksByUserId(req.session.userId);
      
      return res.status(200).json(tasks);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/agents/:id/tasks", async (req, res) => {
    try {
      // Check if user is authenticated
      if (!req.session.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const agentId = parseInt(req.params.id);
      if (isNaN(agentId)) {
        return res.status(400).json({ message: "Invalid agent ID" });
      }
      
      const agent = await storage.getAgentById(agentId);
      
      if (!agent) {
        return res.status(404).json({ message: "Agent not found" });
      }
      
      // Check if the agent belongs to the authenticated user
      if (agent.userId !== req.session.userId) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      const tasks = await storage.getTasksByAgentId(agentId);
      
      return res.status(200).json(tasks);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/agents/:id/tasks", async (req, res) => {
    try {
      // Check if user is authenticated
      if (!req.session.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const agentId = parseInt(req.params.id);
      if (isNaN(agentId)) {
        return res.status(400).json({ message: "Invalid agent ID" });
      }
      
      const agent = await storage.getAgentById(agentId);
      
      if (!agent) {
        return res.status(404).json({ message: "Agent not found" });
      }
      
      // Check if the agent belongs to the authenticated user
      if (agent.userId !== req.session.userId) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      // Add userId and agentId to the request body
      const data = insertTaskSchema.parse({
        ...req.body,
        userId: req.session.userId,
        agentId,
      });
      
      const task = await storage.createTask(data);
      
      // In a real app, this would trigger the agent to start working on the task
      // Simulate the agent working on the task
      setTimeout(async () => {
        // Update task to in_progress
        await storage.updateTask(task.id, { status: 'in_progress' });
        
        // After some time, complete the task
        setTimeout(async () => {
          await storage.updateTask(task.id, { 
            status: 'completed',
            completedAt: new Date(),
            result: { output: "Task completed successfully", details: "Generated content here" }
          });
          
          // Also send a message from the agent about the completed task
          await storage.createMessage({
            agentId,
            userId: req.session.userId,
            content: `I've completed the task "${task.title}". Would you like me to explain the results?`,
            sender: 'agent',
          });
        }, 10000); // Complete after 10 seconds
      }, 3000); // Start after 3 seconds
      
      return res.status(201).json(task);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.patch("/api/tasks/:id", async (req, res) => {
    try {
      // Check if user is authenticated
      if (!req.session.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid task ID" });
      }
      
      const task = await storage.getTaskById(id);
      
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      
      // Check if the task belongs to the authenticated user
      if (task.userId !== req.session.userId) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      const updatedTask = await storage.updateTask(id, req.body);
      
      return res.status(200).json(updatedTask);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
