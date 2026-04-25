export interface AppError {
    message: string;
    status: number;
    ok: boolean;
}

export const parseError = (error: unknown): AppError => {
    if (error && typeof error === 'object') {
        const err = error as Record<string, unknown>;
        // Si ya es un objeto AppError formateado por nosotros antes
        if (typeof err.ok === 'boolean') {
            return error as AppError;
        }
        // Errores de respuesta de la API con status
        if (err.status) {
            return {
                message: typeof err.message === 'string' ? err.message : 'Error del servidor.',
                status: typeof err.status === 'number' ? err.status : 500,
                ok: false
            };
        }
    }
    // Errores de red o de código (JS errors)
    return {
        message: error instanceof Error ? error.message : 'Ocurrió un error inesperado de red.',
        status: 500,
        ok: false
    };
};
