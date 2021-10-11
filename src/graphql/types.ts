import UserType from '@modules/user/user.type';
import { LoginInput } from '@modules/user/mutations/login.mutation';
import { CreateUserInput } from '@modules/user/mutations/create-user.mutation';

const Types = [UserType, LoginInput, CreateUserInput];

export default Types;
