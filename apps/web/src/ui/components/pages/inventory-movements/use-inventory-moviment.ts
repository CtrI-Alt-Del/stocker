import { CACHE } from "@/constants"
import { useApi, useCache } from "@/ui/hooks"
import { PAGINATION } from "@stocker/core/constants"
import { parseAsInteger, useQueryState } from "nuqs"

export function useInventoryMovementPage(productID:string){
  const { inventoryMovementService} = useApi()
  const [pageState,setPage] = useQueryState('page',parseAsInteger)
  const page = pageState ?? 1
  async function fetchInventoryMovements(){
    const response = await inventoryMovementService.listMovements({page:page,productID:productID})
    return response.body
  }
  function handlePageChange(page:number){
    setPage(page)
  }
  const { data,isFetching,refetch}= useCache({
    fetcher: fetchInventoryMovements,
    key: `${CACHE.inventoryMovements.key}/${productID}`,
    dependencies:[1]
  })
  async function handleRegisterInventoryMovementFormSubmit(){
    refetch()

  }
  const movements = data ? data.items : []
  const itemsCount = data ? data.itemsCount :0 
  return {
    movements,
    totalPages: Math.round(itemsCount / PAGINATION.itemsPerPage),
    page,
    handlePageChange,
    isFetching,
    handleRegisterInventoryMovementFormSubmit,
  }
}

