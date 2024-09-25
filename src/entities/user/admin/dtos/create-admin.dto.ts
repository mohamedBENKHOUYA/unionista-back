export class CreateAdminDto {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  avatarFile: Express.Multer.File | null;
}
