// components/Layout/Header.tsx
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { Auth } from "aws-amplify";

const Header = () => {
  const [user, setUser] = useState<any | null>();

  const router = useRouter();

  const handleLogOut = async () => {
    await Auth.signOut();

    await router.push("/");
  };

  useEffect(() => {
    const getProfile = async () => {
      const userInfo = Auth.currentUserInfo();

      if (userInfo) {
        setUser(userInfo);
      } else {
        return;
      }
    };

    getProfile();
  }, []);

  const [navbarOpen, setNavbarOpen] = React.useState(false);
  let easing = [0.6, 0.05, 0.01, 0.99];

  const fadeInUp = {
    hidden: { opacity: 0 },
    initial: {
      y: 60,
      opacity: 1,
      transition: { duration: 0.6, ease: easing },
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.5,
        duration: 1,
        ease: easing,
      },
    },
  };

  return (
    <>
      <motion.div
        initial='hidden'
        animate='animate'
        exit={{ opacity: 0 }}
        variants={fadeInUp}
        className='roboto-regular mx-auto flex max-w-[100rem] flex-col px-4 pt-4 text-[#000000] md:flex-row md:items-center md:justify-between md:px-6 lg:px-8'
      >
        <div className='flex flex-row items-center justify-between p-4'>
          <a
            href='/'
            className='focus:shadow-outline rounded-lg text-lg font-semibold tracking-widest focus:outline-none'
          >
            <h2 className='text-4xl tracking-tighter'>Foodie</h2>
          </a>
          <button
            className='cursor-pointer px-3 leading-none outline-none focus:outline-none md:hidden'
            type='button'
            aria-label='button'
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='#fff'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <line x1='3' y1='12' x2='21' y2='12'></line>
              <line x1='3' y1='6' x2='21' y2='6'></line>
              <line x1='3' y1='18' x2='21' y2='18'></line>
            </svg>
          </button>
        </div>
        <div
          className={
            "mt-3 flex-grow items-start md:flex lg:mt-0" +
            (navbarOpen ? " flex" : " hidden")
          }
        >
          <div className='flex-col pl-4 text-xl md:flex-grow md:pl-0'>
            {user ? (
              <ul className='flex flex-grow flex-wrap items-center justify-end gap-6 space-x-6 pr-4'>
                <li>
                  <Link href='/entrees'>
                    <a className='text-lg'>Entrees</a>
                  </Link>
                </li>
                <li>
                  <Link href='/chefs'>
                    <a className='text-lg'>Community Chefs</a>
                  </Link>
                </li>
                <li>
                  <Link href='/carts'>
                    <a className='text-lg'>Carts</a>
                  </Link>
                </li>

                <li>
                  <button
                    onClick={handleLogOut}
                    className='rounded-md border-2 bg-white px-4 py-3 text-lg text-black hover:bg-gray-100 hover:text-black'
                  >
                    Logout
                  </button>
                </li>
              </ul>
            ) : (
              <ul className='flex flex-grow flex-wrap items-center justify-end gap-6 space-x-6 pr-4'>
                <li>
                  <Link href='/api/auth/login'>
                    <a className='rounded-md border-2 bg-white px-4 py-3 text-lg text-black'>
                      Login
                    </a>
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Header;
