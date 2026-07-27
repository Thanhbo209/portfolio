import { Card } from "@/components/ui/Card";
import { TechItemRow } from "@/components/sections/techstack/TechItemRow";
import type { TechCategory } from "@/content/tech-stack";

interface TechCategoryCardProps {
  category: TechCategory;
}

export function TechCategoryCard({ category }: TechCategoryCardProps) {
  const CategoryIcon = category.icon;

  return (
    <Card className="flex h-full flex-col gap-4">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <CategoryIcon className="size-4" weight="regular" />
        <span>{category.name}</span>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-1 [&>*:last-child:nth-child(odd)]:col-span-2">
        {category.items.map((item) => (
          <TechItemRow key={item.name} item={item} />
        ))}
      </div>
    </Card>
  );
}
