import { Id } from './id'

export class EventId extends Id {
  static new(): EventId {
    return new EventId(Id.generate())
  }
}
