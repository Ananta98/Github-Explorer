import { Skeleton } from "./ui/skeleton";
import { Card } from "./ui/card";

const RepositorySkeletonCard: React.FC = () => {
  return (
    <Card className="flex flex-col p-4 justify-between bg-white border shadow-xl">
      <div className="flex flex-col gap-2">
        <span className="flex gap-2 items-center">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[50px]" />
        </span>
        <Skeleton className="h-4 w-[300px]" />
      </div>
      <div className="flex items-center gap-4 text-sm">
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </Card>
  );
};

export default RepositorySkeletonCard;
