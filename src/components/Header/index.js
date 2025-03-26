import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
  return (
    <header className='py-4 bg-yellow-1'>
      <div className='container flex items-center justify-between'>
        <div className='main-logo max-w-[100px] lg:max-w-[150px]'>
          <Link href='/'>
            <Image
              src='/images/logo_negro.png'
              alt='Hub'
              width={900}
              height={400}
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
