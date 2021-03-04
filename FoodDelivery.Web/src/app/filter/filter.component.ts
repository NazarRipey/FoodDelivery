import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  expanded: boolean = true;

  constructor(private router:Router, private route:ActivatedRoute) { }

  @Input()
  name;

  urlTree;
  values: string[];

  p1 = "p1";
  p2 = "p2";
  p3 = "p3";

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.values = params[this.name] ? JSON.parse(params[this.name]) : [];
    });   
     
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
  }

  onCheckBoxChange(e){
    if(e.target.checked) {
      this.values.push(e.target.value);
    }    
    else {
      this.values = this.values.filter(item => item !== e.target.value);
    }

    if(this.values.length > 0){
      this.router.navigate([], {queryParams: {[this.name]: JSON.stringify(this.values)}, queryParamsHandling: 'merge'});
    }
    else{
      this.router.navigate([], {queryParams: {[this.name]: null}, queryParamsHandling: 'merge'});
    }
  }
}
