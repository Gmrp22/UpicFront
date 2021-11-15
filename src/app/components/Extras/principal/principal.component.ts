import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/moduloUsuarios/auth.service';
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
})
export class PrincipalComponent implements OnInit {
  log = false;
  val:string = "";
  constructor(private auth: AuthService) {
    this.auth.signedIn.subscribe((val) => {this.log = val; this.logIn()});

  }

  ngOnInit(): void {
  }

  logIn(){
    if(this.log){
      this.val=""
    }
    else{
      this.val="¡Únete ahora!"
    }
  }
}
