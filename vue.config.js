module.exports={

   //基本路径,用于本地npm run buidl ,默认publicPath "/"
   publicPath:'./',
  //  输出文件目录
  
    devServer:{
         port:8081,
         //这个将本地和远程都设置相同的别名了
        //  host:"test1.com",
    },
    configureWebpack:{
    resolve: {
        alias: {
      
        //   '@': 相当于src
          'assets': '@/assets',
          'views': '@/views',
          'components': '@/components',
          'store': '@/store',
          'network': '@/network',
          'common':'@/common',
        }
      }
    },


}