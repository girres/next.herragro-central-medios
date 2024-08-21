import Image from 'next/image';
import Link from 'next/link';

const Comp = () => {
  return (
    <footer className='py-4'>
      <div className='container flex items-center justify-between'>
        <div className='main-logo max-w-[150px] lg:max-w-[200px]'>
          <Link href='/'>
            <Image
              src='/images/logo-short.png'
              alt='Central Virtual'
              width={50}
              height={50}
              priority={true}
              quality={100}
            />
          </Link>
        </div>
        <div className='herragro-logo'>
          <div className='flex items-center space-x-3'>
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
            <Link
              href='https://www.herragro.com'
              rel='noopener noreferrer'
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
      </div>
    </footer>
  );
};

export default Comp;
