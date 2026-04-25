import { Component, type ErrorInfo, type ReactNode } from "react";

interface State { hasError: boolean };
interface Props { children: ReactNode };

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false }
    };

    static getDerivedStateFromError(_: Error): State {
        return { hasError: true }
    };

    componentDidCatch(error: Error, _errorInfo: ErrorInfo) {
        console.error('ErrorBoundary atrapó un crash crítico:', error)
    };

    render() {
        if (this.state.hasError) {
            return <h1>Algo salió catastróficamente mal. Estamos trabajando en ello.</h1>
        }
        return this.props.children;
    }
};

export default ErrorBoundary;