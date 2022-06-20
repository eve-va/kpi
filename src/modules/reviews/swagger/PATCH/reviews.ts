import { ApiResponseOptions, getSchemaPath } from '@nestjs/swagger';
import { ReviewGetSchema } from '../GET/schemas/reviews.schema';

export const ReviewsPatchResponse: ApiResponseOptions = {
  description: 'Successful review update',
  schema: {
    $ref: getSchemaPath(ReviewGetSchema),
  },
};
