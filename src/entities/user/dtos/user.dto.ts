import { AdminModel } from '../admin/admin.model';
import { ClientModel } from '../client/client.model';

export type User = AdminModel | ClientModel;
