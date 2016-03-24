$(document).ready(function(){
    $("#btn-login").click(function(){
        $.ajax({
            type: "POST",
            url: "controller/base.php",
            data: "email=" + $("#email").val() + "&pwd=" + $("#pwd").val()+"&method=login",
            success:function(msg)
            {
                if(msg)
                {
                    window.location.replace("index.php");
                }
                else
                {
                    alert("ERROR");
                }
            }
        });
    });

    $("#btn-sign").click(function(){
        $.ajax({
            type: "POST",
            url: "controller/base.php",
            data: "email=" + $("#email").val() + "&pwd=" + $("#pwd").val()+ "&pwd_c=" +$("#conf").val()+"&method=registration",
            success:function(msg)
            {
                if(msg)
                {
                    window.location.replace("index.php");
                }
                else
                {
                    $('#email').parent().addClass('has-error');
                }
            }
        });
    });
});

function IsValid() {
    var valid = true;
    $('.form-group').each(function () {
        if ($(this).hasClass('has-error') || $(this).children('input').val().length == 0) {
            valid = false;
            return;
        }
    });
    if (valid) {
        $('#btn-sign').removeAttr('disabled');
    } else {
        $('#btn-sign').attr('disabled', 'disabled');
    }
}

    $('input[type=email]').blur(function () {
        var $input = $('input[type=email]');
        if ($input.val().length != 0) {
            var valid = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
            if (valid.test($input.val())) {
                $input.parent().removeClass('has-error has-feedback');
                $input.parent().children('span').removeClass('glyphicon glyphicon-remove form-control-feedback');
                $input.parent().addClass('has-success has-feedback');
                $input.parent().children('span').addClass('glyphicon glyphicon-ok form-control-feedback');
            } else {
                $input.parent().addClass('has-error has-feedback');
                $input.parent().children('span').addClass('glyphicon glyphicon-remove form-control-feedback');
            }
        } else {
            $input.parent().removeClass('has-error has-feedback').removeClass('has-success has-feedback');
            $input.parent().children('span').removeClass('glyphicon glyphicon-remove form-control-feedback').removeClass('glyphicon glyphicon-ok form-control-feedback');
        }
        IsValid();
    });
    $('#conf').blur(function () {
        if ($('#conf,#pwd').val().length != 0) {
            if ($('#conf').val() == $('#pwd').val()) {
                $('#conf,#pwd').parent().removeClass('has-error has-feedback');
                $('#conf,#pwd').parent().children('span').removeClass('glyphicon glyphicon-remove form-control-feedback');
                $('#conf,#pwd').parent().addClass('has-success has-feedback');
                $('#conf,#pwd').parent().children('span').addClass('glyphicon glyphicon-ok form-control-feedback');
            } else {
                $('#conf,#pwd').parent().addClass('has-error has-feedback');
                $('#conf,#pwd').parent().children('span').addClass('glyphicon glyphicon-remove form-control-feedback');
            }
        } else {
            $('#conf,#pwd').parent().removeClass('has-error has-feedback').removeClass('has-success has-feedback');
            $('#conf,#pwd').parent().children('span').removeClass('glyphicon glyphicon-remove form-control-feedback').removeClass('glyphicon glyphicon-ok form-control-feedback');
        }
        IsValid();
    });
    $('#pwd').focusin(function () {
        $('#conf').val('');
        $('#conf,#pwd').parent().removeClass('has-error has-feedback').removeClass('has-success has-feedback');
        $('#conf,#pwd').parent().children('span').removeClass('glyphicon glyphicon-remove form-control-feedback').removeClass('glyphicon glyphicon-ok form-control-feedback');
        IsValid();
    });




function validation_author(){
    if ($('#email').val() != "" && $('#pwd').val() != "") {
        $("#btn-login").removeAttr('disabled');
    }
    else {
        $("#btn-login").attr('disabled', 'disabled');
    }
}


