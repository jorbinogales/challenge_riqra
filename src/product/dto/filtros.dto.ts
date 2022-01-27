import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class FiltrosDto {

    @IsString()
    @IsOptional()
    @ApiProperty({ type: "string", description: "name", default: "Apple"})
    name: string;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ type: "number", description: "price", default: 15})
    price: number;

}
