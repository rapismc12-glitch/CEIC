'use client';

import { useState, useRef } from 'react';
import { Article } from '@/lib/articles';
import { Trash2, UploadCloud, FileText, Loader2, Sparkles, AlertCircle, ArrowUpRight, Search, FileUp, Database, CheckCircle2 } from 'lucide-react';

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
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700 ease-out font-sans">

            {/* Header / Hero */}
            <div className="relative p-8 rounded-[2rem] bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 overflow-hidden shadow-2xl border border-white/10">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none mix-blend-screen"></div>
                <div className="absolute bottom-[-100px] left-[-50px] w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-blue-200 text-xs font-semibold tracking-wider mb-4">
                            <Sparkles className="w-3.5 h-3.5" />
                            AI CONTENT MANAGER
                        </div>
                        <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">Centro de Operaciones</h1>
                        <p className="text-blue-100/70 font-medium max-w-xl">
                            Arrastra tus publicaciones y permite que la Inteligencia Artificial extraiga metadatos, resúmenes y etiquetas automáticamente.
                        </p>
                    </div>

                    <div className="flex bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md items-center gap-4">
                        <div className="p-3 bg-blue-500/20 rounded-xl text-blue-300">
                            <Database className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-white text-2xl font-bold">{articles.length}</p>
                            <p className="text-blue-200/60 text-xs font-medium uppercase tracking-wider">Archivos en Nube</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Drag & Drop (Takes 1 column) */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-200/60">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                                <UploadCloud className="w-5 h-5" />
                            </div>
                            <h2 className="text-lg font-bold text-slate-800">Indexador</h2>
                        </div>

                        <div
                            className={`relative overflow-hidden group rounded-3xl border-2 border-dashed transition-all duration-300 ease-in-out ${isDragging
                                ? 'border-indigo-500 bg-indigo-50/50 scale-[1.02]'
                                : file
                                    ? 'border-emerald-300 bg-emerald-50/30'
                                    : 'border-slate-300 hover:border-indigo-400 hover:bg-slate-50'
                                } p-8 flex flex-col items-center justify-center text-center cursor-pointer min-h-[300px]`}
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
                                <div className="flex flex-col items-center animate-in zoom-in-95 duration-200">
                                    <div className="w-20 h-20 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mb-4">
                                        <FileText className="w-10 h-10 text-indigo-500" />
                                    </div>
                                    <p className="text-base font-bold text-slate-800 line-clamp-1 max-w-[200px]">{file.name}</p>
                                    <p className="text-xs text-slate-500 mt-1 mb-8 font-medium">
                                        {(file.size / 1024 / 1024).toFixed(2)} MB asignados
                                    </p>
                                    <div className="flex flex-col gap-3 w-full">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleUpload(); }}
                                            disabled={uploading}
                                            className="relative overflow-hidden w-full px-4 py-3 text-sm font-bold text-white bg-indigo-600 rounded-xl shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all disabled:opacity-80 disabled:cursor-wait flex justify-center items-center gap-2 group/btn"
                                        >
                                            {uploading ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                    IA Trabajando...
                                                </>
                                            ) : (
                                                <>
                                                    <Sparkles className="w-4 h-4 text-indigo-200" />
                                                    Escanear & Subir
                                                    <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                                </>
                                            )}
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setFile(null); setUploadStatus('idle'); }}
                                            className="w-full px-4 py-3 text-sm font-semibold text-slate-600 hover:text-slate-900 bg-transparent hover:bg-slate-100 rounded-xl transition-colors"
                                            disabled={uploading}
                                        >
                                            Descartar
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center text-slate-400 group-hover:text-indigo-600 transition-colors">
                                    <div className="w-20 h-20 rounded-full bg-slate-100 group-hover:bg-indigo-100 flex items-center justify-center mb-6 transition-colors shadow-inner">
                                        <FileUp className="w-8 h-8 group-hover:-translate-y-1 transition-transform duration-300" />
                                    </div>
                                    <p className="text-base font-bold text-slate-700 group-hover:text-indigo-700 mb-2">
                                        Sube un Documento
                                    </p>
                                    <p className="text-xs font-medium text-slate-500">Arrastra aquí o haz clic</p>
                                    <div className="mt-6 flex gap-2">
                                        <span className="bg-white border border-slate-200 text-slate-600 text-[10px] font-bold px-3 py-1 rounded-full shadow-sm">PDF</span>
                                        <span className="bg-white border border-slate-200 text-slate-600 text-[10px] font-bold px-3 py-1 rounded-full shadow-sm">DOCX</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {uploadStatus !== 'idle' && (
                            <div className={`mt-4 p-4 rounded-2xl flex items-start gap-3 animate-in fade-in slide-in-from-top-4 ${uploadStatus === 'success' ? 'bg-emerald-50 border border-emerald-100 text-emerald-800' : 'bg-red-50 border border-red-100 text-red-800'
                                }`}>
                                {uploadStatus === 'success' ? (
                                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                                ) : (
                                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                                )}
                                <p className="text-sm font-medium">{statusMessage}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Library (Takes 2 columns) */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200/60 overflow-hidden flex flex-col h-[calc(100vh-[400px])] min-h-[600px]">

                        {/* Toolbar */}
                        <div className="p-6 border-b border-slate-100 bg-slate-50/30 flex flex-col sm:flex-row justify-between items-center gap-4">
                            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-3">
                                Biblioteca Privada
                            </h2>
                            <div className="relative w-full sm:w-72">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="w-4 h-4 text-slate-400" />
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                    placeholder="Buscar por título o etiqueta..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* List Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            {filteredArticles.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-slate-400 p-8">
                                    <div className="p-6 bg-slate-50 rounded-full mb-4">
                                        <Search className="w-8 h-8 text-slate-300" />
                                    </div>
                                    <p className="text-lg font-bold text-slate-600">Ningún archivo coincide</p>
                                    <p className="text-sm mt-1 text-slate-500 text-center">La base de datos está vacía o la búsqueda no arrojó resultados.</p>
                                </div>
                            ) : (
                                filteredArticles.map((article) => (
                                    <div key={article.slug} className="group bg-white border border-slate-100 rounded-2xl p-5 hover:border-indigo-100 hover:shadow-md hover:shadow-indigo-500/5 transition-all duration-300 flex flex-col sm:flex-row gap-5 items-start sm:items-center">

                                        {/* Icon */}
                                        <div className="hidden sm:flex flex-shrink-0 w-12 h-12 bg-indigo-50/50 rounded-xl items-center justify-center group-hover:bg-indigo-100 transition-colors">
                                            <FileText className="w-6 h-6 text-indigo-500" />
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-wrap items-center gap-2 mb-1.5">
                                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-slate-100 text-slate-600">
                                                    {article.type}
                                                </span>
                                                <span className="text-[11px] font-medium text-slate-400">
                                                    {new Date(article.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' })}
                                                </span>
                                            </div>
                                            <h3 className="text-base font-bold text-slate-800 line-clamp-1 mb-1 group-hover:text-indigo-700 transition-colors">
                                                {article.title}
                                            </h3>
                                            <p className="text-sm text-slate-500 line-clamp-1 border-l-2 border-slate-200 pl-2">
                                                {article.abstract}
                                            </p>

                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-1.5 mt-3">
                                                {article.tags.split(',').slice(0, 4).map((tag, i) => (
                                                    <span key={i} className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-indigo-50 text-indigo-600">
                                                        #{tag.trim()}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex sm:flex-col gap-2 w-full sm:w-auto mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-0 border-slate-100 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                                            <a
                                                href={article.fileUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
                                            >
                                                Ver
                                                <ArrowUpRight className="w-3.5 h-3.5" />
                                            </a>
                                            <button
                                                onClick={() => handleDelete(article.slug, article.fileUrl)}
                                                className="flex-none flex items-center justify-center px-4 py-2 bg-white border border-red-200 text-red-600 text-xs font-bold rounded-xl hover:bg-red-50 hover:border-red-300 transition-colors"
                                                title="Eliminar de BD y Storage"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
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
