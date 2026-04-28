import './CreateWorkspace.css';
import { useNavigate } from 'react-router-dom';
import Logo from '../../Components/Logo/Logo';
import BackButton from '../../Components/BackButton/BackButton';
import useCreateWorkspace from '../../hooks/useCreateWorkspace/useCreateWorkspace';
import useForm from '../../hooks/useForm/useForm';
import { useEffect } from 'react';

const CreateWorkspace = () => {

    const navigate = useNavigate();
    const { submitCreateWorkspace, response, loading, error } = useCreateWorkspace();

    const { formState, handleChangeInput, onSubmit, errors } = useForm({
        initialFormState: { title: '', description: '' },
        validationRules: {
            title: ['required', 'min:3'],
            description: ['min:3']
        },
        submitFn: async (formState: { title: string; description: string }) => {
            await submitCreateWorkspace(formState.title, formState.description);
        }
    });

    useEffect(() => {
        if (response) navigate(`/workspace/${response.workspace_id}`);
    }, [response]);

    return (
        <div className="create-workspace">
            <nav className="create-workspace-nav">
                <Logo className='logo-responsive' />
            </nav>

            <main className="create-workspace-main">
                <BackButton to='/workspace-selector' />
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
                        {errors.title && <span style={{ color: 'var(--error-primary)', fontSize: '13px', marginTop: '4px', display: 'block' }}>{errors.title}</span>}
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
                        {errors.description && <span style={{ color: 'var(--error-primary)', fontSize: '13px', marginTop: '4px', display: 'block' }}>{errors.description}</span>}
                    </div>
                    {Object.keys(errors).length > 0 && <span style={{ color: 'var(--error-primary)', fontSize: '13px', textAlign: 'center', marginBottom: '8px', display: 'block' }}>Corrige los errores antes de continuar.</span>}
                    {error && <p className="create-workspace-error">Algo salió mal, intentá de nuevo.</p>}
                    <button type="submit" disabled={loading}>
                        {loading && 'Creando espacio...' || 'Crear espacio de trabajo'}
                    </button>
                </form>
            </main>
        </div>
    );
};

export default CreateWorkspace;
