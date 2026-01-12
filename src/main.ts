import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { Signin } from './app/pages/signin/signin';

bootstrapApplication(Signin, appConfig)
  .catch((err) => console.error(err));
