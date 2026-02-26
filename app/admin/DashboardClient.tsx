'use client';

import { useState, useRef } from 'react';
import { Article } from '@/lib/articles';
import { Trash2, UploadCloud, FileText, Loader2, Sparkles, AlertCircle, ArrowUpRight, Search, FileUp, Database, CheckCircle2, ScanFace } from 'lucide-react';
import './admin.css';

export default function DashboardClient({ initialArticles }: { initialArticles: Article[] }) {
    const [articles, setArticles] = useState<Article[]>(initialArticles);
    const [uploading, setUploading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [statusMessage, setStatusMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    // Manual Metadata States
    const [docTitle, setDocTitle] = useState('');
    const [docAbstract, setDocAbstract] = useState('');
    const [docTags, setDocTags] = useState('');

    // Niche Options
    const RESEARCH_LINES = [
        "Economía Global y Finanzas",
        "Geopolítica y Seguridad Internacional",
        "Gobernanza y Políticas Públicas",
        "Medio Ambiente y Sustentabilidad",
        "Tecnología e Innovación",
        "Documento Institucional"
    ];
    const [researchLine, setResearchLine] = useState(RESEARCH_LINES[0]);

    const fileInputRef = useRef<HTMLInputElement>(null);

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
            setDocTitle(selectedFile.name.replace(/\.[^/.]+$/, ""));
            setDocAbstract('');
            setDocTags('');
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
        formData.append('niche', researchLine);
        formData.append('title', docTitle);
        formData.append('abstract', docAbstract);
        formData.append('tags', docTags);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();
            if (data.success && data.article) {
                setArticles([data.article, ...articles]);
                setFile(null);
                setDocTitle('');
                setDocAbstract('');
                setDocTags('');
                if (fileInputRef.current) fileInputRef.current.value = '';
                setUploadStatus('success');
                setStatusMessage('Documento subido correctamente a la nube.');
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
        <div className="center-column" style={{ width: '100%', maxWidth: '1280px', margin: '0 auto' }}>

            <div className="dash-hero" style={{ padding: '2rem' }}>
                <div className="hero-glow"></div>
                <div className="badge-secure" style={{ marginBottom: 0 }}>
                    <ScanFace size={16} />
                    Sistema Central Activo
                </div>
            </div>

            <div className="dashboard-grid">

                {/* Left Column: Drag & Drop */}
                <div className="dash-left">
                    <div className="extraction-card">
                        <div className="ext-header">
                            <div className="ext-icon-wrapper">
                                <UploadCloud size={28} />
                            </div>
                            <h2 className="ext-title">Zona de Extracción</h2>
                            <p className="ext-sub">Deposite los archivos de investigación aquí</p>
                        </div>

                        <div
                            className={`drag-zone ${isDragging ? 'dragging' : ''} ${file ? 'has-file' : ''}`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() => !file && fileInputRef.current?.click()}
                        >
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                onChange={handleFileChange}
                            />

                            {file ? (
                                <div className="center-column" style={{ width: '100%', maxWidth: '420px', padding: '1rem 0' }}>

                                    {/* Document Icon Header */}
                                    <div className="doc-ui-filled" style={{ height: '7rem', marginBottom: '1rem' }}>
                                        <div className="doc-header"></div>
                                        <div className="center-column" style={{ height: '100%' }}>
                                            <FileText size={32} color="#10b981" />
                                        </div>
                                    </div>
                                    <p className="file-name" style={{ marginBottom: '0.2rem' }}>{file.name}</p>
                                    <p className="file-size" style={{ marginBottom: '1.5rem' }}>{(file.size / 1024 / 1024).toFixed(2)} MB asignados</p>

                                    {/* Manual Metadata Form */}
                                    <div className="input-group" style={{ marginBottom: '1rem', width: '100%' }}>
                                        <select
                                            className="login-input"
                                            style={{ paddingLeft: '1rem', backgroundColor: '#f8fafc', color: '#334155', border: '2px solid #e2e8f0', textAlign: 'left' }}
                                            value={researchLine}
                                            onChange={(e) => setResearchLine(e.target.value)}
                                            disabled={uploading}
                                        >
                                            {RESEARCH_LINES.map(line => (
                                                <option key={line} value={line}>{line}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="input-group" style={{ marginBottom: '1rem', width: '100%' }}>
                                        <input
                                            type="text"
                                            className="login-input"
                                            placeholder="Título Final (Obligatorio)"
                                            value={docTitle}
                                            onChange={(e) => setDocTitle(e.target.value)}
                                            disabled={uploading}
                                            required
                                            style={{ backgroundColor: '#f8fafc', color: '#334155', border: '2px solid #e2e8f0', width: '100%', textAlign: 'left', paddingLeft: '1rem' }}
                                        />
                                    </div>

                                    <div className="input-group" style={{ marginBottom: '1rem', width: '100%' }}>
                                        <textarea
                                            className="login-input"
                                            placeholder="Resumen del documento..."
                                            value={docAbstract}
                                            onChange={(e) => setDocAbstract(e.target.value)}
                                            disabled={uploading}
                                            style={{ backgroundColor: '#f8fafc', color: '#334155', border: '2px solid #e2e8f0', width: '100%', textAlign: 'left', paddingLeft: '1rem', minHeight: '80px', resize: 'vertical' }}
                                        />
                                    </div>

                                    <div className="input-group" style={{ marginBottom: '1.5rem', width: '100%' }}>
                                        <input
                                            type="text"
                                            className="login-input"
                                            placeholder="Etiquetas (ej. geopolítica, mexico, 2024)"
                                            value={docTags}
                                            onChange={(e) => setDocTags(e.target.value)}
                                            disabled={uploading}
                                            style={{ backgroundColor: '#f8fafc', color: '#334155', border: '2px solid #e2e8f0', width: '100%', textAlign: 'left', paddingLeft: '1rem' }}
                                        />
                                    </div>

                                    {/* Action Buttons */}
                                    <button
                                        onClick={(e) => { e.stopPropagation(); if (docTitle.trim() === '') { alert('El título es obligatorio'); return; } handleUpload(); }}
                                        disabled={uploading}
                                        className="btn-process"
                                    >
                                        {uploading ? (
                                            <><Loader2 size={20} className="spin-icon" /> Subiendo Documento...</>
                                        ) : (
                                            <><UploadCloud size={20} /> ALMACENAR EN NUBE</>
                                        )}
                                    </button>
                                    <button onClick={(e) => { e.stopPropagation(); setFile(null); setUploadStatus('idle'); }} disabled={uploading} className="btn-discard">
                                        Descartar Selección
                                    </button>
                                </div>
                            ) : (
                                <div className="center-column">
                                    <div className="doc-ui-empty">
                                        <FileUp size={40} />
                                    </div>
                                    <p className="doc-text">Sube un Archivo</p>
                                    <p className="doc-sub">Arrastra aquí o haz clic para explorar</p>
                                    <div className="tags-row">
                                        <span className="tag-badge">PDF</span>
                                        <span className="tag-badge">DOCX</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {uploadStatus !== 'idle' && (
                            <div className={`status-box ${uploadStatus === 'success' ? 'status-success' : 'status-error'}`}>
                                {uploadStatus === 'success' ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
                                <span>{statusMessage}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Database list */}
                <div className="dash-right">
                    <div className="db-card">
                        <div className="db-toolbar">
                            <div className="db-count">
                                <Database size={14} />
                                <span>{articles.length}</span>
                            </div>
                            <h2 className="db-title">Base de Datos</h2>
                            <p className="db-sub">Búsqueda y gestión de los artículos indexados</p>

                            <div className="search-box">
                                <div className="search-icon"><Search size={20} /></div>
                                <input
                                    type="text"
                                    className="search-input"
                                    placeholder="Buscar por título o tag..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="db-list">
                            {filteredArticles.length === 0 ? (
                                <div className="empty-state">
                                    <div className="empty-icon">
                                        <Database size={32} color="#cbd5e1" />
                                    </div>
                                    <p className="empty-title">Base de Datos Vacía</p>
                                    <p className="empty-sub">Esperando ingresos. Usa la zona de extracción a la izquierda.</p>
                                </div>
                            ) : (
                                filteredArticles.map((article) => (
                                    <div key={article.slug} className="article-card">
                                        <div className="center-column" style={{ width: '100%' }}>
                                            <div className="article-meta">
                                                <span className="article-type">{article.niche}</span>
                                                <span className="article-date">{new Date(article.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                            </div>
                                            <h3 className="article-title">{article.title}</h3>
                                            <p className="article-abstract">{article.abstract}</p>

                                            <div className="article-tags">
                                                {article.tags.split(',').slice(0, 5).map((tag, i) => (
                                                    <span key={i} className="article-tag">#{tag.trim()}</span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="article-actions">
                                            <a href={article.fileUrl} target="_blank" rel="noopener noreferrer" className="btn-view">
                                                Acceder a Nube <ArrowUpRight size={16} />
                                            </a>
                                            <button onClick={() => handleDelete(article.slug, article.fileUrl)} className="btn-delete" title="Eliminar de BD y Storage">
                                                <Trash2 size={16} /> Eliminar
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
