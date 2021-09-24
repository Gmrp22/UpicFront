import { Component} from '@angular/core';
import { AuthService } from 'src/app/services/moduloUsuarios/auth.service';
@Component({
  selector: 'app-deactivate',
  templateUrl: './deactivate.component.html',
  styleUrls: ['./deactivate.component.css'],
})
export class DeactivateComponent {
  constructor(private authService: AuthService) {}

  /**
   *Calls deactivate method
   */
  deactivateAccount() {
    this.authService.deactivate();
  }
}
