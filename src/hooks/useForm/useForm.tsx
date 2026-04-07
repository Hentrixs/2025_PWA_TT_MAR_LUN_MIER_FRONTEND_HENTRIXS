import { useState } from "react";

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

    submitFn: (formState: T) => void; // se pasa una callback a esto
}; 

const useForm = <T,>({ initialFormState, submitFn }: useFormProps<T>) => { // segun tengo entendido la , obliga a React a entender que es un generico de TS.

    const [formState, setFormState] = useState<T>(initialFormState);

    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => { // React.ChangeEvent (evento de react), <HTMLInputElement> // el elemento que cambio fue un input
        const field_name = event.target.name;
        const field_value = event.target.value;

        setFormState((prevFormState) => {
            return {
                ...prevFormState,
                [field_name]: field_value // sigo sin entender el tema de los corchetes. no se supone que por default JS accede al valor dentro de field name?
            }
        })
    };

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        submitFn(formState); // esto no lo entiendo.
    };

    return {
        handleChangeInput,
        onSubmit,
        formState
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
