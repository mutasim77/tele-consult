import { useEffect, useState, useRef } from "react";

export default function ExpirationTimer() {
    const expirationTime = 60;
    const [timeLeft, setTimeLeft] = useState(expirationTime);
    const timeoutId = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (timeLeft > 0) {
            timeoutId.current = setTimeout(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        }

        return () => {
            if (timeoutId.current) {
                clearTimeout(timeoutId.current);
            }
        }
    }, [timeLeft]);

    return (
        <div className="flex justify-center mt-3">
            <p className="text-light-primary text-sm">
                {timeLeft > 0 ? `OTP expires in ${timeLeft} seconds` : "OTP expired!"}
            </p>
        </div>
    );
}