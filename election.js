document.addEventListener("DOMContentLoaded", function() {

  var url = 'https://bb-election-api.herokuapp.com/'
  var candidatesList = document.querySelector('#candidates');
  $.ajax({
      url: url,
      method: 'GET',
      dataType: 'json'
    }).done(function(data){
      for (var i = 0; i < data.candidates.length; i++) {
        var newLi = document.createElement('li');
        newLi.id = data.candidates[i].id
        var candidateForm = document.createElement('form');
        candidateForm.action = 'https://bb-election-api.herokuapp.com/vote';
        candidateForm.method = 'POST';
        newLi.innerHTML = "Name: " + data.candidates[i].name
        + " | Votes: " + data.candidates[i].votes;
        candidatesList.append(newLi);
        newLi.append(candidateForm);
        var candidateFormHidden = document.createElement('input');
        candidateFormHidden.setAttribute("type", "hidden");
        candidateFormHidden.setAttribute("name", "id");
        candidateFormHidden.setAttribute("value", data.candidates[i].id);
        newLi.append(candidateFormHidden);
        var submitBtn = document.createElement('input');
        submitBtn.setAttribute('type', 'submit' )
        newLi.append(submitBtn);
        submitBtn.addEventListener('click', function(event){
          event.preventDefault();
          $.ajax({
            url: 'https://bb-election-api.herokuapp.com/vote',
            method: 'POST',
            data: {id: candidateId},
          }).done(function(data){

            // candidatesList.replaceChild(newLi, newLi)
          })//done request
        })
        // console.log(data.candidates[i].name);
      }

      // console.log(data);
    })//ending of done function
});
