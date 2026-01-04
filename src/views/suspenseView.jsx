import "/src/style/suspenseView.css";

export function SuspenseView({ message, error }) {
    if (error) {
        return (
            <div className="suspense-container" role="alert">
                <div className="suspense-error-icon">❌</div>
                <p className="suspense-error-text">
                    {error.toString() || "An unexpected error occurred."}
                </p>
                <p className="suspense-subtext">Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="suspense-container" role="status" aria-live="polite">
            <div className="suspense-spinner">
                <img
                    src="https://brfenergi.se/iprog/loading.gif"
                    alt="Loading..."
                />
            </div>
            <p className="suspense-message">{message || "Loading..."}</p>
        </div>
    );
}