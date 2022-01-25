import { UserEntity } from "src/user/entities/user.entity";
import { Column, PrimaryGeneratedColumn, UpdateDateColumn, Entity, CreateDateColumn, OneToMany } from "typeorm";
import { Roles } from "../interface/role.interface";


@Entity('role')
export class RoleEntity{
    @PrimaryGeneratedColumn()
    id?: number;

    @OneToMany(() => UserEntity, user => user.role_id)
    user_id?: UserEntity[];
    
    @Column({ type: 'enum', enum: Roles })
    role: Roles;

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;

    @Column({ type: 'timestamp', nullable: true })
    deleted_at?: Date;
}