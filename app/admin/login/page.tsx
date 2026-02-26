'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, Sparkles, ArrowRight, Loader2, ShieldCheck, Fingerprint } from 'lucide-react';
import '../admin.css';

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
        <div className="admin-viewport admin-font">
            <div className="glow-background">
                <div className="glow-blue"></div>
                <div className="glow-cyan"></div>
            </div>

            <div className="center-column" style={{ zIndex: 10 }}>
                <div className="badge-secure">
                    <ShieldCheck size={16} />
                    Portal Seguro
                </div>

                <div className="glass-login-card">
                    <div className="glow-line-top"></div>

                    <div className="icon-box-wrapper">
                        <div className="icon-box-glow"></div>
                        <div className="icon-box">
                            <Fingerprint size={40} />
                        </div>
                    </div>

                    <h1 className="title-login">
                        Acceso <span>Maestro</span>
                    </h1>
                    <p className="subtitle-login">
                        Identifíquese para ingresar al Centro de Control CMS.
                    </p>

                    <form onSubmit={handleLogin} className="center-column" style={{ width: '100%' }}>
                        <div className="input-container">
                            <div className="input-group">
                                <div className="input-icon">
                                    <User size={18} />
                                </div>
                                <input
                                    type="text"
                                    required
                                    className="login-input"
                                    placeholder="Usuario"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>

                            <div className="input-group">
                                <div className="input-icon">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type="password"
                                    required
                                    className="login-input password"
                                    placeholder="Contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="error-message">
                                {error}
                            </div>
                        )}

                        <button type="submit" disabled={isLoading} className="btn-submit">
                            <div className="btn-bg"></div>
                            <div className="btn-content">
                                {isLoading ? (
                                    <Loader2 size={20} className="spin-icon" />
                                ) : (
                                    <>
                                        Verificar Identidad
                                        <ArrowRight size={16} />
                                    </>
                                )}
                            </div>
                        </button>
                    </form>

                    <div className="footer-secure">
                        <div className="footer-dot"></div>
                        <span className="footer-text">Conexión Encriptada ISO-27001</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
