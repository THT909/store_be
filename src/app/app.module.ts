import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategorysModule } from 'src/module/categorys/categorys.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      connectionFactory: (connection) => {
        connection.on('connected', () => {
          console.log('\x1b[36m%s\x1b[0m', 'DATABASE IS CONNECTED !!');
        });
        connection._events.connected();
        return connection;
      },
    }),

    CategorysModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
