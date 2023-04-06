import { FormGroup, FormControl } from "@angular/forms";

export default class ValidateForm {
    static validateAllFormFileds(formGroup : FormGroup){
        Object.keys(formGroup.controls).forEach(field => {
          const control= formGroup.get(field);
          if(control instanceof FormControl){
            control.markAsDirty({onlySelf: true});
          }
          else if (control instanceof FormControl){
            ValidateForm.validateAllFormFileds(control as unknown as FormGroup)
          }
        })
      }
}