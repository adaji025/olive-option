import Image from "next/image";

const AuthWrapper = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <div className="relative overflow-hidden">
      <Image
        src="/image/auth-elipse.png"
        height={800}
        width={800}
        alt="auth bg"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 opacity-[8%]"
      />
      <div className="min-h-screen bg-black flex flex-col">
        {/* Header with logo */}

        <div className="p-6">
          <Image src="/logo.svg" width={100} height={100} alt="olive option" />
        </div>

        {/* Main content */}
        <div className="flex-1 flex items-center justify-center px-6 pb-10 z-10">
          <div className="w-full max-w-xl">
            <h1 className="uppercase text-white text-2xl font-bold text-center mb-8">
              {title}
            </h1>

            <div className="bg-[#1818184F] border border-gray-700 rounded-lg p-12 md:px-16">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthWrapper;
