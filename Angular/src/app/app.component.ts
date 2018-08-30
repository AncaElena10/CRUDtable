import { Component } from '@angular/core';
import { ApiService } from './shared/api.service'
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  showHeadFoot: boolean = false;

  ngOnInit() {
    document.body.classList.remove('bg-img-login');
    document.body.classList.remove('bg-img-register');
  }

  constructor(private apiService: ApiService, private router: Router) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        // console.log(event)
        if (event['url'] == '/login' || event['url'] == '/register') {
          // console.log("DA")
          this.showHeadFoot = false;
        } else {
          // console.log("NU")
          this.showHeadFoot = true;
        }
      }
    });
  }
}
