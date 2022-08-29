(function ($) {
    $.fn.simpleMoneyFormat = function() {
        this.each(function(index, el) {
            var elType = null; // input or other
            var value = null;
            // get value
            if($(el).is('input') || $(el).is('textarea')){
                value = $(el).val().replace(/,/g, '');
                elType = 'input';
            } else {
                value = $(el).text().replace(/,/g, '');
                elType = 'other';
            }

            // if value changes
            $(el).on('paste keyup', function(){
                value = $(el).val().replace(/,/g, '');
                formatElement(el, elType, value); // format element
            });
            formatElement(el, elType, value); // format element
        });
        function formatElement(el, elType, value){
            var result = '';
            var valueArray = value.split('');
            var resultArray = [];
            var counter = 0;
            var temp = '';
            for (var i = valueArray.length - 1; i >= 0; i--) {
                temp += valueArray[i];
                counter++
                if(counter == 3){
                    resultArray.push(temp);
                    counter = 0;
                    temp = '';
                }
            };
            if(counter > 0){
                resultArray.push(temp);
            }
            for (var i = resultArray.length - 1; i >= 0; i--) {
                var resTemp = resultArray[i].split('');
                for (var j = resTemp.length - 1; j >= 0; j--) {
                    result += resTemp[j];
                };
                if(i > 0){
                    result += ','
                }
            };
            if(elType == 'input'){
                $(el).val(result);
            } else {
                $(el).empty().text(result);
            }
        }
    };

    $("#simulatorForm").on("submit", function(){
        var url = $(this).attr('action');
        $.ajax({
            type: "POST",
            url: any,
            data: $(this).serialize(),
            success : function(data){
                var data = JSON.parse(data);
                if (data.success) {
                    //$("#pinjaman").html("Rp "+data.data.nominal);
                    $("#period").html(" "+data.data.period+" bulan");
                    $("#angsuran").html("Rp "+data.data.angsuran);
                    $("#total").html("Rp "+data.data.total);
                    $("#nominal-error").html('');
                } else {
                    //$("#pinjaman").html("Rp 0,00");
                    $("#period").html("0 bulan");
                    $("#angsuran").html("Rp 0,00");
                    $("#total").html("Rp 0,00");
                    if (data.data.nominal){
                        $("#nominal").parent().addClass("has-error");
                        $("#nominal-error").html(data.message);
                        $("#nominal-error").attr('style','color: red;font-weight: 700;');
                    }
                }
            }
        });
        return false;
    });

    $("input[data-type='currency']").simpleMoneyFormat();
}(jQuery));