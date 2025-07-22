import React from "react";
import Image from "next/image";
import NavigationBar from "../components/NavigationBar";
import { Toaster } from "sonner";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col items-center min-h-screen">
      <NavigationBar />
      <section className="flex flex-col items-center w-full">
        <div className="p-10">
          <Image
            src={"/guinness-logo.png"}
            width={150}
            height={150}
            alt="Guinness Logo"
            priority={true}
            placeholder="empty"
          />
        </div>
        <Toaster position="bottom-center" />
        {children}
      </section>
    </main>
  );
}
