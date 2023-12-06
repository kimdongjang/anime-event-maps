import Head from 'next/head';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const siteTitle = '애니메이션 행사 맵스';
  const description = `
  최근 애니메이션/게임 행사 정보를 맵으로 확인해볼 수 있어요.
  email: gieunp3644@gmail.com
  `;

  return (
    <>
      <Head>
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="anime-event-maps" />
        <meta property="og:title" content={siteTitle} />
        <meta name="description" content={description} />
        <meta name="robots" content="index,anime,game,event,maps" />
        <meta name="googlebot" content="anime,game,event,maps" />{' '}
        <meta name="keywords" content="anime,game,event,maps" />
      </Head>

      <header className="fixed top-0 w-full flex justify-center py-2 bg-gray-50">
        <div>
          <h2>ANIME-EVENT-MAPS</h2>
        </div>
      </header>
      <div className="w-full h-screen flex flex-col md:flex-row">
        {children}
      </div>
    </>
  );
};
export default RootLayout;
