import {
  IsString,
  MinLength,
  IsOptional,
  IsInt,
  IsPositive,
} from 'class-validator';

export class UpdateCatDto {
  @IsString()
  @MinLength(3)
  @IsOptional()
  name?: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  edad?: number;

  @IsString()
  @IsOptional()
  breed?: string;
}
