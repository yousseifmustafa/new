import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CodeVerification() {
  const [verificationCode, setVerificationCode] = useState(new Array(6).fill(""));
  const navigate = useNavigate();

  // Handle change for input fields
  const handleChange = (element, index) => {
    if (/^[0-9]$/.test(element.value)) {
      let newCode = [...verificationCode];
      newCode[index] = element.value;
      setVerificationCode(newCode);

      // Automatically move to the next input
      if (element.nextSibling && element.value) {
        element.nextSibling.focus();
      }
    }
  };

  // Submit the verification code
  const submitCode = async (e) => {
    e.preventDefault();
    const code = verificationCode.join(""); // Combine code from all inputs into a single string
    if (code.length === 6) {
      try {
        const res = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", {
            resetCode:code
        });
          toast.success(" Your verification code has been successfully validated!"); 
        navigate("/ResetPassword"); // Redirect to the reset password page after successful verification
      } catch (err) {
        toast.error(err.response?.data?.message || "Verification failed");
      }
    } else {
      toast.error("Please enter the complete 6-digit code");
    }
  };

  return (

    <div className="w-100 bg-[#F9FAFB] flex justify-center pt-12 pb-24">


<div className="w-1/3 mx-auto text-center bg-white  p-5 rounded-2xl">
      <h2 className="pb-3 px-3 border-b-2 border-gray-300 mb-3 font-bold text-lg">
        Enter Verification Code
      </h2>

      <form className="flex justify-center my-12" onSubmit={submitCode}>
        {verificationCode.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={digit}
            className="w-12 h-12 text-center mx-1 text-xl font-bold border rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => handleChange(e.target, index)}
            onFocus={(e) => e.target.select()}
          />
        ))}
      </form>

      <div className="flex justify-end mt-4 ">
        <button
          type="submit"
          className="px-4 py-2 rounded-xl bg-main text-white font-semibold w-full"
          onClick={submitCode}
        >
          Verify Code
        </button>
      </div>
    </div>
    </div>
  );
}
