import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../components/Header";

const Dashboard = () => {
  const [user, setUser] = useState<any | null>();
  const router = useRouter();

  const handleLogOut = async () => {
    await Auth.signOut();

    await router.push('/signin');
  };

  useEffect(() => {
    const getProfile = async () => {
      const userInfo = await Auth.currentUserInfo();

      if (userInfo) {
        setUser(userInfo);
      } else {
        await router.push('/signin');
      }
    };

    getProfile();
  }, [router]);

  if (!user) {
    // Currently loading asynchronously User Supabase Information
    return null;
  }

  return (
    <div>
      <Header />
    <main className="bg-gray-200 h-screen flex flex-col items-center justify-center">
      <p className="text-xl mb-4">Welcome, your email is {user.attributes.email}</p>

      <button
        className="mt-2 text-lg text-white font-semibold bg-green-500 py-3 px-6 rounded-md"
        onClick={handleLogOut}
      >
        Log out
      </button>
    </main>
    </div>
  );
};

export default Dashboard;