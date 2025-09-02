import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";
import { CarIcon } from "lucide-react";

function Header() {
  return (
    <header className="sticky top-0  bg-gradient-to-r from-yellow-400 to-yellow-600 dark:from-gray-900 dark:to-gray-800  z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo + Title */}
          <a href={"/"}>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-black dark:bg-yellow-500 rounded-lg flex items-center justify-center shadow-md">
                <CarIcon className="w-6 h-6 text-yellow-400 dark:text-black" />
              </div>
              <div>
                <h1 className="text-xl font-extrabold text-black dark:text-yellow-400">
                  LearnAndGo
                </h1>
                <p className="text-sm text-black/80 dark:text-gray-300">
                  Professional Driving School
                </p>
              </div>
            </div>
          </a>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="/#courses"
              className="text-black dark:text-white hover:text-yellow-700 dark:hover:text-yellow-400 transition-colors font-medium"
            >
              Courses
            </a>
            <a
              href="/#about"
              className="text-black dark:text-white hover:text-yellow-700 dark:hover:text-yellow-400 transition-colors font-medium"
            >
              About
            </a>
            <a
              href="#footer"
              className="text-black dark:text-white hover:text-yellow-700 dark:hover:text-yellow-400 transition-colors font-medium"
            >
              Contact
            </a>

            {/* Auth Buttons */}
            <a href="/auth/login">
              <Button
                variant="outline"
                size="sm"
                className="border-black text-black hover:bg-black hover:text-yellow-400 dark:border-yellow-400 dark:text-yellow-400 dark:hover:bg-yellow-400 dark:hover:text-black rounded-xl"
              >
                Sign In
              </Button>
            </a>
            <a href="/enrollee/checkout">
              <Button
                size="sm"
                className="bg-black text-yellow-400 hover:bg-gray-800 dark:bg-yellow-500 dark:text-black dark:hover:bg-yellow-400 rounded-xl shadow-md"
              >
                Enroll Now
              </Button>
            </a>
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
