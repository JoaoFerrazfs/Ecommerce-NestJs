import { Offer } from '../../../src/offers/entities/offer.entity';
import { ObjectId } from 'mongodb';

export const mockedOffer = new Offer();
mockedOffer.title = 'escadas promocionais';
mockedOffer.products = [new ObjectId('679271f302e8562ae6ce2484')];
