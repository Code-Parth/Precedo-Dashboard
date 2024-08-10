"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun02Icon, ComputerIcon, Moon02Icon } from "hugeicons-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function ThemeToggle() {
    const { setTheme, theme } = useTheme();
    const [currentTheme, setCurrentTheme] = useState<string>("");

    useEffect(() => {
        if (theme === "system") {
            setCurrentTheme("system");
        } else if (theme === "dark") {
            setCurrentTheme("dark");
        } else if (theme === "light") {
            setCurrentTheme("light");
        }
    }, [theme]);

    return (
        <ToggleGroup type="single" variant="outline" className="scale-90 rounded-full border p-1" value={currentTheme}>
            <ToggleGroupItem
                value="light"
                onClick={() => setTheme("light")}
                disabled={theme === "light" ? true : false}
                className="rounded-full disabled:bg-accent disabled:opacity-100"
            >
                <Sun02Icon className="h-5 w-5" />
            </ToggleGroupItem>
            <ToggleGroupItem
                value="system"
                onClick={() => setTheme("system")}
                disabled={theme === "system" ? true : false}
                className="rounded-full disabled:bg-accent disabled:opacity-100"
            >
                <ComputerIcon className="h-5 w-5" />
            </ToggleGroupItem>
            <ToggleGroupItem
                value="dark"
                onClick={() => setTheme("dark")}
                disabled={theme === "dark" ? true : false}
                className="rounded-full disabled:bg-accent disabled:opacity-100"
            >
                <Moon02Icon className="h-5 w-5" />
            </ToggleGroupItem>
        </ToggleGroup>
    )
}