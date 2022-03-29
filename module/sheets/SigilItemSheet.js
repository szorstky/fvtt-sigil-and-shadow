export default class SigilItemSheet extends ItemSheet {

    constructor(...args) {
        super(...args);
    }

    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            width: 530,
            innerHeight: 360,
            classes: ["sis", "sheet", "item"]
        });
    }

    /** @override */
    get template() {
        return `systems/sigil_and_shadow/templates/item/${this.item.data.type}-sheet.html`
    }    

    /** @override */
    getData() {
        const data = super.getData();

        data.config = CONFIG.sigil_and_shadow;
        
        return data;
    }
}