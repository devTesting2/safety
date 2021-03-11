import { Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { MainPageComponent } from "./main-page/main-page.component";
import { OpenPositionsComponent } from "./open-positions/open-positions.component";
import { PositionPageComponent } from "./position-page/position-page.component";

export const appRoutes: Routes = [

    {path:'',component:MainPageComponent},
    {path:'position/:id',component:PositionPageComponent},

    {path:'**', redirectTo:'home',pathMatch:'full'}


    
];