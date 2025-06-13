import { AppDataSource } from "../../config/data-source";
import { User } from "./user.entity";

export const UserRespository = AppDataSource.getRepository(User);