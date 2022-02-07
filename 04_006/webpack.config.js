module.exports = {
    mode: 'production',
    entry: {
        app: '/src/index.js'
    },
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },
    devServer: {
        historyApiFallback: true, //매핑되지 않은 개발 서버에 대한 요청시 /index.html로 라우팅
    }
};

