import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
import path from 'path'
import consola from "consola";
import registerWidgetPackage from "./script/registerWidgetPackage";
import scanWidgetPackage from "./script/scanWidgetPackage";
// https://vitejs.dev/config/
const myPlugin = () => ({
    name: 'test-configure-server',
    async handleHotUpdate({server}) {
        console.log(server.httpServer.address().port)
        const widgetPackage = scanWidgetPackage();
        // if (compiler.options.mode === 'production') {
        //     let outputPath = compiler.options.output.path;
        //     let widgetJSONPath = path.resolve(outputPath, "widget.json");
        //     fs.writeFileSync(widgetJSONPath, JSON.stringify(widgetPackage, null, 2));
        // } else {
        consola.info("注册组件中：", new Date());
        await registerWidgetPackage(widgetPackage);
        // }
        return []
    }
})
export default defineConfig({
    base: './',
    plugins: [vue(), myPlugin(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        })],
    resolve: {
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.txt', '.widget.ts'],
        alias: [{find: '@', replacement: path.resolve(__dirname, 'src')}]
    }
})
