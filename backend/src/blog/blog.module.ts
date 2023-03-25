import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BlogController } from "./blog.controller";
import { Blog, BlogSchema } from "./blog.schema";
import { BlogService } from "./blog.service";

@Module({
  controllers: [BlogController],
  providers: [BlogService],
  imports: [
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
  ],
})
export class BlogModule {}
