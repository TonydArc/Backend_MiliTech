import Card from "components/card";
import { useEffect, useState } from "react";
import { getProfile } from "services/authService";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const inputStyles = "peer mx-4 px-1 h-full w-full border-b border-blue-gray-200 bg-transparent pt-1 p-1 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50";
  const labelStyles = 'text-sm font-bold text-gray-400 truncate dark:text-white'

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getProfile();
        setProfile(profileData);
      } catch (err) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // console.log(profile);

  if (loading) {
    return <div className="text-center">
      <div role="status">
        <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    </div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Card extra={"items-center w-full h-full p-[16px] bg-cover"}>
      {/* Name and position */}
      <div className="w-full gap-4 md:gap-14">
        {/* user profile */}
        <div className="">
          {/* Common styles for input fields */}
          {/* username */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-2">
            <div className="flex items-center mx-4 md:mx-8">
              <p className={labelStyles}>Username</p>
            </div>
            <div className="flex col-span-3">
              <div className="relative h-11 w-full">
                <input
                  value={profile.name || "N/A"}
                  readOnly
                  className={inputStyles}
                  // aria-label="Username"
                />
              </div>
            </div>
          </div>

          {/* email */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-2">
            <div className="flex items-center mx-4 md:mx-8">
              <p className={labelStyles}>Email</p>
            </div>
            <div className="flex col-span-3">
              <div className="relative h-11 w-full">
                <input
                  value={profile.email || "N/A"}
                  readOnly
                  className={inputStyles}
                  aria-label="Email"
                />
              </div>
            </div>
          </div>

          {/* phone number */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-2">
            <div className="flex items-center mx-4 md:mx-8">
              <p className={labelStyles}>Phone Number</p>
            </div>
            <div className="flex col-span-3">
              <div className="relative h-11 w-full">
                <input
                  value="03645283321"
                  readOnly
                  className={inputStyles}
                  aria-label="Phone Number"
                />
              </div>
            </div>
          </div>

          {/* pax number */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-2">
            <div className="flex items-center mx-4 md:mx-8">
              <p className={labelStyles}>PAX</p>
            </div>
            <div className="flex col-span-3">
              <div className="relative h-11 w-full">
                <input
                  value="3213131"
                  readOnly
                  className={inputStyles}
                  aria-label="PAX"
                />
              </div>
            </div>
          </div>

          {/* role */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-2">
            <div className="flex items-center mx-4 md:mx-8">
              <p className={labelStyles}>Role</p>
            </div>
            <div className="flex col-span-3">
              <div className="relative h-11 w-full">
                <input
                  value={profile.role || "N/A"}
                  readOnly
                  className={inputStyles}
                  aria-label="Role"
                />
              </div>
            </div>
          </div>

          {/* address */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-2">
            <div className="flex items-center mx-4 md:mx-8">
              <p className={labelStyles}>Address</p>
            </div>
            <div className="flex col-span-3">
              <div className="relative h-11 w-full">
                <input
                  value="123 Main Street, Springfield, Anytown, ABC 12345, United States"
                  readOnly
                  className={inputStyles}
                  aria-label="Address"
                />
              </div>
            </div>
          </div>
        </div>

        {/* submit button */}
        <button
          type="button"
          className="mx-4 md:mx-8 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 rounded-md text-sm font-bold px-5 py-2.5 text-center mb-2"
          aria-label="Submit"
        >
          Submit
        </button>
      </div>
    </Card>

  );
};

export default Profile;
