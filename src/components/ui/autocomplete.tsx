"use client";

import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useSearchTp } from "@/app/(app)/courses/use-search-tp";
import { useSearchTrainee } from "@/app/(app)/enrollments/use-search-trainee";

interface TrainingProvider {
    id: number;
    name: string;
    contact_email: string;
    contact_phone: string;
    address: string;
    lat: string;
    long: string;
    website: string | null;
    status: string;
    created_at: string;
    updated_at: string;
}

interface AutoCompleteProps {
    value?: number;
    onChange?: (value: number) => void;
    className?: string;
}

export default function Autocomplete({
    value = 0,
    onChange,
    className = "",
}: AutoCompleteProps) {
    const [query, setQuery] = useState("");
    const [debouncedQuery] = useDebounce(query, 500);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const { data: providers = [], isPending } = useSearchTp({
        query: debouncedQuery,
    });

    // Initialize with current value
    useEffect(() => {
        if (value && providers.length > 0) {
            const provider = providers.find(p => p.id === value);
            if (provider) {
                setQuery(provider.name);
            }
        }
    }, [value, providers]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setQuery(newValue);
        setSelectedIndex(-1);
        setShowSuggestions(newValue.length > 0);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedIndex(prev =>
                prev < providers.length - 1 ? prev + 1 : prev,
            );
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
        } else if (e.key === "Enter") {
            if (selectedIndex >= 0) {
                handleSelect(providers[selectedIndex]);
            }
            setShowSuggestions(false);
        } else if (e.key === "Escape") {
            setShowSuggestions(false);
        }
    };

    const handleSelect = (provider: TrainingProvider) => {
        setQuery(provider.name);
        onChange?.(provider.id);
        setShowSuggestions(false);
    };

    const handleFocus = () => {
        if (query.length > 0) {
            setShowSuggestions(true);
        }
    };

    const handleBlur = () => {
        setTimeout(() => {
            setShowSuggestions(false);
        }, 200);
    };

    return (
        <div className={`relative ${className}`}>
            <div className="relative">
                <Input
                    type="text"
                    placeholder="Search training providers..."
                    value={query}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className="pr-10 w-full"
                />
                <Button
                    size="icon"
                    variant="ghost"
                    className="absolute right-0 top-0 h-full px-3"
                    aria-label="Search"
                    type="button"
                >
                    <Search className="h-4 w-4" />
                </Button>
            </div>

            {showSuggestions && (
                <ul className="mt-1 bg-background border rounded-md shadow-sm absolute z-10 w-full max-h-60 overflow-auto">
                    {isPending ? (
                        <li className="px-4 py-2 text-muted-foreground">
                            Searching...
                        </li>
                    ) : providers.length === 0 ? (
                        <li className="px-4 py-2 text-muted-foreground">
                            No training providers found
                        </li>
                    ) : (
                        providers.map((provider, index) => (
                            <li
                                key={provider.id}
                                className={`px-4 py-2 cursor-pointer hover:bg-muted ${
                                    index === selectedIndex ? "bg-muted" : ""
                                }`}
                                onClick={() => handleSelect(provider)}
                            >
                                {provider.name}
                            </li>
                        ))
                    )}
                </ul>
            )}
        </div>
    );
}
