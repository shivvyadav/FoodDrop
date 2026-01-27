'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface Props {
  visible: boolean;
  onClose: () => void;
  onVerify: (otp: string) => void;
  onResend: () => void;
}

export default function OtpVerification({
  visible,
  onClose,
  onVerify,
  onResend,
}: Props) {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [resendEnabled, setResendEnabled] = useState(false);

  useEffect(() => {
    if (!visible) return;
    setTimer(30);
    setResendEnabled(false);

    const interval = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          clearInterval(interval);
          setResendEnabled(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [visible]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number,
  ) => {
    const val = e.target.value.replace(/\D/, '').slice(-1);
    const newOtp = [...otp];
    newOtp[idx] = val;
    setOtp(newOtp);

    if (val && idx < 3) {
      const next = document.getElementById(`otp-${idx + 1}`);
      next?.focus();
    }
  };

  const handleSubmit = () => {
    if (otp.every((d) => d !== '')) {
      onVerify(otp.join(''));
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative w-[90%] max-w-sm rounded-2xl bg-white p-6 shadow-lg"
          >
            <h2 className="mb-4 text-center text-lg font-semibold">
              Enter OTP
            </h2>
            <p className="mb-4 text-center text-sm text-gray-500">
              Enter the 4-digit code sent to the user.
            </p>

            <div className="mb-4 flex justify-center gap-3">
              {otp.map((val, idx) => (
                <input
                  key={idx}
                  id={`otp-${idx}`}
                  type="text"
                  maxLength={1}
                  value={val}
                  onChange={(e) => handleChange(e, idx)}
                  className="focus:border-primary focus:ring-primary size-12 rounded-lg border border-gray-300 text-center text-lg font-medium outline-none focus:ring-1"
                />
              ))}
            </div>

            <button
              onClick={handleSubmit}
              className="bg-primary w-full rounded-lg py-2 text-white hover:bg-orange-600"
            >
              Verify
            </button>

            <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
              <span>Resend in {timer}s</span>
              <button
                disabled={!resendEnabled}
                onClick={onResend}
                className={`ml-auto font-medium ${
                  resendEnabled
                    ? 'text-primary'
                    : 'cursor-not-allowed text-gray-400'
                }`}
              >
                Resend OTP
              </button>
            </div>

            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <X className="size-5" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
