import Head from 'next/head';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const siteTitle = '애니메이션 행사 맵스';
  const description = `
  this web serivce is developing, provides SNS, Comission, Funding
  service. If you are interested, please send to gieunp3644@gmail.com.
  `;

  return (
    <>
      <Head>
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Croissants" />
        <meta property="og:title" content={siteTitle} />
      </Head>
      <div className="w-full h-full flex">{children}</div>
    </>
  );
};
export default RootLayout;
