
export class CreateClientDto {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  avatarFile: Express.Multer.File | null;
}
