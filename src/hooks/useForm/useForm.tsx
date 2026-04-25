import { useState } from "react";
import { validateField } from "../../helpers/validationHelper";

/*
la interfaz obliga a que siempre se manden ÚNICAMENTE las 2 piezas del motor principales 
(initialFormState y submitFn). 
Pero gracias a la T, lo que venga adentro del initialFormState puede ser infinito e ilimitado
(correos, contraseñas, edades, nombres, fotos), y 
TypeScript se adaptará solito a lo que sea que le pongas para devolvértelo idéntico al final 
y sin errores de tipeo.
*/

interface useFormProps<T> {
    initialFormState: T;
    submitFn: (formState: T) => void;
    validationRules?: Partial<Record<keyof T, string[]>> // Diccionario opcional que mapea las llaves de T a Reglas
};  // como se lee la parte de arriba que dice Partial<...>

const useForm = <T,>({ initialFormState, submitFn, validationRules }: useFormProps<T>) => { // segun tengo entendido la , obliga a React a entender que es un generico de TS.

    const [formState, setFormState] = useState<T>(initialFormState);
    const [errors, setErrors] = useState<Partial<Record<keyof T,string>>>({}); // como se lee esto del Partial<...>

    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => { // React.ChangeEvent (evento de react), <HTMLInputElement> // el elemento que cambio fue un input
        const field_name = event.target.name as keyof T; // que es eso de as keyof T
        const field_value = event.target.value;

        setFormState((prevFormState) => {
            return {
                ...prevFormState,
                [field_name]: field_value // sigo sin entender el tema de los corchetes. no se supone que por default JS accede al valor dentro de field name?
            }
        });

        if (errors[field_name]) {
            setErrors(prev => ({...prev, [field_name]: undefined}))
        }
    };

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        if (validationRules) {
            const tempErrors: Partial<Record<keyof T, string>> = {};
            let isFormValid = true;

            for (const field of Object.keys(validationRules) as Array<keyof T>) {
               const rulesArray = validationRules[field];
               if (rulesArray) {
                    const errorMessage = validateField(formState[field] as unknown as string, rulesArray, formState);
                    if (errorMessage) {
                        tempErrors[field] = errorMessage;
                        isFormValid = false;
                    };
               }; 
            };

            setErrors(tempErrors);
            
            if (!isFormValid) {
                return;
            };
    
        };
    
        submitFn(formState);
    };

    const resetForm = () => {
        setFormState(initialFormState);
        setErrors({});
    };

    return {
        handleChangeInput,
        onSubmit,
        formState,
        errors,
        resetForm
    };
};

export default useForm;

// Aver si entendi bien,

// 1. al useForm se le pasan 2 props, el estado y el submit, 
// 2.luego de esas 2 props 
    // una va una al initialFormState y 
    // la otra al submitFn como funcion callback no?
    // JS reconoce cual es cual por el nombre de la propiedad, solamente acepta elementos que tengan el nombre de la prop. 

// luego se inicializa el useState con initalFormstate.
// luego esta la funcion para cambiar el valor input y almacenarlo
// y luego esta la funcion del onSubmit() que contiene la callback y a esa callback se le pasa los datos, es decir el formState
