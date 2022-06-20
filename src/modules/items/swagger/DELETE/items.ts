import { ApiResponseOptions, getSchemaPath } from '@nestjs/swagger';
import { ItemGetSchema } from '../GET/schemas/items.schema';

export const ItemsDeleteResponse: ApiResponseOptions = {
  description: 'Item deleted',
  schema: {
    $ref: getSchemaPath(ItemGetSchema),
  },
};
