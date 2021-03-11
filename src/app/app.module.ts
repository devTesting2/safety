import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http'; 
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { InViewportModule } from 'ng-in-viewport';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { FormsModule } from '@angular/forms';
import { LocationPageComponent } from './location-page/location-page.component';
import { FooterPageComponent } from './footer-page/footer-page.component';
import { ParticlesModule } from 'angular-particle';
import { CommunicationService } from './_services/communication.service';
import { AboutPageComponent } from './about-page/about-page.component';
import { BranchesPageComponent } from './branches-page/branches-page.component';
import { OpenPositionsComponent } from './open-positions/open-positions.component';
import { PositionPageComponent } from './position-page/position-page.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { MainPageComponent } from './main-page/main-page.component';
import { ServicesPageComponent } from './services-page/services-page.component';
 
@NgModule({
  declarations: [																
    AppComponent,
      HomePageComponent,
      ContactPageComponent,
      LocationPageComponent,
      FooterPageComponent,
      AboutPageComponent,
      BranchesPageComponent,
      OpenPositionsComponent,
      PositionPageComponent,
      MainPageComponent,
      ServicesPageComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
    }
  }),
  FormsModule,
  InViewportModule,
  ReactiveFormsModule,
  ParticlesModule
  ],
  providers: [CommunicationService,
    ],
  bootstrap: [AppComponent]
})

export class AppModule { 

}

  export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
  }