import Image from 'next/image'
type LogoProps = {
  width?: number
  height?: number
  direction?: 'flex-row' | 'flex-col'
  className?: string
  text?: 'lg' | 'md'
}
export const Logo = ({
  text,
  width = 40,
  height = 40,
  direction,
  className,
}: LogoProps) => {
  return (
    <div className={`flex items-center ${direction || 'flex-row'} gap-2`}>
      <Image
        src='/images/camel.png'
        width={width}
        height={height}
        alt='Camelo negro carregando dois containers de laranja nas costas'
        className={className}
      />
      <strong
        className={`font-bold text-zinc-900 ${text === 'lg' ? 'text-7xl' : 'text-3xl'}`}
      >
        Stocker
      </strong>
    </div>
  )
}
