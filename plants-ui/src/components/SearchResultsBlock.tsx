import { ReactNode } from 'react';

function SearchResultsBlock({ children }: { children: ReactNode }) {
  return (
    <div className="mt-6 h-full">
      {children}
    </div>
  );
}

export default SearchResultsBlock;