var s = 'barbara.txt';
var lexicon;
lexicon = new RiLexicon();


function init(){
    $.get('barbara.txt', function(data, status){
        //console.log(arguments);
        lexicon = new RiLexicon();
        addTextToHtml(data);
        processRita(data);
        randomWordRita(data);
    })

    document.getElementById('random').addEventListener('click', randomSentence);
    document.getElementById('rhyme').addEventListener('click', rhymeSentence);
}

function rhymeSentence(){
    var inputFieldText = document.getElementById('sentence').value;
    processRita(inputFieldText);
}

function randomSentence(){
    var inputFieldText = document.getElementById('sentence').value;
    randomWordRita(inputFieldText);
}



function addTextToHtml(text){
    var htmlToAppend = 
    '<div class="text-container">' +
        '<p contenteditable>'+ text + '</p>'
    '</div>';

    return $('#text-holder').append(htmlToAppend);
}

function processRita(text){
    var s = text;
    var r = RiString(s);
    var rs = new RiString(s);
    var words = rs.words();
    var pos = rs.pos();
    //createP(s);
    // console.log(pos);
    //console.log(words);
    var output = '';
    for (var i = 0; i< words.length; i++){
        if (/nn.*/.test(pos[i])){
            var arrayOfRhymes = lexicon.rhymes(words[i]);
            if (arrayOfRhymes.length == 0){
                output += words[i];
            } else {
                output += arrayOfRhymes[0];
            }
            // console.log(arrayOfRhymes);
            
        } else if (/vb.*/.test(pos[i])){
            var arrayOfRhymes = lexicon.rhymes(words[i]);
            if (arrayOfRhymes.length == 0){
                output += words[i];
            } else {
                output += arrayOfRhymes[0];
            }
            // console.log(arrayOfRhymes);
            
        }
        else{
             output += words[i];
        }
       
        output += " ";
    }
    // console.log(output);
    addTextToHtml(output);
    // createP(output).class(text);
}

function randomWordRita(text){
    var s = text;
    var r = RiString(s);
    var rs = new RiString(s);
    var words = rs.words();
    var pos = rs.pos();
    //createP(s);
    // console.log(pos);
    //console.log(words);
    var output = '';
    for (var i = 0; i< words.length; i++){
        if (/nn.*/.test(pos[i])){
            var randomWord = lexicon.randomWord(pos[i]);
            output += randomWord;
            // console.log(arrayOfRhymes);
            
        } else if (/vb.*/.test(pos[i])){
            var randomWord = lexicon.randomWord(pos[i]);
            output += randomWord;
            // console.log(arrayOfRhymes);
            
        }
        else{
             output += words[i];
        }
       
        output += " ";
    }
    // console.log(output);
    addTextToHtml(output);
    // createP(output).class(text);
}

//processRita();

window.addEventListener('load', init);