import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import * as firebase from 'firebase/app';
import 'firebase/auth'

@Injectable({
  providedIn: 'root'
})
export class AdvAuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        let url : string = state.url;
        let arr : string [] = url.split("/");
        
        return new Promise((resolve, reject) => { firebase.auth().onAuthStateChanged((user: firebase.User) => {
            let uid = arr.length >= 3 ? arr[2] : null;
            console.log(uid);
            const userRef = firebase.firestore().doc(`userProfile/${uid}`);
            userRef.get().then((ds) => {
                let data = ds.data();
                let userData = data ? new Map(Object.entries(data)) : null;
                let permission = userData ? userData.get("permission") : null;
                if ((uid && user.uid == uid) || permission) {
                    resolve(true);
                } 
                else if (user){
                    console.log("You have no permission");
                    this.router.navigateByUrl("mypage");
                    resolve(false);
                }
                else {
                    console.log('You have no permission and You are not even logged in!');
                    this.router.navigate(['/login']);
                    resolve(false);
                }
            });
        });
        })
  }
  
}
