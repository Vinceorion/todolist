import { Directive, HostListener, Input, input,  InputSignal } from "@angular/core";
import { FormGroup, NgForm } from "@angular/forms";

@Directive({
    selector: '[resetDirective]',
    standalone: true
})
export class Reset{
    @Input() formD! : FormGroup|NgForm ;
    //formD : InputSignal<FormGroup|NgForm> = input.required<FormGroup|NgForm>();

    @HostListener('click') onClick(){
        this.resetForm(this.formD);
    }

    resetForm(formD : FormGroup|NgForm) {
        formD.reset();
        Object.keys(formD.controls).forEach(ctrl=>{
        const control = formD.controls[ctrl];
        if (control) {
            control.setErrors(null);
        }
        })
    }
}