import { Inter } from 'next/font/google';
import { Map } from '@/components/Map';
import RootLayout from '@/layout/RootLayout';
import Sidebar from '@/components/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export default function Main() {
  return (
    <RootLayout>
      <main
        className={`w-[100%] h-screen flex flex-col items-center justify-between ${inter.className}`}
      >
        <div className="w-full h-full">
          위드 테스트위드 테스트위드 테스트위드 테스트위드 테스트위드 테스트위드
          테스트위드 테스트위드 테스트위드 테스트 위드 테스트위드 테스트위드
          테스트위드 테스트위드 테스트위드 테스트위드 테스트위드 테스트위드
          테스트위드 테스트 위드 테스트위드 테스트위드 테스트위드 테스트위드
          테스트위드 테스트위드 테스트위드 테스트위드 테스트위드 테스트
          <Map />
        </div>
      </main>
      <Sidebar />
    </RootLayout>
  );
}
