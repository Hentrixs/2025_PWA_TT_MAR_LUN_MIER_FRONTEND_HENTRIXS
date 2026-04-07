import './CreateWorkspace.css';
import { useNavigate } from 'react-router-dom';
import Logo from '../../Components/Logo/Logo';
import useCreateWorkspace from '../../hooks/useCreateWorkspace/useCreateWorkspace';
import useForm from '../../hooks/useForm/useForm';
import { useEffect } from 'react';

const CreateWorkspace = () => {

    const navigate = useNavigate();
    const { submitCreateWorkspace, response, loading, error } = useCreateWorkspace();

    const { formState, handleChangeInput, onSubmit } = useForm({
        initialFormState: { title: '', description: '' },
        submitFn: async (formState: any) => {
            await submitCreateWorkspace(formState.title, formState.description);
        }
    });

    useEffect(() => {
        if (response) navigate('/workspace');
    }, [response]);

    return (
        <div className="create-workspace">
            <nav className="create-workspace-nav">
                <Logo height={50} width={50} />
            </nav>

            <main className="create-workspace-main">
                <h1>Creá tu espacio de trabajo</h1>
                <p>Un espacio de trabajo es donde tu equipo se comunica.</p>

                <form className="create-workspace-form" onSubmit={onSubmit}>
                    <div className="create-workspace-field">
                        <label htmlFor="title">Nombre del espacio</label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            placeholder="Ej: Mi empresa"
                            value={formState.title}
                            onChange={handleChangeInput}
                        />
                    </div>
                    <div className="create-workspace-field">
                        <label htmlFor="description">Descripción <span>(opcional)</span></label>
                        <input
                            id="description"
                            name="description"
                            type="text"
                            placeholder="De qué trata este espacio"
                            value={formState.description}
                            onChange={handleChangeInput}
                        />
                    </div>
                    {error && <p className="create-workspace-error">Algo salió mal, intentá de nuevo.</p>}
                    <button type="submit" disabled={loading}>
                        {loading ? 'Creando...' : 'Crear espacio de trabajo'}
                    </button>
                </form>
            </main>
        </div>
    );
};

export default CreateWorkspace;
