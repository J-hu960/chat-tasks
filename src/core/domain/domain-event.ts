import { EventId } from "./event.id";
import { Id } from "./id";

type primitive = string | number | boolean | Date;
type Map = {[key:string]:primitive};

export abstract class DomainEvent <Payload extends Map = Map>{
    readonly id: Id;
    readonly aggregateId:EventId;
    readonly type:string;
    readonly payload:Payload;
    readonly occuredOn:Date;
    readonly version:number;

    protected constructor(
        aggregateId:Id,
        type:string,
        payload:Payload,
        version:number = 1,
    ){
        this.aggregateId = aggregateId;
        this.id = EventId.new();
        this.type = type;
        this.payload = payload;
        this.version = version;
        this.occuredOn = new Date();
        
    }

}