// Get delivery estimates table from html above
let dataku = [];
let debug = [];
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

            // if all th skip
            if (cells.item(0).tagName === 'TH' && cells.item(1).tagName === 'TH' && cells.item(2).tagName === 'TH') {
                return;
            }

            let from = cells[0].innerText;
            // get the min and max days from the 2nd p tag in the td
            const minimumDays = cells[1].querySelector('td :nth-child(2)').innerText;
            const maximumDays = cells[2].querySelector('td :nth-child(2)').innerText;

            tableData.push({
                from : from,
                minimumDays : minimumDays.split(' ')[0],
                maximumDays : maximumDays.split(' ')[0]
            });
        });

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