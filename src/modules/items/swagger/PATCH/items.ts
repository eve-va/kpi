import { ApiResponseOptions, getSchemaPath } from '@nestjs/swagger';
import { ItemGetSchema } from '../GET/schemas/items.schema';

export const ItemsPatchResponse: ApiResponseOptions = {
  description: 'Successful item update',
  schema: {
    $ref: getSchemaPath(ItemGetSchema),
  },
};
