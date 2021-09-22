import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/moduloUsuarios/auth.service';
@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit {
  public signupForm = this.formBuilder.group({
    name: '',
    password: '',
    email: '',
    cpassword: '',
  });
  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
  }
  submit() {
    this.authService.emailSignup(this.signupForm)   
    // const user = {
    //   nombre: this.signupForm.get('name')?.value,
    //   email: this.signupForm.get('email')?.value,
    //   rol: 0
    // };
    // this.userService.createUser(user).subscribe((newUser) => {
    //   this.signupForm.reset()
    // })
    // ESE NREWUSER ES LO QUE RECIBE LO QUE DEVUELVE EL OBSERVABLE CUANDO HACE EL NEXT(VALOR)
  }
 

  
 validator(){
  
 }
}
