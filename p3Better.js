let lines=4;
let cols=5;
let insertImg="<img src=\"back.png\" style=\"width: 2cm; height: 2cm;\">\n";
let revealedCards;
let time;
let numberHandler;
let cards;

function initCards(){
    var cards=[];
    var k=0;
    for(var i=0;i<Math.floor(lines*cols/2);i++){
        obj1={
            val:k,
            revealed:false
        };
        obj2={
            val:k,
            revealed:false
        };
        cards.push(obj1,obj2);
        k++;
    }
    return cards;
}

function suffleCards(cards){
    for(var i=0;i<lines*cols;i++){
        poz_i=Math.floor(Math.random()*lines*cols);
        poz_j=Math.floor(Math.random()*lines*cols);
        let aux=cards[poz_i]['val'];
        cards[poz_i]['val']=cards[poz_j]['val'];
        cards[poz_j]['val']=aux;
    }
    return cards;
}

function createTable(){
    revealedCards=[];
    cards=suffleCards(initCards());

    var table=document.getElementById("tablaJoc");
    var innerCode="";
    for(var i=0;i<lines;i++){
        innerCode+="<tr>\n";
        for(var j=0;j<cols;j++){
            innerCode+="<td align=\"center\" id=" + (i*cols+j) + " onClick=\"javascript:flipOver(this,cards)\">\n";
            innerCode+=insertImg;
            innerCode+="</td>";
        }
        innerCode+="</tr>\n";
    }
    table.innerHTML=innerCode;

    setTimer();
}

function setTimer(){
    clearInterval(numberHandler);
    time=120;
    handleTimer();
    numberHandler = setInterval(handleTimer,1000);
}

function handleTimer(){
    if(time==-1){
        clearInterval(numberHandler);
        alert("Timpul a expirat O_o");
    } else {
        var timer=document.getElementById("timer");
        let minutes=Math.floor(time/60);
        let seconds=time-(minutes*60);
        timer.innerHTML="Timp ramas: "+(minutes+"m:"+seconds+"s");
        time--;
    }
}

function flipOver(cell,cards){
    if(cards[cell.id]['revealed']==false){
        cell.setAttribute('style','width: 2cm; height: 2cm; align: center');
        cell.innerHTML=cell.innerHTML.replace(insertImg,cards[cell.id]['val']);
        cards[cell.id]['revealed']=true;
    }

    if(revealedCards.indexOf(cell)==-1){
        revealedCards.push(cell);
    }
    if(revealedCards.length%2==0){
        verify(cards);
    }
}

function reset(cell){
    cell.innerHTML=cell.innerHTML.replace(cards[cell.id]['val'],insertImg);
    cards[cell.id]['revealed']=false;
}

function verify(cards){
    for(var i=0;i<revealedCards.length-1;i+=2){
        if(cards[revealedCards[i].id]['val']==cards[revealedCards[i+1].id]['val']){
            revealedCards[i].removeAttribute("onClick");
            revealedCards[i+1].removeAttribute("onClick");
        }
        else{
            setTimeout(reset,2000,revealedCards[i]);
            setTimeout(reset,2000,revealedCards[i+1]);
            let index=revealedCards.indexOf(revealedCards[i]);
            revealedCards.splice(index,2);
            i-=2;
        }
    }
    if(revealedCards.length==lines*cols){
        clearInterval(numberHandler);
        alert("Felicitari, ai castigat ^_^");
    }
}