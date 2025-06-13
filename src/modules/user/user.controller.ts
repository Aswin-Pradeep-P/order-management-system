import { Request, Response } from "express";
import { UserService } from "./user.service";
import { CreateUserDto } from "./user.types";

export class UserController{
 constructor(private userService: UserService){

 }

 async createUser(req: Request, res: Response): Promise<void>{
  const user = req.body as CreateUserDto;
  const savedUser = await this.userService.createUser(user);
  const {password,...rest} = savedUser;
  res.send(rest)
 }

}