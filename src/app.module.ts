import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegisterMessageController } from './core/ui/api/conversations/messages/create-message.controller';
import { RegisterMessageCommandHandler } from './core/application/conversations/messages/register/register-message.command-handler';
import { MESSAGE_REPOSITORY } from './core/domain/calendar-bot/messages/messages.repository';
import { MessagesRepositoryInmemory } from './core/infrastructure/in-memory/messages.repository';
import { EVENTEMMITER_NEST, EventEmmiterNest } from './core/infrastructure/eventPublisher';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ReservationCreatedHandler } from './core/ui/api/conversations/messages/message.created.event-handler';
import { LLMSERVICE } from './core/domain/calendar-bot/tasks/LLM-service';
import { OpenAIService } from './core/infrastructure/llm/openAi-service';
import { TASK_REPOSITORY } from './core/domain/calendar-bot/tasks/tasks.repository';
import { TaskRepositoryInmemory } from './core/infrastructure/in-memory/tasks.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { RegisterUserController } from './core/ui/api/auth/register-user.controller';
import { RegisterUserCommandHandler } from './core/application/auth/register-user/register-user.command-handler';
import { USER_REPOSITORY } from './core/domain/auth/users/user.repository';
import { UserRepositoryInmemory } from './core/infrastructure/in-memory/users.repository';
import { ENCRYPTION_SERVICE } from './core/domain/auth/CryptService';
import { AUTH_TOKEN_SERVICE, AuthTokenService } from './core/infrastructure/auth/services/jwt.service';
import { BcryptService } from './core/infrastructure/auth/services/bycrypt';
import { JwtStrategy } from './core/infrastructure/auth/services/jwt.strategy';
import {ConfigModule} from '@nestjs/config'
import { LoginUserController } from './core/ui/api/auth/login-user.controller';
import { LogInUserCommandHandler } from './core/application/auth/login/login-user.command-handler';
import { GetTasksController } from './core/ui/api/conversations/tasks/get-tasks.controller';
import { GetTasksQueryHandler } from './core/application/conversations/tasks/get-tasks/get-tasks.query-handler';
import { VersionController } from './core/ui/api/version-check';
import { AuthGuard } from './core/ui/api/auth/nest_authguard';
import { DeleteTaskController } from './core/ui/api/conversations/tasks/delete-tasks.controller';
import { DeleteTaskCommandHandler } from './core/application/conversations/tasks/delete/delete-task.command-handler';
import { UpdateTaskController } from './core/ui/api/conversations/tasks/update-task.controller';
import { UpdateTaskCommandHandler } from './core/application/conversations/tasks/update-task/update-task.command-handler';
// import { TaskSseController } from './core/ui/api/conversations/tasks/task.created.controller';

@Module({
  imports: [EventEmitterModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret: process.env.JWT_SECRET, 
      signOptions: { expiresIn: "3h" },
      
    }),
  ],
  controllers: [AppController,RegisterMessageController,RegisterUserController,
    LoginUserController,GetTasksController,VersionController,DeleteTaskController,UpdateTaskController],
  providers: [AppService, RegisterMessageCommandHandler, DeleteTaskCommandHandler,
     ReservationCreatedHandler,RegisterUserCommandHandler, UpdateTaskCommandHandler,
    JwtStrategy,LogInUserCommandHandler,AuthGuard,GetTasksQueryHandler,
    {provide:MESSAGE_REPOSITORY,useClass:MessagesRepositoryInmemory},
    {provide:EVENTEMMITER_NEST,useClass:EventEmmiterNest},
    {provide:LLMSERVICE,useClass:OpenAIService},
    {provide:TASK_REPOSITORY,useClass:TaskRepositoryInmemory},
    {provide:USER_REPOSITORY,useClass:UserRepositoryInmemory},
    {provide:AUTH_TOKEN_SERVICE,useClass:AuthTokenService},
    {provide:ENCRYPTION_SERVICE,useClass:BcryptService}

  ],
})
export class AppModule {}
