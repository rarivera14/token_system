import { Routes } from '@angular/router';
import { TokenGeneratorComponent } from './components/token-generator/token-generator.component';

export const routes: Routes = [
    {
        path: "",
        component: TokenGeneratorComponent,
    },
    {
        path: "**",
        redirectTo: "/",
        pathMatch: "full"
    }
];
