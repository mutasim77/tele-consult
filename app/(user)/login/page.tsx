'use client'

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { formatPhoneNumber } from '@/lib/utils';
import { supabase } from '@/lib/supabaseClient';
import { ExpirationTimer } from '@/components';

export default function LoginPage() {
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [otpCode, setOtpCode] = useState<string>('');
    const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const router = useRouter();

    const handleSendCode = async () => {
        if (!phoneNumber || phoneNumber.length < 9) {
            setError('Please enter your phone number');
            return;
        }
        const phone = `+992${phoneNumber.split(' ').join('')}`;  // Need it back to "E.164 format"; ex: +XXXXXXXXXXXX
        const { error } = await supabase.auth.signInWithOtp({ phone });

        if (error) {
            setError('Opps, something went wrong. Try again!');
            return;
        }
        setIsOtpSent(true);
        setError('');
    }

    const handleSubmit = async () => {
        if (!otpCode || otpCode.length < 6) {
            setError('Please enter the OTP code');
            return;
        }

        const phone = `+992${phoneNumber.split(' ').join('')}`
        const { error } = await supabase.auth.verifyOtp({
            phone,
            token: otpCode,
            type: 'sms',
        });

        if (error) {
            setError('Token has expired or is invalid');
            return
        }

        router.push('/help');
    }

    const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let inputOTP = e.target.value;
        if (inputOTP.length > 6) {
            return
        }

        setOtpCode(inputOTP);
    }

    const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedInput = formatPhoneNumber(e.target.value);
        setPhoneNumber(formattedInput);
    }

    return (
        <div className="flex flex-col items-center p-8 bg-white/10 dark:bg-black/30 backdrop-blur-md rounded-xl shadow-lg w-full max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-light-text dark:text-dark-text">Welcome to TeleConsult</h1>
            <div className="mb-4">
                <Image src="/assets/header.gif" alt="TeleConsult Logo" width={300} height={200} />
            </div>
            <p className="text-center mb-6 text-light-secondary dark:text-dark-secondary">
                Get instant online consultation with our expert operators
            </p>

            <div className="w-full max-w-xs">
                {!isOtpSent ? (
                    <>
                        <div className="flex mb-4">
                            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                🇹🇯 +992
                            </span>
                            <input
                                type="tel"
                                className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Enter your number"
                                value={phoneNumber}
                                onChange={handlePhoneNumberChange}
                            />
                        </div>
                        <button
                            className="w-full bg-button-primary hover:bg-button-hover text-button-text font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
                            onClick={handleSendCode}
                            disabled={!phoneNumber}
                        >
                            Send Code
                        </button>
                    </>
                ) : (
                    <>
                        <input
                            type="text"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white"
                            placeholder="Enter OTP"
                            value={otpCode}
                            onChange={handleOTPChange}
                        />
                        <button
                            className="w-full bg-button-primary hover:bg-button-hover text-button-text font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
                            onClick={handleSubmit}
                            disabled={!otpCode}
                        >
                            Submit
                        </button>
                        {isOtpSent && <ExpirationTimer />}
                        <div className='mt-4 text-center'>
                            <button
                                className="text-red-500 text-sm hover:underline  focus:outline-none"
                                onClick={() => setIsOtpSent(false)}
                            >
                                🔙 Go back
                            </button>
                        </div>
                    </>
                )}

                {error && <p className="text-red-500 text-xs italic mt-5 text-center">{error}</p>}
            </div>
        </div>
    )
}