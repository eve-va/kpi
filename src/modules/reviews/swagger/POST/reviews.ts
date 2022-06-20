import { ApiResponseOptions, getSchemaPath } from '@nestjs/swagger';
import { ReviewGetSchema } from '../GET/schemas/reviews.schema';

export const ReviewsPostResponse: ApiResponseOptions = {
  description: 'Succesfull review creation',
  schema: {
    $ref: getSchemaPath(ReviewGetSchema),
  },
};
