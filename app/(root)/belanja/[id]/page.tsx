import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Star, Tag } from 'lucide-react';
import Image from 'next/image';
import { FaWhatsapp } from 'react-icons/fa';

const ProductDetailPage = () => {
  const souce =
    'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  return (
    <div className="space-y-4 p-4">
      <div className="p-4 space-y-4 bg-muted rounded-xl lg:grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="relative w-full aspect-square rounded-lg overflow-hidden">
            <Image alt="product" src={souce} fill className="object-cover" />
          </div>
          <div className="flex items-center justify-center gap-2">
            {Array.from({ length: 4 }, (_m, i) => (
              <div
                key={i}
                className="relative w-full aspect-square rounded-md overflow-hidden"
              >
                <Image
                  alt="product"
                  src={souce}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        <Separator className="sm:hidden" />
        <div className="space-y-4">
          <h1 className="text-2xl">Roti Tawar</h1>
          <div className="flex gap-4 items-center">
            <div className="flex gap-1 items-center">
              <Star size={14} />
              <Star size={14} />
              <Star size={14} />
              <Star size={14} />
              <Star size={14} />
            </div>
            <div className="flex gap-1 items-center">
              <Tag size={14} /> <span>Sembako</span>
            </div>
          </div>
          <div className="text-2xl text-right">Rp. 10.000,-</div>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident
            adipisci enim, ratione at perspiciatis consequatur culpa ipsum,
            animi iusto laudantium obcaecati. Porro, tenetur?
          </p>

          <Button className="flex items-center justify-center gap-4 p-4 w-full bg-green-600 text-lg rounded-lg text-slate-100 hover:bg-green-700 sm:max-w-56 ml-auto">
            <FaWhatsapp /> <span>Hubungi penjual</span>
          </Button>
        </div>
      </div>
      <div className="p-4 space-y-4 bg-muted rounded-xl text-lg">
        <div>Ulasan Pembeli</div>
        <div className="bg-background rounded-lg p-4">Tak ada ulasan</div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
