<p align="center">
<a href="https://github.com/ErenBaygun?tab=repositories"><img alt="GitHub Stars" src="https://img.shields.io/github/stars/ErenBaygun/v13-Invite-Manager?style=for-the-badge"></a> 
<a href="https://github.com/ErenBaygun/v13-Invite-Manager/fork"><img alt="GitHub Forks" src="https://img.shields.io/github/forks/ErenBaygun/v13-Invite-Manager?style=for-the-badge"></a>
<a href="https://discord.gg/MEdUDMSTMx"><img alt="Support Server" src="https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white"></a>
</p>
<h3 align="center">Tamamen özellştirilebilir discord davet yönetim botu!</h3>

---

## ✨ Gereksinimler
- [Node.js](https://nodejs.org/en/) v16.15.0 ya da daha güncel bir sürümü ve [MongoDB](https://www.mongodb.com/) indirmelisin.
- Discord botunun tokenine ve MongoDB Bağlantısını sahip olmalısın.
- Bot Tokenini nasıl alacağını bilmiyorsan **[Rehber'e Göz At](https://discordjs.guide/preparations/setting-up-a-bot-application.html#your-token)**
- MongoDB Bağlantısını nasıl alacağını bilmiyorsan **[Videoya Göz At](https://www.youtube.com/watch?v=VKRIz9s9V70)**

## 🚀 Kurulum
- Dosyaları indirin.
- İndirdiğiniz dosyaları zip dosyasından çıkarıp bir dosya haline getirin.
- Shift + Sağ Tık ile tıklayın. PowerShell şeklinde açın.
- Açılan pencere içerisine "npm install" yazın ve "Enter" basın.
- Metin düzenleyiciniz ile **config.js** dosyasını [buraya](https://github.com/ErenBaygun/v13-Invite-Manager/#-config) göre doldurun.
- Düzenlediğiniz config.js dosyasını kaydedip PowerShell penceresine "node app.js" yazın ve "Enter" basın.
- Tokenini girmiş olduğunuz bot sunucuda ekliyse çalışmaya başlayacaktır.

## ⚙ Config
- **`config.js` dosyasını düzenle ve gerekli yerlere değerleri gir**
```js
module.exports = {
    bot: {
        token: 'DISCORD_BOT_TOKEN',
        prefix: 'BOTUN_PREFIXINI_GİR',
        status: "Made with ❤️ by Sanctus"
    },

    serverId: "SUNUCU_ID",

    mongoURL: "MONGODB_URL",

    channels: {
        inviteLog: 'LOG_METİN_KANALI_ID'
    },

    emoji: {
        emojiname: '<:name:id>',
        animatedemojiname: '<a:name:id>'
    }
};
```

## Not
- Bir sorunla karşılaşırsan benimle iletişime geçmekten çekinme. Discord: [Sanctus#7296](https://discord.gg/MEdUDMSTMx)
- Bir önerin mi var? Fikrini [burada](https://github.com/ErenBaygun/v13-Invite-Manager/issues/new?title=Öneri) ya da [discord sunucumda](https://discord.gg/MEdUDMSTMx) paylaşabilirsin!
- Botu beğendiysen ⭐ atmayı unutma!
