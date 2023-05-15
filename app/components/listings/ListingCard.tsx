'use client'

import { useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import useCountries  from '@/app/hooks/UseCountries'
import { SafeUser, SafeListing } from '@/app/types'
import { Listing, Reservation } from '@prisma/client'
import { format } from 'date-fns'
import Image from 'next/image'
import HeartButton from '../HeartButton'
import Button from '@/app/UI/Button'

interface ListingCardProps {
  data: SafeListing
  reservation?: Reservation
  onAction?: (id: string) => void
  disabled?: boolean
  actionLabel?: string
  actionId?: string
  currentUser?: SafeUser | null
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = '',
  currentUser,
}) => {
  const router = useRouter()
  const { getByValue } = useCountries()

  const location = getByValue(data.locationValue)

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()

      if (disabled) {
        return
      }
      onAction?.(actionId)
    },
    [onAction, actionId, disabled]
  )

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice
    }
    return data.price
  }, [reservation, data.price])

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null
    }
    const start = new Date(reservation.startData)
    const end = new Date(reservation.endData)

    return `${format(start, 'PP')} - ${format(end, 'PP')}`
  }, [reservation])

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl ">
          <Image
            fill
            alt="listing"
            src={data.imageSrc}
            className="object-cover h-full w-full group-hover:scale-110 transition"
          />
          <div className="absolute top-3 right-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <span className="font-semibold text-lg">
          {location?.region}, {location?.label}
        </span>
        <span className="font-light text-neutral-500">
          {reservationDate || data.category}
        </span>
        <div className="flex flex-row items-center gap-1">
          <span className="font-semibold">$ {price}</span>
          {!reservation && <span className="font-light">nigth</span>}
        </div>
        {onAction && actionLabel && (
          <Button
            small
            disabled={disabled}
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  )
}

export default ListingCard
