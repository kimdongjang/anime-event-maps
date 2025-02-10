import Head from 'next/head';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const siteTitle = '코이맵(코믹 행사 맵스)';
  const description = `
  최근 애니메이션/게임 행사 정보를 맵으로 확인해볼 수 있어요.
  email: etherdesign@etherdesign.net
  `;

  return (
    <>
      <Head>
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="comic-event-maps" />
        <meta property="og:title" content={siteTitle} />
        <meta name="description" content={description} />
        <meta name="robots" content="index,anime,game,event,comic,maps" />
        <meta name="googlebot" content="anime,game,event,comic,maps" />{' '}
        <meta name="keywords" content="anime,game,event,comic,maps" />
      </Head>

      <header className="absolute z-[3] top-0 w-full flex justify-center py-2 bg-gray-50 border ">
        <div>
          <h2>코이맵(코믹 행사 맵스)</h2>
        </div>
      </header>
      <div className="w-full h-screen flex flex-col md:flex-row">
        {children}
      </div>
    </>
  );
};
export default RootLayout;
