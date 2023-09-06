type Events = {
    serverStarted: [what: string, port: number],
    serverStopped: [what: string, why: string],
}

const eventHandlers: {
    [K in keyof Events]?: ((...args:Events[K])=>void)[]
} = {};

// emit event
export function emit<T extends keyof Events>(key: T, ...args: Events[T]) {
    if (eventHandlers[key]) {
        eventHandlers[key]?.forEach((cb)=>cb(...args));
    }
}

// add callback to handlers array
export function on<T extends keyof Events>(key: T, callback: (...args:Events[T])=>void) {
    if (!eventHandlers[key]) {
        eventHandlers[key] = [];
    }
    eventHandlers[key]?.push(callback);
}
