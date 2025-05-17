import { Command, CommandRunner, Option } from 'nest-commander';
import { ProductService } from '../../products/services/product.service';
import { CreateProductDto } from '../../products/dto/create-product.dto';
import { Unit } from '../../products/enums/unit-enum';

@Command({ name: 'create_products', description: 'Cria fake produtos' })
export class CreateProductsSeed extends CommandRunner {
  constructor(private readonly productService: ProductService) {
    super();
  }

  async run(
    passedParams: string[],
    options?: Record<string, any>,
  ): Promise<void> {
    const quantity = options?.quantity || 1;
    let index = 0;

    while (index < quantity) {
      const name = this.getName();
      const createProductDto = new CreateProductDto();
      createProductDto.name = name;
      createProductDto.cod =
        Math.floor(Math.random() * (99999999 - 12345678 + 1)) + 10;
      createProductDto.description = `Um belo exemplar de ${name}`;
      createProductDto.unit = Unit.UN;
      createProductDto.price = Math.floor(Math.random() * (500 - 10 + 1)) + 10;
      createProductDto.stock = Math.floor(Math.random() * (99 - 50 + 1)) + 10;

      const product = await this.productService.create(createProductDto);
      console.log(product);
      index++;
    }
  }

  @Option({
    flags: '-qty, --quantity [quantity]',
    description: 'Quantidade de produtos a serem criados',
  })
  parseNumber(val: string): number {
    return Number(val);
  }

  getName(): string {
    const firstName = [
      'Escada',
      'Furadeira',
      'Parafusadeira',
      'Martelo',
      'Escada',
      'Pokemon',
    ];

    const secondName = [
      'grande e forte',
      'potente e de qualidade',
      'destruidor de imperios',
    ];

    const randomFirstName = Math.floor(Math.random() * firstName.length);
    const randomSecondName = Math.floor(Math.random() * secondName.length);

    return `${firstName[randomFirstName]} ${secondName[randomSecondName]}`;
  }
}
