import { MessageContent } from "src/core/domain/calendar-bot/messages/value-objects/content";
import { LLMService } from "src/core/domain/calendar-bot/tasks/LLM-service";
import { Task } from "src/core/domain/calendar-bot/tasks/task";
import { ChatOpenAI } from "@langchain/openai";
import { z } from "zod";
import { UserId } from "src/core/domain/auth/users/value-objects/id";
import { Party } from "src/core/domain/calendar-bot/parties/party";
import { PartyId } from "src/core/domain/calendar-bot/parties/value-objects/id";

export class OpenAIService implements LLMService {
  constructor() {}

  async generateTask(message: string, userId:UserId,user_parties:Party[]): Promise<Task> {
    const llm = new ChatOpenAI({ 
      modelName: "gpt-4", 
      temperature: 0, 
      apiKey: process.env.OPENAI_API_KEY 
    });

    const taskSchema = z.object({
      title: z.string().max(300),
      description: z.string().max(500),
      date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      duration: z.number().int().max(1440),
      hour: z.number().int().max(23).min(0),
      group_id:z.string().max(300)

    });
    
    class PartyNameID{
      constructor(
        readonly party_id:string,
        readonly party_name:string
      ){}
    }

    const promt_parties = user_parties.map(party=>new PartyNameID(party.id.value,party.name.name))
    
    const today = new Date().toISOString().split("T")[0];
    console.log(`using prompt parties: ${promt_parties.map(p=>p.party_id)}`)

    const prompt = `
    Extract a task from the following message. The task must contain the following fields:
- title: A very very short title (max 100 characters)
- description: A brief description of the task (max 500 characters). If the input is short, 
  you should provide a brief explanation.
- date: The date of the task in format YYYY-MM-DD. You have to reason about what day is today, and calculate the 
  date the user is really asking, could be "tomorrow" for example. Take into account that month 03 has only 28 days.
- duration: The duration of the task in minutes (between 1 and 1440 minutes)
- hour: The hour of the day the task will begin (between 0 and 23)
- group_id: I will provide you with a list of groups the user is in, if it doesn't mention a group, just return 'none' in this field. The list is structured as follows:

  User Groups:
  [
    { "id": "60f840ec-9865-43cc-bcf3-c962f2456f23", "name": "sdfg" },
    { "id": "6f4f059a-a0b9-4eb0-b069-15cf43889c3e", "name": "sqdwer" }
  ]

  If the message mentions the name of any of these groups, replace the group name with the corresponding id in this field. 
  It is VERY IMPORTANT that you correctly assign the ID.

Example:

Message: "I have a meeting with the sdfg group tomorrow at 10 AM."
User Groups: [
  { "id": "60f840ec-9865-43cc-bcf3-c962f2456f23", "name": "sdfg" },
  { "id": "6f4f059a-a0b9-4eb0-b069-15cf43889c3e", "name": "sqdwer" }
]
Today is 2025-03-17.

Expected output:
{
  "title": "Meeting with sdfg",
  "description": "A meeting with the sdfg group.",
  "date": "2025-03-18",
  "duration": "",
  "hour": "10",
  "group_id": "60f840ec-9865-43cc-bcf3-c962f2456f23"
}

Now, extract the required fields from the following input:

Message: "${message}"
User Groups: ${JSON.stringify(promt_parties, null, 2)}


Follow this format strictly and extract the required fields only. If a field is not found, leave it blank.

Very important, take into account that today is ${today}.

    `;

    const llm_w_structuredOutput = llm.withStructuredOutput(taskSchema);
    const response = await llm_w_structuredOutput.invoke(prompt);
    console.log(response)

    
  return Task.create(userId,response.title,response.description,response.date,response.duration,response.hour,PartyId.fromExisting(response.group_id));
}

}
