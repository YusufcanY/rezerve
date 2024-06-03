import { SearchX } from 'lucide-react';

export default function SearchNotFound() {
  return (
    <div className="flex flex-col items-center justify-center">
      <SearchX className="h-16 w-16 text-destructive opacity-50" />
      <h1 className="text-3xl font-bold">No results found</h1>
      <p className="text-muted-foreground">
        Try searching for something else or change the filters to get more results
      </p>
    </div>
  );
}
