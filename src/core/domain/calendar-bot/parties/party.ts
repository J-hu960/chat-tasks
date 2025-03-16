import { UserId } from "../../auth/users/value-objects/id";
import { PartyCode } from "./value-objects/code";
import { PartyId } from "./value-objects/id";
import { PartyName } from "./value-objects/name";

export class Party{
    private constructor(
        readonly id:PartyId,
        readonly name:PartyName,
        readonly code:PartyCode,
        readonly created_by:UserId,
        readonly users_id:UserId[],
        readonly created_at:Date

    ){
        this.id = id;
        this.name = name;
        this.created_at = new Date;
        this.users_id = users_id;
        this.created_by = created_by;
        this.created_at = created_at;
    }



    static create(namestr:string,codestr:string,created_by:UserId,users_id:UserId[]){
        const id = PartyId.new();
        const name = PartyName.create(namestr)
        const code = PartyCode.withValue(codestr)
        const created_at = new Date
        return new Party(id,name,code,created_by,users_id,created_at);
    }

    static fromExisting(idstr:string,namestr:string,codestr:string,created_by:UserId,users_id:UserId[],created_at:Date){
        const id = PartyId.fromExisting(idstr);
        const name = PartyName.create(namestr)
        const code = PartyCode.withValue(codestr)

        return new Party(id,name,code,created_by,users_id,created_at);

    }
}