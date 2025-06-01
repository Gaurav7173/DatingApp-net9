import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from '../../_services/admin.service';
import { User } from '../../_models/user';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { RolesModalComponent } from '../../modals/roles-modal/roles-modal.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent implements OnInit{
  private adminService=inject(AdminService); // Inject AdminService
  private modalService=inject(BsModalService); // Inject RolesModalComponent for modal operations
  users:User[] = []; // Array to hold users
  bsModalRef: BsModalRef<RolesModalComponent>=new BsModalRef<RolesModalComponent>();// Reference to the Bootstrap modal (not used in this snippet, but can be used for user management actions)


  ngOnInit(): void {
    this.getUsersWithRoles();
     // Load users with roles on component initialization

    
  }
  openRolesModal(user: User) {
    const initialState:ModalOptions={
      class:'modal-lg',
      initialState:{
        title: 'User Roles',
        username: user.username,
        selectedRoles:[...user.roles], // Set the username of the user whose roles are being managed
        availableRoles:['Admin', 'Moderator' ,'Member'],
        users: this.users,
        rolesUpdated:false
         
      }
    }
    this.bsModalRef = this.modalService.show(RolesModalComponent, initialState);
    this.bsModalRef.onHide?.subscribe({
      next: () => {
        if (this.bsModalRef.content && this.bsModalRef.content.rolesUpdated){
          const selectedRoles = this.bsModalRef.content.selectedRoles; // Get the updated roles from the modal
          this.adminService.updateUserRoles(user.username, selectedRoles).subscribe({
            next: roles => user.roles = roles,
           })
           } 
      }
    }) 
  }


  getUsersWithRoles() {
    this.adminService.getUserWithRoles().subscribe({
      next: users => this.users = users, // Assign the fetched users to the component's users property
      error: error => console.error(error) // Handle any errors that occur during the request
    });
  }

}
