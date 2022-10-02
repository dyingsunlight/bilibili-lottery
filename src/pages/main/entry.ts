import path from 'path'
export default {
    template: path.resolve(__dirname, "index.html"),
    entries: [
        "./styles/index.less",
        "../../../node_modules/element-plus/dist/index.css",
        "./app.ts",
    ]
}
