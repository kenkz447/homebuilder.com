/// <reference path="node_modules/ts-nameof/ts-nameof.d.ts" />
declare module '*.scss' {
    const content: any;
    export default content;
}

interface Window {
    baseUrl: any
    jQuery?: any
    $?: any
}