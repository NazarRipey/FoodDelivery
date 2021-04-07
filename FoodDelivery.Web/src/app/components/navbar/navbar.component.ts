import { CartService } from './../../services/cart.service';
import { CartHelper } from '../../helpers/CartHelper';
import { OwnerRequestStatus } from '../../models/enums/statuses/OwnerRequestStatus';
import { UserHelper } from '../../helpers/UserHelper';
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
  ownerRequestStatus: OwnerRequestStatus;

  constructor(private modalService: NgbModal,
    public userHelper:UserHelper,
    public cartHelper:CartHelper,
    public cartService: CartService) { }

  ngOnInit(): void {
  }

  openSignUp(){
    this.modalService.open(SignUpComponent);
    this.cartHelper.info.total
  }

  openLogIn(){
    this.modalService.open(LogInComponent);
  }

  LogOut(){
    this.userHelper.LogOut();
  }
}
