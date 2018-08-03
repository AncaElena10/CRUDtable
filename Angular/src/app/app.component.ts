import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  ngOnInit() {
    document.body.classList.remove('bg-img-login'); 
    document.body.classList.remove('bg-img-register');
  }
}
