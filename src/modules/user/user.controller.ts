import { Request, Response } from "express";
import { UserService } from "./user.service";
import { CreateUserDto, LoginUserDto } from "./user.types";

export class UserController{
 constructor(private userService: UserService){

 }

 async createUser(req: Request, res: Response): Promise<void>{
  const user = req.body as CreateUserDto;
  const savedUser = await this.userService.createUser(user);
  const {password,...rest} = savedUser;
  res.send(rest)
 }

 async login(req: Request, res: Response): Promise<void>{
  try {
    const user = req.body as LoginUserDto;
    const token = await this.userService.login(user);
    res.send(token);
  } catch (error) {
    res.status(401).send({message: (error as Error).message});
  }
 }
}