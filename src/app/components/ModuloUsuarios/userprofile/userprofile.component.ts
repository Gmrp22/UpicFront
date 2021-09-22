import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/moduloUsuarios/auth.service';
import { UserInfo } from 'src/app/services/moduloUsuarios/userInfo';
@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  public user: UserInfo | undefined
  
  constructor(authService : AuthService) { 
    authService.signedIn.subscribe(user=>{
      this.user = user    
    })
  
  }

  ngOnInit(): void {
    
  }

}
