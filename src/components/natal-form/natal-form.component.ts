
import { Component, ChangeDetectionStrategy, output, input, WritableSignal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface NatalFormData {
  name: string;
  date: string;
  time: string;
  place: string;
}

@Component({
  selector: 'app-natal-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './natal-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NatalFormComponent {
  isLoading = input.required<boolean>();
  formSubmit = output<NatalFormData>();

  natalForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.natalForm = this.fb.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      place: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.natalForm.valid) {
      this.formSubmit.emit(this.natalForm.value);
    } else {
      this.natalForm.markAllAsTouched();
    }
  }
}
