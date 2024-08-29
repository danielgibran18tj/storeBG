import { ApplicationConfig } from '@angular/core';
import { PreloadAllModules, provideRouter, withComponentInputBinding, withPreloading } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [

    // withComponentInputBinding()     indica que los parametros lleguen como input a las paginas
    //   , en este caso a product-details
    // withPreloading(PreloadAllModules) esta funcion ayuda a precargar procesos de nuestra app antes de cliquearlos, para asi ser mas rapida
    provideRouter(routes, withComponentInputBinding() , withPreloading(PreloadAllModules)),
    provideHttpClient()  // permite peticiones de servicios externos
  ]
};
