import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NewsService } from '../../features/services/new.service';

import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-news-form-modal',
  imports: [
    DialogModule,
    InputTextModule,
    TextareaModule,
    ButtonModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './news-form-modal.component.html',
  styleUrl: './news-form-modal.component.scss',
})
export class NewsFormModalComponent {
  @Input() visible = false;
  @Output() newsCreated = new EventEmitter<void>();
  @Output() modalClosed = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder, private newsService: NewsService) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      subtitle: ['', [Validators.required, Validators.maxLength(100)]],
      content: ['', [Validators.required, Validators.minLength(50)]],
      imageUrl: ['', [Validators.pattern(/^https:\/\/.+/i)]],
      author: ['', [Validators.required, Validators.maxLength(50)]],
      location: ['', [Validators.required, Validators.maxLength(50)]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.newsService.create(this.form.value);
      this.newsCreated.emit();
      this.form.reset();
      this.visible = false;
    }
  }

  onHide() {
    this.visible = false;
    this.form.reset();
    this.modalClosed.emit();
  }
}
