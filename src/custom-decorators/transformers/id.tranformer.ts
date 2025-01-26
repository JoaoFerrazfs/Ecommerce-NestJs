import { ObjectId } from 'mongodb';
import { UnprocessableEntityException } from '@nestjs/common';

export const transformeID = (value: any): ObjectId => {
  if (typeof value !== 'string') {
    throw new UnprocessableEntityException(
      `Transforme ID: ${value} is not a string`,
    );
  }

  if (value.length !== 24) {
    throw new UnprocessableEntityException(
      `Transforme ID: ${value} is not a valid id`,
    );
  }

  return new ObjectId(value);
};
