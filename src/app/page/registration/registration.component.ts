import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../../service/registration.service';
import { MustMatch } from '../../shared/validator/must-match.validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.sass']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  isLoading = false;
  errorMessage;

  constructor(
    public router: Router,
    private service: RegistrationService,
    private formBuilder: FormBuilder
  ) {
  }

  // convenience getter for easy access to form fields
  get f(): any {
    return this.registerForm.controls;
  }

  async ngOnInit(): Promise<void> {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  async onSubmit(): Promise<void> {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    return this.save();
  }

  async save(): Promise<void> {
    // save form value
    const formData = {
      email: this.registerForm.value.email,
      full_name: this.registerForm.value.fullName,
      password: this.registerForm.value.password,
      password_confirmation: this.registerForm.value.confirmPassword,
    };

    this.isLoading = true;

    try {
      await this.service.save(formData);
      await this.router.navigate(['/verification']);
    } catch (e) {
      const message = e.error.message;

      if (message.match(/email/i)) {
        this.f.email.errors = {apiMessage: message};
      } else {
        this.errorMessage = e.error.message;
      }
    }

    this.isLoading = false;
  }
}
