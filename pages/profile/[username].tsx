import React, { FC } from "react";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import axios from "axios";

const User: FC = () => {
  const router = useRouter();

  const { data, status } = useQuery("user", async () => {
    const res = await axios.get(`/api/profile/${router.query.username}`);
    return res.data;
  });

  const handleBack = () => {
    router.back();
  };

  return status === "loading" ? (
    <h1>Loading</h1>
  ) : (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div>
              <h2 className="text-center text-3xl font-extrabold text-gray-900">
                {router.query.username}
              </h2>
            </div>
            <div className="text-center mt-6">
              <dl className="space-y-6">
                <div>
                  <dt className="text-md font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 text-lg text-gray-900">{data.email}</dd>
                </div>
                <div>
                  <dt className="text-md font-medium text-gray-500">Age</dt>
                  <dd className="mt-1 text-lg text-gray-900">{data.age}</dd>
                </div>
                <div>
                  <dt className="text-md font-medium text-gray-500">
                    Birthday
                  </dt>
                  <dd className="mt-1 text-lg text-gray-900">
                    {data.birthday}
                  </dd>
                </div>
                <div>
                  <dt className="text-md font-medium text-gray-500">Twitter</dt>
                  <dd className="mt-1 text-lg text-gray-900">{data.twitter}</dd>
                </div>
                <div>
                  <dt className="text-md font-medium text-gray-500">Bio</dt>
                  <dd className="mt-1 text-lg text-gray-900">{data.bio}</dd>
                </div>
              </dl>
            </div>
            <button
              onClick={handleBack}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
