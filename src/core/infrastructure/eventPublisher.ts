import { EventEmitter2 } from "@nestjs/event-emitter";
import { EventPublisher } from "../domain/event-publisher";
import { DomainEvent } from "../domain/domain-event";
import { Injectable } from "@nestjs/common";

@Injectable()
export class EventEmmiterNest implements EventPublisher{
 constructor(private eventEmitter: EventEmitter2) {}

    publish(events:DomainEvent[]) {
            events.forEach(
                event => this.eventEmitter.emit(event.type,event)
            )
    }
}

export const EVENTEMMITER_NEST = Symbol('NEST_EVENTEMMITER')