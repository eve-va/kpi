import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ReviewUpdateInput {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: "Review's content",
    required: false,
    example: 'Comment',
  })
  content?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    description: "Review's rating",
    required: false,
    example: 8,
  })
  rating?: number;
}