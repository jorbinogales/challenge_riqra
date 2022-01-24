import { SupplierEntity } from "src/supplier/entities/supplier.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

}
