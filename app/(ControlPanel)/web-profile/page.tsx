import React from 'react';
import ContentCard from '../_component/ContentCard';
import TabsProfile from './_component/TabsProfile';

const WebProfilePage = () => {
  return (
    <div className="space-y-4">
      <ContentCard>
        <h1 className="text-2xl">Profile Website</h1>
      </ContentCard>
      <ContentCard>
        <TabsProfile />
      </ContentCard>
    </div>
  );
};

export default WebProfilePage;
