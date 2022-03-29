export default class SigilItemSheet extends ItemSheet {

    constructor(...args) {
        super(...args);
    }

    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            width: 520,
            innerHeight: 360,
            classes: ["sis", "sheet", "item"]
        });
    }

    /** @override */
    get template() {
        return `systems/sigil_and_shadow/templates/item/${this.item.data.type}-sheet.hbs`
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