import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from './title.model';
import { TitleService } from './title.service';

@Component({
  selector: 'simple-form',
  templateUrl: './simple-form.component.html',
  styleUrls: ['./simple-form.component.css'],
})
export class SimpleFormComponent {
  titles: Title[];
  submitDisabled: boolean = true;
  submitPressed: boolean = false;

  constructor(
    private titleService: TitleService,
    private _cdr: ChangeDetectorRef,
    private _fb: FormBuilder
  ) {}

  userForm = this._fb.group({
    firstName: '',
    lastName: ['', Validators.required],
    acceptTerms: false,
    title: '',
  });

  ngOnInit() {
    this.titleService.getTitles().subscribe((titles) => {
      titles = titles.filter((x) => x.name != '!');
      titles.sort((a, b) => (a.name > b.name ? 1 : -1));
      this.titles = titles;
      console.log('titles: ', titles);
      const defaultTitle = this.titles.filter((x) => x.isDefault);
      this.userForm.controls.title.setValue(defaultTitle[0].name);
      this._cdr.detectChanges();
    });

    this.userForm.get('acceptTerms').valueChanges.subscribe((val) => {
      this.submitDisabled = !val;
      console.log('this.submitDisabled: ', this.submitDisabled);
    });
  }

  submit() {
    this.submitPressed = true;
    if (this.userForm.controls.lastName.valid) {
      console.log('awdasdasd: ', this.userForm.value);
    }
  }
}
