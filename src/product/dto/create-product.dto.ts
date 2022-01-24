import { IsNumber, IsString } from "class-validator";

export class CreateProductDto {

    @IsString()
    name: string;

    @IsNumber()
    supplier_id: number;

    @IsNumber()
    price: number;

}
