type Events = {
    serverStarted: [what: string, port: number],
    serverStopped: [what: string, why: string],
}

const eventHandlers: {
    [K in keyof Events]?: ((...args:Events[K])=>void)[]
} = {};

export function emit<T extends keyof Events>(key: T, ...args: Events[T]) {
    if (eventHandlers[key]) {
        eventHandlers[key]?.forEach((cb)=>cb(...args));
    }
}

// push callback to handlers
export function on<T extends keyof Events>(key: T, callback: (...args:Events[T])=>void) {
    if (!eventHandlers[key]) {
        eventHandlers[key] = [];
    }
    eventHandlers[key]?.push(callback);
}
