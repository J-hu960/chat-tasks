import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegisterMessageController } from './core/ui/api/calendar-bot/messages/create-message.controller';
import { RegisterMessageCommandHandler } from './core/application/calendar-bot/messages/register/register-message.command-handler';
import { MESSAGE_REPOSITORY } from './core/domain/calendar-bot/messages/messages.repository';
import { MessagesRepositoryInmemory } from './core/infrastructure/in-memory/messages.repository';
import { EVENTEMMITER_NEST, EventEmmiterNest } from './core/infrastructure/eventPublisher';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ReservationCreatedHandler } from './core/ui/api/calendar-bot/messages/message.created.event-handler';
import { LLMSERVICE } from './core/domain/calendar-bot/tasks/LLM-service';
import { OpenAIService } from './core/infrastructure/llm/openAi-service';
import { TASK_REPOSITORY } from './core/domain/calendar-bot/tasks/tasks.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { RegisterUserController } from './core/ui/api/auth/register-user.controller';
import { RegisterUserCommandHandler } from './core/application/auth/register-user/register-user.command-handler';
import { USER_REPOSITORY } from './core/domain/auth/users/user.repository';
import { ENCRYPTION_SERVICE } from './core/domain/auth/CryptService';
import { AUTH_TOKEN_SERVICE, AuthTokenService } from './core/infrastructure/auth/services/jwt.service';
import { BcryptService } from './core/infrastructure/auth/services/bycrypt';
import { JwtStrategy } from './core/infrastructure/auth/services/jwt.strategy';
import {ConfigModule} from '@nestjs/config'
import { LoginUserController } from './core/ui/api/auth/login-user.controller';
import { LogInUserCommandHandler } from './core/application/auth/login/login-user.command-handler';
import { GetTasksController } from './core/ui/api/calendar-bot/tasks/get-tasks.controller';
import { GetTasksQueryHandler } from './core/application/calendar-bot/tasks/get-tasks/get-tasks.query-handler';
import { VersionController } from './core/ui/api/version-check';
import { AuthGuard } from './core/ui/api/auth/nest_authguard';
import { DeleteTaskController } from './core/ui/api/calendar-bot/tasks/delete-tasks.controller';
import { DeleteTaskCommandHandler } from './core/application/calendar-bot/tasks/delete/delete-task.command-handler';
import { UpdateTaskController } from './core/ui/api/calendar-bot/tasks/update-task.controller';
import { UpdateTaskCommandHandler } from './core/application/calendar-bot/tasks/update-task/update-task.command-handler';
import { TasksController } from './core/ui/api/calendar-bot/tasks/task-created.controller';
import { MongoUserRepository } from './core/infrastructure/mongo/users/repository';
import { MongoTaskRepository } from './core/infrastructure/mongo/tasks/repository';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskModel, TaskSchema } from './core/infrastructure/mongo/tasks/schema';
import { UserModel, UserSchema } from './core/infrastructure/mongo/users/schema';
import { TaskRepositoryInmemory } from './core/infrastructure/in-memory/tasks.repository';
import { UserRepositoryInmemory } from './core/infrastructure/in-memory/users.repository';
import { LoggerService } from './core/infrastructure/logger/nest-logger';
import { LOGGER_SYMBOL } from './core/domain/logger.interface';
import { RegisterPartyController } from './core/ui/api/calendar-bot/parties/create-party.controller';
import { RegisterPartyCommanHandler } from './core/application/calendar-bot/parties/create-party/register-party.command-handler';
import { PartyModel, PartySchema } from './core/infrastructure/mongo/parties/schema';
import { PARTY_REPOSITORY } from './core/domain/calendar-bot/parties/party.repository';
import { PartyRepositoryInMemory } from './core/infrastructure/in-memory/parties.repo';
import { JoinPartyController } from './core/ui/api/calendar-bot/parties/join-party.controller';
import { JoinPartyCommandHandler } from './core/application/calendar-bot/parties/join-party/join-party.command-handler';

@Module({
  imports: [ ConfigModule.forRoot({
    isGlobal: true, 
  }),
    EventEmitterModule.forRoot(),
     MongooseModule.forRoot(process.env.DATABASE_URL),
     MongooseModule.forFeature([
      { name: TaskModel.name, schema: TaskSchema },  
      { name: UserModel.name, schema: UserSchema },  
      {name:PartyModel.name,schema:PartySchema}
    ]),
   
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret: process.env.JWT_SECRET, 
      signOptions: { expiresIn: "3h" },
      
    }),
  ],
  controllers: [AppController,RegisterMessageController,RegisterUserController,
    LoginUserController,GetTasksController,VersionController,DeleteTaskController,UpdateTaskController,
    TasksController,RegisterPartyController, JoinPartyController],
  providers: [AppService, RegisterMessageCommandHandler, DeleteTaskCommandHandler,
     ReservationCreatedHandler,RegisterUserCommandHandler, UpdateTaskCommandHandler,
    JwtStrategy,LogInUserCommandHandler,AuthGuard,GetTasksQueryHandler,
    {provide:MESSAGE_REPOSITORY,useClass:MessagesRepositoryInmemory},
    {provide:EVENTEMMITER_NEST,useClass:EventEmmiterNest},
    {provide:LLMSERVICE,useClass:OpenAIService},
    {provide:TASK_REPOSITORY,useClass:TaskRepositoryInmemory},
    {provide:USER_REPOSITORY,useClass:UserRepositoryInmemory},
    {provide:AUTH_TOKEN_SERVICE,useClass:AuthTokenService},
    {provide:ENCRYPTION_SERVICE,useClass:BcryptService},
    {provide:LOGGER_SYMBOL,useClass:LoggerService},
    {provide:PARTY_REPOSITORY,useClass:PartyRepositoryInMemory},
    RegisterPartyCommanHandler,
    JoinPartyCommandHandler

  ],
})
export class AppModule {}
