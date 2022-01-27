import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateSupplierDto {
    
    @IsString()
    @ApiProperty({ type: "string", description: "name", default: "New Supplier"})
    name: string;
}
