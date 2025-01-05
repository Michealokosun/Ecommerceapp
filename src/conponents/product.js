import { Button } from "@headlessui/react";
import React, { useContext } from "react";
import { createuserdoc } from "../libs/firebaseconfig";
import { userAuth } from "../libs/usercontext";
import {useNavigate  } from "react-router-dom";

export const SingleProduct = ({ product }) => {
  const navigate = useNavigate();
  const { user } = useContext(userAuth);
  const handleAddTOCart = () => {
    if (user) {
      createuserdoc(user, product);
    }else{
    navigate("/signin");
    }
  };

  return (
    <div>
      <div key={product.id} className="group">
        <img
          alt={product.imageAlt}
          src={product.imageSrc}
          className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]"
        />
        <div className="flex justify-between items-center">
          <div className="col">
            <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">
              {product.price}
            </p>
          </div>
          <div className="col2">
            <Button
              onClick={handleAddTOCart}
              className="rounded bg-slate-800 py-2 px-4 text-sm text-white data-[hover]:bg-slate-700 data-[active]:bg-slate-500"
            >
              Add to cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
