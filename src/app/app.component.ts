import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent { public appPages = [{ title: 'Home', url: '/home', icon: 'Home' },
{title: 'About', url: '/about',icon: 'people'},
{title: 'conversor', url: '/conversor',icon: 'calculator'},
{title: 'Alumnos', url: '/alumnos',icon: 'people'},
{title: 'Login', url: '/login',icon: 'log-in'},
];
  constructor() {}
}
