// $('#delete').on('click', function(e){
//   e.preventDefault();

//   $('input:checked').each(function(index, value){
//     var val = $(this).attr('id');
//     console.log($(this));
//     var $thisInput = $(this);

//     $.ajax({
//       url:'/contacts/'+val,
//       type:'DELETE'
//     }).done(function(){
//       $thisInput.parents('tr').remove();
//     });

//   });
// });

function getSearch() {
  localStorage.setItem("search", document.getElementById('search').value);
}

if (window.location.pathname === '/blobs') {
  if (localStorage.getItem("search") === null||localStorage.getItem("search").indexOf(' ') >=0||localStorage.getItem("search") === 'null') {
    fetch('api/v1/blob').then(function(res) {
      res.json().then(function(blobs) {
        console.log('blobs', blobs);
        var tbody = document.getElementById('table-body');
        blobs.forEach(function(blob) {
          // tbody.insertAdjacentHTML('beforeend', '<tr> <td>  <input type="checkbox" id="' + contact._id + '" />  </td>  <td>  <a href="/contacts/#' + contact._id + '">' + contact.name + '</a></td> <td> ' + contact.nickname + '</td> <td>' + contact.email + ' </td> </tr>');
          tbody.insertAdjacentHTML('beforeend', '<li class="list-group-item"><a href="/blobs/'+blob._id+'">'+blob.events_name+'<p>'+ blob.events_month +' '+ blob.events_date+' | '+blob.events_day+ '</p></li>');

        });
      })
    });
    fetch('api/v1/blob/count').then(function(res) {
        res.json().then(function(blobs) { 
          console.log('blobs', blobs);
          var count = document.getElementById('count');
            count.insertAdjacentHTML('beforeend', '<h1>Total number of events: '+blobs.count+'</h1>');
        
        })
      });
  }
  else{
    fetch('api/v1/blob?query={"events_name":"~(' + localStorage.getItem("search") + ')"}').then(function(res) {
      res.json().then(function(blobs){
        if (blobs.length === 0) {
          document.getElementById('count').insertAdjacentHTML('beforeend', '<h1>No events found.</h1>');
        }
        else if (blobs.length === 1) {
          document.getElementById('count').insertAdjacentHTML('beforeend', '<h1>Found ' + blobs.length + ' event.</h1>');
        }
        else {
          document.getElementById('count').insertAdjacentHTML('beforeend', '<h1>Found '+blobs.length+' events.</h1>');
        }
        blobs.forEach(function(blob) {
          document.getElementById('table-body').insertAdjacentHTML('beforeend', '<li class="list-group-item"><a href="/blobs/'+blob._id+'">'+blob.events_name+'<p>'+ blob.events_date+' | '+blob.events_day+ '</p></li>');
        });
        
      });
    });
    localStorage.setItem("search", null);

  }
}

