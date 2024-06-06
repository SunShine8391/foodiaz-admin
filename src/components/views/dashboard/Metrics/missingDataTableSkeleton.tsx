import { Heading } from "@/components/elements/headings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@mantine/core";

export function MissingDataTableMobileSkeleton() {
  return (
    <Card className="h-fit w-full">
      <CardHeader>
        <CardTitle>
          <Heading level={"9"} className="text-start">
            Missing Data in Recipes
          </Heading>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 flex flex-col gap-4">
        {Array.from({ length: 5 }, (_, i) => i + 1).map(num => (
          <div className="flex flex-row justify-between items-center" key={num}>
            <div className="flex flex-row gap-2">
              <Skeleton width={44} height={44} radius={10} />
              <div className="flex flex-col gap-1">
                <Skeleton width={150} height={'1.25rem'} radius={30} />
                <Skeleton width={150} height={'1.25rem'} radius={30} />
              </div>
            </div>
            <Skeleton width={30} height={30} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function MissingDataTableSkeleton() {
  return (
    <Card className="h-fit w-full">
      <CardHeader>
        <CardTitle>
          <Heading level={"9"} className="text-start">
            Missing Data in Recipes
          </Heading>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 flex flex-col gap-4">
        {Array.from({ length: 5 }, (_, i) => i + 1).map(num => (
          <div className="flex flex-row justify-between items-center" key={num}>
            <div className="flex flex-row gap-2 items-center">
              <Skeleton width={44} height={44} radius={10} />
              <div className="flex flex-row xl:flex-col gap-1">
                <Skeleton width={150} height={15} />
                <Skeleton width={150} height={15} />
              </div>
            </div>
            <Skeleton width={30} height={30} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}