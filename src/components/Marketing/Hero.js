'use client';

import Image from 'next/image';
import Link from 'next/link';
import { sendGAEvent, sendGTMEvent } from '@next/third-parties/google';
import { CiFacebook, CiInstagram, CiLinkedin } from 'react-icons/ci';
import { PiWhatsappLogoLight } from 'react-icons/pi';
import { clsx } from 'clsx';

export default function HeroBannerTop({
  backgroundImage = null,
  title = null,
  description = null,
  // image = null,
  cta = [],
  social = [],
  gtmReady = false,
  name = null,
  bannerA = {},
  ui = {
    bg: '#fae700',
    title: '#000',
    description: '#000',
    ctaBg: '#000',
    ctaText: '#fff',
    socialBg: '#000',
    socialText: '#fff',
    bgImage: {},
  },
}) {
  const imgBg = ui.bgImage?.data?.attributes?.url || null;
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

  const CTAButton = ({ button }) => {
    const { image = {} } = button || {};
    const urlImag = image?.data?.attributes?.url || null;

    return (
      <button
        onClick={() => onClick(button)}
        size='lg'
        className={clsx(urlImag ? 'btn-icon' : 'btn')}
        style={
          !urlImag
            ? {
                backgroundColor: ui.ctaBg,
                borderColor: ui.ctaBg,
                color: ui.ctaText,
              }
            : {}
        }
      >
        <div>
          {urlImag ? (
            <Image
              src={urlImag}
              alt={button.label}
              width={200}
              height={200}
              quality={100}
              className='max-w-[100px] lg:max-w-[200px] mx-auto'
            />
          ) : (
            <span>{button.label}</span>
          )}
        </div>
      </button>
    );
  };

  if (!backgroundImage || !title) {
    return null;
  }

  return (
    <div
      className='w-full max-w-[1520px] mx-auto lg:min-h-screen'
      style={
        imgBg
          ? {
              background: `${ui?.bg || '#000'} url("${imgBg}")`,
            }
          : {
              background: ui?.bg || '#000',
            }
      }
    >
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
        <div className='w-full'>
          <div className=''>
            {/* <h1 className='hiddenXX' style={{ color: ui.title }}>
              {title}
            </h1> */}
            {description && description.length > 0 && (
              <div
                className='text-xl md:text-2xl'
                style={{ color: ui.description }}
                dangerouslySetInnerHTML={{ __html: description }}
              />
            )}
            <div className='flex flex-wrap gap-4 justify-center my-20'>
              {cta &&
                cta.length > 0 &&
                cta.map((button, index) => (
                  <CTAButton key={index} button={button} />
                ))}
            </div>
          </div>
          <div className='hidden pt-10 lg:pt-0 flex flex-wrap justify-center lg:justify-start'>
            {social.map((item, index) => (
              <Link
                key={index}
                className='btn btn-sm m-1'
                href={item.url}
                target='_blank'
                rel='noreferrer noopener'
                style={{
                  backgroundColor: ui.socialBg,
                  borderColor: ui.socialBg,
                  color: ui.socialText,
                }}
              >
                {item.type === 'FACEBOOK' && <CiFacebook className='h-5 w-5' />}
                {item.type === 'INSTAGRAM' && (
                  <CiInstagram className='h-5 w-5' />
                )}
                {item.type === 'LINKEDIN' && <CiLinkedin className='h-5 w-5' />}
                {item.type === 'WHATSAPP' && (
                  <PiWhatsappLogoLight className='h-5 w-5' />
                )}
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        {/* bannerA */}
        {bannerA?.url && (
          <div className='lg:px-10 py-10 lg:py-0 mx-auto'>
            <Image
              src={bannerA.url}
              alt='Right Image'
              width={bannerA.width}
              height={bannerA.height}
              className='rounded-lg shadow-2xl'
            />
          </div>
        )}
      </div>
    </div>
  );
}
