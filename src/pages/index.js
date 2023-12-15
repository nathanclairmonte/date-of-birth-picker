import { Inter } from "next/font/google";
import DateOfBirthPicker from "@/components/DateOfBirthPicker";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    return (
        <main
            className={`flex -mt-48 min-h-screen flex-col items-center justify-center p-24 ${inter.className}`}
        >
            <DateOfBirthPicker />
        </main>
    );
}
