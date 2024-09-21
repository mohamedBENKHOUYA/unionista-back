
export class CreateAdminDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    avatarFile: Express.Multer.File | null;
}