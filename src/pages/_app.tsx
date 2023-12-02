
import type { AppProps } from 'next/app';
import { Noto_Sans_KR } from 'next/font/google';
import classNames from 'classnames';
import { RecoilRoot } from 'recoil';

import '@/styles/globals.scss';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';

const notoSansKr = Noto_Sans_KR({
  // preload: true, 기본값
  subsets: ['latin'], // 또는 preload: false
  weight: ['100', '400', '500', '700', '900'], // 가변 폰트가 아닌 경우, 사용할 fontWeight 배열
  variable: '--notoSans', // CSS 변수 방식으로 스타일을 지정할 경우에 사용합니다.
});

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedProps}>
          <main className={classNames(notoSansKr.className, notoSansKr.variable)}>
            <Component {...pageProps} />
          </main>
        </Hydrate>
      </QueryClientProvider>
    </RecoilRoot>
  );
}
