import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "@/axios/axios";

export default function SignupCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await api.post(
        "/auth/signup",
        { email, password },
        { withCredentials: true } // important for JWT cookies
      );

      console.log(res.data);

      setSuccess("Signup successful! You can now log in.");
      setError("");
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed");
      setSuccess("");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full mb-6  w-[400px] bg-white dark:bg-gray-800 shadow-lg dark:shadow-yellow-400/50">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl dark:text-yellow-400">
              Sign Up
            </CardTitle>
            <CardDescription className="text-gray-700 dark:text-gray-300">
              Create your account to start learning
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form className="flex flex-col gap-4" onSubmit={handleSignup}>
              <div className="flex flex-col gap-1">
                <Label htmlFor="email" className="dark:text-yellow-300">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="bg-gray-100 dark:bg-gray-700 dark:text-yellow-200"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <Label htmlFor="password" className="dark:text-yellow-300">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="bg-gray-100 dark:bg-gray-700 dark:text-yellow-200"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <Label
                  htmlFor="confirm-password"
                  className="dark:text-yellow-300"
                >
                  Confirm Password
                </Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  className="bg-gray-100 dark:bg-gray-700 dark:text-yellow-200"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}
              {success && <p className="text-green-500 text-sm">{success}</p>}

              <motion.div className="w-full" whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  className="w-full mt-3 bg-yellow-500 dark:bg-yellow-400 text-black dark:text-black hover:bg-yellow-600 dark:hover:bg-yellow-300"
                >
                  Sign Up
                </Button>
              </motion.div>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col gap-3">
            <motion.div
              className="w-full"
              whileTap={{ scale: 0.98 }}
            ></motion.div>

            <p className="text-center text-sm text-gray-600 dark:text-gray-300">
              Already have an account?{" "}
              <Link
                to="/auth/login"
                className="text-yellow-500 dark:text-yellow-400 font-medium hover:underline"
              >
                Sign In
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
