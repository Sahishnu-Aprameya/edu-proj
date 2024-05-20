import { Routes } from '@angular/router';
import { Disp1Component } from './disp1/disp1.component';
import { Disp2Component } from './disp2/disp2.component';

export const routes: Routes = [
    {path:'disp1', component: Disp1Component},
    {path:'disp2', component: Disp2Component}
];
