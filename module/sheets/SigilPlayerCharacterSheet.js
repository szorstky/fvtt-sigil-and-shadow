export default class SigilPlayerCharacterSheet extends ActorSheet {

    constructor(...args) {
        super(...args);
    }

    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            width: 530,
            innerHeight: 360,
            classes: ["sis", "sheet", "actor", "player-character"],
            tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-tabs-panel", initial: "skills" }]
        });
    }

    /** @override */
    get template() {
        // return `systems/sigil_and_shadow/templates/actor/${this.actor.data.type}-sheet.html`
        return "systems/sigil_and_shadow/templates/actor/player-character-sheet.hbs"
    }    

    itemContextMenu = [
        {
            name: game.i18n.localize("SIS.sheet.edit"),
            icon: '<i class="fa fa-edit"></i>',
            callback: element => {
                const item = this.actor.getOwnedItem(element.data("item-id"));
                item.sheet.render(true);
            }
        },
        {
            name: game.i18n.localize("SIS.sheet.delete"),
            icon: '<i class="fa fa-trash"></i>',
            callback: element => {
                this.actor.deleteOwnedItem(element.data("item-id"));
            }
        }
    ];

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

        data.skills = actorData.items.filter(function(item){ return item.type == "skill"});
        data.oddities = actorData.items.filter(function(item){ return item.type == "oddity"});
        data.descriptors = actorData.items.filter(function(item){ return item.type == "descriptor"});
        data.perks = actorData.items.filter(function(item){ return item.type == "perk"});
        data.powers = actorData.items.filter(function(item){ return item.type == "power"});

        data.items = actorData.items.filter(function(item){ return item.type == "item"});
        data.weapons = actorData.items.filter(function(item){ return item.type == "weapon"});
        
        return data;
    }

    activateListeners(html) {

        html.find(".item-create").click(this._onItemCreate.bind(this));
        
        html.find(".item-edit").click(this._onItemEdit.bind(this));
        html.find(".item-delete").click(this._onItemDelete.bind(this));
        
        html.find(".inline-edit").change(this._onSkillEdit.bind(this));

        new ContextMenu(html, ".skill-item", this.itemContextMenu);
        
        super.activateListeners(html);
    }

    _newItemToString(type) {
        switch (type) {
            case "skill":
                return game.i18n.localize("SIS.sheet.newSkill")
            default: 
                return game.i18n.localize("SIS.sheet.newItem");
        }
    }

    _onItemCreate(event) {
        event.preventDefault();
        let element = event.currentTarget;
        const item_type = element.dataset.type;

        let itemData = {
            name: this._newItemToString(item_type),
            type: item_type,
        };

        return this.actor.createOwnedItem(itemData);
    }

    _onItemEdit(event) {
        event.preventDefault();
        let element = event.currentTarget;
        let item_id = element.closest(".item").dataset.itemId;
        let item = this.actor.getOwnedItem(item_id);
        return item.sheet.render(true);
    }

    _onItemDelete(event) {
        event.preventDefault();
        let element = event.currentTarget;
        let item_id = element.closest(".item").dataset.itemId;
        return this.actor.deleteOwnedItem(item_id);
    }

    // when to update inline in sheet
    _onSkillEdit(event) {
        event.preventDefault();
        let element = event.currentTarget;
        let item_id = element.closest(".item").dataset.itemId;
        let item = this.actor.getOwnedItem(item_id);
        let field = element.dataset.field;

        return item.update({[field]: element.value});
    }
}