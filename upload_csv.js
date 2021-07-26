
const input = document.querySelector('input');
const preview = document.querySelector('.file_list');
let rows;
input.addEventListener('change', showTextFile);

function showTextFile() {
    const selectedFiles = input.files;
    console.log(selectedFiles);//확인차
    const list = document.createElement('ul');
    preview.appendChild(list);
    for(const file of selectedFiles) {
        const listItem = document.createElement('li');
        const summary = document.createElement('div');
        summary.textContent = file.webkitRelativePath;
        listItem.appendChild(summary);
        //list.appendChild(listItem);
    }
    readExcel();
}

function readExcel() {
    
    let reader = new FileReader();
    reader.onload = function () {
        let data = reader.result;
        let workBook = XLSX.read(data, { type: 'binary' });
        workBook.SheetNames.forEach(function (sheetName) {
            //console.log('SheetName: ' + sheetName);
            rows = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName]);
            //console.log(JSON.stringify(rows));
        })
    };
    reader.readAsBinaryString(input.files[0]);
}

