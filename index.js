const Discord = require('discord.js');
const low = require('lowdb')
const FileSync = require ('lowdb/adapters/FileSync')
const fs = require("fs");

const adapter = new FileSync('database.json');
const db = low(adapter);


var prefix = "<"
var bot = new Discord.Client();
var randnum = 0;
var devinee = db.get('devine').size().value();

db.defaults({ devine:[] }).write()

bot.on('ready', () => {
    bot.user.setPresence({ game: { name: 'Grepolis - <help', type: 1}})
    console.log("Bot Ready !");
    bot.user.setStatus("idle")

    })

  bot.login(process.env.TOKEN);


bot.on('guildMemberAdd', member => {

    member.guild.channels.find(channels => channels.id === "529076349374169098");

    bot.channels.get("529076349374169098").send("Bienvenue à toi " + member + " qui viens de nous rejoindre sur le discord de la Triade, envois un message à un Leader ou Fondateur pour être validé et accéder au reste du discord !")
})


bot.on('message', message => {
      if (message.channel.type === 'dm') return;
        const trois = require("./commands/trois.js"); 
        trois(message, prefix, bot)
    })

bot.on('message', message => {

    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;

    if (message.content.startsWith(prefix + 'min')) {

        var pointsgrepo = (message.content.slice(4, message.content.length));
        var min = pointsgrepo * 0.80
        var max = pointsgrepo * 1.20
        if (pointsgrepo <= 0) {
            message.delete()
        } else {
            message.reply("Le joueur doit avoir au minimum " + min.toFixed() + " points pour être attaqué ou attaquer ce joueur !")
        }
    }
    
    if (message.content.startsWith(prefix + 'max')) {

        var pointsgrepo = (message.content.slice(4, message.content.length));
        var min = pointsgrepo * 0.80
        var max = pointsgrepo * 1.20
        if (pointsgrepo <= 0) {
            message.delete()
        } else {
            message.reply("Vous devez avoir au minimum " + min.toFixed() + " points pour être attaqué ou attaquer ce joueur !")
        }
    }

    let guild = message.member.guild;
    let Role = guild.roles.find(role => role.name === 'Mer 55');
    let removespoil = guild.roles.find(role => role.name === "Mer 55");
    let mer45 = guild.roles.find(role => role.name === 'Mer 45');
    let mer45remove = guild.roles.find(role => role.name === "Mer 45");

    if (message.content.startsWith(prefix + '45')) {

        if (message.member.roles.has(mer45.id)) {
            message.channel.sendMessage('Rôle Mer 45 retiré !');
            message.member.removeRole(mer45remove);
        }
        else {
            message.member.addRole(mer45);
            message.channel.sendMessage('Rôle Mer 45 ajouté !');

        }}

        if (message.content.startsWith(prefix + '55')) {

            if (message.member.roles.has(Role.id)) {
                message.channel.sendMessage('Rôle Mer 55 retiré !');
                message.member.removeRole(removespoil);
            }
            else {
                message.member.addRole(Role);
                message.channel.sendMessage('Rôle Mer 55 ajouté !');
            }
        }
    
        if(message.content.startsWith(prefix + 'help')){
            var grepohelp = new Discord.RichEmbed()
        .setDescription("Voici la liste des commandes disponibles pour le bot NORTH-SENTINEL")
        .addField("Commandes de rôles","<45 Pour avoir le rôle Mer 45\n<55 Pour avoir le rôle Mer 55")
        .addField("Grepolis","<max + [Nombre de points du joueur] Permet de calculer automatiquement combien de points vous devez avoir au minimum pour attaquer ou être attaqué par un joueur plus fort que vous.\n<min + [Votre nombre de point] Permet de calculer automatiquement le nombre de points minimum pour attaquer ou être attaqué par un joueur plus faible que vous.")
        .addField("Jeux","<devine Le bot tire entre 1 et 3 emojis, vous devez trouver le mot correspondant aux emojis.\n<3l Le bot tire 3 lettres aléatoire, vous devez faire une sorte de mini phrase, plus ou moins drôle."
                  message.channel.sendEmbed(grepohelp);
            }
})

bot.on('message', message => {
    
    if (message.author.bot) return;
     if (message.channel.type === 'dm') return;

     var motdevinedb = db.get("devine").find('nombre').value()
     var motdevine = Object.values(motdevinedb);
     var motdevinerdb = db.get("devine").find('stalk').value()
     var motdeviner = Object.values(motdevinerdb);

     if (message.content === prefix + "devine"){   

        if (motdevine[0] == "azertyuiop") {
            rdmtete();

     var trouve = db.get(`devine[${randnum}].emoji`).toString().value();
     var trouver = db.get(`devine[${randnum}].réponse 1`).toString().value();
     var trouvere = db.get(`devine[${randnum}].réponse 2`).toString().value();

     message.channel.send(`${trouve}`)
     db.get("devine").find({ partieetat: "attente" }).assign({ partieetat: motdevine[1] = "start", nombre: motdevine[0] = trouve, essaisold: motdevine[3] = 0,essais: motdevine[2] = 1,rép1: motdevine[4] = trouvere, rép2: motdevine[5] = trouver}).write();

        } else {
            message.reply(`Une devinette est déjà en cours ! (${motdevine[0]})`)
        
        }}
        function rdmtete(min, max) {
            min = Math.ceil(0);
            max = Math.floor(devinee);
            randnum = Math.floor(Math.random() * (max - min) + min);
        }
     if (motdevine[1] == "start") {

        
     if (message.content == motdevine[4]||message.content == motdevine[5]) {
        message.reply(`à trouvé le bon mot !`);
        db.get("devine").find("nombre").assign({
            nombre: motdevine[0] = "azertyuiop",
            partieetat: motdevine[1] = "attente",
            essaisold: motdevine[3] = motdevine[2],

        }).write();
    }}

})
