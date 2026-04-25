
// Manejo de Errores Centralizado [PRE FETCH]
export const validateField = (value: string, rules: string[], allValues: unknown): string | null => {
    for (const rule of rules) {
        if (rule === 'required') { // checkeo que sea obligatorio
            if (!value || value.trim() === '') return 'Este campo es obligatorio';
        };

        if (rule === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Check email formato
            if (value && !emailRegex.test(value)) return "Formato de email invalido"
        };

        if (rule.startsWith('min:')) { // Check de cantidad
            const minLength = parseInt(rule.split(':')[1]);
            if (value && value.length < minLength) return `Debe tener al menos ${minLength} caracteres.`
        };

        if (rule.startsWith('match:')) { // Check de coincidencia
            const fieldToMatch = rule.split(':')[1];
            if (value !== (allValues as Record<string, string>)[fieldToMatch]) return "Los campos no coinciden";
        };
    };
    return null;
};