import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Map } from '@/components/Map'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`h-screen flex flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="w-full h-full">
        <Map />
      </div>
    </main>
  )
}
