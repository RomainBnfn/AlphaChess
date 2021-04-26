import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-option-selector',
  templateUrl: './option-selector.component.html',
  styleUrls: ['./option-selector.component.scss'],
})
export class OptionSelectorComponent implements OnInit {
  @Output() onUpdateOptions = new EventEmitter<{
    isInfinite: boolean;
    time: number;
  }>();

  optionsForm: FormGroup;
  errorMessage: string = '';

  constructor(private _formBuilder: FormBuilder) {
    this.optionsForm = this._formBuilder.group({
      time: [5, [Validators.min(1), Validators.max(30)]],
      isInfinite: [false],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.onUpdateOptions.emit({ isInfinite: this.isInfinite, time: this.time });
  }

  get time(): number {
    if (this.optionsForm.get('time')?.invalid) {
      return 5;
    }
    return this.optionsForm.get('time')?.value;
  }

  get isInfinite(): boolean {
    return this.optionsForm.get('isInfinite')?.value;
  }
}
