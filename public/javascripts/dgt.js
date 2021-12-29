const addTraitRow = () => {
    $(`#traits-table`).css(`display`, `block`);
}
const hideFirstTraitRow = () => {
    $(`#traits-table`).css(`display`, `none`);
}
$(document).ready(function() {
    hideFirstTraitRow();
    $(`#add-trait`).click(function() {
        addTraitRow();
    });
});