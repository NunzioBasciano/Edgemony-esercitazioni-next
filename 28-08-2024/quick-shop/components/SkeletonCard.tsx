import React from 'react'

function SkeletonCard() {
    return (
        <div
            className="shadow-lg mx-auto max-w-sm bg-white border-gray-200 rounded-lg dark:bg-white dark:border-gray-700 p-4 flex flex-col justify-between"
            style={{ height: '600px' }}
        >
            <div className="h-1/2 flex justify-center items-center animate-pulse">
                <div className="bg-gray-300 h-full w-full rounded-lg"></div>
            </div>
            <div className="h-1/2 m-1">
                <div className="bg-gray-300 h-6 w-3/4 rounded mb-3 animate-pulse"></div>
                <div className="bg-gray-300 h-4 w-1/2 rounded mb-3 animate-pulse"></div>
                <div className="bg-gray-300 h-4 w-5/6 rounded mb-3 animate-pulse"></div>
                <div className="bg-gray-300 h-6 w-1/2 rounded mb-3 animate-pulse"></div>
            </div>
        </div>
    )
}

export default SkeletonCard