import {State, Action, StateContext, Selector} from '@ngxs/store';
import {Group} from '../../models/Group';
import {AddGroup, DeleteGroup, GetGroupView, GetGroupArr, SetSelectedGroup, UpdateGroup} from '../../actions/group/group.action';
import {GroupService} from '../../services/group/group.service';
import {tap} from 'rxjs/operators';

export class GroupStateModel {
    groupArr: Group[];
    selectedGroup: Group;
}

@State<GroupStateModel>({
    name: 'group',     // must be unique
    defaults: {
        groupArr: [],
        selectedGroup: null
    }
})
export class GroupState {

    constructor(private groupService: GroupService) {
        console.log("[group.state constructor]");
    }
    // @Selector()
    // static getGroupView(state: GroupStateModel) {
    //     console.log("group.state getGroupArr");
    //     return state.groupArr;
    // }

    @Selector()
    static getGroupArr(state: GroupStateModel) {
        console.log("group.state getGroupArr");
        return state.groupArr;
    }

    @Selector()
    static getSelectedGroup(state: GroupStateModel) {
        return state.selectedGroup;
    }

    @Action(GetGroupView)
    async getGroupView({getState, setState}: StateContext<GroupStateModel>, {id}: DeleteGroup) {
        console.log("[group.state GetGroupView]")
        var result = await this.groupService.getGroupArrByShopId(localStorage.shopId);
        const state = getState();
        setState({
            ...state,
            groupArr: result
        })
        return result;
    }

    @Action(GetGroupArr)
    async getGroupArr({getState, setState}: StateContext<GroupStateModel>) {
        console.log("[group.state getGroupArr]")
        var result = await this.groupService.getGroupArrByShopId(localStorage.shopId);
        const state = getState();
        setState({
            ...state,
            groupArr: result
        })
        return result;
    }

    @Action(AddGroup)
    async addGroup({getState, patchState}: StateContext<GroupStateModel>, {payload}: AddGroup) {
        console.log("[group.state addGroups]");
        var result = await this.groupService.addGroup(payload);
        const state = getState();
        patchState({
            groupArr: [result, ...state.groupArr]
        });
    }

    @Action(UpdateGroup)
    updateGroup({getState, setState}: StateContext<GroupStateModel>, {payload, id}: UpdateGroup) {
        console.log("[group.state updateGroup]");
        return this.groupService.updateGroup(payload, id).pipe(tap((result) => {
            const state = getState();
            const groupArr = [...state.groupArr];
            const groupIndex = 0;
            groupArr[groupIndex] = result;
            setState({
                ...state,
                groupArr: groupArr,
            });
        }));
    }


    @Action(DeleteGroup)
    deleteGroup({getState, setState}: StateContext<GroupStateModel>, {id}: DeleteGroup) {
        console.log("[group.state deleteGroup]");
        return this.groupService.deleteGroup(id).pipe(tap(() => {
            const state = getState();
            // const filteredArray = state.groupArr.filter(item => item.id !== id);
            const filteredArray = state.groupArr.filter(item => item.groupName !== "1");
            setState({
                ...state,
                groupArr: filteredArray,
            });
        }));
    }

    @Action(SetSelectedGroup)
    async setSelectedGroup({getState, setState}: StateContext<GroupStateModel>, {payload}: SetSelectedGroup) {
        console.log("[group.state setSelectedGroupId]");
        const state = getState();
        setState({
            ...state,
            selectedGroup: payload
        });
    }
}

