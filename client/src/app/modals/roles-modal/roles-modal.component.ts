import { Component, inject } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-roles-modal',
  standalone: true,
  imports: [],
  templateUrl: './roles-modal.component.html',
  styleUrl: './roles-modal.component.css'
})
export class RolesModalComponent {
  bsModalRef=inject(BsModalRef);
  username='';
  title='';
  availableRoles:string[]=[];
  selectedRoles:string[]=[];
  rolesUpdated=false; // Flag to indicate if roles have been updated
  
  updateChecked(checkedValues:string){
    if(this.selectedRoles.includes(checkedValues)){
      this.selectedRoles = this.selectedRoles.filter(role => role !== checkedValues); // Remove the role if it is already selected
    } else {
      this.selectedRoles.push(checkedValues); // Add the role if it is not already selected
  }
  
}
onSelectRoles(){
    this.rolesUpdated = true; // Set the flag to true when roles are selected
    this.bsModalRef.hide(); // Close the modal after selecting roles
  }
}
