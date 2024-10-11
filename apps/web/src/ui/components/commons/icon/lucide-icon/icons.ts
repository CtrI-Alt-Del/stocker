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
  ExternalLink,
  EllipsisVertical,
  Download,
  X,
  Check,
  Package,
  SquareUserRound,
  Archive,
  type LucideProps,
  Settings2,
} from 'lucide-react'

import type { IconName } from '../types'

export const ICONS: Record<
  IconName,
  ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>
> = {
  "settings-2": Settings2,
  'square-user-round': SquareUserRound,
  'arrow-big-up-dash': ArrowBigUpDash,
  'arrow-big-down-dash': ArrowBigDownDash,
  'arrow-down': ChevronDown,
  'arrow-up': ChevronUp,
  'arrow-up-down': ArrowUpDown,
  'menu-hamburguer': Menu,
  archive: Archive,
  package: Package,
  dashboard: ChartBarStacked,
  ellipses: EllipsisVertical,
  download: Download,
  close: X,
  link: ExternalLink,
  batch: Box,
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
  check: Check,
  search: Search,
}
