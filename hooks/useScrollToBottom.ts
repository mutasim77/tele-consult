import { useEffect, useRef } from 'react';

export function useScrollToBottom(dependency: any) {
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [dependency]);

    return bottomRef;
}