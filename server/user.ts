import { UserInt, Db, dbInt} from './inteface';

class User {
  fullname: string;
  email: string;
  gender: string;
  phone: string;
  address: string;
  notes: string;
  constructor(user: UserInt) {
    this.fullname = user.fullname;
    this.email = user.email;
    this.gender = user.gender;
    this.phone = user.phone;
    this.address = user.address;
    this.notes = user.notes;
  }
}

class Admin {
  id: number;
  email: string;
  password: string;

  constructor(user: Db) {
    this.id = user.id;
    this.email = user.email;
    this.password = user.password;
  }
}

class regUser {
    username: string;
    email: string;
    password: string;
    password2: string;
  
    constructor(user: dbInt) {
      this.username = user.username;
      this.email = user.email;
      this.password = user.password;
      this.password2 = user.password2;
    }
}

export { User, Admin, regUser};
