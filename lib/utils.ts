/** 
 * @description
 * The International dialing format for Tajikistan with area code +992 and up to 9 digits: 
 * +992 90 000 0000
 * Format: XX YYY ZZZZ
 * 
 * @param input: string 
 * 
 * @returns string
 */
export const formatPhoneNumber = (input: string): string => {
    let cleaned = input.replace(/\D/g, '');

    if (cleaned.length <= 2) {
        return cleaned;  // XX
    } else if (cleaned.length <= 5) {
        return `${cleaned.slice(0, 2)} ${cleaned.slice(2)}`;  // XX YYY
    } else {
        return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5, 9)}`; // XX YYY ZZZZ
    }
}
