import { Command, CommandRunner, Option } from 'nest-commander';
import { OpenSearchService } from '../../openSearch/services/opensearch.service';
import { ProductService } from '../../products/services/product.service';

@Command({
  name: 'index_products',
  description: 'Indexa todos os produtos do banco de dados no Opensearch',
})
export class IndexProductsCommand extends CommandRunner {
  constructor(
    private readonly openSearchService: OpenSearchService,
    private readonly productService: ProductService,
  ) {
    super();
  }
  async run(
    passedParams: string[],
    options?: Record<string, any>,
  ): Promise<void> {
    const products = await this.productService.list();

    console.log('Produtos encontrados: ', products.length);

    const results = await this.openSearchService.bulkIndex(
      'products',
      products,
    );

    const ids = results.map((result) => {
      return parseInt(result.index._id);
    });
    console.log(`Os produtos a seguir foram indexados: ${ids.toString()}`);
  }

  @Option({
    flags: '-n, --name [string]',
    description: 'Nome para dizer olá',
  })
  parseName(val: string): string {
    return val;
  }
}
