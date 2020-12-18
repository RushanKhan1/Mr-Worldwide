
const Discord = require('discord.js');
const client = new Discord.Client();
const path = require('path');

// Extract the required classes from the discord.js module
const { Client, MessageAttachment } = require('discord.js');

const translate = require('@vitalets/google-translate-api');
require('dotenv').config();
const TOKEN = process.env.BOTTOKEN;

client.login(TOKEN);

client.on('ready', botOnline);

function botOnline() {
    console.log('Bot is online!');
    console.log(`logged in as user ${client.user.tag}`)
}

 client.on('message', messageReceived);

function messageReceived(msg) {
    if(msg.content.startsWith('-mw')){
	

	//checking if the help command is executed.
	if(msg.content.slice(4, 9) === 'help' || msg.content === '-mw'){

	    //displaying the created help embed.
	    showHelpEmbed(msg);
	    return;
	    
	}
	else if(msg.content.slice(4, 9) === 'ping'){
	    msg.reply('Calculating ping 🔉').then((resultMessage) => {
		const ping = resultMessage.createdTimestamp - msg.createdTimestamp
		resultMessage.edit(`Bot latency: ${ping}ms, API Latency: ${client.ws.ping}ms`)
		
	    })
	    return;
	}
	//parsing the input string

	//checking if the user has written the full language name instead of the code, if yes then replacing the name with the code.
	msg.content = parseFullLangName(msg.content);

	var msgString = msg.content.slice(7, msg.content.length); // -mw de
	
	var code = msg.content.slice(4, 6);
	
	var list = msgString.split(" "); // this is a list
	var sentence = "" // the sentence to be translated
	var translation = "";


	//reacting to the message.
	react(code, msg);


	for(var i = 0; i < list.length; i++){
	    sentence = sentence + list[i] + " ";  
	}

	//translating the sentence through the api
	translate(sentence, {to: code}).then(res => {
	    console.log(res.text)
	   
	    //The following while loop is the fastest way to reply to any query 
	    //without having to use any setTimeout function which may be inconsistent through various servers. 

	    while(res.text != "~"){
	    	if(res.text != null && res.text != ""){
	    	    translation = res.text;
	    	    // msg.reply("Translation: " + translation);
		    showTranslateEmbed(translation, msg)
	    	    res.text = "~";
	    	}
	    }


	    // This method is inconsistent and takes more time:
	    // setTimeout(() => { translation = res.text; msg.reply(" Translation: " + translation);}, 1000);

	}).catch(err => {
	    console.error(err);
	    msg.reply(toString(err.message));
	});
    }
}


function showHelpEmbed(msg) {
    
    const helpEmbed = new Discord.MessageEmbed()
	  .setColor('#4aebff')
	  .setTitle('Hola stinky humans!')
	  .setAuthor('Mr. Worldwide', 'https://i.imgur.com/we2SxCa.png', 'https://github.com/RushanKhan1')
	  .setDescription('I am a bot that wants to ~~take over the world!~~ help all you diverse folks talk to each other better. Here\'s how to use me:')
	  .setThumbnail('https://i.imgur.com/we2SxCa.png')
	  .setImage('')
	  .addFields(
		      {name: 'Usage', value:"```-mw lang_name the sentence to be translated```"},
		      {name: 'Key', value: '-mw\n\nlang_name', inline: true},
		      {name: 'Meaning', value:'Command used to invoke me.\n\nThe name or the ISO-639-1 code of the language that you want to translate to,', inline: true},
		      {name: 'All commands', value: "Here's everything that you can do with me."},
		      {name: 'Command', value: "-mw\n\n-mw help\n\n-mw ping\n\n\n-mw lang_name the sentence to be translated", inline: true},
		      {name: 'Function', value: "Shows this message.\n\nAlso shows this message.\n\nPings the bot and shows the latency.\n\nAutomatically detects the sentence language and then translates the sentence into the language specified.", inline: true}
		  )
	    
    msg.channel.send(helpEmbed);
    return;
}


function parseFullLangName(message){

    var code = ""
    
    //converting the message into a list for easy checking

    var list = message.split(" ");

    //checking if the language specifier is the code

    if(list[1].length == 2) return message;

    if(languages.has(list[1])){
	code = languages.get(list[1]);
    }
    list[1] = code;
    message = ""
    for(var i = 0; i < list.length; i++){
	message = message + list[i] + " "
    }
    return message;

}

function react(code, msg) {

    //reacting to messages based on the language they convert to.

    if(code === 'de'){
	msg.react('🇩🇪')
    }
    else if(code == 'fr'){
	msg.react('🇫🇷')
    }
    else if(code == 'es'){
	msg.react('🇪🇸')
    }
    else if(code == 'pt'){
	msg.react('🇵🇹')
    }
    else if(code == 'it'){
	msg.react('🇮🇹')
    }
    else if(code == 'nl'){
	msg.react('🇳🇱')
    }
    else if(code == 'ru'){
	msg.react('🇷🇺')
    }
    else if(code == 'pl'){
	msg.react('🇵🇱')
    }
    else if(code == 'zh'){
	msg.react('🇨🇳')
    }
    else if(code == 'ja'){
	msg.react('🇯🇵')
    }
    else if(code == 'hr'){
	msg.react('🇭🇷')
    }
    else if(code == 'hi'){
	msg.react('🇮🇳')
    }
    else if(code == 'ko'){
	msg.react('🇰🇷')
    }
    else if(code == 'vi'){
	msg.react('🇻🇳')
    }
    else if(code == 'en'){
	msg.react('🏴󠁧󠁢󠁥󠁮󠁧󠁿')
    }
    else if(code == 'ar'){
	msg.react('🇸🇦')
    }
    else if(code == 'bg'){
	msg.react('🇧🇬')
    }
    else if(code == 'cs'){
	msg.react('🇨🇿')
    }
    else if(code == 'fi'){
	msg.react('🇫🇮')
    }
    else if(code =='ga'){
	msg.react('🇮🇪')
    }
    else if(code == 'sk'){
	msg.react('🇸🇰')
    }
    else if(code == 'sl'){
	msg.react('🇸🇮')
    }
    else if(code == 'bn'){
	msg.react('🇧🇩')
    }
    
}


//creating a hash map for fast and easy conversion between the language name and code



function showTranslateEmbed(translation, msg) {
  const translateEmbed = new Discord.MessageEmbed()
	  .setColor('#4aebff')
	  .setTitle('Translation')
	.setDescription(translation)
	  .setAuthor('Mr. Worldwide', 'https://i.imgur.com/we2SxCa.png', 'https://github.com/RushanKhan1')
	.addFields({name: "Requested by:", value: "@" + msg.author.username })
    msg.reply(translateEmbed)
}



let languages = new Map();

languages.set('afrikaans',     'af')
languages.set('albanian',	'sq')
languages.set('amharic',	'am')
languages.set('arabic',	'ar')
languages.set('armenian',	'hy')
languages.set('azerbaijani',	'az')
languages.set('basque',	'eu')
languages.set('belarusian',	'be')
languages.set('bengali',	'bn')
languages.set('bosnian',	'bs')
languages.set('bulgarian',	'bg')
languages.set('catalan',	'ca')
languages.set('cebuano',	'ceb') //(iso-639-2)
languages.set('chinese', 'zh')	//zh-cn or zh (bcp-47)
 //chinese (traditional)	zh-tw (bcp-47)
languages.set('corsican',	'co')
languages.set('croatian',	'hr')
languages.set('czech',	'cs')
languages.set('danish',	'da')
languages.set('dutch',	'nl')
languages.set('english',	'en')
languages.set('esperanto',	'eo')
languages.set('estonian',	'et')
languages.set('finnish',	'fi')
languages.set('french',	'fr')
languages.set('frisian',	'fy')
languages.set('galician',	'gl')
languages.set('georgian',	'ka')
languages.set('german',	'de')
languages.set('greek',	'el')
languages.set('gujarati',	'gu')
languages.set('haitian creole', 'ht')
languages.set('hausa',	'ha')
languages.set('hawaiian',	'haw') // (iso-639-2)
languages.set('hebrew',	'he') //or iw
languages.set('hindi',	'hi')
languages.set('hmong',	'hmn') //(iso-639-2)
languages.set('hungarian',	'hu')
languages.set('icelandic',	'is')
languages.set('igbo',	'ig')
languages.set('indonesian',	'id')
languages.set('irish',	'ga')
languages.set('italian',	'it')
languages.set('japanese',	'ja')
languages.set('javanese',	'jv')
languages.set('kannada',	'kn')
languages.set('kazakh',	'kk')
languages.set('khmer',	'km')
languages.set('kinyarwanda',	'rw')
languages.set('korean',	'ko')
languages.set('kurdish',	'ku')
languages.set('kyrgyz',	'ky')
languages.set('lao',	'lo')
languages.set('latin',	'la')
languages.set('latvian',	'lv')
languages.set('lithuanian',	'lt')
languages.set('luxembourgish',	'lb')
languages.set('macedonian',	'mk')
languages.set('malagasy',	'mg')
languages.set('malay',	'ms')
languages.set('malayalam',	'ml')
languages.set('maltese',	'mt')
languages.set('maori',	'mi')
languages.set('marathi',	'mr')
languages.set('mongolian',	'mn')
languages.set('burmese',	'my')
languages.set('nepali',	'ne')
languages.set('norwegian',	'no')
languages.set('nyanja',	'ny')
languages.set('odia',	'or')
languages.set('pashto',	'ps')
languages.set('persian',	'fa')
languages.set('polish',	'pl')
languages.set('portuguese',	'pt')
languages.set('punjabi',	'pa')
languages.set('romanian',	'ro')
languages.set('russian',	'ru')
languages.set('samoan',	'sm')
languages.set('scots', 'gd')	//gd gaelic
languages.set('serbian',	'sr')
languages.set('sesotho',	'st')
languages.set('shona',	'sn')
languages.set('sindhi',	'sd')
languages.set('sinhalese',	'si')
languages.set('slovak',	'sk')
languages.set('slovenian',	'sl')
languages.set('somali',	'so')
languages.set('spanish',	'es')
languages.set('sundanese',	'su')
languages.set('swahili',	'sw')
languages.set('swedish',	'sv')
languages.set('tagalog',	'tl')
languages.set('tajik',	'tg')
languages.set('tamil',	'ta')
languages.set('tatar',	'tt')
languages.set('telugu',	'te')
languages.set('thai',	'th')
languages.set('turkish',	'tr')
languages.set('turkmen',	'tk')
languages.set('ukrainian',	'uk')
languages.set('urdu',	'ur')
languages.set('uyghur',	'ug')
languages.set('uzbek',	'uz')
languages.set('vietnamese',	'vi')
languages.set('welsh',	'cy')
languages.set('xhosa',	'xh')
languages.set('yiddish', 'yi')
languages.set('yoruba',	'yo')
languages.set('zulu',	'zu')
  

// icon made by "https://www.flaticon.com/authors/freepik" from "https://www.flaticon.com/"
