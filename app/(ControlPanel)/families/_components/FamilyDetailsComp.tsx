'use client';

import {
  CircleStar,
  Edit,
  Eye,
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
import { DUSUN_LIST } from '@/lib/staticData';
import ResidentDetails from '../../residents/_components/ResidentDetails';
import { useEffect, useState } from 'react';
import { getResidentDetails } from '../../residents/_lib/residents.actions';

type FamilyDetailType = FamilyType;

interface FamilyDetailsProps {
  family: FamilyDetailType;
}

const FamilyDetailsComp = ({ family }: FamilyDetailsProps) => {
  const labelDusun =
    DUSUN_LIST.find((d) => d.key === family.dusun)?.value ?? family.dusun;

  const headOfFamily = family.members.filter(
    (p) => p.familyRelationship === 'HEAD',
  );
  // console.log(headOfFamily[0].urlId);

  const [residentId, setResidentId] = useState<string>(headOfFamily[0].urlId);

  const [singelResident, setSingelResident] = useState<ResidentType | null>();

  useEffect(() => {
    const fetchResidentDetails = async () => {
      const result = await getResidentDetails(residentId);

      console.log(result);

      if (result) {
        setSingelResident(result);
      }
    };

    fetchResidentDetails();
  }, [residentId]);
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <div className="space-y-4">
        <ContentCard>
          <div>
            <h1 className="text-xl">NIK : {family.familyCardNumber}</h1>
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
              <p className="">
                {family.address}, RT : {family.rt} RW : {family.rw},{' '}
                {labelDusun}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Users />
              <p className="">{family.members.length} orang</p>
            </div>
          </div>
        </ContentCard>
        <Separator />
        <ContentCard>
          <p className="text-xl">Anggota Keluarga : </p>
        </ContentCard>
        <div className="space-y-3 sm:grid gap-4">
          {family.members.map((member) => (
            <MemberCard
              key={member.id}
              resident={member}
              onSelect={setResidentId}
            />
          ))}
        </div>
      </div>
      <div className="hidden md:block">
        {singelResident ? <ResidentDetails resident={singelResident} /> : null}
      </div>
    </div>
  );
};

export default FamilyDetailsComp;

interface MemberCardProps {
  resident: ResidentType;
  onSelect: (id: string) => void; // tipe callback
}

const MemberCard = ({ resident, onSelect }: MemberCardProps) => {
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
            <Button
              className="rounded-full hidden sm:flex"
              size={'icon'}
              onClick={() => onSelect(resident.urlId)}
            >
              <Eye />
            </Button>
            <Button className="rounded-full bg-sky-300 md:hidden" size={'icon'}>
              <Link href={`/residents/${resident.urlId}`}>
                <Eye />
              </Link>
            </Button>
            <Button className="rounded-full bg-green-400" size={'icon'}>
              <Link href={`/residents/${resident.urlId}/update`}>
                <Edit />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
