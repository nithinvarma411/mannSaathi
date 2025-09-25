import bcrypt from 'bcryptjs';

export async function hashPassword(plain: string) {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(plain, salt);
  } catch (error: any) {
    throw new Error(`Error in hashPassword: ${error.message}`);
  }
}

export async function verifyPassword(plain: string, hash: string) {
  try {
    return await bcrypt.compare(plain, hash);
  } catch (error: any) {
    throw new Error(`Error in verifyPassword: ${error.message}`);
  }
}
