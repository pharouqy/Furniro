import { Component } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  handleReset = () => {
    this.setState({ error: null });
  };

  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-[400px] items-center justify-center p-8">
          <div className="max-w-md text-center">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--color-error-muted)] text-[var(--color-error)]">
              <AlertTriangle size={32} />
            </span>
            <h2 className="mt-6 text-2xl font-black text-[var(--color-text)]">Something went wrong</h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
              An unexpected error occurred. Try refreshing the page or go back to the home page.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <button onClick={this.handleReset} className="btn-primary">
                <RefreshCw size={16} />
                Try Again
              </button>
              <a href="/" className="btn-secondary">
                Go Home
              </a>
            </div>
            {import.meta.env.DEV && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-xs font-semibold text-[var(--color-text-subtle)]">Error details</summary>
                <pre className="mt-2 overflow-x-auto rounded-lg bg-[var(--color-surface-2)] p-4 text-xs leading-6 text-[var(--color-error)]">
                  {this.state.error.message}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
