var animateFunc = function(r,l,o,gmin,gmax) {
     size = $('#size_slider').val();
     status = $('#select').val();
    //toroidal
    if (status == "toroidal"){
    $('td').each(function() {
        neighbors = 0;
        tdindex = $(this)[0].cellIndex;
        tr = $(this).closest('tr');
        trindex = $("tr").index(tr);
        for (i = 1;i<=r;i++){
            if($(tr).children('td').eq(tdindex - i).hasClass('alive')){
                neighbors++;
            }
            if($(tr).children('td').eq(tdindex + i).hasClass('alive')){
                neighbors++;
            }
            if($("tr").eq(trindex - i).children('td').eq(tdindex).hasClass('alive')){
                neighbors++;
                }
            if($("tr").eq(trindex + i).children('td').eq(tdindex).hasClass('alive')){
                neighbors++;
                }
            for(j = 1; j <= r; j++){
                if($("tr").eq(trindex - i).children('td').eq(tdindex - j).hasClass('alive')){
                neighbors++;
                }
                if($("tr").eq(trindex - i).children('td').eq(tdindex + j).hasClass('alive')){
                neighbors++;
                }
                if($("tr").eq(trindex + i).children('td').eq(tdindex - j).hasClass('alive')){
                neighbors++;
                }
                if($("tr").eq(trindex + i).children('td').eq(tdindex + j).hasClass('alive')){
                neighbors++;
                }
            }
        }
        //console.log("index:"+ tdindex + " neighbors:" + neighbors)
        $(this).attr('neighbors', neighbors);
        console.log("toroidal selected")
    });
}
    //always dead
    if (status == "dead"){
        $('td').each(function() {
        neighbors = 0;
        tdindex = $(this)[0].cellIndex;
        tr = $(this).closest('tr');
        trindex = $("tr").index(tr);
        for (i = 1;i<=r;i++){
            if($(tr).children('td').eq(tdindex - i).hasClass('alive') && tdindex - i >= 0){
                neighbors++;
            }
            if($(tr).children('td').eq(tdindex + i).hasClass('alive') && tdindex + i < size){
                neighbors++;
            }
            if($("tr").eq(trindex - i).children('td').eq(tdindex).hasClass('alive') && trindex - i >= 0){
                neighbors++;
                }
            if($("tr").eq(trindex + i).children('td').eq(tdindex).hasClass('alive') && trindex + i < size){
                neighbors++;
                }
            for(j = 1; j <= r; j++){
                if($("tr").eq(trindex - i).children('td').eq(tdindex - j).hasClass('alive')  && tdindex - i >= 0 && tdindex - j >= 0){
                neighbors++;
                }
                if($("tr").eq(trindex - i).children('td').eq(tdindex + j).hasClass('alive') && tdindex - i >= 0 && tdindex + j < size){
                neighbors++;
                }
                if($("tr").eq(trindex + i).children('td').eq(tdindex - j).hasClass('alive') && trindex + i < size && tdindex - j >= 0 ){
                neighbors++;
                }
                if($("tr").eq(trindex + i).children('td').eq(tdindex + j).hasClass('alive') && trindex + i < size && tdindex + j < size){
                neighbors++;
                }
            }
        }
        //console.log("index:"+ tdindex + " neighbors:" + neighbors)
        $(this).attr('neighbors', neighbors);
        console.log("dead selected")
    });
}
    //always alive
    if(status == "alive"){
        $('td').each(function() {
        neighbors = 0;
        tdindex = $(this)[0].cellIndex;
        tr = $(this).closest('tr');
        trindex = $("tr").index(tr);
        for (i = 1;i<=r;i++){
            if($(tr).children('td').eq(tdindex - i).hasClass('alive') || tdindex - i < 0){
                neighbors++;
            }
            if($(tr).children('td').eq(tdindex + i).hasClass('alive') || tdindex + i >= size){
                neighbors++;
            }
            if($("tr").eq(trindex - i).children('td').eq(tdindex).hasClass('alive') || trindex - i < 0){
                neighbors++;
                }
            if($("tr").eq(trindex + i).children('td').eq(tdindex).hasClass('alive') || trindex + i >= size){
                neighbors++;
                }
            for(j = 1; j <= r; j++){
                if($("tr").eq(trindex - i).children('td').eq(tdindex - j).hasClass('alive')  || tdindex - i < 0 || tdindex - j < 0){
                neighbors++;
                }
                if($("tr").eq(trindex - i).children('td').eq(tdindex + j).hasClass('alive') || tdindex - i < 0 || tdindex + j >= size){
                neighbors++;
                }
                if($("tr").eq(trindex + i).children('td').eq(tdindex - j).hasClass('alive') || trindex + i >= size || tdindex - j < 0 ){
                neighbors++;
                }
                if($("tr").eq(trindex + i).children('td').eq(tdindex + j).hasClass('alive') || trindex + i >= size || tdindex + j >= size){
                neighbors++;
                }
            }
        }
        //console.log("index:"+ tdindex + " neighbors:" + neighbors)
        $(this).attr('neighbors', neighbors);
         console.log("alive selected")
    });
}








//=============neighbor judge===================
    $('td').each(function() {
        i = parseInt($(this).attr('neighbors'));
        if ($(this).hasClass('alive')) {
            if (i < l || i > o) {
                $(this).removeClass('alive');
                $(this).addClass('dead');
            }
        }
        //dead animation
        else {
            if (i >= gmin && i <= gmax) {
                $(this).removeClass('dead');
                $(this).addClass('alive');
            }
        }
    });
}

var myInterval;
var running = false;

var changeSpeed = function(){
    $('#speed_slider').change(function() {
    clearInterval(myInterval);
    myInterval = setInterval("animateFunc(1,2,3,3,3)", this.value);
    });
}
var startAnimation = function() {
    r = $('#radius_slider').val();
    l = $('#loneliness_slider').val();
    o = $('#op_slider').val();
    gmin = $('#gmin_slider').val();
    gmax = $('#gmax_slider').val();
    speed = $('#speed_slider').val();
    $('#start-btn').on('click', function() {
    myInterval = setInterval("animateFunc(r,l,o,gmin,gmax)", speed);
        running = true;
    });
};

var pauseAnimation = function() {
    $('#pause-btn').on('click', function() {
        clearInterval(myInterval);
        running = false;
    });
};

var nextAnimation = function(){
    $('#next-btn').on('click', function() {
        if(running == false){
    r = $('#radius_slider').val();
    l = $('#loneliness_slider').val();
    o = $('#op_slider').val();
    gmin = $('#gmin_slider').val();
    gmax = $('#gmax_slider').val();
        animateFunc(r,l,o,gmin,gmax);
        }
    });
}

var resetAnimation = function() {
    $('#reset-btn').on('click', function() {
        clearInterval(myInterval);
        $('td').removeClass('alive');
        $('td').removeClass('dead');
    });
};

var randomAnimation = function() {
        $('#random-btn').on('click', function() {
                clearInterval(myInterval);
                $('td').removeClass('alive');
                $('td').addClass('dead');
                $('td').each(function() {
                        random = Math.round(Math.random());
                        if (random == 1) {
                            $(this).removeClass('dead');
                            $(this).addClass('alive');
                        }
                    });
                });
        };

