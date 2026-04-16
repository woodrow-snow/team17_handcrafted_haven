"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";

export function ToastBridge({ message }: { message: string }) {
  useEffect(() => {
    if (message) {
      toast.success(message);
    }
  }, [message]);

  return null;
}
