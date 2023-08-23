import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { MatchesProperty } from '../decorators/MatchesProperty';

export class CreateUserDto {
  @IsString()
  @MinLength(10)
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(12)
  password: string;

  @IsNotEmpty()
  @MatchesProperty('password', { message: 'Las contraseñas no coinciden' })
  confirmPassword: string;
}
