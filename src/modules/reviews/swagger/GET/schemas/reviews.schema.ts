import { ApiProperty } from '@nestjs/swagger';
import { Review } from '@prisma/client';

export class ReviewGetSchema implements Review {
  @ApiProperty({
    description: 'Review ID',
  })
  id: string;

  @ApiProperty({
    description: "Review's content",
    example: 'Comment',
  })
  content: string;

  @ApiProperty({
    description: "Review's rating",
    example: 8,
  })
  rating: number;

  @ApiProperty({
    description: "Review's author id",
    example: 'uuid',
  })
  userId: string;

  @ApiProperty({
    description: "Review's item id",
    example: 'uuid',
  })
  itemId: string;

  @ApiProperty({
    description: "Date and time of review's creation",
    example: '2022-06-11T13:02:30.342Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: "Date and time of review's update",
    example: '2022-06-11T13:02:30.342Z',
  })
  updatedAt: Date;
}
