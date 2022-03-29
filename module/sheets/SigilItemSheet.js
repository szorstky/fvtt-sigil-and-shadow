export default class SigilItemSheet extends ItemSheet {

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            width: 530,
            innerHeight: 360,
            classes: ["sis", "sheet", "item"]
        });
    }

    get tempate() {
        return `systems/sigil_and_shadow/templates/item/${this.item.data.type}-sheet.hbs`
    }    

    getData() {
        const data = super.getData();

        data.config = CONFIG.sigil_and_shadow;
        
        return data;
    }
}