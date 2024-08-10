"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

interface SearchResultType {
    "1. symbol": string;
    "2. name": string;
    "3. type": string;
    "4. region": string;
    "5. marketOpen": string;
    "6. marketClose": string;
    "7. timezone": string;
    "8. currency": string;
    "9. matchScore": string;
}

export default function SelectSymbol() {
    const [value, setValue] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("");
    const [searchResults, setSearchResults] = useState<SearchResultType[]>([]);

    async function fetchSearchValue(searchKeyword: string) {
        try {
            const response = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&apikey=${process.env.ALPHA_VANTAGE_API_KEY}&keywords=${searchKeyword}&datatype=json`);
            const data = await response.json();
            setSearchResults(data.bestMatches || []);
        } catch (error) {
            console.error("Error fetching search results:", error);
            setSearchResults([]);
        }
    }

    useEffect(() => {
        if (search.length > 0) {
            const debounceTimer = setTimeout(() => {
                fetchSearchValue(search);
            }, 300);

            return () => clearTimeout(debounceTimer);
        } else {
            setSearchResults([]);
        }
    }, [search]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[500px] justify-between"
                >
                    <p className="sr-only">Search</p>
                    {value || "Search symbol..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[500px] p-0">
                <Command>
                    <CommandInput
                        placeholder="Search symbol..."
                        value={search}
                        onValueChange={setSearch}
                    />
                    <CommandList>
                        <CommandEmpty>No symbol found.</CommandEmpty>
                        <CommandGroup>
                            {searchResults.map((result) => (
                                <CommandItem
                                    key={result["1. symbol"]}
                                    value={result["1. symbol"]}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue);
                                        setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === result["1. symbol"] ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {result["1. symbol"]} - {result["2. name"]}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}