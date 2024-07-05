import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-light-text dark:text-dark-text">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent text-transparent bg-clip-text">
          TeleConsult
        </h1>
        <p className="text-xl text-light-secondary dark:text-dark-secondary">
          Your Online Telecom Consultation Service
        </p>
      </div>

      <div className="relative w-64 h-64 mb-8">
        <Image
          src="/assets/header.gif"
          alt="TeleConsult Logo"
          layout="fill"
          objectFit="cover"
          className="rounded-full shadow-lg border border-white/10"
        />
      </div>

      <div className="max-w-2xl text-center mb-10">
        <p className="text-lg mb-4">
          Welcome to TeleConsult, where expert support meets cutting-edge telecom solutions.
        </p>
        <p className="text-light-secondary dark:text-dark-secondary">
          Get instant support and connect with our expert operators to resolve your telecom issues quickly and efficiently.
        </p>
      </div>

      <Link href="/login" className="bg-button-primary hover:bg-button-hover text-button-text px-8 py-3 rounded-full font-semibold transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
        Get Started
      </Link>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
        {['24/7 Support', 'Expert Operators', 'Quick Resolution'].map((feature, index) => (
          <div key={index} className="bg-light-lighterBackground dark:bg-dark-grayDarkest p-4 rounded-lg shadow-lg text-center border border-white/10">
            <p className="font-semibold">{feature}</p>
          </div>
        ))}
      </div>
    </div>
  )
}