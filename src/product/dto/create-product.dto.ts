import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    supplier_id: number;

    @IsNumber()
    @IsNotEmpty()
    price: number;

}
