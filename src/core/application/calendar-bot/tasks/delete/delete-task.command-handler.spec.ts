import { EventPublisher } from "../../../../domain/event-publisher"
import { EventEmmiterNest } from "../../../../infrastructure/eventPublisher"
import { EventEmitter2 } from "@nestjs/event-emitter"
import { DeleteTaskCommandHandler } from "./delete-task.command-handler"
import { TaskRepository } from "../../../../domain/calendar-bot/tasks/tasks.repository"
import { TaskRepositoryInmemory } from "../../../../infrastructure/in-memory/tasks.repository"
import { DeleteTaskCommand } from "./delete-task.command"



describe('Delete-task-tests', () => {
  let repository: TaskRepository
  let handler: DeleteTaskCommandHandler
  let eventPublisher:EventPublisher

  const prepareScenario = () => {
    repository = new TaskRepositoryInmemory();
    const nesteEventEmmiter = new EventEmitter2();
    eventPublisher = new EventEmmiterNest(nesteEventEmmiter); //deberia ser un mock
    handler = new DeleteTaskCommandHandler(repository);

  }

  const createCommandFromParams = (user_id:string,task_id:string) => {
    return new DeleteTaskCommand(user_id,task_id)
  }

  afterEach(() => {
  })

  describe("When the task doesn't exist", () => {
    beforeEach(() => {
      prepareScenario()
    })

    it('should throw a non existing task', () => {
    
      const command:DeleteTaskCommand= createCommandFromParams("defghujik","hello hello")
      expect(()=>handler.handle(command,"123e4567-e89b-12d3-a456-426614174000")).toThrow()
      console.log(repository)
    })


  })


})

