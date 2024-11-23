import {Component, input, model, signal} from '@angular/core';
import {User} from '../user.interface';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-users',
  imports: [MatListModule],
  templateUrl: './users.component.html',
  standalone: true,
  styleUrl: './users.component.scss'
})
export class UsersComponent {

  users = input<User[] | undefined>(undefined);

  selectedUser = model<User | undefined>(undefined);

  selectUser(user: User){
    this.selectedUser.set(user);
  }


}
