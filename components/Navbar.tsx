import { DollarSign, FileText, Home, Settings, Users } from 'lucide-react'; // O tus iconos preferidos
import React from 'react';

const Navbar = () => {
    const menuItems = [
        { name: 'Inicio', icon: <Home size={24} />, href: '/' },
        { name: 'Empleados', icon: <Users size={24} />, href: '/employees' },
        { name: 'Nómina', icon: <DollarSign size={24} />, href: '/payroll' },
        { name: 'Reportes', icon: <FileText size={24} />, href: '/reports' },
        { name: 'Ajustes', icon: <Settings size={24} />, href: '/settings' },
    ];

    return (
        <>
            {/* --- SIDEBAR (Desktop y Tablet Horizontal) --- */}
            {/* Se esconde en móvil (hidden) y se muestra desde 'lg' (desktop) */}
            <aside className="hidden lg:flex flex-col w-64 h-screen bg-slate-900 text-white fixed left-0 top-0 p-4">
                <div className="text-2xl font-bold mb-10 px-2 text-blue-400">Kin ERP</div>
                <nav className="flex-1 space-y-2">
                    {menuItems.map((item) => (
                        <a key={item.name} href={item.href} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors">
                            {item.icon}
                            <span>{item.name}</span>
                        </a>
                    ))}
                </nav>
            </aside>

            {/* --- BOTTOM BAR (Mobile y Tablet Vertical) --- */}
            {/* Se muestra en móvil y se esconde en 'lg' (desktop) */}
            <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around items-center p-2 pb-safe shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-50">
                {menuItems.map((item) => (
                    <a key={item.name} href={item.href} className="flex flex-col items-center p-2 text-slate-600 active:text-blue-600">
                        {item.icon}
                        <span className="text-[10px] mt-1 font-medium">{item.name}</span>
                    </a>
                ))}
            </nav>
        </>
    );
};

export default Navbar;