import type { DrawerRef } from "@/ui/components/commons/drawer/types"
import type { Location } from "@stocker/core/entities"
import { useState, type RefObject } from "react"

type useLocationsListProps = {
  locations: Location[]
  updateDrawerRef: RefObject<DrawerRef>
  registerDrawerRef: RefObject<DrawerRef>
  onUpdateLocation: VoidFunction
  onRegisterSector: VoidFunction
}
export function useLocationsList({ locations, updateDrawerRef, registerDrawerRef, onUpdateLocation, onRegisterSector }: useLocationsListProps){
  const [locationBeingEditted, setLocationsBeingEditted] = useState<null | Location>(null)
  const [parentLocationId,setParentLocationId] = useState<string | null>(null)
  const [expandedItems,setExpandedItems] = useState<{[key:string]:boolean}>({})
  function handleAccordionClick(id:string){
    setExpandedItems((prev) =>({
      ...prev,
      [id]: !prev[id]
    }))
  }
  function handleEditLocationsButtonClick(location:Location){
    setLocationsBeingEditted(location)
    updateDrawerRef.current?.open()
  }
  function handleRegisterSectorButtonClick(parentLocationId:string){
    setParentLocationId(parentLocationId)
    registerDrawerRef.current?.open()
  }
  function handleDrawerClose(){
    setParentLocationId(null)
    setLocationsBeingEditted(null)
  }
  function handleCancelEditting(){
    setLocationsBeingEditted(null)
    setParentLocationId(null)
    updateDrawerRef.current?.close()
    registerDrawerRef.current?.close()
  }
  function handleUpdateLocationFormSubmit(){
    setLocationsBeingEditted(null)
    updateDrawerRef.current?.close()
    onUpdateLocation()
  }
  function handleRegisterSectorFormSubmit(){
    setParentLocationId(null)
    registerDrawerRef.current?.close()
    onRegisterSector()
  }
  return{
    parentLocationId,
    locationBeingEditted,
    expandedItems,
    handleAccordionClick,
    handleRegisterSectorButtonClick,
    handleRegisterSectorFormSubmit,
    handleCancelEditting,
    handleUpdateLocationFormSubmit,
    handleEditLocationsButtonClick,
    handleDrawerClose,
  }
}
