import { IsBoolean, IsOptional } from "class-validator"

export class updateUserSettingsDto {
    @IsOptional()
    @IsBoolean()
    smsOn?: boolean

    @IsOptional()
    @IsBoolean()
    notificationsOn?: boolean
}