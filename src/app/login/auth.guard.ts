import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, Router} from "@angular/router";
import { UserService } from './user.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    public userService: UserService,
    private router: Router
  ) {}

  canActivate(): Promise<boolean>{
    return new Promise((resolve, reject) => {
      this.userService.getCurrentUser()
    })
  }
}