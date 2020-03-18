import {Group} from '../../models/Group';

export class AddGroup {
    static readonly type = '[Group] Add';
    constructor(public payload: any) {
    }
}

export class GetGroupView {
    static readonly type = '[Group] Get Group View';
    constructor(public id: string) {
    }
}

export class GetGroupArr {
    static readonly type = '[Group] Get Group Arr';
}

export class UpdateGroup {
    static readonly type = '[Group] Update';

    constructor(public payload: any, public id: number) {
    }
}

export class DeleteGroup {
    static readonly type = '[Group] Delete';

    constructor(public id: number) {
    }
}

export class SetSelectedGroup {
    static readonly type = '[Group] Set';

    constructor(public payload: Group) {
    }
}
