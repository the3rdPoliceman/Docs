document.getElementById('equation').focus();



var insertables = document.getElementsByClassName('insertable');
for (const insertable of insertables) {
  insertable.addEventListener('click', function(event) {
    let equation = document.getElementById('equation');
    let newText = insertable.textContent;
    //equation.value = equation.value + newText;
    //equation.focus();
    insertAtCursor(equation, newText);
  });
}

function insertAtCursor(myField, myValue) {
    //IE support
    if (document.selection) {
        myField.focus();
        sel = document.selection.createRange();
        sel.text = myValue;

        var pos = startPos + myValue.length;
        myField.focus();
    }
    // Microsoft Edge
    else if(window.navigator.userAgent.indexOf("Edge") > -1) {
      var startPos = myField.selectionStart; 
      var endPos = myField.selectionEnd; 

      myField.value = myField.value.substring(0, startPos)+ myValue 
             + myField.value.substring(endPos, myField.value.length); 

      var pos = startPos + myValue.length;
      myField.focus();
      myField.setSelectionRange(pos, pos);
    }
    //MOZILLA and others
    else if (myField.selectionStart || myField.selectionStart == '0') {
        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;
        myField.value = myField.value.substring(0, startPos)
            + myValue
            + myField.value.substring(endPos, myField.value.length);
        myField.focus();
        var pos = startPos + myValue.length;
        myField.setSelectionRange(pos, pos);
    } else {
        myField.value += myValue;
        myField.focus();
    }
}