import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import api from "../services/api";
import { addProductToCart } from "../store/modules/cart/actions";
import { IProduct } from "../store/modules/cart/types";

export function Catalog() {
  const dispatch = useDispatch();
  const [catalog, setCatalog] = useState<IProduct[]>([]);

  useEffect(() => {
    api.get("products").then((response) => setCatalog(response.data));
  }, []);

  const handleAddProductToCart = useCallback((product: IProduct) => {
    dispatch(addProductToCart(product));
  }, []);

  return (
    <main>
      <h1>Catalog</h1>
      {catalog.map((product) => (
        <article key={product.id}>
          <strong>{product.title}</strong> {" - "}
          <span>{product.price}</span> {" - "}
          <button type="button" onClick={() => handleAddProductToCart(product)}>
            Add o cart
          </button>
        </article>
      ))}
    </main>
  );
}
