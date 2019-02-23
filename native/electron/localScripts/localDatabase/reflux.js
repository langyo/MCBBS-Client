import Reflux from "reflux";

import actions from "../../../../scripts/srcJs/resourceManager/actions";

export let out = {
    actions: actions,
    stores: [
        Reflux.getGlobalState("accounts"),
        Reflux.getGlobalState("forums"),
        Reflux.getGlobalState("local"),
        Reflux.getGlobalState("mainPage"),
        Reflux.getGlobalState("medals"),
        Reflux.getGlobalState("posts"),
        Reflux.getGlobalState("rates"),
        Reflux.getGlobalState("threads"),
        Reflux.getGlobalState("tools"),
        Reflux.getGlobalState("userGroups"),
        Reflux.getGlobalState("users")
    ]
}