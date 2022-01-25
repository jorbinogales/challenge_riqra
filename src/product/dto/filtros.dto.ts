import { IsNumber, IsOptional, IsString } from "class-validator";

export class FiltrosDto {

    @IsString()
    @IsOptional()
    name: string;

    @IsNumber()
    @IsOptional()
    price: number;

}
