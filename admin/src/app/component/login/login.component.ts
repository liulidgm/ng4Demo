import { Component, OnInit ,Inject,forwardRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators,AbstractControl ,FormControl} from '@angular/forms';
import {validateResult} from '../../model/validateResult';
import {UserService} from '../../service/login';
import {successRes} from '../../model/successRes';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  validateForm: FormGroup;
  res:successRes;
constructor(
  @Inject(forwardRef(() => FormBuilder)) private formBuilder: FormBuilder,private userService:UserService
) {}

submit(): void {
  console.log(this.validateForm.value)
  this.userService.doLogin(this.validateForm.value).then(res=>{
    console.log(res);
    if(res.code=='000'){
      
    }
  });
}

reset(): void {
  this.validateForm.reset()
}

ctrl(item: string): AbstractControl {
  return this.validateForm.controls[item]
}

statusCtrl(item: string): string {
  if (!this.validateForm.controls[item]) return
  const control: AbstractControl = this.validateForm.controls[item]
  return control.dirty && control.hasError('status') ? control.errors.status : ''
}

messageCtrl(item: string): string {
  if (!this.validateForm.controls[item]) return
  const control: AbstractControl = this.validateForm.controls[item]
  return control.dirty && control.hasError('message') ? control.errors.message : ''
}

ngOnInit(): void {
  this.validateForm = this.formBuilder.group({
    password: [ '', [this.passwordValidator] ],
    username: [ '', [this.emailValidator] ],
  })
}

private emailValidator = (control: FormControl): validateResult => {
  const mailReg: RegExp = /^[A-Za-z0-9一-龥]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  if (!mailReg.test(control.value)) {
    return { status: 'error', message: '邮箱格式不正确' }
  }
  return { status: 'success', message:'' }
}

private passwordValidator = (control: FormControl): validateResult => {
  if (!control.value) {
    return { status: 'error', message: '密码是必填的' }
  }
  if (control.value.length < 6) {
    return { status: 'error', message: '密码长度必须大于 6 位' }
  }
  return { status: 'success', message:''  }
}

}
