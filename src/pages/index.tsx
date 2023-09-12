import Image from 'next/image'
import { Inter } from 'next/font/google'
import Upload from '@/components/upload';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className='mt-10 items-center justify-center '>
      <p className='text-3xl text-blue-300 text-center'>AWS S3 Uploader</p>
      <div className='items-center justify-center'>
        <Upload />
      </div>
    </div>
  );
}
