import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})
export class AppComponent {
    myForm: FormGroup;
    matcher = new MyErrorStateMatcher();

    constructor(private formBuilder: FormBuilder) {
        this.myForm = this.formBuilder.group({
            'name': [
                null, [Validators.required, Validators.pattern(/[a-z|A-Z]+/)]
            ]
        });
    }

    showError(field, error) {
        const control = this.myForm.get(field);
        return control.errors && control.errors.hasOwnProperty(error) && (control.touched || control.dirty);
    }
}
