//좌표값 배열 선언
/*
var chartLabels = [0.05,0.1,0.15,0.2,0.25,0.3,0.35,0.4,0.45,0.5,0.55,0.6,0.65,0.7,
    0.75,0.8,0.85,0.9,0.95,1,1.05,1.1,1.15,1.2,1.25,1.3,1.35,1.4,1.45,1.5,1.55,1.6,
    1.65,1.7,1.75,1.8,1.85,1.9,1.95,2,2.05,2.1,2.15,2.2,2.25,2.3,2.35,2.4,2.45,2.5,
    2.55,2.6,2.65,2.7,2.75,2.8,2.85,2.9,2.95,3,3.05,3.1,3.15,3.2,3.25,3.3,3.35,3.4,
    3.45,3.5,3.55,3.6,3.65,3.7,3.75,3.8,3.85,3.9,3.95,4,4.05,4.1,4.15,4.2,4.25,4.3,
    4.35,4.4,4.45,4.5,4.55,4.6,4.65,4.7,4.75,4.8,4.85,4.9,4.95,5,5.05,5.1,5.15,5.2,
    5.25,5.3,5.35,5.4,5.45,5.5,5.55,5.6,5.65,5.7,5.75,5.8,5.85,5.9,5.95,6,6.05,6.1,
    6.15,6.2,6.25,6.3,6.35,6.4,6.45,6.5,6.55,6.6,6.65,6.7,6.75,6.8,6.85,6.9,6.95,7,
    7.05,7.1,7.15,7.2,7.25,7.3,7.35,7.4,7.45,7.5,7.55,7.6,7.65,7.7,7.75,7.8,7.85,7.9,
    7.95,8,8.05,8.1,8.15,8.2,8.25,8.3,8.35,8.4,8.45,8.5,8.55,8.6,8.65,8.7,8.75,8.8,8.85,
    8.9,8.95,9,9.05,9.1,9.15,9.2,9.25,9.3,9.35,9.4,9.45,9.5,9.55,9.6,9.65,9.7,9.75,9.8,
    9.85,9.9,9.95,10,10.05,10.1,10.15,10.2,10.25,10.3,10.35,10.4,10.45,10.5,10.55,10.6,
    10.65,10.7,10.75,10.8,10.85,10.9,10.95,11,11.05,11.1,11.15,11.2,11.25,11.3,11.35,
    11.4,11.45,11.5,11.55,11.6,11.65,11.7,11.75,11.8,11.85,11.9,11.95,12,12.05,12.1,
    12.15,12.2,12.25,12.3,12.35,12.4,12.45,12.5,12.55,12.6,12.65,12.7,12.75,12.8,12.85,
    12.9,12.95,13,13.05,13.1,13.15,13.2,13.25,13.3,13.35,13.4,13.45,13.5,13.55,13.6,13.65,
    13.7,13.75,13.8,13.85,13.9,13.95,14,14.05,14.1,14.15,14.2,14.25,14.3,14.35,14.4,14.45,
    14.5,14.55,14.6,14.65,14.7,14.75,14.8,14.85,14.9,14.95,15,15.05,15.1,15.15,15.2,15.25,
    15.3,15.35,15.4,15.45,15.5,15.55,15.6,15.65,15.7,15.75,15.8,15.85,15.9,15.95,16,16.05,
    16.1,16.15,16.2, 16.25,16.3,16.35,16.4,16.45,16.5,16.55,16.6,16.65,16.7,16.75,16.8,16.85,
    16.9,16.95,17,17.05,17.1,17.15,17.2,17.25,17.3,17.35,17.4,17.45,17.5
    ]; //예시 x좌표값
var chartData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.001,
    0, -0.001, 0, 0, 0, 0, 0, 0.001, 0, -0.001, 0.001, 0.001, -0.001, 0, 0.001, -0.001, 0, 0, -0.001, 
    0.001, 0.001, -0.001,0, 0, -0.001, 0.001, 0, -0.001, 0.001, 0, -0.001, 0.001, 0, -0.001, 0.001, 0, 
    -0.001, 0.001, 0, 0, 0.001, -0.001, -0.001, 0.001, 0, 0, 0.001, -0.001, 0, 0.001, 
    -0.001, 0, 0.001, -0.001, 0, 0.001, -0.001, 0, 0.001, -0.001, 0, 0.001, -0.001, 0, 0.001, -0.001, 
    0, 0.001, -0.001, 0, 0.001, -0.001, 0, 0.001, -0.001, 0, 0.001, -0.00, 0, 0.001, 0, 0, 0, -0.00, 
    0, 0.001, -0.00, 0, 0.001, 0, 0, -0.001, 0, 0.001, -0.001, -0.001, 0.001, 0, 0, 0.001, 
    -0.001, -0.001, 0.001, 0, -0.001, 0.001, 0, 0, 0.001, -0.001, -0.001, 0.001, 0.001, 0, 0, -0.001, 
    -0.001, 0.001, 0.001, 0, 0, -0.001, 0, 0.001, 0, 0, 0, -0.001, 0, 0.001, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    -0.001, -0.001, 0.001, 0.001, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0.002, 0.349, 0.959, 1.216, 1.209, 
    1.204, 1.197, 0.781, -0.314, -0.975, -0.943, -0.907, -0.868, -0.842, -0.812, -0.654, -0.273, -0.047, 
    -0.067, -0.055, -0.03, -0.016, -0.004, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0
    ]; //예시 y좌표값
*/
var chartLabels =[0,1,2,3,4,5,6,7,8,9];
var chartData =[1,1,2,3,3,3,5,4,7,10];
var xRange=[]; //드래그된 x범위
var yRange=[]; //드래그된 y범위
var max_value; //피팅할 부분의 최대 인덱스값
var min_value; //피팅할 부분의 최소 인덱스값
var chartLabels_zoom=[]; //피팅할 범위 x
var chartData_zoom = []; //피팅할 범위 y
var a; // 함수의 계수 a
var b; // 함수의 계수 b
var c; // 함수의 계수 c
var a10; // 함수의 계수 a의 반올림한 값
var b10; // 함수의 계수 b의 반올림한 값
var c10; // 함수의 계수 c의 반올림한 값

var arr;//x좌표를 행렬로 받아올 변수 
var t_arr;//전치행렬
var arr_y=new Array(1); //y좌표를 행렬로 받아올 변수 

var temp=[]; //좌표 제거할때 사용 
var inverted;//역행렬
var Coe;//(A_t A)'(A_t)까지 한 것
var abc; //이차 방정식 계수 행렬 abc[0]=c
var type=0; //옵션 선택 값 받아옴

// 피팅함수 종류가 뭔지 type을 숫자로 받아오는 함수
function change_Type(e){
    const value = e.value;
    type=value;
}


//다중 그래프 그리기 
function getGraph(data_x, data_y, fit_x, fit_y, where , mode1 ,mode2 ,color1,color2, type){
    var Graph=document.getElementById(where);
    var trace1 = {
            x: data_x,
            y: data_y,
            type: 'scatter',
            mode: mode1, // 점 안찍히고 라인만 
            line:{
                color:color1
            }
    };

    var trace2 = {
            x: fit_x,
            y: fit_y,
            type: 'scatter',
            mode: mode2, // 점 안찍히고 라인만 
            line:{
                color:color2
            }
    };
    var data = [trace1, trace2];
    var layout = {
        title: 'Least Squares',
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
        
        Plotly.relayout(where, 'title',`y = ${a10}x + ${b10}`);
    }else if (type==2){
     
        Plotly.relayout(where, 'title',`y = ${a10}x² + ${b10}x + ${c10}`);
    }else if(type==3){
        Plotly.relayout(where, 'title',`y = ${a10} sin(x) + ${b10}`);
    }else if(type==4){
        Plotly.relayout(where, 'title',`y = ${a10} cos(x) + ${b10}`);
    }
}

//영역 선택할 수 있는 그래프 그리기
function getGraph_select_range(data_x, data_y, where , mode , color){
    var Graph = document.getElementById(where);
    var d3 = Plotly.d3;
    var formatter = d3.format('.3f');
    var data=[{
        mode: mode,
        x: data_x,
        y: data_y,
        line:{color:color}
    }];
    var layout={
        title : 'graph',
        font:{size:10},
        dragmode: 'select'
    };
    var config={
        displayModeBar: true,
        responsive: true,
        modeBarButtonsToRemove: ['lasso2d','autoScale2d','toggleSpikelines'], //plotly 기본 버튼 중 제거할 것
        displaylogo:false
    };
    Plotly.plot(Graph, data, layout, config );
//Lasso Select , Produced with Plotly
    Graph.on('plotly_selected', (eventData) => {
        xRange = eventData.range.x;
        yRange = eventData.range.y;
        //document.getElementById('range').innerHTML="x range:"+xRange.map(formatter).join(' , ') + "y range :"+ yRange.map(formatter).join(' , ')
        Plotly.relayout(where, 'title',
            `x range: [${xRange.map(formatter).join(' , ')}]<br>y range: [${yRange.map(formatter).join(' , ')}]`
        );
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

        getGraph(chartLabels_zoom,chartData_zoom,fit_xy[0], fit_xy[1],'myfitting','lines+markers', 'lines' , range_color,fit_color, type); 
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


