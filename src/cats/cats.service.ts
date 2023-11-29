import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm';
import { Breed } from 'src/breeds/entities/breed.entity';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
  ) { }

  async create(createCatDto: CreateCatDto) {
    // const cat = this.catRepository.create(createCatDto);
    // return await this.catRepository.save(cat);
    const breed = await this.breedRepository.findOneBy({
      name: createCatDto.breed,
    });
    if (!breed) {
      throw new BadRequestException('breed not found nel perro');
    }

    return await this.catRepository.save({
      ...createCatDto,
      breed,
    });
  }

  async findAll() {
    return await this.catRepository.find();
  }

  findOne(id: number) {
    return this.catRepository.findOneBy({ id });
  }

  async update(id: number, updateCatDto: UpdateCatDto) {
    //return await this.catRepository.update(id, updateCatDto);
    return;
  }

  remove(id: number) {
    return this.catRepository.softDelete({ id });
  }
}
