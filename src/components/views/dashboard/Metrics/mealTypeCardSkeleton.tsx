import { Heading } from "@/components/elements/headings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@mantine/core";

export function MealTypeCardMobileSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Heading level={"9"} className="text-start">
            Meal Types
          </Heading>
        </CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="flex flex-col gap-5 items-center">
          <div className="pl-4">
            <Skeleton width={250} height={250} circle />
          </div>
          <div className="flex flex-col gap-3 w-full">
            {Array.from({ length: 8 }, (_, i) => i + 1).map(num => (
              <div className="flex flex-row justify-between items-center" key={num}>
                <div className="flex flex-row items-center gap-2">
                  <Skeleton width={20} height={20} circle />
                  <Skeleton width={200} height={15} radius={10} />
                </div>
                <Skeleton width={50} height={15} radius={10} />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function MealTypeCardSkeleton() {
  return (
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
            <Skeleton width={250} height={250} circle />
          </div>
          <div className="flex flex-col gap-3 w-full">
            {Array.from({ length: 8 }, (_, i) => i + 1).map(num => (
              <div className="flex flex-row justify-between items-center" key={num}>
                <div className="flex flex-row items-center gap-2">
                  <Skeleton width={20} height={20} circle />
                  <Skeleton width={200} height={15} radius={10} />
                </div>
                <Skeleton width={50} height={15} radius={10} />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
