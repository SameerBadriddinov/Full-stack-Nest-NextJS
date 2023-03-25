import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { BlogModule } from "./blog/blog.module";

@Module({
  imports: [
    MongooseModule.forRoot(
      "mongodb+srv://sammi:t7q4t4Y89m8prtDp@cluster0.vsibq4f.mongodb.net/?retryWrites=true&w=majority"
    ),
    BlogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
