import CryptoJS from 'crypto-js';

export interface UserPlainData {
  email?: string | null;
  phone?: string | null;
  username?: string | null;
}

export interface UserEncryptedData {
  encryptedEmail?: string | null;
  encryptedPhone?: string | null;
  encryptedUsername?: string | null;
}

const AES_SECRET_KEY = import.meta.env.VITE_AES_SECRET_KEY;

/** 암호화 */
export const encryptUserData = ({ username, phone, email }: UserPlainData) => {
  return {
    // 유저 정보 암호화
    encryptedEmail: email ? CryptoJS.AES.encrypt(email, AES_SECRET_KEY).toString() : null,
    encryptedPhone: phone ? CryptoJS.AES.encrypt(phone, AES_SECRET_KEY).toString() : null,
    encryptedUsername: username ? CryptoJS.AES.encrypt(username, AES_SECRET_KEY).toString() : null,
  };
};

/** 복호화 */
export const decryptUserData = ({
  encryptedUsername,
  encryptedEmail,
  encryptedPhone,
}: UserEncryptedData) => {
  return {
    email: encryptedEmail
      ? CryptoJS.AES.decrypt(encryptedEmail, AES_SECRET_KEY).toString(CryptoJS.enc.Utf8)
      : null,
    phone: encryptedPhone
      ? CryptoJS.AES.decrypt(encryptedPhone, AES_SECRET_KEY).toString(CryptoJS.enc.Utf8)
      : null,
    username: encryptedUsername
      ? CryptoJS.AES.decrypt(encryptedUsername, AES_SECRET_KEY).toString(CryptoJS.enc.Utf8)
      : null,
  };
};
