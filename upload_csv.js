//파일업로드에 필요한 코드들 
const input = document.querySelector('#file');


input.addEventListener('change', readExcel);//파일이 바뀌면
input.addEventListener('click', reset_rows);//파일이 클릭되면

//파일선택 버튼이 클릭될때마다 배열들 초기화하기
function reset_rows(){
    arrObj.rows=[];
    arrObj.yData=[];
    arrObj.xData=[];
}

//파일이 바뀔때마다 엑셀을 json으로 
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
