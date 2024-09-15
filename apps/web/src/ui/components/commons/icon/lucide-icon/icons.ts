import type { ForwardRefExoticComponent, RefAttributes } from 'react'
import {
  ChartBarStacked,
  ChevronUp,
  ChevronDown,
  ArrowUpDown,
  Box,
  SquarePen,
  Warehouse,
  CircleUserRound,
  Truck,
  Tag,
  MapPin,
  Container,
  ScanBarcode,
  type LucideProps,
} from 'lucide-react'

import type { IconName } from '../types'

export const ICONS: Record<
  IconName,
  ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>
> = {
  'arrow-down': ChevronDown,
  'arrow-up': ChevronUp,
  'arrow-up-down': ArrowUpDown,
  dashboard: ChartBarStacked,
  edit: SquarePen,
  record: Box,
  inventory: Warehouse,
  product: ScanBarcode,
  location: MapPin,
  stock: Container,
  employee: CircleUserRound,
  supplier: Truck,
  category: Tag,
}
