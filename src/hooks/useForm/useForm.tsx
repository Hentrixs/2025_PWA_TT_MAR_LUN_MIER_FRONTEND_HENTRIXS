import { useState } from "react";
import { validateField } from "../../helpers/validationHelper";

interface useFormProps<T> {
    initialFormState: T;
    submitFn: (formState: T) => void;
    validationRules?: Partial<Record<keyof T, string[]>>
};

const useForm = <T,>({ initialFormState, submitFn, validationRules }: useFormProps<T>) => {

    const [formState, setFormState] = useState<T>(initialFormState);
    const [errors, setErrors] = useState<Partial<Record<keyof T,string>>>({});

    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const field_name = event.target.name as keyof T;
        const field_value = event.target.value;

        setFormState((prevFormState) => {
            return {
                ...prevFormState,
                [field_name]: field_value
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
