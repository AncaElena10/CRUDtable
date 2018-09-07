import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  buildUrlTwitter: any = "";
  buildUrlGithub: any = "";
  messageSengMsg: boolean = false;
  isSubmitted: boolean = false;

  adminFirstname = "Anca";
  adminLastname = "Moisa";
  adminLocation = "Strada Solstițiului, Popești-Leordeni 077160, România";
  adminPhone = "(+40) 749 153 648";
  adminEmail = "moisa.anca10@gmail.com";
  adminGithub = "AncaElena10";
  adminTwitter = "anca_moisa";
  
  constructor(public apiService: ApiService) { }

  ngOnInit() {
  }

  mongodb() {
    window.location.href = "https://www.mongodb.com/cloud/atlas/lp/general?utm_content=081118_LP_Control_1&jmp=search&utm_source=google&utm_campaign=EMEA-Romania-MongoDB-to-Atlas-Brand-Alpha&utm_keyword=mongodb&utm_device=c&utm_network=g&utm_medium=cpc&utm_creative=260925109665&utm_matchtype=e&_bt=260925109665&_bk=mongodb&_bm=e&_bn=g&gclid=CjwKCAjw5ZPcBRBkEiwA-avvk6xIXVFCG0RWDjuuGA6QG4cJA8GdQtzuhHIt8eW-aLbABYSooC1B4hoCEqIQAvD_BwE";
  }

  angular6() {
    window.location.href = "https://angular.io/docs";
  }

  express() {
    window.location.href = "https://expressjs.com/en/resources/glossary.html";
  }

  nodejs() {
    window.location.href = "https://nodejs.org/en/docs/";
  }

  goToGitUrl() {
    this.buildUrlGithub = "https://github.com/" + this.adminGithub
    window.location.href = this.buildUrlGithub;
  }

  goToTwitterUrl() {
    this.buildUrlTwitter = "https://twitter.com/" + this.adminTwitter;
    window.location.href = this.buildUrlTwitter;
  }

  goToFacebookUrl() {
    window.location.href = "https://www.facebook.com";
  }

  goToYoutubeUrl() {
    window.location.href = "https://www.youtube.com/channel/UCgOMsJs1DKfemuPGqCqAJDw?view_as=subscriber"
  }
}
