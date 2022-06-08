import { IsIn, IsString } from 'class-validator';

export class ItemCreateInput {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsString()
  description: string;

  @IsIn(['FANTASY', 'SCIFI', 'MYSTERY', 'ADVENTURE', 'HORROR'])
  genre: 'FANTASY' | 'SCIFI' | 'MYSTERY' | 'ADVENTURE' | 'HORROR';
}
