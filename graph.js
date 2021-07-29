//좌표값 배열 선언
var chartLabels=[];
var chartData=[];

var xRange=[]; //드래그된 x범위
var yRange=[]; //드래그된 y범위

var max_value; //피팅할 부분의 최대 인덱스값
var min_value; //피팅할 부분의 최소 인덱스값

var chartLabels_zoom=[]; //피팅할 범위 x
var chartData_zoom = []; //피팅할 범위 y

var a,b,c; // 함수의 계수 a,b,c
var a10,b10,c10; // 함수의 계수 반올림한 값

var arr,t_arr,inverted,abc;//x좌표의 행렬, 전치행렬, 역행렬, 계수행렬
var arr_y=new Array(1); //y좌표를 행렬로 받아올 변수 
var memo;

var Coe;//(A_t A)'(A_t)까지 한 것
var type=0; //옵션 선택 값


// 피팅함수 종류가 뭔지 type을 숫자로 받아오는 함수
function change_Type(e){
    const value = e.value;
    type=value;
}

   


function getdata(x,y){
  
    for(var i=0; i<rows.length; i++){
        chartLabels.push(rows[i][x]);
        chartData.push(rows[i][y]);
        if(chartLabels.length>rows.length){
            chartLabels.pop();
            chartData.pop();
        }
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
        document.getElementById('fitting_result').innerHTML="f(X) = " + a10 +"x + (" +b10+")"
        //Plotly.relayout(where, 'title',`y = ${a10}x + ${b10}`);
    }else if (type==2){
        document.getElementById('fitting_result').innerHTML="f(X) = " + a10 +"x² + (" +b10+")x + (" + c10+")"
        //Plotly.relayout(where, 'title',`y = ${a10}x² + ${b10}x + ${c10}`);
    }else if(type==3){
        document.getElementById('fitting_result').innerHTML="f(X) = " + a10 +"sin(x) + (" +b10+")"
        //Plotly.relayout(where, 'title',`y = ${a10} sin(x) + ${b10}`);
    }else if(type==4){
        document.getElementById('fitting_result').innerHTML="f(X) = " + a10 +"cos(x) + (" +b10+")"
        //Plotly.relayout(where, 'title',`y = ${a10} cos(x) + ${b10}`);
    }
}

//수정해야할 부분 : 파일 선택 없이 버튼 눌렀을때 alert이벤트 발생
function action_button(){
    const xname = document.getElementById('directory_xdata').value;
    const yname = document.getElementById('directory_ydata').value;
    console.log(xname);
    console.log(yname);
    getdata(xname, yname);
    getGraph_select_range(chartLabels, chartData);
}


//document.getElementById('range').innerHTML="x range : "+ "["+ xRange.map(formatter).join(' ~ ')+"]"+ "<br>"+"y range : "+ "["+yRange.map(formatter).join(' ~ ')+"]"
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
        font:{size:10},
        dragmode: 'select'
    };
    var config={
        displayModeBar: true,
        responsive: true,
        modeBarButtonsToRemove: ['lasso2d','autoScale2d','toggleSpikelines'], //plotly 기본 버튼 중 제거할 것 (선택하기)
        displaylogo:false
    };
    Plotly.newPlot(Graph, data, layout, config ,);
//Lasso Select , Produced with Plotly
    Graph.on('plotly_selected', (eventData) => {
        xRange = eventData.range.x;
        yRange = eventData.range.y;
        document.getElementById('range').innerHTML="x range : "+ "["+ xRange.map(formatter).join(' ~ ')+"]"+ "<br>"+"y range : "+ "["+yRange.map(formatter).join(' ~ ')+"]"
       // Plotly.relayout('myGraph', 'title','Graph'        );
    }); 

}

//행렬만들기 - 행렬 반환
const metrix=()=>{
    var x;
    var xx;
    var y;
    
    for (var i = 0; i < arr.length; i++) {
        arr[i] = new Array(3); 
    }

    for(var j=0; j<t_arr.length; j++){
        t_arr[j]=new Array(chartLabels_zoom.length);
    }

    for(var i=0; i<chartData_zoom.length; i++){
        y=chartData_zoom[i];
        arr_y[i]=[y];
    }

    for(var i=0; i<chartLabels_zoom.length;i++){
        x = chartLabels_zoom[i]; 
        xx=x*x;
        arr[i]=[1,x,xx];           
    }
   
    return arr;
    
};

const metrix_sin=()=>{
    var x;
    var sin_x;
    var y;
    
    for (var i = 0; i < arr.length; i++) {
        arr[i] = new Array(2); 
    }

    for(var j=0; j<t_arr.length; j++){
        t_arr[j]=new Array(chartLabels_zoom.length);
    }

    for(var i=0; i<chartData_zoom.length; i++){
        y=chartData_zoom[i];
        arr_y[i]=[y];
    }

    for(var i=0; i<chartLabels_zoom.length;i++){
        x = chartLabels_zoom[i]; 
        sin_x=Math.sin(x);
        arr[i]=[sin_x,1];           
    }
   
    return arr;
    
};

const metrix_cos=()=>{
    var x;
    var cos_x;
    var y;
    
    for (var i = 0; i < arr.length; i++) {
        arr[i] = new Array(2); 
    }

    for(var j=0; j<t_arr.length; j++){
        t_arr[j]=new Array(chartLabels_zoom.length);
    }

    for(var i=0; i<chartData_zoom.length; i++){
        y=chartData_zoom[i];
        arr_y[i]=[y];
    }

    for(var i=0; i<chartLabels_zoom.length;i++){
        x = chartLabels_zoom[i]; 
        cos_x=Math.cos(x);
        arr[i]=[cos_x,1];           
    }
   
    return arr;
    
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

    a = (count * xy_sum-x_sum * y_sum) / (count * xx_sum-x_sum * x_sum); 
    b = (y_sum / count)-(a * x_sum) / count; 
 
    var result_values_x = [];
    var result_values_y = []; 

    for (let i = 0; i <values_length; i ++) { 
            x = values_x [i]; 
            y = x * a + b; 
            result_values_x.push (x); 
            result_values_y.push (y); 
    } 
    a10=a.toFixed(10);//10자리수까지 반올림
    b10=b.toFixed(10); 
    //document.getElementById('output').innerHTML="y = " +m+"x + "+"("+b+")"
    return [result_values_x, result_values_y]; 
};

//선형최소제곱 알고리즘 2차 
const findLineByLeastSquares_2=(values_x,values_y)=>{
    var x,y;
    metrix(); //arr 리턴
    zip=rows=>rows[0].map((_,c)=>rows.map(row=>row[c]))
    t_arr= zip([...arr]) //전치된 행렬 t_arr
    inverted = math.inv(tarrXarr(t_arr, arr)); //역행렬 구하기 
    Coe=tarrXarr(inverted, t_arr);
    abc=tarrXarr(Coe, arr_y); //이차함수 계수 행렬 abc
    a=abc[2][0];
    b=abc[1][0];
    c=abc[0][0];

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
            y = x * x * a + b*x + c; 
            result_values_x.push (x); 
            result_values_y.push (y); 
    } 
    a10=a.toFixed(10);
    b10=b.toFixed(10);
    c10=c.toFixed(10);
       
    return [result_values_x, result_values_y]; 
  
};

//선형최소제곱 알고리즘 _sin
//삼각함수 f(x) = p1*sin(x) + p2로 근사
function findLineByLeastSquares_sin(values_x,values_y){
    var x,y;
    metrix_sin();
    zip=rows=>rows[0].map((_,c)=>rows.map(row=>row[c]))
    t_arr= zip([...arr]) //전치된 행렬 t_arr
    inverted = math.inv(tarrXarr(t_arr, arr)); //역행렬 구하기 
    Coe=tarrXarr(inverted, t_arr);
    abc=tarrXarr(Coe, arr_y); //이차함수 계수 행렬 abc
    a=abc[0][0];
    b=abc[1][0];
    
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
            y = a*(Math.sin(x))+ b; 
            result_values_x.push (x); 
            result_values_y.push (y); 
    } 
    a10=a.toFixed(10);
    b10=b.toFixed(10);
   
       
    return [result_values_x, result_values_y]; 
}

//선형최소제곱 알고리즘 _cos
//삼각함수 f(x) = p1*cos(x) + p2로 근사
function findLineByLeastSquares_cos(values_x,values_y){
    var x,y;
    metrix_cos();
    zip=rows=>rows[0].map((_,c)=>rows.map(row=>row[c]))
    t_arr= zip([...arr]) //전치된 행렬 t_arr
    inverted = math.inv(tarrXarr(t_arr, arr)); //역행렬 구하기 
    Coe=tarrXarr(inverted, t_arr);
    abc=tarrXarr(Coe, arr_y); //이차함수 계수 행렬 abc
    a=abc[0][0];
    b=abc[1][0];
    
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
            y = a*(Math.cos(x))+ b; 
            result_values_x.push (x); 
            result_values_y.push (y); 
    } 
    a10=a.toFixed(10);
    b10=b.toFixed(10);
   
       
    return [result_values_x, result_values_y]; 
}

//fitting그래프 띄우기 - 추후 보완
function fit(fit_color, range_color){ //select color

        var i_x_min=0;
        var i_x_max=0;
        //var i_y_min=0; // 영역 선택 부분 다시 보완해야함. 
        //var i_y_max=0; // 영역 선택 부분 다시 보완해야함. 

        while(chartLabels[i_x_min] <= xRange[0]){
            i_x_min++;
        }
        while(chartLabels[i_x_max] <= xRange[1]){
            i_x_max++;
        }
        min_value=i_x_min;
        max_value=i_x_max;
        /*
        while(chartData[i_y_min] <= yRange[0]){
            i_y_min++;
        }
        while(chartData[i_y_max] <= yRange[1]){
            i_y_max++;
        }


        if(i_x_max>=i_y_max){
            max_value=i_y_max;
        }else{
            max_value=i_x_max;
        }

        if(i_x_min>=i_y_min){
            min_value=i_x_min;
        }else{
            min_value=i_y_min;
        }
*/
        chartLabels_zoom = chartLabels.slice(min_value, max_value);
        chartData_zoom = chartData.slice(min_value, max_value);
        // arr를 배열로 만들어주는 위치가 중요함. 
        //chartLabels_zoom이 값을 가진 후에 놓여야함.
        arr = new Array(chartLabels_zoom.length);//x좌표를 행렬로 받아올 변수 
       // t_arr = new Array(3);//전치행렬

        var fit_xy;
        if(type==1){
            fit_xy = findLineByLeastSquares_1(chartLabels_zoom, chartData_zoom); //선형제곱 1차 피팅
        } else if(type==2){
            t_arr = new Array(3);//전치행렬
            fit_xy = findLineByLeastSquares_2(chartLabels_zoom, chartData_zoom); //선형제곱 2차 피팅
        } else if(type==3){
            t_arr = new Array(2);//전치행렬
            fit_xy = findLineByLeastSquares_sin(chartLabels_zoom, chartData_zoom); //선형제곱 sin 피팅
        }else if(type==4){
            t_arr = new Array(2);//전치행렬
            fit_xy = findLineByLeastSquares_cos(chartLabels_zoom, chartData_zoom); //선형제곱 sin 피팅
        }else if(type==0)
       {
        alert('옵션을 선택해 주세요');
       }

        getGraph(chartLabels_zoom,chartData_zoom,fit_xy[0], fit_xy[1],  type); 
}

/*
function input(){
    var input_x = document.getElementById("input_x").value;
    var input_y = document.getElementById("input_y").value;
    temp = [input_x,input_y];
    remove();
}
*/
/*
//여기서 문제 발생 : x좌표가 다르고 y좌표가 같으면 
function remove(){
    var i;
    var chartL_max=Math.max.apply(null, chartLabels);
    var chartD_max=Math.max.apply(null, chartData);
    var chartL_min=Math.min.apply(null, chartLabels);
    var chartD_min=Math.min.apply(null, chartData);

    for(i=0; i<chartLabels.length; i++){
        if(((chartL_min<=temp[0]) && (chartL_max>=temp[0]))&&((chartD_min<=temp[1]) && (chartD_max>=temp[1]))){

            if((chartLabels[i]==temp[0])&&(chartData[i]==temp[1])){
                //var Label_temp=chartLabels.slice();
                //var Data_temp=chartData.slice();
                alert('좌표 (' + chartLabels[i] +' , ' + chartData[i] + ')을 삭제합니다.');
                chartLabels.splice(i,1);
                chartData.splice(i,1);
                break;
            } 
            else if((chartLabels[i]!=temp[0])&&(chartData[i]==temp[1])){
                alert('좌표를 다시 입력하시오');
                break;
            }
            else if((chartLabels[i]==temp[0])&&(chartData[i]!=temp[1])){
                alert('좌표를 다시 입력하시오');
                break;
            }else{
                alert('좌표를 다시 입력하시오');
                break;
            }
    }
}
}
*/

function reset(){
    window.location.reload();
}

