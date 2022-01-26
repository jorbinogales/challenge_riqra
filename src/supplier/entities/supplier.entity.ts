import { ProductEntity } from "./../../product/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./../../user/entities/user.entity";

@Entity('supplier')
export class SupplierEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'name', type:'varchar', length: '255', nullable: false})
    name: string

    @OneToMany(() => ProductEntity, product => product.id)
    products: ProductEntity[];

    @OneToMany(() => UserEntity, user => user.id)
    users: UserEntity[];
    
}
