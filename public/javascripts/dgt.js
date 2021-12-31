// const Table = require(`../../models/table`);
// const Outcome = require(`../../models/outcome`);

// async function addTableRow() {
//     const tables = await Table.find();
//     const outcomes = await Result.find();
//     console.log(tables);
//     const tr = $(`<tr></tr>`);
//     const th = $(`<th>TEST</th>`);
//     const td = $(`<td><input type="text"></td>`);
//     tr.append(th, td);
//     $(`#table`).append(tr);
// };
// const removeTableRow = () => {
//     const trCtr = $("#table tbody tr").length;
//     if (trCtr > 1) $(`#table tbody tr:last-child`).remove();
// };
// $(document).ready(function() {
//     $(`#add-table-row-btn`).click(function() {
//         addTableRow();
//     });
//     $(`#remove-table-row-btn`).click(function() {
//         removeTableRow();
//     });
// });