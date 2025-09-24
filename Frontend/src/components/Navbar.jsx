import { MenuIcon, User  } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSession, logout } from "../redux/slice/userSlice.js";
import { useEffect } from "react";
import { LogOut } from 'lucide-react';

const Navbar = () => {

    const dispatch = useDispatch();
    const { user, loading, error } = useSelector((state) => state.user);

    const handleClick = async () => {
        try {
            await dispatch(logout());
            console.log("Logged out");
        } catch (error) {
            console.error("Registration failed:", error);
            alert(error);
        }
    }

    return (
        <header className='text-white rounded-4xl m-auto mt-5 w-[80vw] fixed left-0 top-0 right-0 py-4 px-4 backdrop-blur-lg z-[100] flex items-center border-[1px] border-neutral-900 justify-between'>
            <aside className='flex items-center gap-[2px]'>
                <p className='text-3xl font-bold'></p>
                <Link to={'/'}>
                    CloudIDE
                </Link>
            </aside>
            <nav className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] hidden md:block">
                <ul className='flex items-center gap-4 list-none'>
                    <li>
                        <Link to="/aboutus">Aboutus</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                    <li>
                        <Link to="#">Documentation</Link>
                    </li>
                </ul>
            </nav>

            <aside className="flex items-center gap-4">

                <Link
                    to={`${user ? '/workspaces' : '/signin'}`}
                    className="relative inline-flex h-10 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                >
                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                        {user ? 'Workplaces' : 'Get Started'}
                    </span>
                </Link>
                <MenuIcon className="md:hidden" />
                {
                    user && (
                        <div className="cursor-pointer flex flex-col">
                            <LogOut onClick={handleClick} />
                        </div>
                    )
                }
            </aside>
        </header>
    )
}

export default Navbar