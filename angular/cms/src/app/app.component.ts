import { Component, OnInit } from '@angular/core';
import { InitialisateurService } from './shared/services/initialisateur.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loading: boolean = true;

  constructor(private initS: InitialisateurService) { }

  ngOnInit(): void {
    this.loading = this.initS.loading;
  }

}
