import React from 'react'
import { Heading } from "@/components/elements/headings";
import { StyleSwitcher } from "@/components/ui/style-switcher";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GoDotFill } from "react-icons/go";
import MetricsCard, { MetricsCardSkeleton } from "@/components/views/dashboard/Metrics/card";
import { MealChart } from "@/components/views/dashboard/Metrics/mealChart";
import { CuisineChart } from "@/components/views/dashboard/Metrics/cuisineChart";
import { DatabaseMetricsType } from "@/types/dashboard";
import { fixedNumber } from "@/lib/utils";
import { CHART_COLORS } from '@/config/constants';
import { MealTypeCardSkeleton } from "./mealTypeCardSkeleton";
import { MissingDataTableSkeleton } from "./missingDataTableSkeleton";

export default function DatabaseMetricsDesktop({ databaseMetrics }: {
  databaseMetrics: DatabaseMetricsType
}) {
  return (
    <div className="p-5 flex flex-col gap-6">
      <div className="flex flex-row justify-between items-center">
        <Heading level={"15"}>Database Metrics</Heading>
        {/* <StyleSwitcher label="Today" /> */}
      </div>
      <div className="flex flex-1 w-full flex-col xl:flex-row gap-6 justify-between">
        <div className="flex flex-1 flex-col gap-6 w-full">
          <div className="flex flex-row gap-6 w-full">
            {databaseMetrics ? (
              <>
                <MetricsCard label="Total Recipes" value={databaseMetrics.TotalRecipe} />
                <MetricsCard label="Total Ingredients" value={databaseMetrics.TotalIngredients} />
              </>
            ) : (
              <>
                <MetricsCardSkeleton />
                <MetricsCardSkeleton />
              </>
            )}
          </div>
          {databaseMetrics ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>
                    <Heading level={"9"} className="text-start">
                      Meal Types
                    </Heading>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="flex flex-row gap-5 items-center">
                    <div className="pl-2">
                      <MealChart data={databaseMetrics.mealTypeRatios} />
                    </div>
                    <div className="flex flex-col gap-3 w-full">
                      {databaseMetrics.mealTypeRatios.map((item, index) => (
                        <React.Fragment key={index}>
                          <div className="flex flex-row justify-between items-center">
                            <div className="flex flex-row items-center gap-2">
                              <GoDotFill size={20} color={CHART_COLORS[index % CHART_COLORS.length]} />
                              <Heading level={"16"}>{item.MealTypeName}</Heading>
                            </div>
                            <Heading level={"16"}>{fixedNumber(item.Ratio, 0)}%</Heading>
                          </div>
                          {(index < databaseMetrics.mealTypeRatios.length - 1) ? <Separator /> : null}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>
                    <Heading level={"9"} className="text-start">
                      Cuisine Types
                    </Heading>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="flex flex-row gap-5 items-center">
                    <div className="pl-2">
                      <CuisineChart data={databaseMetrics.cusineTypeRatios} />
                    </div>
                    <div className="flex flex-col gap-3 w-full">
                      {databaseMetrics.cusineTypeRatios.map((item, index) => (
                        <>
                          <div className="flex flex-row justify-between items-center">
                            <div className="flex flex-row items-center gap-2">
                              <GoDotFill size={20} color={CHART_COLORS[index % CHART_COLORS.length]} />
                              <Heading level={"16"}>{item.MealTypeName}</Heading>
                            </div>
                            <Heading level={"16"}>{fixedNumber(item.Ratio, 0)}%</Heading>
                          </div>
                          {(index < databaseMetrics.cusineTypeRatios.length - 1) ? <Separator /> : null}
                        </>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              <MealTypeCardSkeleton />
              <MealTypeCardSkeleton />
            </>
          )}
        </div>
        <div className="flex w-full xl:w-[322px]">
          {databaseMetrics ? (
            <Card className="h-fit w-full">
              <CardHeader>
                <CardTitle>
                  <Heading level={"9"} className="text-start">
                    Missing Data in Recipes
                  </Heading>
                </CardTitle>
              </CardHeader>
              <CardContent className="px-6 flex flex-col gap-4">
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-row gap-2 items-center">
                    <Image
                      src={"/logo/cuisine.svg"}
                      alt=""
                      width={44}
                      height={44}
                    />
                    <div className="flex flex-row xl:flex-col gap-1">
                      <Heading level={"16"}>Recipes without</Heading>
                      <Heading level={"16"}>Cuisine Type</Heading>
                    </div>
                  </div>
                  <Heading level={"7"}>{databaseMetrics.MissingCuisineTypeCount}</Heading>
                </div>
                <Separator />
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-row gap-2 items-center">
                    <Image
                      src={"/logo/ingredients.svg"}
                      alt=""
                      width={44}
                      height={44}
                    />
                    <div className="flex flex-row xl:flex-col gap-1">
                      <Heading level={"16"}>Recipes without</Heading>
                      <Heading level={"16"}>Ingredients</Heading>
                    </div>
                  </div>
                  <Heading level={"7"}>{databaseMetrics.MissingRecipeIngredientCount}</Heading>
                </div>
                <Separator />
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-row gap-2 items-center">
                    <Image
                      src={"/logo/recipes_image.svg"}
                      alt=""
                      width={44}
                      height={44}
                    />
                    <div className="flex flex-row xl:flex-col gap-1">
                      <Heading level={"16"}>Recipes without</Heading>
                      <Heading level={"16"}>Image</Heading>
                    </div>
                  </div>
                  <Heading level={"7"}>{databaseMetrics.MissingImageCount}</Heading>
                </div>
                <Separator />
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-row gap-2 items-center">
                    <Image
                      src={"/logo/recipes_nutrition.svg"}
                      alt=""
                      width={44}
                      height={44}
                    />
                    <div className="flex flex-row xl:flex-col gap-1">
                      <Heading level={"16"}>Recipes without</Heading>
                      <Heading level={"16"}>Nutrition</Heading>
                    </div>
                  </div>
                  <Heading level={"7"}>{databaseMetrics.MissingNutritionCount}</Heading>
                </div>
                <Separator />
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-row gap-2 items-center">
                    <Image
                      src={"/logo/recipes_meal.svg"}
                      alt=""
                      width={44}
                      height={44}
                    />
                    <div className="flex flex-row xl:flex-col gap-1">
                      <Heading level={"16"}>Recipes without</Heading>
                      <Heading level={"16"}>Meal Type</Heading>
                    </div>
                  </div>
                  <Heading level={"7"}>{databaseMetrics.MissingMealTypeCount}</Heading>
                </div>
              </CardContent>
            </Card>
          ) : (
            <MissingDataTableSkeleton />
          )}
        </div>
      </div>
    </div>
  );
}
