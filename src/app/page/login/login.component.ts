import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from '../../service/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  isLoading = false;
  errorMessage;

  constructor(
    public router: Router,
    private loginService: LoginService,
    private sessionService: SessionService,
    private formBuilder: FormBuilder
  ) {
  }

  // convenience getter for easy access to form fields
  get f(): any {
    return this.loginForm.controls;
  }

  async ngOnInit(): Promise<void> {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  async onSubmit(): Promise<void> {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    return this.login();
  }

  async login(): Promise<void> {
    // login form value
    const formData = {
      username: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    this.isLoading = true;

    try {
      const {data} = await this.loginService.login(formData);
      this.sessionService.setToken(data.access_token, data.expires_in);
      await this.router.navigate(['/success']);
    } catch (e) {
      const message = e.error.message;
      if (message) {
        this.errorMessage = e.error.message;
        this.f.email.errors = {apiMessage: message};
        this.f.password.errors = {apiMessage: message};
      }
    }

    this.isLoading = false;
  }
}
