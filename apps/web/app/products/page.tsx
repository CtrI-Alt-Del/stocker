import { ProductsPage } from '../../ui/components/pages/products'

type PageProps = {
  params: {
    productId: string
  }
}

const Page = ({ params }: PageProps) => {
  return <ProductsPage />
}
