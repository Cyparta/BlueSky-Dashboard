import Link from "next/link";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import commandsSearchLinks from "@/data/CommandsSearchData";
import allIcons from "@/lib/all-icons";
import { useRouter } from "next/navigation";

const CommandDemo = () => {
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const router = useRouter();

    // Function to handle search
    function handleSearch(e) {
        setSearch(e.target.value);
        if (e.target.value.length > 0) {
            setSearchResults(commandsSearchLinks.filter((command) =>
                command.title.toLowerCase().includes(e.target.value.toLowerCase())
            ));
        } else {
            setSearchResults([]);
        }
    }

    // Function to handle Enter key press
    function handleKeyDown(e) {
        if (e.key === "Enter" && searchResults.length > 0) {
            // Navigate to the first search result
            router.push(searchResults[0].link);
        }
    }

    // Attach keydown listener to search input
    useEffect(() => {
        const inputElement = document.getElementById("search");
        inputElement.addEventListener("keydown", handleKeyDown);

        return () => {
            // Cleanup event listener when the component unmounts
            inputElement.removeEventListener("keydown", handleKeyDown);
        };
    }, [searchResults]);

    return (
        <div className="flex items-center border rounded-md pr-3 relative">
            <Input
                id="search"
                className="outline-0 w-[180px] md:w-[400px] flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="Search"
                value={search}
                onChange={handleSearch}
            />
            {search.length > 0 ? (
                <button
                    className="font-bold w-[22px] h-[22px] text-white flex items-center justify-center rounded-full bg-black"
                    onClick={() => setSearch("")}
                >
                    X
                </button>
            ) : (
                <p className="cursor-pointer">{allIcons.search_icon}</p>
            )}

            {search.length > 0 && (
                <ul className="absolute top-11 left-0 w-full h-[300px] overflow-auto bg-white rounded-bl flex flex-col p-3 z-10 shadow-lg">
                    {searchResults.length > 0 ? (
                        searchResults.map((command, index) => (
                            <Link
                                onClick={() => setSearch("")}
                                href={command.link}
                                key={index}
                                className="p-3 hover:bg-gray-100 w-full rounded-md"
                            >
                                {command.title}
                            </Link>
                        ))
                    ) : (
                        <p className="text-center">No results found</p>
                    )}
                </ul>
            )}
        </div>
    );
};

export default CommandDemo;
