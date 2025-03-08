// // infrastructure/adapters/google-calendar-adapter.ts
// import { google } from 'googleapis';
// import { Calendar } from 'src/core/domain/conversations/tasks/calendar.interface';
// import { Task } from 'src/core/domain/conversations/tasks/task';

// export class GoogleCalendar implements Calendar {
//   private oAuth2Client: any;

//   constructor(clientId: string, clientSecret: string, redirectUri: string) {
//     this.oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);
//   }

//   async addEventToCalendar( task: Task,access_token:string,refresh_token:string): Promise<void> {
 
    
//     this.oAuth2Client.setCredentials({ access_token, refresh_token });

//     const calendar = google.calendar({ version: 'v3', auth: this.oAuth2Client });
//     const startDate = new Date(task.date.date);
//     const durationInMinutes = task.duration;   

//     startDate.setMinutes(startDate.getMinutes() + durationInMinutes.toMinutes());

//     const event = {
//       description: task.description.Description,
//       start: { dateTime: task.date.date },
//       end: { dateTime: task.date.date + task.duration.toString },
//     };

//     await calendar.events.insert({
//       calendarId: 'primary',
//       requestBody: event,
//     });
//   }

//   async refreshAccessTokenIfNeeded(token:string,refresh_token: string): Promise<string> {

    
//     this.oAuth2Client.setCredentials({ token, refresh_token });

//     try {
//       const token = await this.oAuth2Client.getAccessToken();
//       if (token?.token) return token.token;

//       const newTokens = await this.oAuth2Client.refreshAccessToken();
//       const newAccessToken = newTokens.credentials.access_token;

//       return newAccessToken;
//     } catch (err) {
//       console.error('Error refreshing access token', err);
//       throw err;
//     }
//   }
// }
