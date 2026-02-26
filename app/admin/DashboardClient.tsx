'use client';

import { useState, useRef } from 'react';
import { Article } from '@/lib/articles';
import { Trash2, UploadCloud, FileText, Loader2, Sparkles, AlertCircle, ArrowUpRight, Search, FileUp, Database, CheckCircle2, ScanFace } from 'lucide-react';

export default function DashboardClient({ initialArticles }: { initialArticles: Article[] }) {
    const [articles, setArticles] = useState<Article[]>(initialArticles);
    const [uploading, setUploading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [statusMessage, setStatusMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Filter Logic
    const filteredArticles = articles.filter(a =>
        a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.tags.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFileSelection(e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFileSelection(e.target.files[0]);
        }
    };

    const handleFileSelection = (selectedFile: File) => {
        const validTypes = [
            'application/pdf',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ];
        if (validTypes.includes(selectedFile.type) || selectedFile.name.endsWith('.docx') || selectedFile.name.endsWith('.pdf')) {
            setFile(selectedFile);
            setUploadStatus('idle');
            setStatusMessage('');
        } else {
            setUploadStatus('error');
            setStatusMessage('Formato no soportado. Sube un PDF o DOCX.');
            setTimeout(() => setUploadStatus('idle'), 4000);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setUploading(true);
        setUploadStatus('idle');
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();
            if (data.success && data.article) {
                setArticles([data.article, ...articles]);
                setFile(null);
                if (fileInputRef.current) fileInputRef.current.value = '';
                setUploadStatus('success');
                setStatusMessage('Indexación completada mágicamente.');
                setTimeout(() => setUploadStatus('idle'), 5000);
            } else {
                setUploadStatus('error');
                setStatusMessage(data.error || 'Error en el servidor AI.');
            }
        } catch (err) {
            setUploadStatus('error');
            setStatusMessage('Fallo en la conexión.');
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (slug: string, fileUrl: string) => {
        if (confirm('¿Proceder con la eliminación irreversible del documento en la base de datos y la nube de Vercel?')) {
            try {
                const res = await fetch('/api/articles/delete', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ slug, fileUrl }),
                });

                if (res.ok) {
                    setArticles(articles.filter((a) => a.slug !== slug));
                } else {
                    alert('Acción denegada por el servidor.');
                }
            } catch (error) {
                alert('No hay conexión con Postgres.');
            }
        }
    };

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700 ease-out font-sans flex flex-col items-center max-w-7xl mx-auto w-full">

            {/* Header / Hero - Centered and Dynamic Focus */}
            <div className="relative p-12 w-full rounded-[2.5rem] bg-gradient-to-b from-[#0a0f25] to-[#0d1430] overflow-hidden shadow-2xl border border-white/5 text-center flex flex-col items-center">
                {/* Decorative Elements - Centered Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none mix-blend-screen animate-pulse"></div>

                <div className="relative z-10 flex flex-col items-center gap-6 max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-bold tracking-[0.2em] uppercase mb-2">
                        <ScanFace className="w-4 h-4" />
                        Sistema Central Activo
                    </div>

                    <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-white tracking-tight mb-2 pb-2">
                        Inteligencia Operativa
                    </h1>

                    <p className="text-blue-200/60 font-medium text-lg max-w-2xl px-4">
                        Despliega tus publicaciones aquí y permite que nuestros motores de IA estructuren, clasifiquen e indexen la información instantáneamente.
                    </p>
                </div>
            </div>

            <div className="w-full flex flex-col lg:flex-row gap-8">

                {/* Left Column: Drag & Drop (Expanded logic) */}
                <div className="w-full lg:w-[45%] flex flex-col gap-6">
                    <div className="bg-white rounded-[2rem] p-6 sm:p-8 md:p-10 shadow-xl shadow-slate-200/40 border border-slate-200/60 h-full flex flex-col">
                        <div className="flex flex-col items-center text-center gap-3 mb-8">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg shadow-cyan-500/20 flex flex-col items-center justify-center text-white">
                                <UploadCloud className="w-7 h-7" />
                            </div>
                            <h2 className="text-2xl font-black text-slate-800 tracking-tight">Zona de Extracción</h2>
                            <p className="text-sm text-slate-500 font-medium">Deposite los archivos de investigación aquí</p>
                        </div>

                        <div
                            className={`flex-1 relative overflow-hidden group rounded-[2.5rem] border-2 border-dashed transition-all duration-500 ease-out ${isDragging
                                    ? 'border-cyan-500 bg-cyan-50/50 scale-[1.02] shadow-inner'
                                    : file
                                        ? 'border-emerald-400 bg-emerald-50/40'
                                        : 'border-slate-300 hover:border-cyan-400 hover:bg-slate-50'
                                } p-8 flex flex-col items-center justify-center text-center cursor-pointer min-h-[400px]`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() => !file && fileInputRef.current?.click()}
                        >
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                onChange={handleFileChange}
                            />

                            {file ? (
                                <div className="flex flex-col items-center animate-in zoom-in-95 duration-300 w-full max-w-xs mx-auto">
                                    {/* Beautiful Document UI format */}
                                    <div className="relative w-32 h-44 bg-white rounded-xl shadow-xl border border-slate-200 flex flex-col items-center justify-center mb-6 overflow-hidden transform group-hover:-translate-y-2 transition-transform duration-500">
                                        <div className="absolute top-0 inset-x-0 h-3 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
                                        <div className="absolute top-6 left-4 w-12 h-2 bg-slate-100 rounded-full"></div>
                                        <div className="absolute top-10 left-4 w-20 h-2 bg-slate-100 rounded-full"></div>
                                        <div className="absolute top-14 left-4 w-16 h-2 bg-slate-100 rounded-full"></div>
                                        <div className="absolute bottom-6 inset-x-6 h-12 bg-emerald-50 rounded-lg flex items-center justify-center border border-emerald-100/50">
                                            <FileText className="w-6 h-6 text-emerald-500" />
                                        </div>
                                    </div>

                                    <p className="text-lg font-bold text-slate-800 line-clamp-2 leading-tight mb-2 w-full">{file.name}</p>
                                    <p className="text-sm text-slate-500 font-semibold bg-white px-3 py-1 rounded-full border border-slate-200 mb-8 inline-block shadow-sm">
                                        {(file.size / 1024 / 1024).toFixed(2)} MB asignados
                                    </p>

                                    <div className="flex flex-col gap-3 w-full">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleUpload(); }}
                                            disabled={uploading}
                                            className="relative overflow-hidden w-full px-6 py-4 text-sm font-black text-white bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl shadow-lg shadow-emerald-500/20 hover:from-emerald-400 hover:to-teal-500 hover:-translate-y-0.5 transition-all disabled:opacity-80 disabled:cursor-wait flex justify-center items-center gap-2 group/btn"
                                        >
                                            {uploading ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                    Analizando Estructura...
                                                </>
                                            ) : (
                                                <>
                                                    <Sparkles className="w-5 h-5 text-emerald-100" />
                                                    PROCESAR DOCUMENTO
                                                </>
                                            )}
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setFile(null); setUploadStatus('idle'); }}
                                            className="w-full px-6 py-3 text-sm font-bold text-slate-400 hover:text-slate-800 bg-transparent hover:bg-slate-100 rounded-2xl transition-colors"
                                            disabled={uploading}
                                        >
                                            Descartar Selección
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center text-slate-400 group-hover:text-cyan-600 transition-colors w-full">
                                    {/* Empty Document Outline Template */}
                                    <div className="relative w-32 h-44 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center mb-8 group-hover:border-cyan-300 group-hover:bg-cyan-50/50 transition-colors duration-500 transform group-hover:scale-105 group-hover:-rotate-3">
                                        <FileUp className="w-10 h-10 text-slate-300 group-hover:text-cyan-500 group-hover:-translate-y-2 transition-all duration-500" />
                                    </div>
                                    <p className="text-2xl font-black text-slate-800 group-hover:text-cyan-700 mb-2">
                                        Sube un Archivo
                                    </p>
                                    <p className="text-sm font-medium text-slate-500">Arrastra aquí o haz clic para explorar</p>
                                    <div className="mt-8 flex gap-3">
                                        <span className="bg-white border border-slate-200 text-slate-500 text-xs font-black tracking-widest px-4 py-1.5 rounded-full shadow-sm">PDF</span>
                                        <span className="bg-white border border-slate-200 text-slate-500 text-xs font-black tracking-widest px-4 py-1.5 rounded-full shadow-sm">DOCX</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {uploadStatus !== 'idle' && (
                            <div className={`mt-6 p-4 rounded-2xl flex items-center justify-center text-center gap-3 animate-in fade-in slide-in-from-top-4 ${uploadStatus === 'success' ? 'bg-emerald-50 border border-emerald-100 text-emerald-800' : 'bg-red-50 border border-red-100 text-red-800'
                                }`}>
                                {uploadStatus === 'success' ? (
                                    <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                                ) : (
                                    <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                                )}
                                <p className="text-sm font-bold">{statusMessage}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Library */}
                <div className="w-full lg:w-[55%]">
                    <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/40 border border-slate-200/60 overflow-hidden flex flex-col h-full min-h-[600px] lg:min-h-[800px]">

                        {/* Toolbar Centered Layout */}
                        <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex flex-col items-center justify-center text-center gap-6 relative">
                            <div className="absolute top-4 right-6 flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1 rounded-full shadow-sm">
                                <Database className="w-3.5 h-3.5 text-cyan-500" />
                                <span className="text-xs font-bold text-slate-600">{articles.length}</span>
                            </div>

                            <div className="flex flex-col items-center gap-2">
                                <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                                    Base de Datos
                                </h2>
                                <p className="text-sm text-slate-500 font-medium">Búsqueda y gestión de los artículos indexados</p>
                            </div>

                            <div className="relative w-full max-w-md">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Search className="w-5 h-5 text-slate-400" />
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-12 pr-4 py-3 bg-white border-2 border-slate-200 rounded-2xl text-sm font-bold text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all text-center"
                                    placeholder="Buscar por título o tag..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* List Area */}
                        <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-4 bg-slate-50/20">
                            {filteredArticles.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-slate-400 p-8 text-center">
                                    <div className="p-8 bg-white shadow-sm border border-slate-100 rounded-[2rem] mb-6 transform rotate-3">
                                        <Database className="w-12 h-12 text-slate-300" />
                                    </div>
                                    <p className="text-xl font-black text-slate-600">Base de Datos Vacía</p>
                                    <p className="text-md mt-2 text-slate-500 max-w-xs">Esperando ingresos. Usa la zona de extracción a la izquierda.</p>
                                </div>
                            ) : (
                                filteredArticles.map((article) => (
                                    <div key={article.slug} className="group bg-white border border-slate-200/80 rounded-[1.5rem] p-6 hover:border-cyan-300 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 flex flex-col gap-5 items-center text-center">

                                        {/* Info Centered */}
                                        <div className="flex-1 min-w-0 flex flex-col items-center w-full">
                                            <div className="flex flex-wrap justify-center items-center gap-2 mb-3">
                                                <span className="px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase bg-cyan-50 text-cyan-600 border border-cyan-100">
                                                    {article.type}
                                                </span>
                                                <span className="px-3 py-1 rounded-full text-[11px] font-bold text-slate-500 bg-slate-50 border border-slate-100">
                                                    {new Date(article.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                                                </span>
                                            </div>

                                            <h3 className="text-lg font-black text-slate-800 line-clamp-2 mb-2 group-hover:text-cyan-600 transition-colors w-full px-4 text-balance">
                                                {article.title}
                                            </h3>

                                            <p className="text-sm font-medium text-slate-500 line-clamp-2 max-w-md bg-slate-50 p-3 rounded-xl border border-slate-100 w-full mb-4 leading-relaxed">
                                                {article.abstract}
                                            </p>

                                            {/* Tags */}
                                            <div className="flex flex-wrap justify-center gap-2 mt-auto w-full px-2">
                                                {article.tags.split(',').slice(0, 5).map((tag, i) => (
                                                    <span key={i} className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
                                                        #{tag.trim()}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Actions Centered Bottom */}
                                        <div className="flex justify-center items-center gap-3 w-full pt-5 border-t border-slate-100">
                                            <a
                                                href={article.fileUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 flex justify-center items-center gap-2 px-6 py-3 bg-cyan-600 text-white text-sm font-black rounded-xl hover:bg-cyan-700 transition-colors shadow-md shadow-cyan-600/20"
                                            >
                                                Acceder a Nube
                                                <ArrowUpRight className="w-4 h-4" />
                                            </a>
                                            <button
                                                onClick={() => handleDelete(article.slug, article.fileUrl)}
                                                className="flex-none flex items-center justify-center px-6 py-3 bg-white border-2 border-slate-200 text-slate-500 text-sm font-bold rounded-xl hover:bg-red-50 hover:border-red-300 hover:text-red-500 transition-all"
                                                title="Eliminar de BD y Storage"
                                            >
                                                <Trash2 className="w-4 h-4 mr-2" />
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
