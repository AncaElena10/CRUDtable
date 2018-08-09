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
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';

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
    FileSelectDirective,
    FileDropDirective,
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
    RouterModule.forRoot([{ path: "", component: SearchComponent, pathMatch: 'full'}]),
    Ng4LoadingSpinnerModule.forRoot(),
    AppRoutingModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
