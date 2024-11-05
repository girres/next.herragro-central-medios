import Image from 'next/image';
import Link from 'next/link';

const Comp = () => {
  return (
    <footer className='py-4'>
      <div className='container flex items-center justify-between'>
        <div className='main-logo max-w-[150px] lg:max-w-[200px]'>
          <Link href='/'>
            <Image
              src='/images/v2/logo.png'
              alt='Hub'
              width={100}
              height={100}
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
                alt='Hub'
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
