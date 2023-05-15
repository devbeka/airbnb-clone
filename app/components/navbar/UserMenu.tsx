'use client'

import { AiOutlineMenu } from 'react-icons/ai'
import { useCallback, useState } from 'react'
import { SafeUser } from '@/app/types'
import { signOut } from 'next-auth/react'
import useRegisterModal from '@/app/hooks/UseRegisterModal'
import useLoginModal from '@/app/hooks/UseLoginModal'
import useRentModal from '@/app/hooks/UseRentModal'
import MenuItem from './MenuItem'
import Avatar from '../Avatar'


interface UserMenuProps {
  currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, SetIsOpen] = useState(false)
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const rentModal = useRentModal()

  const toggleOpen = useCallback(() => {
    SetIsOpen((value) => !value)
  }, [])

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen()
    }
    rentModal.onOpen()
  }, [currentUser, loginModal, rentModal])
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <button
          onClick={onRent}
          className="hidden md:block text-sm rounded-full font-semibold py-3 px-4 transition hover:bg-neutral-100"
        >
          Airbnb your home
        </button>
        <button
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-bg-neutral-200 flex flex-row items-center gap-3 rounded-full hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image}/>
          </div>
        </button>
      </div>

      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem onClick={() => {}} label="My Trips" />
                <MenuItem onClick={() => {}} label="My Favorites" />
                <MenuItem onClick={() => {}} label="My Reservations" />
                <MenuItem onClick={() => {}} label="My Properties" />
                <MenuItem onClick={onRent} label="Airbnb My Home" />
                <hr />
                <MenuItem onClick={() => signOut()} label="Log out" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Log in" />
                <MenuItem onClick={registerModal.onOpen} label="Sign up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu
