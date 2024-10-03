import { Icon } from '@/ui/components/commons/icon'
import { IconName } from '@/ui/components/commons/icon/types'
import { ExternalLink, Package } from 'lucide-react'
import Link from 'next/link'

type SummaryCardProps = {
  text: string
  value: string | number
  icon: IconName
  url: string
}

export const SummaryCard = ({ text, value, icon, url }: SummaryCardProps) => {
  return (
    <>
      <div className='flex-grow flex-shrink w-full'>
        <div className=' max-w-full h-28 shadow-md flex justify-between rounded-lg  p-4'>
          <div className='flex items-center gap-6 justify-start h-full'>
            <Icon
              name={icon}
              className='size-14 bg-default-200 text-foreground-500 rounded-lg p-2'
            />
            <div className='flex flex-col flex-1 '>
              <h1 className='text-default-400 flex text-md font-medium'>{text}</h1>
              <h1 className='text-default-700 text-4xl font-medium'>{value}</h1>
            </div>
          </div>
          <div className=''>
            <Link href={url}>
              <ExternalLink className='text-default-400 size-5 ml-2' />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
