"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/marketplace/product-card";
import { cn } from "@/lib/cn";
import {
  categories,
  products,
  type CategoryId,
} from "@/lib/data/products";

type SortKey = "featured" | "price-asc" | "price-desc" | "rating";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating", label: "Top rated" },
];

export function Catalogue({
  initialCategory = "all",
  initialWholesale = false,
}: {
  initialCategory?: CategoryId | "all";
  initialWholesale?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryId | "all">(initialCategory);
  const [sort, setSort] = useState<SortKey>("featured");
  const [wholesaleOnly, setWholesaleOnly] = useState(initialWholesale);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const categoryLabel =
      category === "all"
        ? null
        : categories.find((item) => item.id === category)?.label ?? null;

    const filtered = products.filter((product) => {
      if (category !== "all" && product.category !== category) return false;
      if (wholesaleOnly && product.wholesalePrice === null) return false;
      if (!needle) return true;
      const haystack = [
        product.name,
        product.vendor,
        product.location,
        product.description,
        categoryLabel ?? "",
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(needle);
    });

    switch (sort) {
      case "price-asc":
        return [...filtered].sort((a, b) => a.retailPrice - b.retailPrice);
      case "price-desc":
        return [...filtered].sort((a, b) => b.retailPrice - a.retailPrice);
      case "rating":
        return [...filtered].sort((a, b) => b.rating - a.rating);
      default:
        return filtered;
    }
  }, [category, query, sort, wholesaleOnly]);

  const hasFilters =
    query.trim().length > 0 || category !== "all" || wholesaleOnly;

  const reset = () => {
    setQuery("");
    setCategory("all");
    setWholesaleOnly(false);
    setSort("featured");
  };

  return (
    <div>
      <div className="border border-sand-300/80 bg-sand-100/60 p-4 md:p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <label className="relative flex-1">
            <span className="sr-only">Search products</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500"
            >
              <circle cx="11" cy="11" r="6.5" />
              <path d="m16 16 4 4" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search produce, vendors or states"
              className="h-12 w-full border border-sand-300 bg-sand-50 pl-11 pr-4 text-[13px] text-ink-950 placeholder:text-stone-500 focus:border-ink-900/40 focus:outline-none"
            />
          </label>

          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="sr-only">
              Sort products
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(event) => setSort(event.target.value as SortKey)}
              className="h-12 w-full border border-sand-300 bg-sand-50 px-4 text-[12.5px] text-ink-900 focus:border-ink-900/40 focus:outline-none md:w-auto"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-sand-300/70 pt-4">
          <button
            type="button"
            onClick={() => setCategory("all")}
            aria-pressed={category === "all"}
            className={cn(
              "border px-3.5 py-1.5 text-[11.5px] transition-colors",
              category === "all"
                ? "border-ink-900 bg-ink-900 text-sand-50"
                : "border-sand-300 text-ink-700 hover:border-ink-900/30 hover:text-ink-900",
            )}
          >
            All
          </button>
          {categories.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setCategory(item.id)}
              aria-pressed={category === item.id}
              className={cn(
                "border px-3.5 py-1.5 text-[11.5px] transition-colors",
                category === item.id
                  ? "border-ink-900 bg-ink-900 text-sand-50"
                  : "border-sand-300 text-ink-700 hover:border-ink-900/30 hover:text-ink-900",
              )}
            >
              {item.label}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setWholesaleOnly((value) => !value)}
            aria-pressed={wholesaleOnly}
            className={cn(
              "ml-auto flex items-center gap-2 border px-3.5 py-1.5 text-[11.5px] transition-colors",
              wholesaleOnly
                ? "border-ochre-500 bg-ochre-500/12 text-ink-900"
                : "border-sand-300 text-ink-700 hover:border-ink-900/30",
            )}
          >
            <span
              className={cn(
                "grid h-3.5 w-3.5 place-items-center border",
                wholesaleOnly
                  ? "border-ochre-600 bg-ochre-500 text-ink-950"
                  : "border-stone-500/50",
              )}
            >
              {wholesaleOnly ? (
                <svg
                  viewBox="0 0 12 12"
                  className="h-2.5 w-2.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="m2.5 6 2.5 2.5L9.5 3.5" />
                </svg>
              ) : null}
            </span>
            Wholesale available
          </button>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="text-[12px] text-stone-600">
          <span className="font-medium text-ink-900">{results.length}</span>{" "}
          {results.length === 1 ? "product" : "products"}
          {category !== "all"
            ? ` in ${categories.find((item) => item.id === category)?.label}`
            : ""}
        </p>
        {hasFilters ? (
          <button
            type="button"
            onClick={reset}
            className="text-[11.5px] text-stone-600 underline decoration-sand-300 underline-offset-4 transition-colors hover:text-ink-900"
          >
            Clear filters
          </button>
        ) : null}
      </div>

      {results.length > 0 ? (
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((product, index) => (
            <ProductCard
              key={product.slug}
              product={product}
              priority={index < 4}
            />
          ))}
        </div>
      ) : (
        <div className="mt-6 border border-dashed border-sand-300 bg-sand-100/40 px-6 py-16 text-center">
          <p className="font-display text-[24px] text-ink-950">
            Nothing matched that search
          </p>
          <p className="mx-auto mt-2 max-w-sm text-[13px] leading-relaxed text-stone-600">
            Try a different product, vendor or state, or clear the filters to
            see everything listed today.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-5 border border-ink-900/25 px-5 py-2.5 text-[12px] text-ink-900 transition-colors hover:bg-ink-900 hover:text-sand-50"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
