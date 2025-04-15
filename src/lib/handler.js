export function clickOutside(node, callback) {
    const handleClick = (event) => {
        if (!node.contains(event.target)) {
        callback(event);
        }
    };

    // Use capture phase to ensure triggering even if propagation is stopped
    document.addEventListener('click', handleClick, true);

    return {
        update(newCallback) {
        callback = newCallback;
        },
        destroy() {
        document.removeEventListener('click', handleClick, true);
        }
    };
}