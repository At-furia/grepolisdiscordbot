const Discord = require('discord.js');
const low = require('lowdb')
const FileSync = require ('lowdb/adapters/FileSync')
const fs = require("fs");

const adapter = new FileSync('database.json');
const db = low(adapter);


var prefix = "<"
var bot = new Discord.Client();
var randnum = 0;


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
                message.channel.sendEmbed(grepohelp);
            }
})
