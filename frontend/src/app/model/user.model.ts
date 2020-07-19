import { Role } from './role.model';

export class User {

    id: number;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    permission: string;
    photoUrl: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
    contactNumber: string;
    emailId: string;
    roles: Array<Object> = [];
    


}
