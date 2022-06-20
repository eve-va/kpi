import { ApiProperty } from '@nestjs/swagger';
import { GENRE, Item } from '@prisma/client';

export class ItemGetSchema implements Item {
  @ApiProperty({
    description: 'Item ID',
  })
  id: string;

  @ApiProperty({
    description: "Item's title",
    example: 'Lord of the rings',
  })
  title: string;

  @ApiProperty({
    description: "Item's author",
    example: 'J. R. R. Tolkien',
  })
  author: string;

  @ApiProperty({
    description: "Skill's description",
    example: 'Short description',
  })
  description: string;

  @ApiProperty({
    description: "Link to item's cover on AWS",
    example: 'link',
  })
  cover: string;

  @ApiProperty({
    description: "Item's genre",
    enum: ['FANTASY', 'SCIFI', 'MYSTERY', 'ADVENTURE', 'HORROR'],
    example: 'FANTASY',
  })
  genre: GENRE;

  @ApiProperty({
    description: "Date and time of item's creation",
    example: '2022-06-11T13:02:30.342Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: "Date and time of item's update",
    example: '2022-06-11T13:02:30.342Z',
  })
  updatedAt: Date;
}
