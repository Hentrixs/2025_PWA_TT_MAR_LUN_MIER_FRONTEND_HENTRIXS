import "./HomeScreen.css";
import { Link } from "react-router";
import useWorkspaces from "../../hooks/useWorkspaces/useWorkspaces";


const HomeScreen = () => {

    const { loading, workspaces } = useWorkspaces();

    return (
        <div className="hs-shell">
            <aside className="hs-sidebar">
                <div className="hs-workspace-header">
                    <span className="hs-workspace-name">🏠 Mi Espacio</span>
                </div>

                <div className="hs-sidebar-body">

                    {/* Nav fijo */}
                    <div className="hs-nav-item">🏠 Inicio</div>

                    <div style={{ height: 12 }} />
                    <div className="hs-section-label">Workspaces</div>

                    {/* Lista de workspaces en el sidebar */}
                    {loading && <div className="hs-nav-item">Cargando...</div>}

                    {!loading && workspaces && workspaces.length !== 0 &&
                        workspaces.map((ws: any, indice: number) =>
                        (
                            <div
                                key={indice}
                                className="hs-workspace-pill"
                            >
                                <div className="hs-workspace-avatar">
                                    {ws.workspace_title?.[0]?.toUpperCase() || "W"}
                                </div>
                                <span className="hs-workspace-pill-title">
                                    {ws.workspace_title || "Sin nombre"}
                                    <div className="hs-wc-badge">
                                        <Link to={`/workspace/${ws.workspace_id}`}>Abrir Workspace</Link>
                                    </div>
                                </span>
                            </div>
                        ))}
                </div>

                <div className="hs-sidebar-footer">
                    <div className="hs-user-avatar">
                        U
                        <div className="hs-user-status-dot" />
                    </div>
                    <div className="hs-user-info">
                        <div className="hs-user-name">Mi cuenta</div>
                        <div className="hs-user-status">● Activo</div>
                    </div>
                </div>
            </aside>
        </div>
    );
};

export default HomeScreen;