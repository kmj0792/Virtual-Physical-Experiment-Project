const input = document.querySelector('input');
const preview = document.querySelector('.file_list');


input.addEventListener('change', readExcel);
input.addEventListener('click', reset_rows);
function reset_rows(){
    arrObj.rows=[];
    arrObj.yData=[];
    arrObj.xData=[];
}
function readExcel() {
    
    let reader = new FileReader();
    reader.onload = function () {
        let data = reader.result;
        let workBook = XLSX.read(data, { type: 'binary' });
        workBook.SheetNames.forEach(function (sheetName) {
            arrObj.rows = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName]);
        })
    };
    reader.readAsBinaryString(input.files[0]);
}
