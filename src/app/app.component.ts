import { Component, OnInit } from '@angular/core';

import emailjs from '@emailjs/browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'bmp-bois';

  ngOnInit(): void {
    emailjs.init(environment.emailjsPublicKey);
  }
}
