import { Route } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { MuestraComponent } from './muestra/muestra.component';

export const appRoutes: Route[] = [
    { path: '', component: InicioComponent },
    { path: 'tickets', component: MuestraComponent }
];
