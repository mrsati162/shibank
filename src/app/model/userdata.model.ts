import { Address } from 'src/app/model/address.model';
export class UserData {
  jobTitleName: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  company: string | undefined;
  dateOfBirth: Date | undefined;
  address: Address;
  constructor() {
      this.address = new Address();
   }
}
