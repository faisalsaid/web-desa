'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import Image from 'next/image';

const WelcomeSentenceSection = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center">
        <Image
          className="bg-white rounded-full"
          src={'/img/logo-desa.png'}
          alt="Logo Desa Torino"
          width={200}
          height={200}
        />
      </div>
      <p className="text-center text-lg font-semibold text-amber-600">
        Sambutan Kepala Desa Torino
      </p>
      <div className="text-center">
        <p className="text-2xl font-semibold">Antonio Conte</p>
        <p className="text-muted-foreground">Kepala Desa Torino</p>
      </div>
      <ScrollArea className="h-56 ">
        <div className="space-y-2">
          <div className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus,
            debitis fugiat. Perspiciatis deserunt minima reprehenderit nesciunt
            delectus porro deleniti consequuntur aut nobis ducimus iste
            quibusdam consectetur vitae exercitationem possimus autem quam,
            dolore illo minus temporibus blanditiis magni incidunt provident.
            Perferendis eaque libero minima alias nisi nemo, ab sequi sit dolore
            repellat obcaecati placeat maxime natus minus ratione delectus.
            Ratione praesentium similique corrupti maiores vero commodi ex
            molestiae nulla obcaecati repellat magnam alias voluptate eos, ut
            natus minus qui sit. Totam cumque ipsa, quae, dignissimos error
            voluptatem nobis eaque neque suscipit minus ex ullam consequuntur,
            voluptate quis corrupti praesentium veniam ipsam adipisci quas.
            Neque officiis ipsam alias aspernatur consequatur explicabo sequi
            nisi a cupiditate doloremque accusamus et, aut consequuntur nihil
            perspiciatis!
          </div>
          <div>
            <p className="text-lg font-semibold">Antonio Conte</p>
            <p className="text-sm">Kepala Desa Torino</p>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default WelcomeSentenceSection;
