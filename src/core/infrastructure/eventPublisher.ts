import { EventEmitter2 } from "@nestjs/event-emitter";
import { EventPublisher } from "../domain/event-publisher";
import { DomainEvent } from "../domain/domain-event";
import { Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class EventEmmiterNest implements EventPublisher{
 constructor(readonly eventEmitter: EventEmitter2) {}

    publish(events:DomainEvent[]) {
            events.forEach(
                event => this.eventEmitter.emit(event.type,event)
            )
    }

    listenTo(eventType: string): Observable<any> {
        return new Observable((observer) => {
          this.eventEmitter.on(eventType, (data) => {
            observer.next(data);  // Emitimos el evento al observable
          });
        });
      }


}

export const EVENTEMMITER_NEST = Symbol('NEST_EVENTEMMITER')