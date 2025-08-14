'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface ProfilCardPorps {
  title: string;
  content?: string;
}

const ProfilCard = ({ title, content }: ProfilCardPorps) => {
  return (
    <div className="bg-muted px-4 rounded-xl">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className="text-lg">{title}</div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="text-muted-foreground">{content}</div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ProfilCard;
