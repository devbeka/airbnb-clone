import { Nunito } from 'next/font/google'
import getCurrentUser from './actions/getCurrentUser'
import Navbar from './components/navbar/Navbar'
import ClientOnly from './components/ClientOnly'
import RegisterModal from './components/modals/RegisterModal'
import TosterProvider from './providers/TosterProvider'
import LoginModal from './components/modals/LoginModal'
import RentModal from './components/modals/RentModal'
import './globals.css'


export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
}

const font = Nunito({
  subsets: ['latin'],
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <Navbar currentUser={currentUser} />
          <TosterProvider />
          <LoginModal />
          <RegisterModal />
          <RentModal />
        </ClientOnly>
        <div className="pt-28 pb-20">
          {children}
        </div>
      </body>
    </html>
  )
}
