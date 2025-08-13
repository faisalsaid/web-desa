import { Star, Tag } from 'lucide-react';
import Image from 'next/image';

const dummyProducts = [
  {
    id: '1',
    title: 'Roti Tawar',
    price: 10000,
    tag: 'Sembako',
    image:
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '2',
    title: 'Souvenir',
    price: 150000,
    tag: 'Kerajinan',
    image:
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '3',
    title: 'Kain Adat',
    price: 300000,
    tag: 'Kerajinan',
    image:
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

const BelanjaPage = () => {
  return (
    <div className="p-4 space-y-6">
      <div className="space-y-4">
        <h1 className="text-amber-800 font-semibold text-2xl text-center">
          Beli Dari Desa
        </h1>
        <p className="text-center">
          Layanan yang disediakan promosi produk UMKM desa sehingga mampu
          meningkatkan perokonomian masyarakat desa
        </p>
      </div>

      <div className="space-y-4">
        {dummyProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default BelanjaPage;

type ProductType = {
  id: string;
  title: string;
  price: number;
  tag: string;
  image: string;
};

interface ProductCardProps {
  product: ProductType;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="flex   bg-muted rounded-lg shadow overflow-hidden items-stretch">
      <div className="w-1/3 relative rounded-lg overflow-hidden bg-amber-500 ">
        <Image
          alt="product"
          src={
            'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          }
          fill
          className="object-cover w-full h-full"
        />
      </div>
      <div className="w-2/3 space-y-2 p-4">
        <h5>{product.title}</h5>
        <div className="text-xs flex items-center gap-1 text-muted-foreground">
          <Tag className="w-3 h-3" /> <span> {product.tag}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex  items-center text-muted-foreground">
            <Star size={14} />
            <Star size={14} />
            <Star size={14} />
            <Star size={14} />
            <Star size={14} />
          </div>

          <div>Rp. {product.price}</div>
        </div>
      </div>
    </div>
  );
};
