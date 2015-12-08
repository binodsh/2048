var arr = [[0,0,0,2],
           [0,0,0,0],
           [0,0,0,0],
           [0,2,0,0]];

var changeFlag = false;

var table = document.getElementById('playground');
var body = document.getElementsByTagName('body')[0];

body.onkeydown = function(event){
    var key = event.keyCode;
    
    if(key==37){
        moveLeft();
    }else if(key==38){
        moveUp();
    }else if(key==39){
        moveRight();
    }else if(key==40){
        moveDown();
    }
}


var tableRow = table.getElementsByTagName('tr');

for(var row=0; row<tableRow.length;  row++){
//    console.log('a:',row);
    var td = tableRow[row].getElementsByTagName('td');
        for(var i in td){
            if(arr[row][i]!=0){
                td[i].innerHTML = arr[row][i];    
            }else{
                td[i].innerHTML = "";    
            }
        }   

}


function moveLeft(){
    var dimen = arr.length;
    var start = 0;
    var end = dimen-1;
    
    for(var i=0; i<dimen; i++){
        var arrRow = arr[i];
        arrRow = move(arrRow,start,end);
    }
    
    if(changeFlag==true){
        generateNewNum();    
        changeFlag=false;
    }
    updateTable();
}


function moveRight(){
    var dimen = arr.length;
    var start = dimen-1;
    var end = 0;
    
    for(var i=0; i<dimen; i++){
        var arrRow = arr[i];
        arrRow = move(arrRow,start,end);
    }
    
    if(changeFlag==true){
        generateNewNum();    
        changeFlag=false;
    }    
    updateTable();
}


function moveUp(){
    var dimen = arr.length;
    var start = 0;
    var end = dimen-1;
    
    for(var col=0; col<dimen; col++){
        var arrRow = [];
        for(var row=0; row<dimen; row++){
            arrRow.push(arr[row][col]);
        }
        arrRow = move(arrRow,start,end);
        
        for(var row=0; row<dimen;row++){
            arr[row][col]=arrRow[row];
        }
    }
    
    if(changeFlag==true){
        generateNewNum();    
        changeFlag=false;
    }   
    updateTable();
}


function moveDown(){
    var dimen = arr.length;
    var start = dimen-1;
    var end = 0;
    
    for(var col=0; col<dimen; col++){
        var arrRow = [];
        for(var row=0; row<dimen; row++){
            arrRow.push(arr[row][col]);
        }
        arrRow = move(arrRow,start,end);
        
        for(var row=0; row<dimen;row++){
            arr[row][col]=arrRow[row];
        }
    }
    
    if(changeFlag==true){
        generateNewNum();    
        changeFlag=false;
    }    
    updateTable();
}


function move(arrSingle, start, end){
    var arrRow = arrSingle;
    var start = start;
    var end = end;
    
    if(start<end){
        var lastNum=-1;
        var lastNumIndex;

        //scan
        for(var a=start; a<=end; a++){
            if(arrRow[a]!=0){
                if(lastNum!=-1){
                    if(arrRow[a]==lastNum){
                        //merge part
                        arrRow[lastNumIndex]+=arrRow[a];
                        arrRow[a]=0;
                        lastNum = -1;
                        changeFlag=true;
                    }else{
                        lastNum=arrRow[a];
                        lastNumIndex=a;    
                    }
                }else{
                    lastNum=arrRow[a];
                    lastNumIndex=a;
                }
            }
        }

        for(var a=start; a<=end; a++){
            if(arrRow[a]==0){
                for(var b=start; b<=end; b++){
                    if(b>a){
                        if(arrRow[b]!=0){
                            arrRow[a] = arrRow[b];
                            arrRow[b]=0;
                            changeFlag=true;
                            break;
                        }
                    }
                }       
            }
        }
    }else{
        var lastNum=-1;
        var lastNumIndex;

        //scan
        for(var a=start; a>=end; a--){
            if(arrRow[a]!=0){
                if(lastNum!=-1){
                    if(arrRow[a]==lastNum){
                        //merge part
                        arrRow[lastNumIndex]+=arrRow[a];
                        arrRow[a]=0;
                        lastNum = -1;
                        changeFlag=true;
                    }else{
                        lastNum=arrRow[a];
                        lastNumIndex=a;    
                    }
                }else{
                    lastNum=arrRow[a];
                    lastNumIndex=a;
                }
            }
        }

        for(var a=start; a>=end; a--){
            if(arrRow[a]==0){
                for(var b=start; b>=end; b--){
                    if(b<a){
                        if(arrRow[b]!=0){
                            arrRow[a] = arrRow[b];
                            arrRow[b]=0;
                            changeFlag=true;
                            break;
                        }
                    }
                }       
            }
        }
    }
    return arrRow;
}


function updateTable(){
    for(var row=0; row<tableRow.length; row++){
        var td = tableRow[row].getElementsByTagName('td');
            for(var i in td){
                if(arr[row][i]!=0){
                    td[i].innerHTML = arr[row][i];    
                }else{
                    td[i].innerHTML = "";    
                }
            }
    }
}


function generateNewNum(){
    var emptyIndices = [];
    for(var i=0; i<arr.length; i++){
        for(var j=0; j<arr.length; j++){
            if(arr[i][j]==0){
                var temp = arr.length*i+j;
                emptyIndices.push(temp);
            }
        }
    }
    
    var max = emptyIndices.length -1;
    var min = 0;
    var selectIndex = Math.floor(Math.random()*(max-min+1)+min);
    
    var randValue = Math.floor(Math.random()*2);
    var nextNum=2;
    if(randValue==0) nextNum=2;
    else if(randValue==1) nextNum=4;
    
    var indexValue = emptyIndices[selectIndex];
    var row = Math.floor(indexValue/arr.length);
    var col = indexValue % arr.length;
    
    arr[row][col] = nextNum;
}



