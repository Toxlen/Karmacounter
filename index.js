const Discord = require('discord.js')
const bot = new Discord.Client()
const Token = process.env.Token;

var utilisateurs = bot.users;
var liste = new Map();
var messsage_final = "";

bot.on('ready', function()
{
	for(var [key, value] of utilisateurs)
	{
		if (!(key == 1))
		liste.set(key, 0)
	}
	bot.user.setActivity('faire baissé le karma de Laetitia')
})

bot.on('message', function(message)
{
	let Splited = message.content.split(' ')
	if (Splited[0] === '/karmaliste')
	{
		message_final = "Voici la liste des membres du serveur avec leurs karma :\n\n"
		for(var [key, value] of liste)
		{
			message_final += "<@" + key + ">" + " avec " + value + " pts\n"
		}
		message_final += "\nPour connaître directement la personne avec le plus de karma tape /karmaking :wink:"
		message.channel.send(message_final)
	}
	else if(Splited[0] === '/karma' && (message.member.highestRole.name === 'rois' || message.member.highestRole.name === 'Pd1'))
	{
		a_modifie = message.mentions.users
		for(var [key, value] of a_modifie)
		{
			liste.set(key, eval(liste.get(key) + Splited[2]))
			message.channel.send("J'ai bien fait " + Splited[2] + " au karma de <@" + key + ">\nIl a donc " + liste.get(key) + " pts de karma maintenant ! :tada:" )
		}
	}
	else if(Splited[0] === '/karmaking')
	{
		var karmaking_nom = ""
		var karmaking_valeur = 0
		for(var [key, value] of liste)
		{
			if(value > karmaking_valeur)
			{
				karmaking_nom = key
				karmaking_valeur = value
			}
			else if(value == karmaking_valeur)
			{
				karmaking_nom += " " + key
			}
			else{}
		}
		let karmaking = karmaking_nom.split(' ')
		if (karmaking.length > 1)
		{
			message_final = "Les rois du karma sont : "
			for(var karmakingnom of karmaking)
			{
				message_final += "<@" + karmakingnom + "> "
			}
			message_final += "\nBien joué a eu on peut les applaudir ! :clap: :clap:"
		}
		else
		{
			message_final = "Le roi du karma est : <@" + karmaking_nom + "> \nBien joué a lui on peut l'applaudir ! :clap: :clap:"
		}
		message.channel.send(message_final)
	}
}) 

bot.login(Token)
