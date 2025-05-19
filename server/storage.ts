import { 
  users, type User, type InsertUser, 
  agents, type Agent, type InsertAgent, 
  messages, type Message, type InsertMessage,
  tasks, type Task, type InsertTask
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUserById(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Agent operations
  getAgentById(id: number): Promise<Agent | undefined>;
  getAgentsByUserId(userId: number): Promise<Agent[]>;
  createAgent(agent: InsertAgent): Promise<Agent>;
  updateAgent(id: number, data: Partial<Agent>): Promise<Agent | undefined>;
  deleteAgent(id: number): Promise<boolean>;
  
  // Message operations
  getMessagesByAgentId(agentId: number): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
  
  // Task operations
  getTaskById(id: number): Promise<Task | undefined>;
  getTasksByAgentId(agentId: number): Promise<Task[]>;
  getTasksByUserId(userId: number): Promise<Task[]>;
  createTask(task: InsertTask): Promise<Task>;
  updateTask(id: number, data: Partial<Task>): Promise<Task | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private agents: Map<number, Agent>;
  private messages: Map<number, Message>;
  private tasks: Map<number, Task>;
  
  private currentUserId: number;
  private currentAgentId: number;
  private currentMessageId: number;
  private currentTaskId: number;

  constructor() {
    this.users = new Map();
    this.agents = new Map();
    this.messages = new Map();
    this.tasks = new Map();
    
    this.currentUserId = 1;
    this.currentAgentId = 1;
    this.currentMessageId = 1;
    this.currentTaskId = 1;

    // Create an initial demo user
    this.createUser({
      username: "demo",
      password: "password123",
      email: "demo@vetroai.com",
      fullName: "Demo User"
    });
  }

  // User operations
  async getUserById(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const createdAt = new Date();
    const user: User = { ...insertUser, id, createdAt };
    this.users.set(id, user);
    return user;
  }

  // Agent operations
  async getAgentById(id: number): Promise<Agent | undefined> {
    return this.agents.get(id);
  }

  async getAgentsByUserId(userId: number): Promise<Agent[]> {
    return Array.from(this.agents.values()).filter(
      (agent) => agent.userId === userId
    );
  }

  async createAgent(insertAgent: InsertAgent): Promise<Agent> {
    const id = this.currentAgentId++;
    const createdAt = new Date();
    const lastActive = new Date();
    const agent: Agent = { ...insertAgent, id, createdAt, lastActive };
    this.agents.set(id, agent);
    return agent;
  }

  async updateAgent(id: number, data: Partial<Agent>): Promise<Agent | undefined> {
    const agent = await this.getAgentById(id);
    if (!agent) return undefined;
    
    const updatedAgent = { ...agent, ...data };
    this.agents.set(id, updatedAgent);
    return updatedAgent;
  }

  async deleteAgent(id: number): Promise<boolean> {
    return this.agents.delete(id);
  }

  // Message operations
  async getMessagesByAgentId(agentId: number): Promise<Message[]> {
    return Array.from(this.messages.values()).filter(
      (message) => message.agentId === agentId
    ).sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = this.currentMessageId++;
    const timestamp = new Date();
    const message: Message = { ...insertMessage, id, timestamp };
    this.messages.set(id, message);
    
    // Update agent's lastActive timestamp
    if (insertMessage.sender === 'agent') {
      const agent = await this.getAgentById(insertMessage.agentId);
      if (agent) {
        await this.updateAgent(agent.id, { lastActive: new Date() });
      }
    }
    
    return message;
  }

  // Task operations
  async getTaskById(id: number): Promise<Task | undefined> {
    return this.tasks.get(id);
  }

  async getTasksByAgentId(agentId: number): Promise<Task[]> {
    return Array.from(this.tasks.values()).filter(
      (task) => task.agentId === agentId
    ).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getTasksByUserId(userId: number): Promise<Task[]> {
    return Array.from(this.tasks.values()).filter(
      (task) => task.userId === userId
    ).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createTask(insertTask: InsertTask): Promise<Task> {
    const id = this.currentTaskId++;
    const createdAt = new Date();
    const task: Task = { ...insertTask, id, createdAt, completedAt: null, result: null };
    this.tasks.set(id, task);
    return task;
  }

  async updateTask(id: number, data: Partial<Task>): Promise<Task | undefined> {
    const task = await this.getTaskById(id);
    if (!task) return undefined;
    
    const updatedTask = { ...task, ...data };
    this.tasks.set(id, updatedTask);
    return updatedTask;
  }
}

export const storage = new MemStorage();
