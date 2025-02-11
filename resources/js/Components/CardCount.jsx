import React from "react";

const CardCount = ({ title, color, count }) => {
    return (
        <div className="w-64 py-5">
            <div className={`${color} shadow-md rounded-lg p-5 text-white`}>
                <h1 className="text-xl">{title}</h1>
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold">{count}</h1>
                </div>
            </div>
        </div>
    );
};

export default CardCount;
