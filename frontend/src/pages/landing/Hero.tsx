import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import api from "@/axios/axios";

function Hero() {
  // const handlePayWithGCash = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post(
  //       "https://lhtv5r5m-3000.asse.devtunnels.ms/api/payment",
  //       {
  //         amount: 2000,
  //         description: "Driving course payment",
  //       },
  //       { withCredentials: true }
  //     );

  //     window.location.href = response.data.invoice_url;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const handleLogin = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   try {
  //     const res = await api.get("/auth/me");
  //     console.log(res.data);
  //   } catch (err: any) {
  //     console.error(err);
  //   }
  // };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-yellow-400 to-yellow-600 dark:from-gray-900 dark:to-gray-800 py-20 px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Content */}
        <div className="text-center md:text-left space-y-6">
          <Badge className="mb-4 bg-black text-yellow-400 px-4 py-1 rounded-full shadow">
            Professional Driving Education
          </Badge>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-extrabold leading-tight text-black dark:text-yellow-300"
          >
            Learn to Drive with{" "}
            <span className="text-white drop-shadow-md">Confidence</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-sm md:text-lg max-w-xl mx-auto md:mx-0 text-black/80 dark:text-gray-300"
          >
            Master the road with our comprehensive driving courses. From
            beginner lessons to advanced techniques, we guide you every step of
            the way.
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link to="/auth/signup">
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button className="bg-black cursor-pointer text-yellow-400 hover:bg-gray-800 px-6 py-3 font-semibold rounded-2xl shadow-lg transition-all">
                  Start Your Journey
                </Button>
              </motion.div>
            </Link>

            <motion.div whileTap={{ scale: 0.95 }}>
              <Button
                // onClick={handlePayWithGCash}
                //  onClick={handleLogin}
                variant="outline"
                className="border-black cursor-pointer text-black dark:border-yellow-300 dark:text-yellow-300 px-6 py-3 font-semibold rounded-2xl shadow transition-all"
              >
                View Course
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Right Image */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center md:justify-end"
        >
          <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-2 border-black shadow-2xl">
            <img
              src="/heroimage.jpg"
              alt="Driving lesson"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>

      {/* Decorative accents */}
      {/* <div className="absolute top-10 left-10 w-10 h-10 bg-black rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-14 h-14 border-4 border-black rounded-full"></div> */}
    </section>
  );
}

export default Hero;
