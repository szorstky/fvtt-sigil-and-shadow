import { sigil_and_shadow } from "../module/config.js";
import SigilItemEquipmentSheet from "../module/sheets/SigilItemEquipmentSheet.js";
import SigilItemSheet from "../module/sheets/SigilItemSheet.js";
import SigilItemWeaponSheet from "../module/sheets/SigilItemWeaponSheet.js";
import SigilPlayerCharacterSheet from "../module/sheets/SigilPlayerCharacterSheet.js"

async function preloadHandlebarsTemplates() {
    const templatePaths = [
        "systems/fvtt-sigil-and-shadow/templates/actor/partials/actor-oddities.hbs",
        "systems/fvtt-sigil-and-shadow/templates/actor/partials/actor-descriptors.hbs",
        "systems/fvtt-sigil-and-shadow/templates/actor/partials/actor-skills.hbs",
        "systems/fvtt-sigil-and-shadow/templates/actor/partials/actor-perks.hbs",
        "systems/fvtt-sigil-and-shadow/templates/actor/partials/actor-powers.hbs",
        "systems/fvtt-sigil-and-shadow/templates/actor/partials/actor-weapons.hbs",
        "systems/fvtt-sigil-and-shadow/templates/actor/partials/actor-armour.hbs",
        "systems/fvtt-sigil-and-shadow/templates/actor/partials/actor-equipment.hbs",
        "systems/fvtt-sigil-and-shadow/templates/actor/partials/actor-vehicles.hbs"
    ];
    return loadTemplates(templatePaths);
}

Hooks.once("init", function(){
    console.log("sigil_and_shadow | Initialising Sigil And Shadow sytem.")
    
    CONFIG.sigil_and_shadow = sigil_and_shadow;

    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("sigil_and_shadow", SigilItemEquipmentSheet, { types: ["equipment", "vehicle", "armour"], makeDefault: true });
    Items.registerSheet("sigil_and_shadow", SigilItemWeaponSheet, { types: ["weapon"], makeDefault: true });
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