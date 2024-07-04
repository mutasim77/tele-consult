import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { WebSocketProvider } from "@/providers/SocketProvider";
import SocketIndicator from "@/components/SocketIndicator";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: "TeleConsult",
  description: "Online consultation service for telecom operators",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${poppins.className} bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text`}>
        <ThemeProvider>
          <WebSocketProvider>
            <div className="flex items-center justify-center min-h-screen">
              <div className="relative">
                <ThemeSwitcher className="absolute top-4 right-4 z-50" />
                <SocketIndicator />
                {children}
              </div>
            </div>
          </WebSocketProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
