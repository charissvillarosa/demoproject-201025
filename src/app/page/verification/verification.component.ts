import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VerificationService } from '../../service/verification.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.sass']
})
export class VerificationComponent implements OnInit {

  verificationForm: FormGroup;
  submitted = false;
  isLoading = false;
  errorMessage;

  constructor(
    public router: Router,
    private service: VerificationService,
    private formBuilder: FormBuilder,
    private elementRef: ElementRef
  ) {
  }

  // convenience getter for easy access to form fields
  get f(): any {
    return this.verificationForm.controls;
  }

  async ngOnInit(): Promise<void> {
    this.verificationForm = this.formBuilder.group({
      c1: ['', Validators.required],
      c2: ['', Validators.required],
      c3: ['', Validators.required],
      c4: ['', Validators.required],
      c5: ['', Validators.required]
    });

    this.focusFirstInput();
  }

  focusFirstInput(): void {
    this.elementRef.nativeElement.querySelector('input:first-child').focus();
  }

  async onSubmit(): Promise<void> {
    this.submitted = true;

    // stop here if form is invalid
    if (this.verificationForm.invalid) {
      return;
    }
    //
    this.verify();
  }

  async verify(): Promise<void> {
    const {c1, c2, c3, c4, c5} = this.verificationForm.value;
    const code = [c1, c2, c3, c4, c5].join('');

    // verify form value
    const formData = {
      token: code,
      via: 'email'
    };

    this.isLoading = true;

    try {
      await this.service.verify(formData);
      await this.router.navigate(['/login']);
    } catch (e) {
      this.errorMessage = e.error.message;
    }

    this.isLoading = false;
  }

  onCodeKeyup($event: KeyboardEvent, index: number): void {
    const input: any = $event.target;
    const key: number = $event.keyCode || $event.charCode;

    // backspace or delete
    if( key === 8 || key === 46 ) {
      const next = this.elementRef.nativeElement.querySelector(`.code:nth-child(${index - 1})`);
      if (next) {
        next.focus();
      }
    }
    else if (input.value.length > 0) {
      const next = this.elementRef.nativeElement.querySelector(`.code:nth-child(${index + 1})`);
      if (next) {
        next.focus();
      }
    }
  }

  resetForm(form: FormGroup): void {
    form.reset({});
    this.focusFirstInput();
  }
}
