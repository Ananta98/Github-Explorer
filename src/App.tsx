import { useState } from "react";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Search } from "lucide-react";
import UserCard from "./components/user-card";
import { User, UserSearchResponse } from "./lib/types";
import ErrorAlert from "./components/error-alert";
import UserSkeletonCard from "./components/user-skeleteon-card";
import EmptyState from "./components/empty-state";
import { ModeToggle } from "./components/mode-toggle";

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (searchQuery: string) => {
    try {
      if (!searchQuery.trim()) {
        setUsers([]);
        return;
      }
      setError(null);
      setLoading(true);
      setSearch(searchQuery);
      const response = await fetch(
        `https://api.github.com/search/users?q=${searchQuery}&per_page=5`
      );
      const json: UserSearchResponse = await response.json();
      setUsers(json.items || []);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Github Explorer</h1>
        <ModeToggle />
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          type="text"
          placeholder="Please input this search..."
          className="w-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button onClick={() => handleSearch(query)}>
          <Search /> Search
        </Button>
      </div>
      {query === "" ? (
        <EmptyState
          title="Search Query Empty"
          description="Please fill searchbox to show Github users"
        />
      ) : loading ? (
        <div className="flex flex-col gap-2">
          {[...Array(5)].map((_, i) => (
            <UserSkeletonCard key={i} />
          ))}
        </div>
      ) : error ? (
        <ErrorAlert error={error} />
      ) : users && users.length > 0 ? (
        <div className="flex flex-col gap-2">
          <h2 className="text-muted-foreground">
            Showing users for "{search}"
          </h2>
          {users.map((user) => (
            <UserCard key={user.id} {...user} />
          ))}
        </div>
      ) : (
        users &&
        users.length == 0 && (
          <EmptyState
            title="No users found"
            description="No users found in Github"
          />
        )
      )}
    </div>
  );
}

export default App;
