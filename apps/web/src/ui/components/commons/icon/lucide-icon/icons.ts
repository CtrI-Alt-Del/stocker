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
  ArrowBigDownDash,
  ArrowBigUpDash,
  Bell,
  Eye,
  Search,
  Menu,
  EllipsisVertical,
  X,
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
  'menu-hamburguer': Menu,
  dashboard: ChartBarStacked,
  ellipses: EllipsisVertical,
  close: X,
  notification: Bell,
  edit: SquarePen,
  record: Box,
  inventory: Warehouse,
  product: ScanBarcode,
  inbound: ArrowBigDownDash,
  outbound: ArrowBigUpDash,
  location: MapPin,
  stock: Container,
  employee: CircleUserRound,
  supplier: Truck,
  category: Tag,
  view: Eye,
  search: Search,
}
