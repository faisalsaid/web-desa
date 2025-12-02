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

// --- 1. DATA HARDCODE DI SINI ---
const STAFF_DATA = [
  {
    id: 1,
    name: 'Dimas Anggara',
    role: 'Lead Developer',
    avatar:
      'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=400&auto=format&fit=crop',
    bio: 'Penggemar kopi dan kode bersih. Berpengalaman 8 tahun membangun sistem skala besar dengan arsitektur microservices.',
    skills: ['React', 'Node.js', 'AWS', 'System Design'],
    social: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      email: 'dimas@example.com',
    },
    gradient: 'from-blue-500 to-cyan-400', // Warna banner custom per staff
  },
  {
    id: 2,
    name: 'Siti Nurhaliza',
    role: 'UI/UX Designer',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop',
    bio: 'Menciptakan pengalaman visual yang intuitif. Fokus pada aksesibilitas dan interaksi mikro yang menyenangkan.',
    skills: ['Figma', 'Prototyping', 'User Research'],
    social: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      email: 'siti@example.com',
    },
    gradient: 'from-fuchsia-500 to-pink-500',
  },
  {
    id: 3,
    name: 'Reza Rahadian',
    role: 'Product Manager',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    bio: 'Menjembatani kebutuhan bisnis dengan teknologi. Ahli dalam strategi produk dan manajemen tim agile.',
    skills: ['Agile', 'Scrum', 'Roadmap Strategy'],
    social: {
      linkedin: 'https://linkedin.com',
      email: 'reza@example.com',
    },
    gradient: 'from-violet-600 to-indigo-600',
  },
];

export default function TeamGrid() {
  return (
    <section className="py-12 bg-slate-50 dark:bg-zinc-950">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight lg:text-4xl">
            Tim Hebat Kami
          </h2>
          <p className="mt-4 text-muted-foreground">
            Berkenalan dengan orang-orang di balik layar.
          </p>
        </div>

        {/* Grid Card Staff */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {STAFF_DATA.map((staff) => (
            <Card
              key={staff.id}
              className="group relative flex flex-col overflow-hidden border-none bg-background shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:bg-zinc-900"
            >
              {/* 2. GRADIENT BANNER */}
              <div
                className={`h-28 w-full bg-gradient-to-r ${staff.gradient} opacity-90 transition-opacity group-hover:opacity-100`}
              />

              <CardHeader className="relative -mt-14 flex flex-col items-center pb-2">
                {/* 3. AVATAR MENGAMBANG */}
                <Avatar className="h-28 w-28 border-[5px] border-background shadow-md transition-transform duration-500 group-hover:scale-110 group-hover:rotate-2">
                  <AvatarImage
                    src={staff.avatar}
                    alt={staff.name}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-2xl font-bold">
                    {staff.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                {/* Nama & Jabatan */}
                <div className="mt-4 text-center">
                  <h3 className="text-xl font-bold text-foreground">
                    {staff.name}
                  </h3>
                  <p className="text-sm font-semibold uppercase tracking-widest text-primary/80">
                    {staff.role}
                  </p>
                </div>
              </CardHeader>

              <CardContent className="flex flex-1 flex-col items-center gap-4 text-center px-6">
                {/* Bio */}
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {staff.bio}
                </p>

                {/* Skills Badges */}
                <div className="mt-auto flex flex-wrap justify-center gap-2 pt-2">
                  {staff.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="bg-muted px-3 py-1 hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>

              {/* 4. FOOTER SOCIAL ICONS */}
              <CardFooter className="flex justify-center gap-4 border-t bg-muted/30 py-4 mt-4">
                {staff.social.linkedin && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-full hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-900/30"
                    asChild
                  >
                    <Link href={staff.social.linkedin}>
                      <Linkedin className="h-5 w-5" />
                    </Link>
                  </Button>
                )}

                {staff.social.github && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-full hover:bg-zinc-200 hover:text-black dark:hover:bg-zinc-800 dark:hover:text-white"
                    asChild
                  >
                    <Link href={staff.social.github}>
                      <Github className="h-5 w-5" />
                    </Link>
                  </Button>
                )}

                {staff.social.twitter && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-full hover:bg-sky-100 hover:text-sky-500 dark:hover:bg-sky-900/30"
                    asChild
                  >
                    <Link href={staff.social.twitter}>
                      <Twitter className="h-5 w-5" />
                    </Link>
                  </Button>
                )}

                {staff.social.email && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-full hover:bg-red-100 hover:text-red-500 dark:hover:bg-red-900/30"
                    asChild
                  >
                    <Link href={`mailto:${staff.social.email}`}>
                      <Mail className="h-5 w-5" />
                    </Link>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
