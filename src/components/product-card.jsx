import React from "react";
import { useInView } from "react-intersection-observer";

const ProductCard = ({ product }) => {
    const { ref, inView } = useInView({ triggerOnce: true });

    return (
        <div ref={ref} className="h-auto w-64 bg-gray-100 rounded-lg shadow-lg p-4 my-4">
            {inView ? (
                <div className="flex flex-col justify-between h-full">
                    <img src={product.image} alt={product.name} className="h-48 w-full object-cover rounded-lg" />
                    <section className=" inline-block w-40 ">{product.name}</section>
                    <section>{product.price} USD</section>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Add to Cart</button>
                </div>
            ) : (
                <div className="h-48 w-full bg-gray-200 animate-pulse rounded-lg"></div>
            )}
        </div>
    );
};

export default ProductCard;
