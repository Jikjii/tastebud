import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import { MouseEventHandler, useState } from "react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await Auth.signIn(email, password);

      await router.push('/');
    } catch (err) {
      console.error(err);
    }
  }

  const handleSignInWithGoogle: MouseEventHandler = async (e) => {
    e.preventDefault();

    Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google });
  };

  return (
    <main className="bg-gray-200 h-screen flex items-center justify-center">
      <div className="max-w-lg w-full bg-gray-100 shadow-lg p-8 flex flex-col">
        <p className="text-xl mb-4 text-center">Sign in to your account</p>

        <button
        className="text-lg text-white font-semibold bg-blue-500 py-3 px-6 rounded-md focus:outline-none focus:ring-2"
        onClick={handleSignInWithGoogle}
    >
    Sign In with Google
  </button>

  <hr className="bg-gray-600 border-0 h-px my-8" />


        <form className="flex flex-col" onSubmit={handleSignUp}>
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            value={email}
            type="email"
            className="border py-2 px-4 border-gray-500 focus:outline-none mb-4"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password"> Password</label>
          <input
            id="password"
            value={password}
            type="password"
            className="border py-2 px-4 border-gray-500 focus:outline-none mb-4"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="mt-3 text-lg font-semibold py-4 px-4 bg-gray-600 text-gray-200"
            type="submit"
          >
            Sign in
          </button>
        </form>
      </div>
    </main>
  );
};

export default SignIn;