import { Component, OnInit, AfterViewInit, ElementRef, inject, signal, viewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Authservice } from '../../services/authservice/authservice';

@Component({
  standalone: true,
  selector: 'app-signin-form',
  imports: [FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signin-form.html',
  styleUrl: './signin-form.css',
})
export class SigninForm implements OnInit, AfterViewInit {

  email = viewChild.required<ElementRef>('email')

  authenticationError = signal(false);

  loginForm = new FormGroup({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    rememberMe: new FormControl(false, { nonNullable: true, validators: [Validators.required] }),
  });

  private loginService = inject(Authservice);
  private router = inject(Router);

  ngOnInit(): void {
    // if already authenticated then navigate to home page

    // this.accountService.identity().subscribe(() => {
    //   if (this.accountService.isAuthenticated()) {
    //     this.router.navigate(['']);
    //   }
    // });
  }

  ngAfterViewInit(): void {
    this.email().nativeElement.focus();
  }

  login(): void {
    this.loginService.login(this.loginForm.getRawValue()).subscribe({
      next: () => {
        // this.authenticationError.set(false);
        // this.router.navigate(['/listings/1']);
      },
      error: () => this.authenticationError.set(true),
    });
  }
}
