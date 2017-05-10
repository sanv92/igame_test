$(document).ready(function() {

//mail
$('#submit').click(function(e) {

	var name = $('#name').val().length;
	var checpwd1 = $('#password1').val().length;
	var checpwd2 = $('#password2').val().length;

//email
if($('#email').val() == '') {
	$('#valid').html('<span class="error">Поле e-mail не должно быть пустым!</span>');
	$('#email').removeAttr('class').addClass('error');
	e.preventDefault();
}

var regex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/; 
if(regex.test($('#email').val())) {
	$('#valid').html('<span class="currect">Подходит</span>');
	$('#email').removeAttr('class').addClass('currect');
} else {
	$('#valid').html('<span class="error">Не подходит</span>');
	$('#email').removeAttr('class').addClass('error');
	e.preventDefault();
}
//email
	
//name
if(name < 3) {
	e.preventDefault();
	if(name < 3) { $('#name').removeAttr('class').addClass('error'); } else { $('#name').removeAttr('class').addClass('currect'); }
} else {
	$('#name').removeAttr('class').addClass('currect');
}

//pass12
if(checpwd1 == checpwd2) {
	$('#password1').removeAttr('class').addClass('currect');
	$('#password2').removeAttr('class').addClass('currect');
	$('#pass_double').removeAttr('class').addClass('currect');
} else {
	e.preventDefault();
	$('#password1').removeAttr('class').addClass('error');
	$('#password2').removeAttr('class').addClass('error');
	$('#pass_double').removeAttr('class').addClass('error');
}

//pass1
if(checpwd1 < 6 || checpwd1.length == 0) {

	e.preventDefault();
	if(checpwd1 < 6) {
		$('#password1').removeAttr('class').addClass('error');
		$('#first_pwd_length').removeAttr('class').addClass('error');
	} else {
		$('#password1').removeAttr('class').addClass('currect');
		$('#first_pwd_length').removeAttr('class').addClass('currect');
	}

} else {
	$('#password1').removeAttr('class').addClass('currect');
	$('#first_pwd_length').removeAttr('class').addClass('currect');
}

//pass2
if(checpwd2 < 6 || checpwd1.length == 0) {
	e.preventDefault();
	if(checpwd2 < 6) {
		$('#password2').removeAttr('class').addClass('error');
		$('#second_pwd_length').removeAttr('class').addClass('error');
	} else {
		$('#password2').removeAttr('class').addClass('currect');
		$('#second_pwd_length').removeAttr('class').addClass('currect');
	}
} else {
	$('#password2').removeAttr('class').addClass('currect');
	$('#second_pwd_length').removeAttr('class').addClass('currect');
}

//if($('#result-registration font').attr('color') == 'red') { $('#name').css({ 'border' : '1px solid #ff0000' }); } else { $('#name').css({ 'border' : '1px solid #2ab400' }); }

});

//mail


//rus_name
jQuery(function ($) {
    var charmap = {};
    var rus = "йцукенгшщзхъфывапролджэячсмитьбю".split('');
    var eng = "qwertyuiop[]asdfghjkl;'zxcvbnm,.".split('');
    for (var i = 0; i < rus.length; i++) {
        charmap[rus[i]] = eng[i];
    }

    function rustoeng(string) {
        return string.replace(/([^a-z\s])/gi,

        function (x) {
            return charmap[x] || x;
        });
    }


    $('#name').on('input keydown paste', function (e) {
        $this = $(this);
        setTimeout(function () {
            var newval = rustoeng($this.val());
            if ($this.val() != newval) {
                //записать выделение и позицию курсора
                var caret = $this.caret();
                $this.val(newval);
                //восстановить
                $this.caret(caret);
            }
        }, 0);
    });

});

//jCaret plugin
(function ($, len, createRange, duplicate) {
    $.fn.caret = function (options, opt2) {
        var start, end, t = this[0],
            browser = !(!document.selection); //тут пофиксил для совместимости с новым jQuery
        if (typeof options === "object" && typeof options.start === "number" && typeof options.end === "number") {
            start = options.start;
            end = options.end;
        } else if (typeof options === "number" && typeof opt2 === "number") {
            start = options;
            end = opt2;
        } else if (typeof options === "string") {
            if ((start = t.value.indexOf(options)) > -1) end = start + options[len];
            else start = null;
        } else if (Object.prototype.toString.call(options) === "[object RegExp]") {
            var re = options.exec(t.value);
            if (re != null) {
                start = re.index;
                end = start + re[0][len];
            }
        }
        if (typeof start != "undefined") {
            if (browser) {
                var selRange = this[0].createTextRange();
                selRange.collapse(true);
                selRange.moveStart('character', start);
                selRange.moveEnd('character', end - start);
                selRange.select();
            } else {
                this[0].selectionStart = start;
                this[0].selectionEnd = end;
            }
            this[0].focus();
            return this
        } else {
            // Modification as suggested by Андрей Юткин
            if (browser) {
                if (this[0].tagName.toLowerCase() != "textarea") {
                    var val = this.val(),
                        selection = document.selection,
                        range = selection[createRange]()[duplicate]();
                    range.moveEnd("character", val[len]);
                    var s = (range.text == "" ? val[len] : val.lastIndexOf(range.text));
                    range = selection[createRange]()[duplicate]();
                    range.moveStart("character", -val[len]);
                    var e = range.text[len];
                } else {
                    var range = selection[createRange](),
                        stored_range = range[duplicate]();
                    stored_range.moveToElementText(this[0]);
                    stored_range.setEndPsoint('EndToEnd', range);
                    var s = stored_range.text[len] - range.text[len],
                        e = s + range.text[len]
                }
                // End of Modification
            } else {
                var s = t.selectionStart,
                    e = t.selectionEnd;
            }
            var te = t.value.substring(s, e);
            return {
                start: s,
                end: e,
                text: te,
                replace: function (st) {
                    return t.value.substring(0, s) + st + t.value.substring(e, t.value[len])
                }
            }
        }
    }
})(jQuery, "length", "createRange", "duplicate")
//rus_name

});
