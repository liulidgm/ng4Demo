import { Component, OnInit } from '@angular/core';
import {UserService} from '../../service/login';

@Component({
  selector: 'hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css']
})
export class HelloComponent implements OnInit {
	name:string;
	/*constructor是ES6引入类的概念后新出现的东东，是类的自身属性，
	并不属于Angular的范畴,constructor会在类生成实例时调用,new HelloComponent()。
	开发中我们经常在ngOnInit做一些初始化的工作，
	而这些工作尽量要避免在constructor中进行，constructor中应该只进行依赖注入而不是进行真正的业务操作。*/
  constructor() { }

  ngOnInit() {
  	// this.gundamService.doLogin()
  }

}
