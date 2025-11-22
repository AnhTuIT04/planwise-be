import { Injectable } from '@nestjs/common';
import { CreateSubtaskDto } from './dto/create-subtask.dto';
import { UpdateSubtaskDto } from './dto/update-subtask.dto';

@Injectable()
export class SubtaskService {
  create(createSubtaskDto: CreateSubtaskDto) {
    return 'This action adds a new subtask';
  }

  findAll() {
    return `This action returns all subtask`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subtask`;
  }

  update(id: number, updateSubtaskDto: UpdateSubtaskDto) {
    return `This action updates a #${id} subtask`;
  }

  remove(id: number) {
    return `This action removes a #${id} subtask`;
  }
}
