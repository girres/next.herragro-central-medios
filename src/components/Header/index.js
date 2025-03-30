import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
  return (
    <header className='bg-yellow-1'>
      <div className='container flex items-center justify-between'>
        <div className='main-logo max-w-[70px] lg:max-w-[120px]'>
          <Link href='/'>
            <Image
              src='/images/logos/logo1.png'
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
