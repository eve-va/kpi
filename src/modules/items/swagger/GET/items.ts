import { ApiResponseOptions, getSchemaPath } from '@nestjs/swagger';
import { ItemGetSchema } from './schemas/items.schema';

export const ItemsGetResponse: ApiResponseOptions = {
  description: 'List of items',
  schema: {
    type: 'array',
    items: {
      $ref: getSchemaPath(ItemGetSchema),
    },
  },
};
