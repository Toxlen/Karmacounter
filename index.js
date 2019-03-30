const Discord = require('discord.js');
const bot = new Discord.Client();
const token = process.env.token;
const joue_a = process.env.joue_a;

var utilisateurs = bot.users;
var liste_roles = new Map();
var liste_utilisateurs = new Map();
var liste_emojis = new Map();
var message_final = "";
var Message_de_vote, Vote_en_cours = 0;
var Les_reactions;

bot.on('ready', function()
{
	for(var [cle, valeur] of bot.guilds)
	{
		for(var [key, value] of valeur.roles)
		{
			liste_roles.set(value.name + value.guild.id, key)
		}
		console.log(valeur.roles)
	}
	for(var [cle, valeur] of bot.emojis)
	{
		for(var [key, value] of utilisateurs)
		{
			if(value.discriminator == '0948' && valeur.name == 'jony')
			{
				liste_emojis.set(valeur.name + ":" + valeur.id, key)
			}
			else if(value.discriminator == '8423' && valeur.name == 'la')
			{
				liste_emojis.set(valeur.name + ":" + valeur.id, key)
			}
			else if(value.discriminator == '4385' && valeur.name == 'rois')
			{
				liste_emojis.set(valeur.name + ":" + valeur.id, key)
			}
			else if(value.discriminator == '0912' && valeur.name == 'Guillaume_Prezident')
			{
				liste_emojis.set(valeur.name + ":" + valeur.id, key)
			}
			else if(value.discriminator == '6294' && valeur.name == 'mull')
			{
				liste_emojis.set(valeur.name + ":" + valeur.id, key)
			}
			else{}
			if (!(key == 1))
			liste_utilisateurs.set(key, 0)
		}
	}
	bot.user.setActivity(joue_a)
})

bot.on('message', function(message)
{
	let Splited = message.content.split(' ')
	let Decoupe = message.content.split('\n')
	if (Splited[0] === '!karmaliste')
	{
		message_final = "Voici la liste des membres du serveur avec leurs karma :\n\n"
		for(var [key, value] of liste_utilisateurs)
		{
			message_final += "<@" + key + ">" + " avec " + value + " pts\n"
		}
		message_final += "\nPour connaître directement la personne avec le plus de karma tape !karmaking :wink:"
		message.channel.send(message_final)
	}
	else if(Splited[0] === '!karma' && (message.member.highestRole.name === 'rois' || message.member.highestRole.name === 'Pd1'))
	{
		a_modifie = message.mentions.users
		for(var [key, value] of a_modifie)
		{
			liste_utilisateurs.set(key, eval(liste_utilisateurs.get(key) + Splited[2]))
			message.channel.send("J'ai bien fait " + Splited[2] + " au karma de <@" + key + ">\nIl a donc " + liste_utilisateurs.get(key) + " pts de karma maintenant ! :tada:" )
		}
	}
	else if(Splited[0] === '!karmaking')
	{
		var karmaking_nom = ""
		var karmaking_valeur = 0
		for(var [key, value] of liste_utilisateurs)
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
			message_final +=  "avec " + karmaking_valeur + " pts\nBien joué a eu on peut les applaudir ! :clap: :clap:"
		}
		else
		{
			message_final = "Le roi du karma est : <@" + karmaking_nom + "> avec " + karmaking_valeur + " pts \nBien joué a lui on peut l'applaudir ! :clap: :clap:"
		}
		message.channel.send(message_final)
	}
	else if(Decoupe[0] === "Début du vote" && message.channel.name === 'regime-politic')
	{
		if(Vote_en_cours != 1)
		{
			Vote_en_cours = 1;
			Message_de_vote = message;
		}
	}
	else if(Decoupe[0] === "Fin du vote" && message.channel.name === 'regime-politic')
	{
		Vote_en_cours = 0;
		var Vote_nom = " ";
		var Vote_valeur = 0;
		Les_reactions = Message_de_vote.reactions
		for(var [key, value] of Les_reactions)
		{
			if(value.count > Vote_valeur)
			{
				Vote_nom = key
				Vote_valeur = value.count
			}
			else if(value.count == Vote_valeur)
			{
				Vote_nom += key + " "
			}
			else{}
		}
		let Gagnants_du_vote = Vote_nom.split(' ')
		if (Gagnants_du_vote.length > 1)
		{
			message_final = "Les gagnants du vote sont : "
			for(var Gagnant of Gagnants_du_vote)
			{
				message_final += "<@" + liste_emojis.get(Gagnant) + "> "
			}
			message_final +=  "avec " + Vote_valeur + " votes !\nIl va falloir les départager !"
		}
		else
		{
			message_final = "Le gagnant du vote est : <@" + liste_emojis.get(Vote_nom) + "> avec " + Vote_valeur + " votes !\nIl sera donc sous-dictateur pendant 2 semaines !"
		}
		message.channel.send(message_final)
	}
	else if(Splited[1] === 'gagnant' && message.channel.name === 'regime-politic')
	{
		a_modifie = message.mentions.members
		var Tableau;
		
		for(var [key, value] of a_modifie)
		{
			Tableau = liste_roles.get("Pd1" + value.guild.id)
			value.setRoles([Tableau])
		}  
	}
})

bot.login(token)
