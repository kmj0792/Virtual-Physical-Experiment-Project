var coeObj={
    a:0,
    b:0,
    c:0,
    a10:0,
    b10:0,
    c10:0
};

var arrObj={
    rows:0,//엑셀 파일의 내용을 json으로 바꾼 것
    xData:0,//x좌표값 배열 선언
    yData:0,//y좌표값 배열 선언
    
    xDataFit:0, //피팅할 범위 x
    yDataFit:0,  //피팅할 범위 y
    
    xRange:0, //드래그된 x범위
    yRange:0, //드래그된 y범위
    
    xmatrix:0,//x좌표의 행렬
    T_xmatrix:0// 전치행렬
};

var ymatrix=new Array(1); //y좌표를 행렬로 받아올 변수 
var type=0; //옵션 선택 값


// 피팅함수 종류가 뭔지 type을 숫자로 받아오는 함수
function change_Type(e){
    const value = e.value;
    type=value;
}

function action_button(){
    arrObj.yData=[];
    arrObj.xData=[];
    //const xname = document.getElementById('directory_xdata').value;
    //const yname = document.getElementById('directory_ydata').value;
    getdata();
    getGraph_select_range(arrObj.xData, arrObj.yData);
}
   

function getdata(){
    for(var i=0; i<arrObj.rows.length; i++){
        arrObj.xData.push(arrObj.rows[i]["x"]);
        arrObj.yData.push(arrObj.rows[i]["y"]);
    }
}
//다중 그래프 그리기 
function getGraph(data_x, data_y, fit_x, fit_y , type){
    var Graph=document.getElementById('myGraph');
    var trace1 = {
            x: data_x,
            y: data_y,
            type: 'scatter',
            mode: 'lines+markers', // 점 안찍히고 라인만 
            line:{
                color:"black"
            }
    };

    var trace2 = {
            x: fit_x,
            y: fit_y,
            type: 'scatter',
            mode: 'lines', // 점 안찍히고 라인만 
            line:{
                color:"red"
            }
    };
    var data = [trace1, trace2];
    var layout = {
        title: 'Least Squares Fitting Graph',
        font:{size:10},
        showlegend: false
    };
    var config={
        displayModeBar: true,
        responsive: true,
        modeBarButtonsToRemove: ['lasso2d','autoScale2d','toggleSpikelines','select2d'],
        displaylogo:false
    };
    Plotly.newPlot(Graph, data, layout,config);
    if (type==1){
        document.getElementById('fitting_result').innerHTML="f(X) = " + coeObj.a10 +"x + (" +coeObj.b10+")"
        //Plotly.relayout(where, 'title',`y = ${a10}x + ${b10}`);
    }else if (type==2){
        document.getElementById('fitting_result').innerHTML="f(X) = " + coeObj.a10 +"x² + (" +coeObj.b10+")x + (" + coeObj.c10+")"
        //Plotly.relayout(where, 'title',`y = ${a10}x² + ${b10}x + ${c10}`);
    }else if(type==3){
        document.getElementById('fitting_result').innerHTML="f(X) = " + coeObj.a10 +"sin(x) + (" +coeObj.b10+")"
        //Plotly.relayout(where, 'title',`y = ${a10} sin(x) + ${b10}`);
    }else if(type==4){
        document.getElementById('fitting_result').innerHTML="f(X) = " + coeObj.a10 +"cos(x) + (" +coeObj.b10+")"
        //Plotly.relayout(where, 'title',`y = ${a10} cos(x) + ${b10}`);
    }
}


//영역 선택할 수 있는 그래프 
function getGraph_select_range(data_x, data_y){
    var Graph = document.getElementById('myGraph');
    var d3 = Plotly.d3;
    var formatter = d3.format('.3f');
    var data=[{
        mode: 'lines+markers',
        x: data_x,
        y: data_y,
        line:{color:'black'}
    }];
    var layout={
        title : 'Graph',
        font:{size:12, family:"Times New Roman"},
        dragmode: 'select',
        paper_bgcolor:"rgba(231, 201, 3, 0.51)",//전체 배경
        plot_bgcolor:"rgba(255, 255, 255, 0.51)",//그래프 부분 배경
        bordercolor:"rgba(0, 0, 0, 1)"
        
    };
    var config={
        displayModeBar: true,
        responsive: true,
        modeBarButtonsToRemove: ['lasso2d','autoScale2d','toggleSpikelines'], //plotly 기본 버튼 중 제거할 것 (선택하기)
        displaylogo:false
    };
    
    Plotly.newPlot(Graph, data, layout, config);
//Lasso Select , Produced with Plotly
    Graph.on('plotly_selected', (eventData) => {
        arrObj.xRange = eventData.range.x;
        arrObj.yRange = eventData.range.y;
        document.getElementById('range').innerHTML="x range : "+ "["+ arrObj.xRange.map(formatter).join(' ~ ')+"]"+ "<br>"+"y range : "+ "["+arrObj.yRange.map(formatter).join(' ~ ')+"]"
       // Plotly.relayout('myGraph', 'title','Graph'        );
    }); 
}

//행렬만들기 - 행렬 반환
const metrix=()=>{
    var x;
    var xx;
    var y;
    
    for (var i = 0; i < arrObj.xmatrix.length; i++) {
        arrObj.xmatrix[i] = new Array(3); 
    }

    for(var j=0; j<arrObj.T_xmatrix.length; j++){
        arrObj.T_xmatrix[j]=new Array(arrObj.xDataFit.length);
    }

    for(var i=0; i<arrObj.chartData_zoom.length; i++){
        y=arrObj.chartData_zoom[i];
        ymatrix[i]=[y];
    }

    for(var i=0; i<arrObj.xDataFit.length;i++){
        x = arrObj.xDataFit[i]; 
        xx=x*x;
        arrObj.xmatrix[i]=[1,x,xx];           
    }
   
    return arrObj.xmatrix;
    
};

const metrix_sin=()=>{
    var x;
    var sin_x;
    var y;
    
    for (var i = 0; i < arrObj.xmatrix.length; i++) {
        arrObj.xmatrix[i] = new Array(2); 
    }

    for(var j=0; j<arrObj.T_xmatrix.length; j++){
        arrObj.T_xmatrix[j]=new Array(arrObj.xDataFit.length);
    }

    for(var i=0; i<arrObj.chartData_zoom.length; i++){
        y=arrObj.chartData_zoom[i];
        ymatrix[i]=[y];
    }

    for(var i=0; i<arrObj.xDataFit.length;i++){
        x = arrObj.xDataFit[i]; 
        sin_x=Math.sin(x);
        arrObj.xmatrix[i]=[sin_x,1];           
    }
   
    return arrObj.xmatrix;
    
};

const metrix_cos=()=>{
    var x;
    var cos_x;
    var y;
    
    for (var i = 0; i < arrObj.xmatrix.length; i++) {
        arrObj.xmatrix[i] = new Array(2); 
    }

    for(var j=0; j<arrObj.T_xmatrix.length; j++){
        arrObj.T_xmatrix[j]=new Array(arrObj.xDataFit.length);
    }

    for(var i=0; i<arrObj.chartData_zoom.length; i++){
        y=arrObj.chartData_zoom[i];
        ymatrix[i]=[y];
    }

    for(var i=0; i<arrObj.xDataFit.length;i++){
        x = arrObj.xDataFit[i]; 
        cos_x=Math.cos(x);
        arrObj.xmatrix[i]=[cos_x,1];           
    }
   
    return arrObj.xmatrix;
    
};

//행렬 곱 구하기 - 곱한 결과 행렬 반환
function tarrXarr(tarr, arr){
    return tarr.map((row) => arr[0].map((x,y) => row.reduce((a,b,c) => a + b * arr[c][y], 0)))
}

//선형최소제곱 알고리즘 1차
const findLineByLeastSquares_1 = (values_x, values_y)=> { 
    var x_sum = 0; 
    var y_sum = 0; 
    var xy_sum = 0; 
    var xx_sum = 0; 
    var count = 0; 
    var x = 0; 
    var y = 0; 
    var values_length = values_x.length; 

    if (values_length != values_y.length) { 
        throw new Error ( 'values_x 및 values_y 매개 변수의 크기가 같아야합니다!'); 
    } 

    if (values_length === 0) { 
        return [[], []]; 
    } 


    for (let i = 0; i <values_length; i ++) { 
        x = values_x [i]; 
        y = values_y [i]; 
        x_sum += x; 
        y_sum += y; //= Y
        xx_sum += x * x; 
        xy_sum += x * y; 
        count ++; 
    } 

    coeObj.a = (count * xy_sum-x_sum * y_sum) / (count * xx_sum-x_sum * x_sum); 
    coeObj.b = (y_sum / count)-(coeObj.a * x_sum) / count; 
 
    var result_values_x = [];
    var result_values_y = []; 

    for (let i = 0; i <values_length; i ++) { 
            x = values_x [i]; 
            y = x * coeObj.a + coeObj.b; 
            result_values_x.push (x); 
            result_values_y.push (y); 
    } 
    coeObj.a10=coeObj.a.toFixed(10);//10자리수까지 반올림
    coeObj.b10=coeObj.b.toFixed(10); 
    //document.getElementById('output').innerHTML="y = " +m+"x + "+"("+b+")"
    return [result_values_x, result_values_y]; 
};

//선형최소제곱 알고리즘 2차 
const findLineByLeastSquares_2=(values_x,values_y)=>{
    var inverted,abc;//x좌표의 역행렬, 계수행렬
    var Coe;//(A_t A)'(A_t)까지 한 것
    var x,y;
    metrix(); //arr 리턴
    zip=rows=>rows[0].map((_,c)=>rows.map(row=>row[c]))
    arrObj.T_xmatrix= zip([...arrObj.xmatrix]) //전치된 행렬 t_arr
    inverted = math.inv(tarrXarr(arrObj.T_xmatrix, arrObj.xmatrix)); //역행렬 구하기 
    Coe=tarrXarr(inverted, arrObj.T_xmatrix);
    abc=tarrXarr(Coe, ymatrix); //이차함수 계수 행렬 abc
    coeObj.a=abc[2][0];
    coeObj.b=abc[1][0];
    coeObj.c=abc[0][0];

    if (values_x.length != values_y.length) { 
        throw new Error ( 'values_x 및 values_y 매개 변수의 크기가 같아야합니다!'); 
    } 

    if (values_x.length === 0) { 
        return [[], []]; 
    } 

    var result_values_x = [];
    var result_values_y = []; 

    for (let i = 0; i <values_x.length; i ++) { 
            x = values_x[i]; 
            y = x * x * coeObj.a + coeObj.b*x + coeObj.c; 
            result_values_x.push (x); 
            result_values_y.push (y); 
    } 
    coeObj.a10=coeObj.a.toFixed(10);
    coeObj.b10=coeObj.b.toFixed(10);
    coeObj.c10=coeObj.c.toFixed(10);
       
    return [result_values_x, result_values_y]; 
  
};

//선형최소제곱 알고리즘 _sin
//삼각함수 f(x) = p1*sin(x) + p2로 근사
function findLineByLeastSquares_sin(values_x,values_y){
    var inverted,abc;//x좌표의 역행렬, 계수행렬
    var Coe;//(A_t A)'(A_t)까지 한 것
    var x,y;
    metrix_sin();
    zip=rows=>rows[0].map((_,c)=>rows.map(row=>row[c]))
    arrObj.T_xmatrix= zip([...arrObj.xmatrix]) //전치된 행렬 t_arr
    inverted = math.inv(tarrXarr(arrObj.T_xmatrix, arrObj.xmatrix)); //역행렬 구하기 
    Coe=tarrXarr(inverted, arrObj.T_xmatrix);
    abc=tarrXarr(Coe, ymatrix); //이차함수 계수 행렬 abc
    coeObj.a=abc[0][0];
    coeObj.b=abc[1][0];
    
    if (values_x.length != values_y.length) { 
        throw new Error ( 'values_x 및 values_y 매개 변수의 크기가 같아야합니다!'); 
    } 

    if (values_x.length === 0) { 
        return [[], []]; 
    } 

    var result_values_x = [];
    var result_values_y = []; 

    for (let i = 0; i <values_x.length; i ++) { 
            x = values_x[i]; 
            y = coeObj.a*(Math.sin(x))+ coeObj.b; 
            result_values_x.push (x); 
            result_values_y.push (y); 
    } 
    coeObj.a10=coeObj.a.toFixed(10);
    coeObj.b10=coeObj.b.toFixed(10);
   
       
    return [result_values_x, result_values_y]; 
}

//선형최소제곱 알고리즘 _cos
//삼각함수 f(x) = p1*cos(x) + p2로 근사
function findLineByLeastSquares_cos(values_x,values_y){
    var inverted,abc;//x좌표의 역행렬, 계수행렬
    var Coe;//(A_t A)'(A_t)까지 한 것
    var x,y;
    metrix_cos();
    zip=rows=>rows[0].map((_,c)=>rows.map(row=>row[c]))
    arrObj.T_xmatrix= zip([...arrObj.xmatrix]) //전치된 행렬 t_arr
    inverted = math.inv(tarrXarr(arrObj.T_xmatrix, arrObj.xmatrix)); //역행렬 구하기 
    Coe=tarrXarr(inverted, arrObj.T_xmatrix);
    abc=tarrXarr(Coe, ymatrix); //이차함수 계수 행렬 abc
    coeObj.a=abc[0][0];
    coeObj.b=abc[1][0];
    
    if (values_x.length != values_y.length) { 
        throw new Error ( 'values_x 및 values_y 매개 변수의 크기가 같아야합니다!'); 
    } 

    if (values_x.length === 0) { 
        return [[], []]; 
    } 

    var result_values_x = [];
    var result_values_y = []; 

    for (let i = 0; i <values_x.length; i ++) { 
            x = values_x[i]; 
            y = coeObj.a*(Math.cos(x))+ coeObj.b; 
            result_values_x.push (x); 
            result_values_y.push (y); 
    } 
    coeObj.a10=coeObj.a.toFixed(10);
    coeObj.b10=coeObj.b.toFixed(10);
   
       
    return [result_values_x, result_values_y]; 
}

//fitting그래프 띄우기 - 추후 보완
function fit(){ //select color
        var max_value,min_value;
        var i_x_min=0;
        var i_x_max=0;

        while(arrObj.xData[i_x_min] <= arrObj.xRange[0]){
            i_x_min++;
        }
        while(arrObj.xData[i_x_max] <= arrObj.xRange[1]){
            i_x_max++;
        }
        min_value=i_x_min;
        max_value=i_x_max;
       
        arrObj.xDataFit = arrObj.xData.slice(min_value, max_value);
        arrObj.chartData_zoom = arrObj.yData.slice(min_value, max_value);
        // arr를 배열로 만들어주는 위치가 중요함. 
        //chartLabels_zoom이 값을 가진 후에 놓여야함.
        arrObj.xmatrix = new Array(arrObj.xDataFit.length);//x좌표를 행렬로 받아올 변수 
       // t_arr = new Array(3);//전치행렬

        var fit_xy;
        if(type==1){
            fit_xy = findLineByLeastSquares_1(arrObj.xDataFit, arrObj.chartData_zoom); //선형제곱 1차 피팅
        } else if(type==2){
            arrObj.T_xmatrix = new Array(3);//전치행렬
            fit_xy = findLineByLeastSquares_2(arrObj.xDataFit, arrObj.chartData_zoom); //선형제곱 2차 피팅
        } else if(type==3){
            arrObj.T_xmatrix = new Array(2);//전치행렬
            fit_xy = findLineByLeastSquares_sin(arrObj.xDataFit, arrObj.chartData_zoom); //선형제곱 sin 피팅
        }else if(type==4){
            arrObj.T_xmatrix = new Array(2);//전치행렬
            fit_xy = findLineByLeastSquares_cos(arrObj.xDataFit, arrObj.chartData_zoom); //선형제곱 sin 피팅
        }else if(type==0)
       {
        alert('옵션을 선택해 주세요');
       }

        getGraph(arrObj.xDataFit,arrObj.chartData_zoom,fit_xy[0], fit_xy[1],  type); 
}

function reset(){
    window.location.reload();
}

