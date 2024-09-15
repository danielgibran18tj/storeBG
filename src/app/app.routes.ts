import { Routes } from '@angular/router';
import { NotFoundComponent } from './domains/info/pages/not-found/not-found.component';
import { LayoutComponent } from '@shared/components/layout/layout.component';
import { LogginComponent } from './domains/loggin/loggin.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LogginComponent
    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            // vamos aplicar LazyLoading para que nuestro poderoso proyecto no sea lento
            {
                path: 'list',
                // component: ListComponent,

                // de esta manera traera el archivo javascript solo cuando se vaya a usar por el usuario
                loadComponent: () => import('./domains/products/pages/list/list.component').then(m => m.ListComponent)
            },
            {
                path: 'about',
                // component: AboutComponent

                // estamos haciendo lo mismo que ListComponent, pero con menos codigo, debido al 'defauld' declarado en este componente 
                loadComponent: () => import('./domains/info/pages/about/about.component')
            },
            {
                path: 'product/:id',
                // component: ProductDetailComponent
                loadComponent: () => import('./domains/products/pages/product-detail/product-detail.component')
            }
        ]
    },
    {
        path: '**',
        component: NotFoundComponent
    }
    
];
