
$('#add_user').submit(function(event){
    alert('data inserted')
})

$('#update_user').submit(function(event){
    event.preventDefault();

    let unindexed_array = $(this).serializeArray();
    let data = {};
    $.map(unindexed_array,function(n,i){
        data[n['name']] = n['value']
    })
    console.log(data);
    var request = {
        "url" : `http://localhost:8090/api/users/${data.id}`,
        "method" : "PUT",
        "data" : data
    }
    $.ajax(request).done(function(response){
        alert('data updated')
    })
})

if(window.location.pathname == "/"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        console.log('click works' +$ondelete);
    var id = $(this).attr('data-id')
    var request = {
        "url" : `http://localhost:8090/api/users/${id}`,
        "method" : "DELETE",
    }
    $.ajax(request).done(function(response){
        alert('data deleted')
        location.reload();
    })
    })

    
}