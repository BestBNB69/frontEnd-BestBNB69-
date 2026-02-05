import { Component, OnInit, AfterViewInit, ElementRef, inject, signal, viewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Authservice } from '../../services/authservice/authservice';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-signin-form',
  imports: [FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signin-form.html',
  styleUrl: './signin-form.css',
})
export class SigninForm implements AfterViewInit {

  email = viewChild.required<ElementRef>('email')

  authenticationError = signal(false);

  loginForm = new FormGroup({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    rememberMe: new FormControl(false, { nonNullable: true, validators: [Validators.required] }),
  });

  private loginService = inject(Authservice);
  public errorResponse: HttpErrorResponse = new HttpErrorResponse({});

  ngAfterViewInit(): void {
    this.email().nativeElement.focus();
  }

  login(): void {
    this.loginService.login(this.loginForm.getRawValue()).subscribe({
      next: () => {
        // this.authenticationError.set(false);
        // this.router.navigate(['/listings/1']);
      },
      error: (res: HttpErrorResponse) => {
        this.authenticationError.set(true);
        if (res.error != undefined) {
          this.errorResponse = res
          console.log(this.errorResponse)
        }
      },
    });
  }
}
