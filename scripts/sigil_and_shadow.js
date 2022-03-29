import { sigil_and_shadow } from "../module/config.js";
import SigilItemSheet from "../module/sheets/SigilItemSheet";

Hooks.once("init", function(){
    console.log("sigil_and_shadow | Initialising Sigil And Shadow sytem.")
    
    CONFIG.sigil_and_shadow = sigil_and_shadow;

    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("sigil_and_shadow", SigilItemSheet, { makeDefault: true });
});