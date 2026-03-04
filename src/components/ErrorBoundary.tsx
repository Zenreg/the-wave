import { Component } from 'react';
import type { ReactNode, ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
          <div className="text-center">
            <p className="text-2xl font-extralight text-white mb-4">TheWave</p>
            <p className="text-sm text-slate-400 font-light mb-6">
              Une erreur est survenue.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 rounded-full border border-indigo-400/30 text-indigo-300 text-sm font-light hover:bg-indigo-500/10 transition-colors"
            >
              Recharger
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
