import * as bcrypt from 'bcryptjs';

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 12);
};

export const VerifyPassword = async (password, savedPs) => {
  return await bcrypt.compare(password, savedPs);
};
