import Airtable from "airtable";

const airtable = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
})

export async function getFirstPage(baseId, tableId, selectConfig) {
    const base = airtable.base(baseId);

    return new Promise((resolve, reject) => {
        base(tableId)
            .select(selectConfig)
            .firstPage(function (err, records) {
                if (err) {
                    console.error(err);
                    return;
                }
                debugger;
                resolve(records.map((record) => record.fields));
            });
    });
}

export async function getAllPages(baseId, tableId, selectConfig) {
    const base = airtable.base(baseId);

    let records = [];
    return new Promise((resolve, reject) => {
        base(tableId)
            .select(selectConfig)
            .eachPage(
                function page(recs, fetchNextPage) {
                    recs.forEach(function (record) {
                        records.push(record);
                    });
                    fetchNextPage();
                },
                function done(err) {
                    if (err) {
                        reject([]);
                    }
                    return resolve(records.map((record) => record.fields));
                }
            );
    });
}