import { ReactNode } from 'react';

function SearchResultsBlock({ children }: { children: ReactNode }) {
  return (
    <div className="mt-6">
      {children}
    </div>
  );
}

export default SearchResultsBlock;