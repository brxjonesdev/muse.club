import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { ArrowLeft } from 'lucide-react';
import LeftColumn from '@/components/profile/left-column';
import RightColumn from '@/components/profile/right-column';
  


export default function Settings() {
  return (
    <main className="h-dvh flex flex-col w-full max-w-4xl gap-y-4">
      <section>
        <Card className=" rounded-none rounded-b-lg min-h-[150px] flex flex-col  items-start  justify-end border-white/30 border-2 shadow-none bg-gradient-to-r from-blue-200 to-cyan-200 ">
          <CardHeader className="pb-3">
            <CardTitle className="text-5xl lg:text-6xl font-bold text-black">Profile</CardTitle>
          </CardHeader>
        </Card>
      </section>
      <section className="w-full  px-4  flex  gap-4  flex-col md:flex-row overflow-y-scroll ">
      <LeftColumn/>
      <RightColumn/>
      </section>
    </main>
  );
}
