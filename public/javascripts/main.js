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



if (window.location.pathname === '/blobs') {

  fetch('api/v1/blob').then(function(res) {
    res.json().then(function(blobs) {
      console.log('blobs', blobs);
      var tbody = document.getElementById('table-body');
      blobs.forEach(function(blob) {
        // tbody.insertAdjacentHTML('beforeend', '<tr> <td>  <input type="checkbox" id="' + contact._id + '" />  </td>  <td>  <a href="/contacts/#' + contact._id + '">' + contact.name + '</a></td> <td> ' + contact.nickname + '</td> <td>' + contact.email + ' </td> </tr>');
        tbody.insertAdjacentHTML('beforeend', '<li class="list-group-item"><a href="/blobs/'+blob._id+'">'+blob.events_name+'<p> '+ blob.events_date+' | '+blob.events_day+ '</p></li>');

      });
    })
  });

}
