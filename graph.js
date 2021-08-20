var coeObj={
    a:0,
    b:0,
    c:0,
    d:0,
    a10:0,
    b10:0,
    c10:0,
    d10:0
};
  
var period=5;//주기
var phase_x=0; // x원점으로 부터의 떨어진 정도

var arrObj={
    rows:0,//엑셀 파일의 내용을 json으로 바꾼 것
    xData:0,//x좌표값 배열 선언
    yData:0,//y좌표값 배열 선언
    
    xDatafitdata:0, //피팅할 범위 x
    yDatafitdata:0,  //피팅할 범위 y
    
    xRange:0, //드래그된 x범위
    yRange:0, //드래그된 y범위
    
    xmatrix:0,//x좌표의 행렬
    T_xmatrix:0// 전치행렬
};
var period_1=0;
var period_2=0;
var period_3=0;

var ymatrix=new Array(1); //y좌표를 행렬로 받아올 변수 
var type=0; //옵션 선택 값
var roof_type=0;
var values_2x=[];
var values_final=[];
  // 피팅함수 종류가 뭔지 type을 숫자로 받아오는 함수
function change_Type(e){
    const value = e.value;
    type=value;
}
function change_Roof_Type(e){
  const value = e.value;
  roof_type=value;
}

function change_cycle_show(sVal)
{
	var obValueView = document.getElementById("cycle_view");
	obValueView.innerHTML = sVal
}


function change_cycle(e){
  const value = e.value;
  period=parseFloat(value);

}



function  change_phase_x_show(sVal)
{
	var obValueView = document.getElementById("phase_x_view");
	obValueView.innerHTML = sVal
}


function change_phase_x(e){
  const value = e.value;
  phase_x=value;
}

function action_button(){
    arrObj.yData=[];
    arrObj.xData=[];
    
    getdata();
    getGraph_select_range(arrObj.xData, arrObj.yData);
}
   
//좌표이름 바꾸는 곳
function getdata(){
  
    const column = Object.keys(arrObj.rows[0]);
  
    for(var i=0; i<arrObj.rows.length; i++){
        arrObj.xData.push(arrObj.rows[i][column[0]]);
        arrObj.yData.push(arrObj.rows[i][column[1]]);
    }
}

//다중 그래프 그리기 
function getGraph(data_x, data_y, fitdata_x, fitdata_y , fitdata_x_1, fitdata_y_1 ,fitdata_x_2, fitdata_y_2 , 
  fitdata_x1, fitdata_y1 ,fitdata_x2, fitdata_y2 ,fitdata_x3, fitdata_y3, type){

    var Graph=document.getElementById('myGraph');
    var labels = ['Original', 'Fitting'];

    //trace1 : 선택된 범위의 원래data 그래프 
    var original = {
            x: data_x,
            y: data_y,
            name: 'original',
            type: 'scatter',
            mode: 'lines+markers', // 점 안찍히고 라인만 
            line:{
                color:"black"
            }
    };
    //trace2 : 선택된 범위의 피팅 그래프 
    var fit = {
            x: fitdata_x,
            y: fitdata_y,
            name: 'fitting',
            type: 'scatter',
            mode: 'lines', // 점 안찍히고 라인만 
            line:{
                color:"red"
            },
            text:labels[1]
    }; 
    //trace3 : 선택된 범위의 -5%피팅 그래프
    var minus5p = {
      x: fitdata_x_1,
      y: fitdata_y_1,
      name: 'fit -10%',
      type: 'scatter',
      mode: 'lines', // 점 안찍히고 라인만 
      line:{
          color:"yellow"
      },
      text:labels[1]
    };
    //trace4 : 선택된 범위의 -10%피팅 그래프
    var minus10p = {
      x: fitdata_x_2,
      y: fitdata_y_2,
      name: 'fit -20%',
      type: 'scatter',
      mode: 'lines', // 점 안찍히고 라인만 
      line:{
          color:"green"
      },
      text:labels[1]
    };
    //trace5 : 선택된 범위의 +5%피팅 그래프
    var plus5p = {
      x: fitdata_x1,
      y: fitdata_y1,
      name: 'fit +10%',
      type: 'scatter',
      mode: 'lines', // 점 안찍히고 라인만 
      line:{
          color:"blue"
      },
      text:labels[1]
    };
    //trace6 : 선택된 범위의 +10%피팅 그래프
    var plus10p = {
      x: fitdata_x2,
      y: fitdata_y2,
      name: 'fit +20%',
      type: 'scatter',
      mode: 'lines', // 점 안찍히고 라인만 
      line:{
          color:"orange"
      },
      text:labels[1]
    };
    //trace7 : 선택된 범위의 +20%피팅 그래프
    var plus20p = {
      x: fitdata_x3,
      y: fitdata_y3,
      name: 'fit +30%',
      type: 'scatter',
      mode: 'lines', // 점 안찍히고 라인만 
      line:{
          color:"white"
      },
      text:labels[1]
    };
    if(type==3){
      var data = [original, fit,minus5p, minus10p,plus5p,plus10p,plus20p];
    }else if(type==1||type==2){
      var data = [original, fit];
    }
    
    

    var layout = {
        autosize:true,
        text:labels[0],
        title: 'Fitting Graph',
        font:{size:20, family:"Times New Roman"},
        showlegend: true,
        paper_bgcolor:"rgba(166, 166, 166, 0.88)",//전체 배경
        plot_bgcolor:"rgba(227, 227, 227, 0.88)"//그래프 부분 색
  
    };
    var config={
        displayModeBar: true,
        responsive: true,
        modeBarButtonsToRemove: ['lasso2d','autoScale2d','toggleSpikelines','select2d'],
        displaylogo:false
    };
    Plotly.newPlot(Graph, data, layout,config);

    coeObj.a10=coeObj.a.toFixed(2);//10자리수까지 반올림
    coeObj.b10=coeObj.b.toFixed(2); 
    coeObj.c10=coeObj.c.toFixed(2);//10자리수까지 반올림
    coeObj.d10=coeObj.d.toFixed(2); 

    if (type==1){
        document.getElementById('fitting_result').innerHTML="f(X) = " + coeObj.a10 +"x + (" +coeObj.b10+")"
        //Plotly.relayout(where, 'title',`y = ${a10}x + ${b10}`);
    }else if (type==2){
        document.getElementById('fitting_result').innerHTML="f(X) = " + coeObj.a10 +"x² + (" +coeObj.b10+")x + (" + coeObj.c10+")"
        //Plotly.relayout(where, 'title',`y = ${a10}x² + ${b10}x + ${c10}`);
    }else if(type==3){
        if(coeObj.c10==0){
          document.getElementById('fitting_result').innerHTML="f(X) = " + coeObj.a10 +"sin("+ coeObj.b10 +"x) + (" +coeObj.d10+")"
        } else{
          document.getElementById('fitting_result').innerHTML="f(X) = " + coeObj.a10 +"sin("+ coeObj.b10 +"x + "+ coeObj.c10 + ")+ (" +coeObj.d10+")"
        //y = coeObj.d*(Math.sin((2*Math.PI*(1/coeObj.b)* x) +coeObj.c))+coeObj.a;
       }
    }else if(type==4){
      if(coeObj.c10==0){
        document.getElementById('fitting_result').innerHTML="f(X) = " + coeObj.a10 +"cos("+ coeObj.b10 +"x) + (" +coeObj.d10+")"
      } else{
        document.getElementById('fitting_result').innerHTML="f(X) = " + coeObj.a10 +"cos("+ coeObj.b10 +"x + "+ coeObj.c10 + ")+ (" +coeObj.d10+")"
        //Plotly.relayout(where, 'title',`y = ${a10} cos(x) + ${b10}`);
        }
      }
}


//영역 선택할 수 있는 그래프 
function getGraph_select_range(data_x, data_y){
    var Graph = document.getElementById('myGraph');
    var data=[{
        mode: 'lines+markers',
        x: data_x,
        y: data_y,
        line:{color:'black'}
    }];
    var layout={
        title : 'Graph',
        font:{size:20, family:"Times New Roman"},
        dragmode: 'select',
        paper_bgcolor:"rgba(166, 166, 166, 0.88)",//전체 배경
        plot_bgcolor:"rgba(227, 227, 227, 0.88)"//그래프 부분 배경
        
        
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
        arrObj.T_xmatrix[j]=new Array(arrObj.xDatafitdata.length);
    }

    for(var i=0; i<arrObj.yDatafitdata.length; i++){
        y=arrObj.yDatafitdata[i];
        ymatrix[i]=[y];
    }

    for(var i=0; i<arrObj.xDatafitdata.length;i++){
        x = arrObj.xDatafitdata[i]; 
        xx=x*x;
        arrObj.xmatrix[i]=[1,x,xx];           
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
            x = values_x[i]; 
            y = x * coeObj.a + coeObj.b; 
            result_values_x.push (x); 
            result_values_y.push (y); 
    } 
    
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
        throw new Error ('values_x 및 values_y 매개 변수의 크기가 같아야합니다!'); 
    } 

    if (values_x.length === 0) { 
        return [[], []]; 
    } 
    //console.log("전 x:", values_x);

   
    var result_values_x = [];
    var result_values_y = []; 

    for(var i=0; i<roof_type; i++){
      values_x =roof(values_x);
    }

    //console.log("후 x:", values_x);

    for (let i = 0; i <values_x.length; i ++) { 
            x = values_x[i]; 
            y = x * x * coeObj.a + coeObj.b*x + coeObj.c; 
            result_values_x.push (x); 
            result_values_y.push (y); 
    } 

    
    return [result_values_x, result_values_y]; 
  
};

function roof(roofdata){
  var roofvalue=[];
  var roof_result=[];
  for (let i = 0; i <roofdata.length-1; i ++) { 
    var sum =roofdata[i]+roofdata[i+1];
    var squr = sum/2;
    roofvalue.push(squr);
  }

  roof_result = roofdata.concat(roofvalue);

  roof_result.sort(function(a,b){
     return a-b; //오름차순 청렬
   });
  return roof_result;

}

//선형최소제곱 알고리즘 _sin
//삼각함수 f(x) = p1*sin(x) + p2로 근사
 function findLineByLeastSquares_sin(values_x,values_y,p){
 
    // period_1=period+(period*0.1);
    // period_2=period+(period*0.2);
    // period_3=period+(period*0.3);
    var frequency=1/p;//주파수
    var pifre = Math.PI * 2 * frequency;// 2파이/주기
    
    var phase = phase_x *pifre ;
    var result = sinusoidal(values_x,values_y,pifre,phase);
    coeObj.a=result[1];
    coeObj.b=result[3];
    coeObj.c=result[2];
    coeObj.d=result[0];

    if (values_x.length != values_y.length) { 
        throw new Error ( 'values_x 및 values_y 매개 변수의 크기가 같아야합니다!'); 
    } 

    if (values_x.length === 0) { 
        return [[], []]; 
    } 

    var result_values_x = [];
    var result_values_y = []; 

    for(var i=0; i<roof_type; i++){
      values_x =roof(values_x);
    }

    for (let i = 0; i <values_x.length; i ++) { 
            x = values_x[i]; 
            y = coeObj.a*(Math.sin(coeObj.b* x +coeObj.c))+coeObj.d; 
            result_values_x.push (x); 
            result_values_y.push (y); 
    } 

    return [result_values_x, result_values_y]; 
}

//선형최소제곱 알고리즘 _cos
//삼각함수 f(x) = p1*cos(x) + p2로 근사
function findLineByLeastSquares_cos(values_x,values_y){
    
    var frequency=1/period;//주파수
    var pifre = Math.PI * 2 * frequency;// 2파이/주기

    var phase = phase_x *pifre ;
    var result = cosinusoidal(values_x,values_y,pifre,phase);
    coeObj.a=result[1];
    coeObj.b=result[3];
    coeObj.c=result[2];
    coeObj.d=result[0];

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
            y = result[1]*(Math.cos(result[3]* x +result[2]))+result[0]; 
            result_values_x.push (x); 
            result_values_y.push (y); 
    } 
     return [result_values_x, result_values_y]; 
}

//fitdatating그래프 띄우기 
function fitting(){
        var max_value,min_value;
        var i_x_min=0;
        var i_x_max=0;
        period_2=period-(period*0.2);
        period_1=period-(period*0.1);
        period1=period+(period*0.1);
        period2=period+(period*0.2);
        period3=period+(period*0.3);

        while(arrObj.xData[i_x_min] <= arrObj.xRange[0]){
            i_x_min++;
        }
        while(arrObj.xData[i_x_max] <= arrObj.xRange[1]){
            i_x_max++;
        }
        min_value=i_x_min;
        max_value=i_x_max;
       
        arrObj.xDatafitdata = arrObj.xData.slice(min_value, max_value);
        arrObj.yDatafitdata = arrObj.yData.slice(min_value, max_value);
        // arr를 배열로 만들어주는 위치가 중요함. 
        //chartLabels_zoom이 값을 가진 후에 놓여야함.
        arrObj.xmatrix = new Array(arrObj.xDatafitdata.length);//x좌표를 행렬로 받아올 변수 
       // t_arr = new Array(3);//전치행렬

        var fitdata_xy;
        var fitdata_xy_2=0; //sin 피팅 -5%
        var fitdata_xy_1=0;
        var fitdata_xy1=0;
        var fitdata_xy2=0; 
        var fitdata_xy3=0;

        if(type==1){
            fitdata_xy = findLineByLeastSquares_1(arrObj.xDatafitdata, arrObj.yDatafitdata); //선형피팅
        } 
        else if(type==2){
            arrObj.T_xmatrix = new Array(3);//전치행렬
            fitdata_xy = findLineByLeastSquares_2(arrObj.xDatafitdata, arrObj.yDatafitdata); //곡선피팅
        } 
        else if(type==3){
            arrObj.T_xmatrix = new Array(2);//전치행렬
            fitdata_xy = findLineByLeastSquares_sin(arrObj.xDatafitdata, arrObj.yDatafitdata,period); //sin 피팅
            fitdata_xy_1 = findLineByLeastSquares_sin(arrObj.xDatafitdata, arrObj.yDatafitdata,period_1); //sin 피팅 -10%
            fitdata_xy_2 = findLineByLeastSquares_sin(arrObj.xDatafitdata, arrObj.yDatafitdata,period_2); //sin 피팅 -5%
            fitdata_xy1 = findLineByLeastSquares_sin(arrObj.xDatafitdata, arrObj.yDatafitdata,period1); //sin 피팅 +5%
            fitdata_xy2 = findLineByLeastSquares_sin(arrObj.xDatafitdata, arrObj.yDatafitdata,period2); //sin 피팅 +10%
            fitdata_xy3 = findLineByLeastSquares_sin(arrObj.xDatafitdata, arrObj.yDatafitdata,period3); //sin 피팅 +20%
        }
        else if(type==4){
            arrObj.T_xmatrix = new Array(2);//전치행렬
            fitdata_xy = findLineByLeastSquares_cos(arrObj.xDatafitdata, arrObj.yDatafitdata); //cos 피팅
        }
        else if(type==0){
        alert('옵션을 선택해 주세요'); //옵션선택 안함 -> 경고창
       }
        getGraph(arrObj.xDatafitdata,arrObj.yDatafitdata,
          fitdata_xy[0], fitdata_xy[1], 
          fitdata_xy_1[0], fitdata_xy_1[1],
          fitdata_xy_2[0], fitdata_xy_2[1], 
          fitdata_xy1[0], fitdata_xy1[1], 
          fitdata_xy2[0], fitdata_xy2[1], 
          fitdata_xy3[0], fitdata_xy3[1], type); 
}

function reset(){
    window.location.reload();
}

/////////////////////////////////////////

function determinant(a, n) {
    var b, d, i, j, m, s, x, y;
  
    switch(n >>> 0) {
      case 0:
        return NaN;
  
      case 1:
        return 1.0 / a[0];
  
      case 2:
        return a[0] * a[3] - a[1] * a[2];
  
      default:
        d = 0.0;
  
        m = n - 1;
        b = new Array(m * m);
        s = 1.0;
  
        for(i = 0; i < n; i++) {
          j = 0;
  
          for(y = 1; y < n; y++) {
            for(x = 0; x < n; x++) {
              if(x === i) {
                continue;
              }
  
              b[j++] = a[x + y * n];
            }
          }
  
          d += s * a[i] * determinant(b, m);
          s = -s;
        }
  
        return d;
    }
  };
  
   function solve(a,b) {
   
      var d, i, j, n, t, x;
  
      n = b.length;
      d = determinant(a, n);
      x = new Array(n);
      t = new Array(n);
  
      for(i = n; i--; ) {
        for(j = n; j--; ) {
          t[j] = a[i + j * n];
          a[i + j * n] = b[j];
        }
  
        x[i] = determinant(a, n) / d;
  
        for(j = n; j--; ) {
          a[i + j * n] = t[j];
        }
      }
    
      return x;
    };
  
  
  
   function linear(x, y, m){
        var a, b, c, i, j, k, n;
  
        n = y.length;
  
        i = m * m;
        a = new Array(i);
        while(i--) {
          a[i] = 0.0;
        }
  
        i = m;
        b = new Array(i);
        while(i--) {
          b[i] = 0.0;
        }
  
        for(i = n; i--; ) {
          for(j = m; j--; ) {
            for(k = m; k--; ) {
              a[k + j * m] += x[k + i * m] * x[j + i * m];
            }
  
            b[j] += x[j + i * m] * y[i];
          }
        }
  
      return solve(a, b);
  };
  
   
  
  //////////////////
   function sinusoidal(x, y, frequency, phase) {
    var a, b, i, fit, u;
  
    frequency = +frequency;
    phase     = +phase;
  
    if(isFinite(phase)) {
      u = new Array(x.length * 2);
  
      for(i = x.length; i--; ) {
        u[i * 2 + 0] = 1.0;
        u[i * 2 + 1] = Math.sin(x[i] * frequency + phase);
      }
  
      fit = linear(u, y, 2);
     
      fit.push(phase, frequency);
    }
  
    else {
      u = new Array(x.length * 3);
  
      for(i = x.length; i--; ) {
        u[i * 3 + 0] = 1.0;
        u[i * 3 + 1] = Math.sin(x[i] * frequency);
        u[i * 3 + 2] = Math.cos(x[i] * frequency);
      }
  
      fit = linear(u, y, 3);
      fit.push(frequency);
  
      a = fit[1];
      b = fit[2];
      fit[1] = Math.sqrt(a * a + b * b);
      fit[2] = Math.atan2(b, a);
    }
    return fit;
  };


  function cosinusoidal(x, y, frequency, phase) {
    var a, b, i, fit, u;
  
    frequency = +frequency;
    phase     = +phase;
  
    if(isFinite(phase)) {
      u = new Array(x.length * 2);
  
      for(i = x.length; i--; ) {
        u[i * 2 + 0] = 1.0;
        u[i * 2 + 1] = Math.sin(x[i] * frequency + phase);
      }
  
      fit = linear(u, y, 2);
     
      fit.push(phase, frequency);
    }
  
    else {
      u = new Array(x.length * 3);
  
      for(i = x.length; i--; ) {
        u[i * 3 + 0] = 1.0;
        u[i * 3 + 1] = Math.sin(x[i] * frequency);
        u[i * 3 + 2] = Math.cos(x[i] * frequency);
      }
  
      fit = linear(u, y, 3);
      fit.push(frequency);
  
      a = fit[1];
      b = fit[2];
      fit[1] = Math.sqrt(a * a + b * b);
      fit[2] = Math.atan2(b, a);
    }
    return fit;
  };
  