import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: "string", description: "name", default: "jorbi"})
    name: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ type: "number", description: "name", default: 1})
    supplier_id: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ type: "number", description: "name", default: 10.50})
    price: number;

}
