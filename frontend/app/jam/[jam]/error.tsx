"use client";
import React from "react";
import ErrorPage from "@/app/ErrorPage";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return <ErrorPage error={error.message} />;
}
