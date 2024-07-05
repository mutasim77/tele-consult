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

/**
 * @description
 * Fetches operator details using the provided phone number by making a GET request to the /api/operator endpoint.
 * 
 * @param phoneNumber: string - The phone number of the operator to fetch details for.
 * 
 * @returns Promise<object> - A promise that resolves to the response data containing the operator details.
 *                            
 */
export async function fetchOperator(phoneNumber: string): Promise<{
    message: string,
    user?: {
        phoneNumber: string,
        name: string,
    }
}> {
    try {
        const response = await fetch(`/api/operator?phoneNumber=${phoneNumber}`);
        const data = await response.json();

        if (response.ok) {
            return data;
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        return { message: `Error fetching user:' ${error}` };
    }
}
