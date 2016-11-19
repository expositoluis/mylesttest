var restify = require('restify');
var builder = require('botbuilder');

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat bot
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

//=========================================================
// Bots Dialogs
//=========================================================

bot.dialog('/', [
    function (session) {
        session.send("Bienvenido al servicio asistente de compras,");
        builder.Prompts.choice(session, "Que deseas consultar?", ["Articulos", "Procesos","Salir"]);
    },
    function (session, results) {
        switch (results.response.entity) {
            case "Articulos":
                session.replaceDialog("/askarticule");
                break;
            case "Procesos":
                session.replaceDialog("/Procesos");
                break;
            case "Salir":
                session.replaceDialog("/fin");
                break;
            default:
                session.replaceDialog("/");
                break;
        }
    }
]);

bot.dialog('/askarticule', [
    function (session, args, next) {
        session.dialogData.profile = args || {};
        if (!session.dialogData.profile.name) {
            builder.Prompts.text(session, "'Bienvenido al asistente de codigos de articulos. Por favor indicame que quieres comprar.'");
        } else {
            next();
        }
    },
    function (session, results, next) {
        if (results.response) {
            session.dialogData.profile.name = results.response;
            session.send("Antenas de Radio Frecuencia el subgrupo es el 4325");  
            session.endConversation("Consulta finalizada.");
            session.replaceDialog("/");
        }
    },
    function (session, results) {
        if (results.response) {
            session.dialogData.profile.company = results.response;
        }
        session.endDialogWithResult({ response: session.dialogData.profile });
    }
]);

bot.dialog('/Procesos', [
    function (session, args, next) {
        session.dialogData.profile = args || {};
        if (!session.dialogData.profile.name) {
            builder.Prompts.text(session, "'Bienvenido al asistente para conocer el estado de tus procesos. Por favor indicame tu identidad de comprador.'");
        } else {
            next();
        }
    },
    function (session, results, next) {
        if (results.response) {
            session.dialogData.profile.name = results.response;
            session.send("La 1134 está en Negociación , la 11567 está pendiente de adjudicar  y la 12222 ya se ha adjudicado");  
            session.endConversation("Consulta finalizada.");
            session.replaceDialog("/");
        }
    },
    function (session, results) {
        if (results.response) {
            session.dialogData.profile.company = results.response;
        }
        session.endDialogWithResult({ response: session.dialogData.profile });
    }
]);

bot.dialog('/fin',[
    function (session, results) {
        session.endConversation("Ok… Goodbye.");
    }
]);