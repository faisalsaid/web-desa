'use client';

import { useForm } from 'react-hook-form';
import {
  Gender,
  Religion,
  ResidentCreateInput,
  ResidentCreateSchema,
  Education,
  Occupation,
  MaritalStatus,
  BloodType,
  DisabilityType,
  Citizenship,
  PopulationStatus,
} from '../_lib/residents.zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar, Upload } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { createResident } from '../_lib/residents.actions';
import { toast } from 'sonner';

// Mapping enum ke label bahasa Indonesia
const religionLabels: Record<string, string> = {
  ISLAM: 'Islam',
  CHRISTIAN: 'Kristen',
  CATHOLIC: 'Katolik',
  HINDU: 'Hindu',
  BUDDHIST: 'Buddha',
  CONFUCIAN: 'Konghucu',
  OTHER: 'Kepercayaan',
};

const educationLabels: Record<string, string> = {
  NONE: 'Tidak Sekolah',
  ELEMENTARY: 'SD',
  JUNIOR_HIGH: 'SMP',
  SENIOR_HIGH: 'SMA',
  VOCATIONAL_HIGH: 'SMK',
  DIPLOMA_1: 'D1',
  DIPLOMA_2: 'D2',
  DIPLOMA_3: 'D3',
  BACHELOR: 'S1',
  MASTER: 'S2',
  DOCTORATE: 'S3',
  OTHER: 'Lainnya',
};

const occupationLabels: Record<string, string> = {
  FARMER: 'Petani',
  FISHERMAN: 'Nelayan',
  TRADER: 'Pedagang',
  CIVIL_SERVANT: 'Pegawai Negeri',
  MILITARY: 'TNI',
  POLICE: 'Polisi',
  PRIVATE_EMPLOYEE: 'Karyawan Swasta',
  TEACHER: 'Guru',
  STUDENT: 'Pelajar',
  UNIVERSITY_STUDENT: 'Mahasiswa',
  LABORER: 'Buruh',
  HOUSEWIFE: 'Ibu Rumah Tangga',
  UNEMPLOYED: 'Tidak Bekerja',
  OTHER: 'Lainnya',
};

const maritalStatusLabels: Record<string, string> = {
  SINGLE: 'Belum Menikah',
  MARRIED: 'Menikah',
  DIVORCED: 'Cerai',
  WIDOWED: 'Duda / Janda',
};

const bloodTypeLabels: Record<string, string> = {
  A: 'A',
  B: 'B',
  AB: 'AB',
  O: 'O',
  UNKNOWN: 'Tidak Diketahui',
};

const disabilityTypeLabels: Record<string, string> = {
  NONE: 'Tidak Ada',
  PHYSICAL: 'Disabilitas Fisik',
  VISUAL: 'Tunanetra',
  HEARING: 'Tunarungu / Tunawicara',
  MENTAL: 'Gangguan Mental / Psikososial',
  INTELLECTUAL: 'Disabilitas Intelektual',
  MULTIPLE: 'Disabilitas Ganda',
  OTHER: 'Lainnya',
};

const citizenshipLabels: Record<string, string> = {
  WNI: 'Warga Negara Indonesia',
  WNA: 'Warga Negara Asing',
};

const populationStatusLabels: Record<string, string> = {
  PERMANENT: 'Warga Tetap',
  TEMPORARY: 'Pendatang Sementara',
  MOVED_OUT: 'Sudah Pindah',
  DECEASED: 'Meninggal Dunia',
};

import { useRouter } from 'next/navigation';

const ResidentForm = () => {
  const router = useRouter();

  const form = useForm<ResidentCreateInput>({
    resolver: zodResolver(ResidentCreateSchema),
    defaultValues: {
      nik: '',
      fullName: '',
      gender: 'MALE', // enum Gender
      birthPlace: '',
      birthDate: null, // nullable Date
      religion: 'ISLAM', // enum Religion
      education: 'NONE', // enum Education
      occupation: 'OTHER', // enum Occupation
      maritalStatus: 'SINGLE', // enum MaritalStatus
      bloodType: 'UNKNOWN', // enum BloodType
      disabilityType: 'NONE', // enum DisabilityType
      citizenship: 'WNI', // enum Citizenship
      passportNumber: null,
      ethnicity: null,
      nationality: null,
      address: null,
      dusun: null,
      rw: null,
      rt: null,
      phone: null,
      email: '',
      populationStatus: 'PERMANENT', // enum PopulationStatus
      familyId: undefined, // relasi opsional
      isActive: true, // boolean default true
    },
  });

  const onSubmit = async (data: ResidentCreateInput) => {
    // console.log('PAYLOAD ON SUMBIT => ', data);

    // 1️⃣ Tampilkan toast loading dengan ID unik
    const toastId = toast.loading('Menyimpan data penduduk...');

    try {
      const result = await createResident(data);

      if (result.success) {
        // 2️⃣ Update toast menjadi sukses
        toast.success('Penduduk berhasil dibuat!', { id: toastId });
        form.reset(); // reset form
        router.push('/residents'); // redirect
      } else {
        toast.error(result.message ?? 'Gagal membuat penduduk', {
          id: toastId,
        });
        console.error(result.errors);
      }
    } catch (error) {
      toast.error('Terjadi kesalahan server', { id: toastId });
      console.error(error);
    }
  };

  const isValid = form.formState.isValid;
  const isSubmitting = form.formState.isSubmitting;

  //   console.log(form);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset disabled={form.formState.isSubmitting} className="space-y-4">
          {/* ID Family (NO KK) Field */}
          <FormField
            control={form.control}
            name="familyId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Family ID (Opsional)</FormLabel>
                <FormControl className="bg-background w-full">
                  <Input
                    className="text-sm appearance-none no-spin"
                    placeholder="e.g : 3275232401150001"
                    type="number"
                    {...field}
                    value={field.value ?? ''}
                  />
                </FormControl>
                <FormDescription className="text-xs italic">
                  Pilih keluarga jika sudah ada data keluarga. Biarkan kosong
                  jika belum ada.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* NIK iD Field */}
          <FormField
            control={form.control}
            name="nik"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  NIK : <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl className="bg-background">
                  <Input
                    className="text-sm appearance-none no-spin"
                    placeholder="e.g. 3273056010900009"
                    {...field}
                    type="number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Full Name Field */}

          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Nama Lengkap : <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl className="bg-background">
                  <Input
                    className="text-sm"
                    placeholder="e.g. Soekarno Hatta"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Gender Field */}
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Jenis Kelamin : <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full bg-background">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      {Gender.options.map((option) => (
                        <SelectItem
                          key={option}
                          value={option}
                          className="w-full"
                        >
                          {option === 'MALE' ? 'Laki-laki' : 'Perempuan'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Birth Place Field */}

          <FormField
            control={form.control}
            name="birthPlace"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tempat Lahir :</FormLabel>
                <FormControl className="bg-background">
                  <Input
                    className="text-sm"
                    placeholder="e.g. Ambon"
                    {...field}
                    value={field.value ?? ''} // penting!
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Birth Date */}
          <FormField
            control={form.control}
            name="birthDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tanggal Lahir</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left"
                      >
                        {field.value
                          ? field.value.toLocaleDateString()
                          : 'Pilih tanggal'}
                        <Calendar className="ml-auto h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={field.value ?? undefined}
                        onSelect={(date) => field.onChange(date)}
                        disabled={(date) => date > new Date()} // contoh: tidak bisa pilih tanggal di masa depan
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Religion Field */}
          <FormField
            control={form.control}
            name="religion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Agama :</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ?? undefined}
                  >
                    <SelectTrigger className="w-full bg-background">
                      <SelectValue placeholder="Pilih agama" />
                    </SelectTrigger>
                    <SelectContent>
                      {Religion.options.map((option) => (
                        <SelectItem key={option} value={option}>
                          {religionLabels[option]}
                          {/* label bahasa Indonesia */}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Education Field */}
          <FormField
            control={form.control}
            name="education"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pendidikan :</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ?? undefined} // ✅ hilangkan warning null
                  >
                    <SelectTrigger className="w-full bg-background">
                      <SelectValue placeholder="Pilih pendidikan" />
                    </SelectTrigger>
                    <SelectContent>
                      {Education.options.map((option) => (
                        <SelectItem key={option} value={option}>
                          {educationLabels[option]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Occupation Field */}
          <FormField
            control={form.control}
            name="occupation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pekerjaan :</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ?? undefined} // ✅ hilangkan warning null
                  >
                    <SelectTrigger className="w-full bg-background">
                      <SelectValue placeholder="Pilih pekerjaan" />
                    </SelectTrigger>
                    <SelectContent>
                      {Occupation.options.map((option) => (
                        <SelectItem key={option} value={option}>
                          {occupationLabels[option]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Marital Status Field */}
          <FormField
            control={form.control}
            name="maritalStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status Perkawinan :</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ?? undefined} // ✅ hilangkan warning null
                  >
                    <SelectTrigger className="w-full bg-background">
                      <SelectValue placeholder="Pilih status perkawinan" />
                    </SelectTrigger>
                    <SelectContent>
                      {MaritalStatus.options.map((option) => (
                        <SelectItem key={option} value={option}>
                          {maritalStatusLabels[option]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Blood Type Field */}
          <FormField
            control={form.control}
            name="bloodType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Golongan Darah :</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ?? undefined} // ✅ hilangkan warning null
                  >
                    <SelectTrigger className="w-full bg-background">
                      <SelectValue placeholder="Pilih golongan darah" />
                    </SelectTrigger>
                    <SelectContent>
                      {BloodType.options.map((option) => (
                        <SelectItem key={option} value={option}>
                          {bloodTypeLabels[option]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Disability Type Field */}
          <FormField
            control={form.control}
            name="disabilityType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jenis Disabilitas :</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ?? undefined} // ✅ hilangkan warning null
                  >
                    <SelectTrigger className="w-full bg-background">
                      <SelectValue placeholder="Pilih jenis disabilitas" />
                    </SelectTrigger>
                    <SelectContent>
                      {DisabilityType.options.map((option) => (
                        <SelectItem key={option} value={option}>
                          {disabilityTypeLabels[option]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Citizenship Field */}
          <FormField
            control={form.control}
            name="citizenship"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kewarganegaraan :</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ?? undefined} // ✅ hilangkan warning null
                  >
                    <SelectTrigger className="w-full bg-background">
                      <SelectValue placeholder="Pilih kewarganegaraan" />
                    </SelectTrigger>
                    <SelectContent>
                      {Citizenship.options.map((option) => (
                        <SelectItem key={option} value={option}>
                          {citizenshipLabels[option]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Passport iD Field */}
          <FormField
            control={form.control}
            name="passportNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>No Paspor :</FormLabel>
                <FormControl className="bg-background">
                  <Input
                    className="text-sm"
                    placeholder="e.g. C1234567A"
                    {...field}
                    value={field.value ?? ''} // penting!
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Ethnicity Field */}
          <FormField
            control={form.control}
            name="ethnicity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Suku / Etnis</FormLabel>
                <FormControl className="bg-background">
                  <Input
                    placeholder="e.g : Ambon"
                    {...field}
                    value={field.value ?? ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Nationality */}
          <FormField
            control={form.control}
            name="nationality"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kewarganegaraan / Negara :</FormLabel>
                <FormControl className="bg-background">
                  <Input
                    placeholder="e.g : Indonesia"
                    {...field}
                    value={field.value ?? ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Address */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alamat :</FormLabel>
                <FormControl className="bg-background w-full h-32 resize-none">
                  <Textarea
                    placeholder="e.g : Jln. Merdeka Raya No.45"
                    {...field}
                    value={field.value ?? ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Dusun */}
          <FormField
            control={form.control}
            name="dusun"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dusun : </FormLabel>
                <FormControl className="bg-background">
                  <Input
                    placeholder="e.g : Lestari"
                    {...field}
                    value={field.value ?? ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* RW */}
          <FormField
            control={form.control}
            name="rw"
            render={({ field }) => (
              <FormItem>
                <FormLabel>RW :</FormLabel>
                <FormControl className="bg-background">
                  <Input
                    placeholder="e.g : 001"
                    {...field}
                    value={field.value ?? ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* RT */}
          <FormField
            control={form.control}
            name="rt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>RT :</FormLabel>
                <FormControl className="bg-background">
                  <Input
                    placeholder="e.g : 001"
                    {...field}
                    value={field.value ?? ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nomor Telepon :</FormLabel>
                <FormControl className="bg-background">
                  <Input
                    placeholder="e.g : 123456"
                    {...field}
                    value={field.value ?? ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email :</FormLabel>
                <FormControl className="bg-background">
                  <Input
                    placeholder="Masukkan email"
                    type="email"
                    {...field}
                    value={field.value ?? ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Population Status Field */}
          <FormField
            control={form.control}
            name="populationStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status Kependudukan :</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ?? undefined} // ✅ hilangkan warning null
                  >
                    <SelectTrigger className="w-full bg-background">
                      <SelectValue placeholder="Pilih status kependudukan" />
                    </SelectTrigger>
                    <SelectContent>
                      {PopulationStatus.options.map((option) => (
                        <SelectItem key={option} value={option}>
                          {populationStatusLabels[option]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* isActive Field */}
          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <div className="flex items-center justify-between">
                  <FormLabel className="mb-0">
                    {field.value ? 'Status: Aktif' : 'Status: Tidak Aktif'}
                  </FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-green-500"
                    />
                  </FormControl>
                </div>
                <FormDescription className="text-xs italic">
                  Menentukan apakah penduduk ini masih aktif terdaftar. Jika
                  non-aktif, berarti penduduk sudah pindah, meninggal, atau
                  tidak aktif di sistem.
                </FormDescription>
              </FormItem>
            )}
          />

          <div className="flex gap-4 items-center justify-end">
            <Button
              type="submit"
              className="w-fit"
              disabled={!isValid || isSubmitting}
            >
              <Upload />
              {form.formState.isSubmitting ? 'Memproses...' : 'Tambah Warga'}
            </Button>
          </div>
        </fieldset>
      </form>
    </Form>
  );
};

export default ResidentForm;
