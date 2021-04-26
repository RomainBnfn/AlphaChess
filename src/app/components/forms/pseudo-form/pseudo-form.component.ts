import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pseudo-form',
  templateUrl: './pseudo-form.component.html',
  styleUrls: ['./pseudo-form.component.scss'],
})
export class PseudoFormComponent implements OnInit {
  @Output() formCompleted = new EventEmitter<{ pseudo: string }>();

  pseudoForm: FormGroup;
  errorMessage: string = '';

  constructor(private _formBuilder: FormBuilder) {
    this.pseudoForm = this._formBuilder.group({
      pseudo: [
        '',
        [Validators.required, Validators.pattern(/[0-9a-z-A-Z]{3,}/)],
      ],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    let regex = /[0-9a-z-A-Z]{3,}/;
    if (this.pseudo != null && regex.test(this.pseudo)) {
      this.formCompleted.emit({ pseudo: this.pseudo });
      return;
    }
    this.errorMessage =
      'Vous ne pouvez pas prendre un tel pseudo ! (Même en modifiant le code, petit malin)';
  }

  get pseudoInput() {
    return this.pseudoForm.get('pseudo');
  }

  get pseudo() {
    return this.pseudoInput?.value;
  }
}
