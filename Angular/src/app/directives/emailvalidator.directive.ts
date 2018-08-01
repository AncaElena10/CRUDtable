import { Directive } from '@angular/core';
import { Validator, NG_VALIDATORS, FormControl } from '@angular/forms';


@Directive({
  selector: '[advs-email]',
  providers: [{ provide: NG_VALIDATORS, useExisting: EmailvalidatorDirective, multi: true }]
})

export class EmailvalidatorDirective implements Validator {

  emailPattern = new RegExp('/^(([^<>()\[\]\\.,;:\s@"]+(\.[^ <>() \[\]\\.,;: \s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/');

  validate(c: FormControl): { [key: string]: any } {
    if (c.value == null)
      return null;

    if (!this.emailPattern.test(c.value)) {
      return { "pattern": true };
    }
    return null;
  }
}
