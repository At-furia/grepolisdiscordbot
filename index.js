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

bot.login("NTI5MDk2OTY0NzcyNDYyNjAy.Dwr35A.m3My4O1lm0E75wFXp8jCS2Tt5kw")


bot.on('guildMemberAdd', member => {

    member.guild.channels.find(channels => channels.id === "529076349374169098");

    bot.channels.get("529076349374169098").send("Bienvenue à toi " + member + " qui viens de nous rejoindre sur le discord de NORTH-SENTINEL")
})



bot.on('message', message => {

    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;

    if (message.content.startsWith(prefix + 'cible')) {

        var pointsgrepo = (message.content.slice(6, message.content.length));
        var min = pointsgrepo * 0.80
        var max = pointsgrepo * 1.20
        if (pointsgrepo <= 0) {
            message.delete()
        } else {
            message.reply("La cible doit avoir entre " + min.toFixed() + " et " + max.toFixed() + " points pour être attaquée !")
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
        .addField("Grepolis","<cible + [Votre nombre de point] Permet de calculer automatiquement combien de points doivent avoir les cibles que vous voulez attaquer ou qui veulent vous attaquer !")
                message.channel.sendEmbed(grepohelp);
            }
})