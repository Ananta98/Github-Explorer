import React from "react";
import { Card } from "./ui/card";
import { Repository } from "../lib/types";
import { Badge } from "./ui/badge";
import { FolderGit, GitFork, Star } from "lucide-react";

const RepositoryCard: React.FC<Repository> = ({
  id,
  name,
  description,
  html_url,
  visibility,
  stargazers_count,
  language,
  fork,
  updated_at,
}) => {
  return (
    <Card
      key={id}
      className="flex flex-col p-4 justify-between bg-white border shadow-xl"
    >
      <div className="flex flex-col gap-2">
        <span className="flex gap-2 items-center">
          {fork ? (
            <GitFork size={16} className="text-sm" />
          ) : (
            <FolderGit size={16} className="text-sm" />
          )}
          <a
            href={html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:underline"
          >
            {name}
          </a>
          <Badge variant={visibility === "private" ? "secondary" : "default"}>
            {visibility}
          </Badge>
        </span>

        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      <div className="flex items-center gap-4 text-sm">
        {language && (
          <span className="flex items-center gap-1">
            <span className="h-3 w-3 rounded-full bg-[#3572A5]" /> {language}
          </span>
        )}
        <span className="flex items-center gap-1">
          <Star size={16} className="text-yellow-500" /> {stargazers_count}
        </span>
        <span className="text-sm">{new Date(updated_at).toDateString()}</span>
      </div>
    </Card>
  );
};

export default RepositoryCard;
