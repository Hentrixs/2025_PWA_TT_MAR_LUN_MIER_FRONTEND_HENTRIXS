import './CreateWorkspace.css';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../../Components/Logo/Logo';
import BackButton from '../../Components/BackButton/BackButton';
import useCreateWorkspace from '../../hooks/useCreateWorkspace/useCreateWorkspace';
import useForm from '../../hooks/useForm/useForm';
import { useEffect } from 'react';
import { useTranslation } from '../../context/LanguageContext/LanguageContext';

const CreateWorkspace = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();
    const backUrl = location.state?.from || '/workspace-selector';

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
                <BackButton to={backUrl} />
                <h1>{t.create_workspace.title}</h1>
                <p>{t.create_workspace.subtitle}</p>

                <form className="create-workspace-form" onSubmit={onSubmit}>
                    <div className="create-workspace-field">
                        <label htmlFor="title">{t.create_workspace.name_label}</label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            placeholder={t.create_workspace.name_placeholder}
                            value={formState.title}
                            onChange={handleChangeInput}
                        />
                        {errors.title && <span style={{ color: 'var(--error-primary)', fontSize: '13px', marginTop: '4px', display: 'block' }}>{errors.title}</span>}
                    </div>
                    <div className="create-workspace-field">
                        <label htmlFor="description">{t.create_workspace.description_label} <span>{t.create_workspace.description_optional}</span></label>
                        <input
                            id="description"
                            name="description"
                            type="text"
                            placeholder={t.create_workspace.description_placeholder}
                            value={formState.description}
                            onChange={handleChangeInput}
                        />
                        {errors.description && <span style={{ color: 'var(--error-primary)', fontSize: '13px', marginTop: '4px', display: 'block' }}>{errors.description}</span>}
                    </div>
                    {Object.keys(errors).length > 0 && <span style={{ color: 'var(--error-primary)', fontSize: '13px', textAlign: 'center', marginBottom: '8px', display: 'block' }}>{t.create_workspace.error_fix}</span>}
                    {error && <p className="create-workspace-error">{t.create_workspace.error_generic}</p>}
                    <button type="submit" disabled={loading}>
                        {loading ? t.create_workspace.creating : t.create_workspace.create_btn}
                    </button>
                </form>
            </main>
        </div>
    );
};

export default CreateWorkspace;
