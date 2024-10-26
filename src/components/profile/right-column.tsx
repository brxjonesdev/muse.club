import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SavedRecs from './saved-recs'

export default function RightColumn() {
  return (
    <div className="h-full md:w-2/3  space-y-4 overflow-y-scroll pb-4">
        <Tabs defaultValue="saved-reccomendations" className="w-full flex flex-col  ">
  <TabsList className='w-full'>
    <TabsTrigger value="my-reccomendations" className='w-full'>My Rec&apos;s</TabsTrigger>
    <TabsTrigger value="saved-reccomendations" className='w-full'>Saved Rec&apos;s</TabsTrigger>
  </TabsList>
    <TabsContent value="my-reccomendations" className='flex-1'>
    <SavedRecs/>
    </TabsContent>
    <TabsContent value="saved-reccomendations" className='flex-1'>
        <SavedRecs/>
    </TabsContent>
</Tabs>


        </div>
  )
}
