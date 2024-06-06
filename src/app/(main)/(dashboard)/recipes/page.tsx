"use client";

import DatePickerOnHover from "@/components/elements/datepicker-hover";
import { Heading } from "@/components/elements/headings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RateTable } from "@/components/views/dashboard/Recipes/rateTable";
import { RecipesSavedChart } from "@/components/views/dashboard/Recipes/recipesChart1";
import { RecipesCommentedChart } from "@/components/views/dashboard/Recipes/recipesChart2";
import { fetchData, fixedNumber } from "@/lib/utils";
import { CommentedRecipeItem, RecipeItem, SavedRecipeItem } from "@/types/dashboard";
import Image from "next/image";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { HiArrowDownCircle, HiArrowUpCircle } from "react-icons/hi2";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE;

export default function Recipes() {
  const [dateRange, setDateRange] = useState<DateRange>({} as DateRange);
  const [mostRatedRecipes, setMostRatedRecipes] = useState<RecipeItem[]>([]);
  const [worstRatedRecipes, setWorstRatedRecipes] = useState<RecipeItem[]>([]);
  const [mostSavedRecipes, setMostSavedRecipes] = useState<SavedRecipeItem[]>([]);
  const [mostCommentedRecipes, setMostCommentedRecipes] = useState<CommentedRecipeItem[]>([]);

  useEffect(() => {
    const params = new URLSearchParams({
      startDate: dateRange.from?.toISOString() || '',
      endDate: dateRange.to?.toISOString() || ''
    }).toString();

    // Most Rated Recipes
    fetchData(`${BASE_URL}/Admin/GetMostRatedRecipes?${params}`).then(res => {
      if (res.Success) {
        setMostRatedRecipes(res.Result);
      }
    });

    // Worst Rated Recipes
    fetchData(`${BASE_URL}/Admin/GetWorstRatedRecipes?${params}`).then(res => {
      if (res.Success) {
        setWorstRatedRecipes(res.Result);
      }
    });

    // Most Saved Recipes
    fetchData(`${BASE_URL}/Admin/GetMostSavedRecipes?${params}`).then(res => {
      if (res.Success) {
        setMostSavedRecipes(res.Result);
      }
    });

    // Most Commented Recipes
    fetchData(`${BASE_URL}/Admin/GetMostCommentedRecipes?${params}`).then(res => {
      if (res.Success) {
        setMostCommentedRecipes(res.Result);
      }
    });
  }, [dateRange]);

  return (
    <div className="p-5 flex flex-col gap-6 pb-16 lg:pb-2">
      <div className="flex flex-row justify-between items-center">
        <Heading level={"15"}>Recipes</Heading>
        <DatePickerOnHover onSearch={setDateRange} />
      </div>
      <div className="flex flex-1 flex-col xl:flex-row gap-6 justify-between">
        <div className="flex flex-1 flex-col gap-6 w-full">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="rounded-2xl bg-[#F9F9F9] p-5 flex flex-col gap-4 w-full">
              <div className="flex flex-row gap-2 items-center">
                <HiArrowUpCircle size={16} color="#0D9A47" />
                <Heading level={"16"}>Most Rated Recipe</Heading>
              </div>
              {mostRatedRecipes[0] ? (
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-row gap-2">
                    <Image
                      className="w-11 h-11 rounded-lg"
                      src={mostRatedRecipes[0].ImageUrl}
                      alt=""
                      height={44}
                      width={44}
                    />
                    <div className="flex flex-col gap-1">
                      <Heading level={"9"} className="leading-5">
                        {mostRatedRecipes[0].Name}
                      </Heading>
                      <Heading level={"17"}>{mostRatedRecipes[0].Name}</Heading>
                    </div>
                  </div>
                  <div className="flex flex-row gap-2 items-end">
                    <Heading level={"7"} className="text-[#0D9A47]">
                      {fixedNumber(mostRatedRecipes[0].Rating)}
                    </Heading>
                    <Heading level={"16"}>{mostRatedRecipes[0].NumberOfRate}</Heading>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="rounded-2xl bg-[#F9F9F9] p-5 flex flex-col gap-4 w-full">
              <div className="flex flex-row gap-2 items-center">
                <HiArrowDownCircle size={16} color="#EE484F" />
                <Heading level={"16"}>Worst Rated Recipe</Heading>
              </div>
              {worstRatedRecipes[0] ? (
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-row gap-2">
                    <Image
                      className="w-11 h-11 rounded-lg"
                      src={worstRatedRecipes[0].ImageUrl}
                      alt=""
                      height={44}
                      width={44}
                    />
                    <div className="flex flex-col gap-1">
                      <Heading level={"9"} className="leading-5">
                        {worstRatedRecipes[0].Name}
                      </Heading>
                      <Heading level={"17"}>{worstRatedRecipes[0].Name}</Heading>
                    </div>
                  </div>
                  <div className="flex flex-row gap-2 items-end">
                    <Heading level={"7"} className="text-[#ED1C24]">
                      {fixedNumber(worstRatedRecipes[0].Rating)}
                    </Heading>
                    <Heading level={"16"}>{worstRatedRecipes[0].NumberOfRate}</Heading>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="rounded-2xl bg-[#F9F9F9] p-5 flex flex-col gap-4 w-full">
              <div className="flex flex-row gap-2 items-center">
                <Image src={"logo/mark.svg"} alt="" width={12} height={12} />
                <Heading level={"16"}>Most Saved Recipe</Heading>
              </div>
              {mostSavedRecipes[0] ? (
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-row gap-2">
                    <Image
                      className="w-11 h-11 rounded-lg"
                      src={mostSavedRecipes[0].ImageUrl}
                      alt=""
                      height={44}
                      width={44}
                    />
                    <div className="flex flex-col gap-1">
                      <Heading level={"9"} className="leading-5">
                        {mostSavedRecipes[0].Name}
                      </Heading>
                      <Heading level={"17"}>{mostSavedRecipes[0].Name}</Heading>
                    </div>
                  </div>
                  <Heading level={"7"}>{mostSavedRecipes[0].SavedCount}</Heading>
                </div>
              ) : null}
            </div>
            <div className="rounded-2xl bg-[#F9F9F9] p-5 flex flex-col gap-4 w-full">
              <div className="flex flex-row gap-2 items-center">
                <Image src={"logo/message.svg"} alt="" width={14} height={14} />
                <Heading level={"16"}>Most Commented Recipe</Heading>
              </div>
              {mostCommentedRecipes[0] ? (
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-row gap-2">
                    <Image
                      className="w-11 h-11 rounded-lg"
                      src={mostCommentedRecipes[0].ImageUrl}
                      alt=""
                      height={44}
                      width={44}
                    />
                    <div className="flex flex-col gap-1">
                      <Heading level={"9"} className="leading-5">
                        {mostCommentedRecipes[0].Name}
                      </Heading>
                      <Heading level={"17"}>{mostCommentedRecipes[0].Name}</Heading>
                    </div>
                  </div>
                  <Heading level={"7"}>{mostCommentedRecipes[0].CommentCount}</Heading>
                </div>
              ) : null}
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <Card className="h-[400px] w-full">
              <CardHeader>
                <CardTitle>
                  <Heading level={"9"} className="text-start">
                    Most Saved Recipes
                  </Heading>
                </CardTitle>
              </CardHeader>
              <CardContent className="pl-2 w-full h-[334px] flex flex-col gap-2 items-center">
                <RecipesSavedChart data={mostSavedRecipes} />
                <div className="text-sm font-normal">
                  Number of Saves to Favorites
                </div>
              </CardContent>
            </Card>
            <Card className="h-[400px] w-full">
              <CardHeader>
                <CardTitle>
                  <Heading level={"9"} className="text-start">
                    Most Commented Recipes
                  </Heading>
                </CardTitle>
              </CardHeader>
              <CardContent className="pl-2 w-full h-[334px] flex flex-col gap-2 items-center">
                <RecipesCommentedChart data={mostCommentedRecipes} />
                <div className="text-sm font-normal">Number of Comments</div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="flex flex-col gap-6 w-full xl:w-[361px]">
          <Card className="h-fit w-full">
            <CardHeader>
              <CardTitle>
                <Heading level={"9"} className="text-start">
                  Most Rated Recipes
                </Heading>
              </CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <RateTable data={mostRatedRecipes} type="Most" />
            </CardContent>
          </Card>
          <Card className="h-fit w-full">
            <CardHeader>
              <CardTitle>
                <Heading level={"9"} className="text-start">
                  Worst Rated Recipes
                </Heading>
              </CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <RateTable data={worstRatedRecipes} type="Worst" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
