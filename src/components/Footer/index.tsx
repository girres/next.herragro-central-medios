import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from 'react-icons/fa';
import { cn } from '@/lib/utils';

export const SocialButton = ({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) => (
  <Link
    href={href}
    target='_blank'
    rel='noopener noreferrer'
    aria-label={label}
    className={cn('text-white hover:text-yellow-1 transition-colors')}
  >
    {icon}
  </Link>
);

const Comp = () => {
  return (
    <footer className='py-4'>
      <div className='container flex items-center justify-between gap-5'>
        <div className='herragro-logo'>
          <Link
            href='https://www.herragro.com'
            rel='noopener noreferrer'
            target='_blank'
          >
            <div className='flex flex-col items-center justify-center'>
              <p className='text-xs text-white'>Sitio principal</p>
              <Image
                src='/images/v2/herragro.png'
                alt='Hub'
                width={80}
                height={80}
                priority={true}
                quality={100}
              />
            </div>
          </Link>
        </div>
        <div className=''>
          <div className='flex flex-col md:flex-row items-center space-x-3'>
            <div>
              <Link
                href='https://www.herragro.com'
                rel='noopener noreferrer'
                target='_blank'
                className='text-white btn btn-link'
              >
                Sobre Nosotros
              </Link>
              <Link
                href='https://www.herragro.com'
                rel='noopener noreferrer'
                target='_blank'
                className='text-white btn btn-link'
              >
                Contacto
              </Link>
            </div>
            <div className='social flex items-center space-x-2 lg:space-x-5'>
              <div className='flex justify-center gap-5'>
                <SocialButton
                  href='https://www.facebook.com/herragro.co'
                  icon={<FaFacebookF className='size-6 sm:size-8' />}
                  label='Facebook'
                />
                <SocialButton
                  href='https://www.instagram.com/Herragro.col'
                  icon={<FaInstagram className='size-6 sm:size-8' />}
                  label='Instagram'
                />
                <SocialButton
                  href='https://www.youtube.com/channel/UCsNAbEagL-nozu_6PJp4QfA/videos'
                  icon={<FaYoutube className='size-6 sm:size-8' />}
                  label='YouTube'
                />
                <SocialButton
                  href='https://www.linkedin.com/company/herragro'
                  icon={<FaLinkedinIn className='size-6 sm:size-8' />}
                  label='Facebook'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Comp;
