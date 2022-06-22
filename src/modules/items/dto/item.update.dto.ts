import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString } from 'class-validator';

export class ItemUpdateInput {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: "Item's title",
    required: false,
    example: 'Lord of the rings',
  })
  title?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: "Item's author",
    required: false,
    example: 'J. R. R. Tolkien',
  })
  author?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: "Skill's description",
    required: false,
    example: 'Short description',
  })
  description?: string;

  @IsOptional()
  @ApiProperty({
    description: "Link to item's cover on AWS",
    required: false,
    example: 'link',
  })
  cover?: any;

  @IsIn(['FANTASY', 'SCIFI', 'MYSTERY', 'ADVENTURE', 'HORROR'])
  @IsOptional()
  @ApiProperty({
    description: "Item's genre",
    enum: ['FANTASY', 'SCIFI', 'MYSTERY', 'ADVENTURE', 'HORROR'],
    required: false,
    example: 'FANTASY',
  })
  genre?: 'FANTASY' | 'SCIFI' | 'MYSTERY' | 'ADVENTURE' | 'HORROR';
}
