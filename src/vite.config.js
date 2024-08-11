// vite.config.js
export default {
    server: {
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:2024, // 目标服务器地址
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '') // 重写路径
            }
        }
    }
}
