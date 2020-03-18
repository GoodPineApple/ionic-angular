import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

import { Group } from '../../models/Group';

import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  group : any = {};
  groupArr : any = [];
  // db = firebase.firestore();

  constructor(private http: HttpClient) { 
    console.log("[group.service constructor]");
  }
  async getGroupByGrpId(grpId : string) {
    console.log("[group.service getGrpByGrpId]");
    await firebase.firestore().collection("group")
      .doc(`${grpId}`)
      .get()
      .then((docs) => {
        this.group = docs.data();
    });
    console.log(this.group);
    console.log(this.groupArr);
    return this.group;
  }

  async getGroupArrByShopId(shopId : string) {
    console.log("[group.service getGroupArrByShopId]");
    await firebase.firestore().collection("group")
      .where("shopId", "==", `${shopId}`)
      .orderBy("createDate", "desc")  
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.map(doc => {
          let data = doc.data();
          let temp : Group;
          temp = {
            id : doc.id,
            groupName : data.groupName,
            groupDetail : data.groupDetail,
            profileId: data.profileId,
            shopId: data.shopId,
            createUid : data.createUid,
            updateUid : data.updateUid,
            createDate : data.createDate,
            updateDate : data.updateDate
          };
          this.groupArr.push(temp);
        })
      });
    return this.groupArr;
  }

  deleteGroup(id: number) {
    console.log("[group.service deleteGroup]");
    return this.http.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
  }

  async addGroup(param: Group) {
    console.log("[group.service addGroup]");
    let group : Group = {
      id : "",
      groupName : param.groupName,
      groupDetail : param.groupDetail,
      profileId: param.profileId,
      shopId: param.shopId,
      createUid : 1,
      updateUid : 1,
      createDate : firebase.firestore.Timestamp.fromDate(new Date()),
      updateDate : firebase.firestore.Timestamp.fromDate(new Date())
    };
    const groupRef = await firebase.firestore().collection("group").doc();
    group.id = groupRef.id;
    await groupRef
      .set(group)
      .then((resp) => {
        console.log(resp)
      })
    return group;
  }

  updateGroup(payload: Group, id: number) {
    console.log("[group.service updateGroup]");
    return this.http.put<Group>(`https://jsonplaceholder.typicode.com/todos/${id}`, payload);
  }

}
