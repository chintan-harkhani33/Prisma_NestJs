import { User as userMode } from "@prisma/client";

export class UserEntity implements userMode  {
    id : number;
    email: string;
    name: string;
}
