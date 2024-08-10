import Link from "next/link";
import Image from "next/image";
import { UserIcon } from "hugeicons-react";
import ThemeToggle from "@/components/theme-toggle";
import SelectSector from "@/components/common/SelectSector";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Header() {
    return (
        <header className="w-full bg-secondary/20 border-b">
            <div className="w-full max-w-[95vw] mx-auto">
                <div className="flex justify-between items-center">
                    <Link href="/" className="select-none flex">
                        <Image src="/cdn/logo/logoipsum-black.svg" alt="logo" width={192} height={50} className="p-4 dark:hidden" />
                        <Image src="/cdn/logo/logoipsum-white.svg" alt="logo" width={192} height={50} className="p-4 hidden dark:block" />
                    </Link>
                    <div className="flex gap-2 items-center">
                        <SelectSector />
                        <div className="max-sm:hidden sm:hidden md:block lg:block xl:block 2xl:block">
                            <ThemeToggle />
                        </div>
                        <Link href="https://github.com/Code-Parth" target="_blank">
                            <Avatar className="border">
                                <AvatarImage src="https://avatars.githubusercontent.com/u/84669955" alt="profile picture" />
                                <AvatarFallback>
                                    <UserIcon />
                                </AvatarFallback>
                            </Avatar>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
