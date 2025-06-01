import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

export const adminGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const toastr = inject(ToastrService);
  
  if (accountService.roles().includes('Admin')||accountService.roles().includes('Moderator')) {
    // User is an Admin or Moderator, allow access
    return true;
  } else {
    toastr.error('You can not enter this area');
    return false;
  }
};
