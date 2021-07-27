
const input = document.querySelector('input');
const preview = document.querySelector('.file_list');
let rows;
input.addEventListener('change', readExcel);

function readExcel() {
    
    let reader = new FileReader();
    reader.onload = function () {
        let data = reader.result;
        let workBook = XLSX.read(data, { type: 'binary' });
        workBook.SheetNames.forEach(function (sheetName) {
            //console.log('SheetName: ' + sheetName);
            rows = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName]);
        })
    };
    reader.readAsBinaryString(input.files[0]);
}
