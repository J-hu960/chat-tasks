import { RegisterMessageCommandHandler } from "./register-message.command-handler"
import { MessagesRepositoryInmemory } from "../../../../infrastructure/in-memory/messages.repository"
import { EventPublisher } from "../../../../domain/event-publisher"
import { EventEmmiterNest } from "../../../../infrastructure/eventPublisher"
import { EventEmitter2 } from "@nestjs/event-emitter"
import { RegisterMessageCommand } from "./register-message.command"
import { InvalidIdError } from "../../../../domain/invalid-id.error"
import { InvalidMessageLength } from "../../../../domain/calendar-bot/messages/excepcions/InvalidMessageLength.error"
import { MessagesRepository } from "../../../../domain/calendar-bot/messages/messages.repository"



describe('RegisterMessageCommandHandler', () => {
  let repository: MessagesRepository
  let handler: RegisterMessageCommandHandler
  let eventPublisher:EventPublisher

  const prepareScenario = () => {
    repository = new MessagesRepositoryInmemory();
    const nesteEventEmmiter = new EventEmitter2();
    eventPublisher = new EventEmmiterNest(nesteEventEmmiter); //deberia ser un mock
    handler = new RegisterMessageCommandHandler(repository,eventPublisher);

  }

  const createCommandFromParams = (id:string,content:string) => {
    return new RegisterMessageCommand(id,content)
  }

  afterEach(() => {
  })

  describe('When the input is not valid large', () => {
    beforeEach(() => {
      prepareScenario()
    })

    it('should throw invalid id error for an invalid id', () => {
    
      const command:RegisterMessageCommand = createCommandFromParams("defghujik","hello hello")
      expect(()=>handler.handle(command)).toThrow(InvalidIdError)
      console.log(repository)
    })
    it('should throw too large message error for a too a message over 500 ch', () => {
    
        const command:RegisterMessageCommand = createCommandFromParams("123e4567-e89b-12d3-a456-426614174000","hello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hello hello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hello")
        expect(()=>handler.handle(command)).toThrow(InvalidMessageLength)
      })


  })

  describe('When the input is valid', () => {
    beforeEach(() => {
      prepareScenario()
    })

    it('should save the message', () => {
      const command:RegisterMessageCommand = createCommandFromParams("123e4567-e89b-12d3-a456-426614174000","Create a task for studying tomorrow golang during 2 hours")
      handler.handle(command)
      
      //le estoy pasando el user_id del mensaje, en realidad deberiamos buscar por el ID del mensaje.
      expect(repository.exists(command.userId)).toBeTruthy()
    })
  

      
  })

})

