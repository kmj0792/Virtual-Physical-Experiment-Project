
var chartLabels = [1,1.5,2, 3, 4,5, 6, 7,8,9,10, 11,12,13, 14]; //예시 x값 
var chartData = [1.5,0.5,4,9.3,7,10,8,11,13,12,15,11,17,16, 14]; //예시 y값
var xRange=[]; //드래그된 x범위
var yRange=[]; //드래그된 y범위
var max_value; //피팅할 부분의 최대 인덱스값
var min_value; //피팅할 부분의 최소 인덱스값
var chartLabels_zoom=[]; //피팅할 범위 x
var chartData_zoom = []; //피팅할 범위 y
var delchartLabels = []; //예시 x값 
var delchartData =[];
var a;
var b;
var x_matrix =[[],[]];
var arr = new Array(chartLabels.length);
var t_arr = new Array(3);//전치행렬
var transpose_metrix;
var arraytest=[
    [1,1,1,1],
    [1,2,3,4],
    [2,1,3,1],
    [1,0,3,4]
];
//getGraph_select_range(chartLabels, chartData ,'myGraph','lines+markers','black'); //기본 그래프
//find_range(xRange,yRange);
//getGraph_select_range(chartLabels, chartData ,'range','lines+markers','black');
var temp=[];
let inverse_arr = [];//역행렬

//다중 그래프 그리기 
function getGraph(data_x, data_y, fit_x, fit_y, where , mode1 ,mode2 ,color1,color2){
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
        modeBarButtonsToRemove: ['lasso2d','autoScale2d','toggleSpikelines','select2d']
    };
    Plotly.newPlot(Graph, data, layout,config);
    Plotly.relayout(where, 'title',`y = ${a}x + (${b})`);
}

//영역 선택할 수 있는 그래프 그리기
function getGraph_select_range(data_x, data_y, where , mode , color){
    var Graph = document.getElementById(where);
    var d3 = Plotly.d3;
    var formatter = d3.format('.2f');
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
        modeBarButtonsToRemove: ['lasso2d','autoScale2d','toggleSpikelines']
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


//선형최소 제곱 알고리즘 1차
function findLineByLeastSquares_1 (values_x, values_y) { 
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
    //document.getElementById('output').innerHTML="y = " +m+"x + "+"("+b+")"
    return [result_values_x, result_values_y]; 
}

//선형최소 제곱 알고리즘 2차 - 미완
function findLineByLeastSquares_2 (values_x, values_y) { 
    var x_sum = 0; 
    var y_sum = 0; 
    var xy_sum = 0; 
    var xx_sum = 0; 
    var count = 0; 
    var x = 0; 
    var y = 0; 
    var values_length = values_x.length;
    var xx=0;
    
    var x_matrix_inv=[[],[]];
    var c_matrix=[];
     

    if (values_length != values_y.length) { 
        throw new Error ( 'values_x 및 values_y 매개 변수의 크기가 같아야합니다!'); 
    } 

    if (values_length === 0) { 
        return [[], []]; 
    } 
  
}

//행렬만들기 - 행렬 반환
function metrix(){
    //var arr = new Array(chartLabels.length);
    var x;
    var xx;
    for (var i = 0; i < arr.length; i++) {
        arr[i] = new Array(3); 
         
    }
    for(var j=0; j<t_arr.length; j++){
        t_arr[j]=new Array(15);
    }

    for(var i=0; i<chartLabels.length;i++){
        x = chartLabels[i]; 
        xx=x*x;
        
            arr[i]=[1,x,xx];           
    }
   
    return arr;
    
}

 

//전치(t) t_arr에 전치행렬 대입
function transpose(a) {
   zip=rows=>rows[0].map((_,c)=>rows.map(row=>row[c]))
   t_arr=zip([...arr]) //전치된 행렬 t_arr
}

//확인을 위한 console.log
console.log(metrix());
transpose(arr)
console.log(t_arr);
//var arr1=[[1,4],[3,2],[4,1]]
//var arr2=[[3,3],[3,3]]
console.log(tarrXarr(t_arr,arr));
console.log(tarrXarr(tarrXarr(t_arr,arr),t_arr));

//행렬 곱 구하기 - 곱한 결과 행렬 반환
function tarrXarr(tarr, arr){
    return tarr.map((row) => arr[0].map((x,y) => row.reduce((a,b,c) => a + b * arr[c][y], 0)))
}

//역행렬 구하기 - 미완"여기부터 다시해"
function inverse(arr){
    // 첨가행렬 augmented 생성
    let augmented = [];
    for(let r = 0; r < 16; r++) {
        augmented[r] = [...arr[r], ...identity[r]];
    }
    // 가우스-요르단 소거법으로 역행렬 계산
    for(let c = 0; c < 16; c++) {
        for(let r = 0; r < 16; r++) {
            if(r == c || augmented[r][c] == 0) 
                { continue; }
            let m = augmented[c][c] / augmented[r][c];
            augmented[r] = augmented[r].map((v, i) => v * m - augmented[c][i]);
        }
    }
    for(let r = 0; r < 16; r++) {
        let m = augmented[r][r];
        augmented[r] = augmented[r].map(v => v / m);
    }
     // augmented 에서 역행렬 inverse 에 해당하는 부분만 발췌
     
     for(let r = 0; r < 16; r++) {
         inverse_arr[r] = augmented[r].slice(16 );
     }
     return inverse_arr;
}

console.log(inverse(arraytest));

//fitting그래프 띄우기 - 추후 보완
function fit(fit_color, range_color){ //select color

        var i_x_min=0;
        var i_x_max=0;
        var i_y_min=0;
        var i_y_max=0;

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

        var fit_xy = findLineByLeastSquares_2(chartLabels_zoom, chartData_zoom); //선형제곱 피팅

        getGraph(chartLabels_zoom,chartData_zoom,fit_xy[0], fit_xy[1],'myfitting','lines+markers', 'lines' , range_color,fit_color); 
}

function input(){
    var input_x = document.getElementById("input_x").value;
    var input_y = document.getElementById("input_y").value;
    temp = [input_x,input_y];
    remove();
}
    
function remove(){
    var i;
    var j=0;
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
                //alert('좌표를 다시 입력하시오');
                //location.href="fitting+chart(use plotly.js).html"
            }
            else if((chartLabels[i]==temp[0])&&(chartData[i]!=temp[1])){
                alert('좌표를 다시 입력하시오');
                break;
            }       
        } else{
                alert('좌표를 다시 입력하시오');
                break;
            }
    }
}

function reset(){
    window.location.reload();
}
/*
marketing
current
Term anounce
due marketing
major
majority 
*/