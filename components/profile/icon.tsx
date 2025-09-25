"use client"
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export function ProfileIcon() {
	return (
			<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button
					aria-label="Open user menu"
					className="rounded-full ring-1 ring-white/10 transition hover:ring-white/20"
				>
					<Avatar className="h-10 w-10">
						<AvatarImage src="/student-avatar.png" alt="Your profile avatar" />
						<AvatarFallback>YS</AvatarFallback>
					</Avatar>
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align="end"
				className="min-w-48 rounded-xl border border-white/10 bg-slate-900 p-1 text-[#E5E7EB] backdrop-blur-md"
			>
				<Link href="/profile">
					<DropdownMenuItem className="rounded-lg hover:bg-white/10 transition-colors cursor-pointer">Profile</DropdownMenuItem>
				</Link>
				<Link href="/notifications">
					<DropdownMenuItem className="rounded-lg hover:bg-white/10 transition-colors cursor-pointer">Notifications</DropdownMenuItem>
				</Link>
				<Link href="/dashboard">
					<DropdownMenuItem className="rounded-lg hover:bg-white/10 transition-colors cursor-pointer">Dashboard</DropdownMenuItem>
				</Link>
				<DropdownMenuSeparator className="my-1 bg-white/10" />
						<DropdownMenuItem
							className="w-full rounded-lg text-red-300 hover:bg-white/10 hover:text-red-200 transition-colors cursor-pointer"
							onClick={() => {
								/* signOut() placeholder */
							}}
						>
							Logout
						</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
