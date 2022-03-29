export default class SigilPlayerCharacterSheet extends ActorSheet {

    constructor(...args) {
        super(...args);
    }

    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            width: 530,
            innerHeight: 360,
            classes: ["sis", "sheet", "actor", "player-character"]
        });
    }

    /** @override */
    get template() {
        // return `systems/sigil_and_shadow/templates/actor/${this.actor.data.type}-sheet.html`
        return "systems/sigil_and_shadow/templates/actor/player-character-sheet.hbs"
    }    

    /** @override */
    getData(options) {
        let isOwner = this.actor.isOwner;
        const data = {
        owner: isOwner,
        limited: this.actor.limited,
        options: this.options,
        editable: this.isEditable,
        // cssClass: isOwner ? "editable" : "locked",
        // isCharacter: this.actor.type === "character",
        // isNPC: this.actor.type === "npc",
        // isVehicle: this.actor.type === "vehicle",
        config: CONFIG.sigil_and_shadow,
        // rollData: this.actor.getRollData.bind(this.actor)
        };

        // The Actor's data
        const actorData = this.actor.data.toObject(false);
        const source = this.actor.data._source.data;

        data.actor = actorData;
        data.data = actorData.data;

        data.oddities = data.items.filter(function(item){ return item.type == "oddity"});
        data.descriptors = data.items.filter(function(item){ return item.type == "descriptor"});
        data.perks = data.items.filter(function(item){ return item.type == "perk"});
        data.powers = data.items.filter(function(item){ return item.type == "power"});

        data.equipment = data.items.filter(function(item){ return item.type == "equipment"});
        data.weapons = data.items.filter(function(item){ return item.type == "weapon"});
        
        return data;
    }
}