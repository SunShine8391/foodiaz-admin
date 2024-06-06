"use client";

import DatePickerOnHover from "@/components/elements/datepicker-hover";
import { Heading } from "@/components/elements/headings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IngredientMostChart } from "@/components/views/dashboard/Ingredients/ingredientChart1";
import { IngredientLessChart } from "@/components/views/dashboard/Ingredients/ingredientChart2";
import { IngredientPurchasedChart } from "@/components/views/dashboard/Ingredients/ingredientChart3";
import { fetchData } from "@/lib/utils";
import { LessUsedIngredientItem, MostUsedIngredientItem, PurchasedItem } from "@/types/dashboard";
import { capitalize } from 'lodash';
import Image from "next/image";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { HiArrowDownCircle, HiArrowUpCircle } from "react-icons/hi2";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE;

export default function IngredientsPage() {
  const [dateRange, setDateRange] = useState<DateRange>({} as DateRange);
  const [mostUsedIngredients, setMostUsedIngredients] = useState<MostUsedIngredientItem[]>([]);
  const [lessUsedIngredients, setLessUsedIngredients] = useState<LessUsedIngredientItem[]>([]);
  const [mostPurchasedIngredients, setMostPurchangedIngredients] = useState<PurchasedItem[]>([]);

  useEffect(() => {
    const params = new URLSearchParams({
      startDate: dateRange.from?.toISOString() || '',
      endDate: dateRange.to?.toISOString() || ''
    }).toString();

    // Most used ingredient
    fetchData(`${BASE_URL}/Admin/MostUsedIngredient?${params}`).then(res => {
      if (res.Success) {
        setMostUsedIngredients(res.Result.GetMostUsedIngredients);
      }
    });

    // Less Used Ingredient
    fetchData(`${BASE_URL}/Admin/LessUsedIngredient?${params}`).then(res => {
      if (res.Success) {
        setLessUsedIngredients(res.Result.GetLessUsedIngredients);
      }
    });

    // Most Purchased Ingredient
    fetchData(`${BASE_URL}/Admin/GetMostPurchasedIngredient?${params}`).then(res => {
      if (res.Success) {
        setMostPurchangedIngredients(res.Result);
      }
    });
  }, [dateRange]);

  return (
    <div className="p-5 flex flex-col gap-6 pb-16 lg:pb-2">
      <div className="flex flex-row justify-between items-center">
        <Heading level={"15"}>Ingredients</Heading>
        <DatePickerOnHover onSearch={setDateRange} />
      </div>
      <div className="flex flex-col xl:flex-row gap-6">
        <div className="rounded-2xl bg-[#F9F9F9] p-5 flex flex-col gap-4 w-full">
          <div className="flex flex-row gap-2 items-center">
            <HiArrowUpCircle size={16} color="#0D9A47" />
            <Heading level={"16"}>Most Used Ingredient</Heading>
          </div>
          {mostUsedIngredients[0] ? (
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row gap-2">
                <Image src={mostUsedIngredients[0].ImagePath} alt="Most Used Ingredient" height={44} width={44} />
                <div className="flex flex-col gap-1">
                  <Heading level={"9"} className="leading-5">
                    {capitalize(mostUsedIngredients[0].IngredientName)}
                  </Heading>
                  <Heading level={"17"}>{capitalize(mostUsedIngredients[0].IngredientName)}</Heading>
                </div>
              </div>
              <Heading level={"7"}>{mostUsedIngredients[0].usedNumber}</Heading>
            </div>
          ) : null}
        </div>
        <div className="rounded-2xl bg-[#F9F9F9] p-5 flex flex-col gap-4 w-full">
          <div className="flex flex-row gap-2 items-center">
            <HiArrowDownCircle size={16} color="#EE484F" />
            <Heading level={"16"}>Less Used Ingredient</Heading>
          </div>
          {lessUsedIngredients[0] ? (
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row gap-2">
                <Image src={lessUsedIngredients[0].ImageUrl} alt="Less Used Ingredient" height={44} width={44} />
                <div className="flex flex-col gap-1">
                  <Heading level={"9"} className="leading-5">
                    {capitalize(lessUsedIngredients[0].IngredientName)}
                  </Heading>
                  <Heading level={"17"}>{capitalize(lessUsedIngredients[0].IngredientName)}</Heading>
                </div>
              </div>
              <Heading level={"7"}>{lessUsedIngredients[0].usedNumber}</Heading>
            </div>
          ) : null}
        </div>
        <div className="rounded-2xl bg-[#F9F9F9] p-5 flex flex-col gap-4 w-full">
          <div className="flex flex-row gap-2 items-center">
            <Image src={"/logo/Vector.svg"} alt="" height={16} width={16} />
            <Heading level={"16"}>Most Purchased Ingredient</Heading>
          </div>
          {mostPurchasedIngredients[0] ? (
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row gap-2">
                <Image src={mostPurchasedIngredients[0].ImageUrl} alt="Most Purchased Ingredient" height={44} width={44} />
                <div className="flex flex-col gap-1">
                  <Heading level={"9"} className="leading-5 text-start">
                    {capitalize(mostPurchasedIngredients[0].Name)}
                  </Heading>
                  <Heading level={"17"}>{capitalize(mostPurchasedIngredients[0].Name)}</Heading>
                </div>
              </div>
              <Heading level={"7"}>{mostPurchasedIngredients[0].PurchasedCount}</Heading>
            </div>
          ) : null}
        </div>
      </div>
      <div className="flex flex-col xl:flex-row gap-6">
        <Card className="h-[400px] w-full">
          <CardHeader>
            <CardTitle>
              <Heading level={"9"} className="text-start">
                Most Used Ingredients
              </Heading>
            </CardTitle>
          </CardHeader>
          <CardContent className="pl-2 w-full h-[334px] flex flex-col gap-2 items-center">
            <IngredientMostChart data={mostUsedIngredients} />
            <div className="text-sm font-normal">Number of Uses</div>
          </CardContent>
        </Card>
        <Card className="h-[400px] w-full">
          <CardHeader>
            <CardTitle>
              <Heading level={"9"} className="text-start">
                Less Used Ingredients
              </Heading>
            </CardTitle>
          </CardHeader>
          <CardContent className="pl-2 w-full h-[334px] flex flex-col gap-2 items-center">
            <IngredientLessChart data={lessUsedIngredients} />
            <div className="text-sm font-normal">Number of Uses</div>
          </CardContent>
        </Card>
        <Card className="h-[400px] w-full">
          <CardHeader>
            <CardTitle>
              <Heading level={"9"} className="text-start">
                Most Purchased Ingredients
              </Heading>
            </CardTitle>
          </CardHeader>
          <CardContent className="pl-2 w-full h-[334px] flex flex-col gap-2 items-center">
            <IngredientPurchasedChart data={mostPurchasedIngredients} />
            <div className="text-sm font-normal">
              Additions to Shopping List
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
