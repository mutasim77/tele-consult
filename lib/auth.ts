import { supabase } from "./supabaseClient";

export async function loginOperator(username: string, password: string) {
    try {
        const { data: operator, error } = await supabase
            .from('operators')
            .select('id, username')
            .eq('username', username)
            .eq('password', password)
            .single();

        if (error || !operator) {
            console.error('Login failed:', error);
            return null;
        }

        const { id, username: name } = operator;
        localStorage.setItem('operatorId', id);
        localStorage.setItem('operatorName', name);

        return { id, name }
    } catch (error) {
        console.error('Login error:', error);
        return null;
    }
}