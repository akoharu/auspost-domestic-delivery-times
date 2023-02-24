// Get delivery estimates table from html above
let dataku = [];
const element = document.querySelectorAll('.accordion');
// iterate over each table
element.forEach((el) => {
    // get the table caption
    if (el.querySelector('caption') === null) {
        return;
    }
    const rteWrapper = el.querySelector('.rte-wrapper');

    if (rteWrapper === null) {
        return;
    }

    const destination = rteWrapper.innerText

    // get the tables
    const tables = el.querySelectorAll('table');

    let data = [];

    // iterate over each table
    tables.forEach((table) => {

        // get the table caption
        const caption = table.querySelector('caption').innerText;

        // get the table rows
        const rows = table.querySelectorAll('tr');
        
        let tableData = [];
        // iterate over each row

        rows.forEach((row) => {
            // get the row cells
            // th is origin suburb
            // td1 is min days
            // td2 is max days
            const cells = row.querySelectorAll('th, td');
            let from = cells[0].innerText;
            let minimumDays = cells[1].innerText;
            let maximumDays = cells[2].innerText;

            if (from.length === 0) {
                return;
            }

            tableData.push({
                from : from,
                minimumDays : minimumDays.split(' ')[0],
                maximumDays : maximumDays.split(' ')[0]
            });
        });

        // remove the first row
        tableData.shift();

        data.push({
            type : caption,
            data : tableData
        });
    });

    dataku.push({
        destination : destination,
        origin : data
    });
});

dataku;