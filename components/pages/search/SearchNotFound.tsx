import { MapPinned } from 'lucide-react';

export default function SearchNotFound() {
  return (
    <div className="flex flex-col items-center justify-center">
      <MapPinned className="h-16 w-16 text-gray-400" />
      <h1 className="text-3xl font-bold">No results found</h1>
      <p className="text-muted-foreground">Try searching for something else</p>
    </div>
  );
}
