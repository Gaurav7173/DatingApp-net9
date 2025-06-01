import { Directive, inject, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Directive({
  selector: '[appHasRole]',//*appHasRole
  standalone: true
})
export class HasRoleDirective implements OnInit {

  @Input() appHasRole: string[] = []; // Array of roles to check against
  private accountService=inject(AccountService); // Replace with actual account service type
  private viewContainerRef = inject(ViewContainerRef); // ViewContainerRef to manipulate the DOM
  private templateRef = inject(TemplateRef) // Create an embedded view

  ngOnInit(): void {
    if(this.accountService.roles()?.some((r:string)=>this.appHasRole.includes(r))) {
      // If the user has at least one of the required roles, create an embedded view
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
    else {
      // If the user does not have the required roles, clear the view container
      this.viewContainerRef.clear();
    }
    
  }

}
