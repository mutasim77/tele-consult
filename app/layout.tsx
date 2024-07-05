import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { WebSocketProvider } from "@/providers/SocketProvider";
import { Footer, Header } from "@/components";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: "TeleConsult | Real-time Online Consultation for Telecom Operators",
  description: "Get instant support from telecom experts. TeleConsult offers secure, OTP-authenticated chats with mobile phone operators for quick problem-solving and guidance.",
  keywords: "telecom consultation, online support, mobile operator chat, OTP authentication, real-time communication",
  openGraph: {
    title: "TeleConsult - Connect with Telecom Experts Instantly",
    description: "Need help with your mobile service? Chat with telecom operators in real-time. Secure, fast, and efficient support at your fingertips.",

    images: [
      {
        url: "https://www.mutasim.top/og?title=TeleConsult%20|%20Real-time%20Online%20Consultation%20for%20Telecom%20Operators",
        width: 1200,
        height: 630,
        alt: "TeleConsult App Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: "index, follow",
  authors: {
    name: "Mutasim",
    url: "https://www.mutasim.top/"
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#fbbf24",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${poppins.className} bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text  w-full h-full  min-h-screen flex flex-col justify-center items-center max-w-3xl m-auto px-4 xs:px-10`}>
        <ThemeProvider>
          <WebSocketProvider>
            <Header />
            <main className="h-full w-full justify-center items-center m-auto py-4 xs:py-10">
              <div className="bg-light-white dark:bg-dark-grayDarkest shadow-lg p-6 max-w-[900px] mx-auto border border-white/10 rounded-3xl">
                {children}
              </div>
            </main>
            <Footer />
          </WebSocketProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
