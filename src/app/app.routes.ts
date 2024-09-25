import { Routes } from '@angular/router';
import { TokenGeneratorComponent } from './components/token-generator/token-generator.component';
import { TokenTableComponent } from './components/token-table/token-table.component';

export const routes: Routes = [
    {
        path: "",
        component: TokenGeneratorComponent,
    },
    {
        path: "tokens-table",
        component: TokenTableComponent,
    },
    {
        path: "**",
        redirectTo: "/",
        pathMatch: "full"
    }
];
