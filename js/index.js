var body = document.getElementsByTagName('body')[0];
var container = document.getElementsByClassName('container')[0];
var table;
var changeFlag=false;

var select = document.getElementById('dimenSelector');
var dimen=4;

function valueChange(){
    console.log('hello');
    dimen = parseInt(select.options[select.selectedIndex].value);
    console.log(dimen);
    init();
}


var arr;

//start
init();

function init(){
    arr= getArray(dimen);

    for(var i=0; i<dimen/2; i++){
        generateNewNum();    
    }
    
    // generateNewNum();

    var tempTable = container.getElementsByTagName('table')[0];

    if(tempTable){
        tempTable.remove();
    }

    table = createTable(dimen);
    container.appendChild(table);
    updateTable(table);

    changeFlag = false;
}


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
    var tableRow = table.children;
    for(var row=0; row<tableRow.length; row++){
        var td = tableRow[row].getElementsByTagName('td');
            for(var i=0; i < td.length; i++){
                if(arr[row][i]!=0){
                    td[i].innerHTML = arr[row][i];    
                }else{
                    td[i].innerHTML = "";    
                }
                assignClassForTile(td[i]);
            }
    }
    isGameOver();
}


function generateNewNum(){
    var emptyIndices = getEmptyIndices();
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

function getEmptyIndices(){
    var emptyIndices = [];
    for(var i=0; i<arr.length; i++){
        for(var j=0; j<arr.length; j++){
            if(arr[i][j]==0){
                var temp = arr.length*i+j;
                emptyIndices.push(temp);
            }
        }
    }
    return emptyIndices;
}


function getArray(dimension){
    var tempArr = [], row=[];
    var rowNum = dimension;
    var colNum = dimension;

    while(colNum--) row.push(0);
    while(rowNum--) tempArr.push(row.slice());

    return tempArr;
}


function createTable(dimension){
    var tempTable = document.createElement('table');

    for(var row=0; row<dimension; row++){
        var tempTr = document.createElement('tr');
        for(var col=0; col<dimension; col++){
            var tempTd = document.createElement('td');

            tempTr.appendChild(tempTd);
        }

        tempTable.appendChild(tempTr);
    }

    return tempTable;
}

function assignClassForTile(tdElement){
    var value = tdElement.innerHTML;
    tdElement.removeAttribute('class');
    if (value === undefined || value === '') {
        tdElement.setAttribute('class', 'tile-0');
    } else{
        tdElement.setAttribute('class', 'tile-'+value);
    }
}

function isGameOver(){
    var emptyIndices = getEmptyIndices();
    if (emptyIndices.length === 0) {
        if (!hasSameConsecutiveNumber()) {
            alert("The game is over.");
        }
    }
}

function hasSameConsecutiveNumber(boardArray){
    return hasSameConsecutiveNumberInRow(arr) || hasSameConsecutiveNumberInColumn(arr);
}

function hasSameConsecutiveNumberInRow(boardArray){
    for (var i = 0; i < boardArray.length; i++) {
        for (var j = 0; j < boardArray.length-1; j++) {
            if(boardArray[i][j] === boardArray[i][j+1]){
                return true;
            }
        }
    }
    return false;
}

function hasSameConsecutiveNumberInColumn(boardArray){
    for (var i = 0; i < boardArray.length-1; i++) {
        for (var j = 0; j < boardArray.length; j++) {
            if(boardArray[i][j] === boardArray[i+1][j]){
                return true;
            }
        }
    }
    return false;
}
