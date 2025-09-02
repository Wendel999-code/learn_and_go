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
import { useState } from "react";
import api from "@/axios/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !email) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const res = await api.post(
        "/auth/login",
        { email, password },
        { withCredentials: true } // important for JWT cookies
      );
      if (res.data.success) {
        setSuccess("Login successful!");
        setError("");
        console.log(res.data);
      } else {
        setError(res.data.message || "Login failed");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed please try again");

      setSuccess("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full w-[400px] bg-white dark:bg-gray-800 shadow-lg dark:shadow-yellow-400/50">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl dark:text-yellow-400">
              Login
            </CardTitle>
            <CardDescription className="text-gray-700 dark:text-gray-300">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <Label htmlFor="email" className="dark:text-yellow-300">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="bg-gray-100 dark:bg-gray-700 dark:text-yellow-200"
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
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-gray-100 dark:bg-gray-700 dark:text-yellow-200"
                  required
                />
              </div>

              <Link
                to="#"
                className="text-sm text-right text-yellow-500 dark:text-yellow-400 hover:underline"
              >
                Forgot your password?
              </Link>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col gap-3">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}

            <motion.div className="w-full" whileTap={{ scale: 0.98 }}>
              <Button
                disabled={!email || !password}
                onClick={handleLogin}
                className="w-full bg-yellow-500 dark:bg-yellow-400 text-black dark:text-black hover:bg-yellow-600 dark:hover:bg-yellow-300"
              >
                Login
              </Button>
            </motion.div>

            <p className="text-center text-sm text-gray-600 dark:text-gray-300">
              Don’t have an account?{" "}
              <Link
                to="/auth/signup"
                className="text-yellow-500 dark:text-yellow-400 font-medium hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
