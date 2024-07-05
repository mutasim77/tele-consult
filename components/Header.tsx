import { blockStyle } from "@/lib/styles";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Header() {
    return (
        <header className="w-full sticky top-0 !z-50 bg-lighter dark:bg-darker rounded-b-3xl sm:backdrop-blur-md sm:!bg-opacity-90 pt-5 mt-4">
            <div className={`${blockStyle} px-3 py-4 justify-start shadow-md`}>
                <div className="text-light-text dark:text-dark-text font-bold">Tele<span className="text-button-primary">Consult</span></div>
                <ThemeSwitcher />
            </div>
        </header>
    )
}