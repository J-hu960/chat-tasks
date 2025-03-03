import { MessageContent } from "src/core/domain/conversations/messages/value-objects/content";
import { LLMService } from "src/core/domain/conversations/tasks/LLM-service";
import { Task } from "src/core/domain/conversations/tasks/task";
import { ChatOpenAI } from "@langchain/openai";
import { StructuredOutputParser } from "langchain/output_parsers";
import { z } from "zod";
import { UserId } from "src/core/domain/conversations/users/value-objects/id";

export class OpenAIService implements LLMService {
  constructor() {}

  async generateTask(message: string, userId:UserId): Promise<Task> {
    // Initialize the OpenAI chat model
    const llm = new ChatOpenAI({ 
      modelName: "gpt-4", 
      temperature: 0, 
      apiKey: process.env.OPENAI_API_KEY 
    });

    // Define the task schema using zod for validation
    const taskSchema = z.object({
      title: z.string().max(100),
      description: z.string().max(500),
      date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      duration: z.number().int().max(1440),
      hour: z.number().int().max(23).min(0),

    });

    // Use StructuredOutputParser to format output
    const parser = StructuredOutputParser.fromZodSchema(taskSchema);
    const formatInstructions = parser.getFormatInstructions();
    const today = new Date().toISOString().split("T")[0];

    // Create a more specific prompt template with examples
    const prompt = `
    Extract a task from the following message. The task must contain the following fields:
    - title: A very very short title (max 100 characters)
    - description: A brief description of the task (max 500 characters). If the input is short, 
    you should provide a brief explanation.
    - date: The date of the task in format YYYY-MM-DD. You have to reason about what day is today, and calculate the 
    date the user is really asking, could be "tomorrow" for example. Take into account that for example that month 03
    has only 28 days.
    - duration: The duration of the task in minutes (between 1 and 1440 minutes)
    -hour: The hour of the day the task will begin (between 0 and 23)

    If the date is mentioned as "tomorrow", calculate the day it really is.
    If the duration is mentioned in hours, convert it to minutes.

    Example:

    

    Message: "${message}"

    Follow this format strictly and extract the required fields only. If a field is not found, leave it blank.

    Very important, take into account that today is ${today}
    `;

    // Now invoke the model with the prompt and get structured output
    const llm_w_structuredOutput = llm.withStructuredOutput(taskSchema);
    const response = await llm_w_structuredOutput.invoke(prompt);

    
  return Task.create(userId,response.title,response.description,response.date,response.duration,response.hour);
}

}
