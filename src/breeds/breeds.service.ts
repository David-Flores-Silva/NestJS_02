import { Injectable } from '@nestjs/common';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Breed } from './entities/breed.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BreedsService {
  constructor(
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
  ) { }

  create(createBreedDto: CreateBreedDto) {
    const newBreed = this.breedRepository.create(createBreedDto);
    return this.breedRepository.save(newBreed);
  }

  findAll() {
    return this.breedRepository.find();
  }

  findOne(id: number) {
    return this.breedRepository.findOneBy({ id });
  }

  update(id: number, updateBreedDto: UpdateBreedDto) {
    return `This action updates a #${id} breed`;
  }

  remove(id: number) {
    return `This action removes a #${id} breed`;
  }
}
