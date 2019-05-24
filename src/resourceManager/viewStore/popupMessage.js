import Reflux from "reflux";

import db from "../database";

import Actions from "../actions";

class PopupMessage extends Reflux.Store {
	constructor()
	{
		super();
		this.state = {
            
        };
		this.listenToMany(Actions.view.popupMessage);
	}

    sendNewMessage(message){

    }
    
    popupNewMessage(message){

    }
}

export default new PopupMessage();