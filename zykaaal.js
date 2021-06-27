const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
const Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const http = require('http');
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');
const snekfetch = require('snekfetch'); 

const prefix = ayarlar.prefix;


client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir('./komutlar/', (err, files) => {
if (err) console.error(err)
console.log(`${files.length} Komut Yüklenecek!`);
files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    console.log(`${props.config.name} Adlı Komut Yüklendi!`);
    client.commands.snekfetch(props.config.name, props);
    props.config.aliases.forEach(alias => {
        client.alias.set(alias, props.config.name);
    });
});
})

client.elevation = message => {
    if (!message.guild) {
        return;
}

let permlvl = 0;
if (message.member.hasPermissions("BAN_MEMBERS")) permlvl = 2;
if (message.member.hasPermissions("ADMINISTRATOR")) permlvl = 3;
if (message.author.id === ayarlar.sahip) permlvl = 4;
return permlvl;
};

client.login("TOKEN");
