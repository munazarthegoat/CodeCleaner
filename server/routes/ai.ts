import { Router, Request, Response } from "express";
import { storage } from "../storage";
import { generateAgentResponse, analyzeTask, generateInsights } from "../services/ai";
import { insertMessageSchema } from "@shared/schema";
import { z } from "zod";

const router = Router();

// Generate AI agent response for a message
router.post("/agents/:id/message", async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.session.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const agentId = parseInt(req.params.id);
    if (isNaN(agentId)) {
      return res.status(400).json({ message: "Invalid agent ID" });
    }
    
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ message: "Message content is required" });
    }
    
    // Get the agent
    const agent = await storage.getAgentById(agentId);
    if (!agent) {
      return res.status(404).json({ message: "Agent not found" });
    }
    
    // Check if the agent belongs to the authenticated user
    if (agent.userId !== req.session.userId) {
      return res.status(403).json({ message: "Access denied" });
    }
    
    // Get previous messages for context
    const previousMessages = await storage.getMessagesByAgentId(agentId);
    
    // Format conversation history for the AI
    const conversationHistory = previousMessages
      .slice(-10) // Only take the last 10 messages for context
      .map(msg => ({
        role: msg.sender === "user" ? "user" : "assistant" as "user" | "assistant",
        content: msg.content
      }));
    
    // Save the user's message
    const userMessage = await storage.createMessage({
      agentId,
      userId: req.session.userId,
      content,
      sender: "user"
    });
    
    // Generate AI response using our service
    const agentConfig = {
      name: agent.name,
      role: agent.role,
      goals: agent.goals,
      personality: agent.personality,
      autonomyLevel: agent.autonomyLevel
    };
    
    const aiResponse = await generateAgentResponse(
      agentConfig,
      conversationHistory,
      content
    );
    
    // Save the agent's response
    const agentMessage = await storage.createMessage({
      agentId,
      userId: req.session.userId,
      content: aiResponse,
      sender: "agent"
    });
    
    return res.status(200).json({
      message: agentMessage
    });
  } catch (error) {
    console.error("Error generating agent response:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Analyze a task using AI
router.post("/tasks/analyze", async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.session.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const { description } = req.body;
    if (!description) {
      return res.status(400).json({ message: "Task description is required" });
    }
    
    // Analyze the task using our AI service
    const analysis = await analyzeTask(description);
    
    return res.status(200).json({
      analysis
    });
  } catch (error) {
    console.error("Error analyzing task:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Generate insights from conversation history
router.get("/agents/:id/insights", async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.session.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const agentId = parseInt(req.params.id);
    if (isNaN(agentId)) {
      return res.status(400).json({ message: "Invalid agent ID" });
    }
    
    // Get the agent
    const agent = await storage.getAgentById(agentId);
    if (!agent) {
      return res.status(404).json({ message: "Agent not found" });
    }
    
    // Check if the agent belongs to the authenticated user
    if (agent.userId !== req.session.userId) {
      return res.status(403).json({ message: "Access denied" });
    }
    
    // Get messages for this agent
    const messages = await storage.getMessagesByAgentId(agentId);
    
    if (messages.length === 0) {
      return res.status(200).json({
        insights: {
          keyThemes: [],
          actionItems: ["Start a conversation with the agent to generate insights"],
          opportunities: []
        }
      });
    }
    
    // Generate insights using our AI service
    const insights = await generateInsights(messages);
    
    return res.status(200).json({
      insights
    });
  } catch (error) {
    console.error("Error generating insights:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// External connection status - for the "Connect your app" button
router.get("/connection/status", async (req, res) => {
  return res.status(200).json({
    connected: true,
    message: "Your app is connected to our AI services",
    capabilities: [
      "Agent conversations",
      "Task analysis",
      "Conversation insights",
      "Workflow automation"
    ]
  });
});

// Connect external application
router.post("/connection/setup", async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.session.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const { appName, appUrl, capabilities } = req.body;
    if (!appName) {
      return res.status(400).json({ message: "App name is required" });
    }
    
    // In a real implementation, this would validate and store the connection information
    
    return res.status(200).json({
      success: true,
      connectionId: `conn_${Date.now()}`,
      message: `Successfully connected ${appName} to Vetro AI`
    });
  } catch (error) {
    console.error("Error setting up connection:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;