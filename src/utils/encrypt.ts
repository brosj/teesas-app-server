import bcrypt from 'bcryptjs';

export const hashPassword = async (password: string) => {
  const salt = process.env.SALT_ROUNDS as string;
  return bcrypt.hash(password, +salt);
};