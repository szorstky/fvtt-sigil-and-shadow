export default class SigilItemSheet extends ItemSheet {

    constructor(...args) {
        super(...args);
    }

    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            width: 620,
            innerHeight: 380,
            classes: ["sis", "sheet", "item"]
        });
    }

    /** @override */
    get template() {
        return `systems/fvtt-sigil-and-shadow/templates/item/${this.item.data.type}-sheet.hbs`
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