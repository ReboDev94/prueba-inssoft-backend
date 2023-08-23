import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    await this.checkExist(email);

    try {
      const user = this.userRepository.create({
        ...createUserDto,
        password: bcrypt.hashSync(password, 10),
      });

      await this.userRepository.save(user);
      return {
        success: true,
      };
    } catch (error) {
      throw new InternalServerErrorException('Error desconocido');
    }
  }

  async checkExist(email: string) {
    const dbUser = await this.userRepository.findOneBy({ email });
    if (dbUser) throw new ForbiddenException('El usuario ya existe!');
    return dbUser;
  }
}
