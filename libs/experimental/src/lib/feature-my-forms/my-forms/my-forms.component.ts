import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  FormRecord,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { KeyValuePipe, NgClass } from '@angular/common';
import {
  Complexitys,
  MockService,
} from '../../data/services/mock.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MaskitoDirective } from '@maskito/angular';
import dateMask from '../../../../../common-ui/src/lib/masks/date-mask';
import { phoneMask } from '@tt/common-ui';
import { NameValidator } from './name.validator';
import {emailMask} from "@tt/common-ui";

type ExtraInfoFromGroup = ReturnType<typeof getAdditionallyForm>;

enum JobsType {
  GREAT = 'GREAT',
  NORMAL = 'NORMAL',
  SHIT = 'SHIT',
}

enum ExperienceType {
  TRAINY = 'TRAINY',
  JUNIOR = 'JUNIOR',
  MIDDLE = 'MIDDLE',
  SENIOR = 'SENIOR',
}

interface ExtraInfo {
  jobs?: string;
  experience?: string;
  callDate?: number;
  phoneNumber?: number;
}

function getAdditionallyForm(initioalValue: ExtraInfo = {}) {
  return new FormGroup({
    jobs: new FormControl(initioalValue.jobs ?? ''),
    experience: new FormControl(initioalValue.experience ?? ''),
    callDate: new FormControl(initioalValue.callDate ?? null),
    phoneNumber: new FormControl(initioalValue.phoneNumber ?? null, [
      Validators.required,
      Validators.minLength(18),
    ]),
  });
}

function validateStartWith(forbiddenLetter: string): ValidatorFn {
  return (control: AbstractControl) => {
    return control.value.startsWith(forbiddenLetter)
      ? { startsWith: { message: `${forbiddenLetter} n-ая буква алфавита` } }
      : null;
  };
}

function validateDateRange({
  fromControlName,
  toControlName,
}: {
  fromControlName: string;
  toControlName: string;
}) {
  return (control: AbstractControl) => {
    const fromControl = control.get(fromControlName);
    const toControl = control.get(toControlName);

    if (!fromControlName || !toControlName) return null;

    const fromDate = new Date(fromControl?.value);
    const toDate = new Date(toControl?.value);

    if (fromDate && toDate && fromDate > toDate) {
      toControl?.setErrors({
        dateRange: { message: 'Дата начала не может быть позднее даты конца' },
      });
      return {
        dateRange: { message: 'Дата начала не может быть позднее даты конца' },
      };
    }

    return null;
  };
}

@Component({
  selector: 'app-my-forms',
  imports: [ReactiveFormsModule, KeyValuePipe, NgClass, MaskitoDirective],
  templateUrl: './my-forms.component.html',
  styleUrl: './my-forms.component.scss',
})
export class MyFormsComponent {
  nameValidator = inject(NameValidator);
  mockService = inject(MockService);

  JobsType = JobsType;
  ExperienceType = ExperienceType;

  complexitys: Complexitys[] = [];

  phoneMaskOptions = phoneMask;
  emailMaskOptions = emailMask;
  dateMaskOptions = dateMask;

  jobsOptions = [
    { label: 'Angular разработчик', value: this.JobsType.GREAT },
    { label: 'Vue разработчик', value: this.JobsType.NORMAL },
    { label: 'React разработчик', value: this.JobsType.SHIT },
  ];

  experienceOptions = [
    { label: 'Без опыта', value: this.ExperienceType.TRAINY },
    { label: 'До года', value: this.ExperienceType.JUNIOR },
    { label: 'От 1 до 3 лет', value: this.ExperienceType.MIDDLE },
    { label: 'От 3 лет', value: this.ExperienceType.SENIOR },
  ];

  form = new FormGroup({
    name: new FormControl<string>('', {
      validators: [Validators.required],
      asyncValidators: [this.nameValidator.validate.bind(this.nameValidator)],
      updateOn: 'blur',
    }),
    lastName: new FormControl<string>(''),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    extrainformation: new FormArray<ExtraInfoFromGroup>([]),
    dateRange: new FormGroup(
      {
        from: new FormControl<string>(''),
        to: new FormControl<string>(''),
      },
      validateDateRange({ fromControlName: 'from', toControlName: 'to' })
    ),
    complexitys: new FormRecord({}),
  });

  constructor() {
    this.mockService
      .getComplexity()
      .pipe(takeUntilDestroyed())
      .subscribe((complexitys) => {
        this.complexitys = complexitys;

        for (const complexity of this.complexitys) {
          this.form.controls.complexitys.addControl(
            complexity.code,
            new FormControl(complexity.value)
          );
        }
      });
  }

  onSubmit(event: SubmitEvent) {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();
    console.log('getRawValue', this.form.getRawValue());
  }

  addSettings() {
    this.form.controls.extrainformation.insert(0, getAdditionallyForm());
  }

  deleteSettings(index: number) {
    this.form.controls.extrainformation.removeAt(index, { emitEvent: false });
  }

  sort = () => 0;
}
