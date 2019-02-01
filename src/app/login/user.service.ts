import { Injectable } from "@angular/core";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {

  constructor(){
  }


  getCurrentUser(){
    return "User User"
  }

  getCurrentUserEmail(){
    return "user@user.com"
  }

}