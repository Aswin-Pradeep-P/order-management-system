import { Cart } from "../cart/cart.entity";
import { CartRepository } from "../cart/cart.repository";
import { UserRespository } from "./user.repository";
import { CreateUserDto } from "./user.types";

export class UserService{

  async createUser(user: CreateUserDto){
   const savedUser = await UserRespository.save(user);

   const cart = CartRepository.create({user: savedUser, items: []})
   await CartRepository.save(cart);

   return savedUser;
  }
}