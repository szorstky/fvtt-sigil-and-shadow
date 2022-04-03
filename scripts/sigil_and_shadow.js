import { sigil_and_shadow } from "../module/config.js";
import SigilItemSheet from "../module/sheets/SigilItemSheet.js";
import SigilPlayerCharacterSheet from "../module/sheets/SigilPlayerCharacterSheet.js"

async function preloadHandlebarsTemplates() {
    const templatePaths = [
        "systems/sigil_and_shadow/templates/actor/partials/actor-background.hbs",
        "systems/sigil_and_shadow/templates/actor/partials/actor-skills.hbs",
        "systems/sigil_and_shadow/templates/actor/partials/actor-oddities.hbs",
        "systems/sigil_and_shadow/templates/actor/partials/skill-item.hbs"
    ];
    return loadTemplates(templatePaths);
}

Hooks.once("init", function(){
    console.log("sigil_and_shadow | Initialising Sigil And Shadow sytem.")
    
    CONFIG.sigil_and_shadow = sigil_and_shadow;

    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("sigil_and_shadow", SigilItemSheet, { makeDefault: true });

    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("sigil_and_shadow", SigilPlayerCharacterSheet, { makeDefault: true });

    preloadHandlebarsTemplates();

    Handlebars.registerHelper("times", function(n, content){
        let result = "";
        for (let i=0; i<n; i++){
            result += content.fn(i);
        }
        return result;
    });
});