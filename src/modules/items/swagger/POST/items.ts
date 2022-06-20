import { ApiResponseOptions, getSchemaPath } from '@nestjs/swagger';
import { ItemGetSchema } from '../GET/schemas/items.schema';

export const ItemsPostResponse: ApiResponseOptions = {
  description: 'Succesfull item creation',
  schema: {
    $ref: getSchemaPath(ItemGetSchema),
  },
};
