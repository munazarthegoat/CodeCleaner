import OpenAI from "openai";

// Initialize the OpenAI client
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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
) {
  try {
    // Create the system message that defines the agent's behavior
    const systemMessage = `You are ${agentConfig.name}, an AI assistant with the role of ${agentConfig.role}.
Your primary goals are: ${agentConfig.goals}
Your personality is: ${agentConfig.personality}
Your autonomy level is: ${agentConfig.autonomyLevel}

Respond to the user's queries while staying in character and focusing on helping achieve the stated goals.`;

    // Build the complete message history
    const messages = [
      { role: "system", content: systemMessage },
      ...conversationHistory,
      { role: "user", content: prompt }
    ];

    // Call the OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: messages as any,
      temperature: 0.7,
      max_tokens: 500
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error generating agent response:", error);
    if (error.status === 401) {
      return "⚠️ API key error: Please check your OpenAI API key configuration.";
    }
    return "Sorry, I encountered an error while processing your request. Please try again later.";
  }
}

/**
 * Analyze task requirements and generate a structured plan
 */
export async function analyzeTask(taskDescription: string) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        {
          role: "system",
          content: "You are a task analysis expert. Break down the given task into clear steps and provide insights on how to approach it effectively. Format your response as JSON with the following structure: { steps: string[], estimatedTimeHours: number, complexity: string, keyConsiderations: string[] }"
        },
        {
          role: "user",
          content: taskDescription
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.5
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error("Error analyzing task:", error);
    if (error.status === 401) {
      return { error: "API key error: Please check your OpenAI API key configuration." };
    }
    return { error: "Failed to analyze task. Please try again later." };
  }
}

/**
 * Generate insights from a collection of messages
 */
export async function generateInsights(messages: Array<{ content: string; sender: string }>) {
  try {
    const messageTexts = messages.map(msg => `${msg.sender}: ${msg.content}`).join("\n\n");
    
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        {
          role: "system",
          content: "You are an insights analyzer that identifies patterns, key themes, and actionable insights from conversation history. Provide a summary of important points and suggest next steps. Format your response as JSON with the following structure: { keyThemes: string[], actionItems: string[], opportunities: string[] }"
        },
        {
          role: "user",
          content: messageTexts
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.5
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error("Error generating insights:", error);
    if (error.status === 401) {
      return { error: "API key error: Please check your OpenAI API key configuration." };
    }
    return { error: "Failed to generate insights. Please try again later." };
  }
}