var Grid = document.createElement("table");
Grid.init = function(width, height) {
    for (i = 0; i < width; i++) {
        Grid.appendChild(document.createElement("tr"));
        for (j = 0; j < height; j++) {
            Grid.getElementsByTagName("tr")[i].appendChild(document.createElement("td"));
        }
    }

    return Grid;
}

Grid.show = function() {
    document.getElementById("grid").appendChild(Grid);
}

Grid.change = function() {
    $('#size_slider').change(function() {
        $('table').empty();
        size = this.value;
        Grid.init(size, size);
        w = $(window).width();
        w = w * 0.25;
        x = w / size;
        $('td').css('padding', x + 'px');
    });
}
Grid.click = function() {
    $('td').on('click', function(e) {
        if (e.shiftKey) {
            e.preventDefault();
            if ($(this).hasClass('alive')) {

            } else {
                $(this).addClass('alive');
            }
        } 
        else if (e.altKey){
             if ($(this).hasClass('dead')) {

            } else {
                $(this).addClass('dead');
            }
        }
            else {
            if ($(this).hasClass('alive')) {
                $(this).removeClass('alive');
                $(this).addClass('dead')
            } else if ($(this).hasClass('dead')) {
                $(this).removeClass('dead');
                $(this).addClass('alive');
            } else {
                $(this).addClass('alive');
            }
        }
    });

}