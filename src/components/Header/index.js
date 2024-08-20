import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
  return (
    <header className='py-4'>
      <div className='container flex items-center justify-between'>
        <div className='main-logo max-w-[150px] lg:max-w-[200px]'>
          <Link href='/'>
            <Image
              src='/images/logo.png'
              alt='Central Virtual'
              width={200}
              height={200}
              priority={true}
              quality={100}
            />
          </Link>
        </div>
        <div className='herragro-logo max-w-[50px] lg:max-w-[80px]'>
          <Link
            href='https://www.herragro.com'
            rel='no-opener no-referer'
            target='_blank'
          >
            <Image
              src='/images/herragro.png'
              alt='Central Virtual'
              width={80}
              height={80}
              priority={true}
              quality={100}
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Logo;
