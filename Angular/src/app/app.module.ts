import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { ModalComponent } from './modal/modal.component';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { SearchComponent } from './search/search.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { AppRoutingModule } from './/app-routing.module';
import { DetailmodalComponent } from './detailmodal/detailmodal.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ApiService } from './shared/api.service';
import { EmailvalidatorDirective } from './directives/emailvalidator.directive';
import { CompareDirective } from './directives/compare.directive';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ContactComponent } from './contact/contact.component';
import { GooglePlacesDirective } from './directives/google-places.directive';
import { FilterPipe } from './shared/filter.pipe';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ContactMeComponent } from './contact-me/contact-me.component';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { SafePipePipe } from './shared/safe-pipe.pipe';
import { BlogComponent } from './blog/blog.component';
import { FooterComponent } from './footer/footer.component';
import { SlideshowModule } from 'ng-simple-slideshow';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    ModalComponent,
    SearchComponent,
    DetailmodalComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    EmailvalidatorDirective,
    CompareDirective,
    ProfileComponent,
    HomeComponent,
    EditProfileComponent,
    ContactComponent,
    GooglePlacesDirective,
    FilterPipe,
    ContactMeComponent,
    SafePipePipe,
    BlogComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    HttpModule,
    NgxPaginationModule,
    OrderModule,
    Ng2SearchPipeModule,
    RouterModule.forRoot([{ path: "", component: SearchComponent, pathMatch: 'full' }]),
    Ng4LoadingSpinnerModule.forRoot(),
    AppRoutingModule,
    NgMultiSelectDropDownModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: "google_api_key",
      libraries: ["places"]
    }),
    SlideshowModule,
  ],
  providers: [ApiService, GoogleMapsAPIWrapper,],
  bootstrap: [AppComponent]
})
export class AppModule { }
