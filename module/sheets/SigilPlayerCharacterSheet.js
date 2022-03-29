export default class SigilPlayerCharacterSheet extends ActorSheet {

    constructor(...args) {
        super(...args);
    }

    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            width: 530,
            innerHeight: 360,
            classes: ["sis", "sheet", "actor"]
        });
    }

    /** @override */
    get template() {
        // return `systems/sigil_and_shadow/templates/actor/${this.actor.data.type}-sheet.html`
        return "systems/sigil_and_shadow/templates/actor/player-character-sheet.html"
    }    

    /** @override */
    getData() {
        const data = super.getData();

        data.config = CONFIG.sigil_and_shadow;

        data.oddities = data.items.filter(function(item){ return item.type == "oddity"});
        data.descriptors = data.items.filter(function(item){ return item.type == "descriptor"});
        data.perks = data.items.filter(function(item){ return item.type == "perk"});
        data.powers = data.items.filter(function(item){ return item.type == "power"});

        data.equipment = data.items.filter(function(item){ return item.type == "equipment"});
        data.weapons = data.items.filter(function(item){ return item.type == "weapon"});
        
        return data;
    }
}