import { useParams } from "react-router";

const Workspace = () => {

    const { workspace_id } = useParams();
    console.log('workspace_id: ', workspace_id);

    return (
        <div>
            <h1>Workspace</h1>
            <p>{workspace_id || 'sd'}</p>
        </div>
    )
}

export default Workspace;