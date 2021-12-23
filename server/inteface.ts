interface UserInt {
  fullname: string;
  email: string;
  gender: string;
  phone: string;
  address: string;
  notes: string;
}

interface ErrorInt {
  success: boolean;
  status: number;
  message: string;
  data: object;
}

interface Db {
  id: number;
  email: string;
  password: string;
}

interface dbInt{
    username: string;
    email: string;
    password: string;
    password2: string;
}

export { UserInt, ErrorInt, Db, dbInt };
