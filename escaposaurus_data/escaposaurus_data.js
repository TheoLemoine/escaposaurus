/////////////////////////////////////////////////////////////
/// Escapausorus v1 (2020)
///	A quick and dirty framework to create small adventure game (certified vanilla JS)
/// Author: Stéphanie Mader (http://smader.interaction-project.net)
/// GitHub: https://github.com/RedNaK/escaposaurus
///	Licence: MIT
////////////////////////////////////////////////////////////

/* HERE IS THE CONFIGURATION OF THE GAME */
/* 
	either online with VOD server and JSON load of data 
	either local 
*/
var isLocal = true;
var gameRoot = "./";
var gameDataRoot = gameRoot + "escaposaurus_data/";
var videoRoot = gameDataRoot + "videos/";

/*caller app*/
var contactVideoRoot = videoRoot + "contact/";

/*full path to intro / outro video*/
var missionVideoPath = videoRoot + "intro/intro1.mp4";
var introVideoPath = videoRoot + "intro/intro2.mp4";
var missingVideoPath = videoRoot + "contact/missing/final.mp4";
var epilogueVideoPath = videoRoot + "epilogue/epiloguecredit.mp4";

/*udisk JSON path*/
var udiskRoot = gameDataRoot + "udisk/";

/*for online use only*/
/*var udiskJSONPath = gameRoot+"escaposaurus_gamedata/udisk.json" ;
var udiskJSONPath = "/helper_scripts/accessJSON_udisk.php" ;*/

var udiskData = {
  root: {
    files: [],
    folders: [
      {
        foldername: "charles_bage",
        password: "never gona give you up",
        sequence: 99,
        files: [],
      },
      {
        foldername: "terry_davis",
        password: "never gona give you up",
        sequence: 99,
        files: [],
      },
      {
        foldername: "marie_faraday",
        password: "never gona give you up",
        sequence: 99,
        files: [],
      },
      {
        foldername: "michael_cull",
        password: "never gona give you up",
        sequence: 99,
        files: [],
      },
      {
        foldername: "ada_clovale",
        password: "Q4FD2A",
        sequence: 0,
        files: [
          "phOto_tab_1.jpg",
          "phoTo_tab_2.jpg",
          "mail_lOclier.jpg",
          "brouilloN_to_rh.png",
        ],
        folders: [
          {
            foldername: "recherches_bernoulli",
            password: "68",
            sequence: 1,
            files: ["mail_soeur.png", "sCan_notes_1.jpeg"],
            folders: [
              {
                foldername: "ecriture_article",
                password: "coton",
                sequence: 2,
                files: ["article_bernoulli.jpg"],
              },
            ],
          },
        ],
      },
      {
        foldername: "bruce_loclier",
        files: ["mdp_ada_decrypte.jpg"],
        folders: [
          {
            foldername: "photos_conférence_12-06-2017",
            password: "big brain",
            sequence: 3,
            folders: [
              {
                foldername: "article_marie_faraday",
                password: "imposiburu",
                sequence: 99,
                files: [],
              },
              {
                foldername: "article_michael_cull",
                password: "imposiburu",
                sequence: 99,
                files: [],
              },
              {
                foldername: "article_terry_davis",
                password: "imposiburu",
                sequence: 99,
                files: [],
              },
            ],
          },
          {
            foldername: "algo_oracle_glover",
            password: "fdflubzjsv57trzshjbejfnvui",
            sequence: 99,
          },
        ],
      },
    ],
  },
};

var gameTitle = "Un thésard à Cambrouille";
var gameDescriptionHome =
  "Ceci est une courte aventure où vous incarnez un jeune thésard tout juste arrivé à l'Université de Cambrouille. <br/>Le code source est téléchargeable sur <a href='https://github.com/RedNaK/escaposaurus' target='_blank'>GitHub</a>";
var gameMissionCall =
  "Vous avez été accepté à l'Université de Cambrouille pour votre thèse";
var gameMissionAccept =
  "&raquo;&raquo; Commencer votre première journée à Cambrouille (JOUER) &laquo;&laquo;";

var gameCredit =
  "Un jeu conçu et réalisé par : <br/>SIMON Noé<br/>BOURGOIN Baptiste<br/>GRÉGOIRE Alice<br/>POBELLE Solène<br/>LEMOINE Théo";
var gameThanks =
  "Remerciements au testeurs : <br/>VIGUIER Léo<br/>TERRIEN Antonin<br/>ACEITUNO Pierre<br/>redSPINE<br/>NOM PRENOM";

var OSName = "Accès ENT — Université de Cambrouille";
var explorerName = "ftp://cambrouille.net/";
var callerAppName = "Messagerie Interne";

/*ce qui apparait quand on trouve le dernier élément du disque dur*/
var finalStepAdded = "Les preuves ont été récupérés.";

/*titles of video windows*/
var titleData = {
  introTitle: "APPEL EN COURS...",
  epilogueTitle: "APPEL EN COURS...",
  callTitle: "APPEL EN COURS...",
};

/*when the sequence number reach this, the player win, the missing contact is added and the player can call them*/
var sequenceWin = 4;

/*change of caller app prompt for each sequence*/
var promptDefault = "Laboratoire Universitaire";
var prompt = [
  "Laboratoire Universitaire",
  "Laboratoire Universitaire",
  "Laboratoire Universitaire",
  "Laboratoire Universitaire",
  "Laboratoire Universitaire",
];

/*
  before being able to call the contacts, the player has to open the main clue of the sequence as indicated in this array
  if you put in the string "noHint", player will be able to immediatly call the contact at the beginning of the sequence
  if you put "none" or anything that is not an existing filename, the player will NOT be able to call the contacts during this sequence
  if you put anything that is not an existing filename of the udisk, the player will never be able to call any contacts or get helps during this sequence
*/
var seqMainHint = ["noHint", "noHint", "noHint", "article_bernoulli.jpg"];

/*
	contact list, vid is the name of their folder in the videoContact folder, then the game autoload the video named 
	seq{seq number}.mp4, e.g. seq0.MP4 for the first sequence (numbered 0 because computer science habits)
	their img need to be placed in their video folder, username is their displayed name
*/
var normalContacts = [
  {
    vid: "Ada",
    vod_folder: "",
    playsInSequence: [3, 4],
    username: "Ada Clovale",
    canal: "video",
    avatar: "avatar.png",
  },
  {
    vid: "Bruce",
    vod_folder: "",
    playsInSequence: [0, 1, 2],
    username: "Bruce Loclier (Directeur labo)",
    canal: "video",
    avatar: "avatar.png",
  },
  {
    vid: "Michael",
    vod_folder: "",
    playsInSequence: [],
    username: "Michael Cull",
    canal: "video",
    avatar: "avatar.jpg",
  },
  {
    vid: "Terry",
    vod_folder: "",
    playsInSequence: [],
    username: "Terry Davis",
    canal: "video",
    avatar: "avatar.png",
  },
];

/*
  second part of the list, contact that can help the player
*/
var helperContacts = [
  {
    vid: "Assistance",
    vod_folder: "",
    playsInSequence: [0, 1, 2, 3],
    username: "Assistance ENT",
    canal: "txt",
    avatar: "avatar.png",
    bigAvatar: "avatar.png",
  },
];

/*
  the last call, it can be the person we find in the end or anyone else we call to end the quest, 
  allows the game to know it is the final contact that is called and to proceed with the ending
*/

// last call contact prop vid must be 'missing'
var missingContact = {
  vid: "missing",
  vod_folder: "",
  playsInSequence: [4],
  username: "Ada Clovale",
  canal: "video",
  avatar: "avatar.png",
};

/*
  Text messages are stored here
*/
var tips = {
  Assistance: [
    "Assistance Informatique sur cambrouille.net/info",
    "Assistance Informatique sur cambrouille.net/info",
    "Assistance Informatique sur cambrouille.net/info",
    "Assistance Informatique sur cambrouille.net/info",
  ],
};

/*
  text for the instruction / solution windows
*/
var instructionText = {
  winState:
    "Vous avez trouvé les preuves incriminant le professeur Bruce Loclier.",
  lackMainHint: "",
  password:
    "Vous devez trouver et entrer le mot de passe d'un des dossiers de la boite de droite. Vous pouvez trouver le mot de passe en appelant les contacts de la boite de gauche.<br/>Pour entrer un mot de passe, cliquez sur le nom d'un dossier et une fenêtre s'affichera pour que vous puissiez donner le mot de passe.",
};

/*
  please note the %s into the text that allow to automatically replace them with the right content according 
  to which sequence the player is in
*/
var solutionText = {
  winState: "Si vous avez trouvé les fichiers, Bravo.",
  lackMainHint: "Vous devez ouvrir le fichier <b>%s</b><br/>",
  password:
    "Vous devez déverouiller le dossier <b>%s1</b><br/>avec le mot de passe : <b>%s2</b><br/>",
};
