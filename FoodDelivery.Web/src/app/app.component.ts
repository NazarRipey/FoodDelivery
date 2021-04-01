import { AfterViewInit, Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @HostListener('window:beforeunload')
  setY() {
    localStorage.setItem('scrollpos', window.scrollY.toString())
  }

  ngAfterViewInit(): void {
    var scrollpos = localStorage.getItem('scrollpos');
    setTimeout(() => {
      if(scrollpos)
      {
        window.scrollTo(0, +scrollpos);
      }
    },250)
  }
}
