import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { ModalComponent } from './modal/modal.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { SearchComponent } from './search/search.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { AppRoutingModule } from './/app-routing.module';
import { DetailmodalComponent } from './detailmodal/detailmodal.component';
import { TestComponentComponent } from './test-component/test-component.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ApiService } from './shared/api.service';
import { EmailvalidatorDirective } from './directives/emailvalidator.directive';
import { CompareDirective } from './directives/compare.directive';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { ProfilePictureComponent } from './profile-picture/profile-picture.component';
// import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ContactComponent } from './contact/contact.component';
import { GooglePlacesDirective } from './directives/google-places.directive';
import { FilterPipe } from './shared/filter.pipe';
import { ClickoutsideDirective } from './directives/clickoutside.directive';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DateTimePickerComponent } from './date-time-picker/date-time-picker.component';
import { ContactMeComponent } from './contact-me/contact-me.component';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { NguiMapModule } from '@ngui/map';
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
    TestComponentComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    EmailvalidatorDirective,
    CompareDirective,
    ProfileComponent,
    HomeComponent,
    ProfilePictureComponent,
    // FileSelectDirective,
    // FileDropDirective,
    EditProfileComponent,
    ContactComponent,
    GooglePlacesDirective,
    FilterPipe,
    ClickoutsideDirective,
    DateTimePickerComponent,
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
      apiKey: "AIzaSyB3a71eakX1ji_aFPmQpGf5gWD278RRl4o",
      libraries: ["places"]
    }),
    // NguiMapModule.forRoot({ apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyB3a71eakX1ji_aFPmQpGf5gWD278RRl4o' }),
    // AgmCoreModule,
    SlideshowModule,
  ],
  providers: [ApiService, GoogleMapsAPIWrapper,],
  bootstrap: [AppComponent]
})
export class AppModule { }
