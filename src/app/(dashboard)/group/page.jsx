import React from 'react';
import GroupTableData from '@/data/table-data/groups/GroupTableData';

 const GroupPage = () => {
  return (
    <section className="flex gap-2 flex-col bg-white rounded-md shadow-md my-4 p-4">
            <h1 className="text-[18px] font-bold text-blue-800 uppercase">Groups</h1>
            <p className="text-gray-400">This is your most recent groups at the top</p>
            <GroupTableData/>
    </section>
  )
}
export default GroupPage;