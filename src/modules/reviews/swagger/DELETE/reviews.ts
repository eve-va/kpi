import { ApiResponseOptions, getSchemaPath } from '@nestjs/swagger';
import { ReviewGetSchema } from '../GET/schemas/reviews.schema';

export const ReviewsDeleteResponse: ApiResponseOptions = {
  description: 'Review deleted',
  schema: {
    $ref: getSchemaPath(ReviewGetSchema),
  },
};
