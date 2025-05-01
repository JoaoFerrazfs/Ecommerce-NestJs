import { Response } from 'express';

export const expressResponse = {
  render: jest.fn(),
  status: jest.fn().mockReturnThis(),
  send: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
  redirect: jest.fn().mockReturnThis(),
} as unknown as Response;
