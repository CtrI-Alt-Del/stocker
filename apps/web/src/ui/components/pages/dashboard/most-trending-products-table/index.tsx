'use client'

import { Input, Pagination, Table } from '@nextui-org/react'

export const MostTrendingProductsTable = () => {
  return (
    <div>
      <div>
        <h2>Produtos com maior demanda</h2>
        <Input type='date' />
      </div>
      <Table
        arial-label='Tabela de produtos'
        shadow='none'
        selectionMode='multiple'
        bottomContentPlacement='outside'
        bottomContent={
          2 > 1 ? (
            <div className='flex w-full justify-start '>
              <Pagination
                aria-label='paginação'
                showControls
                page={page}
                total={totalPages}
                onChange={onPageChange}
              />
            </div>
          ) : null
        }
      >
        <TableHeader>
          <TableColumn key='name'>NOME</TableColumn>
          <TableColumn key='code'>CODIGO</TableColumn>
          <TableColumn key='price'>PREÇO</TableColumn>
          <TableColumn key='minimumStock'>ESTOQUE MINIMO</TableColumn>
          <TableColumn key='supplier'>FORNECEDOR</TableColumn>
          <TableColumn key='status'>STATUS</TableColumn>
          <TableColumn key='option'>{null}</TableColumn>
        </TableHeader>
        <TableBody
          items={products}
          isLoading={isLoading}
          loadingContent={<Spinner color='primary' />}
          aria-label='conteúdo da tabela'
          emptyContent={'Nenhum produto criado.'}
        >
          {(product) => (
            <TableRow key={product.id}>
              <TableCell key='name'>
                <div className='flex items-center gap-2'>
                  <Avatar
                    src={product.image !== '' ? product.image : IMAGE_PLACEHOLDER}
                    alt={product.name}
                    size='md'
                  />
                  <p className='font-bold'>{product.name}</p>
                </div>
              </TableCell>
              <TableCell key='code'>{product.code}</TableCell>
              <TableCell key='price'>{product.costPrice.brl}</TableCell>
              <TableCell key='minimumStock'>{product.minimumStock}</TableCell>
              <TableCell key='supplier'>Gabriel Fernandez SRC</TableCell>
              <TableCell key='status'>
                {product.isActive ? (
                  <Tag type='sucess'>Ativo</Tag>
                ) : (
                  <Tag type='danger'>Desativo</Tag>
                )}
              </TableCell>
              <TableCell key='option'>
                <Tooltip aria-content='Editar produto'>
                  <IconButton
                    name='view'
                    tooltip='Editar produto'
                    className='size-6 text-zinc-500'
                    onClick={() => handleEditProductButtonClick(product)}
                  />
                </Tooltip>
                <Link href={`${ROUTES.inventory.stocks}/${product.id}`}>
                  <Icon name='stock' className='size-6 text-zinc-500' />
                </Link>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
