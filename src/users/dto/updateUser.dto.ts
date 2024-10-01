import { IsOptional, IsString } from "class-validator"

export class updateUserDto{
    @IsString()
    @IsOptional()
    username?: string

    @IsString()
    @IsOptional()
    displayName?: string
}