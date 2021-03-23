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

  @Input()
  options: string[];

  checkedOptions: string[];
  urlTree;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.checkedOptions = params[this.name] ? params[this.name].split(',') : [];
    });   
     
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
  }

  onCheckBoxChange(e){
    if(e.target.checked) {
      this.checkedOptions.push(e.target.value);
    }    
    else {
      this.checkedOptions = this.checkedOptions.filter(item => item !== e.target.value);
    }

    if(this.checkedOptions.length > 0){
      this.router.navigate([], {queryParams: {[this.name]: this.checkedOptions.join(',')}, queryParamsHandling: 'merge'});
    }
    else{
      this.router.navigate([], {queryParams: {[this.name]: null}, queryParamsHandling: 'merge'});
    }
  }
}
