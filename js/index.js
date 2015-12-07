
console.log('start');

var arr = [[2,2,2,2],
           [4,4,2,0],
           [2,8,2,16],
           [0,2,0,2]];


var table = document.getElementById('playground');

var tableRow = table.getElementsByTagName('tr');
console.log(tableRow.length);
for(var row in tableRow){
//    console.log(tableRow[row]);
    var td = tableRow[row].getElementsByTagName('td');
        for(var i in td){
        td[i].innerHTML = arr[row][i];
    }

}





console.log('arr before',arr);

//moveLeft(arr);


function moveLeft(){
    
    var dimen = arr.length;
    
    for(var i=0; i<dimen; i++){
        var arrRow = arr[i];
        
        var lastNum=-1;
        var lastNumIndex;
        
        //scan
        for(var a in arrRow){
            if(arrRow[a]!=0){
                if(lastNum!=-1){
                    if(arrRow[a]==lastNum){
                        //merge part
                        arrRow[lastNumIndex]+=arrRow[a];
                        arrRow[a]=0;
                        lastNum = -1;
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
        
        var firstZeroIndex=-1;
        for(var a in arr){
            if(arr[a]==0){
                for(var b in arr){
                    if(b>a){
                        if(arr[b]!=0){
    //                        console.log('arr b: ',arr[b],' b:',b,' a:',a);
                            arr[a] = arr[b];
                            arr[b]=0;
                            break;
                        }
                    }
                }       
            }
        }
        
        console.log('arr after scan and merge: ',arrRow);
    }
    
   

//    
//    
//    for(var i in td1){
//        td1[i].innerHTML = arr[i];
//    }
//
//    console.log('arr after arrange: ',arr);
}





