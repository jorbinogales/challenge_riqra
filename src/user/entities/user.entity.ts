import { SupplierEntity } from './../../supplier/entities/supplier.entity';
import { AfterLoad, BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';
import { RoleEntity } from './../../role/entity/role.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'email', type: 'varchar', length: '255', nullable: false, unique: true,})
  email: string;

  @Column({ name: 'password', type: 'varchar', length: '255', nullable: false})
  password: string;

  @ManyToOne(() => SupplierEntity, supplier => supplier.id, { eager: true })
  @JoinColumn({ name: 'supplier_id'})
  supplier_id: SupplierEntity;

  @ManyToOne(() => RoleEntity, role => role.id, { eager: true })
  @JoinColumn({ name: 'role_id'})
  role_id: RoleEntity;

  private tempPassword?: string;

  @AfterLoad()
  loadTempPassword? = () => {
      this.tempPassword = this.password;
  }

  @BeforeInsert()
  @BeforeUpdate()
  encryptPassword? =  async (): Promise<void> => {
      if (this.tempPassword !== this.password) {
          try {
            this.password = await bcrypt.hash(this.password, 10)
    
          } catch (e) {
            throw new InternalServerErrorException('there are some issiue in the hash')
    
          }
      }
  }

  

}
