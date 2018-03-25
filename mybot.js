const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const fs = require("fs");
const Enmap = require('enmap');
const EnmapLevel = require('enmap-level');
const tableSource = new EnmapLevel({name: "myTable"});
const myTable = new Enmap({provider: tableSource});
client.myTable = new Enmap({name: "myTable"});
client.settings = new Enmap({name: 'settings', persistent: true});
var tags = [];
/*const defaultSettings = {
  prefix: "!",
  modLogChannel: "mod-log",
  modRole: "Moderator",
  adminRole: "Administrator",
  welcomeMessage: "Say hello to {{user}}, everyone! We all need a warm welcome sometimes :D"
}*/
client.myTable.set("foo", "bar");


//******************** emoji time ********************


//const ayy = client.emojis.find("name", "ayy");





client.on("ready", () => {
  console.log("I am ready!");
});

client.on("guildCreate", guild => {
  client.settings.set(guild.id, defaultSettings);
});



client.on("message", (message) => {
  //basic starter things ******************************************************************************************
  if (!message.content.startsWith(config.prefix)|| message.author.bot) return;
  if (message.content.startsWith(config.prefix + "ping")) {
    message.channel.send("pong!");
  }
  if (message.content.startsWith(config.prefix + "foo")) {
    message.channel.send("bar!");
  }


// Change the prefix!! ********************************************************************************
  if(message.content.startsWith(config.prefix + "prefix ")) {
    // Gets the prefix from the command (eg. "!prefix +" it will take the "+" from it)
    let newPrefix = message.content.split(" ").slice(1, 2)[0];
    // change the configuration in memory
    config.prefix = newPrefix;

    // Now we have to save the file.
    fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
    // check for no prefix case
  } else if (message.content.startsWith(config.prefix + "prefix")) {
    message.channel.send("Please put in a normal prefix!");
  }


  ////****************************** MESSING WITH KEYS ******************************
  /*if (message.content.startsWith(config.prefix + "getkey ")) {
    let newtoken = message.content.split(" ").slice(1, 2)[0];
    message.channel.send("" + newtoken); // outputs "bar")
  } else if (message.content.startsWith(config.prefix + "getkey")) {
    message.channel.send("That's not a valid key!! To get a key, type out ```" + config.prefix + "getkey <insert key here>```");
  }*/

// SET TOKEN METHOD ********************************************************************************
  /*if (message.content.startsWith(config.prefix + "settoken ")) {
  let newtoken = message.content.split(" ").slice(1,2)[0];
  let newarray = message.content.split(" ");
  let text = "";
  for (i = 1; i < newarray.length; i++) {
  text += newarray[i] + " ";
}
message.channel.send("```" + text + "```");
//let newstring = message.content.split(" ");
//let newkey = newstring.split(" ").slice(1,2)[0];
message.channel.send("newtoken is " + newtoken + " and newkey is ");// + newkey)
}*/

// SET TOKEN ********************************************************************************
if (message.content.startsWith(config.prefix + "settoken ")) {
  let newtoken = message.content.split(" ").slice(1,2)[0];
  let newarray = message.content.split(" ");
  /*if (newarray.length != 3) {
    message.channel.send("There was an incorrect number of arguments, please only have 2 arguments for <key> and <token>");
    return;
  }*/
  let text = ""; // in array: 0 is +settoken
  for (i = 2; i < newarray.length; i++) {
    text += newarray[i] + " ";
  }
  message.channel.send("```" + text + "```");
  /*if (myTable.has(newarray[1])) {
  message.channel.send("That token pair already exists");
  message.channel.send(client.myTable.get(newarray[1]));
  return;
}*/
//let newstring = message.content.split(" ");
//let newkey = newstring.split(" ").slice(1,2)[0];
message.channel.send("command: " + newarray[0]);
message.channel.send("newtoken is " + newarray[1] + " and newkey is " + text);
client.myTable.set(newarray[1], text);// + newkey)
tags.push(newarray[1]);
}


//GETTING A TOKEN ********************************************************************************
if (message.content.startsWith(config.prefix + "gettoken ")) {
  let ttoken = message.content.split(" ").slice(1,2)[0];
  /*if (!myTable.has(ttoken)) {
  return;
} else{*/
message.channel.send(client.myTable.get(ttoken));//}
}

// AVAILABLE TAGS********************************************************************************
if (message.content.startsWith(config.prefix + "avail")) {
  let text = "";
  for (j =0; j <tags.length; j++) {
    text += tags[j] + " ";
  }
  message.channel.send("Available tags include: \n" + text);
}


//************************* EMOJI TIME AGAIN WHOOOOOOOT ****************************************
if(message.content.startsWith(config.prefix + "ayy")) {
  //const ayy = client.emojis.find("name", "ayyylmao");
  const ayy = client.emojis.get("427384784658890752");
  message.channel.send(`${ayy} LMAO`);
  message.channel.send("Does it work or wha");
  //message.react(client.emojis.get("427384784658890752"));
  message.react(ayy);
}

if(message.content.startsWith(config.prefix + "emote ")) {
  let emotelister = message.content.split(" ");
  let emotee = emotelister[1];
  let emoe = client.emojis.find("name", emotee);
  message.channel.send("" + emoe);
  message.react(emoe);
}

if (message.content.startsWith(config.prefix + "allemotes")){
  const emojiList = message.guild.emojis.map(e=>e.toString()).join(" ");
  message.channel.send(emojiList);
}

});
client.login(config.token);
