import { Injectable } from "@nestjs/common";
import { CreateOrUpdateSectionDto } from "./dto/create-or-update-section.dto";
import { DatabaseService } from "../database/database.service";

@Injectable()
export class SectionService {
  constructor(private db: DatabaseService) {}

  create(userId: string, createOrUpdateSectionDto: CreateOrUpdateSectionDto) {
    return this.db.section.create({
      data: { name: createOrUpdateSectionDto.name, owner: { connect: { id: userId } } },
    });
  }

  findAll(userId: string) {
    return this.db.section.findMany({
      include: { tasks: true },
      where: { userId },
    });
  }

  update(id: string, updateSectionDto: CreateOrUpdateSectionDto, userId: string) {
    return this.db.section.update({ where: { id, userId }, data: updateSectionDto });
  }

  remove(id: string, userId: string) {
    return this.db.section.delete({ where: { id, userId } });
  }
}
