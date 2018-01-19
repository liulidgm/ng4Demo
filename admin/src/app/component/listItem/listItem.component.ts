import { Component, OnInit } from '@angular/core';
import {linkItem} from '../../model/linkItem';
import {loginRes} from '../../model/login';
import {UserService} from '../../service/login';
import { ActivatedRoute } from '@angular/router';
@Component({
  templateUrl: './listItem.component.html',
  providers: [UserService]
})
export class listItemComponent implements OnInit {
	title:string;
	userlist:loginRes[];
    constructor(private userService:UserService,private route:ActivatedRoute) { }

  ngOnInit() {
  	this.title = 'app';
  	this.userService.getUserList().then(userlist=> this.userlist  = userlist);
    // this.route.params.subscribe(param)  =>{
    //   this.username = param.username;
    // }
  }

}
