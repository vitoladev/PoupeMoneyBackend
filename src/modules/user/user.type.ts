import { objectType } from 'nexus';

const UserType = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.string('name');
    t.nonNull.string('email');
  },
});

export default UserType;
