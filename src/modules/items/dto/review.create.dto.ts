import { IsNumber, IsString } from 'class-validator';

export class ReviewCreateInput {
  @IsString()
  content: string;

  @IsNumber()
  rating: number;
}
