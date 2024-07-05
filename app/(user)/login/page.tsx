'use client'

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchOperator, formatPhoneNumber } from '@/lib/utils';
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

        const { user } = await fetchOperator(phone);
        if (user?.name) {
            router.push(`/operator?name=${user.name}`);
            return;
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
        <div className="flex flex-col items-center">
            <div className="relative mb-12">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-40 h-40 bg-light-primary dark:bg-dark-primary rounded-full opacity-10"></div>
                </div>
                <div className="relative flex flex-col items-center">
                    <div className="w-28 h-28 bg-light-accent dark:bg-dark-accent rounded-full flex items-center justify-center mb-4 shadow-lg">
                        <Image src="/assets/operator-avatar.png" alt="Operator" width={90} height={90} className='rounded-full' />
                    </div>
                    <div className="text-center">
                        <h1 className="text-3xl font-bold mb-2">Tele<span className='text-button-primary'>Consult</span> </h1>
                        <p className="text-light-secondary dark:text-dark-secondary mb-4">
                            Secure Instant Consultations
                        </p>
                    </div>
                    <div className="flex space-x-4 mb-4">
                        <div className="flex items-center bg-light-lighterBackground dark:bg-dark-grayDarkest p-2 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-light-primary dark:text-dark-primary mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm">Chat</span>
                        </div>
                    </div>
                </div>
                <div className="absolute top-0 left-0 -mt-4 -ml-4">
                    <div className="w-8 h-8 bg-button-primary rounded-full animate-ping"></div>
                </div>
                <div className="absolute bottom-0 right-0 -mb-4 -mr-4">
                    <div className="w-8 h-8 bg-light-primary dark:bg-dark-primary rounded-full animate-pulse"></div>
                </div>
                <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2">
                    <div className="bg-light-lighterBackground dark:bg-dark-grayDarkest p-2 rounded-lg shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-light-primary dark:text-dark-primary" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
                <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2">
                    <div className="bg-light-lighterBackground dark:bg-dark-grayDarkest p-2 rounded-lg shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-light-primary dark:text-dark-primary" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className="w-full max-w-xs">
                {!isOtpSent ? (
                    <div className="space-y-4">
                        <div className="flex rounded-md shadow-sm">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600">
                                🇹🇯 +992
                            </span>
                            <input
                                type="tel"
                                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-light-primary focus:border-light-primary dark:focus:ring-dark-primary dark:focus:border-dark-primary sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                                placeholder="Enter your number"
                                value={phoneNumber}
                                onChange={handlePhoneNumberChange}
                            />
                        </div>
                        <button
                            className="w-full bg-button-primary hover:bg-button-hover text-button-text font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                            onClick={handleSendCode}
                            disabled={!phoneNumber}
                        >
                            Send Code
                        </button>
                    </div>
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

                {error && <p className="mt-4 text-red-500 text-sm text-center">{error}</p>}
            </div>
        </div>
    )
}