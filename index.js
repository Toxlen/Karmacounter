const Discord = require('discord.js')
const bot = new Discord.Client()
const token = process.env.token;
const joue_a = process.env.joue_a;

var Le_message_help = new Discord.RichEmbed();
var Le_message_annonce = new Discord.RichEmbed();
var utilisateurs = bot.users;
var liste_roles = new Map();
var liste_utilisateurs = new Map();
var liste_emojis = new Map();
var message_final = "";
var Message_de_vote, Vote_en_cours = 0;
var Les_reactions;

Le_message_help.setColor([255, 0, 255])
Le_message_help.setTitle("**Voici la liste de toutes les commande que tu peut faire avec moi :**")
Le_message_help.setDescription("\n**\"!karmaliste\"** : Qui te permet de voir le karma de tous !\n**\"!karmaking\"** : Qui te permet de voir la personne qui a la plus de karma\n**\"!karma [l'opérarteur voulu suivie SANS espace d'une valeur en chiffre] \n[La personne a qui on veut faire la transaction mentionné correctement]\"** : \nOn peut ajouter un commentaire qui sera ajouter dans mon message pour cela mets \" #\" suivie du message que tu veux à la fin de la commande !\n**\"!annonce\"** : Qui permet de faire des message comme celui ci a votre nom ! \nPour cela séparé la commande avec un | et en suite séparé le titre, le message et la signature par un | également !\n**\"!recherche [La recherche que tu veux faire]\"** : Qui te permet d'avoir des liens directs de ta recherche sur différents moteur de recherche comme Ecosia, Lilo et Google pour le moment !\n\n Voilà tout j'espère que ça t'aura aidé sinon hésite pas à contacté mon dev :wink:")

bot.once('ready', function()
{
	for(var [cle, valeur] of bot.guilds)
	{
		for(var [key, value] of valeur.roles)
		{
			liste_roles.set(value.name + value.guild.id, key)
		}
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
	console.log("C'est partie !")
})


bot.on('ready', function()
{
	bot.user.setActivity(joue_a)
	console.log("Je suis bien connecté !")
})


bot.on('message', function(message)
{
	let Annonce = message.content.split("|")
	let Commentaire = message.content.split(" #")
	let Splited = Commentaire[0].split(' ')
	let Decoupe = message.content.split('\n')

	if (Splited[0] === '!karmaliste')
	{
		message_final = "**Voici la liste des membres du serveur avec leurs karma :**\n\n"
		for(var [key, value] of liste_utilisateurs)
		{
			message_final += "<@" + key + ">" + " avec **" + value + " pts**\n"
		}
		message_final += "\nPour connaître directement la personne avec le plus de karma tape **!karmaking** :wink:"
		message.channel.send(message_final)
		message.delete()
	}

	else if(Splited[0] === '!karma' && (message.member.highestRole.name === 'rois' || message.member.highestRole.name === 'Pd1'))
	{
		let Verification = Splited[1].split("")
		if(Splited.length == 3 && Verification[0] != '<')
		{
			a_modifie = message.mentions.users
			for(var [key, value] of a_modifie)
			{
				liste_utilisateurs.set(key, eval(liste_utilisateurs.get(key) + Splited[1]))
				if(Commentaire.length > 1)
				message.channel.send("J'ai bien fait " + Splited[1] + " au karma de <@" + key + "> " + Commentaire[1] + "\nIl a donc **" + liste_utilisateurs.get(key) + " pts** de karma maintenant ! :tada:" )
				else
				message.channel.send("J'ai bien fait " + Splited[1] + " au karma de <@" + key + ">\nIl a donc **" + liste_utilisateurs.get(key) + " pts** de karma maintenant ! :tada:" )
			}
		}
		else
		{
			message.channel.send("Mais t'es con ou t'es con ??\nTape donc **!help** si tu connais pas la syntaxe !")
		}
		message.delete()
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
			message_final +=  "avec **" + karmaking_valeur + " pts**\nBien joué a eu on peut les applaudir ! :clap: :clap:"
		}
		else
		{
			message_final = "Le roi du karma est : <@" + karmaking_nom + "> avec **" + karmaking_valeur + " pts** \nBien joué a lui on peut l'applaudir ! :clap: :clap:"
		}
		message.channel.send(message_final)
		message.delete()
	}

	else if(Splited[0] === '!help')
	{
		message.channel.send(Le_message_help)
		message.delete()
	}

	else if(Splited[0] === '!annonce')
	{
		Le_message_annonce.setAuthor(message.author.username)
		Le_message_annonce.setColor([255, 0, 0])
		Le_message_annonce.setTitle(Annonce[1])
		Le_message_annonce.setDescription(Annonce[2])
		Le_message_annonce.setFooter(Annonce[3])
		message.channel.send(Le_message_annonce)
		message.delete()
	}

	else if(Splited[0] === '!recherche')
	{
		Splited.shift()
		message.channel.send('Voici les liens direct pour la recherche "' + Splited.join(' ') + '"\nEcosia : https://www.ecosia.org/search?q=' + Splited.join('+') + '\nLilo : https://search.lilo.org/searchweb.php?q=' + Splited.join('+') + '\nGoogle : https://www.google.fr/search?q=' + Splited.join('+'))
		message.delete()
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
		if(Vote_en_cours == 1)
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
				message_final +=  "avec **" + Vote_valeur + " votes** !\nIl va falloir les départager !"
			}
			else
			{
				message_final = "Le gagnant du vote est : <@" + liste_emojis.get(Vote_nom) + "> avec **" + Vote_valeur + " votes** !\nIl sera donc sous-dictateur pendant 2 semaines !"
			}
			message.channel.send(message_final)
		}
	}

	else if(Splited[1] === 'gagnant' && message.channel.name === 'regime-politic')
	{
		a_modifie = message.mentions.members
		var Tableau;
		
		for(var [key, value] of a_modifie)
		{
			Tableau = liste_roles.get("Pd1" + value.guild.id)
			value.setRoles([Tableau])
				.catch(console.log)
		}  
	}
}) 


bot.on('messageReactionAdd', function(La_réaction, La_personne)
{
	let Splited = La_réaction.message.content.split(':')
	
	if(La_réaction.message.author.username == "Karma Counter")
	{
		if(La_réaction.emoji.identifier == '%F0%9F%91%8F' && Splited[1] == "clap") //:clap:
		{
			liste_utilisateurs.set(La_personne.id, (liste_utilisateurs.get(La_personne.id) + 1))
		}
		if(La_réaction.emoji.identifier == '%F0%9F%8E%89' && Splited[1] == "tada") //:tada:
		{
			liste_utilisateurs.set(La_personne.id, (liste_utilisateurs.get(La_personne.id) + 1))
		}
		if(La_réaction.emoji.identifier == '%F0%9F%98%8D' && Splited[1] == "wink") //:heart_eyes:
		{
			liste_utilisateurs.set(La_personne.id, (liste_utilisateurs.get(La_personne.id) + 1))
		}
	}
})


bot.on('error', function(Erreur)
{
	console.log(Erreur.message)
})


bot.login(token)
	.catch(console.error);
