import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService=inject(AccountService);
  const toastr=inject(ToastrService);
  // Check if the user is logged in

  if(accountService.currentUser()){
    return true;
  }else{
    toastr.error("You can't access");
    return false;   
  }

  return true;
};
