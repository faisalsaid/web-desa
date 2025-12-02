'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import Link from 'next/link';

import { TStaff } from '../_lib/staff.type';
import ImageWrapper from '@/components/ImageWraper';
import { FaWhatsapp, FaWhatsappSquare } from 'react-icons/fa';

const StaffDetailsComp = ({ staff }: { staff: TStaff }) => {
  console.log(staff);

  return (
    <Card className="group relative overflow-hidden border-0 bg-background shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-zinc-900">
      {/* Decorative Gradient Background */}
      <div className="h-24 w-full bg-linear-to-r from-violet-500 to-fuchsia-500 opacity-80 transition-all duration-500 group-hover:opacity-100" />

      <CardHeader className="relative -mt-12 flex flex-col items-center pb-2">
        {/* Avatar with Ring Effect */}

        <div
          className="h-32 w-32  relative rounded-full
        overflow-hidden border-[5px]"
        >
          <ImageWrapper
            src={staff.imageUrl as string}
            alt={`Foto profil ${staff.name}`}
            objectFit="cover"
          />
        </div>

        {/* Name & Role */}
        <div className="mt-4 text-center">
          <h3 className="text-xl font-bold tracking-tight text-foreground">
            {staff.name}
          </h3>
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            {staff.positionType.name}
          </p>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col items-center gap-4 text-center">
        {/* Bio */}
        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
          {staff.positionType.description}
        </p>

        {/* Skills / Tags */}
        <div className="flex flex-wrap justify-center gap-2">
          {/* {skills.map((skill, index) => (
            <Badge 
              key={index} 
              variant="secondary" 
              className="bg-primary/5 hover:bg-primary/10 text-primary transition-colors"
            >
              {skill}
            </Badge>
          ))} */}
        </div>
      </CardContent>

      {/* Footer / Social Actions */}
      <CardFooter className="flex justify-center gap-2 border-t bg-muted/20 py-4 pb-6">
        <Button
          variant="ghost"
          size="icon"
          asChild
          className="hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
        >
          {staff.resident?.phone && (
            <Link
              href={`https://wa.me${staff.resident?.phone}`}
              target="_blank"
            >
              <FaWhatsapp className="h-5 w-5" /> <p>{staff.resident?.phone}</p>
            </Link>
          )}
        </Button>
        {staff.resident?.phone && (
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <Link href={`mailto:${staff.resident?.email}`}>
              <Mail className="h-5 w-5" />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default StaffDetailsComp;
