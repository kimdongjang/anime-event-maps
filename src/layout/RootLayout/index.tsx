import Head from 'next/head';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const siteTitle = '애니메이션 행사 맵스';
  const description = `
  애니메이션/게임 행사 정보를 맵으로 보여주는 웹서비스입니다!
  email: gieunp3644@gmail.com.
  `;

  return (
    <>
      <Head>
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="anime-event-maps" />
        <meta property="og:title" content={siteTitle} />
      </Head>
      <div className="w-full h-screen flex flex-col md:flex-row">
        {children}
      </div>
    </>
  );
};
export default RootLayout;
