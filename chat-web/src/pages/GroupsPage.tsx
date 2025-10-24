import React, { useEffect } from "react";
import { fetchGroups } from "../features/group/groupAPI";

const GroupsPage: React.FC = () => {
  const [groups, setGroups] = React.useState<any[]>([]);

  useEffect(() => {
    fetchGroups().then(setGroups);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-3">Groups</h2>
      <ul className="space-y-2">
        {groups.map((g) => (
          <li key={g.id} className="border p-2 rounded hover:bg-gray-50">
            <div className="font-medium">{g.name}</div>
            <div className="text-sm text-gray-500">
              {g.members.length} members
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupsPage;
