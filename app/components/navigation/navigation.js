'use client';

// Importera usePathname för att läsa av den nuvarande URL:en
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const Navigation = () => {
    // Istället för usePathname, läser vi av fönstrets sökväg.
    // Vi använder state för att säkerställa att komponenten renderar om när värdet är tillgängligt.
    const [pathname, setPathname] = useState('');

    useEffect(() => {
        // Denna kod körs bara på klientsidan där 'window' finns.
        if (typeof window !== 'undefined') {
            setPathname(window.location.pathname);
        }
    }, []);

    const getLinkClassName = (path) => {
        const isActive = pathname === path;
        return `
            px-8 py-3 rounded-full text-lg font-semibold transition-colors duration-300
            ${isActive
                // Stil för aktiv knapp (matchar progressbarens pilar)
                ? 'bg-[var(--black)] text-[var(--white)] shadow-md'
                // Stil för inaktiv knapp (mjukare design utan hård ram)
                : 'bg-white/60 text-[var(--black)]'
            }
            hover:bg-[var(--accent-dark)] hover:text-[var(--white)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-light)] focus:ring-opacity-75
        `;
    };

    return (
        <nav className="w-full flex justify-center py-4">
            {/* Behållaren har en subtil bakgrund och skugga för att passa in */}
            <div className="flex space-x-2 bg-gray-200/70 backdrop-blur-sm p-2 rounded-full shadow-lg">
                {/* Ersätter Next.js <Link> med vanliga <a>-taggar */}
                <a href="/" className={getLinkClassName('/')}>
                    Quiz
                </a>
                <a href="/sparade" className={getLinkClassName('/sparade')}>
                    Sparade
                </a>
            </div>
        </nav>
    );
};

export default Navigation;