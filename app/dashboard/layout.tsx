import React from "react";
import Image from "next/image";
import NavigationBar from "../components/NavigationBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="flex flex-col items-center min-h-screen">
        <NavigationBar />
        <section className="flex flex-col items-center">
          <div className="p-10">
            <Image
              src={
                "https://upload.wikimedia.org/wikipedia/en/thumb/f/f8/Guinness_logo_dark_text.svg/220px-Guinness_logo_dark_text.svg.png"
              }
              width={150}
              height={150}
              alt="Guinness Logo"
            />
          </div>
          {children}
        </section>
      </main>
    </>
  );
}
