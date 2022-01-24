import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ProductSeederService } from './product/seeder/product.seeder';
import { SeederModule } from './seeder.module';
import { SupplierSeederService } from './supplier/seeder/supplier.seeder';
require('dotenv').config();

async function bootstrap() {

    NestFactory.createApplicationContext(SeederModule).then(appContext => {
        
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

    NestFactory.createApplicationContext(SeederModule).then(appContext => {
        
        const logger = appContext.get(Logger);
        const productSeeder = appContext.get(ProductSeederService);

        productSeeder.seed()
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
}
bootstrap();


