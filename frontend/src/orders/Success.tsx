import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

function PaymentSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="bg-white dark:bg-gray-800 shadow-lg border border-blue-500 dark:border-yellow-400">
          <CardHeader className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
              className="flex justify-center mb-3"
            >
              <CheckCircle className="w-16 h-16 text-blue-500 dark:text-yellow-400" />
            </motion.div>
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-yellow-400">
              Payment Successful!
            </CardTitle>
          </CardHeader>

          <CardContent className="text-center space-y-2">
            <p className="text-gray-700 dark:text-gray-300">
              Your payment has been processed successfully
              <br />
              using{" "}
              <span className="font-semibold text-blue-600 dark:text-yellow-400">
                GCash
              </span>
              , integrated by{" "}
              <span className="font-semibold text-yellow-600 dark:text-blue-400">
                Wendel
              </span>{" "}
              with Xendit services.
            </p>
          </CardContent>

          <CardFooter className="flex gap-3 justify-center">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black dark:bg-yellow-400 dark:hover:bg-yellow-300">
              Go to Dashboard
            </Button>
            <Button
              variant="outline"
              className="border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900"
            >
              View Receipt
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}

export default PaymentSuccess;
