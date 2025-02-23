import React from "react";

const Loading = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-blue-500 border-gray-300"></div>
        </div>
    );
};

export default Loading;
