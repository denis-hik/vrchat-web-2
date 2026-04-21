declare module "*.png" {
    const src: string;
    export default src;
}
declare module "*.jpg" {
    const src: string;
    export default src;
}
declare module "*.jpeg" {
    const src: string;
    export default src;
}
declare module "*.svg" {
    const src: string;
    export default src;
}
declare module "*.gif" {
    const src: string;
    export default src;
}
declare module "*.ttf" {
    const src: string;
    export default src;
}

declare module "./env" {
    const env: {
        host: string;
    };

    export default env;
}
