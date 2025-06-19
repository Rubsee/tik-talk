import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormRecord,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MockService } from '../../data/services/mock.service';
import { Features } from '../../data/services/mock.service';
import { KeyValuePipe } from '@angular/common';

enum ReceiverType {
  PERSON = 'PERSON',
  LEGAL = 'LEGAL',
}

interface Address {
  city?: string;
  street?: string;
  building?: number;
  apartment?: number;
}

function getAddressForm(initialValue: Address = {}) {
  return new FormGroup({
    city: new FormControl<string>(initialValue.city ?? ''),
    street: new FormControl<string>(initialValue.street ?? ''),
    building: new FormControl<number | null>(initialValue.building ?? null),
    apartment: new FormControl<number | null>(initialValue.apartment ?? null),
  });
}

@Component({
  selector: 'app-forms-experiment',
  imports: [ReactiveFormsModule, KeyValuePipe],
  templateUrl: './forms-experiment.component.html',
  styleUrl: './forms-experiment.component.scss',
})
export class FormsExperimentComponent {
  #fb = inject(FormBuilder);

  ReceiverType = ReceiverType;

  mockService = inject(MockService);
  features: Features[] = [];

  form = new FormGroup({
    type: new FormControl<ReceiverType>(ReceiverType.PERSON),
    name: new FormControl<string>('', Validators.required),
    inn: new FormControl<number | null>(null),
    lastName: new FormControl<string>(''),
    addresses: new FormArray([getAddressForm()]),
    features: new FormRecord({}),
  });

  // form = this.#fb.group({
  //   type: this.#fb.nonNullable.control<ReceiverType>(ReceiverType.PERSON),
  //   name: this.#fb.nonNullable.control<string>('Bukashka', Validators.required),
  //   inn: this.#fb.control<number | null>(null),
  //   lastName: this.#fb.control<string>(''),
  //   address: this.#fb.group({
  //     city: this.#fb.control<string>(''),
  //     street: this.#fb.control<string>(''),
  //     building: this.#fb.control<number | null>(null),
  //     apartment: this.#fb.control<number | null>(null),
  //   })
  // })

  initialValue = {
    type: ReceiverType.PERSON,
    name: 'Ruslan',
    lastName: 'Semenov',
  };

  constructor() {
    this.mockService
      .getAddresses()
      .pipe(takeUntilDestroyed())
      .subscribe((addrs) => {
        while (this.form.controls.addresses.controls.length > 0) {
          this.form.controls.addresses.removeAt(0);
        }

        // this.form.controls.addresses.clear()

        for (const addr of addrs) {
          this.form.controls.addresses.push(getAddressForm(addr));
        }

        // this.form.controls.addresses.setControl(1, getAddressForm(addrs[0]))

        console.log(this.form.controls.addresses.at(0));
      });

    this.mockService
      .getFeatures()
      .pipe(takeUntilDestroyed())
      .subscribe((features) => {
        this.features = features;

        for (const feature of features) {
          this.form.controls.features.addControl(
            feature.code,
            new FormControl(feature.value)
          );
        }
      });

    this.form.controls.type.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((val) => {
        console.log('type event');
        this.form.controls.inn.clearValidators();

        if (val === ReceiverType.LEGAL) {
          this.form.controls.inn.setValidators([
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
          ]);
        }
      });

    this.form.controls.lastName.disable();
  }

  onSubmit(event: SubmitEvent) {
    // this.form.reset()
    // this.form.markAllAsTouched()
    // this.form.updateValueAndValidity()
    //
    // if (this.form.invalid) return
    //
    // console.log('this.form.value', this.form.value)
    console.log('getRawValue', this.form.getRawValue());
  }

  addAddress() {
    // this.form.controls.addresses.push(getAddressForm());
    this.form.controls.addresses.insert(0, getAddressForm());
  }

  deleteAddress(index: number) {
    this.form.controls.addresses.removeAt(index, { emitEvent: false });
  }

  sort = () => 0;
}
