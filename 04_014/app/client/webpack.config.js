const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');
const fs = require('fs')
const mode = process.env.NODE_ENV;

const output1 =  {
    path: path.join(__dirname, '../server/public'),
    filename: 'ssr.js',
    publicPath : "/",
    library : 'SSR',
    libraryTarget:'commonjs2',
    umdNamedDefine: true,
  
 }
 const output2 = {
   path: path.join(__dirname, './public'),
   filename : 'csr.js',
   publicPath : "/"
 }

 const setDevServer = { 

  port : 8080,
  proxy : {
    "/**" : {
      target: "http://[::1]:3001",
      changeOrigin: true,
      secure: false,

      onProxyReq: async function(proxyReq, req, res){

        const resources = path.resolve(__dirname, './resources');
        if(String(req.method )=== 'POST' || req.method === 'DELETE'){
          
          if(fs.existsSync(resources)){
            
            fs.rm( resources, { recursive : true }, async (err) => {
              if(err) return console.log('error to delete direct resoucers',err);
              console.log('success to delete the resources from =', req.method)
              
              await fs.mkdirSync( resources , (err) => {
                if(err) return console.log('error to mkdir direct', err);
              });
            });
          }
        }

        if(req.url.includes('api')) return 
        if(req.url.includes('single')) return 

        if(!fs.existsSync(resources)){ 
          await fs.mkdirSync( resources , (err) => {
            if(err) return console.log('error to mkdir direct', err);
          });

        }

        const fileURL =  'index_' + req.url.split('/')[1] + '.html'
        const dirURL = path.resolve(__dirname, './resources/', fileURL);
        
        if(fs.existsSync(dirURL)){
          const html = await fs.readFileSync(dirURL, 'utf-8');
          return res.status(202).send(html);
        }       
      }
    },

  }
 }

const setDevServer2 = {
  port : 8081 
}

module.exports = {
    mode,

    target: mode === 'production' ? 'node' : 'web', 
    
    entry: mode === 'production' ? './ssr.js' : './csr.js', 
    
    output : mode === 'production' ? output1 : output2,
    
    externals: mode === 'production' ? [webpackNodeExternals()] : '', 

    module: {
        rules: [
          {
            test: /\.js$/,
            exclude : [
              mode === 'production' 
              ? path.resolve(__dirname, 'csr.js') 
              : path.resolve(__dirname, 'ssr.js')
            ]
          },
          {
            test: /\.css$/,
            use: [
              "style-loader",
              {
                loader: "css-loader",
                options: {
                  importLoaders: 1,
                  modules: true,
                },
              },
            ],
            include: /\.module\.css$/,
          },
          {
            test: /\.css$/,
            use: ["style-loader", "css-loader"],
            exclude: /\.module\.css$/,
          },

      ],
    },

  //  plugins: [
  //     new HtmlWebpackPlugin({
  //         template: './src/index.html',
  //         filename:'index.html'
  //     }),
  //     new CleanWebpackPlugin(),
  //     new NodePolyfillPlugin(),
  // ],
  devServer: mode === 'production' ? setDevServer2 : setDevServer,
  resolve : {
    fallback : { 
      "fs" : false
    }
  },
  devtool : 'source-map'


};
