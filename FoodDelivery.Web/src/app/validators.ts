import { AbstractControl, FormGroup, ValidatorFn } from "@angular/forms";

export function ageValidator(): ValidatorFn {
    return(control: AbstractControl):  {[key: string]: any} | null => {
        let date = new Date(control.value);
        let requiredAge = 13;
        let dif = new Date((new Date().getTime() - date.getTime())).getUTCFullYear() - 1970;
        console.log(dif);
        return dif >= requiredAge ? null : { age : {value: true}};
    };
}

export function confirmPasswordValidator(controlName: string, matchingControlName: string) : ValidatorFn{
    return (formGroup: FormGroup) => {
        let controlValue = formGroup.controls[controlName].value;
        let matchingControlValue =  formGroup.controls[matchingControlName].value;
        return controlValue == matchingControlValue ? null : {confirmPassword : {value: true}};
    };
  }