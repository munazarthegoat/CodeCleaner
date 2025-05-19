// Use node-fetch
import fetch from 'node-fetch';

// Using a free and open source model API
const AI_API_URL = 'https://free-api.lexica.art/v1/completion';

/**
 * Generate a response from an AI agent based on conversation history and agent configuration
 */
export async function generateAgentResponse(
  agentConfig: {
    name: string;
    role: string;
    goals: string;
    personality: string;
    autonomyLevel: string;
  },
  conversationHistory: Array<{ role: "user" | "assistant"; content: string }>,
  prompt: string
): Promise<string> {
  try {
    // Create the system message that defines the agent's behavior
    const systemMessage = `You are ${agentConfig.name}, an AI assistant with the role of ${agentConfig.role}.
Your primary goals are: ${agentConfig.goals}
Your personality is: ${agentConfig.personality}
Your autonomy level is: ${agentConfig.autonomyLevel}

Respond to the user's queries while staying in character and focusing on helping achieve the stated goals.`;

    // Format conversation history
    const formattedHistory = conversationHistory
      .map(msg => `${msg.role === 'user' ? 'Human' : 'Assistant'}: ${msg.content}`)
      .join('\n\n');

    // Build the input prompt
    const inputText = `${systemMessage}

Previous conversation:
${formattedHistory}