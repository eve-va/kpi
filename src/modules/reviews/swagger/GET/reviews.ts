import { ApiResponseOptions, getSchemaPath } from '@nestjs/swagger';
import { ReviewGetSchema } from './schemas/reviews.schema';

export const ReviewsGetResponse: ApiResponseOptions = {
  description: 'List of teviews',
  schema: {
    type: 'array',
    items: {
      $ref: getSchemaPath(ReviewGetSchema),
    },
  },
};
