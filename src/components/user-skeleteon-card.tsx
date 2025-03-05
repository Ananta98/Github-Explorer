import { Skeleton } from "./ui/skeleton";

const UserSkeletonCard = () => {
  return (
    <div className="flex justify-between items-center border p-4 rounded-2xl shadow-lg">
      <div className="flex gap-2 items-center">
        <Skeleton className="h-12 w-12 rounded-full" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
};

export default UserSkeletonCard;
