import { ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Repository, User } from "../lib/types";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import RepositoryCard from "./repository-card";
import RepositorySkeletonCard from "./repository-skeleton-card";
import EmptyState from "./empty-state";
import ErrorAlert from "./error-alert";

const UserCard: React.FC<User> = ({ id, login, avatar_url }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState<Repository[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchRepos = async (username: string) => {
    try {
      setError(null);
      setLoading(true);
      const response: Repository[] = await fetch(
        `https://api.github.com/users/${username}/repos`
      ).then((res) => res.json());
      setRepos(response);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Collapsible
      key={id}
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full space-y-2"
    >
      <div className="flex justify-between items-center border p-4 rounded-2xl shadow-lg">
        <div className="flex gap-2 items-center">
          <Avatar>
            <AvatarImage src={avatar_url} />
            <AvatarFallback>{login.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <h4 className="text-sm font-semibold">{login}</h4>
        </div>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" onClick={() => fetchRepos(login)}>
            <ChevronDown />
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="p-2">
        {loading ? (
          <div className="flex flex-col gap-2">
            {[...Array(5)].map((_, i) => (
              <RepositorySkeletonCard key={i} />
            ))}
          </div>
        ) : error ? (
          <ErrorAlert error={error} />
        ) : repos && repos.length > 0 ? (
          <div className="flex flex-col gap-4">
            {repos.map((repo) => {
              return <RepositoryCard key={repo.id} {...repo} />;
            })}
          </div>
        ) : (
          <EmptyState
            title="Repository Empty"
            description={`Repository Empty for user: ${login}`}
          />
        )}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default UserCard;
