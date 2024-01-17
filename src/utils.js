// generate new id field caused MUI table is required unique id field for each row 
export const generateMappedRows = (list) => {
    const rows = list && list.map((branch) => {
        return {
            id: branch.store_id.toString(),
            ...branch
        }
    });
    return rows;
}