'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, Sparkles, ArrowRight, Loader2, ShieldCheck } from 'lucide-react';

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

            {/* Ambient Background Glows */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>

            <div className="relative z-10 w-full max-w-[420px] px-6 animate-in fade-in zoom-in-95 duration-700 ease-out">
                {/* Main Card */}
                <div className="relative overflow-hidden rounded-[2.5rem] bg-white/[0.02] border border-white/[0.05] p-10 shadow-2xl backdrop-blur-2xl">

                    {/* Inner subtle glow line on top edge */}
                    <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"></div>

                    {/* Header */}
                    <div className="text-center mb-10 mt-2">
                        <div className="relative inline-flex mb-6 group">
                            <div className="absolute inset-0 bg-blue-500 rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
                            <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-b from-blue-400 to-indigo-600 shadow-inner border border-white/20 text-white">
                                <Sparkles className="w-8 h-8 drop-shadow-md" />
                            </div>
                        </div>
                        <h1 className="text-3xl font-extrabold text-white tracking-tight">Access Control</h1>
                        <p className="text-blue-200/60 mt-2 text-sm font-medium">Panel Maestro de Vértice CMS</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-5">
                            {/* Username Input */}
                            <div className="group relative">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-blue-200/40 group-focus-within:text-blue-400 transition-colors duration-300">
                                    <User className="w-[18px] h-[18px]" />
                                </div>
                                <input
                                    type="text"
                                    required
                                    className="block w-full pl-12 pr-4 py-4 bg-black/20 border border-white/5 rounded-2xl text-white placeholder-blue-200/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 font-medium text-[15px]"
                                    placeholder="Usuario"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>

                            {/* Password Input */}
                            <div className="group relative">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-blue-200/40 group-focus-within:text-blue-400 transition-colors duration-300">
                                    <Lock className="w-[18px] h-[18px]" />
                                </div>
                                <input
                                    type="password"
                                    required
                                    className="block w-full pl-12 pr-4 py-4 bg-black/20 border border-white/5 rounded-2xl text-white placeholder-blue-200/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 font-medium tracking-wider text-[15px]"
                                    placeholder="Contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="animate-in slide-in-from-top-2 fade-in duration-300 bg-red-500/10 border border-red-500/20 text-red-400 text-sm py-3 px-4 rounded-xl flex items-center justify-center">
                                {error}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="relative w-full overflow-hidden rounded-2xl group mt-2"
                        >
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-indigo-600 opacity-90 group-hover:opacity-100 transition-opacity duration-300"></span>
                            {/* Shine effect */}
                            <span className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] group-hover:left-[200%] transition-all duration-700 ease-out"></span>

                            <div className="relative flex items-center justify-center gap-2 py-4 px-4 text-sm font-bold text-white tracking-wide">
                                {isLoading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        Entrar al Panel
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                                    </>
                                )}
                            </div>
                        </button>
                    </form>

                    {/* Footer Badge */}
                    <div className="mt-10 flex items-center justify-center gap-2 text-xs text-blue-200/40 font-medium">
                        <ShieldCheck className="w-4 h-4" />
                        Conexión Encriptada
                    </div>
                </div>
            </div>
        </div>
    );
}
