import { Controller, Inject, Sse, Query, OnModuleDestroy, OnModuleInit, MessageEvent } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Observable, Subject } from 'rxjs';
import { Task } from 'src/core/domain/calendar-bot/tasks/task';
import { TaskCreatedEvent, TaskCreatedPayload } from 'src/core/domain/calendar-bot/tasks/task-created.event';
import { EVENTEMMITER_NEST, EventEmmiterNest } from 'src/core/infrastructure/eventPublisher';

@Controller()
export class TasksController implements OnModuleInit, OnModuleDestroy {
  private clients = new Map<string, Subject<MessageEvent>>(); // 🔴 Guarda los clientes conectados

  constructor(
    @Inject(EVENTEMMITER_NEST) private readonly eventEmmitter: EventEmmiterNest
  ) {}

  // 🔵 SSE: Cliente se conecta y envía su `userId`
  @Sse('new-task')
  sendNewTasks(@Query('userId') userId: string): Observable<MessageEvent> {
    if (!userId) throw new Error("❌ userId es requerido");

    console.log(`✅ Cliente conectado: ${userId}`);

    const clientStream = new Subject<MessageEvent>();
    this.clients.set(userId, clientStream);

    return new Observable(observer => {
      observer.next({ data: `Conexión establecida para cliente ${userId}` });

      const subscription = clientStream.subscribe(event => observer.next(event));

      return () => {
        console.log(`❌ Cliente desconectado: ${userId}`);
        this.clients.delete(userId);
        subscription.unsubscribe();
      };
    });
  }


  // 🔴 Evento: Se emite cuando se crea una nueva tarea
  @OnEvent(TaskCreatedEvent.Type)
  handleNewTask(task: TaskCreatedEvent): void {
    console.log("🚀 Nueva tarea recibida:", task);

    const userId = task.payload.user_id; 

    const clientStream = this.clients.get(userId);
    if (clientStream) {
      console.log(`📩 Enviando tarea al cliente ${userId}`);
      clientStream.next({ data: task });
    } else {
      console.log(`⚠️ Cliente ${userId} no está conectado`);
    }
  }

  onModuleDestroy() {
    this.clients.forEach(client => client.complete());
    this.clients.clear();
  }

  onModuleInit() {
    console.log("✅ TasksController inicializado y listo.");
  }
}
