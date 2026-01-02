import { UserData } from 'src/app/model/userdata.model';
export class Onboarding {
  kycNumber: number | undefined;
  applicationId: number | undefined;
  product: string | undefined;
  userData: UserData;
  email: string | undefined;
  constructor() {
    this.userData = new UserData();
    }
}
