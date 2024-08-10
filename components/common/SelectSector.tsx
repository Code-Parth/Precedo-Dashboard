"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

const sectors = [
    {
        value: "technology",
        label: "Technology",
    },
    {
        value: "finance",
        label: "Finance",
    },
    {
        value: "healthcare",
        label: "Healthcare",
    }
]

export default function SelectSector() {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {value
                        ? sectors.find((sector) => sector.value === value)?.label
                        : "Select sector..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search sector..." />
                    <CommandList>
                        <CommandEmpty>No sector found.</CommandEmpty>
                        <CommandGroup>
                            {sectors.map((sector) => (
                                <CommandItem
                                    key={sector.value}
                                    value={sector.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === sector.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {sector.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
