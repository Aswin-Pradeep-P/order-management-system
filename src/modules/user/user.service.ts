import { response } from "express";
import { CartRepository } from "../cart/cart.repository";
import { UserRespository } from "./user.repository";
import { CreateUserDto, LoginUserDto } from "./user.types";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();
export class UserService{

  async createUser(user: CreateUserDto){
  user.password = bcrypt.hashSync(user.password, 10);

   let savedUser = await UserRespository.save(user);
   const cart = CartRepository.create({user: savedUser, items: []})
   const savedCard = await CartRepository.save(cart);
   savedUser.cart = savedCard;

   savedUser = await UserRespository.save(user);

   return savedUser;
  }

  async login(user: LoginUserDto){
    const existingUser = await UserRespository.findOne({where: {email: user.email}});
    if(!existingUser){
      throw new Error("Unable to login");
    }

    const isPasswordValid = bcrypt.compareSync(user.password, existingUser.password);
    if(!isPasswordValid){
      throw new Error("Unable to login");
    }

    return jwt.sign({userId: existingUser.id}, process.env.JWT_SECRET!, {expiresIn: '1h'});
  }
}