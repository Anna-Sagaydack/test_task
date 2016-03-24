$(document).ready(function()
{
    $.ajax({
        type: "POST",
        url: "controller/base.php",
        data: "&method=get_project",

        success:function(msg)
        {
            var res = JSON.parse(msg);
            res.Status_task = function (){
                return (this.status==1)? "checked" : "";
            } ;
            $(".content").html(Mustache.render($('#template').html(), res));
            Sort();
            Resize();
        }
    });


});

function Resize()
{
    $('textarea').each(function () {
        this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow:hidden;');
    }).on('input', function () {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });

}


function Sort()
{
    $('.sortable').sortable({
        handle: '.dragTask',
        axis: 'y',
        update: function(){
            var data = $(this).sortable('serialize');
            $.ajax({
                type: "POST",
                url: "controller/base.php",
                data: data+"&method=sort_tasks",

                success:function(msg)
                {


                }
            });
        }
    });
}

function project_edit(e)
{
    $(e).closest('.projName').children('input[type=text]').removeAttr('disabled').focus();
    $('.addList').attr('disabled','disabled');

}

function Save_add_project(name)
{
    if(name.length>0)
    {
        $.ajax({
            type: "POST",
            url: "controller/base.php",
            data: "name="+name+"&method=add_project",

            success:function(msg)
            {
                var res = JSON.parse(msg);
                console.log(res);
                $(".delAfter").remove();
                $(".content").append(Mustache.render($('#template').html(), res));
                $('.addList').removeAttr('disabled','disabled');
            }
        });
    }
    else
    {
        $(".delAfter").remove();
        $('.addList').removeAttr('disabled','disabled');
    }

}

function Lost_focus(e)
{
    if($(e).val() != "") {
        $(e).attr('disabled', 'disabled');
        $(e).parent().css('background-color','transparent');
        $('.addList').removeAttr('disabled','disabled');
    }
}

function Change_project_name(e, $id)
{
    if($(e).val() != "") {
        $.ajax({
            type: "POST",
            url: "controller/base.php",
            data: "id="+$id+"&name="+$(e).val()+"&method=rename_project",

            success:function(msg)
            {
                $('.addList').removeAttr('disabled','disabled');
            }
        });
    }
}

function Change_task_name(e, $id)
{
    if($(e).val() != "") {
        $.ajax({
            type: "POST",
            url: "controller/base.php",
            data: "id="+$id+"&name="+$(e).val()+"&method=rename_task",

            success:function(msg)
            {
                $('.addList').removeAttr('disabled','disabled');
            }
        });
    }
}

function project_delete ($id)
{
    $.ajax({
        type: "POST",
        url: "controller/base.php",
        data: "id="+$id+"&method=delete_project",

        success:function(msg)
        {
            var res = JSON.parse(msg);
            console.log(msg);
            res.Status_task = function (){
                return (this.status==1)? "checked" : "";
            } ;
            $(".content").html(Mustache.render($('#template').html(), res));
            Sort();
            Resize();
        }
    });
}

function Add_project()
{
    $('.addList').attr('disabled','disabled');
    var json = {projects:[{"name":""}]};
    $(".content").append(Mustache.render($('#temporary').html(), json));
    $('.addProjName').focus();
}

function Validation_task(e)
{
    if($(e).val() != "")
    {
        $(e).parent().find('.add_task_btn').removeAttr('disabled', 'disabled');
    }
    else
    {
        $(e).parent().find('.add_task_btn').attr('disabled', 'disabled');
    }
}

function Add_task(e, $id)
{
    var name = $(e).parents('.form').children('input[type=text]').val();
    $.ajax({
        type: "POST",
        url: "controller/base.php",
        data: "id="+$id+"&name="+name+"&method=add_task",

        success:function(msg)
        {
            var res = JSON.parse(msg);
            console.log(msg);
            res.Status_task = function (){
                return (this.status==1)? "checked" : "";
            } ;
            $(".content").html(Mustache.render($('#template').html(), res));
            Sort();
            Resize();
        }
    });
}

function Task_del($id)
{
    $.ajax({
        type: "POST",
        url: "controller/base.php",
        data: "id="+$id+"&method=del_task",

        success:function(msg)
        {
            var res = JSON.parse(msg);
            console.log(msg);
            res.Status_task = function (){
                return (this.status==1)? "checked" : "";
            } ;
            $(".content").html(Mustache.render($('#template').html(), res));
            Sort();
            Resize();
        }
    });
}

function Task_edit(e)
{
    $(e).closest('tr').find('textarea').removeAttr('disabled').focus();
    $('.addList').attr('disabled','disabled');
    $(e).closest('tr').find('.task>div').css('background-color','#F9FBBD');

}

function Edit_status(e, $task_id)
{
    var status = $(e).prop("checked");
    if(status)
    {
        $(e).closest('tr').find('textarea').addClass('checked');
    }
    else
    {
        $(e).closest('tr').find('textarea').removeClass('checked');
    }
    $.ajax({
        type: "POST",
        url: "controller/base.php",
        data: "id="+$task_id+"&status="+status+"&method=edit_status",

        success:function(msg)
        {

        }
    });
}


