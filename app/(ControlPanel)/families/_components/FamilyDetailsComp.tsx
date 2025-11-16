'use client';

import {
  CircleStar,
  Edit,
  Eye,
  HomeIcon,
  Image as ImageAsIcon,
  MapPinHouse,
  Mars,
  SquareUserRound,
  Users,
  UserStar,
  Venus,
} from 'lucide-react';
import ContentCard from '../../_component/ContentCard';
import { FamilyType } from '../_lib/families.type';
import { Separator } from '@/components/ui/separator';
import { ResidentType } from '../../residents/_lib/residents.type';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type FamilyDetailType = FamilyType;

interface FamilyDetailsProps {
  family: FamilyDetailType;
}

const FamilyDetailsComp = ({ family }: FamilyDetailsProps) => {
  return (
    <div className="space-y-4">
      <ContentCard>
        <div>
          <p>Detail Keluarga :</p>
          <h1 className="text-2xl">NIK : {family.familyCardNumber}</h1>
        </div>
      </ContentCard>
      <ContentCard>
        <div className="space-y-3">
          <p>Info Umum :</p>
          <div className="flex items-center gap-2">
            <UserStar className="" />
            <p className="font-semibold text-xl">
              {family.headOfFamily?.fullName}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <MapPinHouse />
            <p className="text-lg">
              {family.address}, RT : {family.rt} RW : {family.rw} {family.dusun}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Users />
            <p className="text-lg">{family.members.length} orang</p>
          </div>
        </div>
      </ContentCard>
      <Separator />
      <ContentCard>
        <p className="text-xl">Anggota Keluarga : </p>
      </ContentCard>
      <div className="space-y-3 sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {family.members.map((member) => (
          <MemberCard key={member.id} resident={member} />
        ))}
      </div>
    </div>
  );
};

export default FamilyDetailsComp;

interface MemberCardProps {
  resident: ResidentType;
}

const MemberCard = ({ resident }: MemberCardProps) => {
  return (
    <div className="p-4 bg-muted rounded-xl relative">
      {resident.familyRelationship === 'HEAD' ? (
        <div className="absolute -top-2 left-5 bg-amber-500/50  rounded-full flex items-center justify-center ">
          <Tooltip>
            <TooltipTrigger asChild>
              <CircleStar size={32} className="text-amber-500" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Kepala Keluarga</p>
            </TooltipContent>
          </Tooltip>
        </div>
      ) : null}

      <div className=" grid grid-cols-3 gap-4">
        <div className="flex content-center">
          <SquareUserRound className="w-32 h-32 text-muted-foreground" />
        </div>
        <div className="col-span-2 space-y-1">
          <p className="text-xl">{resident.fullName}</p>
          <p className="text-sm text-muted-foreground">{resident.nik}</p>

          <div className="flex gap-2 items-center">
            <div>
              {resident.gender === 'MALE' ? (
                <Mars className="text-sky-500" />
              ) : (
                <Venus className="text-pink-500" />
              )}
            </div>

            <Badge
              className={resident.isActive ? 'bg-green-500' : 'bg-slate-400'}
            >
              {resident.isActive ? 'Active' : 'Tidak Aktif'}
            </Badge>
            {resident.birthPlace || resident.birthDate ? (
              <p className="text-sm text-muted-foreground">
                {resident.birthPlace},{' '}
                {resident.birthDate?.toLocaleDateString('id-ID')}
              </p>
            ) : null}
          </div>
          <Separator />
          <div className="flex items-center justify-end gap-2">
            <Link href={`/residents/${resident.urlId}`}>
              <Button className="rounded-full bg-sky-300" size={'icon'}>
                <Eye />
              </Button>
            </Link>
            <Link href={`/residents/${resident.urlId}/update`}>
              <Button className="rounded-full bg-green-400" size={'icon'}>
                <Edit />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
