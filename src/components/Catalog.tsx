import { useState, useEffect } from "react";
import api from "../services/api";
import { IProduct } from "../store/modules/cart/types";
import { CatalogItem } from "./CatalogItem";

export function Catalog() {
  const [catalog, setCatalog] = useState<IProduct[]>([]);

  useEffect(() => {
    api.get("products").then((response) => setCatalog(response.data));
  }, []);

  return (
    <main>
      <h1>Catalog</h1>
      {catalog.map((product) => (
        <CatalogItem product={product} key={product.id} />
      ))}
    </main>
  );
}
