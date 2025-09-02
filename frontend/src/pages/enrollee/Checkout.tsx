import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Info } from "lucide-react";
import { motion } from "framer-motion";
import CoursesCard from "@/components/CoursesCard";
import { courses } from "@/lib/courses";

import type { Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 }, // start slightly lower and smaller
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring", // smooth spring effect
      stiffness: 80, // bounce
      damping: 20,
      duration: 0.5, // optional: control timing
    },
  },
};

function CheckoutForm() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [validIdPreview, setValidIdPreview] = useState<string | null>(null);
  const [selfiePreview, setSelfiePreview] = useState<string | null>(null);

  const validIdRef = useRef<HTMLInputElement | null>(null);
  const selfieRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setPreview: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  return (
    <section className="py-20 px-6 bg-theme">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto max-w-4xl"
      >
        <Card className="border border-yellow-500/50 rounded-2xl shadow-lg bg-white dark:bg-gray-900">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
              Student Application
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid grid-cols-1   md:grid-cols-2 gap-6">
              {/* Personal Info */}
              <div>
                <Label htmlFor="firstname">First Name</Label>
                <Input
                  className="border ring ring-gray-300 dark:ring-gray-800"
                  id="firstname"
                />
              </div>
              <div>
                <Label htmlFor="lastname">Last Name</Label>
                <Input
                  className="border ring ring-gray-300 dark:ring-gray-800"
                  id="lastname"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  className="border ring ring-gray-300 dark:ring-gray-800"
                  id="email"
                  type="email"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  className="border ring ring-gray-300 dark:ring-gray-800"
                  id="phone"
                  type="number"
                />
              </div>
              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  className="border ring ring-gray-300 dark:ring-gray-800"
                  id="age"
                  type="number"
                />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  className="border ring ring-gray-300 dark:ring-gray-800"
                  id="address"
                  type="text"
                />
              </div>
              {/* Uploads */}
              <div>
                <Label>Upload Valid ID</Label>
                <div className="mt-2 flex items-center gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    ref={validIdRef}
                    className="hidden"
                    onChange={(e) => handleFileChange(e, setValidIdPreview)}
                  />
                  <Button
                    type="button"
                    size={"icon"}
                    variant="outline"
                    className="border-yellow-500/50 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-500 hover:text-black"
                    onClick={() => validIdRef.current?.click()}
                  >
                    {" "}
                    <Upload className="w-5 h-5 " />{" "}
                  </Button>
                  {validIdPreview && (
                    <motion.img
                      src={validIdPreview}
                      alt="Valid ID"
                      className="w-56 h-36 rounded-sm border object-cover"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                    />
                  )}
                </div>
              </div>
              <div>
                <Label>Upload Selfie</Label>
                <div className="mt-2 flex items-center gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    ref={selfieRef}
                    className="hidden"
                    onChange={(e) => handleFileChange(e, setSelfiePreview)}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size={"icon"}
                    className="border-yellow-500/50 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-500 hover:text-black"
                    onClick={() => selfieRef.current?.click()}
                  >
                    {" "}
                    <Upload className="w-5 h-5 " />{" "}
                  </Button>
                  {selfiePreview && (
                    <motion.img
                      src={selfiePreview}
                      alt="Selfie"
                      className="w-56 h-36 rounded-sm border object-cover"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                    />
                  )}
                </div>
              </div>
              {/* Course Selection */}
              <div className="md:col-span-2">
                <Label>Select Course</Label>
                <div className="mt-4 grid sm:grid-cols-3 gap-4">
                  {courses.map((course) => (
                    <CoursesCard
                      key={course.id}
                      course={course}
                      isSelected={selectedCourse === course.id}
                      onEnroll={true}
                      onSelect={() => setSelectedCourse(course.id)}
                    />
                  ))}
                </div>
              </div>
              {/* Selected Course */}
              {selectedCourse && (
                <div className="md:col-span-2 text-center py-4 border-t">
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    Selected Course:
                  </p>
                  <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                    {courses.find((c) => c.id === selectedCourse)?.title} - ₱
                    {courses.find((c) => c.id === selectedCourse)?.price}
                  </p>
                </div>
              )}
              {/* Note */}{" "}
              <div className="md:col-span-2">
                {" "}
                <div className="mt-4 flex items-start gap-3 rounded-xl bg-yellow-100 dark:bg-yellow-500/10 border border-yellow-400/50 p-4">
                  {" "}
                  <Info className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-1" />{" "}
                  <p className="text-sm text-yellow-700 dark:text-yellow-200 leading-relaxed">
                    {" "}
                    <span className="font-semibold">Note:</span> Partial payment
                    of at least <span className="font-bold">₱100</span> is
                    required for all courses. You will be redirected to the
                    secure payment gateway after registration.{" "}
                  </p>{" "}
                </div>{" "}
              </div>
              {/* Submit */}
              <div className="md:col-span-2">
                <Button className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 rounded-xl">
                  Proceed to Payment
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}

export default CheckoutForm;
