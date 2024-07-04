import Link from 'next/link';
import Image from 'next/image';
import { Fragment } from 'react';

export default function Home() {
  return (
    <Fragment>
      <h1 className="text-4xl font-bold text-center mb-6 text-light-text dark:text-dark-text">
        TeleConsult
      </h1>

      <Image src="/assets/header.gif" alt="TeleConsult Logo" width={200} height={200} className="mx-auto mb-6" />

      <p className="text-center mb-6 text-light-text dark:text-dark-text">
        Welcome to TeleConsult, your online consultation service for telecom operators.
      </p>
      <p className="text-center mb-8 text-light-secondary dark:text-dark-secondary">
        Get instant support and connect with our expert operators to resolve your telecom issues quickly and efficiently.
      </p>
      <div className="text-center">
        <Link href="/login" className="bg-button-primary hover:bg-button-hover text-button-text px-6 py-3 rounded-full font-semibold transition duration-300">
          Get Started
        </Link>
      </div>
    </Fragment>
  )
}