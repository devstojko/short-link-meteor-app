import React from 'react';

import LinksList from './LinksList';
import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';
import LinksListFilters from './LinksListFilters';

export default function Link() {
  return (
    <div>
      <PrivateHeader />
      <LinksListFilters />
      <LinksList />
      <AddLink />
    </div>
  );
}