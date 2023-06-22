import React from "react";
import { Route, Routes } from "react-router-dom";
import SearchPage from "../components/SearchPage";
import ListingPage from "../components/ListingPage";
import DetailsPage from "../components/DetailsPage";
import BookmarksPage from "../components/BookmarksPage";

export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="/listing-page" element={<ListingPage />} />
      <Route path="/details-page" element={<DetailsPage />} />
      <Route path="/bookmarks" element={<BookmarksPage />} />
    </Routes>
  );
}
