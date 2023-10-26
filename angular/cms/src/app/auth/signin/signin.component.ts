import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/shared/services/authentification.service';
import { ModelserviceService } from 'src/app/shared/services/modelservice.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  constructor(
    private auth: AuthentificationService, private fB: FormBuilder,
    private mS: ModelserviceService, private router: Router
  ) { }

  profileForm = this.fB.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  onSubmit() {
    if (this.profileForm.valid) {
      let data = this.profileForm.value;
      if (data.password && data.username) {
        this.auth.signIn(data).subscribe(data => {
          this.mS.username = data.user.username;
          this.profileForm.reset();
          this.router.navigate(['home']);
        });
      }
    } else {
      alert("tout les champs n'ont pas été remplis");
    }
  }

} 
