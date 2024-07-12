import { supabase } from "./supabaseClient";

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

/** 
 * @description
 * Converts a timestamp string (in GMT+0) to a formatted time string in the local timezone (GMT+5).
 * 
 * @param timestamp: string 
 * A timestamp string in the format 'YYYY-MM-DDTHH:MM:SS.ssssss' (e.g., '2024-07-12T12:57:00.967612').
 * 
 * @returns string
 * A formatted time string in the local timezone (GMT+5) in either 12-hour or 24-hour format 
 * based on the 'hour12' option.
 */
export const formatTime = (timestamp: string) => {
    const [datePart, timePart] = timestamp.split('T');
    const [year, month, day] = datePart.split('-');
    const [time] = timePart.split('.');
    const [hours, minutes] = time.split(':');

    const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), Number(hours), Number(minutes)));

    return date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    })
}

export const setOperatorStatus = async (operatorId: string, status: boolean) => {
    const { error } = await supabase
        .from('operators')
        .update({ is_online: status })
        .eq('id', operatorId);
    if (error) {
        console.error('Error setting operator online:', error);
    }
}