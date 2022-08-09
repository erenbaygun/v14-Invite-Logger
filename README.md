<p align="center">
<a href="https://github.com/ErenBaygun?tab=repositories"><img alt="GitHub Stars" src="https://img.shields.io/github/stars/ErenBaygun/v14-Invite-Logger?style=for-the-badge"></a> 
<a href="https://github.com/ErenBaygun/v14-Invite-Logger/fork"><img alt="GitHub Forks" src="https://img.shields.io/github/forks/ErenBaygun/v14-Invite-Logger?style=for-the-badge"></a>
<a href="https://discord.gg/MEdUDMSTMx"><img alt="Destek Al" src="https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white"></a>
</p>
<h3 align="center">🎈 V14 BUTONLU VE TAMAMEN ÖZELLEŞTİRİLEBİLİR DISCORD DAVET KAYIT BOTU 🎈</h3>

---

## ✨ Gereksinimler
- [Node.js](https://nodejs.org/en/) v16.15.0 ya da daha güncel bir sürümü ve [MongoDB](https://www.mongodb.com/) indirmelisin.
- Discord botunun tokenine ve MongoDB Bağlantısını sahip olmalısın.
-  Bot Tokenini nasıl alacağını bilmiyorsan --> **[Rehber'e Göz At](https://discordjs.guide/preparations/setting-up-a-bot-application.html#your-token)**
-  MongoDB Bağlantısını nasıl alacağını bilmiyorsan --> **[Videoya Göz At](https://www.youtube.com/watch?v=VKRIz9s9V70)**

## 🚀 Kurulum
- Dosyaları indirin.
- İndirdiğiniz dosyaları zip dosyasından çıkarıp bir dosya haline getirin.
- Shift + Sağ Tık ile tıklayın. PowerShell şeklinde açın.
- Açılan pencere içerisine "npm install" yazın ve "Enter" basın.
- Metin düzenleyiciniz ile **config.js** dosyasını [buraya](https://github.com/ErenBaygun/v14-Invite-Logger/#-config) göre doldurun.
- Düzenlediğiniz config.js dosyasını kaydedip PowerShell penceresine "node app.js" yazın ve "Enter" basın.
- Tokenini girmiş olduğunuz bot sunucuda ekliyse çalışmaya başlayacaktır.
- Botu beğendiysen ⭐ atmayı unutma!

## ⚙ Config
- **`config.js` dosyasını düzenle ve gerekli yerlere değerleri gir.**
- **`config.js` dosyasını bulamıyorsan `config.js.example` dosyasını kopyalayarak bir tane oluştur.**
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
    
    text: {
        joinMessage: "SUNUCUYA DAVETLE KATILDI LOG MESAJI", // örnek ---> "**{newMember} sunucuya katıldı.**\nDavet eden: {inviter} ( {inviteCount} Davet )"
        vaintyJoinMessage: "SUNUCUYA ÖZEL URL İLE KATILDI LOG MESAJI", // örnek ---> "**{newMember} sunucuya katıldı.**\nÖzel url'yi kullanarak katıldı. ( {vanityUses} )"
        leaveMessage: "SUNUCUDAN AYRILDI LOG MESAJI" // örnek ---> "**{member} sunucudan ayrıldı.**"
    }
};
```



## 🛑 Önemli
- Bir sorunla karşılaşırsan benimle discord üzerinden iletişime geçebilirsin. [Sanctus#7296](https://discord.gg/MEdUDMSTMx)
- Bir önerin mi var? Fikrini [burada](https://github.com/ErenBaygun/v14-Invite-Logger/issues/new?title=Öneri) ya da [discord sunucumda](https://discord.gg/MEdUDMSTMx) paylaşabilirsin!
- Hakkımda daha fazla bilgi için --> **[Web siteme göz at](https://sanct.me)**
- Botu beğendiysen ⭐ atmayı unutma!
