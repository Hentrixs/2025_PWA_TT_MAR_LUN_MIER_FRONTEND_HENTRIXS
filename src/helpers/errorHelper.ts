export interface AppError {
    message: string;
    status: number;
    ok: boolean;
}

export const parseError = (error: any): AppError => {
    // Si ya es un objeto AppError formateado por nosotros antes
    if (error && typeof error.ok === 'boolean') {
        return error;
    }

    // Errores de respuesta de la API (si el fetch devuelve un status de error)
    if (error && error.status) {
        return {
            message: error.message || 'Error del servidor.',
            status: error.status,
            ok: false
        };
    }

    // Errores de red o de código (JS errors)
    return {
        message: error.message || 'Ocurrió un error inesperado de red.',
        status: 500,
        ok: false
    };
};
