import { IsIn, IsNumber, IsString } from 'class-validator';

export class ItemCreateInput {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsString()
  description: string;

  @IsNumber()
  stock: number;

  @IsNumber()
  price: number;

  @IsString()
  cover?: string;

  @IsIn(['FANTASY', 'SCIFI', 'MYSTERY', 'ADVENTURE', 'HORROR'])
  genre: 'FANTASY' | 'SCIFI' | 'MYSTERY' | 'ADVENTURE' | 'HORROR';
}
