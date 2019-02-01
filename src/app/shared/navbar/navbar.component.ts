import { Component, OnInit, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from '../../login/auth.service'
import { UserService } from '../../login/user.service';

export var logoExport:string;

@Component({
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html',
    styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit{
    location: Location
    private toggleButton: any
    private sidebarVisible: boolean

    public title: string
    public urlLogo: any
    public nameUser: any

    public db


    constructor(public authService: AuthService, private userService: UserService, location: Location,  private element: ElementRef) {
        this.title = this.getTitle()
        this.location = location
        this.sidebarVisible = false
    }

    async ngOnInit() {
        this.urlLogo = ""
        logoExport = this.urlLogo
        this.nameUser = await this.getName()
        const navbar: HTMLElement = this.element.nativeElement
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0]
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton
        const body = document.getElementsByTagName('body')[0]
        setTimeout(function() {
            toggleButton.classList.add('toggled')
        }, 500);
        body.classList.add('nav-open')
        this.sidebarVisible = true
    };

    sidebarClose() {
        const body = document.getElementsByTagName('body')[0]
        this.toggleButton.classList.remove('toggled')
        this.sidebarVisible = false
        body.classList.remove('nav-open')
    };

    sidebarToggle() {
        if (this.sidebarVisible === false) {
            this.sidebarOpen()
        } else {
            this.sidebarClose()
        }
    };

    /*
    Param: None
    Return: email address: string
    Func: Get the email address
    */
    async getName() {
        return ("User user")
    }

    /*
    Param: None
    Return: name: string
    Func: Get the page's title
    */
    getTitle() {
      return "Dashboard";
    }

    /*
    Param: None
    Return: None
    Func: Logout the current user + Redirection -> Login
    */    
    logout(){
	    this.authService.doLogout()
	    this.location.go("/login")
    }
}
