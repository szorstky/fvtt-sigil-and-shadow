import { sigil_and_shadow } from "../module/config.js";
import SigilItemSheet from "../module/sheets/SigilItemSheet";
import SigilActorSheet from "../module/sheets/SigilActorSheet"

async function preloadHandlebarsTemplates() {
    const templatePaths = [
        "systems/sigil_and_shadow/templates/actors/partials/player-attributes-partial.hbs"
    ];
    return loadTemplates(templatePaths);
}

Hooks.once("init", function(){
    console.log("sigil_and_shadow | Initialising Sigil And Shadow sytem.")
    
    CONFIG.sigil_and_shadow = sigil_and_shadow;

    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("sigil_and_shadow", SigilItemSheet, { makeDefault: true });

    Items.unregisterSheet("core", ActorSheet);
    Items.registerSheet("sigil_and_shadow", SigilActorSheet, { makeDefault: true });

    preloadHandlebarsTemplates();

    Handlebars.registerHelper("times", function(n, content){
        let result = "";
        for (let i=0; i<n; i++){
            result += content.fn(i);
        }
        return result;
    });
});