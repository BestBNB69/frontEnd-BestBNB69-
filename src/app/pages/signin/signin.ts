import { Component } from '@angular/core';
import { SigninForm } from '../../components/signin-form/signin-form';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [SigninForm],
  templateUrl: './signin.html',
  styleUrl: './signin.css',
})
export class Signin {

}
