import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;
}

export default UserEntity;
