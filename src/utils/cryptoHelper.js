import * as dotenv from "dotenv";
dotenv.config();
import CryptoJS from "crypto-js";

const _PASSWORD = process.env._PASSWORD;

export const encrypt = (txt) => {
  const res = CryptoJS.AES.encrypt(txt, _PASSWORD).toString();
  console.log(res);
  return res;
};
export const decrypt = (encryptedTxt) => {
  return CryptoJS.AES.decrypt(encryptedTxt, _PASSWORD).toString(
    CryptoJS.enc.Utf8
  );
};

export const tokenGenerate32 = () => {
  const token = CryptoJS.lib.WordArray.random(32);
  return [token, encrypt(token)];
};
