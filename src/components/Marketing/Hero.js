'use client';

import Image from 'next/image';
import Link from 'next/link';
import { sendGAEvent, sendGTMEvent } from '@next/third-parties/google';
import { CiFacebook, CiInstagram, CiLinkedin } from 'react-icons/ci';
import { PiWhatsappLogoLight } from 'react-icons/pi';

// import { clsx } from 'clsx';

export default function HeroBannerTop({
  backgroundImage = null,
  title = null,
  description = null,
  image = null,
  cta = [],
  social = [],
  gtmReady = false,
  name = null,
}) {
  function onClick(data = {}) {
    if (data?.url) {
      // Set Event to Google Analytics
      sendGAEvent('event', 'buttonClicked', { value: data.event });

      // Set Event to Google TAG Manager if available
      if (gtmReady) {
        sendGTMEvent({
          event: 'buttonClicked',
          value: data.event,
          dataLayerName: name,
        });
      }

      // Open in new tab
      window.open(data.url, '_blank');
    }
  }

  if (!backgroundImage || !title || !description || !image) {
    return null;
  }

  return (
    <div className='w-full max-w-[1520px] mx-auto p-5'>
      {/* Background Image */}
      <Image
        src={backgroundImage}
        alt='Background'
        width={1520}
        height={520}
        quality={100}
        className='rounded-lg'
      />
      <div className='container py-5'>
        <div className='flex flex-col lg:flex-row'>
          {/* Left Content */}
          <div className='w-full lg:w-1/2 flex flex-col justify-between'>
            <div className='space-y-6'>
              <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold leading-tight'>
                {title}
              </h1>
              <div
                className='text-xl md:text-2xl'
                dangerouslySetInnerHTML={{ __html: description }}
              ></div>
              <div className='flex flex-wrap gap-4'>
                {cta &&
                  cta.length > 0 &&
                  cta.map((button, index) => (
                    <button
                      onClick={() => onClick(button)}
                      key={index}
                      size='lg'
                      className='btn btn-primary'
                    >
                      {button.label}
                    </button>
                  ))}
              </div>
            </div>
            <div className='pt-10 lg:pt-0 flex flex-wrap justify-center lg:justify-start'>
              {social.map((item, index) => (
                <Link
                  key={index}
                  className='btn btn-sm m-1'
                  href={item.url}
                  target='_blank'
                  rel='noreferrer noopener'
                >
                  {item.type === 'FACEBOOK' && (
                    <CiFacebook className='h-5 w-5' />
                  )}
                  {item.type === 'INSTAGRAM' && (
                    <CiInstagram className='h-5 w-5' />
                  )}
                  {item.type === 'LINKEDIN' && (
                    <CiLinkedin className='h-5 w-5' />
                  )}
                  {item.type === 'WHATSAPP' && (
                    <PiWhatsappLogoLight className='h-5 w-5' />
                  )}
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Image */}
          {image?.url && (
            <div className='px-10 py-10 lg:py-0 mx-auto'>
              <Image
                src={image.url}
                alt='Right Image'
                width={image?.width || 500}
                height={image?.height || 700}
                className='rounded-xl shadow-2xl'
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
