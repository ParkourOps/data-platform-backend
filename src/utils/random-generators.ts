import { customAlphabet } from "nanoid";

export const randomNums = (length: number) => customAlphabet("0123456789")(length);

export const randomAlphaNumeric = (length: number) => customAlphabet("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")(length);

export function generateUniqueId(prefix?: string | undefined | null, suffix?: string | undefined | null) {
    let result = randomNums(4) + randomAlphaNumeric(12);
    if (prefix) result = `${prefix}${result}`;
    if (suffix) result = `${result}${suffix}`;
    return result;
}

