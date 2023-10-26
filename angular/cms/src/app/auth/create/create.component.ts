import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/shared/services/authentification.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {

  constructor(
    private auth: AuthentificationService, private fB: FormBuilder,
    private router: Router
  ) { }

  profileForm = this.fB.group({
    username: ['', Validators.required],
    bio: ['', Validators.required],
    password: ['', Validators.required]
  });

  onSubmit(): void {
    if (this.profileForm.valid) {
      let data = this.profileForm.value;
      if (data.password && data.username && data.bio) {
        this.auth.signUp(data).subscribe({});
        this.profileForm.reset();
        this.router.navigate(['signin']);
      }
    } else {
      alert("tout les champs n'ont pas été remplis");
    }
  }

}

