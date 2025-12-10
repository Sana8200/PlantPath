import ReactiveButton from 'reactive-button';

// Default button state
export function Button({
    text,
    onClick,
    color = "green",      // green, red, blue, yellow, dark, light
    size = "medium",      // small, medium, large
    loading = false,
    outline = false,
    disabled = false,
    fullWidth = false,
    type = "button"
}) {
    return (
        <ReactiveButton
            type={type}
            idleText={text}
            loadingText="Loading..."
            buttonState={loading ? 'loading' : 'idle'}
            onClick={onClick}
            color={color}
            size={size}
            outline={outline}
            disabled={disabled}
            shadow
            rounded
            style={fullWidth ? { width: '100%' } : {}}
        />
    );
}