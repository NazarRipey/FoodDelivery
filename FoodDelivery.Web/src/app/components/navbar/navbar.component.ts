import { ownerRequestStatus } from './../../models/enums/statuses/ownerRequestStatus';
import { userHelper } from '../../helpers/userHelper';
import { LogInComponent } from '../auth/log-in/log-in.component';
import { SignUpComponent } from '../auth/sign-up/sign-up.component';
import { AppComponent } from '../../app.component';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {  
  toggleNavbar = true;
  ownerRequestStatus: ownerRequestStatus;

  constructor(private modalService: NgbModal, public userHelper:userHelper) { }

  ngOnInit(): void {
  }

  openSignUp(){
    this.modalService.open(SignUpComponent);
  }

  openLogIn(){
    this.modalService.open(LogInComponent);
  }

  LogOut(){
    this.userHelper.LogOut();
  }
}
