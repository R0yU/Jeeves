import { aBotCommand } from '../../../spectrum-bot/src/Spectrum/components/command.component';
import { receivedTextMessage } from '../../../spectrum-bot/src/Spectrum/interfaces/receivedTextMessage.interface';
import { SpectrumLobby } from '../../../spectrum-bot/src/Spectrum/components/lobby.component';
import { aSpectrumCommand } from '../../../spectrum-bot/src/Spectrum/interfaces/command.interface';
import { DbSaves } from '../_.commands';
import { removeSaveCommand } from './removeSave';

export class addSaveCommand implements aSpectrumCommand {
    public listenerID;
    public shortCode = "save add @([^ ]*)";
    public callback = (message?:receivedTextMessage, lobby?:SpectrumLobby, matchs?:Array<any>) => {
        if(!matchs[1]) matchs[1] = message.member.nickname.toLowerCase();

        // Trim spaces in handle name
        matchs[1] = matchs[1].replace(" ", "").trim();

        DbSaves.insert({handle: matchs[1], time: new Date().getTime()}, () => {
            DbSaves.count({handle: matchs[1]}, (err, count) => {
                lobby.sendPlainTextMessage("[BOT] +1 Save for @"+matchs[1]+" ("+count+" saves)");
                removeSaveCommand.canRemove = true;
            });
        });
    };
    public name = "SaveCount - Add";
    public manual = "Adds a chat-save  to the specified handle";
}