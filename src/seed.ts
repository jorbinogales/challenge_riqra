import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ProductSeederService } from './product/seeder/product.seeder';
import { RoleSeederService } from './role/seeder/role.seeder';
import { SeederModule } from './seeder.module';
import { SupplierSeederService } from './supplier/seeder/supplier.seeder';
import { UserSeederService } from './user/seeder/seeder.service';
require('dotenv').config();

async function bootstrap() {

    await NestFactory.createApplicationContext(SeederModule).then(appContext => {
        
        const logger = appContext.get(Logger);
        const supplierSeeder = appContext.get(SupplierSeederService);

        supplierSeeder.seed()
            .then(() => {
                logger.debug('supplier Seeding Complete complete!');
            })
            .catch(error => {
                logger.error('supplier Seeding failed!');
                throw error;
            })
            .finally(() => appContext.close());

    })
    .catch(error => {
        throw error;
    });

    await NestFactory.createApplicationContext(SeederModule).then(appContext => {
        
        const logger = appContext.get(Logger);
        const productSeeder = appContext.get(ProductSeederService);

        productSeeder.seed()
            .then(() => {
                logger.debug('Product Seeding Complete complete!');
            })
            .catch(error => {
                logger.error('Product Seeding failed!');
                throw error;
            })
            .finally(() => appContext.close());

    })
    .catch(error => {
        throw error;
    });


    await NestFactory.createApplicationContext(SeederModule).then(appContext => {
        
        const logger = appContext.get(Logger);
        const roleSeeder = appContext.get(RoleSeederService);

        roleSeeder.seed()
            .then(() => {
                logger.debug('Role Seeding Complete complete!');
            })
            .catch(error => {
                logger.error('Role Seeding failed!');
                throw error;
            })
            .finally(() => appContext.close());

    })
    .catch(error => {
        throw error;
    });


    await NestFactory.createApplicationContext(SeederModule).then(appContext => {
        
        const logger = appContext.get(Logger);
        const roleSeeder = appContext.get(UserSeederService);

        roleSeeder.seed()
            .then(() => {
                logger.debug('Admin Seeding Complete complete!');
            })
            .catch(error => {
                logger.error('Admin Seeding failed!');
                throw error;
            })
            .finally(() => appContext.close());

    })
    .catch(error => {
        throw error;
    });
}
bootstrap();


