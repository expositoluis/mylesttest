var builder = require('botbuilder');

// Create bot and bind to console
var connector = new builder.ConsoleConnector().listen();
var bot = new builder.UniversalBot(connector);

// Create LUIS recognizer that points at our model and add it as the root '/' dialog for our Cortana Bot.
var model = 'https://api.projectoxford.ai/luis/v1/application?id=20924d84-746b-4861-8e27-e5b9e66dd3ab&subscription-key=309502969223493d94979d81361cc3ff';
var recognizer = new builder.LuisRecognizer(model);
var dialog = new builder.IntentDialog({ recognizers: [recognizer] });
builder.DialogAction.send('dialog %s', dialog);
bot.dialog('/', dialog);

dialog.matches('builtin.intent.alarm.set_alarm', builder.DialogAction.send('Creating Alarm'));
dialog.matches('agendarprocesocompra', builder.DialogAction.send('agendarprocesocompra'));
dialog.matches('builtin.intent.alarm.delete_alarm', builder.DialogAction.send('Deleting Alarm'));
dialog.onDefault(builder.DialogAction.send("I'm sorry I didn't understand. I can only create & delete alarms."));