import { SupplierEntity } from "./../../supplier/entities/supplier.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('product')
export class ProductEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({ name: 'name', type:'varchar', length: '255', nullable: false})
    name: string

    @Column({ name: 'price', type: 'float', nullable: false})
    price: number;

    @ManyToOne(() => SupplierEntity, supplier => supplier.id, { eager: true })
    @JoinColumn({ name: 'supplier_id'})
    supplier_id: SupplierEntity;

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;

    @Column({ type: 'timestamp', nullable: true })
    deleted_at?: Date;

}
