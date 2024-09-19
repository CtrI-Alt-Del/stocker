// import { useCallback, useState } from 'react'
// import { useProductsTableHook } from './use-products-table-hook'
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableColumn,
//   TableHeader,
//   TableRow,
// } from '@nextui-org/react'

//   const COLUMNS = [
//     { name: 'NOME', uid: 'name' },
//     { name: 'DESCRIÇÃO', uid: 'description' },
//     { name: 'CODIGO', uid: 'code' },
//     { name: 'PREÇO', uid: 'price' },
//     { name: 'ESTOQUE MINIMO', uid: 'minimumStock' },
//     { name: 'ATIVO', uid: 'status' },
//   ]

// export const ProductsTable = () => {
//   const renderCell = useCallback((product, columnKey) => {
//     const cellValue = product[columnKey]

//     switch (columnKey) {
//       case 'name':
//         return (
//           <div className='flex items-center gap-2'>
//             <img
//               src={product.image}
//               alt={product.name}
//               className='w-8 h-8 rounded-full'
//             />
//             <p className='font-bold'>{cellValue}</p>
//           </div>
//         )
//       case 'description':
//         return <p className='text-sm text-gray-500'>{cellValue}</p>
//       case 'code':
//         return <p>{cellValue}</p>
//       case 'price':
//         return <p>${cellValue}</p>
//       case 'availableStock':
//         return <p>{cellValue}</p>
//       case 'minimumStock':
//         return <p>{cellValue}</p>
//       case 'status':
//         return <p>{cellValue}</p>
//     }
//   }, [])
//   const [page, setPage] = useState<number>(1)
//   const { products, loading } = useProductsTableHook(page)
//   if (loading) {
//     return <h1>Carregando tabela....</h1>
//   }
//   return (
//     <>
//       <Table>
//         <TableHeader columns={COLUMNS}>
//           {(column) => (
//             <TableColumn
//               key={column.uid}
//               align={column.uid === 'actions' ? 'center' : 'start'}
//             >
//               {column.name}
//             </TableColumn>
//           )}
//         </TableHeader>
//         <TableBody items={products}>
//         {(item) => (
//         <TableRow>
//               <TableCell key={'NAME'}>{item.name}</TableCell>
//               </TableRow>
//         )}
//         </TableBody>
//       </Table>
//     </>
//   )
// }
