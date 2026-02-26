'use client';

import { useState, useRef } from 'react';
import { Article } from '@/lib/articles';
import { Trash2, UploadCloud, FileText, Loader2, FileUp, CheckCircle2, AlertCircle } from 'lucide-react';

export default function DashboardClient({ initialArticles }: { initialArticles: Article[] }) {
    const [articles, setArticles] = useState<Article[]>(initialArticles);
    const [uploading, setUploading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [statusMessage, setStatusMessage] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

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
            setStatusMessage('Formato no soportado. Solo PDF o DOCX.');
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
                setStatusMessage('¡Documento procesado e indexado con Inteligencia Artificial exitosamente!');
                setTimeout(() => setUploadStatus('idle'), 5000);
            } else {
                setUploadStatus('error');
                setStatusMessage(data.error || 'Error desconocido al procesar');
            }
        } catch (err) {
            setUploadStatus('error');
            setStatusMessage('Error de conexión al subir el archivo');
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (slug: string, fileUrl: string) => {
        if (confirm('¿Estás seguro de que deseas eliminar este archivo permanentemente? Esta acción no se puede deshacer.')) {
            try {
                const res = await fetch('/api/articles/delete', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ slug, fileUrl }),
                });

                if (res.ok) {
                    setArticles(articles.filter((a) => a.slug !== slug));
                } else {
                    alert('No se pudo borrar el artículo.');
                }
            } catch (error) {
                alert('Error de conexión al intentar borrar.');
            }
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">

            {/* Header Section */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Centro de Control</h1>
                    <p className="text-gray-500 mt-1">Gestiona tus publicaciones e indexa nuevos documentos con IA.</p>
                </div>
            </div>

            {/* Smart Upload Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="border-b border-gray-200 bg-gray-50/50 px-6 py-4">
                    <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        <UploadCloud className="w-5 h-5 text-blue-600" />
                        Indexador Inteligente
                    </h2>
                </div>

                <div className="p-6">
                    <div
                        className={`relative group rounded-xl border-2 border-dashed transition-all duration-300 ease-in-out ${isDragging
                                ? 'border-blue-500 bg-blue-50'
                                : file
                                    ? 'border-green-300 bg-green-50/30'
                                    : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                            } p-10 flex flex-col items-center justify-center text-center cursor-pointer min-h-[220px]`}
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
                                <FileText className="w-16 h-16 text-blue-500 mb-4" />
                                <p className="text-lg font-medium text-gray-900">{file.name}</p>
                                <p className="text-sm text-gray-500 mt-1 mb-6">
                                    {(file.size / 1024 / 1024).toFixed(2)} MB • Listo para análisis
                                </p>
                                <div className="flex gap-3">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setFile(null); setUploadStatus('idle'); }}
                                        className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                        disabled={uploading}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleUpload(); }}
                                        disabled={uploading}
                                        className="relative overflow-hidden px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-sm shadow-blue-600/20 hover:bg-blue-700 transition-all disabled:opacity-80 disabled:cursor-wait flex items-center gap-2"
                                    >
                                        {uploading ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Procesando IA
                                                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="w-2 h-2 rounded-full bg-blue-300 animate-pulse mr-1"></div>
                                                Iniciar Análisis
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center text-gray-500 group-hover:text-blue-600 transition-colors">
                                <div className="w-16 h-16 rounded-full bg-gray-100 group-hover:bg-blue-100 flex items-center justify-center mb-4 transition-colors">
                                    <FileUp className="w-8 h-8" />
                                </div>
                                <p className="text-lg font-medium text-gray-700 group-hover:text-blue-700 mb-1">
                                    Arrastra tu documento aquí
                                </p>
                                <p className="text-sm">o haz clic para explorar tus archivos</p>
                                <div className="mt-4 flex gap-2 text-xs font-medium text-gray-400">
                                    <span className="bg-gray-100 px-2 py-1 rounded">PDF</span>
                                    <span className="bg-gray-100 px-2 py-1 rounded">DOCX</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {uploadStatus !== 'idle' && (
                        <div className={`mt-4 p-4 rounded-xl flex items-start gap-3 animate-in slide-in-from-top-2 ${uploadStatus === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
                            }`}>
                            {uploadStatus === 'success' ? (
                                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            ) : (
                                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                            )}
                            <p className="text-sm font-medium leading-relaxed">{statusMessage}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Content Library */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mt-8">
                <div className="border-b border-gray-200 bg-gray-50/50 px-6 py-4 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-600" />
                        Biblioteca de Publicaciones
                    </h2>
                    <span className="bg-white border border-gray-200 text-gray-600 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
                        {articles.length} Documentos
                    </span>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Documento</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Tipo & Fecha</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Etiquetas IA</th>
                                <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Gestión</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {articles.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-16 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-400">
                                            <FileText className="w-12 h-12 mb-3 opacity-20" />
                                            <p className="text-base font-medium text-gray-500">Biblioteca vacía</p>
                                            <p className="text-sm mt-1">Sube tu primer documento usando el indexador de arriba.</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                articles.map((article) => (
                                    <tr key={article.slug} className="hover:bg-blue-50/50 transition-colors group">
                                        <td className="px-6 py-5">
                                            <div className="flex items-start">
                                                <div className="mt-1 mr-3 p-2 bg-blue-100/50 rounded-lg group-hover:bg-blue-200/50 transition-colors">
                                                    <FileText className="h-5 w-5 text-blue-600" />
                                                </div>
                                                <div>
                                                    <div className="text-sm font-semibold text-gray-900 line-clamp-2 max-w-sm mb-1 leading-snug" title={article.title}>
                                                        {article.title}
                                                    </div>
                                                    <div className="text-xs text-gray-500 line-clamp-1 max-w-sm" title={article.abstract}>
                                                        {article.abstract}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 whitespace-nowrap">
                                            <div className="flex flex-col gap-1.5">
                                                <span className="inline-flex w-fit items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                                                    {article.type}
                                                </span>
                                                <span className="text-xs text-gray-500 font-medium">
                                                    {new Date(article.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' })}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex flex-wrap gap-1 w-48">
                                                {article.tags.split(',').slice(0, 3).map((tag, i) => (
                                                    <span key={i} className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-gray-600 border border-gray-200">
                                                        {tag.trim()}
                                                    </span>
                                                ))}
                                                {article.tags.split(',').length > 3 && (
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-50 text-gray-400">
                                                        +{article.tags.split(',').length - 3}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <a
                                                    href={article.fileUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-md transition-colors"
                                                >
                                                    Abrir
                                                </a>
                                                <button
                                                    onClick={() => handleDelete(article.slug, article.fileUrl)}
                                                    className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-1.5 rounded-md transition-colors"
                                                    title="Eliminar permanentemente"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
