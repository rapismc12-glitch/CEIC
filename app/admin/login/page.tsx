'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, Sparkles, ArrowRight, Loader2, ShieldCheck, Fingerprint } from 'lucide-react';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (res.ok) {
                router.push('/admin');
            } else {
                setError('Acceso denegado. Verifica las credenciales.');
            }
        } catch (err) {
            setError('Error de conexión. Intente más tarde.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#070b19] relative overflow-hidden font-sans">

            {/* Ambient Background Glows - Centered and Dynamic */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[150px] animate-pulse"></div>
                <div className="absolute w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] mix-blend-screen animation-delay-2000 animate-pulse"></div>
            </div>

            <div className="relative z-10 w-full max-w-[460px] px-6 animate-in fade-in zoom-in-95 duration-700 ease-out flex flex-col items-center">

                {/* Floating Top Security Badge */}
                <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-bold tracking-widest uppercase backdrop-blur-md">
                    <ShieldCheck className="w-4 h-4" />
                    Portal Seguro
                </div>

                {/* Main Card */}
                <div className="w-full relative overflow-hidden rounded-[2.5rem] bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.08] p-10 shadow-2xl backdrop-blur-2xl text-center">

                    {/* Inner subtle glow line on top edge */}
                    <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>

                    {/* Header */}
                    <div className="mb-10 flex flex-col items-center">
                        <div className="relative inline-flex mb-6 group">
                            <div className="absolute inset-0 bg-cyan-500 rounded-3xl blur-xl opacity-40 group-hover:opacity-70 transition-opacity duration-500 animate-pulse"></div>
                            <div className="relative flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-600 shadow-inner border border-white/20 text-white transform group-hover:scale-105 transition-transform duration-500">
                                <Fingerprint className="w-10 h-10 drop-shadow-lg" />
                            </div>
                        </div>
                        <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2 text-center">
                            Acceso <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Maestro</span>
                        </h1>
                        <p className="text-blue-200/60 text-sm font-medium text-center px-4">
                            Identifíquese para ingresar al Centro de Control CMS.
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6 w-full text-left">
                        <div className="space-y-5">
                            {/* Username Input */}
                            <div className="group relative">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-cyan-200/40 group-focus-within:text-cyan-400 transition-colors duration-300">
                                    <User className="w-[18px] h-[18px]" />
                                </div>
                                <input
                                    type="text"
                                    required
                                    className="block w-full pl-12 pr-4 py-4 bg-black/30 border border-white/10 rounded-2xl text-center text-white placeholder-cyan-200/30 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all duration-300 font-medium text-[15px]"
                                    placeholder="Usuario"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>

                            {/* Password Input */}
                            <div className="group relative">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-cyan-200/40 group-focus-within:text-cyan-400 transition-colors duration-300">
                                    <Lock className="w-[18px] h-[18px]" />
                                </div>
                                <input
                                    type="password"
                                    required
                                    className="block w-full pl-12 pr-4 py-4 bg-black/30 border border-white/10 rounded-2xl text-center text-white placeholder-cyan-200/30 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all duration-300 font-medium tracking-[0.3em] text-[15px]"
                                    placeholder="Contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="animate-in slide-in-from-top-2 fade-in duration-300 bg-red-500/10 border border-red-500/30 text-red-400 text-sm py-3 px-4 rounded-xl flex items-center justify-center text-center font-medium shadow-inner">
                                {error}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="relative w-full overflow-hidden rounded-2xl group mt-4 h-14"
                        >
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-500 to-blue-600 opacity-90 group-hover:opacity-100 transition-opacity duration-300"></span>
                            {/* Shine effect */}
                            <span className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg] group-hover:left-[200%] transition-all duration-700 ease-out"></span>

                            <div className="relative flex items-center justify-center gap-3 py-4 px-4 text-sm font-bold text-white tracking-widest uppercase h-full">
                                {isLoading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        Verificar Identidad
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                                    </>
                                )}
                            </div>
                        </button>
                    </form>

                    {/* Footer Lock */}
                    <div className="mt-10 flex flex-col items-center justify-center gap-1">
                        <div className="w-1 h-1 rounded-full bg-cyan-500 mb-2"></div>
                        <p className="text-[10px] text-cyan-200/30 font-bold tracking-[0.2em] uppercase">
                            Conexión Encriptada ISO-27001
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
