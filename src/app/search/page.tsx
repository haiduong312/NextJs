import ClientSearch from "@/components/search/client.search";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Search your tracks",
    description: "search",
};

const SearchPage = () => {
    return <ClientSearch />;
};
export default SearchPage;
