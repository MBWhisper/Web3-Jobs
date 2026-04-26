var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { inspectAttr } from 'kimi-plugin-inspect-react';
// https://vite.dev/config/
export default defineConfig({
    base: process.env.VERCEL ? '/' : './',
    plugins: __spreadArray(__spreadArray([], (process.env.NODE_ENV !== 'production' ? [inspectAttr()] : []), true), [
        react()
    ], false),
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    build: {
        chunkSizeWarningLimit: 1000,
        minify: 'esbuild',
        rollupOptions: {
            output: {
                manualChunks: function (id) {
                    if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/'))
                        return 'react-vendor';
                    if (id.includes('node_modules/react-router'))
                        return 'router';
                    if (id.includes('node_modules/@supabase'))
                        return 'supabase';
                },
            },
        },
    },
});
