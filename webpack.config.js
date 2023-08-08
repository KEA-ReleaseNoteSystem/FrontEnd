const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "development",
    entry: "./src/index.js", // 모듈이 시작되는 부분 (엔트리 포인트)
    output: {
        path: path.resolve("./dist"), // 모듈이 시작되는 부분부터 모두 합쳐준 결과물을 저장하는 곳
        filename: "bundle.js",  // 합쳐진 결과물 파일 이름
    },
    resolve: {
        extensions: [".jsx", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.(js)x?$/,  // js, jsx로 끝나는 모든 파일
                exclude: /node_module/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.css$/,  // css로 끝나는 모든 파일
                use: ["style-loader", "css-loader"], // css-loader는 css파일을 모듈 처럼 사용할 수 있게 해주는 로더이고  style-loader는 css-loader가 처리해준 모듈처럼 사용할 수있게 한 js파일의 css문자열을 브라우저에 html에 주입시켜 브라우저에 보여질 수 있도록 처리해주는 로더이다
            },
            {
                test: /\.s[ac]ss$/,
                use: ["style-loader", "css-loader", "sass-loader"], // 로더는 한 파일에 여러개가 실행될 때 뒤에서 부터 앞으로 실행된다.
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
                exclude: /node_modules/,
                use: ["file-loader?name=[name].[ext]"],  // 이미지 파일을 모듈로 사용할 수 있도록 변환하는 역할을 하는 로더이다.
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html",
        }),
        new CopyPlugin({
            patterns: [{ from: "./src/assets", to: "" }],
        }),
    ],
};