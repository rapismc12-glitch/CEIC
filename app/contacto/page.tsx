"use client";

import { useState } from 'react';
import styles from './ContactForm.module.css';

const areasDeInteres = {
    "Geopolítica contemporánea": "Análisis de dinámicas de poder y relaciones internacionales actuales.",
    "Economía internacional": "Estudio de comercio, integración económica y tendencias globales.",
    "Cooperación y desarrollo internacional": "Evaluación de políticas y mecanismos de cooperación global.",
    "Gobernanza global": "Investigación sobre instituciones multilaterales y arquitectura internacional.",
    "Políticas públicas y seguridad internacional": "Análisis de políticas nacionales e internacionales que impactan la seguridad global."
};

export default function Contacto() {
    const [situacionAcademica, setSituacionAcademica] = useState("");
    const [areaSeleccionada, setAreaSeleccionada] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        const form = e.currentTarget;
        const formData = new FormData(form);

        try {
            const response = await fetch("https://formsubmit.co/ajax/saul95668@gmail.com", {
                method: "POST",
                body: formData
            });

            if (response.ok) {
                alert("Aplicación enviada con éxito. Nos pondremos en contacto pronto.");
                form.reset();
                setSituacionAcademica("");
                setAreaSeleccionada("");
            } else {
                alert("Hubo un error al enviar la aplicación. Por favor, inténtalo de nuevo directamente a nuestro correo.");
            }
        } catch (error) {
            alert("Error de conexión. Inténtalo más tarde.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container" style={{ padding: 'var(--space-8) 0' }}>

            {/* Título y descripción (estilo CIEM) */}
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: 'var(--space-2)' }}>Aplica para unirte al CEIC</h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--color-text-secondary)', maxWidth: '800px', margin: '0 auto' }}>
                    Buscamos talento comprometido con el desarrollo académico, el análisis riguroso y la innovación internacional. Completa el siguiente formulario para ser considerado en nuestras futuras incorporaciones.
                </p>
            </div>

            {/* Caja de Información / Criterios (estilo CIEM) */}
            <div className={styles.infoBox}>
                <h3>Criterios de Selección</h3>
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>
                    El CEIC evalúa las postulaciones con base en:
                </p>
                <ul>
                    <li>Interés académico genuino en temas internacionales</li>
                    <li>Compromiso y responsabilidad investigativa</li>
                    <li>Capacidad de análisis crítico y rigor metodológico</li>
                    <li>Claridad en la motivación personal</li>
                    <li>Disponibilidad de tiempo</li>
                    <li>Alineación con los valores de la Red Universitaria</li>
                </ul>
                <p style={{ fontWeight: 500, marginTop: 'var(--space-4)', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                    Al enviar esta solicitud, confirmas que la información proporcionada es verídica. Tus datos serán tratados de manera confidencial y utilizados exclusivamente para el proceso de selección institucional del CEIC.
                </p>
            </div>

            {/* Formulario contenedor principal */}
            <div className={styles.formContainer}>
                <form className="contactForm" onSubmit={handleSubmit}>
                    <input type="hidden" name="_subject" value="Nueva aplicación al CEIC" />
                    <input type="hidden" name="_captcha" value="false" />
                    <input type="hidden" name="_template" value="table" />

                    <div className={styles.formSection}>
                        <h2>Sección 1: Información General</h2>
                        {/* Grid row */}
                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label>Nombre completo *</label>
                                <input type="text" name="Nombre" required />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Correo electrónico *</label>
                                <input type="email" name="Correo" required />
                            </div>
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label>Número de contacto (Opcional)</label>
                                <input type="tel" name="Telefono" />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Ciudad / País *</label>
                                <input type="text" name="Ubicacion" required />
                            </div>
                        </div>
                    </div>

                    <div className={styles.formSection}>
                        <h2>Sección 2: Perfil Académico</h2>
                        <div className={styles.formGroupFull}>
                            <label>Situación académica *</label>
                            <select
                                name="Situacion_Academica"
                                required
                                value={situacionAcademica}
                                onChange={(e) => setSituacionAcademica(e.target.value)}
                            >
                                <option value="" disabled>Selecciona una opción</option>
                                <option value="Universitario en curso">Universitario en curso</option>
                                <option value="Universitario titulado">Universitario titulado</option>
                                <option value="Posgrado">Posgrado</option>
                                <option value="Otro">Otro</option>
                            </select>
                        </div>

                        {situacionAcademica === 'Universitario en curso' && (
                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label>Universidad *</label>
                                    <input type="text" name="Universidad" required />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Semestre *</label>
                                    <input type="text" name="Semestre" required />
                                </div>
                            </div>
                        )}

                        {(situacionAcademica === 'Universitario titulado' || situacionAcademica === 'Posgrado') && (
                            <div className={styles.formGroupFull}>
                                <label>Año de egreso *</label>
                                <input type="number" name="Anio_Egreso" required />
                            </div>
                        )}
                    </div>

                    <div className={styles.formSection}>
                        <h2>Sección 3: Área de Interés en CEIC</h2>
                        <div className={styles.formGroupFull}>
                            <label>¿En qué área deseas aplicar? *</label>
                            <select
                                name="Area_Interes"
                                required
                                value={areaSeleccionada}
                                onChange={(e) => setAreaSeleccionada(e.target.value)}
                            >
                                <option value="" disabled>Selecciona un área académica</option>
                                {Object.keys(areasDeInteres).map((area) => (
                                    <option key={area} value={area}>{area}</option>
                                ))}
                            </select>
                            {areaSeleccionada && (
                                <p style={{ marginTop: 'var(--space-2)', fontSize: '0.875rem', color: 'var(--color-primary)', backgroundColor: 'rgba(86, 18, 105, 0.05)', padding: 'var(--space-2)', borderRadius: '4px', borderLeft: '3px solid var(--color-primary)' }}>
                                    {areasDeInteres[areaSeleccionada as keyof typeof areasDeInteres]}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className={styles.formSection}>
                        <h2>Sección 4: Motivación</h2>
                        <div className={styles.formGroupFull}>
                            <label>Cuéntanos brevemente por qué deseas formar parte del CEIC *</label>
                            <textarea name="Motivacion" required></textarea>
                        </div>
                    </div>

                    <div className={styles.formSection}>
                        <h2>Sección 5: Experiencia Relevante (Opcional)</h2>
                        <div className={styles.formGroupFull}>
                            <textarea name="Experiencia" placeholder="Experiencia académica, proyectos, investigación o habilidades relevantes"></textarea>
                        </div>
                    </div>

                    <div className={styles.formSection}>
                        <h2>Sección 6: Disponibilidad de Tiempo</h2>
                        <div className={styles.formGroupFull}>
                            <label>Horas disponibles por semana *</label>
                            <input type="number" name="Horas_Disponibles" required min="1" />
                        </div>
                    </div>

                    <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                        {isSubmitting ? 'Enviando...' : 'Enviar aplicación'}
                    </button>
                </form>
            </div>

            {/* Información de contacto */}
            <div className={styles.contactInfo}>
                <p style={{ marginBottom: 'var(--space-2)' }}>
                    Para dudas o información adicional puedes contactar a la dirección del centro:
                </p>
                <ul>
                    <li><strong>Correo institucional:</strong> <a href="mailto:saul95668@gmail.com">saul95668@gmail.com</a></li>
                    <li><strong>Teléfono:</strong> <a href="tel:+522229084034">222 908 4034</a></li>
                </ul>
            </div>

        </div>
    );
}
