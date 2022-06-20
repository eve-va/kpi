import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsString } from 'class-validator';

export class ItemCreateInput {
  @IsString()
  @ApiProperty({
    description: "Item's title",
    required: true,
    example: 'Lord of the rings',
  })
  title: string;

  @IsString()
  @ApiProperty({
    description: "Item's author",
    required: true,
    example: 'J. R. R. Tolkien',
  })
  author: string;

  @IsString()
  @ApiProperty({
    description: "Skill's description",
    required: true,
    example: 'Short description',
  })
  description: string;

  @IsString()
  @ApiProperty({
    description: "Link to item's cover on AWS",
    required: false,
    example: 'link',
  })
  cover?: string;

  @IsIn(['FANTASY', 'SCIFI', 'MYSTERY', 'ADVENTURE', 'HORROR'])
  @ApiProperty({
    description: "Item's genre",
    enum: ['FANTASY', 'SCIFI', 'MYSTERY', 'ADVENTURE', 'HORROR'],
    required: true,
    example: 'FANTASY',
  })
  genre: 'FANTASY' | 'SCIFI' | 'MYSTERY' | 'ADVENTURE' | 'HORROR';
}
