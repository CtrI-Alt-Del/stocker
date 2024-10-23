import Image from 'next/image'
type LogoProps = {
  width?: number
  height?: number
  direction?: 'flex-row' | 'flex-col'
  className?:string
  text?: 'lg' | 'md'
}
export const Logo = ({ text, width, height, direction,className }: LogoProps) => {
  return (
    <div className={`flex items-center ${direction || 'flex-row'} gap-2`}>
      <Image
        src='/images/camel.png'
        width={width || 40}
        height={height || 40}
        alt='Camel'
        className={`${width ? className : 'size-10'}`}
      />
      <h1
        className={`font-bold text-zinc-900 ${text === 'lg' ? 'text-7xl' : 'text-3xl'}`}
      >
        Stocker
      </h1>
    </div>
  )
}
