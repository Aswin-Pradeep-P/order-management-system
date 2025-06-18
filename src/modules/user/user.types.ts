export interface CreateUserDto{
 name: string;
 email: string;
 password: string;
 address: string;

}

export interface LoginUserDto{
  email: string;
  password: string;
}