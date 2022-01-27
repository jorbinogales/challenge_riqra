import { ProductEntity } from "./../../product/entities/product.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
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

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;

    @Column({ type: 'timestamp', nullable: true })
    deleted_at?: Date;
    
}
