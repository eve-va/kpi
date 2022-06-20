import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class ReviewCreateInput {
  @IsString()
  @ApiProperty({
    description: "Review's content",
    required: true,
    example: 'Comment',
  })
  content: string;

  @IsNumber()
  @ApiProperty({
    description: "Review's rating",
    required: true,
    example: 8,
  })
  rating: number;

  @IsString()
  @ApiProperty({
    description: "Review's item id",
    example: 'uuid',
  })
  itemId: string;

  @IsString()
  @ApiProperty({
    description: "Review's author id",
    example: 'uuid',
  })
  userId: string;
}
