import React from "react";

export default function Loader() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="m-auto">
        <div className="flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-[#fd9e02]"></div>
        </div>
      </div>
    </div>
  );
}
