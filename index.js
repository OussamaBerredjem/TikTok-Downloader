const express = require('express')
const { Telegraf,Markup} = require('telegraf')
const axios = require('axios');


const app = express()



const bot = new Telegraf("7178164913:AAGnQOTBmZEvK0zBPVIQkKFlQmZYsbRBeJ4")


const port = 443||process.env.PORT;


  
async function get(url) {

  const encodedParams = new URLSearchParams();
  encodedParams.set('url', url);
  
  const options = {
    method: 'POST',
    url: 'https://tiktok-video-downloader-download-without-watermark.p.rapidapi.com/tiktok/v1/download-without-watermark',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': 'f717a9a210msh463ba705e0514cep14ac7cjsn9e23ecc29bf6',
      'X-RapidAPI-Host': 'tiktok-video-downloader-download-without-watermark.p.rapidapi.com'
    },
    data: encodedParams,
  };
  
  try {
    const response = await axios.request(options);
    return response.data['data']['url'];
  } catch (error) {
    return "error";
  }
}

bot.start((ctx) => ctx.reply("Welcome to TikTok Downloader ! 🎉\n I'm here to help you download videos from TikTok platforms. Just send me the link to the video you want to download, and I'll take care of the rest!😊📹"));

bot.help((ctx) => ctx.reply('Send me a sticker'));

bot.on('message', async (ctx) => {
    
    if( ctx.message.text){

    try{

      const message = ctx.message.text;
      const id = ctx.msgId;

        var replyMsg;

        if(message.startsWith("https://")&&(message.includes("www")||message.includes("vm"))&&message.includes(".com")&&message.includes("tiktok")){
       
        //replyMsg = await ctx.sendMessage("uploading ...");
        

        var reply = await bot.telegram.sendMessage(ctx.chat.id, "Downloading ...",{
            reply_to_message_id: id
        });

        // Remove the message after 5 seconds (5000 milliseconds)
       
       

        var respo = await get(message);
        console.log("link:"+respo+"\n");

        var idr = reply.message_id;

       reply = await bot.telegram.editMessageText(ctx.chat.id,idr,null, "Uploading ...");


       const button = {
        text: "Share with Friends", // Add the "text" property here
        url: respo // Replace with actual video link
      };
         
    // Create an inline keyboard with the share button
    const keyboard = [
      [
        { text: button.text, url: button.url }
      ]
    ];
    
    
    // Send the video with the caption and the inline keyboard
    ctx.sendVideo(respo , {
      reply_markup: { inline_keyboard: keyboard }
    });

       // ctx.replyWithVideo(respo)

     }else{
        ctx.reply("send a valid link")
     }

    }catch(error){
       // await ctx.deleteMessage(replyMsg.message_id);
        console.log(error)
        ctx.reply("unknown error "+error.text);

    }}else{
      ctx.reply("error send a link message");

    }

    
})




bot.hears('hi', (ctx) => ctx.reply('Hey there'))
try{
bot.launch();
}catch(error){
  console.log(error);
}
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

app.get("/hy",(req,res)=>{
  res.send("hellos");
})

app.get("/",(req,res)=>{
  res.send("hy");
})

app.head("/head",(req,res)=>{
  res.send("hy");
})

app.listen(port,()=>console.log("connected"))
