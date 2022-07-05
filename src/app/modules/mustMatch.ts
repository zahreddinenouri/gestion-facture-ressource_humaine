import { FormGroup } from '@angular/forms';

export function mustMatch(controlPwd: string, matchingControlPwd: string) {
	return (formGroup: FormGroup) => {
		const control = formGroup.controls[controlPwd];
		const matchingControl = formGroup.controls[matchingControlPwd];
		// set error on matchingControl if validation fails
		if (control.value !== matchingControl.value) {
			matchingControl.setErrors({ mustMatch: true });
		} else {
			matchingControl.setErrors(null);
		}
	};
}
