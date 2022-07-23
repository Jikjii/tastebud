import { useState } from "react";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newUser, setNewUser] = useState(false);
    const [verificationCode, setVerificationCode] = useState("");
    const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await Auth.signUp({
        username: email,
        password,
        attributes: { email },
      });
        setNewUser(true);
    } catch (err) {
      console.error(err);
    }
  }

  const handleConfirmSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await Auth.confirmSignUp(email, verificationCode);

      await router.push('/signin');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <main className="bg-gray-200 h-screen flex items-center justify-center">
      <form className="max-w-lg w-full bg-gray-100 shadow-lg p-8 flex flex-col">
      {newUser ? (<><p className="text-xl mb-4 text-center">Verify your email</p>

<label htmlFor="verificationCode">Verification code</label>
<input
  id="verificationCode"
  value={verificationCode}
  type="text"
  className="border py-2 px-4 border-gray-500 focus:outline-none mb-4"
  onChange={(e) => setVerificationCode(e.target.value)}
/>

<button
  className="mt-3 text-lg font-semibold py-4 px-4 bg-gray-600 text-gray-200"
  type="submit"
  onClick={handleConfirmSignUp}
>
  Confirm
</button></>) : (
        <>
        <p className="text-xl mb-4 text-center">Create an account</p>

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
          onClick={handleSignUp}
        >
          Sign up
        </button>
        </>
        )}
      </form>
    </main>
  );
}

export default SignUp;