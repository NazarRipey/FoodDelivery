import { AppComponent } from './../app.component';
import { Component, HostListener, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {  
  toggleNavbar = true;

  constructor() { }

  ngOnInit(): void {
  }

}
