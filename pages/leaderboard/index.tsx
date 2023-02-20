import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";

const Leaderboard: FC = () => {
  const [entries, setEntries] = useState<UserDetails[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchEntries = async () => {
      const res = await axios.get("/api/leaderboard");
      setEntries(
        res.data.leaderboard.sort(
          (a: UserDetails, b: UserDetails) => b.score - a.score
        )
      );
    };

    fetchEntries();

    const interval = setInterval(fetchEntries, 20000);
    return () => clearInterval(interval);
  }, []);

  const toggleLike = (username: string) => {
    setEntries((prevEntries) =>
      prevEntries.map((entry: UserDetails) =>
        entry.username === username ? { ...entry, liked: !entry.liked } : entry
      )
    );
  };

  const handleRowClick = (username: string) => {
    router.push(`/profile/${username}`);
  };

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Score
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {entries.map((person) => (
                  <tr key={person.username}>
                    <td
                      className="px-6 py-4 whitespace-nowrap"
                      onClick={() => handleRowClick(person.username)}
                    >
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <Image
                            className="h-10 w-10 rounded-full"
                            src={person.profileImage}
                            width={500}
                            height={500}
                            alt=""
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {person.username}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className="px-2 inline-flex text-xs leading-5
                  font-semibold rounded-full bg-green-100 text-green-800"
                      >
                        {person.score}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => toggleLike(person.username)}>
                        {person.liked ? (
                          <SolidHeartIcon className="h-6 w-6 text-red-500" />
                        ) : (
                          <HeartIcon className="h-6 w-6" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
