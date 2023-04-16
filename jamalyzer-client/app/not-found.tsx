import React from "react";
import ErrorPage from "@/app/ErrorPage";

export default function NotFound() {
  return <ErrorPage error={"404 not found"} />;
}
