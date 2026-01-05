export const preloadOne = (src?: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        if (!src) return resolve()
        const img = new Image();
        img.decoding = "async";
        img.onload = () => resolve();
        img.onerror = () => reject(new Error(`Failed to load: ${src}`));
        img.src = src;
    });
}

export const preloadPair = (data: { base: string; overlay: string }): Promise<void> => {
    return Promise.all([preloadOne(data.base), preloadOne(data.overlay)]).then(() => void 0)
}

export const preloadAll = (data: { base: string; overlay: string }[]): Promise<void> => {
    const list = data.flatMap((item) => [
        ...(!!item?.base?.length ? [preloadOne(item.base)] : []),
        ...(!!item?.overlay?.length ? [preloadOne(item.overlay)] : [])
    ])
    return Promise.all(list).then(() => void 0)
}