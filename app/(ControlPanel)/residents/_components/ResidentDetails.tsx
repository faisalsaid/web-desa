'use client';

import {
  Image as LogoImage,
  Mail,
  MapPin,
  Mars,
  Phone,
  Venus,
} from 'lucide-react';
import ContentCard from '../../_component/ContentCard';
import { ResidentType } from '../_lib/residents.type';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  bloodTypeLabels,
  citizenshipLabels,
  disabilityTypeLabels,
  educationLabels,
  maritalStatusLabels,
  occupationLabels,
  populationStatusLabels,
} from '@/lib/enum';

type ResidentDetailType = ResidentType;

interface ResidentDetailsProps {
  resident: ResidentDetailType;
}

type RowProps = { label: string; value?: any };
const DetailRow = ({ label, value }: RowProps) => (
  <div className="flex items-center justify-between">
    <p>{label}</p>
    <p>{value ?? '-'}</p>
  </div>
);

const DetailSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <ContentCard className="space-y-3">
    <p className="font-semibold text-lg">{title}</p>
    <div>{children}</div>
  </ContentCard>
);

const ResidentDetails = ({ resident }: ResidentDetailsProps) => {
  return (
    <div className="space-y-4">
      {/* === PROFILE CARD === */}
      <ContentCard className="space-y-4">
        <div className="flex items-center justify-center">
          <LogoImage className="w-48 h-48 text-muted-foreground" />
        </div>

        {/* NAME + BIRTH INFO */}
        <div className="text-center space-y-2">
          <p className="text-2xl font-semibold">{resident.fullName}</p>

          {(resident.birthPlace || resident.birthDate) && (
            <div>
              {resident.birthPlace ?? '-'},{' '}
              {resident.birthDate
                ? resident.birthDate.toLocaleDateString()
                : '-'}
            </div>
          )}

          {/* GENDER + ACTIVE STATUS */}
          <div className="flex gap-4 items-center justify-center">
            {resident.gender === 'MALE' ? (
              <Mars className="size-5 text-sky-500" />
            ) : (
              <Venus className="size-5 text-pink-500" />
            )}

            <Badge className={resident.isActive ? 'bg-green-500' : ''}>
              {resident.isActive ? 'Aktif' : 'Tidak Aktif'}
            </Badge>
          </div>
        </div>

        <Separator />

        {/* CONTACT */}
        <div className="flex items-center justify-center flex-col text-muted-foreground space-y-1">
          <p className="flex gap-2 items-center">
            <MapPin className="size-4" /> {resident.address ?? '-'}
          </p>
          <p className="flex gap-2 items-center">
            <Mail className="size-4" /> {resident.email ?? '-'}
          </p>
          <p className="flex gap-2 items-center">
            <Phone className="size-4" /> {resident.phone ?? '-'}
          </p>
        </div>
      </ContentCard>

      {/* === IDENTITY === */}
      <DetailSection title="Identitas">
        <DetailRow label="KK" value={resident.familyId} />
        <DetailRow label="NIK" value={resident.nik} />
        <DetailRow
          label="Kewarganegaraan"
          value={
            resident.citizenship && citizenshipLabels[resident.citizenship]
          }
        />
        <DetailRow label="Passport" value={resident.passportNumber} />
        <DetailRow label="Suku / Etnis" value={resident.ethnicity} />
        <DetailRow label="Kebangsaan" value={resident.nationality} />
      </DetailSection>

      {/* === ADDRESS === */}
      <DetailSection title="Alamat Domisili">
        <DetailRow label="Alamat Lengkap" value={resident.address} />
        <DetailRow label="Dusun" value={resident.dusun} />
        <DetailRow label="RW" value={resident.rw} />
        <DetailRow label="RT" value={resident.rt} />
      </DetailSection>

      {/* === STATUS & OTHERS === */}
      <DetailSection title="Status & Lainnya">
        <DetailRow
          label="Status Pernikahan"
          value={
            resident.maritalStatus &&
            maritalStatusLabels[resident.maritalStatus]
          }
        />
        <DetailRow
          label="Status Penduduk"
          value={
            resident.populationStatus &&
            populationStatusLabels[resident.populationStatus]
          }
        />
        <DetailRow
          label="Golongan Darah"
          value={resident.bloodType && bloodTypeLabels[resident.bloodType]}
        />
        <DetailRow
          label="Jenis Disabilitas"
          value={
            resident.disabilityType &&
            disabilityTypeLabels[resident.disabilityType]
          }
        />
        <DetailRow
          label="Pendidikan"
          value={resident.education && educationLabels[resident.education]}
        />
        <DetailRow
          label="Pekerjaan"
          value={resident.occupation && occupationLabels[resident.occupation]}
        />
      </DetailSection>
    </div>
  );
};

export default ResidentDetails;
