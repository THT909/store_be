import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './entities/category.entity';
import { Model, Types } from 'mongoose';
import { isValidMongoId } from 'src/lib/checker.help';

@Injectable()
export class CategorysService {
  constructor(
    @InjectModel(Category.name) readonly categoryModel: Model<CategoryDocument>,
  ) {}
  async create(body: CreateCategoryDto) {
    if (body.prarentId) {
      if (!isValidMongoId(body.prarentId)) {
        throw new HttpException(
          'parentId require mongoID',
          HttpStatus.BAD_GATEWAY,
        );
      }
    }
    const data = await this.categoryModel.findOne({
      $or: [
        { name: body.name },
        { _id: { $ne: new Types.ObjectId(body.prarentId) } },
      ],
    });
    if (data) {
      throw new HttpException(
        'cant find parent or ivalid name',
        HttpStatus.BAD_GATEWAY,
      );
    }
    return this.categoryModel.create(body);
  }

  findAll() {
    return;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
