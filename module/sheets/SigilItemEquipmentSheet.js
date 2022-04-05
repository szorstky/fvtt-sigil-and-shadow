export default class SigilItemEquipmentSheet extends ItemSheet {

    constructor(...args) {
        super(...args);
    }

    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            width: 340,
            innerHeight: 480,
            classes: ["sis", "sheet", "item", "equipment"]
        });
    }

    /** @override */
    get template() {
        return `systems/sigil_and_shadow/templates/item/equipment-sheet.hbs`
    }    

    /** @override */
    getData(options) {
        const data = super.getData(options);
        const itemData = data.data;

        data.config = CONFIG.sigil_and_shadow;
        data.item = itemData;
        data.data = itemData.data;
        return data;
    }
}