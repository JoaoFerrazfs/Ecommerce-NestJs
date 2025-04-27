import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoadedOffer, Offer } from '../entities/offer.entity';
import { Repository } from 'typeorm';
import { CreateOfferDto } from '../dto/create-offer.dto';
import { Product } from '../../products/entities/product.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class OffersService {
  public constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  public async create(data: CreateOfferDto): Promise<Offer> {
    const newOffer = this.offerRepository.create({
      title: data.title,
      products: data.products.map((product) => new ObjectId(product)),
    });

    return await this.offerRepository.save(newOffer);
  }

  public async getAllLoadedOffers(): Promise<LoadedOffer[]> {
    const offers: Offer[] = await this.offerRepository.find();
    return await this.loadProducts(...offers);
  }

  public async getLoadedOffer(id: string): Promise<LoadedOffer> {
    const offers: Offer = await this.offerRepository.findOneBy({
      _id: new ObjectId(id),
    });

    const offer = await this.loadProducts(offers);

    return offer[0];
  }

  public async delete(id: string): Promise<boolean> {
    const result = await this.offerRepository.delete(id);

    return Boolean(result.affected);
  }

  public async update(offer: Offer, data: CreateOfferDto): Promise<Offer> {
    const updatedOffer = { ...offer, ...data };

    return await this.offerRepository.save(updatedOffer);
  }

  public async findOneBy(id: string | ObjectId): Promise<Offer | null> {
    return id instanceof ObjectId
      ? this.offerRepository.findOneBy({ _id: id })
      : this.offerRepository.findOneBy({ _id: new ObjectId(id) });
  }

  public async findAndLoadOneBy(
    id: string | ObjectId,
  ): Promise<LoadedOffer | null> {
    const offer = await this.findOneBy(id);

    if (!offer) return null;

    return (await this.loadProducts(offer))[0];
  }

  private async loadProducts(...offers: Offer[]): Promise<LoadedOffer[]> {
    let transformedOffers: LoadedOffer[] = [];

    for (const offer of offers) {
      const products: Product[] = [];
      for (const productId of offer.products) {
        const product = await this.productRepository.findOneBy({
          _id: new ObjectId(productId),
        });

        products.push(product);
      }

      transformedOffers.push({
        _id: offer._id,
        title: offer.title,
        products: products,
      });
    }

    return transformedOffers;
  }
}
