# Comment webhook bridge for Cusdis to Feishu

## 干了啥
Cusdis will send webhook notifications when new comments arrive. Just post this url as your webhook and I will notify your guys in Feishu

当有新的评论时，Cusdis可以向webhook发送请求，本serverless function可以接收这个请求并转化为飞书所需的格式发送到群里

## 步骤

1. 创建一个飞书群，在群里加入一个机器人 [使用指南](https://open.feishu.cn/document/ukTMukTMukTM/ucTM5YjL3ETO24yNxkjN?lang=zh-CN#-537b966) 并获取webhook地址和secret签名
2. fork本项目clone代码，准备部署到你喜欢的serverless平台
3. 开发环境根目录创建`.env`文件，填写两个key `FEISHU_SECRET`、`FEISHU_WEBHOOK_URL`，部署以后需要配置两个key为环境变量。OFC，如果你本地使用vercel --prod来部署，那就不必了。
4. 我们的api在`pages/api/webhook.ts`下, 文件名就是接口名称，建议改个隐蔽一些的名字，比如用uuid或者随机生成一个长字符串。其他文件无需care

## Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FLikenttt%2Fcusdis-comment-feishu-webhook&env=FEISHU_WEBHOOK_URL,FEISHU_SECRET&envDescription=FEISHU_WEBHOOK_URL&envLink=https%3A%2F%2Fopen.feishu.cn%2Fdocument%2FukTMukTMukTM%2FucTM5YjL3ETO24yNxkjN%3Flang%3Dzh-CN%23d3815c88)
感谢vercel

